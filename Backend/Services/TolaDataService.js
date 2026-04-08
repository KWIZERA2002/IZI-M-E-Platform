const axios = require('axios');
const pool = require('../config/database');

class TolaDataService {
  constructor() {
    this.apiToken = process.env.TOLADATA_API_TOKEN;
    this.baseUrl = process.env.TOLADATA_BASE_URL || 'https://api.toladata.com';
  }

  isConfigured() {
    return !!this.apiToken;
  }

  async request(path, method = 'GET', body = null, params = {}) {
    if (!this.apiToken) {
      throw new Error('TolaData API token not configured');
    }
    const url = `${this.baseUrl}${path}`;
    const response = await axios({
      url,
      method,
      headers: {
        Authorization: `Token ${this.apiToken}`,
        'Content-Type': 'application/json'
      },
      params,
      data: body
    });
    return response.data;
  }

  async syncActivities() {
    const activities = await pool.query(
      `SELECT fa.id, fa.type, fa.project, fa.planned_date, fa.actual_date, fa.status, fa.location, fa.team, fa.findings, fa.outputs, p.name AS project_name
       FROM field_activities fa
       LEFT JOIN projects p ON fa.project = p.name
       WHERE fa.status IN ('completed', 'in_progress', 'planned')
       ORDER BY fa.planned_date DESC`);

    const results = [];
    for (const activity of activities.rows) {
      const payload = {
        name: activity.type || `Activity ${activity.id}`,
        description: activity.outputs || activity.findings || '',
        start_date: activity.planned_date || null,
        end_date: activity.actual_date || activity.planned_date || null,
        status: activity.status === 'completed' ? 'completed' : 'in_progress',
        location: activity.location || '',
        team_members: activity.team ? activity.team.split(';').map(m => m.trim()) : [],
        project: activity.project_name || activity.project || '',
        custom_fields: {
          izi_activity_id: activity.id,
          izi_project_code: activity.project,
          izi_findings: activity.findings || '',
          izi_outputs: activity.outputs || ''
        }
      };

      try {
        const existing = await this.request('/api/activities/', 'GET', null, { name: payload.name, project: payload.project });
        if (existing && existing.results && existing.results.length) {
          const existingId = existing.results[0].id;
          const response = await this.request(`/api/activities/${existingId}/`, 'PUT', payload);
          results.push({ id: activity.id, action: 'updated', tolaId: response.id });
        } else {
          const response = await this.request('/api/activities/', 'POST', payload);
          results.push({ id: activity.id, action: 'created', tolaId: response.id });
        }
      } catch (error) {
        console.error('[TolaData] activity sync error', activity.id, error.message || error);
        results.push({ id: activity.id, error: error.message || 'unknown error' });
      }
    }

    return {
      success: true,
      total: activities.rows.length,
      synced: results.filter(r => !r.error).length,
      failed: results.filter(r => r.error).length,
      details: results
    };
  }

  async syncLogframe() {
    const indicators = await pool.query(
      `SELECT i.id, i.name, i.code, i.project, i.baseline, i.target_value, i.actual_value, i.unit, i.frequency, i.responsible, i.source, i.disagg, p.name AS project_name
       FROM indicators i
       LEFT JOIN projects p ON i.project = p.name
       ORDER BY i.project, i.code`);

    const results = [];
    for (const indicator of indicators.rows) {
      const payload = {
        name: indicator.name || `Indicator ${indicator.code}`,
        code: indicator.code || '',
        description: `${indicator.name || ''} ${indicator.unit || ''}`.trim(),
        baseline: Number(indicator.baseline) || 0,
        target: Number(indicator.target_value) || 0,
        actual: Number(indicator.actual_value) || 0,
        unit: indicator.unit || '',
        frequency: indicator.frequency || 'Quarterly',
        responsible: indicator.responsible || '',
        source: indicator.source || '',
        project: indicator.project_name || indicator.project || '',
        disaggregation: indicator.disagg || '',
        custom_fields: {
          izi_indicator_code: indicator.code,
          izi_project_code: indicator.project,
          izi_target: indicator.target_value,
          izi_actual: indicator.actual_value
        }
      };

      try {
        const existing = await this.request('/api/indicators/', 'GET', null, { code: payload.code, project: payload.project });
        if (existing && existing.results && existing.results.length) {
          const existingId = existing.results[0].id;
          const response = await this.request(`/api/indicators/${existingId}/`, 'PUT', payload);
          results.push({ id: indicator.id, action: 'updated', tolaId: response.id });
        } else {
          const response = await this.request('/api/indicators/', 'POST', payload);
          results.push({ id: indicator.id, action: 'created', tolaId: response.id });
        }
      } catch (error) {
        console.error('[TolaData] indicator sync error', indicator.id, error.message || error);
        results.push({ id: indicator.id, error: error.message || 'unknown error' });
      }
    }

    return {
      success: true,
      total: indicators.rows.length,
      synced: results.filter(r => !r.error).length,
      failed: results.filter(r => r.error).length,
      details: results
    };
  }

  async getProjects() {
    return await this.request('/api/projects/');
  }
}

module.exports = new TolaDataService();