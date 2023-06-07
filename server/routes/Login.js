const express = require('express');
const login = express.Router();
const pool = require('../database');

login.get('/test', (req, res) => {
  res.send('hello from server');
});

module.exports = login;
