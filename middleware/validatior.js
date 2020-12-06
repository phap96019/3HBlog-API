const { body, check, validationResult } = require('express-validator');

const registerValidation = [
  body('email')
    .not()
    .isEmpty()
    .withMessage('email không được bỏ trống'),
  body('email')
    .isEmail()
    .withMessage('email không hợp lệ'),
  body('email')
    .not()
    .isEmpty()
    .withMessage('mật khẩu không được để trống'),
];

const loginValidation = [
  body('email')
    .not()
    .isEmpty()
    .withMessage('email không được bỏ trống'),
  body('email')
    .isEmail()
    .withMessage('email không hợp lệ'),
  body('email')
    .not()
    .isEmpty()
    .withMessage('mật khẩu không được để trống'),
];

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
  // check('id')
  //   .not()
  //   .isEmpty()
  //   .withMessage('id không được bỏ trống'),
  body('parent')
    .isMongoId()
    .optional()
    .withMessage('ID của parent không hợp lệ'),
  body('id')
    .isMongoId()
    .optional()
    .withMessage('id không hợp lệ'),
];

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const httpCode = 400;
    return res
      .status(httpCode)
      .send({ success: false, errors: errors.errors[0].msg });
  }

  return next();
};

module.exports = {
  registerValidation,
  loginValidation,
  createCategoryValidation,
  updateCategoryValidation,
  handleValidation,
};
