const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AdSchema = mongoose.Schema({
  image: {
    type: String,
    require: true,
  },
  link: {
    type: String,
    default: '#',
  },
  views: {
    type: Number,
    default: 0,
  },
});

const Ad = mongoose.model('Ad', AdSchema);

module.exports = Ad;
