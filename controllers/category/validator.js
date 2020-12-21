const { body, check, validationResult } = require('express-validator');

const createCategoryValidation = [
  body('name')
    .not()
    .isEmpty()
    .withMessage('tên category không bỏ trống'),
  body('parent')
    .isMongoId()
    .optional()
    .withMessage('ID của parent không hợp lệ'),
];

const updateCategoryValidation = [
  body('id')
    .not()
    .isEmpty()
    .withMessage('id không được bỏ trống'),
  body('id')
    .isMongoId()
    .withMessage('ID của không hợp lệ'),
  body('parent')
    .isMongoId()
    .optional()
    .withMessage('ID của parent không hợp lệ'),
  body('id')
    .isMongoId()
    .optional()
    .withMessage('id không hợp lệ'),
];

module.exports = {
  createCategoryValidation,
  updateCategoryValidation,
};
