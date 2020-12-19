const express = require('express');
const adRoutes = express.Router();
const adController = require('../controllers/adController');
const auth = require('../middleware/auth');

adRoutes
  .route('/create')
  .post(auth.authentication, auth.permit('admin'), adController.create);
adRoutes.route('/load').get(adController.loadAllAd);
adRoutes
  .route('/delete')
  .post(auth.authentication, auth.permit('admin'), adController.delete);
module.exports = adRoutes;