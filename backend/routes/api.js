const express = require('express');
const router = express.Router();
const db = require('../models/database');

// Logging helper
function log(level, message, data = null) {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level}]`;
  
  if (data) {
    console.log(`${prefix} ${message}`, data);
  } else {
    console.log(`${prefix} ${message}`);
  }
}

// GET /api/data - Read all data
router.get('/data', (req, res) => {
  try {
    log('INFO', 'GET /api/data - Request received');
    const data = db.read();
    const dataSize = JSON.stringify(data).length;
    log('SUCCESS', `Data read successfully (${dataSize} bytes)`);
    res.json(data);
  } catch (error) {
    log('ERROR', 'Failed to read data', error.message);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/data - Save all data
router.post('/data', (req, res) => {
  try {
    const keys = Object.keys(req.body);
    const dataSize = JSON.stringify(req.body).length;
    log('INFO', `POST /api/data - Request received (${dataSize} bytes)`);
    log('INFO', `Data keys: ${keys.join(', ')}`);
    
    db.save(req.body);
    
    log('SUCCESS', 'Data saved successfully');
    res.json({ success: true });
  } catch (error) {
    log('ERROR', 'Failed to save data', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
