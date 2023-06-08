const express = require('express');
const rooms = express.Router();
const pool = require('../database');

rooms.get('/test/rooms', (req, res) => {
  res.send('get request test : rooms');
});

module.exports = rooms;
