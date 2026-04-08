const axios = require('axios');
const pool = require('../config/database');

class MondayService {
  constructor() {
    this.apiToken = process.env.MONDAY_API_TOKEN;
    this.boardId = process.env.MONDAY_BOARD_ID;
    this.apiUrl = 'https://api.monday.com/v2';
  }

  isConfigured() {
    return !!this.apiToken && !!this.boardId;
  }

  async request(query, variables = {}) {
    if (!this.apiToken) {
      throw new Error('Monday.com API token not configured');
    }
    const response = await axios.post(this.apiUrl, { query, variables }, {
      headers: {
        Authorization: this.apiToken,
        'Content-Type': 'application/json'
      }
    });
    if (response.data.errors) {
      throw new Error(response.data.errors.map(e => e.message).join('; '));
    }
    return response.data.data;
  }

  async findItemByName(name) {
    const escaped = name.replace(/"/g, '\\"');
    const query = `query { boards(ids: ${this.boardId}) { items_by_column_values(column_id: \"name\", column_value: \"${escaped}\") { id name } } }`;
    const data = await this.request(query);
    return data.boards?.[0]?.items_by_column_values?.[0] || null;
  }

  async createItem(name, columnValues) {
    const payload = JSON.stringify(columnValues).replace(/\\/g, '\\\\');
    const query = `mutation { create_item(board_id: ${this.boardId}, item_name: \"${name.replace(/"/g, '\\"')}\", column_values: \"${payload}\") { id } }`;
    const data = await this.request(query);
    return data.create_item;
  }

  async updateItem(itemId, columnValues) {
    const payload = JSON.stringify(columnValues).replace(/\\/g, '\\\\');
    const query = `mutation { change_multiple_column_values(board_id: ${this.boardId}, item_id: ${itemId}, column_values: \"${payload}\") { id } }`;
    const data = await this.request(query);
    return data.change_multiple_column_values;
  }

  async syncTasks() {
    const tasks = await pool.query(
      `SELECT t.id, t.title, t.description, t.status, t.due_date, t.assigned_to, t.project, t.priority, t.type, t.created_by, p.name as project_name
       FROM tasks t
       LEFT JOIN projects p ON t.project = p.name
       WHERE t.status IN ('pending', 'in_progress', 'completed')
       ORDER BY t.due_date DESC`);

    const results = [];
    for (const task of tasks.rows) {
      const name = task.title || `Task ${task.id}`;
      const columnValues = {
        status: { label: task.status === 'completed' ? 'Done' : task.status === 'in_progress' ? 'In Progress' : 'To Do' },
        date4: task.due_date ? { date: task.due_date } : null,
        text: task.description || '',
        connect_board: task.project_name || '',
        people: task.assigned_to ? `${task.assigned_to}` : ''
      };

      try {
        const existing = await this.findItemByName(name);
        if (existing) {
          await this.updateItem(existing.id, columnValues);
          results.push({ id: task.id, action: 'updated', mondayId: existing.id });
        } else {
          const created = await this.createItem(name, columnValues);
          results.push({ id: task.id, action: 'created', mondayId: created.id });
        }
      } catch (error) {
        console.error('[Monday] task sync failed', task.id, error.message || error);
        results.push({ id: task.id, error: error.message || 'unknown error' });
      }
    }

    return {
      success: true,
      total: tasks.rows.length,
      synced: results.filter(r => !r.error).length,
      failed: results.filter(r => r.error).length,
      details: results
    };
  }

  async syncActivities() {
    const activities = await pool.query(
      `SELECT fa.id, fa.type, fa.project, fa.planned_date, fa.actual_date, fa.status, fa.location, fa.team, fa.findings, fa.outputs, p.name as project_name
       FROM field_activities fa
       LEFT JOIN projects p ON fa.project = p.name
       WHERE fa.status IN ('planned', 'in_progress', 'completed')
       ORDER BY fa.planned_date DESC`);

    const results = [];
    for (const activity of activities.rows) {
      const name = `${activity.type || 'Activity'} - ${activity.project_name || activity.project || activity.id}`;
      const columnValues = {
        status: { label: activity.status === 'completed' ? 'Done' : activity.status === 'in_progress' ? 'In Progress' : 'Planned' },
        date4: activity.planned_date ? { date: activity.planned_date } : null,
        date0: activity.actual_date ? { date: activity.actual_date } : null,
        text: `Location: ${activity.location || 'N/A'}\nTeam: ${activity.team || 'N/A'}\nFindings: ${activity.findings || 'N/A'}\nOutputs: ${activity.outputs || 'N/A'}`
      };

      try {
        const existing = await this.findItemByName(name);
        if (existing) {
          await this.updateItem(existing.id, columnValues);
          results.push({ id: activity.id, action: 'updated', mondayId: existing.id });
        } else {
          const created = await this.createItem(name, columnValues);
          results.push({ id: activity.id, action: 'created', mondayId: created.id });
        }
      } catch (error) {
        console.error('[Monday] activity sync failed', activity.id, error.message || error);
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

  async getBoardInfo() {
    const query = `query { boards(ids: ${this.boardId}) { name description columns { id title type } groups { id title } } }`;
    return await this.request(query);
  }
}

module.exports = new MondayService();