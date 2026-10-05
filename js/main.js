/**
 * LBEF HOOP FEST 2026 - Master Core JavaScript
 * Shared utilities, navigation, session state, interactive countdown, modals & toasts
 * Lord Buddha Education Foundation, Kathmandu, Nepal
 */

// Default Seed Data with October 25 - 30, 2026 Dates
const DEFAULT_TEAMS = [
  { id: 'T01', name: 'Cyber Warriors', faculty: 'Faculty of IT', seed: 1, captain: 'Aayush Shrestha', won: 3, lost: 0, points: 6, logoIcon: 'sports_martial_arts' },
  { id: 'T02', name: 'Tech Titans', faculty: 'Faculty of CS', seed: 3, captain: 'Rohan Maharjan', won: 2, lost: 1, points: 5, logoIcon: 'bolt' },
  { id: 'T03', name: 'KTM Dunkers', faculty: 'Business School', seed: 2, captain: 'Prashant Thapa', won: 3, lost: 0, points: 6, logoIcon: 'sports_basketball' },
  { id: 'T04', name: 'APU Thunderbolts', faculty: 'Exchange Team (Malaysia)', seed: 4, captain: 'Darren Lee', won: 2, lost: 1, points: 5, logoIcon: 'electric_bolt' },
  { id: 'T05', name: 'Maitidevi Mavericks', faculty: 'Dept of Data Science', seed: 5, captain: 'Suman Rai', won: 1, lost: 2, points: 4, logoIcon: 'flash_on' },
  { id: 'T06', name: 'Cloud Hawks', faculty: 'Cloud Computing Faculty', seed: 6, captain: 'Bibek Sharma', won: 1, lost: 2, points: 4, logoIcon: 'military_tech' },
  { id: 'T07', name: 'Apex Legends', faculty: 'MBA Executive', seed: 7, captain: 'Nitesh Joshi', won: 0, lost: 3, points: 3, logoIcon: 'shield' },
  { id: 'T08', name: 'Kathmandu Vipers', faculty: 'BBA Digital', seed: 8, captain: 'Anish Karki', won: 0, lost: 3, points: 3, logoIcon: 'pets' }
];

