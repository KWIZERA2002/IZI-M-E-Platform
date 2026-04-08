const axios = require('axios');
const pool = require('../config/database');

const buildKoboAssetUrl = (uid, page = 1, pageSize = 1000) =>
  `https://kf.kobotoolbox.org/api/v2/assets/${encodeURIComponent(uid)}/data.json?format=json&page=${page}&page_size=${pageSize}`;

const normalizeRow = row => {
  const lower = Object.keys(row).reduce((acc, key) => {
    acc[key.trim().toLowerCase()] = row[key];
    return acc;
  }, {});

  const find = (...keys) => {
    for (const key of keys) {
      if (lower[key] !== undefined && lower[key] !== null && String(lower[key]).trim() !== '') return lower[key];
    }
    return null;
  };

  return { find };
};

const mapSubmission = async (submission, form) => {
  const mappings = await pool.query('SELECT kobo_field, platform_field, platform_table FROM kobo_field_mappings WHERE form_id = $1', [form.id]);
  if (!mappings.rows.length) return null;

  const row = normalizeRow(submission);
  const mapped = {};

  for (const mapping of mappings.rows) {
    const value = row.find(mapping.kobo_field);
    if (value !== null) {
      mapped[mapping.platform_field] = value;
    }
  }

  if (!Object.keys(mapped).length) return null;
  return { table: mappings.rows[0].platform_table, data: mapped };
};

const upsertRecord = async (table, data) => {
  if (table === 'farmers') {
    const existing = await pool.query('SELECT id FROM farmers WHERE identifier = $1 OR (name = $2 AND location = $3) LIMIT 1', [data.identifier || '', data.name, data.location]);
    if (existing.rows.length) {
      await pool.query(
        'UPDATE farmers SET phone = $1, cooperative = $2, project = $3, province = $4, district = $5, sector = $6, status = $7, sex = $8, age = $9, identifier = $10 WHERE id = $11',
        [data.phone, data.cooperative, data.project, data.province, data.district, data.sector, data.status, data.sex, data.age, data.identifier, existing.rows[0].id]
      );
      return false;
    }
    await pool.query(
      'INSERT INTO farmers (name, location, phone, cooperative, project, province, district, sector, status, sex, age, identifier) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',
      [data.name, data.location, data.phone, data.cooperative, data.project, data.province, data.district, data.sector, data.status, data.sex, data.age, data.identifier]
    );
    return true;
  }

  if (table === 'field_activities') {
    const existing = await pool.query('SELECT id FROM field_activities WHERE project = $1 AND type = $2 AND location = $3 AND planned_date = $4 LIMIT 1', [data.project, data.type, data.location, data.planned_date]);
    if (existing.rows.length) {
      await pool.query(
        'UPDATE field_activities SET actual_date = $1, team = $2, outputs = $3, findings = $4, status = $5 WHERE id = $6',
        [data.actual_date, data.team, data.outputs, data.findings, data.status, existing.rows[0].id]
      );
      return false;
    }
    await pool.query(
      'INSERT INTO field_activities (project, type, location, planned_date, actual_date, team, outputs, findings, status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
      [data.project, data.type, data.location, data.planned_date, data.actual_date, data.team, data.outputs, data.findings, data.status]
    );
    return true;
  }

  if (table === 'indicators') {
    const existing = await pool.query('SELECT id FROM indicators WHERE project = $1 AND code = $2 LIMIT 1', [data.project, data.code]);
    if (existing.rows.length) {
      await pool.query(
        'UPDATE indicators SET name = $1, baseline = $2, target_value = $3, actual_value = $4, unit = $5, source = $6, frequency = $7, responsible = $8, disagg = $9 WHERE id = $10',
        [data.name, data.baseline, data.target_value, data.actual_value, data.unit, data.source, data.frequency, data.responsible, data.disagg, existing.rows[0].id]
      );
      return false;
    }
    await pool.query(
      'INSERT INTO indicators (project, code, name, baseline, target_value, actual_value, unit, source, frequency, responsible, disagg) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)',
      [data.project, data.code, data.name, data.baseline, data.target_value, data.actual_value, data.unit, data.source, data.frequency, data.responsible, data.disagg]
    );
    return true;
  }

  return false;
};

const fetchAllKoboData = async (uid) => {
  const allRecords = [];
  let page = 1;
  while (true) {
    const url = buildKoboAssetUrl(uid, page);
    const response = await axios.get(url, {
      headers: { Authorization: `Token ${process.env.KOBO_API_TOKEN}` },
    });
    const pageRecords = response.data.results || [];
    allRecords.push(...pageRecords);
    if (!response.data.next) break;
    page += 1;
  }
  return allRecords;
};

const syncKoboData = async (form) => {
  if (!form || !form.uid) {
    throw new Error('KoBo form UID is required for sync');
  }
  try {
    const records = await fetchAllKoboData(form.uid);
    if (!Array.isArray(records)) {
      throw new Error('Unexpected KoBo response format');
    }

    let syncedCount = 0;
    for (const submission of records) {
      const submissionId = submission._id || submission.instanceID || submission.id || JSON.stringify(submission).slice(0, 100);
      if (!submissionId) continue;

      try {
        await pool.query(
          'INSERT INTO kobo_submissions (form_id, submission_id, project, form_type, raw_data) VALUES ($1,$2,$3,$4,$5)',
          [form.id || null, String(submissionId), form.project || '', form.type || '', JSON.stringify(submission)]
        );
      } catch (err) {
        // Duplicate submission, continue
      }

      const mapped = mapSubmission(submission, form);
      if (!mapped) continue;
      const inserted = await upsertRecord(mapped.table, mapped.data);
      if (inserted) syncedCount += 1;
    }

    console.log('Kobo sync complete. Records synced:', syncedCount);
    return { success: true, syncedCount };
  } catch (error) {
    console.error('Kobo Sync Failed:', error.response?.data || error.message || error);
    if (error.response?.status === 404) {
      throw new Error('KoBo asset not found. Check the UID or the form permission.');
    }
    throw error;
  }
};

module.exports = { syncKoboData };
