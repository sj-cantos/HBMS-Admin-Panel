const express = require("express");
const reports = express.Router();
const pool = require("../database");

const checkAuth = require("./CheckAuth");

reports.get("/test", checkAuth, (req, res) => {
  res.send("Hello admin " + req.user.id);
});

reports.get('/weekly-revenue', (req, res) => {
  const query = `
  SELECT WEEK(booking_date) AS week_number, SUM(amount_paid) AS revenue
  FROM hotel_bookings
  WHERE booking_date <= CURDATE() - INTERVAL WEEKDAY(CURDATE()) DAY
  GROUP BY WEEK(booking_date)
  ORDER BY WEEK(booking_date);
  `;

  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching weekly revenue:', error);
      res.status(500).json({ error: 'Error fetching weekly revenue' });
    } else {
      res.json(results);
    }
  });
});

module.exports = reports;