const DEFAULT_MATCHES = [
  {
    id: 'CER-01',
    round: 'Ceremony',
    date: 'October 25, 2026',
    time: '08:30 AM NPT',
    court: 'Court 1 - Main Arena',
    team1: 'All 16 Participating Teams',
    team2: 'Athletic Council',
    status: 'Completed',
    score1: '-',
    score2: '-',
    highlights: 'Grand Opening Ceremony featuring the Parade of Nations, Torch Relay, and Official Oath by LBEF & APU leadership.',
    referee: 'Organizing Committee'
  },
  {
    id: 'M01',
    round: 'Group Stage',
    date: 'October 25, 2026',
    time: '10:00 AM NPT',
    court: 'Court 1 - Main Arena',
    team1: 'Cyber Warriors',
    team2: 'Cloud Hawks',
    score1: 78,
    score2: 65,
    status: 'Completed',
    highlights: 'Cyber Warriors dominated perimeter scoring with 12 three-pointers.',
    referee: 'Sudip Shakya (FIBA Nepal)'
  },
  {
    id: 'M02',
    round: 'Group Stage',
    date: 'October 25, 2026',
    time: '12:30 PM NPT',
    court: 'Court 2 - East Wing',
    team1: 'KTM Dunkers',
    team2: 'Apex Legends',
    score1: 82,
    score2: 70,
    status: 'Completed',
    highlights: 'High-intensity fastbreaks led by captain Prashant Thapa.',
    referee: 'Ramesh Adhikari'
  },
  {
    id: 'M03',
    round: 'Group Stage',
    date: 'October 25, 2026',
    time: '03:00 PM NPT',
    court: 'Court 1 - Main Arena',
    team1: 'Tech Titans',
    team2: 'Maitidevi Mavericks',
    score1: 68,
    score2: 71,
    status: 'Completed',
    highlights: 'Thrilling buzzer beater in the final 4 seconds by Mavericks.',
    referee: 'Dipendra KC'
  },
  {
    id: 'M04',
    round: 'Round of 16',
    date: 'October 26, 2026',
    time: '11:00 AM NPT',
    court: 'Court 1 - Main Arena',
    team1: 'Cyber Warriors',
    team2: 'Tech Titans',
    score1: 52,
    score2: 49,
    status: 'Live',
    currentQuarter: '4th Quarter - 02:15 remaining',
    highlights: 'Electric rivalry clash with live student streaming broadcast.',
    referee: 'Sudip Shakya (FIBA Nepal)'
  },
  {
    id: 'M05',
    round: 'Quarterfinals',
    date: 'October 27, 2026',
    time: '02:30 PM NPT',
    court: 'Court 1 - Main Arena',
    team1: 'KTM Dunkers',
    team2: 'APU Thunderbolts',
    score1: 0,
    score2: 0,
    status: 'Upcoming',
    highlights: 'Cross-border collegiate clash between Kathmandu and APU Kuala Lumpur.',
    referee: 'Binod Karki'
  },
  {
    id: 'M06',
    round: 'Quarterfinals',
    date: 'October 27, 2026',
    time: '05:00 PM NPT',
    court: 'Court 1 - Main Arena',
    team1: 'Cyber Warriors',
    team2: 'Maitidevi Mavericks',
    score1: 0,
    score2: 0,
    status: 'Upcoming',
    highlights: 'Rematch of the 2025 Inter-Faculty Semifinals.',
    referee: 'Ramesh Adhikari'
  },
  {
    id: 'M07',
    round: 'Semifinals',
    date: 'October 28, 2026',
    time: '01:00 PM NPT',
    court: 'Court 1 - Main Arena',
    team1: 'Winner QF 1',
    team2: 'Winner QF 2',
    score1: 0,
    score2: 0,
    status: 'Upcoming',
    highlights: 'Semifinal Battle for the Grand Championship ticket.',
    referee: 'FIBA Nepal Senior Panel'
  },
  {
    id: 'M08',
    round: 'Final',
    date: 'October 30, 2026',
    time: '04:00 PM NPT',
    court: 'Court 1 - Main Arena',
    team1: 'Finalist 1',
    team2: 'Finalist 2',
    score1: 0,
    score2: 0,
    status: 'Upcoming',
    highlights: 'The Grand Finale. Trophy elevation and closing ceremony.',
    referee: 'International Guest Official (Malaysia)'
  }
];

// Initialize Storage
function initStorage() {
  localStorage.setItem('lbef_matches', JSON.stringify(DEFAULT_MATCHES));
  if (!localStorage.getItem('lbef_teams')) {
    localStorage.setItem('lbef_teams', JSON.stringify(DEFAULT_TEAMS));
  }
  if (!localStorage.getItem('lbef_volunteers')) {
    localStorage.setItem('lbef_volunteers', JSON.stringify([]));
  }
  if (!localStorage.getItem('lbef_inquiries')) {
    localStorage.setItem('lbef_inquiries', JSON.stringify([]));
  }
  if (!localStorage.getItem('lbef_feedback')) {
    localStorage.setItem('lbef_feedback', JSON.stringify([]));
  }
}

// Set Active Navigation Link
function initNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-menu a, .mobile-nav-list a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  const currentUser = localStorage.getItem('lbef_current_user');
  const authNavSlots = document.querySelectorAll('.auth-nav-slot');
  authNavSlots.forEach(slot => {
    if (currentUser) {
      const user = JSON.parse(currentUser);
      slot.innerHTML = `
        <a href="dashboard.html" class="btn btn-secondary btn-sm" title="${user.name}">
          <span class="material-symbols-outlined text-sm">dashboard</span>
          <span>${user.role === 'Captain' ? 'Team Hub' : 'Dashboard'}</span>
        </a>
      `;
    }
  });
}

function toggleMobileMenu() {
  const drawer = document.getElementById('mobile-drawer');
  if (drawer) {
    drawer.classList.toggle('open');
  }
}

/* ==========================================================================
   INTERACTIVE TIP-OFF COUNTDOWN (STARTS OCTOBER 25, 2026)
   ========================================================================== */
