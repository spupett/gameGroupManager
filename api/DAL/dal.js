const mongoose = require('mongoose');

module.exports = {
    findOne: (model, userName) => {
        mongoose.connect(`mongodb+srv://admin:${process.env.mongo_pw}@cluster0-fedx8.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true });
        return model.findOne({ bggName: userName }).exec()
            .then((result) => { return result; })
            .catch((error) => { throw error; })
            .finally(() => { mongoose.disconnect(); });

    },

    find: (model, search) => {
        mongoose.connect(`mongodb+srv://admin:${process.env.mongo_pw}@cluster0-fedx8.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true });
        return model.find(search).exec()
            .then((result) => { return result; })
            .catch((error) => { throw error; })
            .finally(() => { mongoose.disconnect(); });
    },

    save: (model) => {
        mongoose.connect(`mongodb+srv://admin:${process.env.mongo_pw}@cluster0-fedx8.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true });
        return model.save()
            .then((results) => { return results; })
            .catch((error) => { throw error; })
            .finally(() => { mongoose.disconnect(); });
    },

    update: (model, where, update) => {
        mongoose.connect(`mongodb+srv://admin:${process.env.mongo_pw}@cluster0-fedx8.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true });
        return model.update(where, { $set: update })
            .then((result) => { return result; })
            .catch((error) => { throw error; })
            .finally(() => { mongoose.disconnect(); });
    },

    delete: (model, userName) => {
        mongoose.connect(`mongodb+srv://admin:${process.env.mongo_pw}@cluster0-fedx8.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true });
        return model.remove({ bggName: userName }).exec()
            .then((results) => { return results; })
            .catch((error) => { throw error; })
            .finally(() => { mongoose.disconnect(); });
    }
}