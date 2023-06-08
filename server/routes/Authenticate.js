const express = require('express');
const authenticate = express.Router();
const pool = require('../database');

authenticate.get('/test/auth', (req, res) => {
  res.send('get request test : auth');
});

module.exports = authenticate;