let countdownUnitMode = 'standard'; // 'standard' | 'hours' | 'minutes' | 'seconds'
let countdownTimezone = 'NPT'; // 'NPT' (UTC+5:45) | 'MYT' (UTC+8) | 'LOCAL'
let simulationOffset = 0; // ms offset for interactive testing
let countdownSoundEnabled = false;
let audioCtx = null;

// Target: October 25, 2026 09:00:00 NPT (UTC+5:45) = 2026-10-25T03:15:00.000Z
const TIPOFF_UTC_TIMESTAMP = Date.UTC(2026, 9, 25, 3, 15, 0); // Month is 0-indexed: 9 = October

function initCountdown() {
  const container = document.getElementById('countdown-grid-container') || document.querySelector('.countdown-box');
  if (!container) return;

  function update() {
    const now = Date.now() + simulationOffset;
    const distance = TIPOFF_UTC_TIMESTAMP - now;

    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minsEl = document.getElementById('countdown-minutes');
    const secsEl = document.getElementById('countdown-seconds');
    const liveTagEl = document.getElementById('countdown-live-badge');
    const secsItem = document.getElementById('countdown-item-seconds');

    if (secsItem) {
      secsItem.classList.add('tick-active');
      setTimeout(() => secsItem.classList.remove('tick-active'), 300);
    }

    if (countdownSoundEnabled && distance > 0) {
      playSoftTick();
    }

    if (distance > 0) {
      const totalSeconds = Math.floor(distance / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const totalDays = Math.floor(totalHours / 24);

      if (countdownUnitMode === 'standard') {
        const days = totalDays;
        const hours = totalHours % 24;
        const minutes = totalMinutes % 60;
        const seconds = totalSeconds % 60;

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
        if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
      } else if (countdownUnitMode === 'hours') {
        const hours = totalHours;
        const minutes = totalMinutes % 60;
        const seconds = totalSeconds % 60;
        const tenths = Math.floor((distance % 1000) / 100);

        if (daysEl) daysEl.textContent = String(hours);
        if (hoursEl) hoursEl.textContent = String(minutes).padStart(2, '0');
        if (minsEl) minsEl.textContent = String(seconds).padStart(2, '0');
        if (secsEl) secsEl.textContent = String(tenths) + '0';
      } else if (countdownUnitMode === 'minutes') {
        if (daysEl) daysEl.textContent = String(totalMinutes);
        if (hoursEl) hoursEl.textContent = String(totalSeconds % 60).padStart(2, '0');
        if (minsEl) minsEl.textContent = '00';
        if (secsEl) secsEl.textContent = '00';
      } else if (countdownUnitMode === 'seconds') {
        if (daysEl) daysEl.textContent = String(totalSeconds);
      }
      
      if (liveTagEl) {
        liveTagEl.innerHTML = '<span class="pulse-dot"></span> Official Tip-off Countdown';
        liveTagEl.style.color = 'var(--court-orange)';
      }
    } else {
      // Reached zero - Live Game State
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minsEl) minsEl.textContent = '00';
      if (secsEl) secsEl.textContent = '00';
      
      if (liveTagEl) {
        liveTagEl.innerHTML = '<span class="pulse-dot" style="background:#00e676;"></span> TOURNAMENT IS LIVE!';
        liveTagEl.style.color = '#00e676';
      }
    }
  }

  update();
  setInterval(update, 1000);
}

// Interactive Audio Chime (Web Audio API Synthesizer)
function toggleCountdownSound(btn) {
  countdownSoundEnabled = !countdownSoundEnabled;
  if (countdownSoundEnabled && !audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (btn) {
    btn.classList.toggle('active', countdownSoundEnabled);
    btn.innerHTML = countdownSoundEnabled 
      ? '<span class="material-symbols-outlined" style="font-size: 15px;">volume_up</span> Sound: ON'
      : '<span class="material-symbols-outlined" style="font-size: 15px;">volume_off</span> Sound: OFF';
  }
  showToast(countdownSoundEnabled ? 'Countdown sound enabled (gentle arena tick)' : 'Countdown sound muted', 'info');
}

function playSoftTick() {
  if (!countdownSoundEnabled || !audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.04);
  } catch(e) {}
}

