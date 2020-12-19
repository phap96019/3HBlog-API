const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.register = async (req, res) => {
  const { email, name, password } = req.body;
  const emailExist = await User.findOne({ email: email });
  if (emailExist) {
    res.status(403).send({
      success: false,
      message: 'Email đã tồn tại',
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({
      email: email,
      password: hash,
      name: name,
    });
    await newUser.save();
    res.status(201).send({
      success: true,
      message: 'Tạo người dùng thành công',
    });
  }
};
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  const emailExist = await User.findOne({ email: email });
  if (emailExist) {
    const match = await bcrypt.compare(password, emailExist.password);
    if (match) {
      const key = process.env.JWTSecret;
      const payload = {
        userId: emailExist._id,
      };
      const token = jwt.sign(payload, key, { expiresIn: '1d' });
      const refreshToken = jwt.sign(payload, key, { expiresIn: '7d' });
      emailExist.refreshToken = refreshToken;
      await emailExist.save();
      res.status(200).send({
        message: 'authentication done',
        token: token,
        refreshToken: refreshToken,
        role: emailExist.role,
      });
    } else {
      res.status(401).send({
        success: false,
        message: 'Email hoặc password không đúng!',
      });
    }
  } else {
    res.status(401).send({
      success: false,
      message: 'Email hoặc password không đúng!',
    });
  }
};

module.exports.refreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken || req.headers['refresh-token'];
  if (!refreshToken) {
    res.status(403).send({
      success: false,
      message: 'No token provided',
    });
  } else {
    const existRefreshToken = await User.findOne({
      refreshToken: refreshToken,
    });
    if (existRefreshToken) {
      const key = process.env.JWTSecret;
      try {
        jwt.verify(refreshToken, key, function(err, decoded) {
          if (err) {
            throw err;
          } else {
            const payload = {
              userId: existRefreshToken._id,
            };
            const token = jwt.sign(payload, key, { expiresIn: '1d' });
            res.status(200).send({
              token: token,
            });
          }
        });
      } catch (error) {
        res.status(403).send({
          success: false,
          message: error.message,
        });
      }
    } else {
      res.status(403).send({
        success: false,
        message: 'No token provided',
      });
    }
  }
};

module.exports.logout = async (req, res) => {
  const user = await User.findOne({ _id: req._idUser });
  user.refreshToken = '';
  await user.save();
  res.status(200).send({
    success: true,
    message: 'logout',
  });
};
