const { body, check, validationResult } = require('express-validator');

const deleteBanner = [
  body('id')
    .not()
    .isEmpty()
    .withMessage('id không bỏ trống'),
  body('id')
    .isMongoId()
    .withMessage('ID không hợp lệ'),
];

const changeStatus = [
  body('id')
    .not()
    .isEmpty()
    .withMessage('id không bỏ trống'),
  body('id')
    .isMongoId()
    .withMessage('ID không hợp lệ'),
];

module.exports = {
  deleteBanner,
  changeStatus,
};
