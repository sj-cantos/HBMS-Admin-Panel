const express = require('express');
const booking = express.Router();
const pool = require('../database');

const checkAuth = require('./CheckAuth');

booking.get('/test', checkAuth, (req, res) => {
  res.send('Hello admin ' + req.user.id);
});

booking.get('/', (req,res)=>{
  pool.query(`SELECT hotel_bookings.*, status.status_name,room_types.room_type
              FROM hotel_bookings
              JOIN status ON status.id = hotel_bookings.status_id
              JOIN room_types ON room_types.id = hotel_bookings.room_type`,(err, result)=>{
    if(err){
      res.status(500).json({ msg: 'Database Error', code: 500 })
    } else {
      res.json(result);
    }
  })
})

module.exports = booking;
