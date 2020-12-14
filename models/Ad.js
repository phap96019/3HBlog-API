const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AdSchema = mongoose.Schema({
  image: {
    type: String,
    require: true,
  },
});

const Ad = mongoose.model('Ad', AdSchema);

module.exports = Ad;
