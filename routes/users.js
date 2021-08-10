var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST users signup. */
router.post('/signup', (req, res, next) => {
  //will find usernames that already exist and dissalow use of that username upon signup
  User.findOne({username: req.body.username})
  .then((user) => {
      if(user != null) {
        var err = new Error('User ' + req.body.username + ' already exists!');
        err.status = 403;
        next(err);
      }
    //if username is not taken, we will create a new user
    else {
      return User.create({
        username: req.body.username,
        password: req.body.password});
    }
  })
  .then((user) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({status: 'Registration Successful!', user: user});
  }, (err) => next(err))
  .catch((err) => next(err));
});

/* POST user Login. */
router.post('/login', (req, res, next) => {
   //if the signed cookie does not contain the user authorization, then we expect the user to authorize themselves
   if(!req.session.user) {
    var authHeader = req.headers.authorization;

    //if a user is not authorized, return error message
    if (!authHeader) {
        var err = new Error ('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }

    //convert password to base64 to keep it hidden in stored cookie
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');

    //sets uniqueness value {0} = high, {1} = low
    var username = auth[0];
    var password = auth[1];

    //searches for username entered in the database to see if it exists
    User.findOne({username : username})
    //if the username is empty or does not exisy
    .then((user) => {
      if(user === null) {
        var err = new Error ('User ' + req.body.username + ' does not exist, please try again.');
        err.status = 403;
        return next(err);
      }
      //if the username is correct but password incorrect
      else if (user.password !== password) {
        var err = new Error ('Your username or password is incorrect, please try again.');
        err.status = 403;
        return next(err);
      }
      //if the username and password is correct, proceed to log in
      else if (user.username === username && user.password === password) {
          req.session.user = 'authenticated';
          rest.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end('You are authenticated!');
        } 
    })
    .catch((err) => next(err));
  }
  //else if user is already logged in
  else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('You are already logged in!');
  }
});

/* GET user Log Out. */
router.get('/logout', (req, res) => {
  //if a logged in user logs out, all session data will be removed from stored cookies on the server, and redirect to homepage
  if(req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  //if the user is not logged in but wants to log out
  else {
    var err = new Error ('You are not logged in.');
    err.status = 403;
    next(err);
  }
});

module.exports = router;
