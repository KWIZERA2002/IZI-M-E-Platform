const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

require('./loadEnv');

const DEFAULT_SQLITE_PATH = path.join(__dirname, '..', 'data', 'izi-me.db');
const envUrl = process.env.DATABASE_URL || '';
const DATABASE_URL = envUrl && !envUrl.includes('postgres://username:password@localhost:5432/izi_db')
  ? envUrl
  : `sqlite://${DEFAULT_SQLITE_PATH}`;

const SQLITE_SCHEMA = `
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'viewer',
  status TEXT DEFAULT 'active',
  password_hash TEXT NOT NULL,
  email_verified INTEGER DEFAULT 0,
  verification_token TEXT,
  verification_expires DATETIME,
  invite_generated_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS farmers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  location TEXT,
  phone TEXT,
  cooperative TEXT,
  project TEXT,
  province TEXT,
  district TEXT,
  sector TEXT,
  status TEXT DEFAULT 'active',
  sex TEXT,
  age INTEGER,
  identifier TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS indicators (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project TEXT,
  code TEXT,
  name TEXT,
  baseline NUMERIC DEFAULT 0,
  target_value NUMERIC,
  actual_value NUMERIC,
  unit TEXT,
  source TEXT,
  frequency TEXT,
  responsible TEXT,
  disagg TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS field_activities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project TEXT,
  type TEXT,
  location TEXT,
  planned_date DATE,
  actual_date DATE,
  team TEXT,
  outputs TEXT,
  findings TEXT,
  status TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  full_name TEXT,
  description TEXT,
  status TEXT DEFAULT 'active',
  start_date DATE,
  end_date DATE,
  location TEXT,
  budget DECIMAL(15,2),
  budget_currency TEXT DEFAULT 'USD',
  total_budget DECIMAL(15,2),
  donors TEXT, -- JSON array stored as text
  partners TEXT, -- JSON array stored as text
  lead_agency TEXT,
  executing_agency TEXT,
  funding_sources TEXT, -- JSON array stored as text
  co_financiers TEXT, -- JSON array stored as text
  operating_location TEXT,
  duration TEXT,
  key_activities TEXT, -- JSON array stored as text
  key_indicators TEXT, -- JSON array stored as text
  target_beneficiaries INTEGER,
  target_households INTEGER,
  target_individuals INTEGER,
  restoration_area DECIMAL(10,2),
  restoration_area_unit TEXT DEFAULT 'hectares',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  assigned_to INTEGER REFERENCES users(id),
  due_date DATE,
  is_completed BOOLEAN DEFAULT 0,
  priority TEXT DEFAULT 'medium'
);

CREATE TABLE IF NOT EXISTS kobo_forms (
  id TEXT PRIMARY KEY,
  uid TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  project TEXT,
  type TEXT,
  status TEXT DEFAULT 'connected',
  submissions INTEGER DEFAULT 0,
  mapped_fields INTEGER DEFAULT 0,
  last_sync DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS kobo_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  form_id TEXT NOT NULL REFERENCES kobo_forms(id) ON DELETE CASCADE,
  submission_id TEXT NOT NULL,
  project TEXT,
  form_type TEXT,
  raw_data TEXT,
  synced_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(form_id, submission_id)
);

CREATE TABLE IF NOT EXISTS kobo_field_mappings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  form_id TEXT NOT NULL REFERENCES kobo_forms(id) ON DELETE CASCADE,
  kobo_field TEXT NOT NULL,
  platform_field TEXT NOT NULL,
  platform_table TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(form_id, kobo_field)
);

CREATE TABLE IF NOT EXISTS automation_rules (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  enabled INTEGER DEFAULT 1,
  trigger TEXT NOT NULL,
  project TEXT DEFAULT 'All',
  condition TEXT DEFAULT 'always',
  condition_value TEXT,
  action TEXT NOT NULL,
  action_params TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;

function isSqliteUrl(url) {
  return typeof url === 'string' && url.startsWith('sqlite://');
}

function convertPlaceholders(sql) {
  return sql.replace(/\$[0-9]+/g, '?');
}

function createSqliteClient(filePath) {
  let sqlite3;
  try {
    sqlite3 = require('sqlite3').verbose();
  } catch (error) {
    throw new Error(`SQLite driver is unavailable: ${error.message}`);
  }

  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const db = new sqlite3.Database(filePath);
  db.serialize(() => {
    db.run('PRAGMA foreign_keys = ON');
    db.exec(SQLITE_SCHEMA, (err) => {
      if (err) throw err;
      db.all("PRAGMA table_info(users)", (err2, rows) => {
        if (err2) return;
        const columns = rows.map(r => r.name);
        if (!columns.includes('email')) {
          db.run("ALTER TABLE users ADD COLUMN email TEXT");
        }
        if (!columns.includes('role')) {
          db.run("ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'viewer'");
        }
        if (!columns.includes('status')) {
          db.run("ALTER TABLE users ADD COLUMN status TEXT DEFAULT 'active'");
        }
        if (!columns.includes('invite_generated_at')) {
          db.run("ALTER TABLE users ADD COLUMN invite_generated_at DATETIME");
        }
      });
    });
  });

  return {
    query(sql, params = []) {
      const converted = convertPlaceholders(sql);
      return new Promise((resolve, reject) => {
        const shouldReturnRows = /^\s*(SELECT|PRAGMA|WITH)\b/i.test(sql) || /\bRETURNING\b/i.test(sql);
        if (shouldReturnRows) {
          db.all(converted, params, (err, rows) => {
            if (err) return reject(err);
            resolve({ rows, rowCount: rows?.length ?? 0 });
          });
        } else {
          db.run(converted, params, function (err) {
            if (err) return reject(err);
            resolve({ rows: [], rowCount: this.changes, lastID: this.lastID });
          });
        }
      });
    },
    close() {
      db.close();
    },
  };
}

function createPostgresPool(connectionString) {
  const useSsl = String(process.env.PGSSL || process.env.DATABASE_SSL || '').toLowerCase() === 'true'
    || String(process.env.NODE_ENV || '').toLowerCase() === 'production';

  const pool = new Pool({
    connectionString,
    ssl: useSsl ? { rejectUnauthorized: false } : false,
  });

  pool.initializeSchema = async () => {
    if (pool._schemaInitialized) {
      console.log('[DB] Schema already initialized, skipping');
      return;
    }

    const schemaPath = path.join(__dirname, '..', '..', 'Database', 'Schema.sql');
    if (!fs.existsSync(schemaPath)) {
      throw new Error(`Schema file not found at ${schemaPath}`);
    }

    try {
      console.log('[DB] Starting schema initialization...');
      const schemaSql = fs.readFileSync(schemaPath, 'utf8');
      const statements = schemaSql
        .split(';')
        .map((stmt) => stmt.trim())
        .filter((stmt) => stmt.length > 0);

      console.log(`[DB] Found ${statements.length} SQL statements to execute`);
      let executed = 0;
      for (const statement of statements) {
        try {
          await pool.query(statement);
          executed++;
        } catch (stepError) {
          console.error(`[DB] Error executing statement ${executed + 1}:`, stepError.message);
          throw stepError;
        }
      }

      pool._schemaInitialized = true;
      console.log(`[DB] Postgres schema initialized successfully (${executed} statements)`);
    } catch (error) {
      console.error('[DB] Schema initialization failed:', error.message);
      console.error('[DB] Full error:', error);
      throw error;
    }
  };

  return pool;
}

const pool = (() => {
  try {
    const isUsingSqlite = isSqliteUrl(DATABASE_URL);
    console.log(`[DB] Initializing pool: ${isUsingSqlite ? 'SQLite' : 'PostgreSQL'}`);
    
    let createdPool;
    try {
      createdPool = isUsingSqlite
        ? createSqliteClient(DATABASE_URL.replace('sqlite://', ''))
        : createPostgresPool(DATABASE_URL || '');
    } catch (innerError) {
      console.error('[DB] Pool creation failed:', innerError.message);
      
      // Fallback to SQLite if Postgres fails
      if (!isUsingSqlite) {
        console.log('[DB] Falling back to SQLite due to Postgres error');
        createdPool = createSqliteClient(DEFAULT_SQLITE_PATH);
      } else {
        throw innerError;
      }
    }
    
    if (!createdPool) {
      throw new Error('Failed to create database pool');
    }
    
    if (!createdPool.initializeSchema) {
      createdPool.initializeSchema = async () => {
        console.log('[DB] initializeSchema not defined, skipping');
      };
    }
    
    console.log('[DB] Pool initialized successfully');
    return createdPool;
  } catch (error) {
    console.error('[DB] CRITICAL: Pool initialization error:', error.message);
    console.error('[DB] Stack:', error.stack);
    // Return a stub pool that will fail requests gracefully
    return {
      query: async () => { throw error; },
      initializeSchema: async () => { throw error; },
      close: () => {}
    };
  }
})();

if (!pool.ready) {
  pool.ready = Promise.resolve();
}

module.exports = pool;
