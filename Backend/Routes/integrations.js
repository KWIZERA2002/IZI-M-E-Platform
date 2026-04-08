const express = require('express');
const router = express.Router();
const PowerBIService = require('../Services/PowerBIService');
const TolaDataService = require('../Services/TolaDataService');
const MondayService = require('../Services/MondayService');
const auth = require('../MIDDLEWARE/Auth');

router.use(auth);
router.use((req, res, next) => {
  console.log(`[Integrations] user=${req.user?.id || 'unknown'} ${req.method} ${req.originalUrl}`);
  next();
});

function buildResponse(success, message, data = null) {
  return { success, message, data };
}

router.post('/powerbi/indicators', async (req, res) => {
  try {
    const result = await PowerBIService.pushIndicatorsData();
    res.json(buildResponse(true, 'Indicators data pushed to PowerBI successfully', result));
  } catch (error) {
    console.error('[Integrations][PowerBI] indicators sync failed:', error);
    res.status(500).json(buildResponse(false, 'Failed to push indicators to PowerBI', { error: error.message }));
  }
});

router.post('/powerbi/dashboard', async (req, res) => {
  try {
    const result = await PowerBIService.pushDashboardData();
    res.json(buildResponse(true, 'Dashboard data pushed to PowerBI successfully', result));
  } catch (error) {
    console.error('[Integrations][PowerBI] dashboard sync failed:', error);
    res.status(500).json(buildResponse(false, 'Failed to push dashboard to PowerBI', { error: error.message }));
  }
});

router.post('/powerbi/dataset', async (req, res) => {
  try {
    const result = await PowerBIService.createDataset();
    res.json(buildResponse(true, 'PowerBI dataset created successfully', result));
  } catch (error) {
    console.error('[Integrations][PowerBI] dataset creation failed:', error);
    res.status(500).json(buildResponse(false, 'Failed to create PowerBI dataset', { error: error.message }));
  }
});

router.get('/powerbi/status', async (req, res) => {
  try {
    const result = await PowerBIService.getDatasetInfo();
    res.json(buildResponse(true, 'PowerBI dataset status retrieved', result));
  } catch (error) {
    console.error('[Integrations][PowerBI] status check failed:', error);
    res.status(500).json(buildResponse(false, 'Failed to get PowerBI status', { error: error.message }));
  }
});

router.post('/toladata/activities', async (req, res) => {
  try {
    const result = await TolaDataService.syncActivities();
    res.json(buildResponse(true, 'Activities synced with TolaData successfully', result));
  } catch (error) {
    console.error('[Integrations][TolaData] activities sync failed:', error);
    res.status(500).json(buildResponse(false, 'Failed to sync activities with TolaData', { error: error.message }));
  }
});

router.post('/toladata/logframe', async (req, res) => {
  try {
    const result = await TolaDataService.syncLogframe();
    res.json(buildResponse(true, 'Logframe synced with TolaData successfully', result));
  } catch (error) {
    console.error('[Integrations][TolaData] logframe sync failed:', error);
    res.status(500).json(buildResponse(false, 'Failed to sync logframe with TolaData', { error: error.message }));
  }
});

router.get('/toladata/projects', async (req, res) => {
  try {
    const result = await TolaDataService.getProjects();
    res.json(buildResponse(true, 'Projects retrieved from TolaData', result));
  } catch (error) {
    console.error('[Integrations][TolaData] projects fetch failed:', error);
    res.status(500).json(buildResponse(false, 'Failed to fetch projects from TolaData', { error: error.message }));
  }
});

router.post('/monday/tasks', async (req, res) => {
  try {
    const result = await MondayService.syncTasks();
    res.json(buildResponse(true, 'Tasks synced with Monday.com successfully', result));
  } catch (error) {
    console.error('[Integrations][Monday] tasks sync failed:', error);
    res.status(500).json(buildResponse(false, 'Failed to sync tasks with Monday.com', { error: error.message }));
  }
});

router.post('/monday/activities', async (req, res) => {
  try {
    const result = await MondayService.syncActivities();
    res.json(buildResponse(true, 'Activities synced with Monday.com successfully', result));
  } catch (error) {
    console.error('[Integrations][Monday] activities sync failed:', error);
    res.status(500).json(buildResponse(false, 'Failed to sync activities with Monday.com', { error: error.message }));
  }
});

router.get('/monday/board', async (req, res) => {
  try {
    const result = await MondayService.getBoardInfo();
    res.json(buildResponse(true, 'Monday.com board information retrieved', result));
  } catch (error) {
    console.error('[Integrations][Monday] board info fetch failed:', error);
    res.status(500).json(buildResponse(false, 'Failed to fetch board info from Monday.com', { error: error.message }));
  }
});

router.post('/sync/all', async (req, res) => {
  const results = {
    powerbi: { indicators: null, dashboard: null },
    toladata: { activities: null, logframe: null },
    monday: { tasks: null, activities: null }
  };

  try {
    try {
      results.powerbi.indicators = await PowerBIService.pushIndicatorsData();
      results.powerbi.dashboard = await PowerBIService.pushDashboardData();
    } catch (error) {
      console.error('[Integrations] PowerBI bulk sync failed:', error);
      results.powerbi.error = error.message;
    }

    try {
      results.toladata.activities = await TolaDataService.syncActivities();
      results.toladata.logframe = await TolaDataService.syncLogframe();
    } catch (error) {
      console.error('[Integrations] TolaData bulk sync failed:', error);
      results.toladata.error = error.message;
    }

    try {
      results.monday.tasks = await MondayService.syncTasks();
      results.monday.activities = await MondayService.syncActivities();
    } catch (error) {
      console.error('[Integrations] Monday.com bulk sync failed:', error);
      results.monday.error = error.message;
    }

    res.json({
      success: true,
      message: 'Bulk sync completed.',
      data: results
    });
  } catch (error) {
    console.error('[Integrations] bulk sync fatal error:', error);
    res.status(500).json(buildResponse(false, 'Bulk sync failed', { error: error.message, partialResults: results }));
  }
});

module.exports = router;