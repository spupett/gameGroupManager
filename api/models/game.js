const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  name: String,
  bggId: String,
  thumbnail: String,
  image: String,
  playerCount: {
    min: Number,
    max: Number,
    best: Number
  },
  playTime: Number,
  category: [String],
  mechanics: [String]
});

module.exports = mongoose.model('Game', gameSchema);