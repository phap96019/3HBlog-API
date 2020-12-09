const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ConfigSchema = mongoose.Schema({
  type: {
    type: String,
    require: true,
  },
  config: {
    type: Object,
    default: null,
  },
});

const Config = mongoose.model('Config', ConfigSchema);

module.exports = Config;
