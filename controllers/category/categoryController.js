const Category = require('../../models/Category');
const slug = require('slug');
const Post = require('../../models/Post');
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
        nameUrl: slug(name, '-'),
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

module.exports.loadDetaiDetaiCategory = async (req, res) => {
  const { nameUrl } = req.query;
  console.log(nameUrl);
  const category = await Category.findOne({
    nameUrl: nameUrl,
  });
  if (category) {
    res.status(200).send({
      data: category,
    });
  } else {
    res.status(404).send({
      message: 'Không tìm thấy category',
    });
  }
};

module.exports.loadAllCategoryForCms = async (req, res) => {
  const categories = await Category.find();
  res.status(200).send({
    data: categories,
  });
};

module.exports.update = async (req, res) => {
  try {
    const { id, name, status, parent } = req.body;
    const existCategory = await Category.findOne({ _id: id });
    if (!existCategory) throw 'Category này không tồn tại';
    const oldCat = existCategory.name;
    if (status !== 'available' && status !== 'blocked') {
      throw 'Status không hợp lệ';
    }

    existCategory.name = name || existCategory.name;
    existCategory.status = status ? status : existCategory.status;
    existCategory.parent = parent ? parent : existCategory.parent;
    existCategory.nameUrl = name ? slug(name, '-') : existCategory.nameUrl;
    await existCategory.save();
    // update all post
    await Post.update(
      { category: oldCat },
      { $set: { category: [`${name}`] } },
      { multi: true }
    );
    res.status(200).send({
      success: true,
      message: 'Lưu dữ liệu thành công',
    });
  } catch (error) {
    res.status(403).send({
      success: false,
      message: error,
    });
  }
};
