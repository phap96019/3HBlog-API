const express = require('express');
const postRoutes = express.Router();
const postControllers = require('../controllers/postController');
const validator = require('../middleware/validatior');
const auth = require('../middleware/auth');

postRoutes.route('/create').post(
  // validator.createCategoryValidation,
  // validator.handleValidation,
  postControllers.create
);

postRoutes
  .route('/update')
  .post(
    validator.updateCategoryValidation,
    validator.handleValidation,
    postControllers.update
  );
postRoutes.route('/delete').post(postControllers.delete);
postRoutes.route('/search').post(postControllers.search);
postRoutes.route('/load').get(postControllers.load);
postRoutes.route('/load/:nameUrl').get(postControllers.loadOne);
module.exports = postRoutes;
