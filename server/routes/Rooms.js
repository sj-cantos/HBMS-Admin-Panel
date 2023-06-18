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
      pool.execute(`INSERT INTO room_types(room_type,bed_type,amenities,price) VALUES(?,?,?,?)`,[roomData.name,roomData.bedType,roomData.amenities,roomData.price],(err,row)=>{
        if(err){
          console.log(err)
          res.status(500).json({ status: "500", error: err });
          return;
        }else{
          const roomID = row.insertId;
          console.log("saved room data success")
          pool.execute(`INSERT INTO roomimages(room_url,room_type) VALUES(?,?)`,[roomData.imageURL,roomID],(err,row)=>{
            if(err){
              console.log(err)
              res.status(500).json({ status: "500", error: err });
              return;
            }
              
              else{
               console.log("saved image successfully", row.affectedRows)
               res.status(200).json({ status: "200", message: "Data saved successfully" });
              }
          })

        }
      })

      
    })
    .catch((error) => {
      console.log(error);
    })

 
});


rooms.put('/', (req, res) => {
  const { updatedRoomData } = req.body;
      // Update the room data in the database
      console.log(updatedRoomData.name)
      pool.execute(
        `UPDATE room_types SET room_type=?, bed_type=?, amenities=?, price=? WHERE id=?`,
        [updatedRoomData.name, updatedRoomData.bed_type, updatedRoomData.amenities, updatedRoomData.price, updatedRoomData.id],
        (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).json({ status: "500", error: err });
            return;
          } else {
            console.log("Updated room data successfully");

            
            
            } 
})})
       
rooms.delete('/:id',(req,res)=>{
  const deleteId = req.params.id;

  pool.execute('DELETE FROM roomimages WHERE room_type=?',[deleteId],(err,result)=>{
    if(err){
      console.log(err)
      res.status(500).json({status:500,message:err})
      return;
    } else {
      console.log("Affected rows", result.affectedRows)
      pool.execute('DELETE FROM room_types WHERE id=?',[deleteId],(err,result)=>{
        if(err){
          console.log(err)
          res.status(500).json({status:500,message:err})
          return;
        } else {
          console.log("Affected rows", result.affectedRows)
          res.status(200).json({status:200, message:"Room succesfully deleted"})
      }
      })
   
  }
  })

  

  
})

module.exports = rooms;
