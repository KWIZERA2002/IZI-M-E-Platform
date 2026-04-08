const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const auth = require('../MIDDLEWARE/Auth');

// ── GET /api/farmers  (supports ?project=PSAC&search=&sex=)
router.get('/', auth, async (req, res) => {
  try {
    const { project, search, sex } = req.query;
    const conditions = [];
    const params = [];

    if (project && project !== 'All') {
      params.push(project);
      conditions.push(`project = $${params.length}`);
    }
    if (sex && (sex === 'M' || sex === 'F')) {
      params.push(sex);
      conditions.push(`sex = $${params.length}`);
    }
    if (search && search.trim()) {
      const s = `%${search.trim().toLowerCase()}%`;
      params.push(s);
      const n = params.length;
      conditions.push(
        `(lower(name) LIKE $${n} OR lower(location) LIKE $${n} OR lower(cooperative) LIKE $${n} OR lower(identifier) LIKE $${n})`
      );
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const result = await pool.query(
      `SELECT * FROM farmers ${where} ORDER BY project, name`,
      params
    );
    res.json(result.rows);
  } catch (err) {
    console.error('[Farmers GET]', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/farmers/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM farmers WHERE id = $1', [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Farmer not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/farmers
router.post('/', auth, async (req, res) => {
  const { name, sex, age, district, province, sector, cooperative, phone, project, location, status, identifier } = req.body || {};
  if (!name) return res.status(400).json({ error: 'Name is required' });
  try {
    const loc = location || [sector, district, province].filter(Boolean).join(', ');
    const result = await pool.query(
      `INSERT INTO farmers (identifier, name, sex, age, district, province, sector, cooperative, phone, project, location, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
      [identifier || null, name, sex || 'M', age || null, district || null, province || null,
       sector || null, cooperative || null, phone || null, project || null, loc, status || 'active']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── PUT /api/farmers/:id
router.put('/:id', auth, async (req, res) => {
  const { name, sex, age, district, province, sector, cooperative, phone, project, location, status, identifier } = req.body || {};
  try {
    const loc = location || [sector, district, province].filter(Boolean).join(', ');
    const result = await pool.query(
      `UPDATE farmers SET
         identifier=$1, name=$2, sex=$3, age=$4, district=$5, province=$6,
         sector=$7, cooperative=$8, phone=$9, project=$10, location=$11, status=$12
       WHERE id=$13 RETURNING *`,
      [identifier || null, name, sex || 'M', age || null, district || null, province || null,
       sector || null, cooperative || null, phone || null, project || null, loc, status || 'active',
       req.params.id]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'Farmer not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── DELETE /api/farmers/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM farmers WHERE id=$1 RETURNING id', [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Farmer not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/farmers/stats/summary  (counts per project)
router.get('/stats/summary', auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
         project,
         COUNT(*) AS total,
         SUM(CASE WHEN sex='F' THEN 1 ELSE 0 END) AS female,
         SUM(CASE WHEN sex='M' THEN 1 ELSE 0 END) AS male
       FROM farmers
       GROUP BY project
       ORDER BY project`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
