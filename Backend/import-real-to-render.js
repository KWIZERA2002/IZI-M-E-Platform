/*
  Imports real PSAC + KIIWP beneficiaries from local Excel files directly into deployed Render API.
  Usage:
    $env:RENDER_API_BASE="https://izi-me-platform.onrender.com/api"
    $env:RENDER_ADMIN_EMAIL="admin@izi-me.local"
    $env:RENDER_ADMIN_PASSWORD="Admin@12345"
    node Backend/import-real-to-render.js
*/

'use strict';

const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const API_BASE = (process.env.RENDER_API_BASE || 'https://izi-me-platform.onrender.com/api').replace(/\/$/, '');
const ADMIN_EMAIL = process.env.RENDER_ADMIN_EMAIL || 'admin@izi-me.local';
const ADMIN_PASSWORD = process.env.RENDER_ADMIN_PASSWORD || 'Admin@12345';
const DOWNLOADS = path.join(process.env.USERPROFILE || process.env.HOME || '', 'Downloads');

const CORDAID_CANDIDATES = ['Cordaid outreach database.xlsx', 'Cordaid outreach database .xlsx'];
const KIIWP_CANDIDATES = ['Database KIIWP2_UPDATED (1) (1).xlsx', 'Database KIIWP2 _UPDATED (1) (1).xlsx'];

function resolveFile(candidates) {
  for (const file of candidates) {
    const full = path.join(DOWNLOADS, file);
    if (fs.existsSync(full)) return full;
  }
  return null;
}

function normalizeHeader(value) {
  return String(value || '').replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
}

function normalizeText(value) {
  return String(value || '').replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function parseSex(value) {
  const s = normalizeText(value).toLowerCase();
  if (!s) return 'M';
  if (s.startsWith('f')) return 'F';
  if (s.startsWith('m')) return 'M';
  return 'M';
}

function rowToMap(row) {
  const map = {};
  for (const [k, v] of Object.entries(row || {})) map[normalizeHeader(k)] = v;
  return map;
}

function pick(map, aliases) {
  for (const key of aliases) {
    const v = map[normalizeHeader(key)];
    if (v !== undefined && v !== null && normalizeText(v) !== '') return normalizeText(v);
  }
  return '';
}

function readWorkbookRows(filePath, projectName) {
  const wb = xlsx.readFile(filePath);
  const records = [];

  for (const sheetName of wb.SheetNames) {
    const rows = xlsx.utils.sheet_to_json(wb.Sheets[sheetName], { defval: '' });
    if (!rows.length) continue;

    const firstMap = rowToMap(rows[0]);
    const hasNameColumn = Boolean(
      firstMap['names of participant'] || firstMap['names'] || firstMap['name of participant']
    );

    if (!hasNameColumn) continue;

    for (const row of rows) {
      const map = rowToMap(row);
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

      records.push({
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
        record_source: 'excel_real',
      });
    }
  }

  return records;
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

async function api(pathname, { method = 'GET', token, body } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
    headers['x-auth-token'] = token;
  }

  let res;
  let lastErr;
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      res = await fetch(`${API_BASE}${pathname}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });
      break;
    } catch (err) {
      lastErr = err;
      if (attempt === 4) throw err;
      await new Promise((resolve) => setTimeout(resolve, attempt * 800));
    }
  }
  if (!res) throw lastErr || new Error('request failed');

  const text = await res.text();
  let payload = null;
  try { payload = text ? JSON.parse(text) : null; } catch { payload = { raw: text }; }

  if (!res.ok) {
    throw new Error(`${method} ${pathname} failed (${res.status}): ${payload?.error || payload?.msg || text}`);
  }

  return payload;
}

async function main() {
  const psacFile = resolveFile(CORDAID_CANDIDATES);
  const kiiwpFile = resolveFile(KIIWP_CANDIDATES);

  if (!psacFile) throw new Error(`PSAC Excel file not found in ${DOWNLOADS}`);
  if (!kiiwpFile) throw new Error(`KIIWP Excel file not found in ${DOWNLOADS}`);

  console.log(`Using PSAC file: ${path.basename(psacFile)}`);
  console.log(`Using KIIWP file: ${path.basename(kiiwpFile)}`);

  const tokenPayload = await api('/users/login', {
    method: 'POST',
    body: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
  });
  const token = tokenPayload?.token;
  if (!token) throw new Error('Login succeeded but no token returned');

  const currentFarmers = await api('/farmers', { token });
  console.log(`Existing remote farmers: ${currentFarmers.length}`);

  // Remove existing farmer records so dummy data is fully replaced.
  for (let i = 0; i < currentFarmers.length; i += 100) {
    const chunk = currentFarmers.slice(i, i + 100);
    for (const farmer of chunk) {
      await api(`/farmers/${farmer.id}`, { method: 'DELETE', token });
    }
    console.log(`Deleted ${Math.min(i + 100, currentFarmers.length)}/${currentFarmers.length}`);
  }
  console.log('Cleared remote farmers table');

  const psac = readWorkbookRows(psacFile, 'PSAC');
  const kiiwp = readWorkbookRows(kiiwpFile, 'KIIWP');
  const deduped = dedupeRecords([...psac, ...kiiwp]);
  console.log(`Parsed + deduped records: ${deduped.length}`);

  // Upload in chunks to avoid request body limits.
  const chunkSize = 700;
  let totalInserted = 0;

  for (let i = 0; i < deduped.length; i += chunkSize) {
    const chunk = deduped.slice(i, i + chunkSize);
    const result = await api('/admin/import', {
      method: 'POST',
      token,
      body: {
        type: 'beneficiaries',
        duplicatePolicy: 'always_insert',
        records: chunk,
      },
    });
    totalInserted += Number(result?.inserted || 0);
    console.log(`Uploaded chunk ${Math.floor(i / chunkSize) + 1}: inserted=${result?.inserted || 0}`);
  }

  const after = await api('/farmers', { token });
  const counts = after.reduce((acc, f) => {
    const p = String(f.project || 'Unassigned');
    acc[p] = (acc[p] || 0) + 1;
    return acc;
  }, {});

  console.log('--- Import complete ---');
  console.log(`Inserted reported by API: ${totalInserted}`);
  console.log(`Remote farmers now: ${after.length}`);
  Object.keys(counts).sort().forEach((k) => console.log(`${k}: ${counts[k]}`));
}

main().catch((err) => {
  console.error('Import to Render failed:', err.message);
  process.exit(1);
});
