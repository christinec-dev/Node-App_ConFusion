var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');
const cors = require('./cors');

/* GET users listing. */
router.options('*', cors.corsWithOptions, (req, res) => {res.sendStatus(200)});
router.get('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  User.find({}).then(users => {
    if (users) {
      res.json(users)
    }
    else {
      next(err);
    }
  })
    .catch(err => next(err));
});

/* POST users signup. */
router.post('/signup', cors.corsWithOptions, (req, res, next) => {
  //will find usernames that already exist and dissalow use of that username upon signup
  User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
      if(err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({err : err});
      }
      //if username is not taken, we will create a new user
      else {
        if (req.body.firstname)
          user.firstname = req.body.firstname;

        if (req.body.lastname)
          user.lastname = req.body.lastname;

        user.save((err, user) => {
          if(err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({err : err});
          }
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: 'Registration Successful!'});
          });
        })
      }
  });
});

/* POST user Login. */
router.post('/login', cors.corsWithOptions, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    //in case of error
    if (err)
      return next(err);
    //in case of user not found
    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: false, status: 'Login Unsuccessful!', err: info});
    }
    //in case of login error  
    req.logIn(user, (err) => {
      if (err) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false, status: 'Login Unsuccessful!', err: 'Could not log in user!'});          
      }
      //in case of login success
      var token = authenticate.getToken({_id: req.user._id});
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: true, status: 'Login Successful!', token: token});
    }); 
  }) (req, res, next);
});


/* GET user Log Out. */
router.get('/logout', cors.corsWithOptions, (req, res) => {
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

/* Facebook Login. */
router.get('/facebook/token', passport.authenticate('facebook-token'), (req, res,) => {
  if(req.user) {
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'Login Successful!'});
  }
  //if the user is not logged in but wants to log out
  else {
    var err = new Error ('You are not logged in.');
    err.status = 403;
    next(err);
  }
});

/* Token Validation Checker */
router.get('/checkJWTtoken', cors.corsWithOptions, (req, res) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    if (err)
      return next(err);
    
    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT invalid!', success: false, err: info});
    }
    else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT valid!', success: true, user: user});

    }
  }) (req, res);
});

module.exports = router;
