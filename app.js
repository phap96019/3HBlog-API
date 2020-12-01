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
app.use('/user', userRoutes);
app.use('/category', categoryRoutes);
app.get('/', (req, res) => {
  return res.send('Welcome to 3HBlog');
});

module.exports = app;
