const express = require('express');
const tagRoutes = express.Router();
const tagController = require('../controllers/tag/controller');

tagRoutes.route('/').get(tagController.load);

module.exports = tagRoutes;
