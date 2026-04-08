const axios = require('axios');
const pool = require('../config/database');

class PowerBIService {
  constructor() {
    this.clientId = process.env.POWERBI_CLIENT_ID;
    this.clientSecret = process.env.POWERBI_CLIENT_SECRET;
    this.tenantId = process.env.POWERBI_TENANT_ID;
    this.workspaceId = process.env.POWERBI_WORKSPACE_ID;
    this.datasetId = process.env.POWERBI_DATASET_ID;
    this.groupId = this.workspaceId;
    this.authUrl = `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/token`;
    this.resource = 'https://analysis.windows.net/powerbi/api/.default';
    this.tokenCache = null;
    this.tokenExpiresAt = 0;
  }

  async getAccessToken() {
    if (this.tokenCache && Date.now() < this.tokenExpiresAt - 60000) {
      return this.tokenCache;
    }
    if (!this.clientId || !this.clientSecret || !this.tenantId) {
      throw new Error('PowerBI credentials are not configured in environment variables');
    }

    const params = new URLSearchParams();
    params.append('client_id', this.clientId);
    params.append('client_secret', this.clientSecret);
    params.append('scope', this.resource);
    params.append('grant_type', 'client_credentials');

    const response = await axios.post(this.authUrl, params.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    this.tokenCache = response.data.access_token;
    this.tokenExpiresAt = Date.now() + (response.data.expires_in || 3600) * 1000;
    return this.tokenCache;
  }

  async request(path, method = 'GET', data = null, queryParams = {}) {
    const token = await this.getAccessToken();
    const workspacePrefix = this.groupId ? `/groups/${this.groupId}` : '';
    const url = `https://api.powerbi.com/v1.0/myorg${workspacePrefix}${path}`;
    const config = {
      method,
      url,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      params: queryParams
    };
    if (data) config.data = data;
    const response = await axios(config);
    return response.data;
  }

  async pushIndicatorsData() {
    const query = `SELECT i.code, i.name, i.project, i.unit, i.baseline, i.target_value, i.actual_value, i.source, i.frequency, i.responsible, i.last_updated, p.name AS project_name FROM indicators i LEFT JOIN projects p ON i.project = p.name ORDER BY i.project, i.code`; 
    const indicators = await pool.query(query);

    if (!this.datasetId) {
      throw new Error('POWERBI_DATASET_ID is not configured');
    }

    const rows = indicators.rows.map(row => ({
      Project: row.project || '',
      ProjectName: row.project_name || row.project || '',
      IndicatorCode: row.code || '',
      IndicatorName: row.name || '',
      Baseline: Number(row.baseline) || 0,
      Target: Number(row.target_value) || 0,
      Actual: Number(row.actual_value) || 0,
      Unit: row.unit || '',
      Source: row.source || '',
      Frequency: row.frequency || '',
      Responsible: row.responsible || '',
      AchievementPercentage: row.target_value ? ((Number(row.actual_value) / Number(row.target_value)) * 100) : 0,
      LastUpdated: row.last_updated || new Date().toISOString()
    }));

    await this.request(`/datasets/${this.datasetId}/tables/Indicators/rows`, 'POST', { rows });
    return { synced: rows.length, details: rows.length ? 'Indicator rows sent' : 'No indicator rows found' };
  }

  async pushDashboardData() {
    const projects = await pool.query('SELECT name, status, start_date, end_date, budget, description FROM projects ORDER BY name');

    if (!this.datasetId) {
      throw new Error('POWERBI_DATASET_ID is not configured');
    }

    const rows = projects.rows.map(project => ({
      Project: project.name || '',
      Status: project.status || 'unknown',
      StartDate: project.start_date ? new Date(project.start_date).toISOString() : new Date().toISOString(),
      EndDate: project.end_date ? new Date(project.end_date).toISOString() : new Date().toISOString(),
      Budget: Number(project.budget) || 0,
      Description: project.description || ''
    }));

    await this.request(`/datasets/${this.datasetId}/tables/Dashboard/rows`, 'POST', { rows });
    return { synced: rows.length, details: rows.length ? 'Dashboard rows sent' : 'No dashboard rows found' };
  }

  async createDataset() {
    if (!this.datasetId) {
      throw new Error('POWERBI_DATASET_ID is not configured');
    }
    const schema = {
      name: 'IZI_ME_Dataset',
      defaultMode: 'Push',
      tables: [
        {
          name: 'Indicators',
          columns: [
            { name: 'Project', dataType: 'string' },
            { name: 'ProjectName', dataType: 'string' },
            { name: 'IndicatorCode', dataType: 'string' },
            { name: 'IndicatorName', dataType: 'string' },
            { name: 'Baseline', dataType: 'double' },
            { name: 'Target', dataType: 'double' },
            { name: 'Actual', dataType: 'double' },
            { name: 'Unit', dataType: 'string' },
            { name: 'Source', dataType: 'string' },
            { name: 'Frequency', dataType: 'string' },
            { name: 'Responsible', dataType: 'string' },
            { name: 'AchievementPercentage', dataType: 'double' },
            { name: 'LastUpdated', dataType: 'datetime' }
          ]
        },
        {
          name: 'Dashboard',
          columns: [
            { name: 'Project', dataType: 'string' },
            { name: 'Status', dataType: 'string' },
            { name: 'StartDate', dataType: 'datetime' },
            { name: 'EndDate', dataType: 'datetime' },
            { name: 'Budget', dataType: 'double' },
            { name: 'Description', dataType: 'string' }
          ]
        }
      ]
    };

    return await this.request('/datasets', 'POST', schema);
  }

  async getDatasetInfo() {
    if (!this.datasetId) {
      throw new Error('POWERBI_DATASET_ID is not configured');
    }
    return await this.request(`/datasets/${this.datasetId}`);
  }
}

module.exports = new PowerBIService();