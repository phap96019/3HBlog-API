const Ad = require('../../models/Ad');
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});
module.exports.create = async (req, res) => {
  try {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      try {
        const { link } = fields;
        if (!link) throw 'Không được bỏ trống link';
        // Check fields require
        let ret = {};
        if (files && files.image && files.image.path) {
          const file = files.image.path;
          ret = await cloudinary.uploader.upload(file, {
            folder: 'home/3H-blog',
          });
        } else {
          ret.url =
            'http://res.cloudinary.com/ddiqvd0ty/image/upload/v1609406189/home/3H-blog/dkezmxvfmw9grhrnmo9h.gif';
        }
        const newAd = new Ad({
          image: ret.url,
          link: link,
        });
        await newAd.save();
        res.status(200).send({
          success: true,
          data: newAd,
        });
      } catch (error) {
        res.status(403).send({
          success: false,
          message: error,
        });
      }
    });
  } catch (error) {
    res.status(403).send({
      success: false,
      message: error,
    });
  }
};

module.exports.loadAllAd = async (req, res) => {
  try {
    const ads = await Ad.find();
    res.status(200).send({
      data: ads,
    });
  } catch (error) {
    res.status(404).send({
      message: error,
    });
  }
};

module.exports.loadAd = async (req, res) => {
  try {
    const count = await Ad.countDocuments();
    const randomN = Math.floor(Math.random() * count);
    const ad = await Ad.findOne().skip(randomN);
    ad.views += 1;
    ad.save();
    res.status(200).send({
      data: ad,
    });
  } catch (error) {
    res.status(404).send({
      message: error,
    });
  }
};

module.exports.deleteAd = async (req, res) => {
  try {
    const { id } = req.body;
    const categories = await Ad.deleteOne({ _id: id });
    res.status(200).send({
      success: true,
      message: 'Xóa dữ liệu thành công',
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: error,
    });
  }
};
