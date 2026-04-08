const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const pool = require('../config/database');
const auth = require('../MIDDLEWARE/Auth');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../Services/EmailService');

const emailDisabled = process.env.NODE_ENV === 'development' || !process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.EMAIL_FROM;

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase();
}

function normalizeUsername(value) {
  return String(value || '').trim();
}

function normalizeToken(value) {
  return String(value || '').trim();
}

function isBcryptHash(value) {
  return /^\$2[aby]\$\d{2}\$/.test(String(value || ''));
}

router.post('/register', async (req, res) => {
  const username = normalizeUsername(req.body?.username);
  const email = normalizeEmail(req.body?.email);
  const { password, confirmPassword } = req.body || {};
  
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    const existingByEmail = await pool.query('SELECT * FROM users WHERE lower(trim(email)) = lower($1)', [email]);
    const existingByUsername = await pool.query('SELECT id FROM users WHERE lower(trim(username)) = lower($1)', [username]);

    let user;
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    if (existingByEmail.rows.length > 0) {
      const invited = existingByEmail.rows[0];

      // Only allow overwrite for not-yet-verified invited users.
      if (Number(invited.email_verified) === 1) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      const usernameTakenByAnother = existingByUsername.rows.some(row => row.id !== invited.id);
      if (usernameTakenByAnother) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      const updated = await pool.query(
        'UPDATE users SET username = $1, password_hash = $2, verification_token = $3, verification_expires = $4 WHERE id = $5 RETURNING id, username, email',
        [username, password_hash, verificationToken, verificationExpires, invited.id]
      );
      user = updated.rows[0];
    } else {
      if (existingByUsername.rows.length > 0) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      const result = await pool.query(
        'INSERT INTO users (username, email, password_hash, verification_token, verification_expires) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email',
        [username, email, password_hash, verificationToken, verificationExpires]
      );
      user = result.rows[0];
    }

    let emailSent = false;
    let emailSkip = false;

    try {
      const sendResult = await sendVerificationEmail(email, username, verificationToken);
      emailSent = sendResult.success;
      emailSkip = sendResult.skipped || false;
    } catch (emailErr) {
      console.error('Verification email failed:', emailErr.message);
      if (!emailDisabled) {
        await pool.query('UPDATE users SET email_verified = 1 WHERE id = $1', [user.id]);
      }
    }

    if (emailDisabled || !emailSent) {
      await pool.query('UPDATE users SET email_verified = 1 WHERE id = $1', [user.id]);
      return res.json({
        message: 'Registration successful! Your account is active because email verification is disabled or unavailable.',
        user: { id: user.id, username: user.username, email: user.email },
        requiresVerification: false
      });
    }

    res.json({
      message: 'Registration successful! Please check your email to verify your account.',
      user: { id: user.id, username: user.username, email: user.email },
      requiresVerification: true
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const identifier = normalizeEmail(req.body?.email || req.body?.username || req.body?.identifier);
  const { password } = req.body || {};
  
  if (!identifier || !password) {
    return res.status(400).json({ error: 'Email/username and password are required' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE lower(trim(email)) = lower($1) OR lower(trim(username)) = lower($1) LIMIT 1',
      [identifier]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    if (String(user.status || '').toLowerCase() === 'inactive') {
      return res.status(403).json({ error: 'This account is inactive. Contact an administrator.' });
    }

    if (!user.email_verified && !emailDisabled) {
      return res.status(403).json({
        error: 'Please verify your email before logging in',
        requiresVerification: true,
        email: user.email
      });
    }

    let isMatch = false;
    if (user.password_hash) {
      if (isBcryptHash(user.password_hash)) {
        isMatch = await bcrypt.compare(password, user.password_hash);
      } else {
        // Legacy compatibility path for very old/plaintext password entries.
        isMatch = password === String(user.password_hash);
        if (isMatch) {
          const salt = await bcrypt.genSalt(10);
          const migratedHash = await bcrypt.hash(password, salt);
          await pool.query('UPDATE users SET password_hash = $1 WHERE id = $2', [migratedHash, user.id]);
        }
      }
    }

    if (!isMatch) {
      if (!user.email_verified && user.verification_token) {
        return res.status(403).json({
          error: 'Your invitation is pending. Please use the Accept Invitation link from your email, or ask an admin to resend it.',
          requiresVerification: true,
          email: user.email,
        });
      }
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '8h',
    });

    res.json({
      user: { id: user.id, username: user.username, email: user.email },
      token
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/verify-email', async (req, res) => {
  const token = normalizeToken(req.body?.token);
  
  if (!token) {
    return res.status(400).json({ error: 'Verification token is required' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE verification_token = $1 AND verification_expires > $2',
      [token, new Date().toISOString()]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired verification token' });
    }

    const user = result.rows[0];

    await pool.query(
      'UPDATE users SET email_verified = 1, verification_token = NULL, verification_expires = NULL WHERE id = $1',
      [user.id]
    );

    const jwtToken = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '8h',
    });

    res.json({
      message: 'Email verified successfully!',
      user: { id: user.id, username: user.username, email: user.email },
      token: jwtToken
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/resend-verification', async (req, res) => {
  const email = normalizeEmail(req.body?.email);
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE lower(trim(email)) = lower($1)', [email]);
    
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Email not found' });
    }

    const user = result.rows[0];

    if (user.email_verified) {
      return res.status(400).json({ error: 'Email already verified' });
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    await pool.query(
      'UPDATE users SET verification_token = $1, verification_expires = $2 WHERE id = $3',
      [verificationToken, verificationExpires, user.id]
    );

    try {
      await sendVerificationEmail(email, user.username, verificationToken);
    } catch (emailErr) {
      return res.status(500).json({ error: 'Failed to send verification email' });
    }

    res.json({ message: 'Verification email resent. Please check your email.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch info for a pending invite token (used by accept-invite page to prefill name/email)
router.get('/invite-info', async (req, res) => {
  const token = normalizeToken(req.query?.token);
  if (!token) return res.status(400).json({ error: 'Token is required' });
  try {
    const result = await pool.query(
      'SELECT id, username, email, role FROM users WHERE verification_token = $1 AND verification_expires > $2 AND email_verified = 0',
      [token, new Date().toISOString()]
    );
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired invitation token' });
    }
    const u = result.rows[0];
    res.json({ name: u.username, email: u.email, role: u.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Accept an admin invitation: set display name + password, mark account active
router.post('/accept-invite', async (req, res) => {
  const token = normalizeToken(req.body?.token);
  const username = normalizeUsername(req.body?.username);
  const { password, confirmPassword } = req.body || {};
  if (!token || !username || !password || !confirmPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE verification_token = $1 AND verification_expires > $2 AND email_verified = 0',
      [token, new Date().toISOString()]
    );
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired invitation token. Please ask an admin to resend your invitation.' });
    }
    const user = result.rows[0];

    const conflict = await pool.query('SELECT id FROM users WHERE lower(trim(username)) = lower($1) AND id != $2', [username, user.id]);
    if (conflict.rows.length > 0) {
      return res.status(400).json({ error: 'Username already taken, please choose another' });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    await pool.query(
      'UPDATE users SET username = $1, password_hash = $2, email_verified = 1, verification_token = NULL, verification_expires = NULL WHERE id = $3',
      [username, password_hash, user.id]
    );

    const jwtToken = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({
      message: 'Invitation accepted! Welcome to IZI M&E Platform.',
      user: { id: user.id, username, email: user.email },
      token: jwtToken
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, username, email, role, status, email_verified FROM users WHERE id = $1', [req.user.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
