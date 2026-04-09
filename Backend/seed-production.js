/**
 * seed-production.js
 * ─────────────────────────────────────────────────────────────────────────────
 * One-shot script to seed the FULL production (Render Postgres) database with:
 *   • 6 official Cordaid projects (KIIWP, PSAC, PRISM, RDDP, TREPA, STARLIT)
 *   • 6 programme indicators + 4 field activities
 *   • All real beneficiaries from the two Excel files in ~/Downloads
 *
 * USAGE (run from project root or Backend/):
 *   $env:DATABASE_URL="postgresql://<user>:<pass>@<host>/<db>?sslmode=require"
 *   node Backend/seed-production.js
 *
 * Get DATABASE_URL from:
 *   Render Dashboard → izi-me-platform-db → Info → External Connection String
 * ─────────────────────────────────────────────────────────────────────────────
 */

'use strict';

const path = require('path');
const fs   = require('fs');

// ── Locate and load Excel library ──────────────────────────────────────────
let xlsx;
try {
  xlsx = require('xlsx');
} catch {
  console.error('ERROR: xlsx package missing. Run: npm install xlsx  (inside Backend/)');
  process.exit(1);
}

// ── Require DATABASE_URL to be a real Postgres URL ─────────────────────────
require('./config/loadEnv');
const DATABASE_URL = process.env.DATABASE_URL || '';
if (!DATABASE_URL || DATABASE_URL.startsWith('sqlite://') || DATABASE_URL.includes('username:password')) {
  console.error('\nERROR: Set DATABASE_URL to your Render Postgres connection string first.\n');
  console.error('  $env:DATABASE_URL="postgresql://<user>:<pass>@<host>/<db>?sslmode=require"');
  console.error('\nGet it from: Render Dashboard → izi-me-platform-db → Info → External Connection\n');
  process.exit(1);
}

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// ── Project catalogue ───────────────────────────────────────────────────────
const { PROJECTS } = require('./seed-projects');

const INDICATORS = [
  { project:'TREPA', code:'TREPA-O1.1', name:'# farmers trained on improved agri practices',  baseline:0,    target_value:5000, actual_value:3840, unit:'farmers', source:'Training registers',  frequency:'Quarterly',  responsible:'M&E Officer',  disagg:'Sex, Age' },
  { project:'TREPA', code:'TREPA-O1.2', name:'% increase in household income',                  baseline:0,    target_value:30,   actual_value:18,   unit:'%',       source:'HH Survey',          frequency:'Annual',     responsible:'M&E Officer',  disagg:'Sex' },
  { project:'TREPA', code:'TREPA-O2.1', name:'# cooperatives with improved governance',         baseline:2,    target_value:25,   actual_value:17,   unit:'coops',   source:'Audit reports',      frequency:'Annual',     responsible:'M&E Officer',  disagg:'Province' },
  { project:'KIIWP', code:'KIIWP-O1.1', name:'# hectares under irrigation',                     baseline:450,  target_value:1200, actual_value:870,  unit:'ha',      source:'Field measurement',  frequency:'Bi-annual',  responsible:'Field Officer', disagg:'None' },
  { project:'KIIWP', code:'KIIWP-O2.1', name:'# HH with improved water access',                 baseline:1200, target_value:4000, actual_value:2560, unit:'HH',      source:'Community survey',   frequency:'Annual',     responsible:'M&E Officer',  disagg:'Sex, Vulnerability' },
  { project:'PSAC',  code:'PSAC-O1.1',  name:'# SMEs supported with finance/tech',              baseline:0,    target_value:200,  actual_value:67,   unit:'SMEs',    source:'SME registry',       frequency:'Quarterly',  responsible:'Field Officer', disagg:'Sex, Age' },
];

