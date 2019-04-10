const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  bggName: String,
  firstName: String,
  lastName: String,
  email: String
});

module.exports = mongoose.model('User', userSchema);