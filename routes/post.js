const express = require('express');
const postRoutes = express.Router();
const postControllers = require('../controllers/post');
const auth = require('../middleware/auth');

postRoutes
  .route('/create')
  .post(auth.authentication, auth.permit('admin'), postControllers.create);

postRoutes
  .route('/update')
  .post(auth.authentication, auth.permit('admin'), postControllers.update);
postRoutes
  .route('/delete')
  .post(auth.authentication, auth.permit('admin'), postControllers.deletePost);
postRoutes.route('/search').post(postControllers.search);
postRoutes.route('/load').get(postControllers.load);
postRoutes.route('/load/:nameUrl').get(postControllers.loadOne);
module.exports = postRoutes;
