const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const auth = require('../MIDDLEWARE/Auth');

// Get all farmers
router.get('/', auth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM farmers');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;