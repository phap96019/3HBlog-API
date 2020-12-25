const Post = require('../../models/Post');
const slug = require('slug');

const getRandom = (max) => {
  if (max < 3) {
    return [0, 0, 0];
  }
  const a = Math.floor(Math.random() * max);
  let b = Math.floor(Math.random() * max);
  let c = Math.floor(Math.random() * max);
  while (b === a) {
    b = Math.floor(Math.random() * max);
  }
  while (c === a || c === b) {
    c = Math.floor(Math.random() * max);
  }
  return [a, b, c];
};

module.exports.loadRandom = async (req, res) => {
  const count = await Post.countDocuments();
  const random = getRandom(count);
  const post1 = Post.findOne().skip(random[0]);
  const post2 = Post.findOne().skip(random[1]);
  const post3 = Post.findOne().skip(random[2]);
  const posts = await Promise.all([post1, post2, post3]);
  res.status(200).send({
    data: posts,
  });
};

module.exports.loadMostViews = async (req, res) => {
  const posts = await Post.find()
    .sort({ views: -1 })
    .limit(5);
  res.status(200).send({
    data: posts,
  });
};

module.exports.loadLatest = async (req, res) => {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .limit(5);
  res.status(200).send({
    data: posts,
  });
};
