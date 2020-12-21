const express = require('express');
const adRoutes = express.Router();
const adController = require('../controllers/advertisement');
const auth = require('../middleware/auth');

adRoutes
  .route('/create')
  .post(auth.authentication, auth.permit('admin'), adController.create);
adRoutes.route('/load').get(adController.loadAllAd);
adRoutes
  .route('/delete')
  .post(auth.authentication, auth.permit('admin'), adController.deleteAd);
module.exports = adRoutes;
