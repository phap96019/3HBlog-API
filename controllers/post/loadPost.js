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

module.exports.loadByCategory = async (req, res) => {
  const { category } = req.query;
  let { page, pageSize } = req.query;
  page = parseInt(page, 10) || 1;
  pageSize = parseInt(pageSize, 10) || 10;
  const posts = await Post.find({ category: category })
    .select('_id title nameUrl img summary category views tags')
    .sort({ createdAt: -1 });
  console.log((page - 1) * pageSize, page * pageSize);
  const postsIn = posts.slice((page - 1) * pageSize, page * pageSize);
  console.log(postsIn);
  res.status(200).send({
    message: `Tìm thấy ${posts.length} kết quả`,
    data: postsIn,
  });
};
