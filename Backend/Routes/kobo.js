const express = require('express');
const router = express.Router();
const auth = require('../MIDDLEWARE/Auth');
const pool = require('../config/database');
const { syncKoboData } = require('../Services/KoboSync');

router.get('/forms', auth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM kobo_forms ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/forms', auth, async (req, res) => {
  const { id, uid, name, project, type, mapped_fields } = req.body;
  if (!id || !uid || !name) return res.status(400).json({ error: 'id, uid and name are required' });

  try {
    const existing = await pool.query('SELECT id FROM kobo_forms WHERE id = $1 OR uid = $2', [id, uid]);
    if (existing.rows.length) {
      return res.status(409).json({ error: 'A form with this UID or ID already exists' });
    }
    await pool.query(
      'INSERT INTO kobo_forms (id, uid, name, project, type, mapped_fields, status, submissions, last_sync) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [id, uid, name, project || '', type || '', mapped_fields || 0, 'connected', 0, null]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/forms/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM kobo_field_mappings WHERE form_id = $1', [id]);
    await pool.query('DELETE FROM kobo_forms WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/forms/:id/fields', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const formResult = await pool.query('SELECT uid FROM kobo_forms WHERE id = $1', [id]);
    if (!formResult.rows.length) return res.status(404).json({ error: 'Form not found' });
    const uid = formResult.rows[0].uid;

    const response = await axios.get(`https://kf.kobotoolbox.org/api/v2/assets/${encodeURIComponent(uid)}`, {
      headers: { Authorization: `Token ${process.env.KOBO_API_TOKEN}` },
    });

    const fields = response.data.content?.survey || [];
    const fieldNames = fields.map(f => f.name || f.$autoname).filter(Boolean);
    res.json({ fields: fieldNames });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/forms/:id/mappings', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT kobo_field, platform_field, platform_table FROM kobo_field_mappings WHERE form_id = $1 ORDER BY kobo_field', [id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/forms/:id/mappings', auth, async (req, res) => {
  const { id } = req.params;
  const { mappings } = req.body;
  if (!Array.isArray(mappings)) return res.status(400).json({ error: 'Mappings must be an array' });

  try {
    await pool.query('DELETE FROM kobo_field_mappings WHERE form_id = $1', [id]);
    for (const mapping of mappings) {
      if (mapping.kobo_field && mapping.platform_field && mapping.platform_table) {
        await pool.query(
          'INSERT INTO kobo_field_mappings (form_id, kobo_field, platform_field, platform_table) VALUES ($1, $2, $3, $4)',
          [id, mapping.kobo_field, mapping.platform_field, mapping.platform_table]
        );
      }
    }
    await pool.query('UPDATE kobo_forms SET mapped_fields = $1 WHERE id = $2', [mappings.length, id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/sync', auth, async (req, res) => {
  const { formId, uid, type, project } = req.body;
  try {
    let form = null;
    if (formId) {
      const result = await pool.query('SELECT * FROM kobo_forms WHERE id = $1', [formId]);
      form = result.rows[0];
    }
    if (!form && uid) {
      const result = await pool.query('SELECT * FROM kobo_forms WHERE uid = $1', [uid]);
      form = result.rows[0];
    }

    const fallback = { id: formId || `k${Date.now()}`, uid, name: 'KoBo Form', project: project || '', type: type || 'unknown' };
    const formToSync = form || fallback;

    const result = await syncKoboData(formToSync);
    if (form && result.syncedCount > 0) {
      await pool.query('UPDATE kobo_forms SET submissions = submissions + $1, last_sync = $2 WHERE id = $3', [result.syncedCount, new Date().toISOString(), form.id]);
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
