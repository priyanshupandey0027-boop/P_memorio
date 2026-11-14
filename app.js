/**
 * ==============================================================================
 * CHRONOS // NEXUS - QUANTUM SCHEDULE & DIRECTIVES MATRIX
 * Core Application Engine & Futuristic Interactive Controller
 * ==============================================================================
 */

// --- Initial Sample Data (Self-populating if local storage is empty) ---
const DEFAULT_MEETINGS = [
  {
    id: "meet-1",
    title: "Quantum Core Architecture Sync",
    date: getTodayDateString(0),
    startTime: "14:00",
    endTime: "15:00",
    category: "Architecture Review",
    platform: "Google Meet",
    link: "https://meet.google.com/qnt-arch-2026",
    attendees: ["Dr. Vance", "Jax", "Elena R."],
    desc: "Review distributed node scalability and resolve latency bottlenecks on sub-mesh 4."
  },
  {
    id: "meet-2",
    title: "Orbital Tactical Sprint Planning",
    date: getTodayDateString(0),
    startTime: "16:30",
    endTime: "17:15",
    category: "Tactical Sync",
    platform: "Hologram Comm Room",
    link: "https://meet.google.com/orb-tactical-09",
    attendees: ["Commander Shepard", "Aria T."],
    desc: "Sprint sprint goals for Phase 7 UI rollout and neural telemetry dashboard."
  },
  {
    id: "meet-3",
    title: "1-on-1 Neural Performance Pulse",
    date: getTodayDateString(1),
    startTime: "11:00",
    endTime: "11:45",
    category: "1-on-1 Pulse",
    platform: "Microsoft Teams",
    link: "https://teams.microsoft.com/l/meetup-join/1on1",
    attendees: ["Marcus Chen"],
    desc: "Bi-weekly career growth, focus calibration and workload distribution check-in."
  },
  {
    id: "meet-4",
    title: "AI Matrix Design Review",
    date: getTodayDateString(2),
    startTime: "15:00",
    endTime: "16:00",
    category: "Design Sprint",
    platform: "Zoom Telelink",
    link: "https://zoom.us/j/998124871",
    attendees: ["Sarah Connor", "K. Dick"],
    desc: "Refining holographic micro-interactions and high-contrast accessibility themes."
  }
];

const DEFAULT_TASKS = [
  {
    id: "task-1",
    title: "Calibrate primary quantum shielding matrix",
    priority: "critical",
    status: "in-progress",
    dueDate: getTodayDateString(0),
    tag: "Core Systems",
    subtasks: [
      { id: "st-1", text: "Verify harmonic oscillator values", completed: true },
      { id: "st-2", text: "Run deflection simulation across sector 7", completed: false },
      { id: "st-3", text: "Deploy firmware update v3.8.4", completed: false }
    ]
  },
  {
    id: "task-2",
    title: "Implement zero-latency WebAudio sound synthesizer",
    priority: "high",
    status: "done",
    dueDate: getTodayDateString(0),
    tag: "Audio Engine",
    subtasks: [
      { id: "st-4", text: "Synthesize pleasant harmonic chimes", completed: true },
      { id: "st-5", text: "Add fallback for muted states", completed: true }
    ]
  },
  {
    id: "task-3",
    title: "Deploy particle canvas background with starfield nodes",
    priority: "medium",
    status: "done",
    dueDate: getTodayDateString(0),
    tag: "Frontend HUD",
    subtasks: [
      { id: "st-6", text: "Handle viewport resize gracefully", completed: true }
    ]
  },
  {
    id: "task-4",
    title: "Draft architecture brief for telemetry microservices",
    priority: "high",
    status: "review",
    dueDate: getTodayDateString(1),
    tag: "Architecture",
    subtasks: [
      { id: "st-7", text: "Benchmarking RPC vs WebSocket transport", completed: true },
      { id: "st-8", text: "Peer review with Lead Architect", completed: false }
    ]
  },
  {
    id: "task-5",
    title: "Automate .ICS calendar export for all scheduled sessions",
    priority: "medium",
    status: "in-progress",
    dueDate: getTodayDateString(2),
    tag: "Integrations",
    subtasks: [
      { id: "st-9", text: "Validate UTC timestamp formatting", completed: true },
      { id: "st-10", text: "Test with Google and Outlook calendars", completed: false }
    ]
  },
  {
    id: "task-6",
    title: "Audit color contrast and a11y compliance on dark HUD",
    priority: "low",
    status: "backlog",
    dueDate: getTodayDateString(3),
    tag: "Design QA",
    subtasks: [
      { id: "st-11", text: "Inspect high-contrast ratios with DevTools", completed: false }
    ]
  }
];

// --- Utility: Date helper ---
function getTodayDateString(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split("T")[0];
}

// ==============================================================================
// APPLICATION STATE
// ==============================================================================
class ChronosState {
  constructor() {
    this.meetings = this.load("chronos_meetings", DEFAULT_MEETINGS);
    this.tasks = this.load("chronos_tasks", DEFAULT_TASKS);
    this.theme = localStorage.getItem("chronos_theme") || "cyan";
    this.sfxEnabled = localStorage.getItem("chronos_sfx") !== "false";
    this.activeView = "dashboard";
    this.taskViewMode = "kanban"; // 'kanban' or 'list'
    this.selectedCalDate = getTodayDateString(0);
    this.searchQuery = "";
  }

  load(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn("Storage load error:", e);
      return fallback;
    }
  }

  save() {
    localStorage.setItem("chronos_meetings", JSON.stringify(this.meetings));
    localStorage.setItem("chronos_tasks", JSON.stringify(this.tasks));
    localStorage.setItem("chronos_theme", this.theme);
    localStorage.setItem("chronos_sfx", this.sfxEnabled.toString());
  }

  resetDemoData() {
    this.meetings = JSON.parse(JSON.stringify(DEFAULT_MEETINGS));
    this.tasks = JSON.parse(JSON.stringify(DEFAULT_TASKS));
    this.save();
  }
}

const state = new ChronosState();

// ==============================================================================
// FUTURISTIC WEB AUDIO SYNTHESIZER (Pure JS, zero external sound assets)
// ==============================================================================
class CyberAudioSynth {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playClick() {
    if (!state.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {}
  }

