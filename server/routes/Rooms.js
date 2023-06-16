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

const handleUpload = async (imageData) => {
  try {
    const image = await cloudinary.uploader.upload(imageData, {
      folder: "roomUploads"
    });

    return image.secure_url;
  } catch (error) {
    console.log(error);
    return null;
  }
};
rooms.post('/', (req, res) => {
  const {  imageData, ...reqData } = req.body;

  handleUpload(imageData)
    .then((imageURL) => {
      const roomData = { ...reqData, imageURL };
      console.log(roomData);
      res.status(200).json({status: 200})
      responseSent = true;
      pool.execute('',(err,rows)=>{
        if(err && !responseSent){
          res.status(500).json({status: "500", error: err})
        }else{

        }
      })

      
    })
    .catch((error) => {
      console.log(error);
    })

 
});


module.exports = rooms;
