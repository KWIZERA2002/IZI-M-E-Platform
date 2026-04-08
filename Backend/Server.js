const express = require('express');
const cors = require('cors');
const path = require('path');
require('./config/loadEnv');
const pool = require('./config/database');

const app = express();

const configuredOrigins = String(process.env.FRONTEND_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

// Add Render's own URL if available (auto-set by Render)
if (process.env.RENDER_EXTERNAL_URL) {
  configuredOrigins.push(process.env.RENDER_EXTERNAL_URL.replace(/\/$/, ''));
}

const devOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'http://localhost:8080',
  'http://127.0.0.1:8080',
];

const allowedOrigins = new Set([...configuredOrigins, ...devOrigins]);

app.use(cors({
  origin(origin, callback) {
    // No origin = same-origin request or non-browser client, allow it
    if (!origin) return callback(null, true);
    // If no production origins configured, allow all (single-service mode)
    if (!configuredOrigins.length) return callback(null, true);
    // Allow configured + dev origins
    if (allowedOrigins.has(origin)) return callback(null, true);
    // Allow same-host requests
    const host = process.env.RENDER_EXTERNAL_URL || process.env.APP_URL || '';
    if (host && origin === host.replace(/\/$/, '')) return callback(null, true);
    return callback(new Error(`CORS blocked for origin ${origin}`));
  },
  optionsSuccessStatus: 200,
}));
app.use(express.json({ limit: '50mb' }));

// Serve Frontend static files
const frontendPath = path.join(__dirname, '..', 'Frontend');
app.use(express.static(frontendPath));

// Import Routes
app.use('/api/farmers', require('./Routes/Farmers'));
app.use('/api/users', require('./Routes/users'));
app.use('/api/projects', require('./Routes/Projects'));
app.use('/api/tasks', require('./Routes/tasks'));
app.use('/api/kobo-sync', require('./Routes/kobo'));
app.use('/api/admin', require('./Routes/Admin'));
app.use('/api/integrations', require('./Routes/integrations'));

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    database: process.env.DATABASE_URL?.includes('sqlite') ? 'sqlite' : 'postgres',
    dbConfigured: !!process.env.DATABASE_URL,
    frontendUrl: process.env.FRONTEND_URL || null,
    timestamp: new Date().toISOString(),
  });
});

app.get('/health/db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() as current_time, version() as version');
    res.json({
      status: 'connected',
      database: process.env.DATABASE_URL?.includes('sqlite') ? 'sqlite' : 'postgres',
      schemaInitialized: pool._schemaInitialized || false,
      time: result.rows[0]?.current_time || 'N/A',
      version: result.rows[0]?.version || 'N/A'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
      database: process.env.DATABASE_URL?.includes('sqlite') ? 'sqlite' : 'postgres',
      schemaInitialized: pool._schemaInitialized || false
    });
  }
});

