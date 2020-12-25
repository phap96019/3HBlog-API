const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BannerSchema = mongoose.Schema(
  {
    status: {
      type: String,
      default: 'available',
      enum: ['available', 'blocked'],
    },
    image: {
      type: String,
      require: true,
    },
    stt: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Banner = mongoose.model('Banner', BannerSchema);

module.exports = Banner;
