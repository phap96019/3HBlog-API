const { body, check, validationResult } = require('express-validator');

const createComment = [
  body('content')
    .not()
    .isEmpty()
    .withMessage('content được không bỏ trống'),
  body('postId')
    .not()
    .isEmpty()
    .withMessage('id không được bỏ trống'),
  body('postId')
    .isMongoId()
    .withMessage('ID của không hợp lệ'),
];

module.exports = {
  createComment,
};
