const express = require('express');
const dashboard = express.Router();
const pool = require('../database');

dashboard.get('/test/booking', (req, res) => {
  res.send('get request test : booking');
});

module.exports = dashboard;