// Debug endpoint - inspect database (dev only)
app.get('/debug/db', async (req, res) => {
  const pool = require('./config/database');
  try {
    const users = await pool.query('SELECT id, username FROM users');
    const projects = await pool.query('SELECT id, name FROM projects');
    const farmers = await pool.query('SELECT id, name, location FROM farmers');
    res.json({
      database: process.env.DATABASE_URL?.includes('sqlite') ? 'SQLite (local)' : 'PostgreSQL',
      tables: {
        users: users.rows,
        projects: projects.rows,
        farmers: farmers.rows
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Debug endpoint - execute SQL queries (dev only)
app.post('/debug/sql', async (req, res) => {
  const pool = require('./config/database');
  const { query } = req.body;
  
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  // Basic security - only allow SELECT queries for safety
  if (!query.toUpperCase().trim().startsWith('SELECT')) {
    return res.status(403).json({ error: 'Only SELECT queries are allowed for safety' });
  }

  try {
    const result = await pool.query(query);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Email verification handler
app.get('/verify', (req, res) => {
  const token = req.query.token;
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Email Verification - IZI M&E</title>
      <style>
        body { font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 50px auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; }
        .success { color: #1ec98a; }
        .error { color: #f05252; }
        .button { background: #4f8ef7; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Email Verification</h1>
        <div id="status">Verifying your email...</div>
        <a href="/" class="button">Go to Platform</a>
      </div>
      <script>
        async function verifyEmail() {
          const token = new URLSearchParams(window.location.search).get('token');
          if (!token) {
            document.getElementById('status').innerHTML = '<p class="error">No verification token found.</p>';
            return;
          }
          
          try {
            const response = await fetch('/api/users/verify-email', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token })
            });
            
            const data = await response.json();
            
            if (response.ok) {
              document.getElementById('status').innerHTML = '<p class="success">✓ Email verified successfully! Redirecting...</p>';
              localStorage.setItem('token', data.token);
              setTimeout(() => window.location.href = '/', 2000);
            } else {
              document.getElementById('status').innerHTML = '<p class="error">✗ ' + data.error + '</p>';
            }
          } catch (err) {
            document.getElementById('status').innerHTML = '<p class="error">✗ Verification failed: ' + err.message + '</p>';
          }
        }
        verifyEmail();
      </script>
    </body>
    </html>
  `;
  res.send(html);
});

// Accept invitation page — sets display name + password for admin-invited accounts
app.get('/accept-invite', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Accept Invitation - IZI M&E</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: Arial, sans-serif; background: #f0f4f8; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .card { background: white; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.12); padding: 40px; width: 100%; max-width: 460px; }
        .logo { text-align: center; margin-bottom: 28px; }
        .logo h1 { font-size: 22px; color: #1a2e4a; letter-spacing: 0.5px; }
        .logo p { color: #666; font-size: 13px; margin-top: 4px; }
        h2 { font-size: 20px; color: #222; margin-bottom: 6px; }
        .subtitle { color: #666; font-size: 14px; margin-bottom: 24px; }
        label { display: block; font-size: 13px; font-weight: 600; color: #444; margin-bottom: 5px; margin-top: 16px; }
        input { width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; outline: none; transition: border 0.2s; }
        input:focus { border-color: #4f8ef7; }
        input[readonly] { background: #f3f4f6; color: #666; cursor: default; }
        .hint { font-size: 12px; color: #888; margin-top: 4px; }
        button { width: 100%; margin-top: 24px; padding: 12px; background: #4f8ef7; color: white; border: none; border-radius: 6px; font-size: 15px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
        button:hover { background: #3a7bea; }
        button:disabled { background: #9db8ef; cursor: not-allowed; }
        .msg { margin-top: 16px; padding: 12px; border-radius: 6px; font-size: 14px; display: none; }
        .msg.success { background: #d1fae5; color: #065f46; }
        .msg.error { background: #fee2e2; color: #991b1b; }
        .strength { height: 4px; border-radius: 2px; margin-top: 6px; background: #e5e7eb; overflow: hidden; }
        .strength-bar { height: 100%; width: 0; transition: width 0.3s, background 0.3s; border-radius: 2px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="logo">
          <h1>IZI M&amp;E Platform</h1>
          <p>Rwanda Monitoring &amp; Evaluation System</p>
        </div>
        <h2>Accept Your Invitation</h2>
        <p class="subtitle" id="subtitle">Loading your invitation...</p>
        <form id="form" style="display:none" onsubmit="submit(event)">
          <label>Email (assigned by admin)</label>
          <input type="email" id="email" readonly>
          <label>Display Name</label>
          <input type="text" id="username" placeholder="Your full name" autocomplete="name" required>
          <label>Password</label>
          <input type="password" id="password" placeholder="At least 6 characters" autocomplete="new-password" required oninput="updateStrength()">
          <div class="strength"><div class="strength-bar" id="strength-bar"></div></div>
          <label>Confirm Password</label>
          <input type="password" id="confirm" placeholder="Repeat your password" autocomplete="new-password" required>
          <div class="hint" id="match-hint"></div>
          <button type="submit" id="btn">Accept Invitation &amp; Sign In</button>
        </form>
        <div class="msg" id="msg"></div>
      </div>
      <script>
        const token = new URLSearchParams(window.location.search).get('token');

        function showMsg(text, type) {
          const el = document.getElementById('msg');
          el.textContent = text;
          el.className = 'msg ' + type;
          el.style.display = 'block';
        }

        function updateStrength() {
          const p = document.getElementById('password').value;
          const bar = document.getElementById('strength-bar');
          let score = 0;
          if (p.length >= 6) score++;
          if (p.length >= 10) score++;
          if (/[A-Z]/.test(p)) score++;
          if (/[0-9]/.test(p)) score++;
          if (/[^A-Za-z0-9]/.test(p)) score++;
          const widths = ['0%','20%','40%','60%','80%','100%'];
          const colors = ['','#ef4444','#f97316','#eab308','#84cc16','#22c55e'];
          bar.style.width = widths[score];
          bar.style.background = colors[score];
          const confirmEl = document.getElementById('confirm');
          if (confirmEl.value) {
            document.getElementById('match-hint').textContent =
              confirmEl.value === p ? '✓ Passwords match' : '✗ Passwords do not match';
            document.getElementById('match-hint').style.color =
              confirmEl.value === p ? '#16a34a' : '#dc2626';
          }
        }

        document.getElementById('confirm').addEventListener('input', () => {
          const p = document.getElementById('password').value;
          const c = document.getElementById('confirm').value;
          document.getElementById('match-hint').textContent = c ? (c === p ? '✓ Passwords match' : '✗ Passwords do not match') : '';
          document.getElementById('match-hint').style.color = c === p ? '#16a34a' : '#dc2626';
        });

        async function loadInvite() {
          if (!token) {
            document.getElementById('subtitle').textContent = 'No invitation token found. Please use the link from your invitation email.';
            return;
          }
          try {
            const r = await fetch('/api/users/invite-info?token=' + encodeURIComponent(token));
            const d = await r.json();
            if (!r.ok) {
              document.getElementById('subtitle').textContent = d.error || 'Invalid or expired invitation.';
              return;
            }
            document.getElementById('subtitle').textContent = 'You are joining as ' + (d.role || 'viewer') + '. Set your name and password to get started.';
            document.getElementById('email').value = d.email;
            document.getElementById('username').value = d.name || '';
            document.getElementById('form').style.display = 'block';
          } catch (e) {
            document.getElementById('subtitle').textContent = 'Could not load invitation. Please try again.';
          }
        }

        async function submit(e) {
          e.preventDefault();
          const username = document.getElementById('username').value.trim();
          const password = document.getElementById('password').value;
          const confirmPassword = document.getElementById('confirm').value;
          const btn = document.getElementById('btn');

          if (!username) return showMsg('Please enter your display name.', 'error');
          if (password !== confirmPassword) return showMsg('Passwords do not match.', 'error');
          if (password.length < 6) return showMsg('Password must be at least 6 characters.', 'error');

          btn.disabled = true;
          btn.textContent = 'Setting up your account...';

          try {
            const r = await fetch('/api/users/accept-invite', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token, username, password, confirmPassword })
            });
            const d = await r.json();
            if (r.ok) {
              localStorage.setItem('token', d.token);
              showMsg('Welcome, ' + (d.user.username || username) + '! Redirecting to the platform...', 'success');
              document.getElementById('form').style.display = 'none';
              setTimeout(() => window.location.href = '/', 2000);
            } else {
              showMsg(d.error || 'Could not complete setup. Please try again.', 'error');
              btn.disabled = false;
              btn.textContent = 'Accept Invitation & Sign In';
            }
          } catch (err) {
            showMsg('Network error: ' + err.message, 'error');
            btn.disabled = false;
            btn.textContent = 'Accept Invitation & Sign In';
          }
        }

        loadInvite();
      </script>
    </body>
    </html>
  `;
  res.send(html);
});

// Catch-all route - serve the frontend HTML file (only for non-API routes)
app.get('*', (req, res) => {
  // Don't serve HTML for API requests or missing routes
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Route not found' });
  }
  // Serve frontend for all other requests
  res.sendFile(path.join(frontendPath, 'IZI-ME-Platform.html'));
});

// Global error handler - must be last
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.message || err);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    console.log('[SERVER] Initializing database...');
    if (pool.initializeSchema) {
      await pool.initializeSchema();
    }

    // Auto-seed PSAC and KIIWP farmer data if not yet present
    try {
      const check = await pool.query("SELECT COUNT(*) AS cnt FROM farmers WHERE project IN ('PSAC','KIIWP')");
      const cnt = parseInt(check.rows[0]?.cnt ?? check.rows[0]?.['COUNT(*)'] ?? 0, 10);
      if (cnt < 10) {
        console.log('[SERVER] Seeding PSAC/KIIWP farmer data...');
        const seedFarmers = require('./seed-farmers');
        if (typeof seedFarmers === 'function') await seedFarmers();
      } else {
        console.log(`[SERVER] Farmer data already present (${cnt} PSAC/KIIWP records)`);
      }
    } catch (seedErr) {
      console.warn('[SERVER] Farmer seed skipped:', seedErr.message);
    }

    // Test database connection
    console.log('[SERVER] Testing database connection...');
    await pool.query('SELECT 1 as test');
    console.log('[SERVER] Database connection verified ✓');

    app.listen(PORT, () => {
      console.log(`[SERVER] Running on port ${PORT} 🚀`);
      console.log(`[SERVER] API: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('[SERVER] Startup failed:', error.message);
    console.error('[SERVER] Stack:', error.stack);
    process.exit(1);
  }
}

startServer();