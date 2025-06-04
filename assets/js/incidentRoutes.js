const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Report a new incident
router.post('/', (req, res) => {
  const { location, description, time } = req.body;

  if (!location || !description || !time) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const sql = "INSERT INTO incidents (location, description, time) VALUES (?, ?, ?)";
  db.query(sql, [location, description, time], (err, result) => {
    if (err) return res.status(500).json({ message: "Failed to report incident." });
    res.json({ message: "Incident reported successfully!" });
  });
});

// Get all incidents
router.get('/', (req, res) => {
  db.query("SELECT * FROM incidents ORDER BY time DESC", (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching incidents." });
    res.json(results);
  });
});

module.exports = router;
