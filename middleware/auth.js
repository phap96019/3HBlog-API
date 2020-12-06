const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authentication = (req, res, next) => {
  const token = req.body.token || req.headers['token'] || req.query.token;
  if (!token) {
    res.status(403).send('No token provided');
  } else {
    const key = process.env.JWTSecret;
    try {
      jwt.verify(token, key, function(err, decoded) {
        if (err) {
          throw err;
        } else {
          req._idUser = decoded.userId;
          next();
        }
      });
    } catch (error) {
      res.status(403).send({
        success: false,
        message: error.message,
      });
    }
  }
};

const permit = (allowed) => {
  // return a middleware
  return async (req, res, next) => {
    const user = await User.findOne({ _id: req._idUser });
    if (req._idUser && user.role === allowed) {
      next(); // role is allowed, so continue on the next middleware
    } else {
      res
        .status(401)
        .json({ success: false, errors: { message: 'Permission denied!' } }); // user is forbidden
    }
  };
};

module.exports = {
  authentication,
  permit,
};
