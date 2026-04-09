/**
 * Role-Based Access Control (RBAC) System
 * Defines permissions for each user role
 */

const ROLES = {
  ADMIN: 'admin',
  M_E_OFFICER: 'm_e_officer',
  PROJECT_OFFICER: 'project_officer',
  PROJECT_COORDINATOR: 'project_coordinator',
  PROJECT_MANAGER: 'project_manager',
  DATA_CLERK: 'data_clerk',
  VIEWER: 'viewer'
};

const PERMISSIONS = {
  // User management
  'users:read': ['admin'],
  'users:create': ['admin'],
  'users:update': ['admin'],
  'users:delete': ['admin'],
  'users:invite': ['admin'],

  // Beneficiary (farmer) management
  'beneficiaries:read': ['admin', 'm_e_officer', 'project_officer', 'project_coordinator', 'project_manager', 'data_clerk', 'viewer'],
  'beneficiaries:create': ['admin', 'm_e_officer', 'project_officer', 'project_coordinator', 'project_manager', 'data_clerk'],
  'beneficiaries:update': ['admin', 'm_e_officer', 'project_officer', 'project_coordinator', 'project_manager', 'data_clerk'],
  'beneficiaries:delete': ['admin', 'data_clerk'],
  'beneficiaries:import': ['admin', 'data_clerk'],

  // Project management
  'projects:read': ['admin', 'm_e_officer', 'project_officer', 'project_coordinator', 'project_manager', 'data_clerk', 'viewer'],
  'projects:create': ['admin', 'project_manager', 'project_officer'],
  'projects:update': ['admin', 'project_manager', 'project_officer'],
  'projects:delete': ['admin'],

  // Indicators management
  'indicators:read': ['admin', 'm_e_officer', 'project_officer', 'project_coordinator', 'project_manager', 'data_clerk', 'viewer'],
  'indicators:create': ['admin', 'm_e_officer', 'project_officer', 'project_coordinator', 'project_manager'],
  'indicators:update': ['admin', 'm_e_officer', 'project_officer', 'project_coordinator', 'project_manager', 'data_clerk'],
  'indicators:delete': ['admin'],
  'indicators:import': ['admin', 'data_clerk'],

  // Tasks management
  'tasks:read': ['admin', 'm_e_officer', 'project_officer', 'project_coordinator', 'project_manager', 'data_clerk', 'viewer'],
  'tasks:create': ['admin', 'project_coordinator', 'project_manager', 'data_clerk'],
  'tasks:update': ['admin', 'project_coordinator', 'project_manager', 'data_clerk'],
  'tasks:delete': ['admin', 'project_coordinator', 'project_manager'],

  // Admin functions
  'admin:import': ['admin', 'data_clerk'],
  'admin:export': ['admin', 'm_e_officer', 'project_officer', 'project_manager'],
  'admin:audit': ['admin'],
  'admin:settings': ['admin'],
  'admin:integrations': ['admin', 'project_officer'],
};

/**
 * Check if a user role has permission for an action
 * @param {string} role - User role
 * @param {string} permission - Permission to check (e.g., 'beneficiaries:read')
 * @returns {boolean}
 */
function hasPermission(role, permission) {
  if (!role || !permission) return false;
  if (role === ROLES.ADMIN) return true; // Admin has all permissions
  const allowedRoles = PERMISSIONS[permission] || [];
  return allowedRoles.includes(role);
}

/**
 * Middleware factory to check permissions
 * @param {string|string[]} requiredPermissions - One or more permissions to check
 * @returns {function} Express middleware
 */
function requirePermission(...requiredPermissions) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userRole = req.user.role || 'viewer';
    const hasRequiredPermission = requiredPermissions.some(perm => 
      hasPermission(userRole, perm)
    );

    if (!hasRequiredPermission) {
      return res.status(403).json({ 
        error: 'Forbidden: Insufficient permissions',
        required: requiredPermissions,
        userRole: userRole
      });
    }

    next();
  };
}

/**
 * Get all permission labels for a role
 * @param {string} role - User role
 * @returns {string[]}
 */
function getPermissionsForRole(role) {
  return Object.entries(PERMISSIONS)
    .filter(([_, allowedRoles]) => allowedRoles.includes(role) || role === ROLES.ADMIN)
    .map(([permission]) => permission);
}

/**
 * Get role display label
 * @param {string} role - User role code
 * @returns {string}
 */
function getRoleLabel(role) {
  const labels = {
    [ROLES.ADMIN]: 'Administrator',
    [ROLES.M_E_OFFICER]: 'M&E Personnel',
    [ROLES.PROJECT_OFFICER]: 'Project Officer',
    [ROLES.PROJECT_COORDINATOR]: 'Project Coordinator',
    [ROLES.PROJECT_MANAGER]: 'Project Manager',
    [ROLES.DATA_CLERK]: 'Data Clerk',
    [ROLES.VIEWER]: 'Viewer'
  };
  return labels[role] || role;
}

/**
 * Get role description
 * @param {string} role - User role code
 * @returns {string}
 */
function getRoleDescription(role) {
  const descriptions = {
    [ROLES.ADMIN]: 'Full platform access, manage users and settings',
    [ROLES.M_E_OFFICER]: 'Monitor & Evaluate: view data, manage indicators',
    [ROLES.PROJECT_OFFICER]: 'Manage projects, activities and key data',
    [ROLES.PROJECT_COORDINATOR]: 'Coordinate projects, manage tasks and activities',
    [ROLES.PROJECT_MANAGER]: 'Create and manage projects, share reports',
    [ROLES.DATA_CLERK]: 'Data entry and import, limited editing',
    [ROLES.VIEWER]: 'Read-only access to all data'
  };
  return descriptions[role] || '';
}

module.exports = {
  ROLES,
  PERMISSIONS,
  hasPermission,
  requirePermission,
  getPermissionsForRole,
  getRoleLabel,
  getRoleDescription
};
