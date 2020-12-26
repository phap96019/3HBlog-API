const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
const Post = require('../../models/Post');
const slug = require('slug');

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

module.exports.uploadFile = async (req, res) => {
  try {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      try {
        // Check fields require
        if (files && files.image && files.image.path) {
          const file = files.image.path;
          ret = await cloudinary.uploader.upload(file, {
            folder: 'home/3H-blog',
          });
        } else {
          throw 'Đã có lỗi xảy ra, vui lòng thử lại';
        }
        res.status(200).send({
          success: true,
          link: ret.url,
        });
      } catch (error) {
        res.status(409).send({
          success: false,
          message: error,
        });
      }
    });
  } catch (error) {
    res.status(409).send({
      success: false,
      message: error,
    });
  }
};
