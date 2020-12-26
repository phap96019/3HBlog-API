const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

dotenv.config({ path: './.env' });

// 1) GLOBAL MIDDLEWARES
const app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// limit requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

//Set template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

//Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// 2) ROUTES
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const postRoutes = require('./routes/post');
const configRoutes = require('./routes/config');
const adRoutes = require('./routes/ad');
const commentRoutes = require('./routes/comment');
const bannerRoutes = require('./routes/banner');
const reportRoutes = require('./routes/report');
const uploadRoutes = require('./routes/upload');
app.use('/user', userRoutes);
app.use('/category', categoryRoutes);
app.use('/post', postRoutes);
app.use('/config', configRoutes);
app.use('/ad', adRoutes);
app.use('/comment', commentRoutes);
app.use('/banner', bannerRoutes);
app.use('/report', reportRoutes);
app.use('/upload', uploadRoutes);
app.get('/', (req, res) => {
  return res.send('Welcome to 3HBlog v2.4');
});
app.use('*', (req, res) => {
  res.status(404).send('404 not found');
});

module.exports = app;
