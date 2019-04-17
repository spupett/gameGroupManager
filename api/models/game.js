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
    best: String
  },
  playTime: Number,
  category: [String],
  mechanics: [String],
  bggLink: String,
  description: String // https://www.boardgamegeek.com/boardgame/bggId
});

module.exports = mongoose.model('Game', gameSchema);