'use strict';

const pool = require('./config/database');
const { PROJECTS } = require('./seed-projects');

const DATABASE_URL = process.env.DATABASE_URL || '';
const IS_POSTGRES  = DATABASE_URL && !DATABASE_URL.startsWith('sqlite://');

// Always store array fields as JSON strings — works for TEXT columns in both Postgres and SQLite.
function toDbArray(value) {
  if (!value) return '[]';
  if (Array.isArray(value)) return JSON.stringify(value);
  try { JSON.parse(value); return value; } catch { return '[]'; }
}

/**
 * Migrates legacy TEXT[] columns to TEXT on Render Postgres.
 * Safe to call on every startup — skips if columns are already TEXT.
 */
async function migrateProjectColumns() {
  if (!IS_POSTGRES) return;
  const ARRAY_COLS = ['donors', 'partners', 'funding_sources', 'co_financiers', 'key_activities', 'key_indicators'];
  try {
    const check = await pool.query(
      `SELECT column_name FROM information_schema.columns
       WHERE table_name = 'projects' AND data_type = 'ARRAY'
         AND column_name = ANY($1)`,
      [ARRAY_COLS]
    );
    if (!check.rows.length) return;
    console.log(`[CATALOGUE] Migrating TEXT[] columns: ${check.rows.map((r) => r.column_name).join(', ')}`);
    for (const { column_name: col } of check.rows) {
      await pool.query(
        `ALTER TABLE projects ALTER COLUMN ${col} TYPE TEXT USING array_to_json(${col})::text`
      );
    }
    console.log('[CATALOGUE] Column migration complete');
  } catch (err) {
    console.warn('[CATALOGUE] Column migration skipped:', err.message);
  }
}

const EXPECTED_PROJECTS   = new Set(PROJECTS.map((p) => p.name));
const LEGACY_DUMMY_PROJECTS = new Set(['LWH', 'FRM']);

const INDICATORS = [
  { project: 'TREPA', code: 'TREPA-O1.1', name: '# farmers trained on improved agri practices', baseline: 0,    target_value: 5000, actual_value: 3840, unit: 'farmers', source: 'Training registers',  frequency: 'Quarterly',  responsible: 'M&E Officer',  disagg: 'Sex, Age' },
  { project: 'TREPA', code: 'TREPA-O1.2', name: '% increase in household income',                  baseline: 0,    target_value: 30,   actual_value: 18,   unit: '%',       source: 'HH Survey',          frequency: 'Annual',     responsible: 'M&E Officer',  disagg: 'Sex' },
  { project: 'TREPA', code: 'TREPA-O2.1', name: '# cooperatives with improved governance',         baseline: 2,    target_value: 25,   actual_value: 17,   unit: 'coops',   source: 'Audit reports',      frequency: 'Annual',     responsible: 'M&E Officer',  disagg: 'Province' },
  { project: 'KIIWP', code: 'KIIWP-O1.1', name: '# hectares under irrigation',                     baseline: 450,  target_value: 1200, actual_value: 870,  unit: 'ha',      source: 'Field measurement',  frequency: 'Bi-annual',  responsible: 'Field Officer', disagg: 'None' },
  { project: 'KIIWP', code: 'KIIWP-O2.1', name: '# HH with improved water access',                 baseline: 1200, target_value: 4000, actual_value: 2560, unit: 'HH',      source: 'Community survey',   frequency: 'Annual',     responsible: 'M&E Officer',  disagg: 'Sex, Vulnerability' },
  { project: 'PSAC',  code: 'PSAC-O1.1',  name: '# SMEs supported with finance/tech',              baseline: 0,    target_value: 200,  actual_value: 67,   unit: 'SMEs',    source: 'SME registry',       frequency: 'Quarterly',  responsible: 'Field Officer', disagg: 'Sex, Age' },
];

const FIELD_ACTIVITIES = [
  { project: 'TREPA', type: 'Training',               location: 'Kayonza, Mukarange', planned_date: '2024-09-05', actual_date: '2024-09-07', team: 'Alice Uwimana; Paul Ndayisaba',   outputs: '140 farmers trained on soil health',       findings: 'High interest; need follow-up materials in Kinyarwanda', status: 'completed' },
  { project: 'KIIWP', type: 'Monitoring Visit',       location: 'Ngoma, Mutendeli',   planned_date: '2024-09-15', actual_date: '2024-09-15', team: 'Jean Claude Mugisha',             outputs: 'Canal 4B inspection completed',            findings: 'Siltation observed in 200m section; maintenance needed by Oct', status: 'completed' },
  { project: 'PSAC',  type: 'Focus Group Discussion', location: 'Kigali, Gasabo',     planned_date: '2024-10-01', actual_date: null,         team: 'Solange Nyiraneza; Alice Uwimana', outputs: 'Planned: 20 SME owner feedback session', findings: '', status: 'planned' },
  { project: 'TREPA', type: 'Farmer Field School',    location: 'Gatsibo, Kiziguro',  planned_date: '2024-10-12', actual_date: null,         team: 'Paul Ndayisaba',                  outputs: 'Planned: Season B field school launch',  findings: '', status: 'planned' },
];

