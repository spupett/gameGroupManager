const express = require('express');
const router = express.Router();

const bggController = require('../controllers/bggController');

router.get('/', (req, res, next) => {
  res.status(200).json({ message: 'good to go games'});
});

router.get('/:gameId', (req, res, next) => {
  const user = bggController.getGame(req.params.gameId);
  user.then((response) => {
    res.status(200).json({message: 'found', user: JSON.parse(response)});
  })
});


module.exports = router;