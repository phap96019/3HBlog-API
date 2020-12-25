const express = require('express');
const userRoutes = express.Router();
const userControllers = require('../controllers/user');
const validator = require('../controllers/user/validator');
const { handleValidation } = require('../middleware/validatior');
const auth = require('../middleware/auth');

userRoutes
  .route('/register')
  .post(
    validator.registerValidation,
    handleValidation,
    userControllers.register
  );
userRoutes
  .route('/login')
  .post(
    validator.loginValidation,
    validator.handleValidation,
    userControllers.login
  );
userRoutes.route('/refreshToken').post(userControllers.refreshToken);
userRoutes
  .route('/logout')
  .post(auth.authentication, handleValidation, userControllers.logout);
userRoutes
  .route('/loadALlUser')
  .get(
    auth.authentication,
    auth.permit('admin'),
    handleValidation,
    userControllers.loadALlUser
  );

userRoutes
  .route('/test')
  .post(auth.authentication, auth.permit('admin'), function(req, res) {
    res.send('Thử nghiệm middle');
  });

module.exports = userRoutes;
