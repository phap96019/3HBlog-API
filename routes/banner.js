const express = require('express');
const bannerRoutes = express.Router();
const bannerController = require('../controllers/banner');
const validator = require('../controllers/banner/validator');
const { handleValidation } = require('../middleware/validatior');
const auth = require('../middleware/auth');

bannerRoutes.route('/create').post(
  auth.authentication,
  auth.permit('admin'),
  // validator.createAd,
  // handleValidation,
  bannerController.create
);
bannerRoutes.route('/loadAll').get(bannerController.loadAll);
bannerRoutes
  .route('/delete')
  .post(
    auth.authentication,
    auth.permit('admin'),
    validator.deleteBanner,
    handleValidation,
    bannerController.deleteBanner
  );
bannerRoutes
  .route('/changeStatus')
  .post(
    auth.authentication,
    auth.permit('admin'),
    validator.changeStatus,
    handleValidation,
    bannerController.changeStatus
  );
module.exports = bannerRoutes;
