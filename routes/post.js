const express = require('express');
const postRoutes = express.Router();
const postControllers = require('../controllers/post');
const auth = require('../middleware/auth');
const validator = require('../controllers/post/validator');
const { handleValidation } = require('../middleware/validatior');

postRoutes
  .route('/create')
  .post(auth.authentication, auth.permit('admin'), postControllers.create);

postRoutes.route('/update').post(
  auth.authentication,
  auth.permit('admin'),
  // validator.updatePost,
  handleValidation,
  postControllers.update
);
postRoutes
  .route('/delete')
  .post(auth.authentication, auth.permit('admin'), postControllers.deletePost);
postRoutes.route('/search').post(postControllers.search);
postRoutes.route('/searchv2/:page/:keySearch').get(postControllers.searchv2);
postRoutes.route('/load').get(postControllers.load);
postRoutes.route('/load/:nameUrl').get(postControllers.loadOne);
postRoutes.route('/loadRandom').get(postControllers.loadRandom);
postRoutes.route('/loadMostViews').get(postControllers.loadMostViews);
postRoutes.route('/loadLatest').get(postControllers.loadLatest);
postRoutes.route('/loadByCategory').get(postControllers.loadByCategory);
postRoutes.route('/loadByTag').get(postControllers.loadByTag);

// Sync Elasticsearch basic
postRoutes.route('/syncES').get(postControllers.syncES);
module.exports = postRoutes;
