const Config = require('../models/Config');

module.exports.create = async (req, res) => {
  const { type, config } = req.body;
  console.log(type, config);
  const existConfig = await Config.findOne({ type: type });
  if (existConfig) {
    res.status(403).send({
      success: false,
      message: ` Type Config này dã tồn tại`,
    });
  } else {
    const newConfig = new Config({
      type: type,
      config: config,
    });
    const saveConfig = await newConfig.save();
    res.status(201).send({
      success: true,
      newConfig: saveConfig,
    });
  }
};

module.exports.load = async (req, res) => {
  const { type } = req.query;
  const config = await Config.findOne({ type: type });
  res.status(200).send({
    data: config,
  });
};

// module.exports.update = async (req, res) => {
//   const { id, name, status, parent } = req.body;
//   const categories = await Category.findOne({ _id: id });
//   categories.name = name || categories.name;
//   categories.status = status === 'available' ? 'blocked' : 'available';
//   categories.parent = parent || categories.parent;
//   await categories.save();
//   res.status(200).send({
//     success: true,
//     message: 'Lưu dữ liệu thành công',
//   });
// };
