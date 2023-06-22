const express = require('express');
const dashboard = express.Router();
const pool = require('../database');

const checkAuth = require('./CheckAuth');

dashboard.get('/test', checkAuth, (req, res) => {
  res.send('Hello admin ' + req.user.id);
});

dashboard.get('/',(req,res)=>{
  
})

module.exports = dashboard;
