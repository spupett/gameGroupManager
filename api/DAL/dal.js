const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://admin:${process.env.mongo_pw}@cluster0-fedx8.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true});

module.exports = {
  findOne: (model, userName) => {
    return model.findOne({bggName: userName}).exec()
      .then((result) => { return result; })
      .catch((error) => { throw error; })
  },

  find: (model, search) => {
    return model.find(search).exec()
    .then((result) => { return result; })
    .catch((error) => { throw error; })
  },

  save: (model) => {
    if(!model.hasOwnProperty('_id')) {
      model._id = new mongoose.Types.ObjectId();
    }
    return model.save()
      .then((results) => { return results; })
      .catch((error) => { throw error; });
  },

  update: (model, where, update) => {
    return model.update(where, {$set: update})
      .then((result) => { return result; })
      .catch((error) => { throw error; })
  },

  delete: (model, userName) => {
    return model.remove({bggName: userName}).exec()
      .then((results) => { return results; })
      .catch((error) => { throw error;} );
  }
}