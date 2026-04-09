const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const router = express.Router();
const multer = require('multer');
const xlsx = require('xlsx');
const pool = require('../config/database');
const auth = require('../MIDDLEWARE/Auth');
const { sendInviteEmail, testSmtpConnection } = require('../Services/EmailService');
const { requirePermission } = require('../utils/rbac');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 250 * 1024 * 1024 }
});

const entityConfig = {
  farmers: {
    table: 'farmers',
    columns: [
      'name', 'location', 'phone', 'cooperative', 'project', 'province', 'district', 'sector',
      'status', 'sex', 'age', 'identifier',
      'intervention_type', 'intervention_name', 'intervention_date',
      'accessed_loan', 'accessed_market', 'record_source'
    ]
  },
  indicators: {
    table: 'indicators',
    columns: ['project', 'code', 'name', 'baseline', 'target_value', 'actual_value', 'unit', 'source', 'frequency', 'responsible', 'disagg']
  },
  field_activities: {
    table: 'field_activities',
    columns: ['project', 'type', 'location', 'planned_date', 'actual_date', 'team', 'outputs', 'findings', 'status']
  },
  projects: {
    table: 'projects',
    columns: ['name', 'description', 'status', 'start_date', 'end_date']
  }
};

const entityAliases = {
  beneficiaries: 'farmers',
  activities: 'field_activities'
};

function normalizeImportType(rawType) {
  const value = String(rawType || '').trim().toLowerCase();
  const aliases = {
    beneficiary: 'beneficiaries',
    beneficiaries: 'beneficiaries',
    farmer: 'beneficiaries',
    farmers: 'beneficiaries',
    indicator: 'indicators',
    indicators: 'indicators',
    activity: 'activities',
    activities: 'activities',
    field_activities: 'activities',
    project: 'projects',
    projects: 'projects'
  };
  return aliases[value] || '';
}

function resolveEntity(type) {
  const normalizedType = normalizeImportType(type);
  const key = entityAliases[normalizedType] || normalizedType;
  return entityConfig[key] || null;
}

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ''));
}

function getPublicBaseUrl(req) {
  const configured = process.env.APP_URL || process.env.RENDER_EXTERNAL_URL || process.env.FRONTEND_URL;
  if (configured) return String(configured).replace(/\/$/, '');
  return `${req.protocol}://${req.get('host')}`;
}

function withInviteFailureReason(baseMessage, sendResult) {
  const reason = String(sendResult?.error || '').trim();
  if (!reason) return baseMessage;
  return `${baseMessage} Reason: ${reason}`;
}

async function generateUniqueUsername(baseValue, excludeUserId = null) {
  const base = String(baseValue || 'user')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[^a-zA-Z0-9._\- ]/g, '')
    .trim() || 'user';

  let attempt = 0;
  while (attempt < 1000) {
    const candidate = attempt === 0 ? base : `${base}_${attempt + 1}`;
    const result = await pool.query('SELECT id FROM users WHERE lower(trim(username)) = lower($1)', [candidate]);
    if (!result.rows.length || (excludeUserId !== null && Number(result.rows[0].id) === Number(excludeUserId))) {
      return candidate;
    }
    attempt += 1;
  }

  return `user_${Date.now()}`;
}

function normalizeDuplicatePolicy(rawPolicy) {
  const value = String(rawPolicy || '').trim().toLowerCase();
  const aliases = {
    'skip duplicates': 'skip_duplicates',
    skip_duplicates: 'skip_duplicates',
    skip: 'skip_duplicates',
    'update same-project': 'update_same_project',
    update_same_project: 'update_same_project',
    update: 'update_same_project',
    'always insert': 'always_insert',
    always_insert: 'always_insert',
    insert: 'always_insert'
  };
  return aliases[value] || 'update_same_project';
}

function buildInsertSQL(table, columns, withId = false) {
  const fields = withId ? ['id', ...columns] : columns;
  const placeholders = fields.map((_, index) => `$${index + 1}`);
  const updates = columns.map(col => `${col}=excluded.${col}`).join(', ');
  return `INSERT INTO ${table} (${fields.join(',')}) VALUES (${placeholders.join(',')}) ON CONFLICT(id) DO UPDATE SET ${updates}`;
}

function splitCsvLine(line) {
  return String(line || '')
    .split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/)
    .map(value => String(value || '').replace(/^"|"$/g, '').replace(/""/g, '"').trim());
}

function parseCsvMatrix(text) {
  return String(text || '')
    .split(/\r?\n/)
    .filter(line => line.trim() !== '')
    .map(splitCsvLine);
}

function getExpectedColumns(type) {
  const map = {
    beneficiaries: {
      required: ['name'],
      optional: [
        'sex', 'age', 'cooperative', 'province', 'district', 'sector', 'project', 'phone', 'status', 'location',
        'intervention_type', 'intervention_name', 'intervention_date',
        'accessed_loan', 'accessed_market', 'record_source'
      ]
    },
    indicators: {
      required: ['name'],
      optional: ['project', 'code', 'baseline', 'target_value', 'actual_value', 'unit', 'source', 'frequency', 'responsible', 'disagg']
    },
    activities: {
      required: ['project', 'type'],
      optional: ['location', 'planned_date', 'actual_date', 'team', 'outputs', 'findings', 'status']
    },
    projects: {
      required: ['name'],
      optional: ['description', 'status', 'start_date', 'end_date']
    }
  };

  return map[type] || { required: [], optional: [] };
}

