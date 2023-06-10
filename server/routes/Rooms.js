const express = require('express');
const rooms = express.Router();
const pool = require('../database');

const checkAuth = require('./CheckAuth');

rooms.get('/test', checkAuth, (req, res) => {
  res.send('Hello admin ' + req.user.id);
});

rooms.get('/get', (req,res)=>{
    pool.execute('SELECT * FROM `room_types`',(err,result)=>{
      if(err){
        res.send("Database error");
      }else{
        res.json(result);
      }
    })
})




module.exports = rooms;