async function upsertProject(project) {
  const donors        = toDbArray(project.donors);
  const partners      = toDbArray(project.partners);
  const funding       = toDbArray(project.funding_sources);
  const coFin         = toDbArray(project.co_financiers);
  const activities    = toDbArray(project.key_activities);
  const indicators    = toDbArray(project.key_indicators);

  const existing = await pool.query('SELECT id FROM projects WHERE name = $1 LIMIT 1', [project.name]);
  if (existing.rows.length) {
    await pool.query(
      `UPDATE projects SET
         full_name=$1, description=$2, status=$3, start_date=$4, end_date=$5, location=$6,
         budget=$7, budget_currency=$8, total_budget=$9, donors=$10, partners=$11,
         lead_agency=$12, executing_agency=$13, funding_sources=$14, co_financiers=$15,
         operating_location=$16, duration=$17, key_activities=$18, key_indicators=$19,
         target_beneficiaries=$20, target_households=$21, target_individuals=$22,
         restoration_area=$23, restoration_area_unit=$24, updated_at=CURRENT_TIMESTAMP
       WHERE name=$25`,
      [
        project.full_name, project.description, project.status, project.start_date, project.end_date, project.location,
        project.budget, project.budget_currency, project.total_budget, donors, partners,
        project.lead_agency, project.executing_agency, funding, coFin,
        project.operating_location, project.duration, activities, indicators,
        project.target_beneficiaries, project.target_households, project.target_individuals,
        project.restoration_area, project.restoration_area_unit, project.name,
      ]
    );
    return 'updated';
  }

  await pool.query(
    `INSERT INTO projects
       (name,full_name,description,status,start_date,end_date,location,
        budget,budget_currency,total_budget,donors,partners,lead_agency,executing_agency,
        funding_sources,co_financiers,operating_location,duration,
        key_activities,key_indicators,target_beneficiaries,target_households,target_individuals,
        restoration_area,restoration_area_unit)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25)`,
    [
      project.name, project.full_name, project.description, project.status, project.start_date, project.end_date, project.location,
      project.budget, project.budget_currency, project.total_budget, donors, partners,
      project.lead_agency, project.executing_agency, funding, coFin,
      project.operating_location, project.duration, activities, indicators,
      project.target_beneficiaries, project.target_households, project.target_individuals,
      project.restoration_area, project.restoration_area_unit,
    ]
  );
  return 'inserted';
}

async function ensureProjectCatalogue() {
  // Migrate any stale TEXT[] columns on Render Postgres first
  await migrateProjectColumns();

  const result = await pool.query('SELECT id, name FROM projects ORDER BY name');
  const existingNames    = new Set(result.rows.map((r) => r.name));
  const missingExpected  = [...EXPECTED_PROJECTS].filter((n) => !existingNames.has(n));
  const hasLegacyEntries = result.rows.some((r) => LEGACY_DUMMY_PROJECTS.has(r.name));

  if (!missingExpected.length && !hasLegacyEntries) {
    console.log('[CATALOGUE] Project catalogue already healthy');
    return;
  }

  console.log(`[CATALOGUE] Repairing catalogue (missing: ${missingExpected.join(', ') || 'none'})`);

  // Upsert all 6 official projects (no pool-level transactions — each call auto-commits)
  for (const project of PROJECTS) {
    await upsertProject(project);
  }
  // Remove legacy dummy entries
  for (const name of LEGACY_DUMMY_PROJECTS) {
    await pool.query('DELETE FROM projects WHERE name = $1', [name]);
  }

  console.log('[CATALOGUE] Project catalogue restored');
}

async function ensureProgrammeData() {
  const [indRes, actRes] = await Promise.all([
    pool.query('SELECT COUNT(*) AS cnt FROM indicators'),
    pool.query('SELECT COUNT(*) AS cnt FROM field_activities'),
  ]);

  const indCount = parseInt(indRes.rows[0]?.cnt ?? indRes.rows[0]?.['COUNT(*)'] ?? 0, 10);
  const actCount = parseInt(actRes.rows[0]?.cnt ?? actRes.rows[0]?.['COUNT(*)'] ?? 0, 10);

  if (indCount < 3) {
    for (const ind of INDICATORS) {
      const ex = await pool.query(
        'SELECT id FROM indicators WHERE project=$1 AND code=$2 LIMIT 1',
        [ind.project, ind.code]
      );
      if (ex.rows.length) continue;
      await pool.query(
        `INSERT INTO indicators
           (project,code,name,baseline,target_value,actual_value,unit,source,frequency,responsible,disagg)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
        [ind.project, ind.code, ind.name, ind.baseline, ind.target_value, ind.actual_value,
         ind.unit, ind.source, ind.frequency, ind.responsible, ind.disagg]
      );
    }
    console.log('[CATALOGUE] Seeded programme indicators');
  }

  if (actCount < 2) {
    for (const act of FIELD_ACTIVITIES) {
      const ex = await pool.query(
        'SELECT id FROM field_activities WHERE project=$1 AND type=$2 AND location=$3 AND planned_date=$4 LIMIT 1',
        [act.project, act.type, act.location, act.planned_date]
      );
      if (ex.rows.length) continue;
      await pool.query(
        `INSERT INTO field_activities
           (project,type,location,planned_date,actual_date,team,outputs,findings,status)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [act.project, act.type, act.location, act.planned_date, act.actual_date || null,
         act.team, act.outputs, act.findings, act.status]
      );
    }
    console.log('[CATALOGUE] Seeded programme field activities');
  }
}

module.exports = { ensureProjectCatalogue, ensureProgrammeData };
