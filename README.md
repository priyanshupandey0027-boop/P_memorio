# CHRONOS // NEXUS
### Quantum Schedule & Directives Matrix — Futuristic Productivity Web App

A futuristic, interactive web application designed to manage scheduled meetings and to-do lists. Built with modern web standards, an animated sci-fi HUD aesthetic, Web Audio API sound synthesis, time conflict detection, countdown radars, and complete local persistence.

---

## 🌟 Key Features

### 📅 Meeting & Schedule Management
- **Live Mission Radar**: Real-time countdown timer to your nearest upcoming meeting (`T-MINUS 00:42:15`), complete with meeting links and attendee metadata.
- **Conflict / Clash Detector**: Automatically alerts you if a new or edited meeting overlaps in time with an existing session.
- **Protocol Categories**: Categorize meetings (e.g. *Tactical Sync, Architecture Review, Design Sprint, Neural AI Sync, 1-on-1 Pulse*).
- **One-Click Calendar Export (.ICS)**: Export any meeting to a standard `.ics` file compatible with Google Calendar, Microsoft Outlook, and Apple Calendar.
- **Comm Simulator**: Futuristic simulated holographic briefing room with audio visualizer, mic/camera controls, and a meeting scratchpad.
- **Interactive Calendar Grid**: Interactive monthly visualizer indicating days with scheduled sessions and instant day-specific agendas.

### ⚡ Directive & To-Do Matrix
- **Dual Visual Modes**:
  - **HUD Dashboard**: Streamlined split-grid for rapid daily triage.
  - **Kanban Board Matrix**: 4-stage pipeline (*Backlog &rarr; In Orbit / In Progress &rarr; Review & QA &rarr; Completed*) with quick advancement controls.
  - **List View**: Detailed list with subtask checklists and tag filters.
- **Milestones & Subtasks**: Add multi-step checklists to directives; tracking bars automatically update progress in real time.
- **Cyber Priority System**: Color-coded priority tags: `CRITICAL` (Red Alert), `HIGH` (Solar Amber), `MEDIUM` (Cyan Glow), `LOW` (Muted Steel).
- **Quick-Add Bar**: Rapid keyboard-driven task entry from the dashboard.

### 🛸 Futuristic Interactive UI & Audio
- **Holographic HUD Aesthetic**: Glassmorphism, animated circuit matrix grid, scanlines, glowing cyber borders, and chamfered edges.
- **Dynamic Particle Matrix**: Background HTML5 Canvas generating floating constellation nodes and quantum link lines.
- **Zero-Dependency Sci-Fi Audio Synthesizer**: Custom Web Audio API oscillator synthesizing blips, modal whooshes, alert tones, and completion chimes on the fly (toggle on/off with `M`).
- **5 Visual Cyber Schemes**: Switch themes instantly via the top HUD bar:
  - **Cyber Cyan** (Default)
  - **Synth Violet**
  - **Matrix Emerald**
  - **Solar Amber**
  - **Neon Crimson**
- **Command Palette (`Ctrl + K`)**: Universal fuzzy command bar to jump views, search meetings/tasks, toggle audio, and switch themes from the keyboard.
- **100% Client-Side & Private**: All data persists in browser `localStorage`. Includes quick **Export (JSON)** and **Restore Demo Data** controls.

---

## 🚀 Quick Start

### Option 1: Direct File Launch (No server required)
Simply double-click `open.bat` or open `index.html` in your web browser (Microsoft Edge, Google Chrome, Brave, Firefox, etc.).

### Option 2: Run Built-in PowerShell Local Server
If you prefer running on `http://localhost:5050`, right-click `serve.ps1` and select **Run with PowerShell** (or run `powershell -ExecutionPolicy Bypass -File .\serve.ps1`).

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Ctrl + K` or `Cmd + K` | Open Holographic Command Palette |
| `M` | Mute / Unmute Sci-Fi Synthesizer Sound Effects |
| `Enter` (in Quick-Add) | Immediately commit and add new directive |
| `Esc` | Close any active modal or command overlay |

---

## 📂 Project Structure

```text
chronos-hud/
├── index.html        # Semantic HTML5 HUD structure, modals, and templates
├── styles.css        # Futuristic cyber design system, neon glassmorphism & themes
├── app.js            # Reactive application state, audio synth, collision detector & UI engine
├── open.bat          # 1-click launcher for Windows
├── serve.ps1         # Zero-dependency PowerShell HTTP server
└── README.md         # Full documentation
```
