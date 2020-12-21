const express = require('express');
const commentRoutes = express.Router();
const commentControllers = require('../controllers/comment');
const validator = require('../middleware/validatior');
const auth = require('../middleware/auth');

commentRoutes
  .route('/create')
  .post(auth.authentication, commentControllers.create);
module.exports = commentRoutes;
