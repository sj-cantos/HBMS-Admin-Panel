const express = require('express');
const authenticate = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const pool = require('../database');

const checkAuth = require('./CheckAuth');

// ----------------------- login route ----------------------- 

authenticate.get('/', (req, res) => {
  // send the built react app html file here during production.
  res.sendFile('basic-login.html', { root: './public'});
});

authenticate.get('/success', checkAuth, (req, res) => {
  res.status(200).json({ msg: 'Login Success', code: 401 })
});

authenticate.get('/failed', checkAuth, (req, res) => {
  res.status(401).json({ msg: 'Loging Failed', code: 401 })
});

authenticate.post('/', passport.authenticate('local', {
  successRedirect: '/login/success',
  failureRedirect: '/login/failed'
}));

// ----------------------- passport-local setup ----------------------- 
passport.use(new LocalStrategy(function verify(username, password, callback) {
  console.debug('Authenticate.js: passport auth loaded');
  pool.execute('SELECT * FROM `admin_users` WHERE id = ?', [username], (err, result) => {
    if (err) {
      console.debug('Authenticate.js: error in sql query');
      return callback(err); 
    } else if (result.length === 0) {
      console.debug('Authenticate.js: user not found');
      return callback(null, false, { message: 'That user admin does not exists in the database'}); // for dev only
      // return callback(null, false, { message: 'Incorrect username or password'}); // for release
    } else if (result.length > 1) {
      console.debug('Authenticate.js: error in sql broken table');
      return callback(null, false, { message: 'That was not supposed to happen, the database table might be broken'}); // for dev only
    }

    crypto.pbkdf2(Buffer.from(password, 'utf-8').toString(), Buffer.from(result[0].salt, 'base64'), 200000, 64, 'sha512', function(err, hashedPassword) {
      if (err) {
        console.debug('Authenticate.js: hashing error');
        return callback(err);
      } else if (!crypto.timingSafeEqual(hashedPassword, Buffer.from(result[0].hash, 'base64'))) {
        console.debug('Authenticate.js: hash did not match');
        return callback(null, false, { message: 'Incorrect Password'}); // for dev only
        // return callback(null, false, { message: 'Incorrect username or password'}); // for release
      }

      console.debug('Authenticate.js: success');
      return callback(null, result[0]);
    });
  });
}));

passport.serializeUser(function(user, callback) {
  process.nextTick(function() {
    return callback(null, {
      id: user.id,
      username: user.username,
      picture: user.picture
    });
  });
});

passport.deserializeUser(function(user, callback) {
  process.nextTick(function() {
    return callback(null, user);
  });
});

// ---------------------------------------------- 

module.exports = authenticate;