const FIELD_ACTIVITIES = [
  { project:'TREPA', type:'Training',            location:'Kayonza, Mukarange',  planned_date:'2024-09-05', actual_date:'2024-09-07', team:'Alice Uwimana; Paul Ndayisaba',      outputs:'140 farmers trained on soil health',        findings:'High interest; need follow-up materials in Kinyarwanda', status:'completed' },
  { project:'KIIWP', type:'Monitoring Visit',    location:'Ngoma, Mutendeli',    planned_date:'2024-09-15', actual_date:'2024-09-15', team:'Jean Claude Mugisha',                 outputs:'Canal 4B inspection completed',             findings:'Siltation observed in 200m section; maintenance needed by Oct', status:'completed' },
  { project:'PSAC',  type:'Focus Group Discussion', location:'Kigali, Gasabo',   planned_date:'2024-10-01', actual_date:null,         team:'Solange Nyiraneza; Alice Uwimana',    outputs:'Planned: 20 SME owner feedback session',  findings:'', status:'planned' },
  { project:'TREPA', type:'Farmer Field School', location:'Gatsibo, Kiziguro',   planned_date:'2024-10-12', actual_date:null,         team:'Paul Ndayisaba',                      outputs:'Planned: Season B field school launch',    findings:'', status:'planned' },
];

// ── Excel helpers ───────────────────────────────────────────────────────────
const DOWNLOADS = path.join(process.env.USERPROFILE || process.env.HOME || '', 'Downloads');
const CORDAID_CANDIDATES = ['Cordaid outreach database.xlsx', 'Cordaid outreach database .xlsx'];
const KIIWP_CANDIDATES   = ['Database KIIWP2_UPDATED (1) (1).xlsx', 'Database KIIWP2 _UPDATED (1) (1).xlsx'];

function resolveFile(candidates) {
  for (const f of candidates) {
    const full = path.join(DOWNLOADS, f);
    if (fs.existsSync(full)) return full;
  }
  return null;
}

function normalizeHeader(v) {
  return String(v||'').replace(/[\r\n]+/g,' ').replace(/\s+/g,' ').trim().toLowerCase();
}
function normalizeText(v) {
  return String(v||'').replace(/[\r\n]+/g,' ').replace(/\s+/g,' ').trim();
}
function parseSex(v) {
  const s = normalizeText(v).toLowerCase();
  if (s.startsWith('f')) return 'F';
  return 'M';
}
function rowToMap(row) {
  const m = {};
  for (const [k,v] of Object.entries(row||{})) m[normalizeHeader(k)] = v;
  return m;
}
function pick(m, aliases) {
  for (const a of aliases) {
    const v = m[normalizeHeader(a)];
    if (v !== undefined && v !== null && normalizeText(v) !== '') return normalizeText(v);
  }
  return '';
}
function toDbText(value) {
  if (!value) return '[]';
  if (Array.isArray(value)) return JSON.stringify(value);
  try { JSON.parse(value); return value; } catch { return '[]'; }
}

function readExcel(filePath, projectName) {
  const wb = xlsx.readFile(filePath);
  const records = [];
  for (const sheetName of wb.SheetNames) {
    const rows = xlsx.utils.sheet_to_json(wb.Sheets[sheetName], { defval:'' });
    if (!rows.length) continue;
    const first = rowToMap(rows[0]);
    const hasName = !!(first['names of participant'] || first['names'] || first['name of participant']);
    if (!hasName) continue;
    for (const raw of rows) {
      const m = rowToMap(raw);
      const name = pick(m, ['Names of participant','Names','Name of participant']);
      if (!name) continue;
      const identifier = pick(m, ['ID number','ID Number','ID']);
      const cooperative = pick(m, ['Name of cooperative','Name of Cooperative']);
      const sex = parseSex(pick(m, ['Sex']));
      const province = pick(m, ['Province']);
      const district = pick(m, ['District']);
      const sector   = pick(m, ['Sector']);
      const cell     = pick(m, ['Cell','Cell ']);
      const village  = pick(m, ['Village']);
      const phone    = pick(m, ['Phone number','Phone Number','Phone  number']);
      const location = [village, cell, sector, district, province].filter(Boolean).join(', ');
      records.push({ project:projectName, identifier, name, sex, cooperative, province, district, sector, phone, location, status:'active' });
    }
  }
  return records;
}

