const express = require('express');
const categoryRoutes = express.Router();
const categoryControllers = require('../controllers/category');
const validator = require('../controllers/category/validator');
const { handleValidation } = require('../middleware/validatior');
const auth = require('../middleware/auth');

categoryRoutes
  .route('/create')
  .post(
    auth.authentication,
    auth.permit('admin'),
    validator.createCategoryValidation,
    handleValidation,
    categoryControllers.create
  );
categoryRoutes.route('/load').get(categoryControllers.loadAllCategory);
categoryRoutes.route('/loadCms').get(categoryControllers.loadAllCategoryForCms);
categoryRoutes
  .route('/loadDetaiDetaiCategory')
  .get(categoryControllers.loadDetaiDetaiCategory);
categoryRoutes
  .route('/update')
  .post(
    auth.authentication,
    auth.permit('admin'),
    validator.updateCategoryValidation,
    handleValidation,
    categoryControllers.update
  );
module.exports = categoryRoutes;
