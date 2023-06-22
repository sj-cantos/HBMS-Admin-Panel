const express = require('express');
const dashboard = express.Router();
const pool = require('../database');

const checkAuth = require('./CheckAuth');

dashboard.get('/test', checkAuth, (req, res) => {
  res.send('Hello admin ' + req.user.id);
});

dashboard.get('/widget', (req, res) => {
  const today = new Date().toISOString().split('T')[0];

  pool.execute(`SELECT COUNT(*) AS totalBookings FROM hotel_bookings`, (err, countRes) => {
    if (err) {
      res.status(500).json({ status: 500, message: "Server Error" });
      console.log(err);
    } else {
      const totalBookings = countRes[0].totalBookings;

      pool.execute(`SELECT SUM(num_guests) AS totalGuests FROM hotel_bookings`, (err, guestRes) => {
        if (err) {
          res.status(500).json({ status: 500, message: "Server Error" });
          console.log(err);
        } else {
          const totalGuests = guestRes[0].totalGuests;

          pool.execute(
            `SELECT COUNT(*) AS checkIns FROM hotel_bookings WHERE check_in_date = ?`,
            [today],
            (err, checkInRes) => {
              if (err) {
                res.status(500).json({ status: 500, message: "Server Error" });
                console.log(err);
              } else {
                const checkIns = checkInRes[0].checkIns;

                pool.execute(
                  `SELECT COUNT(*) AS checkOuts FROM hotel_bookings WHERE check_out_date = ?`,
                  [today],
                  (err, checkOutRes) => {
                    if (err) {
                      res.status(500).json({ status: 500, message: "Server Error" });
                      console.log(err);
                    } else {
                      const checkOuts = checkOutRes[0].checkOuts;

                      const response = {
                        totalBookings,
                        totalGuests,
                        checkIns,
                        checkOuts
                      };

                      res.json(response);
                    }
                  }
                );
              }
            }
          );
        }
      });
    }
  });
});


module.exports = dashboard;
