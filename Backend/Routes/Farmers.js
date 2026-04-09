const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const auth = require('../MIDDLEWARE/Auth');

function toBool01(value) {
  if (value === true || value === 'true' || value === 1 || value === '1' || value === 'yes') return 1;
  return 0;
}

// GET /api/farmers (supports project/search/sex + intervention filters)
router.get('/', auth, async (req, res) => {
  try {
    const {
      project,
      search,
      sex,
      interventionType,
      interventionName,
      accessedLoan,
      accessedMarket,
    } = req.query;

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
    if (interventionType && interventionType !== 'All') {
      params.push(interventionType);
      conditions.push(`intervention_type = $${params.length}`);
    }
    if (interventionName && interventionName !== 'All') {
      params.push(interventionName);
      conditions.push(`intervention_name = $${params.length}`);
    }
    if (accessedLoan === '1' || accessedLoan === '0') {
      params.push(accessedLoan === '1');
      conditions.push(`accessed_loan = $${params.length}`);
    }
    if (accessedMarket === '1' || accessedMarket === '0') {
      params.push(accessedMarket === '1');
      conditions.push(`accessed_market = $${params.length}`);
    }
    if (search && search.trim()) {
      const s = `%${search.trim().toLowerCase()}%`;
      params.push(s);
      const n = params.length;
      conditions.push(
        `(lower(name) LIKE $${n} OR lower(location) LIKE $${n} OR lower(cooperative) LIKE $${n} OR lower(identifier) LIKE $${n} OR lower(intervention_name) LIKE $${n} OR lower(intervention_type) LIKE $${n})`
      );
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const result = await pool.query(
      `SELECT * FROM farmers ${where} ORDER BY project, intervention_type, intervention_name, name`,
      params
    );
    res.json(result.rows);
  } catch (err) {
    console.error('[Farmers GET]', err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/farmers/activity-summary (grouped by project + intervention)
router.get('/activity-summary', auth, async (req, res) => {
  try {
    const { project } = req.query;
    const params = [];
    const where = project && project !== 'All'
      ? `WHERE project = $1`
      : '';
    if (project && project !== 'All') params.push(project);

    const result = await pool.query(
      `SELECT
         project,
         COALESCE(intervention_type, 'Unclassified') AS intervention_type,
         COALESCE(intervention_name, 'Unspecified') AS intervention_name,
         COUNT(*) AS total,
         SUM(CASE WHEN COALESCE(accessed_loan, FALSE) THEN 1 ELSE 0 END) AS accessed_loan,
         SUM(CASE WHEN COALESCE(accessed_market, FALSE) THEN 1 ELSE 0 END) AS accessed_market
       FROM farmers
       ${where}
       GROUP BY project, intervention_type, intervention_name
       ORDER BY project, intervention_type, intervention_name`,
      params
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/farmers/training-activities
router.get('/training-activities', auth, async (req, res) => {
  try {
    const { project } = req.query;
    const params = [];
    let where = '';
    if (project && project !== 'All') {
      params.push(project);
      where = `WHERE project = $1`;
    }

    const result = await pool.query(
      `SELECT * FROM training_activities ${where}
       ORDER BY project, activity_type, activity_name`,
      params
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/farmers/training-activities
router.post('/training-activities', auth, async (req, res) => {
  const {
    project,
    activity_type,
    activity_name,
    description,
    status,
  } = req.body || {};

  if (!project || !activity_type || !activity_name) {
    return res.status(400).json({ error: 'project, activity_type and activity_name are required' });
  }

  try {
    const existing = await pool.query(
      `SELECT id FROM training_activities
       WHERE lower(project)=lower($1)
         AND lower(activity_type)=lower($2)
         AND lower(activity_name)=lower($3)
       LIMIT 1`,
      [project, activity_type, activity_name]
    );

    if (existing.rows.length) {
      const updated = await pool.query(
        `UPDATE training_activities
         SET description = $1, status = $2
         WHERE id = $3 RETURNING *`,
        [description || null, status || 'active', existing.rows[0].id]
      );
      return res.json(updated.rows[0]);
    }

    const created = await pool.query(
      `INSERT INTO training_activities (project, activity_type, activity_name, description, status)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING *`,
      [project, activity_type, activity_name, description || null, status || 'active']
    );

    res.status(201).json(created.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/farmers/import-activity
// Bulk import records for one activity/training context.
router.post('/import-activity', auth, async (req, res) => {
  const {
    project,
    intervention_type,
    intervention_name,
    intervention_date,
    records,
    record_source,
  } = req.body || {};

  if (!project || !intervention_type || !intervention_name) {
    return res.status(400).json({ error: 'project, intervention_type and intervention_name are required' });
  }
  if (!Array.isArray(records) || !records.length) {
    return res.status(400).json({ error: 'records array is required' });
  }

  try {
    // Ensure the activity definition exists for this project.
    await pool.query(
      `INSERT INTO training_activities (project, activity_type, activity_name, status)
       VALUES ($1,$2,$3,'active')
       ON CONFLICT (project, activity_type, activity_name)
       DO NOTHING`,
      [project, intervention_type, intervention_name]
    );

    let inserted = 0;

    for (const row of records) {
      if (!row?.name) continue;

      const location = row.location || [row.sector, row.district, row.province].filter(Boolean).join(', ');
      await pool.query(
        `INSERT INTO farmers (
          identifier, name, sex, age, district, province, sector, cooperative,
          phone, project, location, status,
          intervention_type, intervention_name, intervention_date,
          accessed_loan, accessed_market, record_source
        ) VALUES (
          $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18
        )`,
        [
          row.identifier || row.id || null,
          row.name,
          row.sex || 'M',
          row.age || null,
          row.district || null,
          row.province || null,
          row.sector || null,
          row.cooperative || null,
          row.phone || null,
          project,
          location || null,
          row.status || 'active',
          intervention_type,
          intervention_name,
          intervention_date || null,
          toBool01(row.accessed_loan),
          toBool01(row.accessed_market),
          record_source || 'activity_import',
        ]
      );
      inserted += 1;
    }

    res.json({ inserted, project, intervention_type, intervention_name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/farmers/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM farmers WHERE id = $1', [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Farmer not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/farmers
router.post('/', auth, async (req, res) => {
  const {
    name,
    sex,
    age,
    district,
    province,
    sector,
    cooperative,
    phone,
    project,
    location,
    status,
    identifier,
    intervention_type,
    intervention_name,
    intervention_date,
    accessed_loan,
    accessed_market,
    record_source,
  } = req.body || {};

  if (!name) return res.status(400).json({ error: 'Name is required' });

  try {
    const loc = location || [sector, district, province].filter(Boolean).join(', ');
    const result = await pool.query(
      `INSERT INTO farmers (
        identifier, name, sex, age, district, province, sector, cooperative,
        phone, project, location, status,
        intervention_type, intervention_name, intervention_date,
        accessed_loan, accessed_market, record_source
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18
      ) RETURNING *`,
      [
        identifier || null,
        name,
        sex || 'M',
        age || null,
        district || null,
        province || null,
        sector || null,
        cooperative || null,
        phone || null,
        project || null,
        loc,
        status || 'active',
        intervention_type || null,
        intervention_name || null,
        intervention_date || null,
        toBool01(accessed_loan),
        toBool01(accessed_market),
        record_source || 'manual',
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/farmers/:id
router.put('/:id', auth, async (req, res) => {
  const {
    name,
    sex,
    age,
    district,
    province,
    sector,
    cooperative,
    phone,
    project,
    location,
    status,
    identifier,
    intervention_type,
    intervention_name,
    intervention_date,
    accessed_loan,
    accessed_market,
    record_source,
  } = req.body || {};

  try {
    const loc = location || [sector, district, province].filter(Boolean).join(', ');
    const result = await pool.query(
      `UPDATE farmers SET
         identifier=$1, name=$2, sex=$3, age=$4, district=$5, province=$6,
         sector=$7, cooperative=$8, phone=$9, project=$10, location=$11, status=$12,
         intervention_type=$13, intervention_name=$14, intervention_date=$15,
         accessed_loan=$16, accessed_market=$17, record_source=$18
       WHERE id=$19 RETURNING *`,
      [
        identifier || null,
        name,
        sex || 'M',
        age || null,
        district || null,
        province || null,
        sector || null,
        cooperative || null,
        phone || null,
        project || null,
        loc,
        status || 'active',
        intervention_type || null,
        intervention_name || null,
        intervention_date || null,
        toBool01(accessed_loan),
        toBool01(accessed_market),
        record_source || 'manual',
        req.params.id,
      ]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'Farmer not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/farmers/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM farmers WHERE id=$1 RETURNING id', [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Farmer not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/farmers/stats/summary
router.get('/stats/summary', auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
         project,
         COUNT(*) AS total,
         SUM(CASE WHEN sex='F' THEN 1 ELSE 0 END) AS female,
         SUM(CASE WHEN sex='M' THEN 1 ELSE 0 END) AS male,
         SUM(CASE WHEN COALESCE(accessed_loan, FALSE) THEN 1 ELSE 0 END) AS accessed_loan,
         SUM(CASE WHEN COALESCE(accessed_market, FALSE) THEN 1 ELSE 0 END) AS accessed_market
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