function inferImportTypeFromMatrix(matrix) {
  const candidateTypes = ['beneficiaries', 'indicators', 'activities', 'projects'];
  let bestType = 'beneficiaries';
  let bestScore = -1;

  candidateTypes.forEach(candidateType => {
    const headerIndex = detectHeaderRow(matrix, candidateType);
    const headers = (matrix[headerIndex] || []).map(cell => String(cell || '').trim().toLowerCase()).filter(Boolean);
    const expected = getExpectedColumns(candidateType);
    const searchableFields = [...expected.required, ...expected.optional];
    let score = 0;

    searchableFields.forEach(field => {
      const variations = getColumnVariations(field, candidateType).map(v => String(v).toLowerCase());
      if (variations.some(variation => headers.includes(variation))) {
        score += expected.required.includes(field) ? 3 : 1;
      }
    });

    if (score > bestScore) {
      bestScore = score;
      bestType = candidateType;
    }
  });

  return bestType;
}

function getColumnVariations(baseName, type) {
  const variations = {
    beneficiaries: {
      id: ['id', 'farmer_id', 'beneficiary_id', 'identifier', 'farmer id', 'beneficiary id', 'beneficiary code', 'code', 'no', 'n°', 'numéro', 'numero'],
      identifier: ['identifier', 'national id', 'beneficiary id', 'farmer id', 'id', 'national_id'],
      name: [
        'name', 'full_name', 'full name', 'farmer_name', 'farmer name', 'beneficiary name', 'beneficiary_name',
        'names', 'nom', 'prénom', 'prenom', 'noms', 'nom complet', 'nom_complet', 'nom prenom', 'nom_prenom',
        'first name', 'first_name', 'last name', 'last_name', 'firstname', 'lastname',
        'beneficiaire', 'bénéficiaire', 'agriculteur', 'participant'
      ],
      sex: ['sex', 'gender', 'sexe', 'genre', 'm/f', 'sex/gender'],
      age: ['age', 'âge'],
      cooperative: ['cooperative', 'coop', 'cooperative_name', 'cooperative name', 'group', 'groupe', 'coopérative', 'cooperatives', 'organization', 'organisation'],
      province: ['province', 'region', 'région'],
      district: ['district', 'rayon', 'woreda'],
      sector: ['sector', 'secteur', 'cell', 'cellule', 'village', 'kebele'],
      project: ['project', 'project_name', 'project name', 'projet', 'program', 'programme'],
      phone: ['phone', 'mobile', 'telephone', 'phone_number', 'phone number', 'tel', 'tél', 'téléphone', 'contact', 'number'],
      status: ['status', 'état', 'etat', 'statut', 'active', 'actif'],
      location: ['location', 'site', 'cell', 'village', 'lieu', 'localisation', 'address', 'adresse'],
      intervention_type: ['intervention_type', 'intervention type', 'training type', 'activity type', 'module', 'training_module'],
      intervention_name: ['intervention_name', 'intervention name', 'training', 'training name', 'activity', 'activity name', 'session'],
      intervention_date: ['intervention_date', 'intervention date', 'training date', 'activity date', 'date'],
      accessed_loan: ['accessed_loan', 'accessed loan', 'loan access', 'loan_access', 'received loan'],
      accessed_market: ['accessed_market', 'accessed market', 'market access', 'market_access', 'linked to market', 'market linkage'],
      record_source: ['record_source', 'source', 'data source', 'import source']
    },
    indicators: {
      project: ['project', 'project_name', 'project name', 'projet'],
      code: ['code', 'indicator_code', 'indicator code', 'id', 'ref'],
      name: ['name', 'indicator', 'description', 'indicator_name', 'indicator name', 'indicateur', 'libellé', 'libelle'],
      baseline: ['baseline', 'base', 'valeur de base', 'base value'],
      target_value: ['target', 'target_value', 'target value', 'goal', 'cible', 'objectif'],
      actual_value: ['actual', 'actual_value', 'actual value', 'current', 'current_value', 'current value', 'value', 'valeur', 'résultat', 'resultat'],
      unit: ['unit', 'unité', 'unite'],
      source: ['source', 'data_source', 'data source', 'source de données'],
      frequency: ['frequency', 'fréquence', 'frequence', 'periodicity'],
      responsible: ['responsible', 'responsible_person', 'responsible person', 'responsable'],
      disagg: ['disagg', 'disaggregation', 'désagrégation', 'desagregation']
    },
    activities: {
      project: ['project', 'project_name', 'project name', 'projet'],
      type: ['type', 'activity_type', 'activity type', 'activity', 'activité', 'activite'],
      location: ['location', 'lieu', 'localisation', 'site'],
      planned_date: ['planned_date', 'planned date', 'planned', 'date prévue', 'date_prevue'],
      actual_date: ['actual_date', 'actual date', 'actual', 'date réelle', 'date_reelle'],
      team: ['team', 'team_members', 'team members', 'équipe', 'equipe'],
      outputs: ['outputs', 'deliverables', 'results', 'résultats', 'livrable'],
      findings: ['findings', 'observations', 'notes'],
      status: ['status', 'statut', 'état', 'etat']
    },
    projects: {
      name: ['name', 'project_name', 'project name', 'projet', 'nom'],
      description: ['description', 'details', 'résumé', 'resume', 'summary'],
      status: ['status', 'statut'],
      start_date: ['start_date', 'start date', 'start', 'début', 'debut'],
      end_date: ['end_date', 'end date', 'end', 'fin', 'clôture', 'cloture']
    }
  };

  return variations[type]?.[baseName] || [baseName];
}

