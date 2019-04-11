var expect = require('chai').expect;
var sinon = require('sinon');

const controller = require('../../api/controllers/userController');

const serviceFunctions = {
  dbFetch: () => {},
  wsFetch: () => {},
  dbAdd: () => {},
}

describe('userController - getting a user', () => {
  context('given a database', () => {
    context('given a user name', () => {
      context('given that the user name does exist in the database', () => {
        beforeEach(() => {
          serviceFunctions.dbFetch = ({}, name) => { 
            return Promise.resolve(
            {
              bggName: name,
              firstName: 'Luke',
              lastName: 'Starkiller',
              _id: 'someId',
              found: 'database'
            }); 
          };
          serviceFunctions.wsFetch = (name) => { return Promise.resolve({}); }
        })
        it('should return the data', async () => {
          const expected = {
            bggName: 'spuppett',
            firstName: 'Luke',
            lastName: 'Starkiller',
            _id: 'someId',
            found: 'database'
          };
          const actual = await controller.getUser('spuppett', serviceFunctions.dbFetch, serviceFunctions.wsFetch);
          expect(actual).to.eql(expected);
        });
      });
      context('given that the user name doesn\'t exist in the database', () => {
        beforeEach(() => {
          serviceFunctions.dbFetch = ({}, name) => { return Promise.resolve(null); }
          serviceFunctions.wsFetch = (name) => { return Promise.resolve(
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
          const wsSpy = sinon.spy(serviceFunctions.wsFetch);
          await controller.getUser('spuppett', serviceFunctions.dbFetch, wsSpy);
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
            const actual = await controller.getUser('spuppett', serviceFunctions.dbFetch, serviceFunctions.wsFetch);
            expect(actual).to.eql(expected);
          });
        });
        context('given the user name does\'t exist at BGG', () => {
          beforeEach(() => {
            serviceFunctions.wsFetch = (name) => { return Promise.resolve(
              {
                bggName: name,
                firstName: 'Luke',
                lastName: 'Starkiller',
                _id: ''
              }) 
            }
          });
          it('should return null', async () => {
            const expected = null;
            const actual = await controller.getUser('spuppett', serviceFunctions.dbFetch, serviceFunctions.wsFetch);
            expect(actual).to.eql(expected);
          });
        })
      });
    });
  });
});

describe('userController - adding a user', () => {
  context('given a database', () => {
    context('given user data', () => {
      const userData = {};
      context('given complete user data', () => {
        beforeEach(() => {
          userData.bggName = 'spuppett'
          userData.firstName = 'Luke',
          userData.lastName = 'Starkiller',
          userData.email = 'dagobah@theforce.com'
        });
        context('given that the user doesn\'t exist in the database', () => {
          beforeEach(() => {
            serviceFunctions.dbFetch = ({}, name) => { return Promise.resolve(null); }
          });
          context('given the user name exits in the web service', () => {
            beforeEach(() => {
              serviceFunctions.wsFetch = (name) => { 
                return Promise.resolve({
                  bggName: name,
                  firstName: 'Luke',
                  lastName: 'Starkiller',
                  _id: 'someId'
                }); 
              }
              serviceFunctions.addUser = ({}, data) => {
                return Promise.resolve({
                  bggName: 'spuppett',
                  firstName: 'Luke',
                  lastName: 'Starkiller',
                  email: 'dagobah@theforce.com',
                  _id: 'someId',
                  found: 'BGG'});
              }
            });
            it('should add the user data to the database', async () => {
              const addSpy = sinon.spy(serviceFunctions.addUser);
              await controller.addUser(userData, serviceFunctions.dbFetch, serviceFunctions.wsFetch, addSpy);
              expect(addSpy.calledOnce).to.be.true;
            });
            it('should return the data', async () => {
              const expected = {
                bggName: 'spuppett',
                firstName: 'Luke',
                lastName: 'Starkiller',
                email: 'dagobah@theforce.com',
                _id: 'someId',
                found: 'BGG'
              }
              const actual = await controller.addUser(userData, serviceFunctions.dbFetch, serviceFunctions.wsFetch, serviceFunctions.addUser);
              expect(actual).to.eql(expected);
            });
          });
        });
        context('given that the user does exist in the database', () => {
          beforeEach(() => {
            serviceFunctions.dbFetch= ({}, name) => {
              return Promise.resolve({
                bggName: 'spuppett',
                firstName: 'Luke',
                lastName: 'Starkiller',
                _id: 'someId'});
            }
          });
          it('should not save the data', async () => {
            const addSpy = sinon.spy(serviceFunctions.addUser);
            await controller.addUser(userData, serviceFunctions.dbFetch, serviceFunctions.wsFetch, addSpy);
            expect(addSpy.notCalled).to.be.true;
          });
          it('should return the data', async () => {
            const expected = {
              bggName: 'spuppett',
              firstName: 'Luke',
              lastName: 'Starkiller',
              _id: 'someId',
              found: 'database'
            }
            const actual = await controller.addUser(userData, serviceFunctions.dbFetch, serviceFunctions.wsFetch, serviceFunctions.addUser);
            expect(actual).to.eql(expected);
          });
        });
      });
      context('given incomplete user data', () => {
        context('given no bgg user name', () => {
          beforeEach(() => {          
            userData.firstName = 'Luke',
            userData.lastName = 'Starkiller',
            userData.email = 'dagobah@theforce.com'
          });
          it('should throw an error', () => {
            expect(controller.addUser.bind(userData, serviceFunctions.dbFetch, serviceFunctions.wsFetch, serviceFunctions.addUser)).to.throw('No BGG user name given');
          });
        });
      });
    });    
  });
});