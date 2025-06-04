const express = require('express');
const router = express.Router();

router.get('/stats', (req, res) => {
  // Simulate live data
  const stats = {
    vehicleCount: Math.floor(Math.random() * 500),
    congestionLevel: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
    accuracyScore: `${Math.floor(Math.random() * 10) + 90}%`
  };
  res.json(stats);
});

module.exports = router;
