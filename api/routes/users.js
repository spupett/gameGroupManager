const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const DAL = require('../DAL/dal');
const User = require('../models/user');

router.get('/:userName', (req, res, next) => {
  userController.getUser(req.params.userName, DAL.findOne, () => { return 'ws'; })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ Error: { message: error }})
    });
});

router.post('/', (req, res, next) => {
  const user = new User({
    bggName: req.body.bggName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  });

  // Need to add a _id (mongoDB specific)
  DAL.save(user, ['_id'])
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ Error: { message: error }})
    })
});

router.put('/:userName', (req, res, next) => {
  DAL.update(User, {bggName: req.params.userName}, req.body)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ Error: { message: error }})
    })
});

router.delete('/:userName', (req, res, next) => {
  DAL.delete(User, req.params.userName)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ Error: { message: error }})
    });
});

module.exports = router;