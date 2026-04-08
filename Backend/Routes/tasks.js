const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const auth = require('../MIDDLEWARE/Auth');

// Update task status (Mark as Done)
router.patch('/:id/complete', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'UPDATE tasks SET is_completed = true WHERE id = $1 RETURNING *',
            [id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;