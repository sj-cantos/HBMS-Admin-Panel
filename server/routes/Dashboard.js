const express = require("express");
const dashboard = express.Router();
const pool = require("../database");

const checkAuth = require("./CheckAuth");

dashboard.get("/test", checkAuth, (req, res) => {
  res.send("Hello admin " + req.user.id);
});

dashboard.get("/widget", (req, res) => {
  const today = new Date().toISOString().split("T")[0];

  pool.execute(
    `SELECT COUNT(*) AS totalBookings FROM hotel_bookings WHERE booking_date = current_date()`,
    
    (err, countRes) => {
      if (err) {
        res.status(500).json({ status: 500, message: "Server Error" });
        console.log(err);
      } else {
        const totalBookings = countRes[0].totalBookings;

        pool.execute(
          `SELECT SUM(CAST(num_guests AS UNSIGNED)) AS totalGuests FROM hotel_bookings WHERE check_in_date = current_date()`,
          
          (err, guestRes) => {
            if (err) {
              res.status(500).json({ status: 500, message: "Server Error" });
              console.log(err);
            } else {
              const totalGuests = guestRes[0].totalGuests;

              pool.execute(
                `SELECT COUNT(*) AS checkIns FROM hotel_bookings WHERE check_in_date = current_date()`,
                
                (err, checkInRes) => {
                  if (err) {
                    res
                      .status(500)
                      .json({ status: 500, message: "Server Error" });
                    console.log(err);
                  } else {
                    const checkIns = checkInRes[0].checkIns;

                    pool.execute(
                      `SELECT COUNT(*) AS checkOuts FROM hotel_bookings WHERE check_out_date = current_date()`,
                      
                      (err, checkOutRes) => {
                        if (err) {
                          res
                            .status(500)
                            .json({ status: 500, message: "Server Error" });
                          console.log(err);
                        } else {
                          const checkOuts = checkOutRes[0].checkOuts;

                          const response = {
                            totalBookings,
                            totalGuests,
                            checkIns,
                            checkOuts,
                          };

                          res.json(response);
                          console.log(response);
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

dashboard.get("/booking-count", (req, res) => {
  // Construct the SQL query to fetch the 7-daily booking count
  const query = `
    SELECT
      booking_date,
      COUNT(*) as count
    FROM
      hotel_bookings
    WHERE
      booking_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
    GROUP BY
      booking_date
    ORDER BY
      booking_date ASC;
  `;

  // Execute the query
  pool.execute(query, (error, results) => {
    if (error) {
      console.log("Error retrieving booking data:", error);
      res.status(500).json({ error: "Failed to retrieve booking data" });
    } else {
      // Prepare the data in the required format for Apex Charts
      const bookingData = results.map((row) => ({
        x: row.booking_date.toISOString(), // Convert to ISO string format for Apex Charts
        y: row.count,
      }));

      res.json(bookingData);
    }
  });
});

dashboard.get("/recent-bookings", (req, res) => {
  pool.execute(
    `SELECT * FROM hotel_bookings ORDER by booking_date DESC LIMIT 5`,
    (err, results) => {
      if (err) {
        res.status(500).json({ error: "Failed to retrieve booking data" });
      } else {
        res.json(results);
      }
    }
  );
});

dashboard.get("/popular-rooms", (req, res) => {
  // Construct the SQL query to fetch the most popular rooms
  const query = `
  SELECT hb.room_type, rt.room_type, COUNT(*) AS booking_count
  FROM hotel_bookings hb
  JOIN room_types rt ON hb.room_type = rt.id
  GROUP BY hb.room_type, rt.room_type
  ORDER BY booking_count DESC
  LIMIT 5;
  `;

  // Execute the query
  pool.query(query, (error, results) => {
    if (error) {
      console.error("Error retrieving popular rooms:", error);
      res.status(500).json({ error: "Failed to retrieve popular rooms" });
    } else {
      const popularRoomsData = results.map((row) => ({
        name: row.room_type,
        value: row.booking_count,
      }));

      res.json(popularRoomsData);
    }
  });
});

module.exports = dashboard;
