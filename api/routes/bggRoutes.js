'use strict';

module.exports = (app) => {
  const bgg = require('../controllers/bggController');

  app.route('/user/:userName')
    .get(bgg.getUser);
}