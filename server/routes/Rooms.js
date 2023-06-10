const express = require('express');
const rooms = express.Router();
const pool = require('../database');

const checkAuth = require('./CheckAuth');

rooms.get('/test', checkAuth, (req, res) => {
  res.send('Hello admin ' + req.user.id);
});

// Define the route handler for GET request
rooms.get('/get', (req, res) => {
  pool.execute(`
  SELECT * FROM room_types`,
    (err, result) => {
      if (err) {
        res.status(500).send("Database error" + err.message);
      } else {
      
        
          
          const response = result.map((row)=>({
            "id" : row.id,
            "room_type" : row.room_type,
            "amenities" : row.amenities,
            "status": row.status,
            "price": row.price,
            "bed_type": row.bed_type,
            "pictures" : []
          }))

          res.send(response);
          
      }
    });
});


module.exports = rooms;
