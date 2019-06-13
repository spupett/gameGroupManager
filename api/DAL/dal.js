const mongoose = require('mongoose');

const mongoConnection = `mongodb+srv://admin:${process.env.MONGO_PW}@cluster0-fedx8.mongodb.net/test?retryWrites=true`;

module.exports = {
    findOne: (model, userName) => {
        mongoose.connect(mongoConnection, { useNewUrlParser: true });
        return model.findOne({ bggName: userName }).exec()
            .then((result) => { return result; })
            .catch((error) => { throw error; })
            .finally(() => { mongoose.disconnect(); });

    },

    find: (model, search) => {
        mongoose.connect(mongoConnection, { useNewUrlParser: true });
        return model.find(search).exec()
            .then((result) => { return result; })
            .catch((error) => { throw error; })
            .finally(() => { mongoose.disconnect(); });
    },

    save: (model) => {
        mongoose.connect(mongoConnection, { useNewUrlParser: true });
        return model.save()
            .then((results) => { return results; })
            .catch((error) => { throw error; })
            .finally(() => { mongoose.disconnect(); });
    },

    update: (model, where, update) => {
        mongoose.connect(mongoConnection, { useNewUrlParser: true });
        return model.update(where, { $set: update })
            .then((result) => { return result; })
            .catch((error) => { throw error; })
            .finally(() => { mongoose.disconnect(); });
    },

    delete: (model, userName) => {
        mongoose.connect(mongoConnection, { useNewUrlParser: true });
        return model.remove({ bggName: userName }).exec()
            .then((results) => { return results; })
            .catch((error) => { throw error; })
            .finally(() => { mongoose.disconnect(); });
    }
}