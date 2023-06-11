const express = require('express');
const booking = express.Router();
const pool = require('../database');

const checkAuth = require('./CheckAuth');

booking.get('/test', checkAuth, (req, res) => {
  res.send('Hello admin ' + req.user.id);
});

booking.get('/', (req,res)=>{
  pool.query('SELECT * FROM hotel_bookings',(err, result)=>{
    if(err){
      res.status(500).json({ msg: 'Database Error', code: 500 })
    } else {
      res.json(result);
    }
  })
})

module.exports = booking;
