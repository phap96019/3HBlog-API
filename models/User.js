const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    },
    name: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      default: 'user',
    },
    refreshToken: {
      type: String,
      default: '',
    }
  },

);

const User = mongoose.model('User', UserSchema);

module.exports = User;
