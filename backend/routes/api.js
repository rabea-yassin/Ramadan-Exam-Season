const express = require('express');
const router = express.Router();
const db = require('../models/database');

// GET /api/data - Read all data
router.get('/data', (req, res) => {
  try {
    console.log('[API] GET /api/data - Reading data');
    const data = db.read();
    console.log('[API] Data read successfully');
    res.json(data);
  } catch (error) {
    console.error('[API] Error reading data:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/data - Save all data
router.post('/data', (req, res) => {
  try {
    console.log('[API] POST /api/data - Saving data');
    console.log('[API] Data keys:', Object.keys(req.body));
    db.save(req.body);
    console.log('[API] Data saved successfully');
    res.json({ success: true });
  } catch (error) {
    console.error('[API] Error saving data:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
