const express = require('express');
const router = express.Router();
const db = require('../db');

// Add a new incident
router.post('/', (req, res) => {
  const { location, type, description, reported_by } = req.body;

  const sql = 'INSERT INTO incidents (location, type, description, reported_by, reported_at) VALUES (?, ?, ?, ?, NOW())';
  db.query(sql, [location, type, description, reported_by], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Incident reported successfully' });
  });
});

// Get all incidents (Admin use)
router.get('/', (req, res) => {
  db.query('SELECT * FROM incidents ORDER BY reported_at DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
});

module.exports = router;
