const express = require('express');
const authenticate = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const pool = require('../database');

const checkAuth = require('./CheckAuth');

// ----------------------- login route ----------------------- 

// localhost:PORT/login - temporary disabled in development.
// authenticate.get('/', (req, res) => {
//   // send the built react app html file here during production.
//   res.sendFile('index.html', { root: './public'});
// });

authenticate.get('/check', checkAuth, (req, res) => {
  res.status(200).json({user: req.user.id});
});

// localhost:PORT/login
authenticate.post('/', passport.authenticate('local'), function(req, res) {
  res.json({ msg: "Login Success", code: 200 });
});

// localhost:PORT/login/signout
authenticate.delete('/signout', checkAuth, (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    } else {
      res.status(200).json({ msg: 'Successfully logged out', code: 200 });
    }
  });
});

// ----------------------- passport-local setup ----------------------- 
passport.use(new LocalStrategy(function verify(username, password, callback) {
  pool.execute('SELECT * FROM `admin_users` WHERE id = ?', [username], (err, result) => {
    if (err) {
      return callback(err); 
    } else if (result.length === 0) {
      return callback(null, false, { message: 'That user admin does not exists in the database'}); // for dev only
      // return callback(null, false, { message: 'Incorrect username or password'}); // for release
    } else if (result.length > 1) {
      return callback(null, false, { message: 'That was not supposed to happen, the database table might be broken'}); // for dev only
    }

    crypto.pbkdf2(Buffer.from(password, 'utf-8').toString(), Buffer.from(result[0].salt, 'base64'), 200000, 64, 'sha512', function(err, hashedPassword) {
      if (err) {
        return callback(err);
      } else if (!crypto.timingSafeEqual(hashedPassword, Buffer.from(result[0].hash, 'base64'))) {
        return callback(null, false, { message: 'Incorrect Password'}); // for dev only
        // return callback(null, false, { message: 'Incorrect username or password'}); // for release
      }

      // this is where `passport.serializeUser()`s callback parameter `user` data comes from.
      return callback(null, result[0]);
    });
  });
}));

// happens during username and password authentication (login).
passport.serializeUser(function(user, callback) {
  process.nextTick(function() {
    // stores the new structure of the `user` data to the session table.
    return callback(null, { id: user.id });
  });
});

// happens everytime we `checkAuth` for an http route.
// the `user` parameter is the extracted `user` data in the session table.
passport.deserializeUser(function(user, callback) {
  process.nextTick(function() {
    // sets the `req.user` object on https requests after the `checkAuth` middleware.
    return callback(null, user);
  });
});

// ---------------------------------------------- 

module.exports = authenticate;
