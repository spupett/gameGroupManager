const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://admin:${process.env.mongo_pw}@cluster0-fedx8.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true});

module.exports = {
  find: (model) => {
    return model.find().exec()
      .then((results) => { return results; })
      .catch((error) => { throw error; });
  },

  findOne: (model, parameters) => {
    return model.findOne(parameters).exec()
      .then((result) => { return result; })
      .catch((error) => { throw error; })
  },

  save: (model, additions) => {
    if(Array.isArray(additions)) {
      if(additions.indexOf('_id') !== -1) {
        model._id = new mongoose.Types.ObjectId();
      }
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