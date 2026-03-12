# Command Center — Exam Productivity System

A personal productivity system for exam preparation with Pomodoro timers, task management, and progress tracking.

## Features

- **3-Layer Task System**: Backlog → Daily Checklist → Dashboard
- **Weighted Progress Tracking**: Topics weighted by importance (1-3 scale)
- **Pomodoro Timer**: Focus sessions with break management
- **7-Day Heatmap**: Visual discipline tracking
- **File-Based Storage**: All data in `data.json` (easy backup, version control)
- **No Build Step**: Plain HTML/CSS/JS

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```

### 3. Open the App
Navigate to: **http://localhost:3000/pages/index.html**

## Setting Up Your Exams

**Quick Start**: Copy `data.example.json` to `data.json` and modify it with your exams and topics.

### Step 1: Add Your Exams

Open `data.json` and add your exams to the `exams` array:

```json
"exams": [
  {
    "id": "ex-math",
    "name": "Calculus II",
    "date": "2026-04-15",
    "color": "#2d6e4f"
  },
  {
    "id": "ex-physics",
    "name": "Physics",
    "date": "2026-04-18",
    "color": "#c4622d"
  }
]
```

**Fields:**
- `id`: Unique identifier (use format: `ex-shortname`)
- `name`: Full exam name
- `date`: Exam date (YYYY-MM-DD format)
- `color`: Hex color for visual identification

**Suggested colors:**
- Green: `#2d6e4f`
- Orange: `#c4622d`
- Purple: `#6b3fa0`
- Blue: `#2563eb`
- Red: `#dc2626`

### Step 2: Add Topics for Each Exam

Add topics to the `topics` array:

```json
"topics": [
  {
    "id": "m1",
    "examId": "ex-math",
    "name": "Integration Techniques",
    "status": "todo",
    "imp": 3
  },
  {
    "id": "m2",
    "examId": "ex-math",
    "name": "Series Convergence",
    "status": "todo",
    "imp": 2
  },
  {
    "id": "p1",
    "examId": "ex-physics",
    "name": "Electromagnetism",
    "status": "todo",
    "imp": 3
  }
]
```

**Fields:**
- `id`: Unique identifier (use prefix matching exam, e.g., `m1`, `m2` for math)
- `examId`: Must match an exam's `id` field
- `name`: Topic name
- `status`: `"todo"`, `"doing"`, or `"done"`
- `imp`: Importance level (see below)

### Understanding Importance Levels

The `imp` field determines how much weight a topic has in your progress calculation:

- **`imp: 3`** — Critical topic (exam-heavy, difficult, or high-weight)
  - Worth 3× in progress calculations
  - Use for: Core concepts, frequently tested material, difficult topics

- **`imp: 2`** — Important topic (standard coverage)
  - Worth 2× in progress calculations
  - Use for: Regular topics, moderate difficulty

- **`imp: 1`** — Minor topic (light coverage or easy)
  - Worth 1× in progress calculations
  - Use for: Review topics, easy concepts, supplementary material

**Example Strategy:**
```json
{
  "name": "SQL Queries",
  "imp": 3    // Critical - appears in every exam
},
{
  "name": "ER Diagrams",
  "imp": 2    // Important - standard topic
},
{
  "name": "Graph Databases",
  "imp": 1    // Minor - only 1 question usually
}
```

**Progress Calculation:**
- If you complete a topic with `imp: 3`, you gain 3 points
- If you complete a topic with `imp: 1`, you gain 1 point
- Total progress = (completed points / total possible points) × 100%

This ensures critical topics have more impact on your overall progress.

### Step 3: Restart the Server

After editing `data.json`:
```bash
# Stop server: Ctrl+C
npm start
```

Your exams and topics will now appear in the dashboard.

## Project Structure

```
├── backend/
│   ├── server.js           # Express server
│   ├── routes/api.js       # API endpoints
│   └── models/database.js  # Data persistence
├── frontend/
│   ├── pages/              # HTML pages
│   │   ├── index.html      # Dashboard
│   │   ├── backlog.html    # Master task list
│   │   ├── checklist.html  # Daily checklist
│   │   ├── timers.html     # Pomodoro + break timer
│   │   ├── watchlater.html # Video queue
│   │   └── battlelog.html  # Daily journal
│   └── src/
│       ├── js/             # JavaScript modules
│       └── css/style.css   # Design system
├── data.json               # YOUR DATA (auto-created)
└── package.json
```

## How to Use

### Dashboard (index.html)
- View all exams with countdown timers
- See weighted progress by exam
- Quick access to today's checklist
- Track study minutes and Pomodoro sessions

### Backlog (backlog.html)
- Master list of all tasks
- Pin tasks to daily checklist
- Filter by exam or status
- Add new tasks with importance levels

### Daily Checklist (checklist.html)
- Today's pinned tasks
- Ramadan rituals tracker (Fajr, Dhikr, Taraweh, etc.)
- Check off completed items
- Resets daily

### Timers (timers.html)
- **Pomodoro Timer**: 25/30/45/50 minute focus sessions
- **Break Timer**: 10/15/20 minute rest periods
- Space bar to start/pause Pomodoro
- Tracks study minutes and completed sessions
- 7-day heatmap visualization

### Watch Later (watchlater.html)
- Queue educational videos
- Track watch time
- Manage video backlog

### Battle Log (battlelog.html)
- Daily journal entries
- Reflect on progress and challenges

## Keyboard Shortcuts

- **Space bar** (on Timers page): Start/pause Pomodoro timer

## Data Backup

Your data is stored in `data.json`. To backup:

```bash
# Create backup
cp data.json data-backup-$(date +%Y%m%d).json

# Restore from backup
cp data-backup-20260312.json data.json
```

## Customization

### Change Study Goal
Edit `data.json`:
```json
"studyGoal": 240  // Change from 180 to 240 minutes
```

### Change Break Allowance
```json
"ytAllowance": 45  // Change from 30 to 45 minutes
```

## Tech Stack

- **Backend**: Node.js + Express
- **Frontend**: Vanilla JavaScript (no frameworks)
- **Storage**: JSON file
- **Styling**: Custom CSS with CSS variables

## License

MIT License - Feel free to use and modify for your own exam prep.

---

Built for focused exam preparation.
