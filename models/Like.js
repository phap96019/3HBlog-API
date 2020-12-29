const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LikeSchema = mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.model('Like', LikeSchema);

module.exports = Like;