  playSuccess() {
    if (!state.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.06, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.22);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.22);
      });
    } catch (e) {}
  }

  playModal() {
    if (!state.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.07, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch (e) {}
  }

  playDelete() {
    if (!state.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(110, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch (e) {}
  }

  playWarning() {
    if (!state.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [0, 0.12].forEach((offset) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "square";
        osc.frequency.value = 480;
        gain.gain.setValueAtTime(0.05, now + offset);
        gain.gain.linearRampToValueAtTime(0, now + offset + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.08);
      });
    } catch (e) {}
  }
}

const audio = new CyberAudioSynth();

// ==============================================================================
// AMBIENT BACKGROUND PARTICLE MATRIX
// ==============================================================================
function initBackgroundParticles() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(55, Math.floor((width * height) / 25000));
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.5 + 0.5
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Get current accent color
    const isViolet = state.theme === "violet";
    const isEmerald = state.theme === "emerald";
    const isAmber = state.theme === "amber";
    const isCrimson = state.theme === "crimson";

    let nodeColor = "rgba(0, 240, 255, 0.4)";
    let lineColor = "rgba(0, 240, 255, 0.06)";

    if (isViolet) {
      nodeColor = "rgba(199, 125, 255, 0.4)";
      lineColor = "rgba(199, 125, 255, 0.06)";
    } else if (isEmerald) {
      nodeColor = "rgba(0, 255, 136, 0.4)";
      lineColor = "rgba(0, 255, 136, 0.06)";
    } else if (isAmber) {
      nodeColor = "rgba(255, 183, 3, 0.4)";
      lineColor = "rgba(255, 183, 3, 0.06)";
    } else if (isCrimson) {
      nodeColor = "rgba(255, 42, 109, 0.4)";
      lineColor = "rgba(255, 42, 109, 0.06)";
    }

    // Update positions
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = nodeColor;
      ctx.fill();

      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

// ==============================================================================
// CLOCK & REAL-TIME TELEMETRY LOOP
// ==============================================================================
function initLiveClock() {
  const clockEl = document.getElementById("hud-clock");
  const dateEl = document.getElementById("hud-date");

  function update() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const mins = String(now.getMinutes()).padStart(2, "0");
    const secs = String(now.getSeconds()).padStart(2, "0");
    clockEl.textContent = `${hours}:${mins}:${secs}`;

    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const dayStr = days[now.getDay()];
    const dateNum = String(now.getDate()).padStart(2, "0");
    const monthStr = months[now.getMonth()];
    const yearStr = now.getFullYear();

    dateEl.textContent = `${dayStr} // ${dateNum} ${monthStr} ${yearStr}`;

    updateRadarCountdown();
  }

  update();
  setInterval(update, 1000);
}

// Find next upcoming meeting and run countdown
function updateRadarCountdown() {
  const radarTitle = document.getElementById("radar-meeting-title");
  const radarMeta = document.getElementById("radar-meeting-meta");
  const radarCountdown = document.getElementById("radar-countdown");
  const radarBtnJoin = document.getElementById("radar-btn-join");
  const radarBtnIcs = document.getElementById("radar-btn-ics");

  if (!state.meetings || state.meetings.length === 0) {
    radarTitle.textContent = "No Scheduled Missions Found";
    radarMeta.textContent = "Click '+ Schedule Meeting' to queue next tactical sync.";
    radarCountdown.textContent = "T-MINUS --:--:--";
    return;
  }

  const now = new Date();

  // Sort meetings chronologically
  const sorted = [...state.meetings].sort((a, b) => {
    return new Date(`${a.date}T${a.startTime}:00`) - new Date(`${b.date}T${b.startTime}:00`);
  });

  // Find next meeting that has not finished yet
  let nextMeet = null;
  let isLiveNow = false;

  for (const m of sorted) {
    const start = new Date(`${m.date}T${m.startTime}:00`);
    const end = new Date(`${m.date}T${m.endTime}:00`);

    if (now >= start && now <= end) {
      nextMeet = m;
      isLiveNow = true;
      break;
    } else if (start > now) {
      nextMeet = m;
      break;
    }
  }

  // If no upcoming meetings, default to the first one in list
  if (!nextMeet) nextMeet = sorted[0];

  radarTitle.textContent = nextMeet.title;
  radarMeta.innerHTML = `
    <span>📅 ${formatMeetingDateLabel(nextMeet.date)}, ${nextMeet.startTime} - ${nextMeet.endTime}</span>
    <span>📍 ${nextMeet.platform}</span>
    <span>👥 ${nextMeet.attendees.length} Personnel</span>
  `;

  radarBtnJoin.onclick = () => openCommSimulator(nextMeet);
  radarBtnIcs.onclick = () => exportMeetingToIcs(nextMeet);

  if (isLiveNow) {
    radarCountdown.textContent = "LIVE // IN SESSION";
    radarCountdown.style.color = "var(--accent-green)";
  } else {
    radarCountdown.style.color = "var(--accent-cyan)";
    const target = new Date(`${nextMeet.date}T${nextMeet.startTime}:00`);
    const diffMs = target - now;

    if (diffMs > 0) {
      const diffSecs = Math.floor(diffMs / 1000);
      const hours = String(Math.floor(diffSecs / 3600)).padStart(2, "0");
      const mins = String(Math.floor((diffSecs % 3600) / 60)).padStart(2, "0");
      const secs = String(diffSecs % 60).padStart(2, "0");
      radarCountdown.textContent = `T-MINUS ${hours}:${mins}:${secs}`;
    } else {
      radarCountdown.textContent = "CONCLUDED";
    }
  }
}

function formatMeetingDateLabel(dateStr) {
  const today = getTodayDateString(0);
  const tomorrow = getTodayDateString(1);
  if (dateStr === today) return "Today";
  if (dateStr === tomorrow) return "Tomorrow";
  return dateStr;
}

// ==============================================================================
// MEETING CONFLICT / CLASH CHECKER
// ==============================================================================
function checkMeetingClash(date, startTime, endTime, excludeId = null) {
  const startMins = timeToMinutes(startTime);
  const endMins = timeToMinutes(endTime);

  return state.meetings.find((m) => {
    if (m.id === excludeId) return false;
    if (m.date !== date) return false;

    const mStart = timeToMinutes(m.startTime);
    const mEnd = timeToMinutes(m.endTime);

    // Overlap condition: start < mEnd && end > mStart
    return startMins < mEnd && endMins > mStart;
  });
}

