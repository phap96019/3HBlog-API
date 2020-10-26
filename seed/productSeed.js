const faker = require('faker');

const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

const { importData, deleteData } = require('./seederHelper');
const connectDB = require('../utils/db');
const Product = require('../models/productModel');

const products = [];
for (let i = 0; i < 200; i += 1) {
  const product = {
    name: faker.commerce.productName(),
    ratingsAverage: Math.floor(Math.random() * 5) + 1,
    description: faker.lorem.text(),
    ratingsQuantity: faker.random.number(),
    price: faker.commerce.price(),
    imageCover: faker.image.imageUrl(),
  };
  product.priceDiscount = Math.abs(
    product.price - Math.random() * (product.price / 2)
  );
  products.push(product);
}

connectDB();

if (process.argv[2] === '--import') {
  importData(Product, products);
  return;
}
if (process.argv[2] === '--delete') {
  deleteData(Product);
  return;
}
if (process.argv[2] === '--refresh') {
  deleteData(Product);
  importData(Product, products);
}
