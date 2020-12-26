const express = require('express');
const uploadRoutes = express.Router();
const uploadControllers = require('../controllers/upload/uploadController');
const auth = require('../middleware/auth');

uploadRoutes
  .route('/')
  .post(
    auth.authentication,
    auth.permit('admin'),
    uploadControllers.uploadFile
  );

module.exports = uploadRoutes;
