const Ad = require('../../models/Ad');

module.exports.create = async (req, res) => {
  try {
    const { link } = req.body;
    const newAd = new Ad({
      image: link,
    });
    const saveAd = await newAd.save();
    res.status(201).send({
      success: true,
      message: saveAd,
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
