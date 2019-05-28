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
            allGames = gamesFromDB.concat(Convert.convertGameDetail(gamesFromWS));
            saveNewGames(gamesFromWS);
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
    if (!Array.isArray(games)) {
        games = [games];
    }
    games.forEach((rawGame) => {
        game = Convert.convertGameDetail(rawGame)[0];
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
        return getAllGames(gameIds);
    }
};

module.exports = controller;