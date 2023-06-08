const express = require('express');
const reports = express.Router();
const pool = require('../database');

reports.get('/test/reports', (req, res) => {
  res.send('get request test : reports');
});

module.exports = reports;
