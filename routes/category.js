const express = require('express');
const categoryRoutes = express.Router();
const categoryControllers = require('../controllers/categoryController');
const validator = require('../middleware/validatior');
const auth = require('../middleware/auth');

categoryRoutes
  .route('/create')
  .post(
    auth.authentication,
    auth.permit('admin'),
    validator.createCategoryValidation,
    validator.handleValidation,
    categoryControllers.create
  );
categoryRoutes.route('/load').get(categoryControllers.loadAllCategory);
categoryRoutes
  .route('/update')
  .post(
    auth.authentication,
    auth.permit('admin'),
    validator.createCategoryValidation,
    validator.handleValidation,
    categoryControllers.update
  );
module.exports = categoryRoutes;
