var expect = require('chai').expect;
var sinon = require('sinon');

var controller = require('../../api/controllers/userController');

let dbSpy;
let wsSpy;
const fetchFunctions = {
  dbFetch: () => {},
  wsFetch: () => {}
}

describe('userController - getting a user', () => {
  context('given a database', () => {
    context('given a user name', () => {
      context('given that the user name does exist in the database', () => {
        beforeEach(() => {
          fetchFunctions.dbFetch = ({}, name) => { 
            return Promise.resolve(
            {
              bggName: name,
              firstName: 'Luke',
              lastName: 'Starkiller',
              _id: 'someId',
              found: 'database'
            }); 
          };
          fetchFunctions.wsFetch = (name) => { return Promise.resolve({}); }
        })
        it('should return the data', async () => {
          const expected = {
            bggName: 'spuppett',
            firstName: 'Luke',
            lastName: 'Starkiller',
            _id: 'someId',
            found: 'database'
          };
          const actual = await controller.getUser('spuppett', fetchFunctions.dbFetch, fetchFunctions.wsFetch);
          expect(actual).to.eql(expected);
        });
      });
      context('given that the user name doesn\'t exist in the database', () => {
        beforeEach(() => {
          fetchFunctions.dbFetch = ({}, name) => { return Promise.resolve(null); }
          fetchFunctions.wsFetch = (name) => { return Promise.resolve(
            {
              bggName: name,
              firstName: 'Luke',
              lastName: 'Starkiller',
              _id: 'id',
              found: 'BGG'
            }); 
          }
        });
        it('should look to BGG to find the user name', async () => {
          const wsSpy = sinon.spy(fetchFunctions.wsFetch);
          await controller.getUser('spuppett', fetchFunctions.dbFetch, wsSpy);
          expect(wsSpy.calledOnce).to.be.true;
        });
        context('given the user name exists at BGG', () => {
          it('should return the data', async () => {
            const expected = {
              bggName: 'spuppett',
              firstName: 'Luke',
              lastName: 'Starkiller',
              _id: 'id',
              found: 'BGG'
            };
            const actual = await controller.getUser('spuppett', fetchFunctions.dbFetch, fetchFunctions.wsFetch);
            expect(actual).to.eql(expected);
          });
        });
        context('given the user name does\'t exist at BGG', () => {
          beforeEach(() => {
            fetchFunctions.wsFetch = (name) => { return Promise.resolve(
              {
                bggName: name,
                firstName: 'Luke',
                lastName: 'Starkiller',
                _id: ''
              }) 
            }
          });
          it('should return an error or something...', async () => {
            const expected = null;
            const actual = await controller.getUser('spuppett', fetchFunctions.dbFetch, fetchFunctions.wsFetch);
            expect(actual).to.eql(expected);
          });
        })
      });
    });
  });
});