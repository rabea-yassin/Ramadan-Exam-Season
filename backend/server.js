const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = 3000;
const FRONTEND_DIR = path.resolve(__dirname, '..', 'frontend');

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

console.log('Frontend directory:', FRONTEND_DIR);
console.log('Directory exists:', require('fs').existsSync(FRONTEND_DIR));

app.use(express.static(FRONTEND_DIR));

// API Routes
app.use('/api', apiRoutes);

// Start server
const server = app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║   Command Center Server Running                          ║
║                                                          ║
║   → http://localhost:${PORT}                             ║
║   → Data file: data.json                                 ║
║   → Click http://localhost:${PORT}/pages/index.html      ║
║                                                          ║
║   Press Ctrl+C to stop                                   ║
╚══════════════════════════════════════════════════════════╝
  `);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
});
