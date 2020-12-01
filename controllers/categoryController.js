const Category = require('../models/Category');

module.exports.create = async (req, res) => {
  const { name, parent } = req.body;
  const existCategory = await Category.findOne({ name: name });
  if (existCategory) {
    res.status(403).send({
      success: false,
      message: 'Category name đã tồn tại',
    });
  } else {
    try {
      const category = new Category({
        name: name,
        parent: parent,
      });
      await category.save();
      res.status(201).send({
        success: true,
        message: 'Tạo category mới thành công!',
      });
    } catch (error) {
      res.status(406).send({
        success: false,
        message: error,
      });
    }
  }
};

module.exports.loadAllCategory = async (req, res) => {
  const categories = await Category.find({ status: 'available' });
  res.status(200).send({
    data: categories,
  });
};

module.exports.update = async (req, res) => {
  const { id, name, status, parent } = req.body;
  const categories = await Category.findOne({ _id: id });
  categories.name = name || categories.name;
  categories.status = status === 'available' ? 'blocked' : 'available';
  categories.parent = parent || categories.parent;
  await categories.save();
  res.status(200).send({
    success: true,
    message: 'Lưu dữ liệu thành công',
  });
};
