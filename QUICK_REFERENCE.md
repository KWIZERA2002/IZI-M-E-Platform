# IZI M&E Platform - Quick Reference

## Start the Platform

### Windows
```bash
startup.bat
# or
./startup.ps1
```

### Manual (Any OS)
```bash
cd Backend && npm start
# In another terminal, open Frontend/IZI-ME-Platform.html
```

## API Quick Reference

### Authentication Endpoints
```javascript
// Register
POST /api/users/register
{ "username": "john", "password": "pass123" }
→ { "user": { "id": 1, "username": "john" }, "token": "jwt..." }

// Login
POST /api/users/login
{ "username": "john", "password": "pass123" }
→ { "user": { "id": 1, "username": "john" }, "token": "jwt..." }

// Get current user (requires auth)
GET /api/users/me
Headers: { "x-auth-token": "jwt-token-here" }
→ { "id": 1, "username": "john" }
```

### Data Endpoints (all require auth token)
```javascript
// Get projects
GET /api/projects
→ [ { "id": 1, "name": "Project A", ... }, ... ]

// Get farmers/beneficiaries
GET /api/farmers
→ [ { "id": 1, "name": "John Farmer", ... }, ... ]

// Complete a task
PATCH /api/tasks/:id/complete
→ { "id": 1, "title": "Task", "is_completed": true }

// Sync KoBo forms
POST /api/kobo-sync/sync
→ { "success": true, "syncedCount": 42 }

// View database (debug endpoint)
GET /debug/db
→ { "database": "SQLite (local)", "tables": { ... } }
```

## File Locations

| File | Purpose |
|------|---------|
| `Frontend/IZI-ME-Platform.html` | Main dashboard UI |
| `Frontend/app.js` | Frontend logic, API calls, UI rendering |
| `Backend/Server.js` | Express server, route mounting |
| `Backend/.ENV` | Configuration (port, database, secrets) |
| `Backend/data/izi-me.db` | SQLite database (auto-created) |
| `Backend/Routes/users.js` | User registration & login |
| `Backend/Routes/Farmers.js` | Farmer data endpoints |
| `Backend/Routes/Projects.js` | Project management |
| `Backend/Services/KoboSync.js` | KoBo API integration |
| `Backend/MIDDLEWARE/Auth.js` | JWT authentication |

## Common Tasks

### Add a new route
1. Create `Backend/Routes/myroute.js`
2. Import and mount in `Backend/Server.js`:
   ```javascript
   app.use('/api/myroute', require('./Routes/myroute'));
   ```

### Test an endpoint
```bash
# Registration
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"pass123"}'

# With token
curl -X GET http://localhost:5000/api/projects \
  -H "x-auth-token: YOUR_JWT_TOKEN"
```

### View database contents
```javascript
// Browser
http://localhost:5000/debug/db

// Node.js
const db = require('sqlite3').verbose();
const sqlite = new db.Database('./Backend/data/izi-me.db');
sqlite.all('SELECT * FROM users', (err, rows) => {
  console.log(rows);
  sqlite.close();
});
```

### Switch to PostgreSQL
1. Install PostgreSQL
2. Create database: `createdb izi_db`
3. Update `Backend/.ENV`:
   ```
   DATABASE_URL=postgres://username:password@localhost:5432/izi_db
   ```
4. Restart backend

## Frontend Structure

```javascript
// Main initialization
App.init()                     // Loads data from backend
App.openPage('dashboard')      // Switch pages
App.renderPage()               // Render current page

// Login/Auth
App.showLogin()                // Show login modal
App.login()                    // Process login
App.register()                 // Process registration

// Data operations
DB.projects                    // Current projects array
DB.farmers                     // Current farmers/beneficiaries
DB.tasks                       // Current tasks
DB.currentUser                 // Logged-in user

// Helper functions
badge(status)                  // Render status badge
icon(name, size)               // Render SVG icon
fmt(number)                    // Format number
pct(current, total)            // Calculate percentage
```

## Environment Variables

```bash
# Backend/.ENV
PORT=5000                                          # Server port
DATABASE_URL=sqlite://./data/izi-me.db            # SQLite (default)
# DATABASE_URL=postgres://user:pass@host/db       # PostgreSQL (optional)
JWT_SECRET=your_super_secret_key                  # Auth secret
KOBO_API_TOKEN=your_kobo_token_here               # KoBo API token
```

## Database Schema

```sql
-- Users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);

-- Farmers/Beneficiaries
CREATE TABLE farmers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  location VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'active',
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tasks
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id),
  title VARCHAR(255) NOT NULL,
  assigned_to INTEGER REFERENCES users(id),
  due_date DATE,
  is_completed BOOLEAN DEFAULT false,
  priority VARCHAR(20) DEFAULT 'medium'
);
```

## Debugging

### Backend logs
Look at the terminal where `npm start` is running:
```
Server running on port 5000
Kobo sync complete. Records synced: 42
```

### Frontend console
Press `F12` in browser, go to Console tab to see:
```javascript
// API errors
Backend /projects error 401: No token, authorization denied

// Data loads
Load projects failed: ...
```

### Database inspection
```bash
node -e "
const db = require('sqlite3').verbose();
const sqlite = new db.Database('./Backend/data/izi-me.db');
sqlite.all('SELECT COUNT(*) as count FROM users', (err, rows) => {
  console.log('Total users:', rows[0].count);
  sqlite.close();
});
"
```

## Performance Tips

- Frontend caches in `DB` object (global state)
- Backend uses connection pooling for database
- SQLite auto-commits (instant persistence)
- Frontend uses Promise.allSettled() for parallel API calls

## Security Notes

- JWT tokens expire in 8 hours
- Passwords hashed with bcryptjs (cost 10)
- Protected routes check for 'x-auth-token' header
- CORS enabled for localhost:* development
- Database file is binary (not version-controlled)

---
For more details, see README.md
