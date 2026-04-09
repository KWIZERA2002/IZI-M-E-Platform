const jwt = require('jsonwebtoken');
const pool = require('../config/database');
const { hasPermission } = require('../utils/rbac');

async function loadAuthenticatedUser(decoded) {
  if (!decoded || !decoded.id) {
    return null;
  }

  const result = await pool.query(
    'SELECT id, username, email, role, status FROM users WHERE id = $1 LIMIT 1',
    [decoded.id]
  );

  if (!result.rows.length) {
    return null;
  }

  const user = result.rows[0];
  return {
    id: user.id,
    username: user.username || decoded.username,
    email: user.email || null,
    role: user.role || decoded.role || 'viewer',
    status: user.status || 'active'
  };
}

module.exports = async (req, res, next) => {
  let token = req.header('x-auth-token');
  let tokenSource = 'x-auth-token';

  if (!token) {
    const authHeader = req.header('authorization') || req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.slice(7).trim();
      tokenSource = 'Authorization: Bearer';
    }
  }

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  console.log(`[Auth] token received from ${tokenSource} for ${req.method} ${req.originalUrl}`);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await loadAuthenticatedUser(decoded);

    if (!user) {
      return res.status(401).json({ msg: 'Token user was not found' });
    }

    if (String(user.status || '').toLowerCase() === 'inactive') {
      return res.status(403).json({ msg: 'This account is inactive. Contact an administrator.' });
    }

    req.user = user;
    req.hasPermission = (perm) => hasPermission(user.role || 'viewer', perm);
    next();
  } catch (err) {
    console.error('[Auth] token validation failed:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports.requirePermission = (...requiredPermissions) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userRole = req.user.role || 'viewer';
    const hasRequiredPermission = requiredPermissions.some((perm) => hasPermission(userRole, perm));

    if (!hasRequiredPermission) {
      return res.status(403).json({
        error: 'Forbidden: Insufficient permissions',
        required: requiredPermissions,
        userRole
      });
    }

    next();
  };
};
