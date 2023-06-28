const express = require("express");
const reports = express.Router();
const pool = require("../database");

const checkAuth = require("./CheckAuth");

reports.get("/test", checkAuth, (req, res) => {
  res.send("Hello admin " + req.user.id);
});

reports.get('/weekly-revenue', (req, res) => {
  const query = `
    SELECT DATE_FORMAT(check_in_date, '%Y-%m') AS month,
           DATE_SUB(check_in_date, INTERVAL (WEEKDAY(check_in_date) + 1) DAY) AS week_start_date,
           SUM(amount_paid) AS revenue
    FROM hotel_bookings
    GROUP BY DATE_FORMAT(check_in_date, '%Y-%m'), DATE_SUB(check_in_date, INTERVAL (WEEKDAY(check_in_date) + 1) DAY)
    ORDER BY month, week_start_date;
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
