const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CommentSchema = mongoose.Schema({
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
  content: {
    type: String,
    default: '',
  },
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
