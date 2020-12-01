const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategorySchema = mongoose.Schema({
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
  },
  status: {
    type: String,
    enum: ['available', 'blocked'],
    default: 'available',
  },
  name: {
    type: String,
    require: true,
  },
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
