const Post = require('../../models/Post');
/*
  load danh sách các tag theo thứ tự nhiều đến ít
*/

module.exports.load = async (req, res) => {
  try {
    const posts = await Post.find().select('tags views');
    const tags = [];
    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        if (tags[tag]) {
          tags[tag] += post.views;
        } else {
          tags[tag] = post.views;
        }
      });
    });
    const tagList = [];
    for (var property in tags.sort()) {
      tagList.push(property);
    }
    res.status(200).send({
      data: tagList,
    });
  } catch (error) {
    res.status(404).send({
      message: error,
    });
  }
};
