var expect = require('chai').expect;
var sinon = require('sinon');

const controller = require('../../api/controllers/gameController');

const serviceFunctions = {
  dbFetchGames: () => {},
  wsFetchGames: () => {}
};

describe('gameController - getting a game', () => {
  context('given a web service that has game information', () => {
    context('and a game id that exists', () => {
      const gameId = 1;
      beforeEach(() => {
        serviceFunctions.wsFetchGames = (id) => {
          return Promise.resolve([{
            __id: 'something',
            name: 'Great Game',
            bggId: '1',
            thumbnail: 'anImage.png',
            image: 'anotherImage.png',
            playerCount: {
              min: 1,
              max: 4,
              best: 3
            },
            playTime: 54,
            category: ['fantasy', 'space', 'cowboy'],
            mechanics: ['dexterity', 'card drafting']
          }]);
        };
      });
      it('then it should return the game data', async () => {
        const expected = [{
          __id: 'something',
          name: 'Great Game',
          bggId: '1',
          thumbnail: 'anImage.png',
          image: 'anotherImage.png',
          playerCount: {
            min: 1,
            max: 4,
            best: 3
          },
          playTime: 54,
          category: ['fantasy', 'space', 'cowboy'],
          mechanics: ['dexterity', 'card drafting']
        }];
        const actual = await controller.getGame(gameId, serviceFunctions.dbFetchGames, serviceFunctions.wsFetchGames);
        expect(actual).to.eql(expected);
      });
    });
    context('and mulitiple game ids that exist', () => {
      const gameIds = [1, 2, 3];
      beforeEach(() => {
        serviceFunctions.wsFetchGames = (id) => {
          return Promise.resolve([{
            __id: 'something',
            name: 'Great Game',
            bggId: '1',
            thumbnail: 'anImage.png',
            image: 'anotherImage.png',
            playerCount: {
              min: 1,
              max: 4,
              best: 3
            },
            playTime: 54,
            category: ['fantasy', 'space', 'cowboy'],
            mechanics: ['dexterity', 'card drafting']
          },
          {
            __id: 'something',
            name: 'So-So Game',
            bggId: '2',
            thumbnail: 'anImage.png',
            image: 'anotherImage.png',
            playerCount: {
              min: 1,
              max: 4,
              best: 3
            },
            playTime: 54,
            category: ['fantasy', 'space', 'cowboy'],
            mechanics: ['dexterity', 'card drafting']
          },
          {
            __id: 'something',
            name: 'Terrible Game',
            bggId: '3',
            thumbnail: 'anImage.png',
            image: 'anotherImage.png',
            playerCount: {
              min: 1,
              max: 4,
              best: 3
            },
            playTime: 54,
            category: ['fantasy', 'space', 'cowboy'],
            mechanics: ['dexterity', 'card drafting']
          }]);
        };
      });
      it('then it should return the game data', async () => {
        const expected = [{
          __id: 'something',
          name: 'Great Game',
          bggId: '1',
          thumbnail: 'anImage.png',
          image: 'anotherImage.png',
          playerCount: {
            min: 1,
            max: 4,
            best: 3
          },
          playTime: 54,
          category: ['fantasy', 'space', 'cowboy'],
          mechanics: ['dexterity', 'card drafting']
        },
        {
          __id: 'something',
          name: 'So-So Game',
          bggId: '2',
          thumbnail: 'anImage.png',
          image: 'anotherImage.png',
          playerCount: {
            min: 1,
            max: 4,
            best: 3
          },
          playTime: 54,
          category: ['fantasy', 'space', 'cowboy'],
          mechanics: ['dexterity', 'card drafting']
        },
        {
          __id: 'something',
          name: 'Terrible Game',
          bggId: '3',
          thumbnail: 'anImage.png',
          image: 'anotherImage.png',
          playerCount: {
            min: 1,
            max: 4,
            best: 3
          },
          playTime: 54,
          category: ['fantasy', 'space', 'cowboy'],
          mechanics: ['dexterity', 'card drafting']
        }];
        const actual = await controller.getGame(gameIds, serviceFunctions.dbFetchGames, serviceFunctions.wsFetchGames);
        expect(actual).to.eql(expected);
      });
    })
  });
});