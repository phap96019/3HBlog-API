const Comment = require('../models/Comment');
const Post = require('../models/Post');

module.exports.create = async (req, res) => {
  const { postId, content } = req.body;
  try {
    const existPost = await Post.findOne({ _id: postId });
    if (!existPost) {
      throw 'Bài viết không tồn tại';
    } else {
      const userId = req._idUser;
      const newComment = new Comment({
        user: userId,
        post: postId,
        content: content,
      });
      const saveComment = await newComment.save();
      res.status(201).send({
        success: true,
        data: saveComment,
      });
    }
  } catch (error) {
    res.status(403).send({
      success: false,
      message: error,
    });
  }
};
