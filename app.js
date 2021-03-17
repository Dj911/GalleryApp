//// MODULE EXPORTS
var createError = require('http-errors');
var express = require('express');
var path = require('path');
const multer = require('multer');
const dotenv = require('dotenv');
const helmet = require('helmet');

dotenv.config({ path: "./config/config.env" });

const cons = require('consolidate');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

///////// FILE IMPORTS


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');    // DEFAULT ROUTE
const userRoute = require('./routes/user');     // APP ROUTE
const mediaRoute = require('./routes/media');     // APP ROUTE


var app = express();

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname)));

app.use(logger('dev')); //TODO: Morgan + Winston
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('', indexRouter);
app.use('/users', usersRouter);

app.use('/user', userRoute);
app.use('/media', mediaRoute);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// APPLICATIONS MIDDLEWARE
// app.use('/user', userRoute);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log(err)
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    status: 'MAIN Error',
    message: err.message
  });
  // res.render('error');
});

module.exports = app;