function timeToMinutes(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

// ==============================================================================
// METRICS & TELEMETRY UPDATER
// ==============================================================================
function updateTelemetryMetrics() {
  const totalTasks = state.tasks.length;
  const completedTasks = state.tasks.filter((t) => t.status === "done").length;
  const criticalTasks = state.tasks.filter((t) => t.priority === "critical" && t.status !== "done").length;

  const percent = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  document.getElementById("metric-completion-percent").textContent = `${percent}%`;
  document.getElementById("metric-completed-count").textContent = completedTasks;
  document.getElementById("metric-total-count").textContent = totalTasks;
  document.getElementById("metric-progress-bar").style.width = `${percent}%`;

  const todayStr = getTodayDateString(0);
  const todayMeetings = state.meetings.filter((m) => m.date === todayStr);
  document.getElementById("metric-meetings-count").innerHTML = `${todayMeetings.length} <span class="metric-sub">EVENTS TODAY</span>`;
  document.getElementById("metric-critical-count").innerHTML = `${criticalTasks} <span class="metric-sub">HIGH PRIORITY</span>`;

  document.getElementById("badge-meeting-count").textContent = state.meetings.length;
  document.getElementById("badge-task-count").textContent = state.tasks.filter((t) => t.status !== "done").length;
}

// ==============================================================================
// RENDERERS: MEETINGS
// ==============================================================================
function renderMeetings() {
  const dashList = document.getElementById("dashboard-meeting-list");
  const fullList = document.getElementById("full-meeting-list");
  const catFilter = document.getElementById("meeting-filter-cat").value;

  dashList.innerHTML = "";
  fullList.innerHTML = "";

  const now = new Date();
  const sorted = [...state.meetings].sort((a, b) => {
    return new Date(`${a.date}T${a.startTime}:00`) - new Date(`${b.date}T${b.startTime}:00`);
  });

  // Filtered by category and query
  const filtered = sorted.filter((m) => {
    const matchCat = catFilter === "all" || m.category === catFilter;
    const matchSearch =
      !state.searchQuery ||
      m.title.toLowerCase().includes(state.searchQuery) ||
      m.category.toLowerCase().includes(state.searchQuery) ||
      m.desc.toLowerCase().includes(state.searchQuery);
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    const emptyHtml = `
      <div class="empty-hud-state">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>
        <div style="font-weight: 700; color: #fff;">NO SCHEDULED MISSIONS</div>
        <div style="font-size: 0.8rem; margin-top: 0.35rem;">No upcoming meetings found matching criteria.</div>
      </div>
    `;
    dashList.innerHTML = emptyHtml;
    fullList.innerHTML = emptyHtml;
    return;
  }

  // Dashboard shows top 3-4 meetings
  filtered.slice(0, 4).forEach((m) => {
    dashList.appendChild(createMeetingCardElement(m, now));
  });

  // Full timeline shows all
  filtered.forEach((m) => {
    fullList.appendChild(createMeetingCardElement(m, now));
  });
}

function createMeetingCardElement(m, now = new Date()) {
  const card = document.createElement("div");
  card.className = "meeting-card";

  const start = new Date(`${m.date}T${m.startTime}:00`);
  const end = new Date(`${m.date}T${m.endTime}:00`);
  const isLive = now >= start && now <= end;

  if (isLive) card.classList.add("in-progress");

  // Check clash
  const clash = checkMeetingClash(m.date, m.startTime, m.endTime, m.id);
  if (clash) card.classList.add("has-clash");

  let catAttr = "sync";
  if (m.category.includes("Tactical")) catAttr = "tactical";
  if (m.category.includes("Architecture") || m.category.includes("Neural")) catAttr = "tech";

  const clashWarningHtml = clash
    ? `<div class="meeting-clash-warning">⚠️ Schedule clash with "${escapeHtml(clash.title)}" (${clash.startTime} - ${clash.endTime})</div>`
    : "";

  const liveBadge = isLive
    ? `<span style="display: inline-flex; align-items: center; gap: 4px; color: var(--accent-green); font-size: 0.72rem; font-weight: 700;"><span class="pulse-node"></span> LIVE NOW</span>`
    : "";

  card.innerHTML = `
    <div class="meeting-card-header">
      <div style="display: flex; align-items: center; gap: 0.65rem;">
        <div class="meeting-time-badge">
          <span>🕒</span>
          <span>${m.startTime} - ${m.endTime}</span>
        </div>
        <span class="meeting-category-pill" data-cat="${catAttr}">${escapeHtml(m.category)}</span>
        ${liveBadge}
      </div>
      <div style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">
        ${formatMeetingDateLabel(m.date)}
      </div>
    </div>

    ${clashWarningHtml}

    <div class="meeting-title">${escapeHtml(m.title)}</div>
    <div class="meeting-desc">${escapeHtml(m.desc || "No additional directives provided.")}</div>

    <div class="meeting-attendees">
      ${m.attendees.map((a) => `<span class="attendee-chip">👤 ${escapeHtml(a.trim())}</span>`).join("")}
    </div>

    <div class="meeting-footer">
      <div class="meeting-platform">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
        <span>${escapeHtml(m.platform)}</span>
      </div>

      <div class="meeting-actions">
        <button class="icon-btn" onclick="exportMeetingToIcsById('${m.id}')" title="Export to Calendar (.ICS)">.ICS</button>
        <button class="icon-btn" onclick="openMeetingModal('${m.id}')" title="Edit Session">Edit</button>
        <button class="icon-btn" onclick="deleteMeeting('${m.id}')" title="Cancel / Remove">&times;</button>
        <button class="btn-join" onclick="openCommSimulatorById('${m.id}')">Join Link</button>
      </div>
    </div>
  `;

  return card;
}

// ==============================================================================
// RENDERERS: DIRECTIVES & TO-DO (DASHBOARD, KANBAN, LIST)
// ==============================================================================
function renderTasks() {
  const dashList = document.getElementById("dashboard-task-list");
  const fullListView = document.getElementById("full-task-list-view");

  dashList.innerHTML = "";
  fullListView.innerHTML = "";

  // Kanban Columns
  const colBacklog = document.getElementById("kanban-col-backlog");
  const colProgress = document.getElementById("kanban-col-in-progress");
  const colReview = document.getElementById("kanban-col-review");
  const colDone = document.getElementById("kanban-col-done");

  colBacklog.innerHTML = "";
  colProgress.innerHTML = "";
  colReview.innerHTML = "";
  colDone.innerHTML = "";

  const counts = { backlog: 0, "in-progress": 0, review: 0, done: 0 };

  const filteredTasks = state.tasks.filter((t) => {
    if (!state.searchQuery) return true;
    return (
      t.title.toLowerCase().includes(state.searchQuery) ||
      (t.tag && t.tag.toLowerCase().includes(state.searchQuery))
    );
  });

  // Render to Dashboard (Active tasks first)
  const activeTasks = filteredTasks.filter((t) => t.status !== "done");
  const completedTasks = filteredTasks.filter((t) => t.status === "done");
  const dashboardSorted = [...activeTasks, ...completedTasks].slice(0, 5);

  dashboardSorted.forEach((t) => {
    dashList.appendChild(createTaskCardElement(t));
  });

  // Render to Kanban & Full List
  filteredTasks.forEach((t) => {
    counts[t.status] = (counts[t.status] || 0) + 1;
    fullListView.appendChild(createTaskCardElement(t));

    const kanbanCard = createKanbanCardElement(t);
    if (t.status === "backlog") colBacklog.appendChild(kanbanCard);
    else if (t.status === "in-progress") colProgress.appendChild(kanbanCard);
    else if (t.status === "review") colReview.appendChild(kanbanCard);
    else if (t.status === "done") colDone.appendChild(kanbanCard);
  });

  document.getElementById("count-backlog").textContent = counts.backlog;
  document.getElementById("count-in-progress").textContent = counts["in-progress"];
  document.getElementById("count-review").textContent = counts.review;
  document.getElementById("count-done").textContent = counts.done;
}

function createTaskCardElement(task) {
  const card = document.createElement("div");
  card.className = `task-card ${task.status === "done" ? "completed" : ""}`;

  const isCompleted = task.status === "done";
  const subtasks = task.subtasks || [];
  const completedSubs = subtasks.filter((s) => s.completed).length;
  const subPercent = subtasks.length === 0 ? 0 : Math.round((completedSubs / subtasks.length) * 100);

  const subtasksHtml =
    subtasks.length > 0
      ? `
      <div class="task-subtasks-progress">
        <span>MILESTONES ${completedSubs}/${subtasks.length}</span>
        <div class="subtask-mini-bar">
          <div class="subtask-mini-fill" style="width: ${subPercent}%;"></div>
        </div>
      </div>
      <div style="margin-top: 0.4rem; display: flex; flex-direction: column; gap: 0.25rem;">
        ${subtasks
          .map(
            (st) => `
          <label style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.75rem; color: ${st.completed ? "var(--text-dim)" : "var(--text-muted)"}; cursor: pointer;">
            <input type="checkbox" ${st.completed ? "checked" : ""} onchange="toggleSubtask('${task.id}', '${st.id}')">
            <span style="${st.completed ? "text-decoration: line-through;" : ""}">${escapeHtml(st.text)}</span>
          </label>
        `
          )
          .join("")}
      </div>
    `
      : "";

  card.innerHTML = `
    <div class="task-checkbox-wrapper">
      <input type="checkbox" class="cyber-checkbox" ${isCompleted ? "checked" : ""} onchange="toggleTaskDone('${task.id}')" title="Mark Done">
    </div>

    <div class="task-body">
      <div class="task-header-row">
        <span class="task-text">${escapeHtml(task.title)}</span>
        <div style="display: flex; align-items: center; gap: 0.35rem;">
          <button class="icon-btn" style="padding: 0.15rem 0.4rem; font-size: 0.72rem;" onclick="openTaskModal('${task.id}')">Edit</button>
          <button class="icon-btn" style="padding: 0.15rem 0.4rem; font-size: 0.72rem;" onclick="deleteTask('${task.id}')">&times;</button>
        </div>
      </div>

      <div class="task-tags-row">
        <span class="priority-badge ${task.priority}">${task.priority}</span>
        ${task.tag ? `<span class="attendee-chip" style="font-size: 0.68rem;">#${escapeHtml(task.tag)}</span>` : ""}
        ${task.dueDate ? `<span class="task-due-date">📅 ${formatMeetingDateLabel(task.dueDate)}</span>` : ""}
      </div>

      ${subtasksHtml}
    </div>
  `;

  return card;
}

function createKanbanCardElement(task) {
  const card = document.createElement("div");
  card.className = "task-card";
  card.style.flexDirection = "column";

  const nextStatusMap = {
    backlog: "in-progress",
    "in-progress": "review",
    review: "done",
    done: "backlog"
  };

  const nextStatusLabel = {
    backlog: "Launch → In Orbit",
    "in-progress": "Submit → Review",
    review: "Approve → Done",
    done: "Reopen → Backlog"
  };

  card.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; width: 100%;">
      <span class="priority-badge ${task.priority}">${task.priority}</span>
      <span style="font-size: 0.7rem; color: var(--text-muted); font-family: var(--font-mono);">${task.dueDate || ""}</span>
    </div>

    <div class="task-text" style="margin: 0.45rem 0; width: 100%; font-size: 0.88rem;">
      ${escapeHtml(task.title)}
    </div>

    ${task.tag ? `<div style="margin-bottom: 0.4rem;"><span class="attendee-chip" style="font-size: 0.65rem;">#${escapeHtml(task.tag)}</span></div>` : ""}

    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-top: 0.35rem; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 0.45rem;">
      <button class="icon-btn" style="padding: 0.2rem 0.45rem; font-size: 0.7rem;" onclick="openTaskModal('${task.id}')">Edit</button>
      <button class="icon-btn btn-primary-hud" style="padding: 0.2rem 0.6rem; font-size: 0.7rem;" onclick="moveTaskStatus('${task.id}', '${nextStatusMap[task.status]}')">
        ${nextStatusLabel[task.status]}
      </button>
    </div>
  `;

  return card;
}

// ==============================================================================
// RENDERERS: CALENDAR GRID
// ==============================================================================
let currentCalYear = 2026;
let currentCalMonth = 10; // 0-indexed (10 = November)

function initCalendar() {
  const now = new Date();
  currentCalYear = now.getFullYear();
  currentCalMonth = now.getMonth();

  document.getElementById("cal-prev-month").onclick = () => {
    audio.playClick();
    currentCalMonth--;
    if (currentCalMonth < 0) {
      currentCalMonth = 11;
      currentCalYear--;
    }
    renderCalendarGrid();
  };

  document.getElementById("cal-next-month").onclick = () => {
    audio.playClick();
    currentCalMonth++;
    if (currentCalMonth > 11) {
      currentCalMonth = 0;
      currentCalYear++;
    }
    renderCalendarGrid();
  };

  renderCalendarGrid();
}

function renderCalendarGrid() {
  const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  document.getElementById("cal-month-title").textContent = `${monthNames[currentCalMonth]} ${currentCalYear}`;

  const tbody = document.getElementById("cal-grid-body");
  tbody.innerHTML = "";

  const firstDay = new Date(currentCalYear, currentCalMonth, 1).getDay();
  const daysInMonth = new Date(currentCalYear, currentCalMonth + 1, 0).getDate();

  const todayStr = getTodayDateString(0);

  let dateCounter = 1;
  for (let row = 0; row < 6; row++) {
    const tr = document.createElement("tr");
    let hasDateInRow = false;

    for (let col = 0; col < 7; col++) {
      const td = document.createElement("td");

      if ((row === 0 && col < firstDay) || dateCounter > daysInMonth) {
        td.textContent = "";
      } else {
        hasDateInRow = true;
        const thisDate = dateCounter;
        td.textContent = thisDate;

        const dateStr = `${currentCalYear}-${String(currentCalMonth + 1).padStart(2, "0")}-${String(thisDate).padStart(2, "0")}`;

        if (dateStr === todayStr) td.classList.add("today");
        if (dateStr === state.selectedCalDate) td.classList.add("selected");

        // Check if there are meetings on this date
        const hasMeetings = state.meetings.some((m) => m.date === dateStr);
        if (hasMeetings) td.classList.add("has-events");

        td.onclick = () => {
          audio.playClick();
          state.selectedCalDate = dateStr;
          renderCalendarGrid();
          renderCalendarAgenda();
        };

        dateCounter++;
      }

      tr.appendChild(td);
    }

    if (hasDateInRow) tbody.appendChild(tr);
  }

  renderCalendarAgenda();
}

function renderCalendarAgenda() {
  const label = document.getElementById("cal-selected-date-label");
  const list = document.getElementById("cal-agenda-meeting-list");
  label.textContent = `AGENDA FOR // ${state.selectedCalDate}`;
  list.innerHTML = "";

  const meetings = state.meetings.filter((m) => m.date === state.selectedCalDate);

  if (meetings.length === 0) {
    list.innerHTML = `
      <div class="empty-hud-state">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>
        <div style="font-weight: 700; color: #fff;">CLEAR ORBIT</div>
        <div style="font-size: 0.8rem; margin-top: 0.35rem;">No missions scheduled for this date. Click below to schedule one.</div>
        <button class="icon-btn btn-primary-hud" style="margin-top: 1rem;" onclick="openMeetingModal(null, '${state.selectedCalDate}')">+ Schedule On This Day</button>
      </div>
    `;
    return;
  }

  meetings.forEach((m) => {
    list.appendChild(createMeetingCardElement(m));
  });
}

// ==============================================================================
// TASK CRUD ACTIONS
// ==============================================================================
function toggleTaskDone(taskId) {
  const task = state.tasks.find((t) => t.id === taskId);
  if (!task) return;

  if (task.status === "done") {
    task.status = "in-progress";
    audio.playClick();
    showToast(`Directive reactivated: "${task.title}"`);
  } else {
    task.status = "done";
    audio.playSuccess();
    showToast(`Mission Accomplished: "${task.title}"`);
  }

  state.save();
  updateTelemetryMetrics();
  renderTasks();
}

function moveTaskStatus(taskId, newStatus) {
  const task = state.tasks.find((t) => t.id === taskId);
  if (!task) return;

  task.status = newStatus;
  if (newStatus === "done") audio.playSuccess();
  else audio.playClick();

  state.save();
  updateTelemetryMetrics();
  renderTasks();
  showToast(`Moved to ${newStatus.toUpperCase()}: "${task.title}"`);
}

function toggleSubtask(taskId, subtaskId) {
  const task = state.tasks.find((t) => t.id === taskId);
  if (!task || !task.subtasks) return;
  const sub = task.subtasks.find((s) => s.id === subtaskId);
  if (!sub) return;

  sub.completed = !sub.completed;
  if (sub.completed) audio.playClick();

  // If all subtasks are done, prompt or update
  const allDone = task.subtasks.every((s) => s.completed);
  if (allDone && task.status !== "done") {
    task.status = "done";
    audio.playSuccess();
    showToast(`All milestones cleared! Directive marked completed.`);
  }

  state.save();
  updateTelemetryMetrics();
  renderTasks();
}

function deleteTask(taskId) {
  if (!confirm("Are you sure you want to terminate this directive?")) return;
  audio.playDelete();
  state.tasks = state.tasks.filter((t) => t.id !== taskId);
  state.save();
  updateTelemetryMetrics();
  renderTasks();
  showToast("Directive purged from database.");
}

// Quick Add Handler from Dashboard
function handleQuickAddTask() {
  const input = document.getElementById("dashboard-quick-task-input");
  const val = input.value.trim();
  if (!val) return;

  const newTask = {
    id: "task-" + Date.now(),
    title: val,
    priority: "medium",
    status: "in-progress",
    dueDate: getTodayDateString(0),
    tag: "Core",
    subtasks: []
  };

  state.tasks.unshift(newTask);
  state.save();
  audio.playClick();
  input.value = "";
  updateTelemetryMetrics();
  renderTasks();
  showToast(`Directive queued: "${newTask.title}"`);
}

// ==============================================================================
// MEETING CRUD ACTIONS
// ==============================================================================
function deleteMeeting(meetingId) {
  if (!confirm("Confirm cancellation of scheduled session?")) return;
  audio.playDelete();
  state.meetings = state.meetings.filter((m) => m.id !== meetingId);
  state.save();
  updateTelemetryMetrics();
  renderMeetings();
  renderCalendarAgenda();
  updateRadarCountdown();
  showToast("Session cancelled and excised from timeline.");
}

// ==============================================================================
// .ICS CALENDAR EXPORTER (iCalendar format)
// ==============================================================================
function exportMeetingToIcsById(meetingId) {
  const m = state.meetings.find((x) => x.id === meetingId);
  if (m) exportMeetingToIcs(m);
}

function exportMeetingToIcs(meeting) {
  audio.playClick();
  const formatIcsTime = (dateStr, timeStr) => {
    return dateStr.replace(/-/g, "") + "T" + timeStr.replace(/:/g, "") + "00";
  };

  const startStamp = formatIcsTime(meeting.date, meeting.startTime);
  const endStamp = formatIcsTime(meeting.date, meeting.endTime);

  const icsLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CHRONOS NEXUS//Quantum Scheduler//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${meeting.id}-${Date.now()}@chronos.nexus`,
    `DTSTAMP:${formatIcsTime(getTodayDateString(0), "12:00")}`,
    `DTSTART:${startStamp}`,
    `DTEND:${endStamp}`,
    `SUMMARY:${meeting.title}`,
    `DESCRIPTION:${meeting.desc.replace(/\n/g, "\\n")}\\n\\nLink: ${meeting.link}`,
    `LOCATION:${meeting.platform}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR"
  ];

  const icsContent = icsLines.join("\r\n");
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${meeting.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast(`Exported .ICS calendar file for: "${meeting.title}"`);
}

// ==============================================================================
// MODALS LOGIC
// ==============================================================================
function openMeetingModal(meetingId = null, prefillDate = null) {
  audio.playModal();
  const modal = document.getElementById("modal-meeting");
  const form = document.getElementById("form-meeting");
  const clashBox = document.getElementById("modal-meeting-clash-box");
  clashBox.style.display = "none";

  form.reset();

  if (meetingId) {
    const m = state.meetings.find((x) => x.id === meetingId);
    if (m) {
      document.getElementById("modal-meeting-title-text").textContent = "EDIT SCHEDULED SESSION";
      document.getElementById("meeting-edit-id").value = m.id;
      document.getElementById("meeting-input-title").value = m.title;
      document.getElementById("meeting-input-date").value = m.date;
      document.getElementById("meeting-input-category").value = m.category;
      document.getElementById("meeting-input-start").value = m.startTime;
      document.getElementById("meeting-input-end").value = m.endTime;
      document.getElementById("meeting-input-platform").value = m.platform;
      document.getElementById("meeting-input-link").value = m.link;
      document.getElementById("meeting-input-attendees").value = m.attendees.join(", ");
      document.getElementById("meeting-input-desc").value = m.desc || "";
    }
  } else {
    document.getElementById("modal-meeting-title-text").textContent = "SCHEDULE MISSION / MEETING";
    document.getElementById("meeting-edit-id").value = "";
    document.getElementById("meeting-input-date").value = prefillDate || getTodayDateString(0);
    document.getElementById("meeting-input-start").value = "15:00";
    document.getElementById("meeting-input-end").value = "15:45";
  }

  // Real-time conflict preview inside modal
  const checkConflict = () => {
    const d = document.getElementById("meeting-input-date").value;
    const s = document.getElementById("meeting-input-start").value;
    const e = document.getElementById("meeting-input-end").value;
    const id = document.getElementById("meeting-edit-id").value || null;

    if (d && s && e) {
      const clash = checkMeetingClash(d, s, e, id);
      if (clash) {
        clashBox.textContent = `⚠️ Warning: Time slot overlaps with "${clash.title}" (${clash.startTime} - ${clash.endTime})!`;
        clashBox.style.display = "block";
        audio.playWarning();
      } else {
        clashBox.style.display = "none";
      }
    }
  };

  document.getElementById("meeting-input-date").onchange = checkConflict;
  document.getElementById("meeting-input-start").onchange = checkConflict;
  document.getElementById("meeting-input-end").onchange = checkConflict;

  modal.classList.add("active");
}

function closeMeetingModal() {
  audio.playClick();
  document.getElementById("modal-meeting").classList.remove("active");
}

function openTaskModal(taskId = null) {
  audio.playModal();
  const modal = document.getElementById("modal-task");
  const form = document.getElementById("form-task");
  form.reset();

  if (taskId) {
    const t = state.tasks.find((x) => x.id === taskId);
    if (t) {
      document.getElementById("modal-task-title-text").textContent = "EDIT DIRECTIVE PROTOCOL";
      document.getElementById("task-edit-id").value = t.id;
      document.getElementById("task-input-title").value = t.title;
      document.getElementById("task-input-priority").value = t.priority;
      document.getElementById("task-input-status").value = t.status;
      document.getElementById("task-input-duedate").value = t.dueDate || "";
      document.getElementById("task-input-tag").value = t.tag || "";
      document.getElementById("task-input-subtasks").value = (t.subtasks || []).map((s) => s.text).join("\n");
    }
  } else {
    document.getElementById("modal-task-title-text").textContent = "NEW DIRECTIVE PROTOCOL";
    document.getElementById("task-edit-id").value = "";
    document.getElementById("task-input-duedate").value = getTodayDateString(0);
  }

  modal.classList.add("active");
}

function closeTaskModal() {
  audio.playClick();
  document.getElementById("modal-task").classList.remove("active");
}

// Hologram Comm Simulator Modal
function openCommSimulatorById(meetingId) {
  const m = state.meetings.find((x) => x.id === meetingId);
  if (m) openCommSimulator(m);
}

function openCommSimulator(meeting) {
  audio.playModal();
  const modal = document.getElementById("modal-comm-sim");
  document.getElementById("comm-sim-title").textContent = `HOLOGRAM COMM // ${meeting.title.toUpperCase()}`;
  document.getElementById("comm-sim-status").textContent = `PLATFORM: ${meeting.platform.toUpperCase()} // QUANTUM FREQUENCY ACTIVE`;

  const extLink = document.getElementById("comm-sim-external-link");
  extLink.href = meeting.link || "#";

  modal.classList.add("active");
}

function closeCommSimulator() {
  audio.playClick();
  document.getElementById("modal-comm-sim").classList.remove("active");
}

// ==============================================================================
// COMMAND PALETTE (`Ctrl + K`)
// ==============================================================================
function initCommandPalette() {
  const modal = document.getElementById("modal-cmd-palette");
  const input = document.getElementById("cmd-palette-input");
  const results = document.getElementById("cmd-palette-results");

  function openPalette() {
    audio.playModal();
    modal.classList.add("active");
    input.value = "";
    renderResults("");
    setTimeout(() => input.focus(), 50);
  }

  function closePalette() {
    modal.classList.remove("active");
  }

  const commands = [
    { title: "Schedule New Meeting", sub: "Create a session on the timeline", icon: "📅", action: () => openMeetingModal() },
    { title: "Create New Directive", sub: "Add a task to the tactical matrix", icon: "⚡", action: () => openTaskModal() },
    { title: "Switch to HUD Dashboard", sub: "View dual split schedule & tasks", icon: "📊", action: () => switchView("dashboard") },
    { title: "Switch to Meetings Timeline", sub: "Inspect all upcoming sessions", icon: "🕒", action: () => switchView("meetings") },
    { title: "Switch to Task Matrix (Kanban)", sub: "Open directive board", icon: "📋", action: () => switchView("tasks") },
    { title: "Switch to Calendar View", sub: "Monthly orbital visualizer", icon: "📆", action: () => switchView("calendar") },
    { title: "Toggle Audio Effects", sub: "Mute or unmute synthesized sound", icon: "🔊", action: toggleSfx },
    { title: "Switch Theme: Cyber Cyan", sub: "Default high-tech glow", icon: "🎨", action: () => setTheme("cyan") },
    { title: "Switch Theme: Synth Violet", sub: "Neon ultraviolet neon", icon: "🎨", action: () => setTheme("violet") },
    { title: "Switch Theme: Matrix Emerald", sub: "Cyber green matrix scheme", icon: "🎨", action: () => setTheme("emerald") },
    { title: "Switch Theme: Solar Amber", sub: "Golden solar flare scheme", icon: "🎨", action: () => setTheme("amber") },
    { title: "Switch Theme: Neon Crimson", sub: "Red alert combat scheme", icon: "🎨", action: () => setTheme("crimson") },
    { title: "Export All Data (JSON)", sub: "Download backup JSON file", icon: "💾", action: exportAllData },
    { title: "Reset Demo Directives & Meetings", sub: "Reload pre-built sample universe", icon: "🔄", action: () => resetDemoData() }
  ];

  function renderResults(query) {
    results.innerHTML = "";
    const q = query.toLowerCase().trim();

    // 1. Matches from commands
    const matchedCmds = commands.filter((c) => c.title.toLowerCase().includes(q) || c.sub.toLowerCase().includes(q));

    matchedCmds.forEach((cmd) => {
      const item = document.createElement("div");
      item.className = "cmd-item";
      item.innerHTML = `
        <div class="cmd-item-left">
          <span>${cmd.icon}</span>
          <div>
            <div style="font-weight: 600;">${cmd.title}</div>
            <div style="font-size: 0.72rem; color: var(--text-muted);">${cmd.sub}</div>
          </div>
        </div>
      `;
      item.onclick = () => {
        closePalette();
        cmd.action();
      };
      results.appendChild(item);
    });

    // 2. Matches from meetings
    if (q) {
      state.meetings
        .filter((m) => m.title.toLowerCase().includes(q))
        .forEach((m) => {
          const item = document.createElement("div");
          item.className = "cmd-item";
          item.innerHTML = `
          <div class="cmd-item-left">
            <span>📅</span>
            <div>
              <div style="font-weight: 600;">Meeting: ${escapeHtml(m.title)}</div>
              <div style="font-size: 0.72rem; color: var(--text-muted);">${m.date} (${m.startTime} - ${m.endTime})</div>
            </div>
          </div>
          <span class="cmd-item-shortcut">OPEN</span>
        `;
          item.onclick = () => {
            closePalette();
            openMeetingModal(m.id);
          };
          results.appendChild(item);
        });

      // 3. Matches from tasks
      state.tasks
        .filter((t) => t.title.toLowerCase().includes(q))
        .forEach((t) => {
          const item = document.createElement("div");
          item.className = "cmd-item";
          item.innerHTML = `
          <div class="cmd-item-left">
            <span>⚡</span>
            <div>
              <div style="font-weight: 600;">Directive: ${escapeHtml(t.title)}</div>
              <div style="font-size: 0.72rem; color: var(--text-muted);">${t.status.toUpperCase()} &bull; ${t.priority.toUpperCase()}</div>
            </div>
          </div>
          <span class="cmd-item-shortcut">EDIT</span>
        `;
          item.onclick = () => {
            closePalette();
            openTaskModal(t.id);
          };
          results.appendChild(item);
        });
    }
  }

  input.oninput = (e) => renderResults(e.target.value);

  document.getElementById("btn-cmd-palette").onclick = openPalette;

  // Global Keyboard shortcuts
  window.addEventListener("keydown", (e) => {
    // Ctrl + K or Cmd + K
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (modal.classList.contains("active")) closePalette();
      else openPalette();
    }
    // Escape closes modals
    if (e.key === "Escape") {
      closePalette();
      document.querySelectorAll(".modal-overlay").forEach((m) => m.classList.remove("active"));
    }
    // 'M' toggles audio unless in an input
    if (e.key.toLowerCase() === "m" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
      toggleSfx();
    }
  });

  // Close when clicking modal backdrop
  modal.onclick = (e) => {
    if (e.target === modal) closePalette();
  };
}

// ==============================================================================
// NAVIGATION & VIEWS CONTROLLER
// ==============================================================================
function initNavigation() {
  const tabs = document.querySelectorAll(".nav-tab-btn");
  tabs.forEach((tab) => {
    tab.onclick = () => {
      audio.playClick();
      const view = tab.getAttribute("data-view");
      switchView(view);
    };
  });

  document.getElementById("btn-toggle-task-view").onclick = () => {
    audio.playClick();
    const kanban = document.getElementById("kanban-container");
    const list = document.getElementById("full-task-list-view");
    const btn = document.getElementById("btn-toggle-task-view");

    if (kanban.style.display === "none") {
      kanban.style.display = "grid";
      list.style.display = "none";
      btn.textContent = "Toggle List View";
    } else {
      kanban.style.display = "none";
      list.style.display = "flex";
      btn.textContent = "Toggle Kanban View";
    }
  };
}

function switchView(viewName) {
  state.activeView = viewName;

  document.querySelectorAll(".nav-tab-btn").forEach((t) => {
    t.classList.toggle("active", t.getAttribute("data-view") === viewName);
  });

  document.querySelectorAll(".view-panel").forEach((p) => {
    p.classList.remove("active");
  });

  const target = document.getElementById(`view-${viewName}`);
  if (target) target.classList.add("active");

  if (viewName === "calendar") {
    renderCalendarGrid();
  }
}

// ==============================================================================
// THEME & AUDIO PREFERENCES
// ==============================================================================
function setTheme(theme) {
  state.theme = theme;
  document.body.setAttribute("data-theme", theme);
  document.getElementById("theme-selector").value = theme;
  state.save();
  showToast(`HUD Visual Scheme: ${theme.toUpperCase()}`);
}

function toggleSfx() {
  state.sfxEnabled = !state.sfxEnabled;
  state.save();
  document.getElementById("sfx-status-text").textContent = state.sfxEnabled ? "SFX: ON" : "SFX: OFF";
  if (state.sfxEnabled) audio.playClick();
  showToast(state.sfxEnabled ? "Audio Synthesizer: ACTIVE" : "Audio Synthesizer: MUTED");
}

// ==============================================================================
// BACKUP & EXPORT / IMPORT
// ==============================================================================
function exportAllData() {
  audio.playClick();
  const backup = {
    app: "CHRONOS_NEXUS",
    version: "3.8.4",
    exportedAt: new Date().toISOString(),
    meetings: state.meetings,
    tasks: state.tasks
  };

  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `chronos_nexus_backup_${getTodayDateString(0)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast("Quantum backup exported successfully.");
}

function resetDemoData() {
  if (!confirm("Restore factory demo directives and scheduled missions?")) return;
  state.resetDemoData();
  audio.playSuccess();
  updateTelemetryMetrics();
  renderMeetings();
  renderTasks();
  renderCalendarGrid();
  updateRadarCountdown();
  showToast("Quantum database reset to factory demo state.");
}

// ==============================================================================
// TOAST NOTIFICATIONS
// ==============================================================================
function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "hud-toast";
  toast.innerHTML = `
    <span class="pulse-node" style="width: 6px; height: 6px;"></span>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ==============================================================================
// GLOBAL EVENT ATTACHMENTS & INITIALIZATION
// ==============================================================================
window.addEventListener("DOMContentLoaded", () => {
  // Apply saved theme
  document.body.setAttribute("data-theme", state.theme);
  document.getElementById("theme-selector").value = state.theme;
  document.getElementById("theme-selector").onchange = (e) => setTheme(e.target.value);

  // Audio button
  document.getElementById("btn-toggle-sfx").onclick = toggleSfx;
  document.getElementById("sfx-status-text").textContent = state.sfxEnabled ? "SFX: ON" : "SFX: OFF";

  // Navigation
  initNavigation();

  // Search input
  const searchInput = document.getElementById("global-search-input");
  searchInput.oninput = (e) => {
    state.searchQuery = e.target.value.toLowerCase().trim();
    renderMeetings();
    renderTasks();
  };

  // Form: Meeting Submit
  document.getElementById("form-meeting").onsubmit = (e) => {
    e.preventDefault();
    const editId = document.getElementById("meeting-edit-id").value;
    const title = document.getElementById("meeting-input-title").value.trim();
    const date = document.getElementById("meeting-input-date").value;
    const category = document.getElementById("meeting-input-category").value;
    const startTime = document.getElementById("meeting-input-start").value;
    const endTime = document.getElementById("meeting-input-end").value;
    const platform = document.getElementById("meeting-input-platform").value;
    const link = document.getElementById("meeting-input-link").value.trim();
    const attendeesStr = document.getElementById("meeting-input-attendees").value;
    const desc = document.getElementById("meeting-input-desc").value.trim();

    const attendees = attendeesStr ? attendeesStr.split(",").map((s) => s.trim()).filter(Boolean) : ["Sole Operator"];

    if (editId) {
      const idx = state.meetings.findIndex((m) => m.id === editId);
      if (idx !== -1) {
        state.meetings[idx] = {
          ...state.meetings[idx],
          title,
          date,
          category,
          startTime,
          endTime,
          platform,
          link,
          attendees,
          desc
        };
      }
    } else {
      const newMeet = {
        id: "meet-" + Date.now(),
        title,
        date,
        category,
        startTime,
        endTime,
        platform,
        link,
        attendees,
        desc
      };
      state.meetings.push(newMeet);
    }

    state.save();
    audio.playSuccess();
    closeMeetingModal();
    updateTelemetryMetrics();
    renderMeetings();
    renderCalendarGrid();
    updateRadarCountdown();
    showToast(editId ? `Session updated: "${title}"` : `Session scheduled: "${title}"`);
  };

  // Form: Task Submit
  document.getElementById("form-task").onsubmit = (e) => {
    e.preventDefault();
    const editId = document.getElementById("task-edit-id").value;
    const title = document.getElementById("task-input-title").value.trim();
    const priority = document.getElementById("task-input-priority").value;
    const status = document.getElementById("task-input-status").value;
    const dueDate = document.getElementById("task-input-duedate").value;
    const tag = document.getElementById("task-input-tag").value.trim();
    const subtasksRaw = document.getElementById("task-input-subtasks").value;

    const subtasks = subtasksRaw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((text, i) => ({ id: "st-" + Date.now() + "-" + i, text, completed: false }));

    if (editId) {
      const idx = state.tasks.findIndex((t) => t.id === editId);
      if (idx !== -1) {
        state.tasks[idx] = {
          ...state.tasks[idx],
          title,
          priority,
          status,
          dueDate,
          tag,
          subtasks: subtasks.length > 0 ? subtasks : state.tasks[idx].subtasks || []
        };
      }
    } else {
      const newTask = {
        id: "task-" + Date.now(),
        title,
        priority,
        status,
        dueDate,
        tag,
        subtasks
      };
      state.tasks.unshift(newTask);
    }

    state.save();
    audio.playSuccess();
    closeTaskModal();
    updateTelemetryMetrics();
    renderTasks();
    showToast(editId ? `Directive updated: "${title}"` : `Directive committed: "${title}"`);
  };

  // Quick action buttons in top header
  document.getElementById("btn-add-meeting").onclick = () => openMeetingModal();
  document.getElementById("btn-add-task").onclick = () => openTaskModal();
  document.getElementById("btn-quick-new-meeting").onclick = () => openMeetingModal();
  document.getElementById("btn-quick-new-task").onclick = () => openTaskModal();

  // Quick Add task bar
  document.getElementById("dashboard-quick-task-btn").onclick = handleQuickAddTask;
  document.getElementById("dashboard-quick-task-input").onkeydown = (e) => {
    if (e.key === "Enter") handleQuickAddTask();
  };

  // Export & reset buttons
  document.getElementById("btn-export-data").onclick = exportAllData;
  document.getElementById("btn-reset-demo").onclick = resetDemoData;

  // Meeting Category Filter change
  document.getElementById("meeting-filter-cat").onchange = renderMeetings;

  // Comm Simulator controls
  document.getElementById("comm-btn-mute-mic").onclick = (e) => {
    audio.playClick();
    const isMuted = e.target.textContent.includes("Unmute");
    e.target.textContent = isMuted ? "🎤 Mute Mic" : "🔇 Unmute Mic";
    showToast(isMuted ? "Microphone active" : "Microphone muted");
  };

  document.getElementById("comm-btn-camera").onclick = (e) => {
    audio.playClick();
    const isOn = e.target.textContent.includes("ON");
    e.target.textContent = isOn ? "📹 Holo Cam: OFF" : "📹 Holo Cam: ON";
    showToast(isOn ? "Holographic projection disabled" : "Holographic projection enabled");
  };

  // Initialize features
  initBackgroundParticles();
  initLiveClock();
  initCalendar();
  initCommandPalette();

  // Initial renders
  updateTelemetryMetrics();
  renderMeetings();
  renderTasks();
});
