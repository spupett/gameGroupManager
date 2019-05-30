const express = require('express');
const router = express.Router();

const gameController = require('../controllers/gameController');


router.get('/', (req, res, next) => {
    gameController.getGames(JSON.parse(req.query.gameIdList))
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ Error: { message: error } })
        });
});


module.exports = router;