function playArenaBuzzer() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.8);
  } catch(e) {}
}

// Interactive Simulation / Fast-Forward Tester
function simulateCountdown(mode) {
  const now = Date.now();
  if (mode === '10s') {
    simulationOffset = (TIPOFF_UTC_TIMESTAMP - now) - 10000;
    showToast('Simulation: Fast-forwarded to 10 seconds before tip-off!', 'info');
  } else if (mode === 'live') {
    simulationOffset = (TIPOFF_UTC_TIMESTAMP - now) + 3600000;
    playArenaBuzzer();
    showToast('Simulation: Game Tip-off reached! Tournament is LIVE! 🏀', 'success');
  } else {
    simulationOffset = 0;
    showToast('Reset to authentic October 25, 2026 countdown.', 'info');
  }
}

// Click on individual countdown digits for stat breakdown
function inspectCountdownDigit(unit) {
  const now = Date.now() + simulationOffset;
  const distance = Math.max(0, TIPOFF_UTC_TIMESTAMP - now);
  const totalSeconds = Math.floor(distance / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  let title = '';
  let msg = '';

  if (unit === 'days') {
    title = `${totalDays} Days Until Tip-Off`;
    msg = `Exactly ${totalDays} full days remain until the Grand Opening Ceremony at LBEF Maitidevi Arena on Sunday, October 25, 2026. Teams are currently in intense training and conditioning camps.`;
  } else if (unit === 'hours') {
    title = `${totalHours} Hours of Preparation`;
    msg = `A cumulative total of ${totalHours.toLocaleString()} hours until the first whistle blows. Roster registrations close 7 days prior on October 18, 2026.`;
  } else if (unit === 'mins') {
    title = `${totalMinutes.toLocaleString()} Minutes Remaining`;
    msg = `Every minute brings us closer to Nepal's collegiate basketball spectacle. Join as a volunteer or register your inter-faculty squad now!`;
  } else if (unit === 'secs') {
    title = `${totalSeconds.toLocaleString()} Seconds on the Clock`;
    msg = `The live clock is ticking down to the jump ball. Watch live match streams and cheer for your faculty!`;
  }

  const content = document.getElementById('modal-content-generic');
  if (content) {
    content.innerHTML = `
      <div style="text-align: center; margin-bottom: 16px;">
        <span class="badge-tag badge-category" style="margin-bottom: 8px;">Countdown Breakdown</span>
        <h3 style="font-family: var(--font-display); font-size: 22px; color: var(--pure-white);">${title}</h3>
        <p style="font-size: 14px; color: var(--secondary); margin-top: 10px; line-height: 1.6;">${msg}</p>
      </div>
      <div style="background: var(--surface-low); border: 1px solid var(--court-border); padding: 14px; border-radius: var(--radius-sm); margin-bottom: 20px;">
        <div style="font-size: 11px; font-weight: 700; color: var(--court-orange); text-transform: uppercase;">Official Date &amp; Time</div>
        <div style="font-size: 15px; font-weight: 700; color: var(--pure-white); margin-top: 2px;">Sunday, October 25, 2026 &bull; 09:00 AM NPT</div>
        <div style="font-size: 12px; color: var(--secondary); margin-top: 2px;">Lord Buddha Education Foundation, Maitidevi, Kathmandu</div>
      </div>
      <div style="display: flex; gap: 10px; justify-content: flex-end;">
        <button class="btn btn-secondary btn-sm" onclick="downloadTipoffICS()">
          <span class="material-symbols-outlined" style="font-size: 15px;">calendar_add_on</span>
          <span>Add to Calendar</span>
        </button>
        <button class="btn btn-primary btn-sm" onclick="closeModal('modal-generic')">Close</button>
      </div>
    `;
    openModal('modal-generic');
  }
}

// Switch Countdown Unit Mode
function switchCountdownUnit(mode, btn) {
  countdownUnitMode = mode;
  document.querySelectorAll('.countdown-unit-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const labelDays = document.getElementById('label-countdown-days');
  const labelHours = document.getElementById('label-countdown-hours');
  const labelMins = document.getElementById('label-countdown-mins');
  const labelSecs = document.getElementById('label-countdown-secs');
  const grid = document.getElementById('countdown-grid-container');

  if (mode === 'standard') {
    if (grid) grid.className = 'countdown-grid';
    if (labelDays) labelDays.textContent = 'Days';
    if (labelHours) labelHours.textContent = 'Hours';
    if (labelMins) labelMins.textContent = 'Mins';
    if (labelSecs) labelSecs.textContent = 'Secs';
    document.querySelectorAll('.countdown-col-std').forEach(col => col.style.display = 'flex');
  } else if (mode === 'hours') {
    if (grid) grid.className = 'countdown-grid';
    if (labelDays) labelDays.textContent = 'Total Hours';
    if (labelHours) labelHours.textContent = 'Minutes';
    if (labelMins) labelMins.textContent = 'Seconds';
    if (labelSecs) labelSecs.textContent = 'Tenths';
    document.querySelectorAll('.countdown-col-std').forEach(col => col.style.display = 'flex');
  } else if (mode === 'minutes') {
    if (grid) grid.className = 'countdown-grid mode-dual';
    if (labelDays) labelDays.textContent = 'Total Minutes';
    if (labelHours) labelHours.textContent = 'Seconds';
  } else if (mode === 'seconds') {
    if (grid) grid.className = 'countdown-grid mode-single';
    if (labelDays) labelDays.textContent = 'Total Seconds to Tip-off';
  }

  showToast(`Countdown unit switched to ${mode.toUpperCase()}`, 'info');
}

// Switch Timezone
function switchCountdownTimezone(tz, btn) {
  countdownTimezone = tz;
  document.querySelectorAll('.countdown-tz-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const tzLabel = document.getElementById('countdown-tz-label');
  if (tzLabel) {
    if (tz === 'NPT') {
      tzLabel.textContent = 'Starts October 25, 2026 • 09:00 AM NPT (Kathmandu)';
    } else if (tz === 'MYT') {
      tzLabel.textContent = 'Starts October 25, 2026 • 11:15 AM MYT (APU Malaysia)';
    } else {
      const localTime = new Date(TIPOFF_UTC_TIMESTAMP).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
      tzLabel.textContent = `Starts: ${localTime} (Your Local Device Time)`;
    }
  }
  showToast(`Timezone adjusted to ${tz}`, 'info');
}

// Download 1-Click Tip-Off Calendar Event (.ics)
function downloadTipoffICS() {
  const icsContent = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Lord Buddha Education Foundation//LBEF HOOP FEST 2026//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:tipoff-oct25-2026@study.lbef.edu.np
DTSTAMP:20261001T000000Z
DTSTART:20261025T031500Z
DTEND:20261025T051500Z
SUMMARY:LBEF HOOP FEST 2026: Official Tip-off & Opening Clash
DESCRIPTION:Grand Opening Ceremony and tip-off of the LBEF Annual Basketball Championship 2026.
LOCATION:Lord Buddha Education Foundation Sports Complex, Maitidevi, Kathmandu, Nepal
STATUS:CONFIRMED
BEGIN:VALARM
TRIGGER:-PT24H
ACTION:DISPLAY
DESCRIPTION:LBEF Hoop Fest 2026 starts in 24 hours!
END:VALARM
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "LBEF-HoopFest-TipOff-Oct25-2026.ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('Calendar Reminder (.ics) downloaded for October 25, 2026!', 'success');
}

// Open Countdown Reminder Modal
function openCountdownReminder() {
  const content = document.getElementById('modal-content-generic');
  if (content) {
    content.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <span class="badge-tag badge-live" style="margin-bottom: 8px;">Tip-off Alert Notification</span>
        <h3 style="font-family: var(--font-display); font-size: 22px; color: var(--pure-white); text-transform: uppercase;">
          Set Tip-Off Reminder
        </h3>
        <p style="font-size: 13px; color: var(--secondary); margin-top: 4px;">
          Scheduled for <strong style="color: var(--court-orange);">October 25, 2026 at 09:00 AM NPT</strong> at Maitidevi Arena.
        </p>
      </div>

      <div style="background: var(--surface-low); border: 1px solid var(--court-border); padding: 16px; border-radius: var(--radius-sm); margin-bottom: 20px;">
        <label class="form-label" style="display: block; margin-bottom: 8px;">Select Alert Timing</label>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--secondary); cursor: pointer;">
            <input type="radio" name="tipoff_alert" value="24h" checked>
            <span>24 Hours Prior (October 24, 09:00 AM NPT)</span>
          </label>
          <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--secondary); cursor: pointer;">
            <input type="radio" name="tipoff_alert" value="2h">
            <span>2 Hours Before Tip-off (October 25, 07:00 AM NPT)</span>
          </label>
          <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--secondary); cursor: pointer;">
            <input type="radio" name="tipoff_alert" value="15m">
            <span>15 Minutes Prior (Starting Lineup Broadcast)</span>
          </label>
        </div>
      </div>

      <div style="margin-bottom: 20px;">
        <label class="form-label" for="reminder-email">Your Email / Student ID</label>
        <input type="email" id="reminder-email" class="form-input" style="width: 100%;" placeholder="e.g. student@study.lbef.edu.np" value="${localStorage.getItem('lbef_user_email') || ''}">
      </div>

      <div style="display: flex; gap: 10px; justify-content: flex-end;">
        <button class="btn btn-secondary btn-sm" onclick="closeModal('modal-generic')">Cancel</button>
        <button class="btn btn-primary btn-sm" onclick="saveCountdownReminder()">
          <span class="material-symbols-outlined" style="font-size: 16px;">notifications_active</span>
          <span>Save Alert</span>
        </button>
      </div>
    `;
    openModal('modal-generic');
  }
}

function saveCountdownReminder() {
  const alertTime = document.querySelector('input[name="tipoff_alert"]:checked')?.value || '24h';
  const email = document.getElementById('reminder-email')?.value.trim() || 'student@study.lbef.edu.np';

  const reminders = JSON.parse(localStorage.getItem('lbef_reminders') || '[]');
  reminders.push({ email, alertTime, targetDate: 'October 25, 2026', savedAt: new Date().toISOString() });
  localStorage.setItem('lbef_reminders', JSON.stringify(reminders));

  closeModal('modal-generic');
  showToast(`Reminder saved! We'll alert ${email} before tip-off on Oct 25, 2026.`, 'success');
}

// Toast Notifications
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icon = type === 'success' ? 'check_circle' : (type === 'error' ? 'error' : 'info');
  toast.innerHTML = `
    <span class="material-symbols-outlined" style="color: var(--court-orange)">${icon}</span>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Generic Modal System
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Back to Top Button
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Newsletter Form Handler
function handleNewsletter(event) {
  event.preventDefault();
  const input = event.target.querySelector('input[type="email"]');
  if (!input || !input.value) return;

  const email = input.value.trim();
  const subscribers = JSON.parse(localStorage.getItem('lbef_subscribers') || '[]');
  
  if (subscribers.includes(email)) {
    showToast('You are already subscribed to tournament updates!', 'info');
  } else {
    subscribers.push(email);
    localStorage.setItem('lbef_subscribers', JSON.stringify(subscribers));
    showToast('Subscribed! You will receive live October 25 tip-off bulletins.', 'success');
  }
  input.value = '';
}

// DOM Ready initialization
document.addEventListener('DOMContentLoaded', () => {
  initStorage();
  initNav();
  initCountdown();
  initBackToTop();

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModals = document.querySelectorAll('.modal-overlay.open');
      openModals.forEach(m => m.classList.remove('open'));
      document.body.style.overflow = '';
    }
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });
});

// Expose globals
window.toggleMobileMenu = toggleMobileMenu;
window.openModal = openModal;
window.closeModal = closeModal;
window.showToast = showToast;
window.handleNewsletter = handleNewsletter;
window.switchCountdownUnit = switchCountdownUnit;
window.switchCountdownTimezone = switchCountdownTimezone;
window.downloadTipoffICS = downloadTipoffICS;
window.openCountdownReminder = openCountdownReminder;
window.saveCountdownReminder = saveCountdownReminder;
window.toggleCountdownSound = toggleCountdownSound;
window.simulateCountdown = simulateCountdown;
window.inspectCountdownDigit = inspectCountdownDigit;
