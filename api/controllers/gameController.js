const Game = require('../models/game');
const Convert = require('../../util-module').Convert;
const bggController = require('../controllers/bggController');
const DAL = require('../DAL/dal');

const getAllGames = async(gameIds) => {
    let allGames = [];
    const gamesFromDB = await getGamesFromDB(gameIds);
    const dbIds = gamesFromDB.map((game) => {
        return game.bggId;
    });
    const newGameIds = gameIds.filter((id) => {
        return dbIds.indexOf(id.toString()) === -1;
    });
    if (newGameIds.length > 0) {
        const gamesFromWS = await getGamesFromWS(newGameIds);
        if (gamesFromWS.items.item) {
            newGames = Convert.convertGameDetail(gamesFromWS);
            allGames = gamesFromDB.concat(newGames);
            saveNewGames(newGames);
        } else {
            return null;
        }
    } else {
        allGames = gamesFromDB;
    }
    return allGames
}

const getGamesFromDB = (gameIds) => {
    return foundGames = DAL.find(Game, { bggId: gameIds });
}

const getGamesFromWS = (gameIds) => {
    return bggController.getGames(gameIds);
}

const saveNewGames = async(games) => {
    games.forEach((game) => {
        DAL.save(new Game({
            name: game.name,
            bggId: game.bggId,
            thumbnail: game.thumbnail,
            image: game.image,
            playerCount: game.playerCount,
            playTime: game.playTime,
            category: game.category,
            mechanics: game.mechanics,
            bggLink: game.bggLink,
            description: game.description
        }));
    })
}

const controller = {
    getGame: async(gameId) => {
        return controller.getGames([gameId]);
    },

    getGames: async(gameIds) => {
        if (!Array.isArray(gameIds)) { return getAllGames([gameIds]) }
        return getAllGames(gameIds);
    }
};

module.exports = controller;