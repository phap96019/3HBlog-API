const express = require('express');
const adRoutes = express.Router();
const adController = require('../controllers/adController');
const auth = require('../middleware/auth');

adRoutes.route('/create').post(adController.create);
adRoutes.route('/load').get(adController.loadAllAd);
adRoutes.route('/delete').post(adController.delete);
module.exports = adRoutes;
