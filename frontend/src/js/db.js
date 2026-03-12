// ─────────────────────────────────────────────
//  db.js  —  API client for server-based storage
//  All data lives in data.json on the server
// ─────────────────────────────────────────────

const API_URL = 'http://localhost:3000/api/data';

window.DB = {
  _d: null,
  _loaded: false,

  // Load data from server
  async load() {
    if (this._loaded && this._d !== null) {
      console.log('[DB] Already loaded');
      return this;
    }

    console.log('[DB] Loading from server...');
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch data');
      this._d = await response.json();
      console.log('[DB] Loaded from server');
      this._dailyReset();
      this._loaded = true;
    } catch (error) {
      console.error('[DB] Load error:', error);
      alert('Failed to connect to server. Make sure server is running: npm start');
    }
    return this;
  },

  // Save data to server
  async save() {
    if (!this._d) return;
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this._d)
      });
      if (!response.ok) throw new Error('Failed to save data');
      console.log('[DB] Saved to server');
    } catch (error) {
      console.error('[DB] Save error:', error);
    }
  },

  get(k) { return this._d?.[k]; },
  
  set(k, v) {
    if (!this._d) return;
    this._d[k] = v;
    this.save();
    console.log('[DB] Set', k);
  },
  
  update(k, fn) {
    if (!this._d) return;
    this._d[k] = fn(this._d[k]);
    this.save();
    console.log('[DB] Updated', k);
  },

  today() { return new Date().toISOString().slice(0, 10); },

  daysUntil(dateStr) {
    if (!dateStr) return null;
    return Math.ceil(
      (new Date(dateStr).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) / 86400000
    );
  },

  uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 5); },

  examProgress(examId) {
    const topics = this._d.topics.filter(t => t.examId === examId);
    if (!topics.length) return 0;
    const total = topics.reduce((s, t) => s + t.imp, 0);
    const earned = topics.reduce((s, t) => {
      if (t.status === 'done') return s + t.imp;
      if (t.status === 'inprogress') return s + t.imp * 0.5;
      return s;
    }, 0);
    return Math.round(earned / total * 100);
  },

  upcomingExams(n = 2) {
    return [...this._d.exams]
      .filter(e => e.date)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, n);
  },

  todayChecklist() {
    return this._d.checklist[this.today()] || {};
  },

  setChecklistItem(id, val) {
    const d = this.today();
    if (!this._d.checklist[d]) this._d.checklist[d] = {};
    this._d.checklist[d][id] = val;
    this.save();
  },

  disciplineScore() {
    const today = this.today();
    const last7Days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
      last7Days.push(d);
    }
    const vals = last7Days.map(d => this._d.weekData[d] || 0);
    const avg = vals.reduce((s, v) => s + v, 0) / 7;
    return Math.min(100, Math.round(avg / 4 * 100));
  },

  _dailyReset() {
    const today = this.today();
    if (this._d.lastDate === today) return;
    const yest = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    this._d.streak = this._d.lastDate === yest ? this._d.streak + 1 : 1;
    this._d.lastDate = today;
    this._d.studyMins = 0;
    this._d.ytMins = 0;
    this._d.pomsToday = 0;
    
    // Auto-unpin completed tasks and topics
    const topics = this._d.topics || [];
    const tasks = this._d.tasks || [];
    this._d.pinnedToChecklist = (this._d.pinnedToChecklist || []).filter(id => {
      const topic = topics.find(t => t.id === id);
      const task = tasks.find(t => t.id === id);
      // Keep if: topic not done, or task not done
      return (topic && topic.status !== 'done') || (task && !task.done);
    });
    
    this.save();
  }
};