function dedupeRecords(records) {
  const map = new Map();
  for (const rec of records) {
    const idKey   = normalizeText(rec.identifier);
    const nameKey = normalizeText(rec.name).toLowerCase();
    const projKey = normalizeText(rec.project).toUpperCase();
    const fallback = `${projKey}|${nameKey}|${normalizeText(rec.sector).toLowerCase()}|${normalizeText(rec.cooperative).toLowerCase()}`;
    const key = idKey ? `ID:${idKey}` : `NK:${fallback}`;
    if (!map.has(key)) { map.set(key, { ...rec }); continue; }
    const ex = map.get(key);
    ['identifier','phone','cooperative','province','district','sector','location'].forEach((f) => {
      const a = normalizeText(ex[f]), b = normalizeText(rec[f]);
      if (!a && b) ex[f] = b;
      if (a && b && b.length > a.length) ex[f] = b;
    });
    if (!ex.sex && rec.sex) ex.sex = rec.sex;
  }
  return [...map.values()];
}

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n══════════════════════════════════════════════════════════');
  console.log(' IZI M&E — Full Production Seed (Render Postgres)');
  console.log('══════════════════════════════════════════════════════════\n');

  // 1. Migrate TEXT[] columns → TEXT if they still exist on an older schema
  console.log('▶ Checking / migrating column types …');
  const ARRAY_COLS = ['donors','partners','funding_sources','co_financiers','key_activities','key_indicators'];
  try {
    const chk = await pool.query(
      `SELECT column_name FROM information_schema.columns
       WHERE table_name = 'projects' AND data_type = 'ARRAY' AND column_name = ANY($1)`,
      [ARRAY_COLS]
    );
    for (const { column_name } of chk.rows) {
      await pool.query(
        `ALTER TABLE projects ALTER COLUMN ${column_name} TYPE TEXT USING array_to_json(${column_name})::text`
      );
      console.log(`  Migrated column: projects.${column_name}  TEXT[] → TEXT`);
    }
    if (!chk.rows.length) console.log('  Column types OK (no migration needed)');
  } catch (e) {
    console.error('  Migration warning:', e.message);
  }

  // 2. Clear and re-seed projects
  console.log('\n▶ Seeding 6 official projects …');
  await pool.query("DELETE FROM projects WHERE name NOT IN ('KIIWP','PSAC','PRISM','RDDP','TREPA','STARLIT')");
  for (const p of PROJECTS) {
    const ex = await pool.query('SELECT id FROM projects WHERE name=$1', [p.name]);
    if (ex.rows.length) {
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
          p.full_name, p.description, p.status, p.start_date, p.end_date, p.location,
          p.budget, p.budget_currency, p.total_budget,
          toDbText(p.donors), toDbText(p.partners),
          p.lead_agency, p.executing_agency,
          toDbText(p.funding_sources), toDbText(p.co_financiers),
          p.operating_location, p.duration,
          toDbText(p.key_activities), toDbText(p.key_indicators),
          p.target_beneficiaries, p.target_households, p.target_individuals,
          p.restoration_area, p.restoration_area_unit, p.name,
        ]
      );
      console.log(`  Updated project: ${p.name}`);
    } else {
      await pool.query(
        `INSERT INTO projects
          (name,full_name,description,status,start_date,end_date,location,
           budget,budget_currency,total_budget,donors,partners,lead_agency,executing_agency,
           funding_sources,co_financiers,operating_location,duration,
           key_activities,key_indicators,target_beneficiaries,target_households,target_individuals,
           restoration_area,restoration_area_unit)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25)`,
        [
          p.name, p.full_name, p.description, p.status, p.start_date, p.end_date, p.location,
          p.budget, p.budget_currency, p.total_budget,
          toDbText(p.donors), toDbText(p.partners),
          p.lead_agency, p.executing_agency,
          toDbText(p.funding_sources), toDbText(p.co_financiers),
          p.operating_location, p.duration,
          toDbText(p.key_activities), toDbText(p.key_indicators),
          p.target_beneficiaries, p.target_households, p.target_individuals,
          p.restoration_area, p.restoration_area_unit,
        ]
      );
      console.log(`  Inserted project: ${p.name}`);
    }
  }

  // 3. Seed indicators
  console.log('\n▶ Seeding programme indicators …');
  await pool.query('TRUNCATE TABLE indicators');
  for (const ind of INDICATORS) {
    await pool.query(
      `INSERT INTO indicators (project,code,name,baseline,target_value,actual_value,unit,source,frequency,responsible,disagg)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
      [ind.project,ind.code,ind.name,ind.baseline,ind.target_value,ind.actual_value,
       ind.unit,ind.source,ind.frequency,ind.responsible,ind.disagg]
    );
  }
  console.log(`  Inserted ${INDICATORS.length} indicators`);

  // 4. Seed field activities
  console.log('\n▶ Seeding programme field activities …');
  await pool.query('TRUNCATE TABLE field_activities');
  for (const act of FIELD_ACTIVITIES) {
    await pool.query(
      `INSERT INTO field_activities (project,type,location,planned_date,actual_date,team,outputs,findings,status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [act.project,act.type,act.location,act.planned_date,act.actual_date||null,
       act.team,act.outputs,act.findings,act.status]
    );
  }
  console.log(`  Inserted ${FIELD_ACTIVITIES.length} field activities`);

  // 5. Import real farmers from Excel
  console.log('\n▶ Importing beneficiaries from Excel …');
  const cordaidFile = resolveFile(CORDAID_CANDIDATES);
  const kiiwpFile   = resolveFile(KIIWP_CANDIDATES);

  if (!cordaidFile) {
    console.warn(`  WARNING: PSAC Excel file not found in ${DOWNLOADS}`);
    console.warn(`  Looked for: ${CORDAID_CANDIDATES.join(', ')}`);
  }
  if (!kiiwpFile) {
    console.warn(`  WARNING: KIIWP Excel file not found in ${DOWNLOADS}`);
    console.warn(`  Looked for: ${KIIWP_CANDIDATES.join(', ')}`);
  }

  if (cordaidFile || kiiwpFile) {
    const raw = [];
    if (cordaidFile) {
      console.log(`  Reading PSAC: ${path.basename(cordaidFile)}`);
      raw.push(...readExcel(cordaidFile, 'PSAC'));
    }
    if (kiiwpFile) {
      console.log(`  Reading KIIWP: ${path.basename(kiiwpFile)}`);
      raw.push(...readExcel(kiiwpFile, 'KIIWP'));
    }

    const deduped = dedupeRecords(raw);
    console.log(`  Raw: ${raw.length} | Deduplicated: ${deduped.length}`);

    await pool.query('TRUNCATE TABLE farmers');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_farmers_project ON farmers(project)');

    let inserted = 0;
    for (const r of deduped) {
      await pool.query(
        `INSERT INTO farmers (identifier,name,sex,cooperative,province,district,sector,phone,project,location,status)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
        [r.identifier||null, r.name||null, r.sex||'M', r.cooperative||null,
         r.province||null, r.district||null, r.sector||null, r.phone||null,
         r.project||null, r.location||null, r.status||'active']
      );
      inserted++;
      if (inserted % 1000 === 0) process.stdout.write(`  ... ${inserted}/${deduped.length}\n`);
    }

    const totals = await pool.query(
      `SELECT project, COUNT(*) AS cnt FROM farmers GROUP BY project ORDER BY project`
    );
    console.log(`\n  Inserted: ${inserted} beneficiaries`);
    totals.rows.forEach((r) => console.log(`    ${r.project || 'Unassigned'}: ${r.cnt}`));
  } else {
    console.warn('\n  Skipping farmer import — Excel files not found.');
    console.warn('  To import later: ensure the files are in ~/Downloads, then re-run this script.');
  }

  // Final summary
  const [proj, ind, act, farm] = await Promise.all([
    pool.query('SELECT COUNT(*) AS cnt FROM projects'),
    pool.query('SELECT COUNT(*) AS cnt FROM indicators'),
    pool.query('SELECT COUNT(*) AS cnt FROM field_activities'),
    pool.query('SELECT COUNT(*) AS cnt FROM farmers'),
  ]);
  console.log('\n══════════════════════════════════════════════════════════');
  console.log(' Seed complete — Render Postgres now contains:');
  console.log(`   Projects         : ${proj.rows[0].cnt}`);
  console.log(`   Indicators       : ${ind.rows[0].cnt}`);
  console.log(`   Field Activities : ${act.rows[0].cnt}`);
  console.log(`   Beneficiaries    : ${farm.rows[0].cnt}`);
  console.log('══════════════════════════════════════════════════════════\n');
}

main()
  .then(() => pool.end())
  .catch((e) => { console.error('\nSeed failed:', e.message); pool.end(); process.exit(1); });
