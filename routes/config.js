const express = require('express');
const configRoutes = express.Router();
const configControllers = require('../controllers/configController');
const validator = require('../middleware/validatior');
const auth = require('../middleware/auth');

configRoutes.route('/create').post(
  // validator.createCategoryValidation,
  // validator.handleValidation,
  configControllers.create
);

configRoutes.route('/load').get(configControllers.load);
// configRoutes
//   .route('/update')
//   .post(
//     validator.createCategoryValidation,
//     validator.handleValidation,
//     configControllers.upda
module.exports = configRoutes;