const Post = require('../../models/Post');
const User = require('../../models/User');
const Ad = require('../../models/Ad');
/*
  Số lượng user
  Số lượng bài viết
  Số lượt views
  Số lượng nhìn thấy quảng cáo
*/

module.exports.loadReport = async (req, res) => {
  const userNumber = await User.countDocuments();
  const posts = await Post.find().select('nameUrl views');
  const views = posts.reduce((sum, post) => {
    return sum + post.views;
  }, 0);
  const ads = await Ad.find().select('views');
  const adsViews = ads.reduce((sum, ad) => {
    return sum + ad.views;
  }, 0);
  res.status(200).send({
    userNumber,
    views,
    postNumber: posts.length,
    adsViews: adsViews,
  });
};
