CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'viewer',
    status VARCHAR(50) DEFAULT 'active',
    password_hash TEXT NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    verification_token TEXT,
    verification_expires TIMESTAMP,
    invite_generated_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS farmers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    location VARCHAR(100),
    phone VARCHAR(50),
    cooperative VARCHAR(255),
    project VARCHAR(100),
    province VARCHAR(100),
    district VARCHAR(100),
    sector VARCHAR(100),
    status VARCHAR(50) DEFAULT 'active',
    sex VARCHAR(20),
    age INTEGER,
    identifier VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS indicators (
    id SERIAL PRIMARY KEY,
    project VARCHAR(100),
    code VARCHAR(100),
    name VARCHAR(255),
    baseline NUMERIC DEFAULT 0,
    target_value NUMERIC,
    actual_value NUMERIC,
    unit VARCHAR(50),
    source TEXT,
    frequency VARCHAR(100),
    responsible VARCHAR(255),
    disagg VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS field_activities (
    id SERIAL PRIMARY KEY,
    project VARCHAR(100),
    type VARCHAR(100),
    location TEXT,
    planned_date DATE,
    actual_date DATE,
    team TEXT,
    outputs TEXT,
    findings TEXT,
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    full_name TEXT,
    description TEXT,
    status VARCHAR(50) DEFAULT 'active',
    start_date DATE,
    end_date DATE,
    location TEXT,
    budget DECIMAL(15,2),
    budget_currency VARCHAR(10) DEFAULT 'USD',
    total_budget DECIMAL(15,2),
    donors TEXT[],
    partners TEXT[],
    lead_agency VARCHAR(255),
    executing_agency VARCHAR(255),
    funding_sources TEXT[],
    co_financiers TEXT[],
    operating_location TEXT,
    duration TEXT,
    key_activities TEXT[],
    key_indicators TEXT[],
    target_beneficiaries INTEGER,
    target_households INTEGER,
    target_individuals INTEGER,
    restoration_area DECIMAL(10,2),
    restoration_area_unit VARCHAR(20) DEFAULT 'hectares',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    assigned_to INTEGER REFERENCES users(id),
    due_date DATE,
    is_completed BOOLEAN DEFAULT FALSE,
    priority VARCHAR(20) DEFAULT 'medium'
);

CREATE TABLE IF NOT EXISTS kobo_forms (
    id TEXT PRIMARY KEY,
    uid TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    project VARCHAR(100),
    type VARCHAR(100),
    status VARCHAR(50) DEFAULT 'connected',
    submissions INTEGER DEFAULT 0,
    mapped_fields INTEGER DEFAULT 0,
    last_sync TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS kobo_submissions (
    id SERIAL PRIMARY KEY,
    form_id TEXT NOT NULL REFERENCES kobo_forms(id) ON DELETE CASCADE,
    submission_id TEXT NOT NULL,
    project VARCHAR(100),
    form_type VARCHAR(100),
    raw_data TEXT,
    synced_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(form_id, submission_id)
);

CREATE TABLE IF NOT EXISTS kobo_field_mappings (
    id SERIAL PRIMARY KEY,
    form_id TEXT NOT NULL REFERENCES kobo_forms(id) ON DELETE CASCADE,
    kobo_field TEXT NOT NULL,
    platform_field TEXT NOT NULL,
    platform_table TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(form_id, kobo_field)
);

CREATE TABLE IF NOT EXISTS automation_rules (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    enabled BOOLEAN DEFAULT TRUE,
    trigger VARCHAR(100) NOT NULL,
    project VARCHAR(255) DEFAULT 'All',
    condition VARCHAR(100) DEFAULT 'always',
    condition_value TEXT,
    action VARCHAR(100) NOT NULL,
    action_params TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);