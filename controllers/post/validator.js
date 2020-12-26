const { body, check, validationResult } = require('express-validator');

const updatePost = [
  check('id')
    .not()
    .isEmpty()
    .withMessage('id được không bỏ trống'),
  check('id')
    .isMongoId()
    .withMessage('ID của không hợp lệ'),
];

module.exports = {
  updatePost,
};
