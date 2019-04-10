const express = require('express');
const router = express.Router();
const DAL = require('../DAL/dal');

const User = require('../models/user');

const bggController = require('../controllers/bggController');

router.get('/', (req, res, next) => {
  User.find().exec()
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ Error: { message: error}})
    });
});

router.get('/:userName', (req, res, next) => {
  User.findOne({bggName: req.params.userName}).exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ Error: { message: error}})
    });

  // const user = bggController.getUser(req.params.userName);
  // user.then((response) => {
  //   res.status(200).json({message: 'found', user: JSON.parse(response)});
  // })
});

router.post('/', (req, res, next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    bggName: req.body.bggName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  });
  user.save().then((result) => {
    res.status(201).json(result);
  }).catch((err) => {
    console.log(error);
    res.status(500).json({ Error: { message: error}})
  });
});

module.exports = router;