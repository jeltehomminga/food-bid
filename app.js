const express = require('express');
const app = express();
require('dotenv').config();
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const FoodProvider = require('./models/foodprovider');
const Foodlover = require('./models/foodlover');
app.locals.moment = require('moment');


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, err => err ? console.log(err) : console.log('connected'));

const setResLocalUser = (req, res, next) => {
  if (req.signedCookies.usertype === "foodlover") {
      Foodlover.findOne({ email: req.signedCookies.email })
          .then(result => {
              res.locals.user = result;
              res.locals.user.foodLover = true;
              next()
          })
          .catch(console.error())
  } else if (req.signedCookies.usertype === "foodprovider") {
      FoodProvider.findOne({ email: req.signedCookies.email })
          .then(result => {
              res.locals.user = result;
              res.locals.user.foodProvider = true;
              next()
          })
          .catch(console.error());
  } else next()
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));
app.use(express.static(path.join(__dirname, 'public')));
app.use(setResLocalUser);

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/signup', require('./routes/signup'));
app.use('/signin', require('./routes/signin'));
app.use('/auth', require('./routes/auth'));
app.use('/auth/profile', require('./routes/profile'));
app.use('/auth/signout', require('./routes/signout'));
app.use('/auth/allrequests', require('./routes/allrequests'));
app.use('/auth/requestdish',  require('./routes/requestdish'));
app.use('/auth/myrequests', require('./routes/myrequests'));
app.use('/auth/dishrequest', require('./routes/dishrequest'));
app.use('/auth/newbid', require('./routes/newbid'));
app.use('/auth/mybids', require('./routes/mybids'));
app.use('/auth/order', require('./routes/order'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;