const bcrypt = require('bcryptjs');
const pool = require('./config/database');

const DEFAULT_ADMIN = {
  username: process.env.DEFAULT_ADMIN_USERNAME || 'admin',
  email: process.env.DEFAULT_ADMIN_EMAIL || 'admin@izi-me.local',
  password: process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@12345',
};

async function ensureBootstrapAdmin() {
  const existing = await pool.query('SELECT COUNT(*) AS cnt FROM users');
  const count = parseInt(existing.rows[0]?.cnt ?? existing.rows[0]?.['COUNT(*)'] ?? 0, 10);

  if (count > 0) {
    console.log(`[AUTH] Users already present (${count}), skipping bootstrap admin`);
    return null;
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(DEFAULT_ADMIN.password, salt);

  const inserted = await pool.query(
    `INSERT INTO users (username, email, role, status, password_hash, email_verified)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, username, email, role`,
    [
      DEFAULT_ADMIN.username,
      DEFAULT_ADMIN.email,
      'admin',
      'active',
      passwordHash,
      1,
    ]
  );

  console.log(`[AUTH] Bootstrap admin created: ${inserted.rows[0].email}`);
  return {
    ...inserted.rows[0],
    password: DEFAULT_ADMIN.password,
  };
}

module.exports = {
  ensureBootstrapAdmin,
  DEFAULT_ADMIN,
};