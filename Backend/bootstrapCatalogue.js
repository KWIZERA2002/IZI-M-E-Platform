const pool = require('./config/database');
const { PROJECTS } = require('./seed-projects');

const EXPECTED_PROJECTS = new Set(PROJECTS.map((project) => project.name));
const LEGACY_DUMMY_PROJECTS = new Set(['LWH', 'FRM']);

const INDICATORS = [
  { project: 'TREPA', code: 'TREPA-O1.1', name: '# farmers trained on improved agri practices', baseline: 0, target_value: 5000, actual_value: 3840, unit: 'farmers', source: 'Training registers', frequency: 'Quarterly', responsible: 'M&E Officer', disagg: 'Sex, Age' },
  { project: 'TREPA', code: 'TREPA-O1.2', name: '% increase in household income', baseline: 0, target_value: 30, actual_value: 18, unit: '%', source: 'HH Survey', frequency: 'Annual', responsible: 'M&E Officer', disagg: 'Sex' },
  { project: 'TREPA', code: 'TREPA-O2.1', name: '# cooperatives with improved governance', baseline: 2, target_value: 25, actual_value: 17, unit: 'coops', source: 'Audit reports', frequency: 'Annual', responsible: 'M&E Officer', disagg: 'Province' },
  { project: 'KIIWP', code: 'KIIWP-O1.1', name: '# hectares under irrigation', baseline: 450, target_value: 1200, actual_value: 870, unit: 'ha', source: 'Field measurement', frequency: 'Bi-annual', responsible: 'Field Officer', disagg: 'None' },
  { project: 'KIIWP', code: 'KIIWP-O2.1', name: '# HH with improved water access', baseline: 1200, target_value: 4000, actual_value: 2560, unit: 'HH', source: 'Community survey', frequency: 'Annual', responsible: 'M&E Officer', disagg: 'Sex, Vulnerability' },
  { project: 'PSAC', code: 'PSAC-O1.1', name: '# SMEs supported with finance/tech', baseline: 0, target_value: 200, actual_value: 67, unit: 'SMEs', source: 'SME registry', frequency: 'Quarterly', responsible: 'Field Officer', disagg: 'Sex, Age' },
];

const FIELD_ACTIVITIES = [
  { project: 'TREPA', type: 'Training', location: 'Kayonza, Mukarange', planned_date: '2024-09-05', actual_date: '2024-09-07', team: 'Alice Uwimana; Paul Ndayisaba', outputs: '140 farmers trained on soil health', findings: 'High interest; need follow-up materials in Kinyarwanda', status: 'completed' },
  { project: 'KIIWP', type: 'Monitoring Visit', location: 'Ngoma, Mutendeli', planned_date: '2024-09-15', actual_date: '2024-09-15', team: 'Jean Claude Mugisha', outputs: 'Canal 4B inspection completed', findings: 'Siltation observed in 200m section; maintenance needed by Oct', status: 'completed' },
  { project: 'PSAC', type: 'Focus Group Discussion', location: 'Kigali, Gasabo', planned_date: '2024-10-01', actual_date: null, team: 'Solange Nyiraneza; Alice Uwimana', outputs: 'Planned: 20 SME owner feedback session', findings: '', status: 'planned' },
  { project: 'TREPA', type: 'Farmer Field School', location: 'Gatsibo, Kiziguro', planned_date: '2024-10-12', actual_date: null, team: 'Paul Ndayisaba', outputs: 'Planned: Season B field school launch', findings: '', status: 'planned' },
];

