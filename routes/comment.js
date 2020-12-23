const express = require('express');
const commentRoutes = express.Router();
const commentControllers = require('../controllers/comment');
const { handleValidation } = require('../middleware/validatior');
const validator = require('../controllers/comment/validator');
const auth = require('../middleware/auth');

commentRoutes
  .route('/create')
  .post(
    auth.authentication,
    validator.createComment,
    handleValidation,
    commentControllers.create
  );
module.exports = commentRoutes;
