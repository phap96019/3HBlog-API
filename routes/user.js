const express = require('express');
const userRoutes = express.Router();
const userControllers = require('../controllers/userController');
const validator = require('../middleware/validatior');
const auth = require('../middleware/auth');

userRoutes
  .route('/register')
  .post(
    validator.registerValidation,
    validator.handleValidation,
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
  .post(
    auth.authentication,
    validator.handleValidation,
    userControllers.logout
  );

userRoutes
  .route('/test')
  .post(auth.authentication, auth.permit('admin'), function(req, res) {
    res.send('Thử nghiệm middle');
  });

module.exports = userRoutes;
