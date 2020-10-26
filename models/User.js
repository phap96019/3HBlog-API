const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    email: { type: String },
    password: { type: String },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate
productSchema.virtual('var  iants', {
  ref: 'ProductVariant',
  foreignField: 'product',
  localField: '_id',
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
