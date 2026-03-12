# Git Workflow Guide

A practical guide for professional Git usage, from basics to advanced workflows.

---

## Table of Contents

1. [Basic Git Commands](#basic-git-commands)
2. [Branching Strategy](#branching-strategy)
3. [Commit Message Conventions](#commit-message-conventions)
4. [Feature Development Workflow](#feature-development-workflow)
5. [Merging Strategies](#merging-strategies)
6. [Advanced Git Operations](#advanced-git-operations)
7. [Best Practices](#best-practices)
8. [Common Scenarios](#common-scenarios)

---

## Basic Git Commands

### Initial Setup
```bash
# Configure your identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Check configuration
git config --list
```

### Daily Commands
```bash
# Check status
git status

# View changes
git diff                    # Unstaged changes
git diff --staged           # Staged changes
git diff branch1..branch2   # Compare branches

# Stage changes
git add <file>              # Stage specific file
git add .                   # Stage all changes
git add -p                  # Stage interactively (patch mode)

# Commit changes
git commit -m "message"
git commit -am "message"    # Stage and commit tracked files

# View history
git log
git log --oneline           # Compact view
git log --graph --oneline   # Visual branch history
git log -p                  # Show diffs in log

# Push/Pull
git push origin <branch>
git pull origin <branch>
```

---

## Branching Strategy

### Branch Types

**Main Branches:**
- `main` — Production-ready code
- `develop` — Integration branch for features (optional for solo projects)

**Supporting Branches:**
- `feature/*` — New features
- `bugfix/*` — Bug fixes
- `hotfix/*` — Urgent production fixes
- `refactor/*` — Code refactoring
- `docs/*` — Documentation updates
- `test/*` — Test additions/improvements

### Branch Commands
```bash
# Create and switch to new branch
git checkout -b feature/timer-sound-alerts

# Switch branches
git checkout main
git switch main             # Modern alternative

# List branches
git branch                  # Local branches
git branch -a               # All branches (local + remote)
git branch -v               # With last commit info

# Delete branch
git branch -d feature/old-feature    # Safe delete (merged only)
git branch -D feature/old-feature    # Force delete

# Rename branch
git branch -m old-name new-name
```

### Branch Naming Convention
```
<type>/<short-description>

Examples:
feature/pomodoro-sound-alerts
feature/exam-statistics-page
bugfix/timer-reset-issue
hotfix/data-corruption-fix
refactor/api-endpoints
docs/setup-instructions
test/timer-unit-tests
```

---

## Commit Message Conventions

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat` — New feature
- `fix` — Bug fix
- `docs` — Documentation changes
- `style` — Code style (formatting, no logic change)
- `refactor` — Code refactoring
- `perf` — Performance improvements
- `test` — Adding/updating tests
- `chore` — Maintenance tasks (dependencies, config)
- `build` — Build system changes
- `ci` — CI/CD changes

### Examples

**Simple commits:**
```bash
git commit -m "feat(timer): add sound alerts for Pomodoro completion"
git commit -m "fix(dashboard): correct progress calculation for weighted topics"
git commit -m "docs(readme): add Git workflow guide"
git commit -m "style(css): improve button hover states"
git commit -m "refactor(api): simplify data fetching logic"
```

**Detailed commits:**
```bash
git commit -m "feat(heatmap): add 7-day study streak visualization

- Add heatmap component to timers page
- Calculate daily study minutes from Pomodoro sessions
- Color-code cells based on study intensity
- Store heatmap data in data.json

Closes #12"
```

**Breaking changes:**
```bash
git commit -m "feat(api): restructure data.json format

BREAKING CHANGE: data.json structure has changed.
Users must migrate existing data using the migration script.

- Separate exams and topics into distinct arrays
- Add importance weighting system
- Update API endpoints to match new structure"
```

### Scope Examples
- `timer`, `dashboard`, `backlog`, `checklist`
- `api`, `database`, `server`
- `css`, `ui`, `layout`
- `readme`, `docs`, `guide`

---

## Feature Development Workflow

### Standard Feature Flow

```bash
# 1. Start from updated main
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/exam-statistics

# 3. Work on feature (make changes)
# ... edit files ...

# 4. Stage and commit regularly
git add .
git commit -m "feat(stats): add exam statistics page structure"

# ... more work ...
git commit -m "feat(stats): implement progress charts"

# 5. Keep branch updated with main (optional but recommended)
git checkout main
git pull origin main
git checkout feature/exam-statistics
git merge main              # Or use rebase (see below)

# 6. Push feature branch
git push origin feature/exam-statistics

# 7. Merge back to main when complete
git checkout main
git merge feature/exam-statistics

# 8. Push main and delete feature branch
git push origin main
git branch -d feature/exam-statistics
git push origin --delete feature/exam-statistics
```

---

## Merging Strategies

### 1. Merge (Default)
Creates a merge commit, preserves full history.

```bash
git checkout main
git merge feature/new-feature
```

**When to use:** Most cases, especially for completed features.

### 2. Fast-Forward Merge
No merge commit if possible (linear history).

```bash
git merge --ff-only feature/new-feature
```

**When to use:** When feature branch is directly ahead of main.

### 3. Squash Merge
Combines all feature commits into one.

```bash
git merge --squash feature/new-feature
git commit -m "feat(timer): add sound alerts and custom durations"
```

**When to use:** When feature has many small commits you want to consolidate.

### 4. Rebase
Replays commits on top of another branch (rewrites history).

```bash
git checkout feature/new-feature
git rebase main
```

**When to use:** To keep feature branch updated with main, creating linear history.

**⚠️ Warning:** Never rebase public/shared branches!

---

## Advanced Git Operations

### Stashing
Save work-in-progress without committing.

```bash
# Save current changes
git stash
git stash save "WIP: timer refactoring"

# List stashes
git stash list

# Apply stash
git stash apply             # Keep stash
git stash pop               # Apply and remove stash

# Apply specific stash
git stash apply stash@{1}

# Delete stash
git stash drop stash@{0}
git stash clear             # Delete all stashes
```

### Cherry-Pick
Apply specific commits from another branch.

```bash
# Pick single commit
git cherry-pick <commit-hash>

# Pick multiple commits
git cherry-pick <hash1> <hash2>

# Pick range
git cherry-pick <start-hash>..<end-hash>
```

### Reset
Move branch pointer and optionally modify working directory.

```bash
# Undo last commit, keep changes staged
git reset --soft HEAD~1

# Undo last commit, keep changes unstaged
git reset HEAD~1
git reset --mixed HEAD~1    # Same as above (default)

# Undo last commit, discard changes
git reset --hard HEAD~1

# Reset to specific commit
git reset --hard <commit-hash>
```

### Revert
Create new commit that undoes previous commit (safe for public branches).

```bash
# Revert last commit
git revert HEAD

# Revert specific commit
git revert <commit-hash>

# Revert without committing (stage changes only)
git revert -n <commit-hash>
```

### Interactive Rebase
Edit commit history (reorder, squash, edit messages).

```bash
# Rebase last 3 commits
git rebase -i HEAD~3

# Commands in interactive mode:
# pick   — keep commit
# reword — change commit message
# edit   — pause to amend commit
# squash — combine with previous commit
# drop   — remove commit
```

### Reflog
View history of HEAD movements (recover lost commits).

```bash
# View reflog
git reflog

# Recover lost commit
git checkout <commit-hash>
git branch recovery-branch <commit-hash>
```

---

## Best Practices

### Commit Frequency
- ✅ Commit often (logical units of work)
- ✅ Each commit should be functional (builds/runs)
- ❌ Don't commit broken code
- ❌ Don't commit unrelated changes together

### Branch Management
- ✅ Create branch for each feature/fix
- ✅ Keep branches short-lived (merge within days)
- ✅ Delete merged branches
- ❌ Don't work directly on main
- ❌ Don't let branches diverge too far from main

### Commit Messages
- ✅ Use present tense ("add feature" not "added feature")
- ✅ Be descriptive but concise
- ✅ Reference issues/tickets when applicable
- ❌ Don't use vague messages ("fix stuff", "updates")

### Code Review (for team projects)
- ✅ Review your own diff before pushing
- ✅ Keep pull requests focused and small
- ✅ Respond to feedback constructively

### Safety
- ✅ Pull before push
- ✅ Test before merging to main
- ✅ Use `--dry-run` flag when unsure
- ❌ Don't force push to shared branches
- ❌ Don't rewrite public history

---

## Common Scenarios

### Scenario 1: Undo Last Commit (Not Pushed)
```bash
# Keep changes, undo commit
git reset --soft HEAD~1

# Discard changes and commit
git reset --hard HEAD~1
```

### Scenario 2: Fix Last Commit Message
```bash
git commit --amend -m "corrected message"
```

### Scenario 3: Add Forgotten Files to Last Commit
```bash
git add forgotten-file.js
git commit --amend --no-edit
```

### Scenario 4: Discard Local Changes
```bash
# Discard changes in specific file
git checkout -- <file>
git restore <file>          # Modern alternative

# Discard all local changes
git reset --hard HEAD
```

### Scenario 5: Resolve Merge Conflicts
```bash
# After merge conflict occurs:
# 1. Open conflicted files and resolve markers:
#    <<<<<<< HEAD
#    your changes
#    =======
#    their changes
#    >>>>>>> branch-name

# 2. Stage resolved files
git add <resolved-file>

# 3. Complete merge
git commit
```

### Scenario 6: Work on Wrong Branch
```bash
# Move uncommitted changes to new branch
git stash
git checkout correct-branch
git stash pop

# Move committed changes to new branch
git checkout -b correct-branch
git checkout wrong-branch
git reset --hard HEAD~1     # Remove commit from wrong branch
```

### Scenario 7: Update Feature Branch with Main
```bash
# Option 1: Merge (preserves history)
git checkout feature/my-feature
git merge main

# Option 2: Rebase (cleaner history)
git checkout feature/my-feature
git rebase main
```

### Scenario 8: Recover Deleted Branch
```bash
# Find commit hash
git reflog

# Recreate branch
git branch recovered-branch <commit-hash>
```

---

## Quick Reference

### Daily Workflow
```bash
git checkout main
git pull
git checkout -b feature/new-feature
# ... make changes ...
git add .
git commit -m "feat(scope): description"
git push origin feature/new-feature
git checkout main
git merge feature/new-feature
git push origin main
git branch -d feature/new-feature
```

### Emergency Fixes
```bash
git checkout main
git checkout -b hotfix/critical-bug
# ... fix bug ...
git commit -am "fix(critical): resolve data loss issue"
git checkout main
git merge hotfix/critical-bug
git push origin main
git branch -d hotfix/critical-bug
```

---

## Resources

- [Official Git Documentation](https://git-scm.com/doc)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Flight Rules](https://github.com/k88hudson/git-flight-rules) — What to do when things go wrong
- [Oh Shit, Git!?!](https://ohshitgit.com/) — Plain English Git error recovery

---

**Remember:** Git is a safety net. Commit often, branch freely, and don't be afraid to experiment!
