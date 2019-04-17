const Game = require('../models/game');

const controller =  { 
  getGame: (gameId, dbFetch, wsFetch) => {
    return controller.getGames([gameId], dbFetch, wsFetch);
  },

  getGames: (gameIds, dbFetch, wsFetch) => {
    return wsFetch(gameIds)
      .then((results) => {
        return results;
      });
  }
};

module.exports = controller;