async function upsertProject(project) {
  const existing = await pool.query('SELECT id FROM projects WHERE name = $1 LIMIT 1', [project.name]);
  if (existing.rows.length) {
    await pool.query(
      `UPDATE projects SET
        full_name = $1, description = $2, status = $3, start_date = $4, end_date = $5, location = $6,
        budget = $7, budget_currency = $8, total_budget = $9, donors = $10, partners = $11,
        lead_agency = $12, executing_agency = $13, funding_sources = $14, co_financiers = $15,
        operating_location = $16, duration = $17, key_activities = $18, key_indicators = $19,
        target_beneficiaries = $20, target_households = $21, target_individuals = $22,
        restoration_area = $23, restoration_area_unit = $24, updated_at = CURRENT_TIMESTAMP
       WHERE name = $25`,
      [
        project.full_name, project.description, project.status, project.start_date, project.end_date, project.location,
        project.budget, project.budget_currency, project.total_budget, project.donors, project.partners,
        project.lead_agency, project.executing_agency, project.funding_sources, project.co_financiers,
        project.operating_location, project.duration, project.key_activities, project.key_indicators,
        project.target_beneficiaries, project.target_households, project.target_individuals,
        project.restoration_area, project.restoration_area_unit, project.name,
      ]
    );
    return 'updated';
  }

  await pool.query(
    `INSERT INTO projects (
      name, full_name, description, status, start_date, end_date, location,
      budget, budget_currency, total_budget, donors, partners, lead_agency,
      executing_agency, funding_sources, co_financiers, operating_location,
      duration, key_activities, key_indicators, target_beneficiaries,
      target_households, target_individuals, restoration_area, restoration_area_unit
    ) VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25
    )`,
    [
      project.name, project.full_name, project.description, project.status, project.start_date, project.end_date, project.location,
      project.budget, project.budget_currency, project.total_budget, project.donors, project.partners, project.lead_agency,
      project.executing_agency, project.funding_sources, project.co_financiers, project.operating_location,
      project.duration, project.key_activities, project.key_indicators, project.target_beneficiaries,
      project.target_households, project.target_individuals, project.restoration_area, project.restoration_area_unit,
    ]
  );
  return 'inserted';
}

async function ensureProjectCatalogue() {
  const result = await pool.query('SELECT id, name FROM projects ORDER BY name');
  const existingNames = new Set(result.rows.map((row) => row.name));
  const missingExpected = [...EXPECTED_PROJECTS].filter((name) => !existingNames.has(name));
  const hasLegacyProjects = result.rows.some((row) => LEGACY_DUMMY_PROJECTS.has(row.name));

  if (!missingExpected.length && !hasLegacyProjects) {
    console.log('[CATALOGUE] Project catalogue already healthy');
    return;
  }

  console.log(`[CATALOGUE] Repairing project catalogue (missing: ${missingExpected.join(', ') || 'none'})`);
  await pool.query('BEGIN');
  try {
    for (const project of PROJECTS) {
      await upsertProject(project);
    }
    for (const name of LEGACY_DUMMY_PROJECTS) {
      await pool.query('DELETE FROM projects WHERE name = $1', [name]);
    }
    await pool.query('COMMIT');
    console.log('[CATALOGUE] Project catalogue restored');
  } catch (error) {
    await pool.query('ROLLBACK');
    throw error;
  }
}

async function ensureProgrammeData() {
  const [indicatorCount, activityCount] = await Promise.all([
    pool.query('SELECT COUNT(*) AS cnt FROM indicators'),
    pool.query('SELECT COUNT(*) AS cnt FROM field_activities'),
  ]);

  const indicatorsTotal = parseInt(indicatorCount.rows[0]?.cnt ?? indicatorCount.rows[0]?.['COUNT(*)'] ?? 0, 10);
  const activitiesTotal = parseInt(activityCount.rows[0]?.cnt ?? activityCount.rows[0]?.['COUNT(*)'] ?? 0, 10);

  await pool.query('BEGIN');
  try {
    if (indicatorsTotal < 3) {
      for (const indicator of INDICATORS) {
        const existing = await pool.query('SELECT id FROM indicators WHERE project = $1 AND code = $2 LIMIT 1', [indicator.project, indicator.code]);
        if (existing.rows.length) continue;
        await pool.query(
          'INSERT INTO indicators (project, code, name, baseline, target_value, actual_value, unit, source, frequency, responsible, disagg) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)',
          [indicator.project, indicator.code, indicator.name, indicator.baseline, indicator.target_value, indicator.actual_value, indicator.unit, indicator.source, indicator.frequency, indicator.responsible, indicator.disagg]
        );
      }
      console.log('[CATALOGUE] Seeded programme indicators');
    }

    if (activitiesTotal < 2) {
      for (const activity of FIELD_ACTIVITIES) {
        const existing = await pool.query(
          'SELECT id FROM field_activities WHERE project = $1 AND type = $2 AND location = $3 AND planned_date = $4 LIMIT 1',
          [activity.project, activity.type, activity.location, activity.planned_date]
        );
        if (existing.rows.length) continue;
        await pool.query(
          'INSERT INTO field_activities (project, type, location, planned_date, actual_date, team, outputs, findings, status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
          [activity.project, activity.type, activity.location, activity.planned_date, activity.actual_date, activity.team, activity.outputs, activity.findings, activity.status]
        );
      }
      console.log('[CATALOGUE] Seeded programme field activities');
    }

    await pool.query('COMMIT');
  } catch (error) {
    await pool.query('ROLLBACK');
    throw error;
  }
}

module.exports = {
  ensureProjectCatalogue,
  ensureProgrammeData,
};
