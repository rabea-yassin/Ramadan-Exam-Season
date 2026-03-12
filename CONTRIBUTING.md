# Contributor Guide

## Development Setup

1. Clone the repository
2. Run `npm install`
3. Run `npm start`
4. Open `http://localhost:3000/pages/index.html`

## Architecture

### Backend (Node.js + Express)

- **server.js**: Entry point, serves static files
- **routes/api.js**: RESTful API endpoints
- **models/database.js**: File-based data persistence

### Frontend (Vanilla JS)

- **db.js**: API client for backend communication
- **nav.js**: Shared navigation component
- **style.css**: Design system with CSS variables

### Data Model

All data stored in `data.json`:

```javascript
{
  // Streak tracking
  streak: number,
  lastDate: string,
  
  // Daily metrics
  studyMins: number,
  ytMins: number,
  pomsToday: number,
  weekData: { [date: string]: number },
  
  // Goals
  studyGoal: number,
  ytAllowance: number,
  
  // Core data
  exams: Exam[],
  topics: Topic[],
  tasks: Task[],
  pinnedToChecklist: string[],
  checklist: { [date: string]: { [id: string]: boolean } },
  videos: Video[],
  battleLog: { [date: string]: string }
}
```

## API Endpoints

### GET /api/data
Returns entire data object.

### POST /api/data
Updates data. Expects:
```json
{
  "key": "studyMins",
  "value": 120
}
```

## Adding New Features

### 1. Add Backend Endpoint (if needed)

Edit `backend/routes/api.js`:
```javascript
router.post('/api/custom-endpoint', (req, res) => {
  // Your logic
  res.json({ success: true });
});
```

### 2. Add Frontend Logic

Create new file in `frontend/src/js/` or add to existing page.

### 3. Update Data Model

If adding new data fields, update `data.json` structure and document in this guide.

## Code Style

- Use semicolons
- 2-space indentation
- Descriptive variable names
- Comments for complex logic
- Keep functions small and focused

## Testing

Test server connection:
```bash
npm start
# Open: http://localhost:3000/test.html
```

Test data persistence:
1. Make changes in UI
2. Check `data.json` file
3. Restart server
4. Verify data persists

## Design Philosophy

- **Minimal dependencies**: Vanilla JS, no frameworks
- **File-based storage**: Easy backup and version control
- **No build step**: Direct HTML/CSS/JS
- **Keyboard-first**: Space bar shortcuts
- **Visual clarity**: High contrast, clear hierarchy

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Questions?

Open an issue on GitHub.
