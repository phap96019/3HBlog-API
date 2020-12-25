const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
const Banner = require('../../models/Banner');
const slug = require('slug');

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

module.exports.create = async (req, res) => {
  console.log('oke');
  try {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      try {
        const { link, stt } = fields;
        // Check fields require
        let ret = {};
        if (files && files.image && files.image.path) {
          const file = files.image.path;
          ret = await cloudinary.uploader.upload(file, {
            folder: 'home/3H-blog',
          });
        } else {
          if (!link) throw 'Không được bỏ trống link hoặc image';
          ret.url = link;
        }
        const newBanner = new Banner({
          image: ret.url,
          stt: stt || 0,
        });
        await newBanner.save();
        console.log(newBanner);
        res.status(200).send({
          success: true,
          data: newBanner,
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

module.exports.loadAll = async (req, res) => {
  const allBanner = await Banner.find({ status: 'available' }).sort({ stt: 1 });
  res.status(200).send(allBanner);
};

module.exports.deleteBanner = async (req, res) => {
  const { id } = req.body;
  const deleteBanner = await Banner.deleteOne({ _id: id });
  res.status(200).send({
    message: 'Đã xóa banner',
  });
};

module.exports.changeStatus = async (req, res) => {
  const { id } = req.body;
  const banner = await Banner.findOne({ _id: id });
  if (banner) {
    banner.status = banner.status === 'available' ? 'blocked' : 'available';
    banner.save();
    res.status(200).send({
      success: true,
      message: `Đã đổi status banner thành ${banner.status}`,
    });
  } else {
    res.status(404).send({
      success: false,
      message: `Không tìm thấy Banner`,
    });
  }
};
