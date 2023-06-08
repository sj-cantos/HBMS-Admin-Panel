const express = require('express');
const rooms = express.Router();
const pool = require('../database');

const checkAuth = require('./CheckAuth');

rooms.get('/test', checkAuth, (req, res) => {
  res.send('Hello admin ' + req.user.id);
});

module.exports = rooms;
