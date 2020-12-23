const express = require('express');
const adRoutes = express.Router();
const adController = require('../controllers/advertisement');
const validator = require('../controllers/advertisement/validator');
const { handleValidation } = require('../middleware/validatior');
const auth = require('../middleware/auth');

adRoutes
  .route('/create')
  .post(
    auth.authentication,
    auth.permit('admin'),
    validator.createAd,
    handleValidation,
    adController.create
  );
adRoutes.route('/load').get(adController.loadAllAd);
adRoutes
  .route('/delete')
  .post(
    auth.authentication,
    auth.permit('admin'),
    validator.deleteAd,
    handleValidation,
    adController.deleteAd
  );
module.exports = adRoutes;
