var expect = require('chai').expect;
var sinon = require('sinon');
const Convert = require('../../util-module').Convert;

const controller = require('../../api/controllers/userController');

const serviceFunctions = {
  dbFetchUser: () => {},
  wsFetchUser: () => {},
  dbAddUser: () => {},
  
  dbFetchUserGameList: () => {},
  wsFetchUserGameList: () => {},
};
const userData = {};

describe('userController - getting a user', () => {
  context('given a database', () => {
    context('and a user name', () => {
      context('and the user name does exist in the database', () => {
        beforeEach(() => {
          serviceFunctions.User = ({}, name) => { 
            return Promise.resolve(
            {
              bggName: name,
              firstName: 'Luke',
              lastName: 'Starkiller',
              _id: 'someId',
              found: 'database'
            }); 
          };
          serviceFunctions.wsFetchUser = (name) => { return Promise.resolve({}); }
        })
        it('then it should return the data', async () => {
          const expected = {
            bggName: 'spuppett',
            firstName: 'Luke',
            lastName: 'Starkiller',
            _id: 'someId',
            found: 'database'
          };
          const actual = await controller.getUser('spuppett', serviceFunctions.User, serviceFunctions.wsFetchUser);
          expect(actual).to.eql(expected);
        });
      });
      context('and the user name doesn\'t exist in the database', () => {
        beforeEach(() => {
          serviceFunctions.User = ({}, name) => { return Promise.resolve(null); }
          serviceFunctions.wsFetchUser = (name) => { return Promise.resolve(
            {
              bggName: name,
              firstName: 'Luke',
              lastName: 'Starkiller',
              email: '',
              _id: 'id',
              found: 'BGG'
            }); 
          }
        });
        it('then it should look to BGG to find the user name', async () => {
          const wsSpy = sinon.spy(serviceFunctions.wsFetchUser);
          await controller.getUser('spuppett', serviceFunctions.User, wsSpy);
          expect(wsSpy.calledOnce).to.be.true;
        });
        context('and the user name exists at BGG', () => {
          it('then it should return the data', async () => {
            const expected = {
              bggName: 'spuppett',
              firstName: 'Luke',
              lastName: 'Starkiller',
              _id: 'id',
              email: '',
              found: 'BGG'
            };
            const actual = await controller.getUser('spuppett', serviceFunctions.User, serviceFunctions.wsFetchUser);
            expect(actual).to.eql(expected);
          });
        });
        context('and the user name does\'t exist at BGG', () => {
          beforeEach(() => {
            serviceFunctions.wsFetchUser = (name) => { return Promise.resolve({
              bggName: name,
              firstName: 'Luke',
              lastName: 'Starkiller',
              email: '',
              _id: '',
              found: 'BGG'
            });
            }
          })
          it('then it should return null', async () => {
            const expected = null;
            const actual = await controller.getUser('spuppett', serviceFunctions.User, serviceFunctions.wsFetchUser);
            expect(actual).to.eql(expected);
          });
        })
      });
    });
  });
});

describe('userController - adding a user', () => {
  context('given a database', () => {
    context('and some data in the database', () => {
      beforeEach(() => {
        userData.bggName = 'spuppett'
        userData.firstName = 'Luke',
        userData.lastName = 'Starkiller',
        userData.email = 'dagobah@theforce.com'
      });
      context('and the user doesn\'t exist in the database', () => {
        beforeEach(() => {
          serviceFunctions.User = ({}, name) => { return Promise.resolve(null); }
        });
        context('and the user name exits in the web service', () => {
          beforeEach(() => {
            serviceFunctions.wsFetchUser = (name) => { 
              return Promise.resolve(
                {
                  bggName: name,
                  firstName: 'Luke',
                  lastName: 'Starkiller',
                  email: '',
                  _id: 'id',
                  found: 'BGG'
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
          it('then it should add the user data to the database', async () => {
            const addSpy = sinon.spy(serviceFunctions.addUser);
            await controller.addUser(userData, serviceFunctions.User, serviceFunctions.wsFetchUser, addSpy);
            expect(addSpy.calledOnce).to.be.true;
          });
          it('and it should return the data', async () => {
            const expected = {
              bggName: 'spuppett',
              firstName: 'Luke',
              lastName: 'Starkiller',
              email: 'dagobah@theforce.com',
              _id: 'someId',
              found: 'BGG'
            }
            const actual = await controller.addUser(userData, serviceFunctions.User, serviceFunctions.wsFetchUser, serviceFunctions.addUser);
            expect(actual).to.eql(expected);
          });
        });
      });
    });    
    context('and the user does exist in the database', () => {
      beforeEach(() => {
        serviceFunctions.User= ({}, name) => {
          return Promise.resolve({
            bggName: 'spuppett',
            firstName: 'Luke',
            lastName: 'Starkiller',
            _id: 'someId'});
        }
      });
      it('then it should not save the data', async () => {
        const addSpy = sinon.spy(serviceFunctions.addUser);
        await controller.addUser(userData, serviceFunctions.User, serviceFunctions.wsFetchUser, addSpy);
        expect(addSpy.notCalled).to.be.true;
      });
      it('and it should return the data', async () => {
        const expected = {
          bggName: 'spuppett',
          firstName: 'Luke',
          lastName: 'Starkiller',
          _id: 'someId',
          found: 'database'
        }
        const actual = await controller.addUser(userData, serviceFunctions.User, serviceFunctions.wsFetchUser, serviceFunctions.addUser);
        expect(actual).to.eql(expected);
      });
    });
  });
  context('given incomplete user data as input', () => {
    context('and no bgg user name', () => {
      beforeEach(() => {          
        userData.firstName = 'Luke',
        userData.lastName = 'Starkiller',
        userData.email = 'dagobah@theforce.com'
      });
      it('then it should throw an error', () => {
        expect(controller.addUser.bind(userData, serviceFunctions.User, serviceFunctions.wsFetchUser, serviceFunctions.addUser)).to.throw('No BGG user name given');
      });
    });
  });
});

describe('userController - getting a user\'s list of games', () => {
  context('given a web service that returns games', () => {
    context('and a user name', () => {
      let userName;
      context('and the user name exists at the web service', () => {
        beforeEach(() => {
          userName = 'spuppett';
          serviceFunctions.wsFetchUserGameList = (userName) => {
            return Promise.resolve(
              [
                { name: '1', thumbnail: 'someimage1.png', id: '1337' },
                { name: '2', thumbnail: 'someimage2.png', id: '1773' },
                { name: '3', thumbnail: 'someimage3.png', id: '7331' },
              ]             
              );
          };
        })
        it('then it should return a list of all owned games', async () => {
          const expected = [
            { 
              name: '1',
              thumbnail:  'someimage1.png',
              id: '1337',
            },
            { 
              name: '2',
              thumbnail:  'someimage2.png',
              id: '1773',
            },
            { 
              name: '3',
              thumbnail:  'someimage3.png',
              id: '7331',
            }
          ];
          const actual = await controller.getUserGames('spuppett', serviceFunctions.dbFetchUserGameList, serviceFunctions.wsFetchUserGameList);
          expect(actual).to.eql(expected);
        });
      });
    });
  });
});