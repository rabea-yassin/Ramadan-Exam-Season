const fs = require('fs');
const path = require('path');

const DATA_FILE = path.resolve(__dirname, '..', 'data.json');

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
    { id: 'ex-math', name: 'Mathematics', date: '2026-04-15', color: '#2d6e4f' },
    { id: 'ex-physics', name: 'Physics', date: '2026-04-18', color: '#c4622d' }
  ],
  topics: [
    { id: 'm1', examId: 'ex-math', name: 'Calculus', status: 'todo', imp: 3 },
    { id: 'm2', examId: 'ex-math', name: 'Linear Algebra', status: 'todo', imp: 2 },
    { id: 'p1', examId: 'ex-physics', name: 'Mechanics', status: 'todo', imp: 3 },
    { id: 'p2', examId: 'ex-physics', name: 'Thermodynamics', status: 'todo', imp: 2 }
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
