const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://admin:${process.env.mongo_pw}@cluster0-fedx8.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true});

DAL = {
  find: () => {

  },

  findOne: () => {

  },

  save: () => {

  }
}

module.exports = DAL;