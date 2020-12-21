const { body, check, validationResult } = require('express-validator');

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
  handleValidation,
};
