const jwt = require('jsonwebtoken');
const authentication = (req, res, next) => {
  const token = req.body.token || req.headers['token'] || req.query.token;
  if (!token) {
    res.status(403).send('No token provided');
  } else {
    const key = process.env.JWTSecret;
    try {
      jwt.verify(token, key, function (err, decoded) {
        if (err) {
          throw err
        } else {
          req._idUser = decoded.userId;
          next();
        }
      });
    } catch (error) {
      res.status(403).send({
        success: false,
        message: error.message
      });
    }
  }

}

module.exports = {
  authentication,
}