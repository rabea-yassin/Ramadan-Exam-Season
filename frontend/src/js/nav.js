// ─────────────────────────────────────────────
//  nav.js  —  shared sidebar + toast + modals
//  Usage: Nav.init('pageid')  — call after DB is loaded
// ─────────────────────────────────────────────

window.Nav = {
  async init(activeId) {
    await DB.load();
    this._buildSidebar(activeId);
    this._ensureToast();
  },

  _buildSidebar(activeId) {
    const el = document.getElementById('sidebar');
    if (!el) return;

    const upcoming = DB.upcomingExams(2);
    const streak   = DB.get('streak') || 0;

    const examsHTML = upcoming.length
      ? upcoming.map(e => {
          const left = DB.daysUntil(e.date);
          const label = left === null ? '?' : left > 1 ? left+'d' : left === 1 ? '1d' : 'today!';
          const urgent = left !== null && left <= 3;
          return `<div class="sb-exam-row">
            <span class="sb-exam-dot" style="background:${e.color}"></span>
            <span class="sb-exam-name">${e.name}</span>
            <span class="sb-exam-days" style="${urgent?'color:var(--red)':''}">${label}</span>
          </div>`;
        }).join('')
      : `<div style="font-size:11px;color:#3a3830;font-style:italic">No exams set</div>`;

    const pages = [
      { id:'index',      icon:'◈', label:'Dashboard'      },
      { id:'backlog',    icon:'◑', label:'Backlog'         },
      { id:'checklist',  icon:'◻', label:'Daily Checklist' },
      { id:'timers',     icon:'◷', label:'Timers'          },
      { id:'watchlater', icon:'▷', label:'Watch Later'     },
      { id:'battlelog',  icon:'✎', label:'Battle Log'      },
    ];

    el.innerHTML = `
      <button class="sb-toggle" onclick="Nav.toggleSidebar()" title="Toggle sidebar">☰</button>
      <div class="sb-brand">
        <h1>Command<br>Center</h1>
        <p>Ramadan · Exam Season</p>
      </div>
      <div class="sb-exams">${examsHTML}</div>
      <div class="sb-streak">
        <div class="sb-streak-num">${streak}</div>
        <div class="sb-streak-info">day streak<br><span style="color:#2a2820">keep going</span></div>
      </div>
      <nav>
        ${pages.map(p => `
          <div class="nav-item ${p.id===activeId?'active':''}" onclick="location.href='${p.id}.html'">
            <span class="nav-icon">${p.icon}</span><span class="nav-label">${p.label}</span>
          </div>`).join('')}
      </nav>
      <div class="sb-footer">You don't have to be okay.<br>Just do the next small thing.</div>
    `;
  },

  toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
  },

  _ensureToast() {
    if (document.getElementById('toast')) return;
    const t = document.createElement('div');
    t.id = 'toast'; t.className = 'toast';
    t.innerHTML = '<b id="t-title"></b><small id="t-sub"></small>';
    document.body.appendChild(t);
  },
};

// ── Global helpers ────────────────────────────
let _tt;
window.toast = function(title, sub) {
  document.getElementById('t-title').textContent = title || '';
  document.getElementById('t-sub').textContent   = sub   || '';
  const el = document.getElementById('toast');
  el.classList.add('show');
  clearTimeout(_tt);
  _tt = setTimeout(() => el.classList.remove('show'), 4200);
};

window.openModal  = id => document.getElementById(id)?.classList.add('show');
window.closeModal = id => document.getElementById(id)?.classList.remove('show');
