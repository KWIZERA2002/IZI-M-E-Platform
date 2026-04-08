# IZI M&E Platform

A full-stack web application for Monitoring & Evaluation (M&E) activities in Rwanda, with integration for KoBoToolbox data collection.

## Quick Start

### Prerequisites
- Node.js (v16+)
- npm (v8+)
- A running PostgreSQL instance (optional - SQLite fallback available)

### Installation

1. **Clone and install**
   ```bash
   cd Project/Backend
   npm install
   cd ../
   npm install
   ```

2. **Configure environment**
   - Backend uses `Backend/.ENV` with SQLite fallback (no setup needed)
   - For PostgreSQL: update `DATABASE_URL` in `Backend/.ENV`

3. **Start the application**
   ```bash
   # Terminal 1: Start backend
   cd Backend
   npm start

   # Terminal 2: Open frontend
   # Simply open Frontend/IZI-ME-Platform.html in a browser or use a live server
   ```

### Default Port
- Backend API: `http://localhost:5000`
- Frontend: Open `Frontend/IZI-ME-Platform.html` directly or serve via live server

## Project Structure

```
Project/
├── Frontend/
│   ├── IZI-ME-Platform.html    # Main dashboard UI
│   ├── app.js                   # Frontend logic and API integration
│   └── Root/                    # Additional assets
├── Backend/
│   ├── Server.js               # Express server entrypoint
│   ├── Package.json            # Backend dependencies
│   ├── .ENV                    # Environment configuration
│   ├── config/
│   │   └── database.js         # Database setup (SQLite/PostgreSQL)
│   ├── Routes/
│   │   ├── users.js            # Authentication endpoints
│   │   ├── farmers.js          # Farmer data endpoints
│   │   ├── Projects.js         # Project management
│   │   ├── tasks.js            # Task management
│   │   └── kobo.js             # KoBoToolbox sync
│   ├── Services/
│   │   └── KoboSync.js         # KoBo data sync logic
│   ├── MIDDLEWARE/
│   │   └── Auth.js             # JWT authentication
│   └── data/
│       └── izi-me.db           # SQLite database (auto-created)
├── Database/
│   └── Schema.sql              # Database schema reference
├── architecture.md             # System architecture documentation
└── README.md                   # This file
```

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Secure password hashing with bcryptjs

### Data Management
- Projects and indicators tracking
- Farmer/beneficiary database
- Task and alert management
- Learning log entries
- Field activity documentation
- Donor reporting features

### Data Integration
- KoBoToolbox form synchronization
- Automated data ingestion from surveys

### Database Support
- Default: SQLite (local file, no setup required)
- Optional: PostgreSQL (configure DATABASE_URL)

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/me` - Get current user (requires auth)

### Data
- `GET /api/projects` - List projects (requires auth)
- `GET /api/farmers` - List farmers (requires auth)
- `GET /api/tasks` - List tasks (requires auth)
- `POST /api/kobo-sync/sync` - Trigger KoBo sync (requires auth)

### Debug
- `GET /debug/db` - View database contents (development only)

## Development

### Starting the Backend
```bash
cd Backend
npm start          # Production mode
# OR
npm run dev        # Development mode with nodemon
```

### Frontend Development
The frontend is a static HTML application. To use with a live server:

**Using VS Code Live Server:**
1. Install "Live Server" extension
2. Right-click `Frontend/IZI-ME-Platform.html`
3. Select "Open with Live Server"

**Using Python:**
```bash
cd Frontend
python -m http.server 8000
# Then open http://localhost:8000
```

**Using Node:**
```bash
npm install -g http-server
cd Frontend
http-server -p 8000
```

## Environment Configuration

### Backend/.ENV
```
PORT=5000
DATABASE_URL=sqlite://./data/izi-me.db
JWT_SECRET=your_super_secret_key
KOBO_API_TOKEN=your_kobo_token_here
```

### Switch to PostgreSQL
Replace `DATABASE_URL` with:
```
DATABASE_URL=postgres://username:password@localhost:5432/izi_db
```

## Testing

### Register and Login
```bash
# Terminal with backend running
cd Backend
npm start

# In another terminal
node -e "
const u='testuser'+Date.now();
const p='pass1234';
fetch('http://localhost:5000/api/users/register',{
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({username:u,password:p})
}).then(r=>r.json()).then(res=>{
  console.log('Registered:', res.user.username);
  console.log('Token:', res.token.slice(0,20)+'...');
});
"
```

### View Database
```
http://localhost:5000/debug/db
```

## Troubleshooting

### Backend won't start
- Ensure `Backend/data` folder exists: `mkdir -p Backend/data`
- Check `.ENV` file has correct `DATABASE_URL`
- Verify port 5000 is not in use

### Frontend shows login modal
- Ensure backend is running on `http://localhost:5000`
- Check browser console for errors
- Try registering a new account

### Database errors
- SQLite: Check `Backend/data/izi-me.db` permissions
- PostgreSQL: Verify connection string in `.ENV`

## Contributing

1. Create a feature branch
2. Make changes
3. Test endpoints
4. Commit and push

## License

ISC
