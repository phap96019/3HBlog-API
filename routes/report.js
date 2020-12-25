const express = require('express');
const adRoutes = express.Router();
const reportController = require('../controllers/report');
const { handleValidation } = require('../middleware/validatior');
const auth = require('../middleware/auth');

adRoutes.route('/load').get(reportController.loadReport);

module.exports = adRoutes;
