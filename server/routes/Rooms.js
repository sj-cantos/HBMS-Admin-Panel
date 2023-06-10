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
    SELECT room_types.*, roomimages.room_url
    FROM room_types
    LEFT JOIN roomimages ON room_types.id = roomimages.room_type_id`,
    (err, result) => {
      if (err) {
        res.status(500).send("Database error");
      } else {
        // Transform the result into an object containing room types and their pictures
        const roomData = {};

        for (const row of result) {
          const { id, room_name, room_url } = row;

          if (!roomData[id]) {
            roomData[id] = {
              id,
              room_name,
              pictures: []
            };
          }

          if (room_url) {
            roomData[id].pictures.push(room_url);
          }
        }

        res.status(200).json(Object.values(roomData));
      }
    });
});


module.exports = rooms;
