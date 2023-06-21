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

const formatDate = (dateString) => {
  const date = new Date(dateString);
const isoString = date.toISOString();
return isoString.split('T')[0];
};

booking.put('/:id',(req,res)=>{
  const {guest_name,email,room_type,booking_date,check_in_date,check_out_date,num_guests,status_name} = req.body;
  const bookId = req.params.id;
    pool.execute('SELECT id FROM status WHERE status_name = ?',[status_name],(err,status_result)=>{
      if(err){
        console.log("Error after querying on status",err);
        res.status(500).json({status:500,message:"DB Error after query"})
        return;
      }else{
        const status_id = status_result[0].id;
        pool.execute('SELECT id FROM room_types WHERE room_type = ?',[room_type],(err,roomtypes_res)=>{
          if(err){
            console.log("Error after querying on status",err)
            res.status(500).json({status:500,message:"Server Error after query"})
            return;
          }else {
            const room_id = roomtypes_res[0].id;
            pool.execute(`UPDATE hotel_bookings SET guest_name = ?,email = ?, room_type = ?, booking_date = ?, check_in_date = ?, 
                           check_out_date = ?, num_guests = ?, status_id = ? WHERE id = ?`,[
                            guest_name,
                            email,
                            room_id,
                            formatDate(booking_date),
                            formatDate(check_in_date),
                            formatDate(check_out_date),
                            num_guests,
                            status_id,
                            bookId
                           ],(err,result)=>{
              if(err){
                console.log("Update query error",err)
                res.status(500).json({status:500,message:"Server Error"})
                return;
              }else {
                res.status(200).json({status:200,message:"Updated successfully"})
                console.log("Booking updated successfully")
                return;
              }

            })
          }
        })
      }
    })
})
module.exports = booking;
