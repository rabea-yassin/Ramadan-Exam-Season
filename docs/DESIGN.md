# Design Philosophy

This document explains the design decisions behind Command Center's visual system and user experience.

---

## Design Principles

### 1. Cognitive Clarity
- **No overwhelming lists**: Every screen is designed to minimize cognitive load
- **Clear hierarchy**: Important information stands out immediately
- **Focused views**: Each page has one primary purpose

### 2. Warmth Over Sterility
- This is a personal productivity tool, not corporate software
- Warm color palette reduces eye strain during long study sessions
- Friendly, encouraging tone in UI copy

### 3. Intentional Friction
- Some actions require confirmation (deleting tasks, resetting timers)
- Prevents accidental data loss
- Encourages mindful interaction

---

## Visual Design System

All design tokens are CSS custom properties in `src/css/style.css`. Never hardcode colors or spacing.

### Color Palette

| Variable        | Value       | Usage |
|-----------------|-------------|-------|
| `--bg`          | `#f5f2eb`   | Page background — warm off-white |
| `--surface`     | `#faf8f4`   | Card backgrounds |
| `--s2`          | `#f0ece3`   | Hover states, secondary surfaces |
| `--border`      | `#e0dbd0`   | All borders |
| `--text`        | `#1a1712`   | Primary text |
| `--t2`          | `#4a4540`   | Secondary text |
| `--t3`          | `#8a8278`   | Muted / metadata text |
| `--dark`        | `#1a1712`   | Dark elements (sidebar) |
| `--green`       | `#2d6e4f`   | Study / progress / success |
| `--orange`      | `#c4622d`   | Breaks / warnings |
| `--gold`        | `#c9963a`   | Important markers |
| `--blue`        | `#3b6ea8`   | Low importance |
| `--red`         | `#b83232`   | Danger / delete |

**Why warm tones?** Reduces eye strain during evening study sessions. Creates a calmer, more focused environment.

### Typography

- **Headings**: DM Serif Display (elegant, readable)
- **Body**: DM Sans (clean, modern)
- **Code/Data**: DM Mono (technical elements, timers)

### Spacing Scale

```css
--sp1: 4px;   /* Tight spacing */
--sp2: 8px;   /* Default gap */
--sp3: 12px;  /* Card padding */
--sp4: 16px;  /* Section spacing */
--sp5: 24px;  /* Large gaps */
```

---

## Component Design

### Cards
- Rounded corners (8px)
- Subtle shadows for depth
- Hover states for interactive elements
- Clear visual hierarchy

### Buttons
- Primary: Filled with color
- Secondary: Ghost (border only)
- Danger: Red for destructive actions
- Disabled: Reduced opacity

### Progress Bars
- Smooth animations
- Color-coded by context (green for study, orange for breaks)
- Percentage displayed when relevant

### Timers
- Large, readable display
- Color changes when time is low (warning state)
- Clear start/pause/reset controls

---

## UX Patterns

### Navigation
- Persistent sidebar on desktop
- Current page highlighted
- Icons + labels for clarity

### Feedback
- Toast notifications for actions
- Loading states for async operations
- Error messages are helpful, not technical

### Data Entry
- Minimal required fields
- Inline validation
- Clear placeholder text

### Keyboard Shortcuts
- Space bar: Start/pause Pomodoro
- More shortcuts can be added as needed

---

## Accessibility

- High contrast ratios (WCAG AA compliant)
- Focus indicators on interactive elements
- Semantic HTML structure
- Keyboard navigation support

---

## Performance

- No framework overhead (vanilla JS)
- Minimal dependencies
- Fast page loads
- Efficient DOM updates

---

## Future Considerations

When adding new features:
1. Does it add cognitive load?
2. Does it fit the warm, focused aesthetic?
3. Is it keyboard-accessible?
4. Does it work without JavaScript (progressive enhancement)?
5. Is the data model clean and maintainable?

---

**Remember**: Every design decision should serve the user's focus and reduce friction in their study workflow.