function detectHeaderRow(matrix, type) {
  const expected = getExpectedColumns(type);
  const searchableFields = [...expected.required, ...expected.optional];
  let bestIndex = 0;
  let bestScore = -1;

  matrix.slice(0, 25).forEach((row, index) => {
    const values = row.map(cell => String(cell || '').trim().toLowerCase()).filter(Boolean);
    if (!values.length) return;

    let score = 0;
    searchableFields.forEach(field => {
      const variations = getColumnVariations(field, type);
      if (variations.some(variation => values.includes(String(variation).toLowerCase()))) {
        score += 1;
      }
    });

    if (score > bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  });

  return bestIndex;
}

function matrixToObjects(matrix, type) {
  if (!Array.isArray(matrix) || !matrix.length) {
    return { headers: [], rows: [] };
  }

  const headerIndex = detectHeaderRow(matrix, type);
  const headers = (matrix[headerIndex] || []).map(cell => String(cell || '').trim());
  const rows = matrix.slice(headerIndex + 1)
    .filter(row => Array.isArray(row) && row.some(cell => String(cell || '').trim() !== ''))
    .map(row => {
      const item = {};
      headers.forEach((header, index) => {
        if (header) item[header] = row[index] !== undefined ? row[index] : '';
      });
      return item;
    });

  return { headers, rows };
}

function parseSpreadsheetBuffer(fileName, buffer, requestedType) {
  const lowerName = String(fileName || '').toLowerCase();
  const normalizedType = normalizeImportType(requestedType);

  if (lowerName.endsWith('.csv')) {
    const matrix = parseCsvMatrix(buffer.toString('utf8'));
    const resolvedType = normalizedType || inferImportTypeFromMatrix(matrix);
    return { ...matrixToObjects(matrix, resolvedType), resolvedType };
  }

  const workbook = xlsx.read(buffer, { type: 'buffer' });
  const firstSheetName = workbook.SheetNames[0];
  if (!firstSheetName) return { headers: [], rows: [], resolvedType: normalizedType || 'beneficiaries' };
  const sheet = workbook.Sheets[firstSheetName];
  const matrix = xlsx.utils.sheet_to_json(sheet, { header: 1, defval: '' });
  const resolvedType = normalizedType || inferImportTypeFromMatrix(matrix);
  return { ...matrixToObjects(matrix, resolvedType), resolvedType };
}

function normalizeImportRecord(type, row, options = {}) {
  const defaultProject = String(options.defaultProject || '').trim();
  const defaultInterventionType = String(options.defaultInterventionType || '').trim();
  const defaultInterventionName = String(options.defaultInterventionName || '').trim();
  const defaultInterventionDate = String(options.defaultInterventionDate || '').trim();
  const data = {};
  const expected = getExpectedColumns(type);
  if (!expected) return null;

  // Build a lowercase-keyed map of the row values
  const lowerRow = Object.keys(row || {}).reduce((acc, key) => {
    acc[String(key).trim().toLowerCase()] = row[key];
    return acc;
  }, {});

  // All canonical destination fields for this type
  const allFields = [...expected.required, ...expected.optional];

  for (const destKey of allFields) {
    const aliases = getColumnVariations(destKey, type);
    for (const alias of aliases) {
      const v = lowerRow[String(alias).toLowerCase()];
      if (v !== undefined && v !== null && String(v).trim() !== '') {
        data[destKey] = v;
        break;
      }
    }
  }

  if (type === 'beneficiaries') {
    // If `name` still not found, use the first non-empty column as a name fallback
    if (!data.name) {
      const firstNonEmpty = Object.values(lowerRow).find(v => v !== undefined && v !== null && String(v).trim() !== '');
      if (firstNonEmpty && String(firstNonEmpty).trim().length > 1) {
        data.name = firstNonEmpty;
      }
    }
    if (!data.id && data.identifier) data.id = data.identifier;
    if (!data.identifier && data.id && typeof data.id === 'string' && !/^[0-9]+$/.test(data.id)) {
      data.identifier = data.id;
    }
    if (!data.project && defaultProject) {
      data.project = defaultProject;
    }

    if (!data.intervention_type && defaultInterventionType) {
      data.intervention_type = defaultInterventionType;
    }
    if (!data.intervention_name && defaultInterventionName) {
      data.intervention_name = defaultInterventionName;
    }
    if (!data.intervention_date && defaultInterventionDate) {
      data.intervention_date = defaultInterventionDate;
    }

    if (data.accessed_loan !== undefined) {
      data.accessed_loan = /^(1|true|yes|y)$/i.test(String(data.accessed_loan).trim()) ? 1 : 0;
    }
    if (data.accessed_market !== undefined) {
      data.accessed_market = /^(1|true|yes|y)$/i.test(String(data.accessed_market).trim()) ? 1 : 0;
    }

    if (!data.record_source) data.record_source = 'import';
    if (!data.name) return null;
    return data;
  }

  if (type === 'indicators') {
    if (!data.name) return null;
    if (data.target_value !== undefined) data.target_value = Number(data.target_value) || 0;
    if (data.actual_value !== undefined) data.actual_value = Number(data.actual_value) || 0;
    if (data.baseline !== undefined) data.baseline = Number(data.baseline) || 0;
    return data;
  }

  if (type === 'activities') {
    if (!data.project || !data.type) return null;
    if (data.team && typeof data.team === 'string') {
      data.team = data.team.split(/[,;]+/).map(value => value.trim()).filter(Boolean).join(';');
    }
    return data;
  }

  if (type === 'projects') {
    if (!data.name) return null;
    return data;
  }

  return null;
}

function buildImportPreview(type, fileName, rawRows, headers, options = {}) {
  const defaultProject = String(options.defaultProject || '').trim();
  const defaultInterventionType = String(options.defaultInterventionType || '').trim();
  const defaultInterventionName = String(options.defaultInterventionName || '').trim();
  const defaultInterventionDate = String(options.defaultInterventionDate || '').trim();
  const records = [];
  const invalidRows = [];

  rawRows.forEach((row, index) => {
    const normalized = normalizeImportRecord(type, row, {
      defaultProject,
      defaultInterventionType,
      defaultInterventionName,
      defaultInterventionDate,
    });
    if (normalized) {
      records.push(normalized);
    } else {
      invalidRows.push(index + 2);
    }
  });

  const warnings = [];
  if (!headers.length) warnings.push('File has no detected headers.');
  if (!records.length) {
    if (!rawRows.length) {
      warnings.push('File appears to be empty or unreadable.');
    } else {
      warnings.push(`No valid rows found. Required columns for ${type}: ${getExpectedColumns(type).required.join(', ')}`);
    }
  }
  if (invalidRows.length) warnings.push(`${invalidRows.length} row(s) were skipped due to missing required data.`);

  return {
    type,
    fileName,
    rawRows: rawRows.length,
    validRows: records.length,
    invalidRows: invalidRows.length,
    records,
    sample: records.slice(0, 5),
    rows: rawRows,
    projectContext: defaultProject,
    headers,
    warnings
  };
}

function normalizeAutomationRuleRow(row) {
  let actionParams = {};
  try {
    actionParams = row?.action_params ? JSON.parse(row.action_params) : {};
  } catch {
    actionParams = {};
  }

  return {
    id: row.id,
    name: row.name,
    enabled: Number(row.enabled) === 1,
    trigger: row.trigger,
    project: row.project || 'All',
    condition: row.condition || 'always',
    conditionValue: row.condition_value,
    action: row.action,
    actionParams,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

// Get all admin data
router.get('/data', auth, requirePermission('admin:export'), async (req, res) => {
  try {
    const [farmers, indicators, activities, projects] = await Promise.all([
      pool.query('SELECT * FROM farmers'),
      pool.query('SELECT * FROM indicators'),
      pool.query('SELECT * FROM field_activities'),
      pool.query('SELECT * FROM projects')
    ]);

    res.json({
      farmers: farmers.rows,
      indicators: indicators.rows,
      fieldActivities: activities.rows,
      projects: projects.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/automation-rules', auth, requirePermission('admin:settings'), async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM automation_rules ORDER BY id ASC');
    res.json(result.rows.map(normalizeAutomationRuleRow));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/automation-rules', auth, requirePermission('admin:settings'), async (req, res) => {
  const {
    name,
    enabled = true,
    trigger,
    project = 'All',
    condition = 'always',
    conditionValue = '',
    action,
    actionParams = {},
  } = req.body || {};

  if (!name || !trigger || !action) {
    return res.status(400).json({ error: 'name, trigger, and action are required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO automation_rules
      (name, enabled, trigger, project, condition, condition_value, action, action_params, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP)`,
      [
        String(name).trim(),
        enabled ? 1 : 0,
        String(trigger).trim(),
        String(project || 'All').trim() || 'All',
        String(condition || 'always').trim() || 'always',
        conditionValue === null || conditionValue === undefined ? '' : String(conditionValue),
        String(action).trim(),
        JSON.stringify(actionParams || {}),
      ]
    );

    let createdId = result.lastID || result.rows?.[0]?.id;
    if (!createdId) {
      const latest = await pool.query('SELECT id FROM automation_rules ORDER BY id DESC LIMIT 1');
      createdId = latest.rows?.[0]?.id;
    }
    const created = await pool.query('SELECT * FROM automation_rules WHERE id = $1', [createdId]);
    if (!created.rows.length) return res.status(500).json({ error: 'Failed to create automation rule' });
    res.json(normalizeAutomationRuleRow(created.rows[0]));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/automation-rules/:id', auth, requirePermission('admin:settings'), async (req, res) => {
  const id = req.params.id;
  const {
    name,
    enabled,
    trigger,
    project,
    condition,
    conditionValue,
    action,
    actionParams,
  } = req.body || {};

  try {
    const existing = await pool.query('SELECT * FROM automation_rules WHERE id = $1', [id]);
    if (!existing.rows.length) return res.status(404).json({ error: 'Automation rule not found' });
    const prev = normalizeAutomationRuleRow(existing.rows[0]);

    await pool.query(
      `UPDATE automation_rules
       SET name = $1,
           enabled = $2,
           trigger = $3,
           project = $4,
           condition = $5,
           condition_value = $6,
           action = $7,
           action_params = $8,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $9`,
      [
        String(name !== undefined ? name : prev.name).trim(),
        (enabled !== undefined ? enabled : prev.enabled) ? 1 : 0,
        String(trigger !== undefined ? trigger : prev.trigger).trim(),
        String(project !== undefined ? project : prev.project).trim() || 'All',
        String(condition !== undefined ? condition : prev.condition).trim() || 'always',
        conditionValue !== undefined ? String(conditionValue) : String(prev.conditionValue ?? ''),
        String(action !== undefined ? action : prev.action).trim(),
        JSON.stringify(actionParams !== undefined ? actionParams : prev.actionParams || {}),
        id,
      ]
    );

    const updated = await pool.query('SELECT * FROM automation_rules WHERE id = $1', [id]);
    res.json(normalizeAutomationRuleRow(updated.rows[0]));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/automation-rules/:id', auth, requirePermission('admin:settings'), async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query('DELETE FROM automation_rules WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin user maintenance (optional auth for dev)
const adminAuth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token && process.env.NODE_ENV !== 'development') {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  if (token) {
    try {
      const jwt = require('jsonwebtoken');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      return res.status(401).json({ msg: 'Token is not valid' });
    }
  }
  next();
};

router.get('/users', auth, requirePermission('users:read'), async (req, res) => {
  try {
    const result = await pool.query('SELECT id, username AS name, email, role, status, email_verified, verification_token, verification_expires, invite_generated_at, created_at FROM users');
    res.json(result.rows.map(row => ({
      ...row,
      role: row.role || 'viewer',
      status: row.status || 'active'
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/users', auth, requirePermission('users:create'), async (req, res) => {
  const { name, role = 'viewer', status = 'active' } = req.body || {};
  const email = normalizeEmail(req.body?.email);
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address' });
  }
  try {
    const derivedName = (name && String(name).trim()) || String(email).split('@')[0];
    const existingByEmail = await pool.query('SELECT * FROM users WHERE lower(trim(email)) = lower($1)', [email]);
    const existingUser = existingByEmail.rows[0] || null;
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const inviteGeneratedAt = new Date().toISOString();
    const invitePath = `/accept-invite?token=${verificationToken}`;
    const fallbackInviteUrl = `${getPublicBaseUrl(req)}${invitePath}`;

    if (existingUser && Number(existingUser.email_verified) === 1) {
      return res.status(400).json({ error: 'A verified user with that email already exists' });
    }

    let userRow;
    let sendResult = { success: true, skipped: false };

    // Invitation account: placeholder password until the invited user completes signup.
    const salt = await bcrypt.genSalt(10);
    const placeholderPassword = crypto.randomBytes(24).toString('hex');
    const password_hash = await bcrypt.hash(placeholderPassword, salt);
    if (existingUser) {
      const normalizedName = await generateUniqueUsername(derivedName, existingUser.id);
      const updated = await pool.query(
        'UPDATE users SET username = $1, role = $2, status = $3, password_hash = $4, verification_token = $5, verification_expires = $6, invite_generated_at = $7, email_verified = FALSE WHERE id = $8 RETURNING id, username AS name, email, role, status, verification_expires, invite_generated_at, created_at',
        [normalizedName, role, status, password_hash, verificationToken, verificationExpires, inviteGeneratedAt, existingUser.id]
      );
      userRow = updated.rows[0];
      try {
        sendResult = await sendInviteEmail(email, normalizedName, fallbackInviteUrl);
      } catch (mailErr) {
        console.warn('[Admin Invite] Failed to resend invitation email:', mailErr.message);
        sendResult = { success: false, skipped: false, error: mailErr.message };
      }
      return res.json({
        ...userRow,
        message: sendResult.success
          ? (sendResult.skipped ? 'Invitation refreshed. Email sending is disabled; share the invite link manually.' : 'Invitation resent successfully.')
          : withInviteFailureReason('Invitation refreshed, but email delivery failed. Please share the invite link manually and check SMTP settings.', sendResult),
        inviteResent: true,
        previousInviteInvalidated: !!existingUser.verification_token,
        invitePath,
        inviteUrl: fallbackInviteUrl,
        emailInviteUrl: sendResult.inviteUrl || null,
        invite_generated_at: inviteGeneratedAt,
        verification_expires: verificationExpires
      });
    }

    const normalizedName = await generateUniqueUsername(derivedName);
    const result = await pool.query(
      'INSERT INTO users (username, email, role, status, password_hash, email_verified, verification_token, verification_expires, invite_generated_at) VALUES ($1, $2, $3, $4, $5, FALSE, $6, $7, $8) RETURNING id, username AS name, email, role, status, verification_expires, invite_generated_at, created_at',
      [normalizedName, email, role, status, password_hash, verificationToken, verificationExpires, inviteGeneratedAt]
    );
    userRow = result.rows[0];

    try {
      sendResult = await sendInviteEmail(email, normalizedName, fallbackInviteUrl);
    } catch (mailErr) {
      console.warn('[Admin Invite] Failed to send invitation email:', mailErr.message);
      sendResult = { success: false, skipped: false, error: mailErr.message };
    }

    res.json({
      ...userRow,
      message: sendResult.success
        ? (sendResult.skipped ? 'User invited. Email sending is disabled; share the invite link manually.' : 'Invitation email sent successfully.')
        : withInviteFailureReason('User invited, but email delivery failed. Please share the invite link manually and check SMTP settings.', sendResult),
      inviteResent: false,
      previousInviteInvalidated: false,
      invitePath,
      inviteUrl: fallbackInviteUrl,
      emailInviteUrl: sendResult.inviteUrl || null,
      invite_generated_at: inviteGeneratedAt,
      verification_expires: verificationExpires
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/users/:id/resend-invite', auth, requirePermission('users:invite'), async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ error: 'Invalid user id' });
  }

  try {
    const result = await pool.query('SELECT id, username, email, email_verified, status, verification_token FROM users WHERE id = $1', [id]);
    if (!result.rows.length) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];
    if (Number(user.email_verified) === 1) {
      return res.status(400).json({ error: 'This user already accepted the invitation' });
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const inviteGeneratedAt = new Date().toISOString();
    const invitePath = `/accept-invite?token=${verificationToken}`;
    const fallbackInviteUrl = `${getPublicBaseUrl(req)}${invitePath}`;

    await pool.query(
      'UPDATE users SET verification_token = $1, verification_expires = $2, invite_generated_at = $3, email_verified = FALSE WHERE id = $4',
      [verificationToken, verificationExpires, inviteGeneratedAt, id]
    );

    let sendResult = { success: true, skipped: false };
    try {
      sendResult = await sendInviteEmail(user.email, user.username, fallbackInviteUrl);
    } catch (mailErr) {
      console.warn('[Admin Invite] Failed to resend invitation email:', mailErr.message);
      sendResult = { success: false, skipped: false, error: mailErr.message };
    }

    res.json({
      id: user.id,
      email: user.email,
      name: user.username,
      status: user.status || 'active',
      verification_expires: verificationExpires,
      invite_generated_at: inviteGeneratedAt,
      inviteResent: true,
      previousInviteInvalidated: !!user.verification_token,
      invitePath,
      inviteUrl: fallbackInviteUrl,
      emailInviteUrl: sendResult.inviteUrl || null,
      message: sendResult.success
        ? (sendResult.skipped ? 'Invitation refreshed. Email sending is disabled; share the invite link manually.' : 'Invitation resent successfully.')
        : withInviteFailureReason('Invitation refreshed, but email delivery failed. Please share the invite link manually and check SMTP settings.', sendResult)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/users/:id', auth, requirePermission('users:update'), async (req, res) => {
  const id = req.params.id;
  const { name, email, role, status, password } = req.body || {};
  const updates = [];
  const values = [];
  const normalizedName = name !== undefined ? String(name || '').trim() : undefined;
  const normalizedEmail = email !== undefined ? normalizeEmail(email) : undefined;

  if (normalizedName !== undefined && !normalizedName) {
    return res.status(400).json({ error: 'Name cannot be empty' });
  }
  if (normalizedEmail !== undefined && !isValidEmail(normalizedEmail)) {
    return res.status(400).json({ error: 'Please provide a valid email address' });
  }

  if (name !== undefined) {
    updates.push(`username = $${values.length + 1}`);
    values.push(normalizedName);
  }
  if (email !== undefined) {
    updates.push(`email = $${values.length + 1}`);
    values.push(normalizedEmail);
  }
  if (role !== undefined) {
    updates.push(`role = $${values.length + 1}`);
    values.push(role);
  }
  if (status !== undefined) {
    updates.push(`status = $${values.length + 1}`);
    values.push(status);
  }
  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    updates.push(`password_hash = $${values.length + 1}`);
    values.push(hash);
  }

  if (!updates.length) {
    return res.status(400).json({ error: 'No valid user fields provided' });
  }

  values.push(id);
  const sql = `UPDATE users SET ${updates.join(', ')} WHERE id = $${values.length}`;

  try {
    await pool.query(sql, values);
    const result = await pool.query('SELECT id, username AS name, email, role, status, created_at FROM users WHERE id = $1', [id]);
    if (!result.rows.length) return res.status(404).json({ error: 'User not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/users/:id', auth, requirePermission('users:delete'), async (req, res) => {
  const id = req.params.id;
  if (parseInt(id, 10) === 1) {
    return res.status(400).json({ error: 'Cannot delete the primary admin user' });
  }
  try {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create record
router.post('/entity/:type', auth, (req, res, next) => {
  const type = req.params.type;
  const entityType = entityAliases[type] || type;
  // Check permissions based on entity type
  const permissionMap = {
    'beneficiaries': 'beneficiaries:create',
    'farmers': 'beneficiaries:create',
    'projects': 'projects:create',
    'indicators': 'indicators:create',
    'field_activities': 'tasks:create'
  };
  const requiredPerm = permissionMap[entityType] || 'admin:import';
  if (!req.hasPermission(requiredPerm)) {
    return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
  }
  next();
}, async (req, res) => {
  const type = req.params.type;
  const config = resolveEntity(type);
  if (!config) return res.status(400).json({ error: 'Invalid entity type' });

  const record = req.body || {};
  const columns = config.columns.filter(col => record[col] !== undefined);
  const values = columns.map(col => record[col]);

  if (!columns.length) {
    return res.status(400).json({ error: 'No valid fields provided' });
  }

  try {
    const sql = `INSERT INTO ${config.table} (${columns.join(',')}) VALUES (${columns.map((_, idx) => `$${idx + 1}`).join(',')})`;
    const result = await pool.query(sql, values);
    const insertId = result.lastID || result.rows[0]?.id || null;
    const idResult = await pool.query(`SELECT * FROM ${config.table} WHERE id = $1`, [insertId]);
    res.json(idResult.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update record
router.put('/entity/:type/:id', auth, (req, res, next) => {
  const type = req.params.type;
  const entityType = entityAliases[type] || type;
  const permissionMap = {
    'beneficiaries': 'beneficiaries:update',
    'farmers': 'beneficiaries:update',
    'projects': 'projects:update',
    'indicators': 'indicators:update',
    'field_activities': 'tasks:update'
  };
  const requiredPerm = permissionMap[entityType] || 'admin:import';
  if (!req.hasPermission(requiredPerm)) {
    return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
  }
  next();
}, async (req, res) => {
  const type = req.params.type;
  const config = resolveEntity(type);
  if (!config) return res.status(400).json({ error: 'Invalid entity type' });

  const id = req.params.id;
  const record = req.body || {};
  const columns = config.columns.filter(col => record[col] !== undefined);
  if (!columns.length) return res.status(400).json({ error: 'No valid fields provided' });

  const assignments = columns.map((col, idx) => `${col} = $${idx + 1}`).join(', ');
  const values = columns.map(col => record[col]);
  values.push(id);

  try {
    await pool.query(`UPDATE ${config.table} SET ${assignments} WHERE id = $${values.length}`, values);
    const selectResult = await pool.query(`SELECT * FROM ${config.table} WHERE id = $${values.length}`, [id]);
    if (!selectResult.rows[0]) return res.status(404).json({ error: 'Record not found' });
    res.json(selectResult.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete record
router.delete('/entity/:type/:id', auth, (req, res, next) => {
  const type = req.params.type;
  const entityType = entityAliases[type] || type;
  const permissionMap = {
    'beneficiaries': 'beneficiaries:delete',
    'farmers': 'beneficiaries:delete',
    'projects': 'projects:delete',
    'indicators': 'indicators:delete',
    'field_activities': 'tasks:delete'
  };
  const requiredPerm = permissionMap[entityType] || 'admin:import';
  if (!req.hasPermission(requiredPerm)) {
    return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
  }
  next();
}, async (req, res) => {
  const type = req.params.type;
  const config = resolveEntity(type);
  if (!config) return res.status(400).json({ error: 'Invalid entity type' });

  const id = req.params.id;
  try {
    await pool.query(`DELETE FROM ${config.table} WHERE id = $1`, [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Parse uploaded CSV/XLSX in backend and return normalized preview payload
router.post('/import/preview', auth, requirePermission('admin:import'), upload.single('file'), async (req, res) => {
  const type = normalizeImportType(req.body?.type);
  const defaultProject = String(req.body?.projectContext || '').trim();
  const defaultInterventionType = String(req.body?.interventionType || '').trim();
  const defaultInterventionName = String(req.body?.interventionName || '').trim();
  const defaultInterventionDate = String(req.body?.interventionDate || '').trim();
  const config = resolveEntity(type);

  let fileName;
  let buffer;
  if (req.file) {
    fileName = req.file.originalname;
    buffer = req.file.buffer;
  } else if (req.body?.fileName && req.body?.contentBase64) {
    fileName = req.body.fileName;
    buffer = Buffer.from(req.body.contentBase64, 'base64');
  }

  if (!fileName || !buffer) {
    return res.status(400).json({ error: 'A file upload is required' });
  }

  try {
    const parsed = parseSpreadsheetBuffer(fileName, buffer, type);
    const resolvedType = parsed.resolvedType || type || 'beneficiaries';
    const resolvedConfig = resolveEntity(resolvedType);
    if (!resolvedConfig) {
      return res.status(400).json({ error: 'Invalid import type' });
    }
    res.json(buildImportPreview(resolvedType, fileName, parsed.rows, parsed.headers, {
      defaultProject,
      defaultInterventionType,
      defaultInterventionName,
      defaultInterventionDate,
    }));
  } catch (err) {
    console.error('[Import Preview] Failed to parse file:', err.message || err);
    res.status(400).json({ error: `Unable to parse file: ${err.message}` });
  }
});

// Bulk import records
router.post('/import', auth, requirePermission('admin:import'), upload.single('file'), async (req, res) => {
  let type = normalizeImportType(req.body?.type);
  const defaultProject = String(req.body?.projectContext || '').trim();
  const defaultInterventionType = String(req.body?.interventionType || '').trim();
  const defaultInterventionName = String(req.body?.interventionName || '').trim();
  const defaultInterventionDate = String(req.body?.interventionDate || '').trim();
  const duplicatePolicy = normalizeDuplicatePolicy(req.body?.duplicatePolicy);
  const config = resolveEntity(type);

  let records = Array.isArray(req.body?.records) ? req.body.records : null;
  if (!records && typeof req.body?.records === 'string') {
    try {
      records = JSON.parse(req.body.records);
    } catch (err) {
      records = null;
    }
  }

  if (!records && req.file) {
    const parsed = parseSpreadsheetBuffer(req.file.originalname, req.file.buffer, type);
    type = parsed.resolvedType || type || 'beneficiaries';
    records = buildImportPreview(type, req.file.originalname, parsed.rows, parsed.headers, {
      defaultProject,
      defaultInterventionType,
      defaultInterventionName,
      defaultInterventionDate,
    }).records;
  }

  const resolvedConfig = resolveEntity(type);

  if (!resolvedConfig) {
    return res.status(400).json({ error: 'Invalid import request' });
  }

  if (!Array.isArray(records)) {
    return res.status(400).json({ error: 'No import records were provided' });
  }

  let inserted = 0;
  let updated = 0;
  let skipped = 0;
  const norm = (v) => String(v || '').trim().toLowerCase();

  try {
    // For beneficiaries, avoid cross-project data overwrites by matching identifier+project first.
    const farmerIndex = new Map();
    if (resolvedConfig.table === 'farmers') {
      const existing = await pool.query('SELECT id, identifier, project FROM farmers WHERE identifier IS NOT NULL');
      existing.rows.forEach((row) => {
        const identifier = norm(row.identifier);
        const project = norm(row.project);
        if (!identifier) return;
        if (project) farmerIndex.set(`${identifier}::${project}`, row.id);
        // Fallback key when project is missing in an incoming record.
        if (!farmerIndex.has(`${identifier}::`)) farmerIndex.set(`${identifier}::`, row.id);
      });
    }

    for (const item of records) {
      if (resolvedConfig.table === 'farmers' && defaultProject && !item.project) {
        item.project = defaultProject;
      }
      if (resolvedConfig.table === 'farmers') {
        if (defaultInterventionType && !item.intervention_type) item.intervention_type = defaultInterventionType;
        if (defaultInterventionName && !item.intervention_name) item.intervention_name = defaultInterventionName;
        if (defaultInterventionDate && !item.intervention_date) item.intervention_date = defaultInterventionDate;
        if (item.accessed_loan !== undefined) item.accessed_loan = /^(1|true|yes|y)$/i.test(String(item.accessed_loan)) ? 1 : 0;
        if (item.accessed_market !== undefined) item.accessed_market = /^(1|true|yes|y)$/i.test(String(item.accessed_market)) ? 1 : 0;
        if (!item.record_source) item.record_source = 'import';
      }
      const sanitized = {};
      resolvedConfig.columns.forEach(col => {
        if (item[col] !== undefined && item[col] !== null) sanitized[col] = item[col];
      });

      if (resolvedConfig.table === 'farmers') {
        const externalId = item.id || item.identifier;
        if (externalId && !sanitized.identifier && typeof externalId === 'string' && !/^[0-9]+$/.test(externalId)) {
          sanitized.identifier = externalId;
        }
      }

      const values = Object.values(sanitized);
      const shouldUpdate = duplicatePolicy === 'update_same_project' && (item.id || item.identifier);
      let updatedThis = false;
      let matchedFarmerId;

      if (resolvedConfig.table === 'farmers') {
        const idText = String(item.id || '').trim();
        const itemIdentifier = String(item.identifier || idText).trim();
        const itemProject = String(item.project || defaultProject || '').trim();
        const numericId = idText && /^[0-9]+$/.test(idText) ? Number(idText) : null;

        if (numericId) {
          matchedFarmerId = numericId;
        } else if (itemIdentifier) {
          const exactKey = `${norm(itemIdentifier)}::${norm(itemProject)}`;
          const fallbackKey = `${norm(itemIdentifier)}::`;
          matchedFarmerId = itemProject ? farmerIndex.get(exactKey) : farmerIndex.get(fallbackKey);
        }

        if (duplicatePolicy === 'skip_duplicates' && matchedFarmerId) {
          skipped++;
          continue;
        }
      }

      if (shouldUpdate) {
        let whereClause = 'id = $' + (values.length + 1);
        let whereValue = item.id;

        if (resolvedConfig.table === 'farmers') {
          whereValue = matchedFarmerId;
        }

        if (values.length > 0 && whereValue !== undefined) {
          const assignments = Object.keys(sanitized).map((col, idx) => `${col} = $${idx + 1}`).join(', ');
          const result = await pool.query(`UPDATE ${resolvedConfig.table} SET ${assignments} WHERE ${whereClause}`, [...values, whereValue]);
          if (result.rowCount > 0) {
            updated++;
            updatedThis = true;
          }
        }
      }

      if (!updatedThis) {
        if (!Object.keys(sanitized).length) continue;
        const cols = Object.keys(sanitized);
        const params = cols.map((_, idx) => `$${idx + 1}`).join(', ');
        const sql = `INSERT INTO ${resolvedConfig.table} (${cols.join(',')}) VALUES (${params}) RETURNING id`;
        const insertResult = await pool.query(sql, Object.values(sanitized));
        if (resolvedConfig.table === 'farmers') {
          const keyIdentifier = norm(sanitized.identifier || item.identifier || item.id);
          const keyProject = norm(sanitized.project || item.project || defaultProject);
          const insertedId = insertResult.rows?.[0]?.id || insertResult.lastID;
          if (keyIdentifier && insertedId) {
            if (keyProject) farmerIndex.set(`${keyIdentifier}::${keyProject}`, insertedId);
            if (!farmerIndex.has(`${keyIdentifier}::`)) farmerIndex.set(`${keyIdentifier}::`, insertedId);
          }
        }
        inserted++;
      }
    }

    res.json({ inserted, updated, skipped, duplicatePolicy });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SMTP connection test — lets admin verify email config from the platform
router.get('/test-smtp', auth, requirePermission('admin:settings'), async (req, res) => {
  try {
    const result = await testSmtpConnection();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
