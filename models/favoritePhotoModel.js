const mongoose = require('mongoose');

const favoritePhoto = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  photoUrl: {
    type: String,
  },
  description: {
    type: String,
  },
  username: {
    type: String,
  },
  explanation: {
    type: String,
  },
});

module.exports = mongoose.model('FavoritePhoto', favoritePhoto);
