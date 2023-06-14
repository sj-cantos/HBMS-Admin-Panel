const express = require('express');
const rooms = express.Router();
const pool = require('../database');
const cloudinary = require('../cloudinaryConfig')
const checkAuth = require('./CheckAuth');

rooms.get('/test', checkAuth, (req, res) => {
  res.send('Hello admin ' + req.user.id);
});

// Define the route handler for GET request
rooms.get('/', (req, res) => {
  pool.execute(`
  SELECT room_types.*, roomimages.room_url
  FROM room_types
  JOIN roomimages ON room_types.id = roomimages.room_type
`,
    (err, result) => {
      if (err) {
        res.status(500).send("Database error" + err.message);
      } else {
      
        const rooms = {};
        
        result.forEach((row) => {
          const roomId = row.id;
          if (!rooms[roomId]) {
            rooms[roomId] = {
              id: row.id,
              name: row.room_type,
              amenities: row.amenities,
              status: row.status,
              price: row.price,
              bed_type: row.bed_type,
              images: []
            };
          }
          rooms[roomId].images.push(row.room_url);
        });
    
        res.json(Object.values(rooms));
          
      }
    });
});

rooms.post('/', (req, res) => {
  const { roomData, images } = req.body;

  pool.execute(
    `INSERT INTO room_types (room_type, bed_type, price, amenities)
     VALUES (?, ?, ?, ?)`,
    [roomData.name, roomData.bedType, roomData.price, roomData.amenities],
    (err, result) => {
      if (err) {
        console.error('Error inserting room data:', err);
        return res.status(500).json({ error: 'Failed to insert room data' });
      }

      const roomId = result.insertId;

      const imageData = images.map((image) => [roomId, image.url]);

      pool.execute(
        `INSERT INTO roomimages (room_type, room_url)
         VALUES ?`,
        [imageData],
        (err, result) => {
          if (err) {
            console.error('Error inserting room images:', err);
            return res.status(500).json({ error: 'Failed to insert room images' });
          }

          return res.status(200).json({ message: 'Room data and images saved successfully' });
        }
      );
    }
  );
});


module.exports = rooms;
