CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
);

CREATE TABLE farmers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    location VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE indicators (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    target_value NUMERIC,
    actual_value NUMERIC
);

-- Project Table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    full_name TEXT,
    description TEXT,
    status VARCHAR(50) DEFAULT 'active', -- active, completed, on-hold, planning
    start_date DATE,
    end_date DATE,
    location TEXT,
    budget DECIMAL(15,2),
    budget_currency VARCHAR(10) DEFAULT 'USD',
    total_budget DECIMAL(15,2),
    donors TEXT[], -- Array of donor names
    partners TEXT[], -- Array of partner organizations
    lead_agency VARCHAR(255),
    executing_agency VARCHAR(255),
    funding_sources TEXT[], -- Array of funding source descriptions
    co_financiers TEXT[], -- Array of co-financier names
    operating_location TEXT,
    duration TEXT,
    key_activities TEXT[],
    key_indicators TEXT[],
    target_beneficiaries INTEGER,
    target_households INTEGER,
    target_individuals INTEGER,
    restoration_area DECIMAL(10,2), -- in hectares
    restoration_area_unit VARCHAR(20) DEFAULT 'hectares',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Task Table (Linked to Projects)
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    assigned_to INTEGER REFERENCES users(id),
    due_date DATE,
    is_completed BOOLEAN DEFAULT false,
    priority VARCHAR(20) DEFAULT 'medium' -- low, medium, high
);