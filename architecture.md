# Architecture Overview of IZI M&E Platform Repository

## Overview
The IZI M&E Platform is a full-stack web application designed for Monitoring and Evaluation (M&E) activities in Rwanda. It integrates data from KoBoToolbox, manages farmers, projects, and tasks, and provides a user interface for data visualization and management.

## Architecture Diagram
```
[Frontend (HTML/CSS/JS)]
    |
    | HTTP Requests
    v
[Backend (Node.js/Express)]
    |
    | Database Queries
    v
[PostgreSQL Database]
    ^
    | Data Sync
[KoBoToolbox API]
```

## Components

### 1. Frontend
- **Location**: `Frontend/`
- **Technologies**: HTML, CSS, JavaScript
- **Files**:
  - `IZI-ME-Platform.html`: Main dashboard UI with sidebar navigation, topbar, and content area
  - `app.js`: JavaScript for API interactions (e.g., fetching farmers data)
  - `Root/`: Contains additional frontend assets (currently only .gitignore)
- **Purpose**: Provides the user interface for viewing and interacting with M&E data

### 2. Backend
- **Location**: `Backend/`
- **Technologies**: Node.js, Express.js
- **Main File**: `Server.js`
- **Dependencies**: Express, CORS, JWT for authentication, PostgreSQL client

#### Server Setup (`Server.js`)
- Express server running on port 5000 (configurable via `PORT` env var)
- CORS enabled for cross-origin requests
- JSON parsing middleware
- Route mounting:
  - `/api/farmers`: Farmer-related endpoints
  - `/api/users`: User authentication endpoints (route file not present in current structure)
  - `/api/projects`: Project management endpoints
  - `/api/tasks`: Task management endpoints

#### Database Connection (`Database.js`)
- Uses `pg` (PostgreSQL client) with connection pooling
- Connects via `DATABASE_URL` environment variable

#### Middleware
- **Auth.js** (`MIDDLEWARE/Auth.js`): JWT-based authentication middleware
  - Verifies `x-auth-token` header
  - Decodes JWT using `JWT_SECRET` env var
  - Attaches user info to request object

#### Routes
- **Farmers.js** (`Routes/Farmers.js`): CRUD operations for farmers
  - `GET /`: Retrieve all farmers (authenticated)
- **Projects.js** (`Routes/Projects.js`): Project management
  - `GET /`: Get all projects with task counts
  - `POST /`: Create new project
- **Tasks.js** (`Routes/tasks.js`): Task operations
  - `PATCH /:id/complete`: Mark task as completed

#### Services
- **KoboSync.js** (`Services/KoboSync.js`): Integration with KoBoToolbox API
  - Fetches data from KoBoToolbox using API token
  - Inserts/syncs data into local PostgreSQL database (e.g., farmers table)
  - Handles data conflicts with `ON CONFLICT DO NOTHING`

### 3. Database
- **Location**: `Database/`
- **Technology**: PostgreSQL
- **Schema** (`Schema.sql`):
  - `users`: User authentication (id, username, password_hash)
  - `farmers`: Farmer information (id, name, location, created_at)
  - `indicators`: M&E indicators (id, name, target_value, actual_value)
  - `projects`: Project management (id, name, description, status, dates)
  - `tasks`: Task tracking linked to projects (id, project_id, title, assigned_to, due_date, is_completed, priority)

### 4. Configuration
- **Environment Variables**:
  - `DATABASE_URL`: PostgreSQL connection string
  - `JWT_SECRET`: Secret key for JWT signing
  - `KOBO_API_TOKEN`: API token for KoBoToolbox access
  - `PORT`: Server port (default 5000)

## How It Works

1. **Data Collection**: Field data is collected using KoBoToolbox forms and stored in KoBo's servers.

2. **Data Synchronization**: The `KoboSync` service periodically fetches data from KoBoToolbox API and syncs it into the local PostgreSQL database, populating tables like `farmers`.

3. **User Authentication**: Users log in via JWT-based authentication. The auth middleware protects API endpoints.

4. **API Interactions**:
   - Frontend makes authenticated HTTP requests to backend APIs
   - Backend queries PostgreSQL database and returns JSON responses
   - Supports operations like viewing farmers, managing projects and tasks

5. **Dashboard**: The HTML frontend displays the data in a modern UI, showing statistics, project progress, and farmer information.

## Deployment Considerations
- Backend requires Node.js environment
- PostgreSQL database setup with schema initialization
- Environment variables configuration
- CORS configuration for frontend-backend communication
- KoBoToolbox API access and token management

## Missing Components (Based on Code Analysis)
- User authentication routes (`routes/users.js`) - referenced in server but file not present
- Frontend build process or static file serving
- Database migrations or seeding scripts
- Error handling and logging mechanisms
- Testing framework

This architecture supports scalable M&E operations by integrating external data sources with local management capabilities.</content>
<parameter name="filePath">c:\Users\CORDAID.HP\Project\architecture.md