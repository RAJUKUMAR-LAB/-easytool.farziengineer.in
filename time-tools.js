/* ==========================================================================
   OmniToolbox - Date & Time Suite
   World Clocks, Time Zone Converters, Stopwatch, Countdown, & Pomodoro
   ========================================================================== */

const TimeTools = {

  // Web Audio Chime Helper
  playChime() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch (e) {
      // AudioContext blocked or unavailable
    }
  },

  // ==========================================
  // 1. World Clock
  // ==========================================
  renderWorldClock(container) {
    container.innerHTML = `
      <div style="margin-bottom: 1.5rem; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <h3 style="font-size:1.4rem; font-weight:700; color:#fff;">Global Timezones</h3>
          <p style="color:var(--text-muted); font-size:0.9rem;">Real-time synchronized clocks around the world</p>
        </div>
        <div style="display:flex; gap:0.5rem; align-items:center;">
          <span style="font-size:0.85rem; color:var(--text-muted);">Format:</span>
          <button class="step-btn active" id="wclock-24h-btn">24h</button>
          <button class="step-btn" id="wclock-12h-btn">12h (AM/PM)</button>
        </div>
      </div>

      <div class="tools-grid" id="wclock-cards-grid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));"></div>
    `;

    const cities = [
      { name: 'UTC / GMT', tz: 'UTC', flag: '🌐', color: 'cyan' },
      { name: 'New York (EDT/EST)', tz: 'America/New_York', flag: '🇺🇸', color: 'purple' },
      { name: 'London (BST/GMT)', tz: 'Europe/London', flag: '🇬🇧', color: 'rose' },
      { name: 'Paris (CEST/CET)', tz: 'Europe/Paris', flag: '🇫🇷', color: 'emerald' },
      { name: 'Dubai (GST)', tz: 'Asia/Dubai', flag: '🇦🇪', color: 'amber' },
      { name: 'Mumbai / New Delhi (IST)', tz: 'Asia/Kolkata', flag: '🇮🇳', color: 'cyan' },
      { name: 'Singapore (SGT)', tz: 'Asia/Singapore', flag: '🇸🇬', color: 'emerald' },
      { name: 'Tokyo (JST)', tz: 'Asia/Tokyo', flag: '🇯🇵', color: 'rose' },
      { name: 'Sydney (AEST)', tz: 'Australia/Sydney', flag: '🇦🇺', color: 'purple' }
    ];

    let is24h = true;
    const grid = container.querySelector('#wclock-cards-grid');
    const btn24 = container.querySelector('#wclock-24h-btn');
    const btn12 = container.querySelector('#wclock-12h-btn');

    btn24.addEventListener('click', () => {
      is24h = true;
      btn24.classList.add('active');
      btn12.classList.remove('active');
      updateClocks();
    });

    btn12.addEventListener('click', () => {
      is24h = false;
      btn12.classList.add('active');
      btn24.classList.remove('active');
      updateClocks();
    });

    function updateClocks() {
      const now = new Date();
      grid.innerHTML = '';

      cities.forEach(c => {
        const timeStr = now.toLocaleTimeString('en-US', {
          timeZone: c.tz,
          hour12: !is24h,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });

        const dateStr = now.toLocaleDateString('en-US', {
          timeZone: c.tz,
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        });

        const card = document.createElement('div');
        card.className = 'tool-card';
        card.style.cursor = 'default';
        card.innerHTML = `
          <div class="tool-card-top">
            <div style="font-size:2rem;">${c.flag}</div>
            <span class="tool-category-badge text-${c.color}">${c.tz}</span>
          </div>
          <h3 class="tool-card-title" style="margin-top:0.5rem; margin-bottom:0.25rem;">${c.name}</h3>
          <div style="font-family:var(--font-mono); font-size:2rem; font-weight:800; color:#fff; letter-spacing:1px; margin: 0.5rem 0;">
            ${timeStr}
          </div>
          <div style="font-size:0.85rem; color:var(--text-muted);"><i class="fa-regular fa-calendar"></i> ${dateStr}</div>
        `;
        grid.appendChild(card);
      });
    }

    updateClocks();
    const interval = setInterval(updateClocks, 1000);

    // Cleanup interval if user leaves tool
    const onHash = () => {
      clearInterval(interval);
      window.removeEventListener('hashchange', onHash);
    };
    window.addEventListener('hashchange', onHash);
  },

  // ==========================================
  // 2. Stopwatch & Precision Lap Timer
  // ==========================================
  renderStopwatch(container) {
    container.innerHTML = `
      <div style="max-width: 650px; margin: 0 auto; text-align: center;">
        <div class="tool-canvas-card" style="padding: 2.5rem 1.5rem; margin-bottom: 1.5rem;">
          <div id="sw-display" style="font-family: var(--font-mono); font-size: 4rem; font-weight: 800; color: #fff; letter-spacing: 2px;">
            00:00:00.<span style="font-size: 2.5rem; color: var(--accent-cyan);" id="sw-ms">000</span>
          </div>

          <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 2rem;">
            <button class="btn btn-primary" id="sw-start-btn" style="min-width: 130px; font-size: 1.1rem; padding: 0.8rem 1.5rem;">
              <i class="fa-solid fa-play"></i> Start
            </button>
            <button class="btn btn-secondary" id="sw-lap-btn" disabled style="min-width: 100px; font-size: 1.1rem; padding: 0.8rem 1.25rem;">
              <i class="fa-solid fa-flag"></i> Lap
            </button>
            <button class="btn btn-secondary" id="sw-reset-btn" disabled style="min-width: 100px; font-size: 1.1rem; padding: 0.8rem 1.25rem;">
              <i class="fa-solid fa-rotate-left"></i> Reset
            </button>
          </div>
        </div>

        <div class="tool-preview-panel" style="text-align: left;">
          <div class="tool-panel-header">
            <h4><i class="fa-solid fa-list-ol text-purple"></i> Lap Times Recorded (<span id="sw-lap-count">0</span>)</h4>
            <button class="btn btn-sm btn-secondary" id="sw-copy-laps" disabled><i class="fa-solid fa-copy"></i> Copy</button>
          </div>

          <div id="sw-laps-container" style="max-height: 250px; overflow-y: auto;">
            <div style="text-align: center; color: var(--text-muted); padding: 2rem;">Press "Lap" while running to log splits</div>
          </div>
        </div>
      </div>
    `;

    let startTime = 0;
    let elapsed = 0;
    let timerId = null;
    let laps = [];

    const disp = container.querySelector('#sw-display');
    const startBtn = container.querySelector('#sw-start-btn');
    const lapBtn = container.querySelector('#sw-lap-btn');
    const resetBtn = container.querySelector('#sw-reset-btn');
    const lapsContainer = container.querySelector('#sw-laps-container');
    const lapCount = container.querySelector('#sw-lap-count');
    const copyLapsBtn = container.querySelector('#sw-copy-laps');

    function formatTime(ms) {
      const h = Math.floor(ms / 3600000);
      const m = Math.floor((ms % 3600000) / 60000);
      const s = Math.floor((ms % 60000) / 1000);
      const milli = ms % 1000;
      return {
        full: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`,
        ms: String(milli).padStart(3, '0')
      };
    }

    function renderDisplay(ms) {
      const f = formatTime(ms);
      disp.innerHTML = `${f.full}.<span style="font-size: 2.5rem; color: var(--accent-cyan);">${f.ms}</span>`;
    }

    function renderLaps() {
      if (!laps.length) {
        lapsContainer.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 2rem;">Press "Lap" while running to log splits</div>`;
        copyLapsBtn.disabled = true;
        return;
      }

      copyLapsBtn.disabled = false;
      lapCount.textContent = laps.length;
      lapsContainer.innerHTML = '';

      laps.slice().reverse().forEach((l, i) => {
        const lapNum = laps.length - i;
        const row = document.createElement('div');
        row.style.cssText = 'display:flex; justify-content:space-between; padding:0.6rem 1rem; border-bottom:1px solid var(--border-subtle); font-family:var(--font-mono);';
        row.innerHTML = `
          <span><i class="fa-solid fa-flag text-purple"></i> Lap ${lapNum}</span>
          <span style="color:var(--text-muted);">+ ${formatTime(l.split).full}.${formatTime(l.split).ms}</span>
          <span class="text-white font-bold">${formatTime(l.total).full}.${formatTime(l.total).ms}</span>
        `;
        lapsContainer.appendChild(row);
      });
    }

    startBtn.addEventListener('click', () => {
      if (!timerId) {
        startTime = performance.now() - elapsed;
        timerId = setInterval(() => {
          elapsed = Math.floor(performance.now() - startTime);
          renderDisplay(elapsed);
        }, 16);
        startBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
        startBtn.className = 'btn btn-secondary text-amber';
        lapBtn.disabled = false;
        resetBtn.disabled = false;
      } else {
        clearInterval(timerId);
        timerId = null;
        startBtn.innerHTML = '<i class="fa-solid fa-play"></i> Resume';
        startBtn.className = 'btn btn-primary';
      }
    });

    lapBtn.addEventListener('click', () => {
      if (!timerId) return;
      const prevTotal = laps.length ? laps[laps.length - 1].total : 0;
      const split = elapsed - prevTotal;
      laps.push({ split, total: elapsed });
      renderLaps();
    });

    resetBtn.addEventListener('click', () => {
      clearInterval(timerId);
      timerId = null;
      elapsed = 0;
      laps = [];
      renderDisplay(0);
      lapCount.textContent = '0';
      renderLaps();
      startBtn.innerHTML = '<i class="fa-solid fa-play"></i> Start';
      startBtn.className = 'btn btn-primary';
      lapBtn.disabled = true;
      resetBtn.disabled = true;
    });

    copyLapsBtn.addEventListener('click', () => {
      const txt = laps.map((l, idx) => `Lap ${idx + 1}: Split +${formatTime(l.split).full}.${formatTime(l.split).ms} | Total ${formatTime(l.total).full}.${formatTime(l.total).ms}`).join('\n');
      App.copyToClipboard(txt, 'Lap times copied!');
    });
  },

  // ==========================================
  // 3. Pomodoro Productivity Timer
  // ==========================================
  renderPomodoro(container) {
    container.innerHTML = `
      <div style="max-width: 600px; margin: 0 auto; text-align: center;">
        <div style="display:flex; justify-content:center; gap:0.5rem; margin-bottom:1.5rem;">
          <button class="step-btn active" id="pomo-mode-focus">🧠 25m Focus</button>
          <button class="step-btn" id="pomo-mode-short">☕ 5m Short Break</button>
          <button class="step-btn" id="pomo-mode-long">🌴 15m Long Break</button>
        </div>

        <div class="tool-canvas-card" style="padding:3rem 1.5rem; margin-bottom:1.5rem; position:relative; overflow:hidden;">
          <div id="pomo-display" style="font-family:var(--font-mono); font-size:4.5rem; font-weight:800; color:#fff; letter-spacing:2px; line-height:1;">
            25:00
          </div>
          <div id="pomo-status" style="font-size:1rem; color:var(--accent-purple); font-weight:600; margin-top:0.75rem;">
            Deep Focus Session
          </div>

          <div style="display:flex; justify-content:center; gap:1rem; margin-top:2rem;">
            <button class="btn btn-primary" id="pomo-btn-toggle" style="min-width:140px; font-size:1.1rem; padding:0.8rem 1.5rem;">
              <i class="fa-solid fa-play"></i> Start Session
            </button>
            <button class="btn btn-secondary" id="pomo-btn-reset" style="min-width:110px; font-size:1.1rem; padding:0.8rem 1.25rem;">
              <i class="fa-solid fa-rotate-left"></i> Reset
            </button>
          </div>
        </div>

        <div class="info-tip-box" style="justify-content:center;">
          <i class="fa-solid fa-circle-check text-emerald"></i>
          <span>Sessions completed today: <strong class="text-white" id="pomo-completed-count">0</strong></span>
        </div>
      </div>
    `;

    let duration = 25 * 60;
    let remaining = duration;
    let timerId = null;
    let completed = 0;
    let currentMode = 'focus';

    const disp = container.querySelector('#pomo-display');
    const statusText = container.querySelector('#pomo-status');
    const toggleBtn = container.querySelector('#pomo-btn-toggle');
    const resetBtn = container.querySelector('#pomo-btn-reset');
    const countEl = container.querySelector('#pomo-completed-count');

    const focusBtn = container.querySelector('#pomo-mode-focus');
    const shortBtn = container.querySelector('#pomo-mode-short');
    const longBtn = container.querySelector('#pomo-mode-long');

    function updateDisplay() {
      const m = Math.floor(remaining / 60);
      const s = remaining % 60;
      disp.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    function setMode(mode, mins, label) {
      clearInterval(timerId);
      timerId = null;
      currentMode = mode;
      duration = mins * 60;
      remaining = duration;
      statusText.textContent = label;
      toggleBtn.innerHTML = '<i class="fa-solid fa-play"></i> Start Session';
      toggleBtn.className = 'btn btn-primary';

      focusBtn.classList.toggle('active', mode === 'focus');
      shortBtn.classList.toggle('active', mode === 'short');
      longBtn.classList.toggle('active', mode === 'long');

      updateDisplay();
    }

    focusBtn.addEventListener('click', () => setMode('focus', 25, 'Deep Focus Session'));
    shortBtn.addEventListener('click', () => setMode('short', 5, 'Quick Rest & Hydrate'));
    longBtn.addEventListener('click', () => setMode('long', 15, 'Extended Recovery Break'));

    toggleBtn.addEventListener('click', () => {
      if (!timerId) {
        timerId = setInterval(() => {
          remaining--;
          updateDisplay();

          if (remaining <= 0) {
            clearInterval(timerId);
            timerId = null;
            TimeTools.playChime();
            App.showToast(`Pomodoro session ended! Great job.`, 'success');
            if (currentMode === 'focus') {
              completed++;
              countEl.textContent = completed;
              setMode('short', 5, 'Quick Rest & Hydrate');
            } else {
              setMode('focus', 25, 'Deep Focus Session');
            }
          }
        }, 1000);
        toggleBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
        toggleBtn.className = 'btn btn-secondary text-amber';
      } else {
        clearInterval(timerId);
        timerId = null;
        toggleBtn.innerHTML = '<i class="fa-solid fa-play"></i> Resume';
        toggleBtn.className = 'btn btn-primary';
      }
    });

    resetBtn.addEventListener('click', () => {
      clearInterval(timerId);
      timerId = null;
      remaining = duration;
      updateDisplay();
      toggleBtn.innerHTML = '<i class="fa-solid fa-play"></i> Start Session';
      toggleBtn.className = 'btn btn-primary';
    });

    updateDisplay();
  },

  // ==========================================
  // 4. Unix Timestamp Converter
  // ==========================================
  renderTimestampConverter(container) {
    container.innerHTML = `
      <div class="tool-workspace-grid">
        <div class="tool-control-panel">
          <div class="tool-panel-header">
            <h4><i class="fa-solid fa-clock text-cyan"></i> Unix Timestamp Engine</h4>
            <span class="badge badge-cyan">Epoch Time</span>
          </div>

          <div class="tool-field-group">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
              <label class="tool-field-label">Current Live Epoch (Sec)</label>
              <button class="btn btn-sm btn-secondary" id="ts-btn-now">Current Time</button>
            </div>
            <input type="number" id="ts-input-epoch" class="tool-input" style="font-family:var(--font-mono); font-size:1.1rem; font-weight:700;">
          </div>

          <div style="text-align:center; margin:1rem 0;">
            <span style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px;">Or pick calendar date</span>
          </div>

          <div class="tool-field-group">
            <label class="tool-field-label">Date & Time Picker</label>
            <input type="datetime-local" id="ts-input-datetime" class="tool-input">
          </div>
        </div>

        <div class="tool-preview-panel">
          <div class="tool-panel-header">
            <h4><i class="fa-solid fa-calendar-check text-emerald"></i> Converted Human Dates</h4>
          </div>

          <div class="calc-results-card">
            <div class="calc-stat-grid" style="grid-template-columns: 1fr;">
              <div class="calc-stat-box" style="cursor:pointer;" id="ts-copy-utc">
                <span class="label">UTC Time Format (ISO 8601)</span>
                <span class="val text-cyan" id="ts-val-utc">--</span>
              </div>
              <div class="calc-stat-box" style="cursor:pointer;" id="ts-copy-local">
                <span class="label">Your Local Time</span>
                <span class="val text-emerald" id="ts-val-local">--</span>
              </div>
              <div class="calc-stat-box" style="cursor:pointer;" id="ts-copy-ms">
                <span class="label">Milliseconds Epoch (ms)</span>
                <span class="val text-purple" id="ts-val-ms">--</span>
              </div>
              <div class="calc-stat-box" style="cursor:pointer;" id="ts-copy-rel">
                <span class="label">Relative Difference</span>
                <span class="val text-amber" id="ts-val-relative">--</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const epochIn = container.querySelector('#ts-input-epoch');
    const dtIn = container.querySelector('#ts-input-datetime');
    const nowBtn = container.querySelector('#ts-btn-now');

    const utcVal = container.querySelector('#ts-val-utc');
    const localVal = container.querySelector('#ts-val-local');
    const msVal = container.querySelector('#ts-val-ms');
    const relVal = container.querySelector('#ts-val-relative');

    function updateFromDate(d) {
      if (isNaN(d.getTime())) return;
      const sec = Math.floor(d.getTime() / 1000);
      epochIn.value = sec;

      const offset = d.getTimezoneOffset() * 60000;
      const localISOTime = (new Date(d.getTime() - offset)).toISOString().slice(0, 16);
      dtIn.value = localISOTime;

      utcVal.textContent = d.toUTCString();
      localVal.textContent = d.toString();
      msVal.textContent = `${d.getTime()} ms`;

      const now = Date.now();
      const diffSec = Math.round((d.getTime() - now) / 1000);
      if (Math.abs(diffSec) < 5) {
        relVal.textContent = 'Right now';
      } else if (diffSec > 0) {
        relVal.textContent = `In ${formatDiff(diffSec)}`;
      } else {
        relVal.textContent = `${formatDiff(-diffSec)} ago`;
      }
    }

    function formatDiff(sec) {
      if (sec < 60) return `${sec} seconds`;
      if (sec < 3600) return `${Math.floor(sec / 60)} minutes`;
      if (sec < 86400) return `${Math.floor(sec / 3600)} hours`;
      return `${Math.floor(sec / 86400)} days`;
    }

    epochIn.addEventListener('input', () => {
      let val = parseInt(epochIn.value, 10);
      if (isNaN(val)) return;
      // If entered as milliseconds
      if (val > 100000000000) val = Math.floor(val / 1000);
      updateFromDate(new Date(val * 1000));
    });

    dtIn.addEventListener('input', () => {
      if (dtIn.value) updateFromDate(new Date(dtIn.value));
    });

    nowBtn.addEventListener('click', () => updateFromDate(new Date()));

    updateFromDate(new Date());
  }
};
