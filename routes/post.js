const express = require('express');
const postRoutes = express.Router();
const postControllers = require('../controllers/postController');
const validator = require('../middleware/validatior');
const auth = require('../middleware/auth');

postRoutes
  .route('/create')
  .post(auth.authentication, auth.permit('admin'), postControllers.create);

postRoutes
  .route('/update')
  .post(
    auth.authentication,
    auth.permit('admin'),
    validator.handleValidation,
    postControllers.update
  );
postRoutes
  .route('/delete')
  .post(auth.authentication, auth.permit('admin'), postControllers.delete);
postRoutes.route('/search').post(postControllers.search);
postRoutes.route('/load').get(postControllers.load);
postRoutes.route('/load/:nameUrl').get(postControllers.loadOne);
module.exports = postRoutes;
