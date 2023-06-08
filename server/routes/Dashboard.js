const express = require('express');
const dashboard = express.Router();
const pool = require('../database');

dashboard.get('/test/dashboard', (req, res) => {
  res.send('get request test : dashboard');
});

module.exports = dashboard;
