//Defines Core Modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
const MongoClient = require('mongodb').MongoClient;
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
const dboper = require('./operations');
const mongoose = require('mongoose');
const Dishes = require('./models/dishes');
var passport = require('passport');
var authenticate = require('./authenticate');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter =  require('./routes/dishRouter')
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');
var uploadRouter = require('./routes/uploadRouter');
var commentRouter = require('./routes/commentRouter');
const favoriteRouter = require('./routes/favoriteRouter')
var config = require('./config');

//Sets up Mongo Connection
mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
});

//Express Setup
var app = express();

//configs secure port redirection
app.all('*', (req, res, next)=>{
  if (req.secure) {
    return next();
  } else {
    res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url)
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Middleware Setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Basic authentication to prevent unauthed access to our static pages
app.use(passport.initialize());
app.use('/', indexRouter);
app.use('/users', usersRouter);

//Will forward specified routes to correct path
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);
app.use('/imageUpload', uploadRouter);
app.use('/comments', commentRouter);
app.use('/favorites', favoriteRouter);

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

//Executes Server Listener
module.exports = app;

