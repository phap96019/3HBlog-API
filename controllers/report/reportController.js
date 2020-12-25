const Post = require('../../models/Post');
const User = require('../../models/User');

/*
  Số lượng user
  Số lượng bài viết
  Số lượt views
*/

module.exports.loadReport = async (req, res) => {
  const userNumber = await User.countDocuments();
  const posts = await Post.find().select('nameUrl views');
  console.log(userNumber, posts);
  const views = posts.reduce((sum, post) => {
    return sum + post.views;
  }, 0);
  res.status(200).send({
    userNumber,
    views,
    postNumber: posts.length,
  });
};
