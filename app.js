const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');

dotenv.config({ path: './.env' });

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Set template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

// 1) GLOBAL MIDDLEWARES

//Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// 2) ROUTES
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const postRoutes = require('./routes/post');
const configRoutes = require('./routes/config');
app.use('/user', userRoutes);
app.use('/category', categoryRoutes);
app.use('/post', postRoutes);
app.use('/config', configRoutes);
app.get('/', (req, res) => {
  return res.send('Welcome to 3HBlog v1.3');
});
app.use('*', (req, res) => {
  res.status(404).send('404 not found');
});

module.exports = app;
