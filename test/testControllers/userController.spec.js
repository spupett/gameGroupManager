var expect = require('chai').expect;
var sinon = require('sinon');

var controller = require('../../api/controllers/userController');

let dbSpy;
let wsSpy;
let dbFetch = () => {};
let wsFetch = () => {};

describe('userController - getting a user', () => {
  context('given a database', () => {
    context('given a user name', () => {
      context('given that the user name does exist in the database', () => {
        beforeEach(() => {
          dbFetch = ({}, name) => { 
            return Promise.resolve(
            {
              bggName: name,
              firstName: 'Luke',
              lastName: 'Starkiller',
              _id: 'someId'
            }); 
          };
          wsFetch = (name) => { return Promise.resolve({}); }
        })
        it('should return the data', async () => {
          const expected = {
            bggName: 'spuppett',
            firstName: 'Luke',
            lastName: 'Starkiller',
            _id: 'someId'
          };
          const actual = await controller.getUser('spuppett', dbFetch, wsFetch);
          expect(actual).to.eql(expected);
        });
      });
      context('given that the user name doesn\'t exist in the database', () => {
                
        it('should look to BGG to find the user name', async () => {
          
        });
        context('given the user name exists at BGG', () => {
          beforeEach(() => {
            dbFetch = ({}, name) => { return Promise.resolve(null); }
            wsFetch = (name) => { return Promise.resolve(
              {
                bggName: name,
                firstName: 'Luke',
                lastName: 'Starkiller',
                _id: 'someId'
              }); 
            }
          });
          it('should return the data', async () => {
            const expected = {
              bggName: 'spuppett',
              firstName: 'Luke',
              lastName: 'Starkiller',
              _id: 'someId'
            };
            const actual = await controller.getUser('spuppett', dbFetch, wsFetch);
            expect(actual).to.eql(expected);
          });
        });
        context('given the user name does\'t exist at BGG', () => {
          it('should return an error or something...', async () => {

          });
        })
      });
    });
  });
});