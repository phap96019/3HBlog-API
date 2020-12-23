const { body, check, validationResult } = require('express-validator');

const createAd = [
  body('link')
    .not()
    .isEmpty()
    .withMessage('link được không bỏ trống'),
];

const deleteAd = [
  body('id')
    .not()
    .isEmpty()
    .withMessage('id không được bỏ trống'),
  body('id')
    .isMongoId()
    .withMessage('ID của không hợp lệ'),
];

module.exports = {
  createAd,
  deleteAd,
};
