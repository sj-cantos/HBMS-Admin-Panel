const express = require('express');
const reports = express.Router();
const pool = require('../database');

const checkAuth = require('./CheckAuth');

reports.get('/test', checkAuth, (req, res) => {
  res.send('Hello admin ' + req.user.id);
});

module.exports = reports;
