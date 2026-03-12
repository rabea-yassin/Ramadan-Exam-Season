const fs = require('fs');
const path = require('path');

const DATA_FILE = path.resolve(__dirname, '..', '..', 'data.json');

const DEFAULT_DATA = {
  streak: 0,
  lastDate: null,
  studyMins: 0,
  ytMins: 0,
  pomsToday: 0,
  weekData: {},
  studyGoal: 180,
  ytAllowance: 30,
  timerState: null,
  exams: [
    { id: 'ex-net', name: 'Computer Networks', date: '2026-03-19', color: '#2d6e4f' },
    { id: 'ex-db', name: 'Databases', date: '2026-03-19', color: '#c4622d' },
    { id: 'ex-arch', name: 'Computer Architecture', date: '2026-03-19', color: '#6b3fa0' }
  ],
  topics: [
    { id: 'n1', examId: 'ex-net', name: 'Layering Model & TCP/IP', status: 'todo', imp: 2 },
    { id: 'n2', examId: 'ex-net', name: 'Local Area Networks (LAN)', status: 'todo', imp: 1 },
    { id: 'n3', examId: 'ex-net', name: 'IP Addressing (Part 1)', status: 'todo', imp: 2 },
    { id: 'n4', examId: 'ex-net', name: 'IP Addressing (Part 2)', status: 'todo', imp: 2 },
    { id: 'n5', examId: 'ex-net', name: 'ARQ Protocols', status: 'todo', imp: 1 },
    { id: 'n6', examId: 'ex-net', name: 'Transport Protocols', status: 'todo', imp: 2 },
    { id: 'n7', examId: 'ex-net', name: 'Switch & Router Architecture', status: 'todo', imp: 1 },
    { id: 'n8', examId: 'ex-net', name: 'Queueing Theory', status: 'todo', imp: 1 },
    { id: 'n9', examId: 'ex-net', name: 'Medium Access Control (MAC)', status: 'todo', imp: 2 },
    { id: 'n10', examId: 'ex-net', name: 'WiFi & Mobile Networks (Part 1)', status: 'todo', imp: 2 },
    { id: 'n11', examId: 'ex-net', name: 'WiFi & Mobile Networks (Part 2)', status: 'todo', imp: 2 },
    { id: 'n12', examId: 'ex-net', name: 'Error Detection & Correction', status: 'todo', imp: 1 },
    { id: 'd1', examId: 'ex-db', name: 'Relational Model', status: 'todo', imp: 2 },
    { id: 'd2', examId: 'ex-db', name: 'SQL Queries', status: 'todo', imp: 3 },
    { id: 'd3', examId: 'ex-db', name: 'Relational Algebra', status: 'todo', imp: 2 },
    { id: 'd4', examId: 'ex-db', name: 'First-Order Logic & Relational Calculus', status: 'todo', imp: 1 },
    { id: 'd5', examId: 'ex-db', name: 'ER Diagrams (ERD)', status: 'todo', imp: 2 },
    { id: 'd6', examId: 'ex-db', name: 'Functional Dependencies', status: 'todo', imp: 2 },
    { id: 'd7', examId: 'ex-db', name: 'Schema Decomposition', status: 'todo', imp: 2 },
    { id: 'd8', examId: 'ex-db', name: 'Normal Forms (1NF–3NF/BCNF)', status: 'todo', imp: 3 },
    { id: 'd9', examId: 'ex-db', name: 'Query Execution & Optimization', status: 'todo', imp: 2 },
    { id: 'd10', examId: 'ex-db', name: 'Concurrent Transactions & ACID', status: 'todo', imp: 3 },
    { id: 'd11', examId: 'ex-db', name: 'Non-Relational / Hierarchical Models', status: 'todo', imp: 1 },
    { id: 'd12', examId: 'ex-db', name: 'Graph Databases', status: 'todo', imp: 1 },
    { id: 'd13', examId: 'ex-db', name: 'NoSQL & RDF', status: 'todo', imp: 1 },
    { id: 'a1', examId: 'ex-arch', name: 'Performance & Instruction Sets (RISC vs CISC)', status: 'todo', imp: 2 },
    { id: 'a2', examId: 'ex-arch', name: 'Pipeline & Hazards', status: 'todo', imp: 3 },
    { id: 'a3', examId: 'ex-arch', name: 'Branch Prediction', status: 'todo', imp: 2 },
    { id: 'a4', examId: 'ex-arch', name: 'Out-of-Order Execution', status: 'todo', imp: 2 },
    { id: 'a5', examId: 'ex-arch', name: 'Memory Hierarchy', status: 'todo', imp: 2 },
    { id: 'a6', examId: 'ex-arch', name: 'Cache & Cache Coherency', status: 'todo', imp: 3 },
    { id: 'a7', examId: 'ex-arch', name: 'Main Memory', status: 'todo', imp: 1 },
    { id: 'a8', examId: 'ex-arch', name: 'Virtual Memory', status: 'todo', imp: 2 },
    { id: 'a9', examId: 'ex-arch', name: 'Performance Monitoring', status: 'todo', imp: 1 },
    { id: 'a10', examId: 'ex-arch', name: 'Multi-threading', status: 'todo', imp: 2 },
    { id: 'a11', examId: 'ex-arch', name: 'Side Channel Attacks', status: 'todo', imp: 1 },
    { id: 'a12', examId: 'ex-arch', name: 'System & Compute Schemes', status: 'todo', imp: 2 },
    { id: 'a13', examId: 'ex-arch', name: 'Power Considerations', status: 'todo', imp: 1 }
  ],
  tasks: [],
  pinnedToChecklist: [],
  checklist: {},
  videos: [],
  battleLog: {}
};

class Database {
  constructor() {
    this.init();
  }

  init() {
    if (!fs.existsSync(DATA_FILE)) {
      this.save(DEFAULT_DATA);
      console.log('✓ Created data.json with default data');
    }
  }

  read() {
    try {
      console.log('[DB] Reading from:', DATA_FILE);
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      console.log('[DB] File read, size:', data.length, 'bytes');
      return JSON.parse(data);
    } catch (error) {
      console.error('[DB] Error reading data:', error);
      throw new Error('Failed to read data');
    }
  }

  save(data) {
    try {
      console.log('[DB] Saving to:', DATA_FILE);
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
      console.log('[DB] Data saved successfully');
      return true;
    } catch (error) {
      console.error('[DB] Error saving data:', error);
      throw new Error('Failed to save data');
    }
  }
}

module.exports = new Database();
