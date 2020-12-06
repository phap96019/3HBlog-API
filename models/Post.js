const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    nameUrl: {
      type: String,
      default: '',
    },
    img: {
      type: String,
      default: '',
    },
    summary: {
      type: String,
    },
    content: {
      type: Object,
    },
    category: [
      {
        type: String,
      },
    ],
    View: {
      type: Number,
      default: 0,
    },
    tags: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
