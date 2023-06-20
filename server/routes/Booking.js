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

booking.post('/',(req,res)=>{

  const{name,email,room_type,book_date,check_in_date,check_out_date,num_guests,status} = req.body;

  pool.execute(`SELECT id FROM status WHERE status_name = ?`,[status],(err,statusResult)=>{
    if (err){
      console.log("stat error",err)
    } 
    statusid = statusResult[0].id;  
    
    pool.execute(`SELECT id FROM room_types WHERE room_type = ?`,[room_type],(err,roomtypeResult)=>{
      if (err){
        console.log("roomtype error",err)
      } 
      roomid = roomtypeResult[0].id; 
      
      pool.execute(`INSERT INTO hotel_bookings(guest_name,email,room_type,booking_date,check_in_date,check_out_date,num_guests,status_id)
                    VALUES (?,?,?,?,?,?,?,?)`,[name,email,roomid,book_date,check_in_date,check_out_date,num_guests,statusid],(err,result)=>{
          if(err){
            res.status(500).json({status:500,message:"DB Error"})
            console.log(err)
          } else {
            res.status(200).json({status:200,message:"Booking Record added successfully."})
          }
      })
    })
  })
 

})
module.exports = booking;
