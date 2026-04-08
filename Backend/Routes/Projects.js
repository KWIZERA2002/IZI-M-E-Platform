const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const auth = require('../MIDDLEWARE/Auth');

// 1. Get all projects with their task counts
router.get('/', auth, async (req, res) => {
    try {
        const query = `
            SELECT p.*, COUNT(t.id) as total_tasks
            FROM projects p
            LEFT JOIN tasks t ON p.id = t.project_id
            GROUP BY p.id
            ORDER BY p.created_at DESC`;
        const result = await pool.query(query);

        // Convert JSON strings back to arrays for SQLite compatibility
        const projects = result.rows.map(project => ({
            ...project,
            donors: Array.isArray(project.donors) ? project.donors : (project.donors ? JSON.parse(project.donors) : []),
            partners: Array.isArray(project.partners) ? project.partners : (project.partners ? JSON.parse(project.partners) : []),
            funding_sources: Array.isArray(project.funding_sources) ? project.funding_sources : (project.funding_sources ? JSON.parse(project.funding_sources) : []),
            co_financiers: Array.isArray(project.co_financiers) ? project.co_financiers : (project.co_financiers ? JSON.parse(project.co_financiers) : []),
            key_activities: Array.isArray(project.key_activities) ? project.key_activities : (project.key_activities ? JSON.parse(project.key_activities) : []),
            key_indicators: Array.isArray(project.key_indicators) ? project.key_indicators : (project.key_indicators ? JSON.parse(project.key_indicators) : [])
        }));

        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Get a single project by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const project = result.rows[0];
        // Convert JSON strings back to arrays
        project.donors = Array.isArray(project.donors) ? project.donors : (project.donors ? JSON.parse(project.donors) : []);
        project.partners = Array.isArray(project.partners) ? project.partners : (project.partners ? JSON.parse(project.partners) : []);
        project.funding_sources = Array.isArray(project.funding_sources) ? project.funding_sources : (project.funding_sources ? JSON.parse(project.funding_sources) : []);
        project.co_financiers = Array.isArray(project.co_financiers) ? project.co_financiers : (project.co_financiers ? JSON.parse(project.co_financiers) : []);
        project.key_activities = Array.isArray(project.key_activities) ? project.key_activities : (project.key_activities ? JSON.parse(project.key_activities) : []);
        project.key_indicators = Array.isArray(project.key_indicators) ? project.key_indicators : (project.key_indicators ? JSON.parse(project.key_indicators) : []);

        res.json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Create a new project
router.post('/', auth, async (req, res) => {
    const {
        name, full_name, description, status, start_date, end_date, location,
        budget, budget_currency, total_budget, donors, partners, lead_agency,
        executing_agency, funding_sources, co_financiers, operating_location,
        duration, key_activities, key_indicators, target_beneficiaries,
        target_households, target_individuals, restoration_area, restoration_area_unit
    } = req.body;

    try {
        // Convert arrays to JSON strings for SQLite compatibility
        const donorsJson = JSON.stringify(donors || []);
        const partnersJson = JSON.stringify(partners || []);
        const fundingSourcesJson = JSON.stringify(funding_sources || []);
        const coFinanciersJson = JSON.stringify(co_financiers || []);
        const keyActivitiesJson = JSON.stringify(key_activities || []);
        const keyIndicatorsJson = JSON.stringify(key_indicators || []);

        const newProject = await pool.query(`
            INSERT INTO projects (
                name, full_name, description, status, start_date, end_date, location,
                budget, budget_currency, total_budget, donors, partners, lead_agency,
                executing_agency, funding_sources, co_financiers, operating_location,
                duration, key_activities, key_indicators, target_beneficiaries,
                target_households, target_individuals, restoration_area, restoration_area_unit
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)
            RETURNING *`,
            [
                name, full_name, description, status || 'active', start_date, end_date, location,
                budget, budget_currency || 'USD', total_budget, donorsJson, partnersJson, lead_agency,
                executing_agency, fundingSourcesJson, coFinanciersJson, operating_location,
                duration, keyActivitiesJson, keyIndicatorsJson, target_beneficiaries,
                target_households, target_individuals, restoration_area, restoration_area_unit || 'hectares'
            ]
        );

        const project = newProject.rows[0];
        // Convert back to arrays for response
        project.donors = donors || [];
        project.partners = partners || [];
        project.funding_sources = funding_sources || [];
        project.co_financiers = co_financiers || [];
        project.key_activities = key_activities || [];
        project.key_indicators = key_indicators || [];

        res.json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Update a project
router.put('/:id', auth, async (req, res) => {
    const { id } = req.params;
    const {
        name, full_name, description, status, start_date, end_date, location,
        budget, budget_currency, total_budget, donors, partners, lead_agency,
        executing_agency, funding_sources, co_financiers, operating_location,
        duration, key_activities, key_indicators, target_beneficiaries,
        target_households, target_individuals, restoration_area, restoration_area_unit
    } = req.body;

    try {
        // Convert arrays to JSON strings for SQLite compatibility
        const donorsJson = JSON.stringify(donors || []);
        const partnersJson = JSON.stringify(partners || []);
        const fundingSourcesJson = JSON.stringify(funding_sources || []);
        const coFinanciersJson = JSON.stringify(co_financiers || []);
        const keyActivitiesJson = JSON.stringify(key_activities || []);
        const keyIndicatorsJson = JSON.stringify(key_indicators || []);

        const updateProject = await pool.query(`
            UPDATE projects SET
                name = $1, full_name = $2, description = $3, status = $4,
                start_date = $5, end_date = $6, location = $7, budget = $8,
                budget_currency = $9, total_budget = $10, donors = $11,
                partners = $12, lead_agency = $13, executing_agency = $14,
                funding_sources = $15, co_financiers = $16, operating_location = $17,
                duration = $18, key_activities = $19, key_indicators = $20,
                target_beneficiaries = $21, target_households = $22, target_individuals = $23,
                restoration_area = $24, restoration_area_unit = $25, updated_at = CURRENT_TIMESTAMP
            WHERE id = $26 RETURNING *`,
            [
                name, full_name, description, status, start_date, end_date, location,
                budget, budget_currency, total_budget, donorsJson, partnersJson, lead_agency,
                executing_agency, fundingSourcesJson, coFinanciersJson, operating_location,
                duration, keyActivitiesJson, keyIndicatorsJson, target_beneficiaries,
                target_households, target_individuals, restoration_area, restoration_area_unit, id
            ]
        );

        if (updateProject.rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const project = updateProject.rows[0];
        // Convert back to arrays for response
        project.donors = donors || [];
        project.partners = partners || [];
        project.funding_sources = funding_sources || [];
        project.co_financiers = co_financiers || [];
        project.key_activities = key_activities || [];
        project.key_indicators = key_indicators || [];

        res.json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. Delete a project
router.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.json({ message: 'Project deleted successfully', project: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;