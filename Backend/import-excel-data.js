const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const pool = require('./config/database');

const DOWNLOADS = path.join(process.env.USERPROFILE || '', 'Downloads');
const CORDAID_CANDIDATES = [
  'Cordaid outreach database.xlsx',
  'Cordaid outreach database .xlsx',
];
const KIIWP_CANDIDATES = [
  'Database KIIWP2_UPDATED (1) (1).xlsx',
  'Database KIIWP2 _UPDATED (1) (1).xlsx',
];

function resolveFile(candidates) {
  for (const file of candidates) {
    const full = path.join(DOWNLOADS, file);
    if (fs.existsSync(full)) return full;
  }
  return null;
}

function normalizeHeader(value) {
  return String(value || '')
    .replace(/[\r\n]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function normalizeText(value) {
  return String(value || '')
    .replace(/[\r\n]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseSex(value) {
  const s = normalizeText(value).toLowerCase();
  if (!s) return 'M';
  if (s.startsWith('f')) return 'F';
  if (s.startsWith('m')) return 'M';
  return 'M';
}

function rowToNormalizedMap(row) {
  const map = {};
  for (const [k, v] of Object.entries(row || {})) {
    map[normalizeHeader(k)] = v;
  }
  return map;
}

function pick(map, aliases) {
  for (const key of aliases) {
    const v = map[normalizeHeader(key)];
    if (v !== undefined && v !== null && normalizeText(v) !== '') {
      return normalizeText(v);
    }
  }
  return '';
}

function readWorkbookRows(filePath, projectName) {
  const wb = xlsx.readFile(filePath);
  const collected = [];
  const profile = [];

  for (const sheetName of wb.SheetNames) {
    const sheet = wb.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json(sheet, { defval: '' });
    if (!rows.length) continue;

    const firstMap = rowToNormalizedMap(rows[0]);
    const hasNameColumn = Boolean(
      firstMap['names of participant'] ||
      firstMap['names'] ||
      firstMap['name of participant']
    );

    profile.push({
      sheetName,
      rows: rows.length,
      headers: Object.keys(rows[0]),
      hasNameColumn,
    });

    if (!hasNameColumn) continue;

    for (const rawRow of rows) {
      const map = rowToNormalizedMap(rawRow);
      const name = pick(map, ['Names of participant', 'Names', 'Name of participant']);
      if (!name) continue;

      const identifier = pick(map, ['ID number', 'ID Number', 'ID']);
      const cooperative = pick(map, ['Name of cooperative', 'Name of cooperative ', 'Name of Cooperative']);
      const sex = parseSex(pick(map, ['Sex']));
      const province = pick(map, ['Province']);
      const district = pick(map, ['District']);
      const sector = pick(map, ['Sector']);
      const cell = pick(map, ['Cell', 'Cell ']);
      const village = pick(map, ['Village']);
      const phone = pick(map, ['Phone number', 'Phone Number', 'Phone  number', 'Phone number ']);
      const location = [village, cell, sector, district, province].filter(Boolean).join(', ');

      collected.push({
        project: projectName,
        identifier,
        name,
        sex,
        cooperative,
        province,
        district,
        sector,
        phone,
        location,
        status: 'active',
      });
    }
  }

  return { profile, records: collected };
}

function mergePreferLonger(base, extra, field) {
  const a = normalizeText(base[field]);
  const b = normalizeText(extra[field]);
  if (!a && b) base[field] = b;
  if (a && b && b.length > a.length) base[field] = b;
}

function dedupeRecords(records) {
  const map = new Map();

  for (const rec of records) {
    const idKey = normalizeText(rec.identifier);
    const nameKey = normalizeText(rec.name).toLowerCase();
    const projKey = normalizeText(rec.project).toUpperCase();
    const fallback = `${projKey}|${nameKey}|${normalizeText(rec.sector).toLowerCase()}|${normalizeText(rec.cooperative).toLowerCase()}`;
    const key = idKey ? `ID:${idKey}` : `NK:${fallback}`;

    if (!map.has(key)) {
      map.set(key, { ...rec });
      continue;
    }

    const existing = map.get(key);
    mergePreferLonger(existing, rec, 'identifier');
    mergePreferLonger(existing, rec, 'phone');
    mergePreferLonger(existing, rec, 'cooperative');
    mergePreferLonger(existing, rec, 'province');
    mergePreferLonger(existing, rec, 'district');
    mergePreferLonger(existing, rec, 'sector');
    mergePreferLonger(existing, rec, 'location');
    if (!existing.sex && rec.sex) existing.sex = rec.sex;
  }

  return [...map.values()];
}

async function importFarmers(records) {
  await pool.query('BEGIN');
  let inserted = 0;
  try {
    for (const r of records) {
      await pool.query(
        `INSERT INTO farmers (identifier, name, sex, cooperative, province, district, sector, phone, project, location, status)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
        [
          r.identifier || null,
          r.name || null,
          r.sex || 'M',
          r.cooperative || null,
          r.province || null,
          r.district || null,
          r.sector || null,
          r.phone || null,
          r.project || null,
          r.location || null,
          r.status || 'active',
        ]
      );
      inserted += 1;
      if (inserted % 1000 === 0) {
        console.log(`Inserted ${inserted}/${records.length}...`);
      }
    }
    await pool.query('COMMIT');
  } catch (error) {
    await pool.query('ROLLBACK');
    throw error;
  }
  return inserted;
async function importFarmers(records) {
  let inserted = 0;
  for (const r of records) {
    await pool.query(
      `INSERT INTO farmers (identifier, name, sex, cooperative, province, district, sector, phone, project, location, status, intervention_type, intervention_name, intervention_date, accessed_loan, accessed_market, record_source)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`,
      [
        r.identifier || null,
        r.name || null,
        r.sex || 'M',
        r.cooperative || null,
        r.province || null,
        r.district || null,
        r.sector || null,
        r.phone || null,
        r.project || null,
        r.location || null,
        r.status || 'active',
        null,
        null,
        null,
        0,
        0,
        'excel_real',
      ]
    );
    inserted += 1;
    if (inserted % 1000 === 0) {
      console.log(`Inserted ${inserted}/${records.length}...`);
    }
  }
  return inserted;
}
}

async function main() {
  console.log('====================================================');
  console.log('IZI M&E: Real Excel Import (PSAC + KIIWP)');
  console.log('====================================================');

  const cordaidFile = resolveFile(CORDAID_CANDIDATES);
  const kiiwpFile = resolveFile(KIIWP_CANDIDATES);

  if (!cordaidFile) {
    throw new Error(`Missing Cordaid file in ${DOWNLOADS}. Expected one of: ${CORDAID_CANDIDATES.join(', ')}`);
  }
  if (!kiiwpFile) {
    throw new Error(`Missing KIIWP file in ${DOWNLOADS}. Expected one of: ${KIIWP_CANDIDATES.join(', ')}`);
  }

  console.log(`Using PSAC file: ${path.basename(cordaidFile)}`);
  console.log(`Using KIIWP file: ${path.basename(kiiwpFile)}`);

  if (pool.initializeSchema) {
    await pool.initializeSchema();
  }

  // Helps project-based filtering stay fast as table grows.
  await pool.query('CREATE INDEX IF NOT EXISTS idx_farmers_project ON farmers(project)');

  const psac = readWorkbookRows(cordaidFile, 'PSAC');
  const kiiwp = readWorkbookRows(kiiwpFile, 'KIIWP');

  console.log(`PSAC sheets scanned: ${psac.profile.length}`);
  console.log(`KIIWP sheets scanned: ${kiiwp.profile.length}`);
  console.log(`Raw PSAC rows parsed: ${psac.records.length}`);
  console.log(`Raw KIIWP rows parsed: ${kiiwp.records.length}`);

  const all = [...psac.records, ...kiiwp.records];
  const deduped = dedupeRecords(all);
  console.log(`Deduplicated beneficiaries: ${deduped.length}`);

  await pool.query('DELETE FROM farmers');
  const inserted = await importFarmers(deduped);

  const totals = await pool.query(`
    SELECT project, COUNT(*) AS total
    FROM farmers
    GROUP BY project
    ORDER BY project
  `);

  console.log('----------------------------------------------------');
  console.log(`Inserted farmers: ${inserted}`);
  totals.rows.forEach((r) => console.log(`${r.project || 'Unassigned'}: ${r.total}`));
  console.log('----------------------------------------------------');
  console.log('Import complete. Beneficiaries tab now uses real Excel data.');
}

main()
  .then(() => {
    if (typeof pool.close === 'function') pool.close();
    process.exit(0);
  })
  .catch((error) => {
    console.error('Import failed:', error.message);
    if (typeof pool.close === 'function') pool.close();
    process.exit(1);
  });
