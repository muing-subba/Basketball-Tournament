/**
 * LBEF HOOP FEST 2026 - Schedule Management Module
 * Filters, Search, Calendar .ics Generator, Print, & Match Details Modal
 * Tournament Dates: October 25 - 30, 2026
 */

const SCHEDULE_DATA = [
  {
    id: 'CER-01',
    round: 'Ceremony',
    date: '2026-10-25',
    dateDisplay: 'October 25, 2026',
    time: '08:30 AM NPT',
    court: 'Court 1 - Main Arena',
    team1: 'All 16 Participating Teams',
    team2: 'Athletic Council',
    status: 'Completed',
    score1: '-',
    score2: '-',
    isCeremony: true,
    details: 'Grand Opening Ceremony featuring the Parade of Nations, Torch Relay, and Official Oath by LBEF & APU leadership.'
  },
  {
    id: 'M01',
    round: 'Group Stage',
    date: '2026-10-25',
    dateDisplay: 'October 25, 2026',
    time: '10:00 AM NPT',
    court: 'Court 1 - Main Arena',
    team1: 'Cyber Warriors',
    team2: 'Cloud Hawks',
    status: 'Completed',
    score1: 78,
    score2: 65,
    referee: 'Sudip Shakya (FIBA Nepal)',
    details: 'Fastbreak dominance by Cyber Warriors with 12 three-pointers made. Crowd attendance: 650.'
  },
  {
    id: 'M02',
    round: 'Group Stage',
    date: '2026-10-25',
    dateDisplay: 'October 25, 2026',
    time: '12:30 PM NPT',
    court: 'Court 2 - East Wing',
    team1: 'KTM Dunkers',
    team2: 'Apex Legends',
    status: 'Completed',
    score1: 82,
    score2: 70,
    referee: 'Ramesh Adhikari',
    details: 'Physical post play dominated by KTM Dunkers center. 18 rebounds registered.'
  },
  {
    id: 'M03',
    round: 'Group Stage',
    date: '2026-10-25',
    dateDisplay: 'October 25, 2026',
    time: '03:00 PM NPT',
    court: 'Court 1 - Main Arena',
    team1: 'Tech Titans',
    team2: 'Maitidevi Mavericks',
    status: 'Completed',
    score1: 68,
    score2: 71,
    referee: 'Dipendra KC',
    details: 'Thrilling buzzer beater in the final 4 seconds by Mavericks forward.'
  },
  {
    id: 'M04',
    round: 'Group Stage',
    date: '2026-10-26',
    dateDisplay: 'October 26, 2026',
    time: '09:30 AM NPT',
    court: 'Court 2 - East Wing',
    team1: 'APU Thunderbolts',
    team2: 'Kathmandu Vipers',
    status: 'Completed',
    score1: 91,
    score2: 62,
    referee: 'Sunil Shrestha',
    details: 'Masterclass perimeter ball movement by guest team APU Thunderbolts.'
  },
  {
    id: 'M05',
    round: 'Group Stage',
    date: '2026-10-26',
    dateDisplay: 'October 26, 2026',
    time: '11:00 AM NPT',
    court: 'Court 1 - Main Arena',
    team1: 'Cyber Warriors',
    team2: 'Tech Titans',
    status: 'Live',
    score1: 52,
    score2: 49,
    referee: 'Sudip Shakya (FIBA Nepal)',
    details: '4th Quarter with 02:15 remaining. Electric atmosphere in Maitidevi Arena.'
  },
  {
    id: 'M06',
    round: 'Group Stage',
    date: '2026-10-26',
    dateDisplay: 'October 26, 2026',
    time: '02:00 PM NPT',
    court: 'Court 2 - East Wing',
    team1: 'Cloud Hawks',
    team2: 'Maitidevi Mavericks',
    status: 'Postponed',
    score1: '-',
    score2: '-',
    referee: 'Binod Karki',
    details: 'Rescheduled due to floor maintenance in East Wing. Rescheduled for 5:30 PM.'
  },
  {
    id: 'M07',
    round: 'Quarterfinals',
    date: '2026-10-27',
    dateDisplay: 'October 27, 2026',
    time: '11:00 AM NPT',
    court: 'Court 1 - Main Arena',
    team1: 'Cyber Warriors',
    team2: 'Maitidevi Mavericks',
    status: 'Upcoming',
    score1: '-',
    score2: '-',
    referee: 'Sudip Shakya',
    details: 'First quarterfinal elimination matchup. Single elimination format.'
  },
  {
    id: 'M08',
    round: 'Quarterfinals',
    date: '2026-10-27',
    dateDisplay: 'October 27, 2026',
    time: '02:30 PM NPT',
    court: 'Court 1 - Main Arena',
    team1: 'KTM Dunkers',
    team2: 'APU Thunderbolts',
    status: 'Upcoming',
    score1: '-',
    score2: '-',
    referee: 'Ramesh Adhikari',
    details: 'Highly anticipated international collegiate match.'
  },
  {
    id: 'M09',
    round: 'Quarterfinals',
    date: '2026-10-27',
    dateDisplay: 'October 27, 2026',
    time: '05:00 PM NPT',
    court: 'Court 1 - Main Arena',
    team1: 'Tech Titans',
    team2: 'Cloud Hawks',
    status: 'Upcoming',
    score1: '-',
    score2: '-',
    referee: 'Dipendra KC',
    details: 'Quarterfinal 3 showdown under floodlights.'
  },
  {
    id: 'M10',
    round: 'Semifinals',
    date: '2026-10-28',
    dateDisplay: 'October 28, 2026',
    time: '01:00 PM NPT',
    court: 'Court 1 - Main Arena',
    team1: 'Winner QF 1',
    team2: 'Winner QF 2',
    status: 'Upcoming',
    score1: '-',
    score2: '-',
    referee: 'FIBA Nepal Senior Panel',
    details: 'Winner advances to the championship game.'
  },
  {
    id: 'M11',
    round: 'Semifinals',
    date: '2026-10-28',
    dateDisplay: 'October 28, 2026',
    time: '04:00 PM NPT',
    court: 'Court 1 - Main Arena',
    team1: 'Winner QF 3',
    team2: 'Winner QF 4',
    status: 'Upcoming',
    score1: '-',
    score2: '-',
    referee: 'FIBA Nepal Senior Panel',
    details: 'Second finalist selection.'
  },
  {
    id: 'M12',
    round: '3rd Place',
    date: '2026-10-29',
    dateDisplay: 'October 29, 2026',
    time: '02:00 PM NPT',
    court: 'Court 1 - Main Arena',
    team1: 'Loser SF 1',
    team2: 'Loser SF 2',
    status: 'Upcoming',
    score1: '-',
    score2: '-',
    referee: 'Sudip Shakya',
    details: 'Bronze medal match and podium standing.'
  },
  {
    id: 'M13',
    round: 'Final',
    date: '2026-10-30',
    dateDisplay: 'October 30, 2026',
    time: '03:30 PM NPT',
    court: 'Court 1 - Main Arena',
    team1: 'Finalist Alpha',
    team2: 'Finalist Beta',
    status: 'Upcoming',
    score1: '-',
    score2: '-',
    referee: 'International Chief Official',
    details: 'Grand Finale for the LBEF Hoop Fest 2026 Championship Trophy & NPR 150,000 Prize Pool.'
  },
  {
    id: 'CER-02',
    round: 'Ceremony',
    date: '2026-10-30',
    dateDisplay: 'October 30, 2026',
    time: '06:00 PM NPT',
    court: 'Court 1 - Main Arena',
    team1: 'All Teams & Officials',
    team2: 'Dignitaries & Guests',
    status: 'Upcoming',
    score1: '-',
    score2: '-',
    isCeremony: true,
    details: 'Closing Ceremony, Trophy Awarding, MVP Honor, and Farewell Gala.'
  }
];

let activeFilters = {
  search: '',
  date: 'all',
  round: 'all',
  status: 'all'
};

function renderSchedule() {
  const container = document.getElementById('schedule-list-container');
  if (!container) return;

  const filtered = SCHEDULE_DATA.filter(item => {
    if (activeFilters.search) {
      const q = activeFilters.search.toLowerCase();
      const matchText = `${item.id} ${item.team1} ${item.team2} ${item.court} ${item.round}`.toLowerCase();
      if (!matchText.includes(q)) return false;
    }
    if (activeFilters.date !== 'all' && item.date !== activeFilters.date) {
      return false;
    }
    if (activeFilters.round !== 'all' && item.round !== activeFilters.round) {
      return false;
    }
    if (activeFilters.status !== 'all' && item.status.toLowerCase() !== activeFilters.status.toLowerCase()) {
      return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 48px; text-align: center; background: var(--varsity-navy); border-radius: var(--radius-md); border: 1px dashed var(--court-border);">
        <span class="material-symbols-outlined" style="font-size: 48px; color: var(--text-muted); margin-bottom: 12px;">event_busy</span>
        <h3 style="color: var(--pure-white); font-size: 18px; margin-bottom: 6px;">No Matches Found</h3>
        <p style="color: var(--secondary); font-size: 13px; max-width: 400px; margin: 0 auto 16px auto;">There are no scheduled fixtures matching your chosen filter criteria.</p>
        <button class="btn btn-secondary btn-sm" onclick="resetScheduleFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const isLive = item.status === 'Live';
    const isCeremony = item.isCeremony;
    let badgeClass = 'badge-upcoming';
    if (item.status === 'Live') badgeClass = 'badge-live';
    else if (item.status === 'Completed') badgeClass = 'badge-completed';
    else if (item.status === 'Postponed') badgeClass = 'badge-postponed';

    return `
      <div class="match-card ${isLive ? 'is-live' : ''}">
        <div class="match-card-header">
          <span class="badge-tag ${badgeClass}">
            ${isLive ? '<span class="pulse-dot" style="display:inline-block; margin-right:4px;"></span>' : ''}
            ${item.status.toUpperCase()}
          </span>
          <span style="font-size: 11px; font-weight: 600; color: var(--secondary); text-transform: uppercase;">
            ${item.id} &bull; ${item.round}
          </span>
        </div>

        <div style="font-size: 12px; color: var(--text-muted); display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <span class="material-symbols-outlined" style="font-size: 15px; color: var(--court-orange)">calendar_today</span>
          <span>${item.dateDisplay} &bull; ${item.time}</span>
        </div>
        <div style="font-size: 12px; color: var(--secondary); display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
          <span class="material-symbols-outlined" style="font-size: 15px; color: var(--court-orange)">stadium</span>
          <span>${item.court}</span>
        </div>

        ${isCeremony ? `
          <div style="padding: 16px; background: rgba(198, 40, 40, 0.15); border-left: 3px solid var(--institution-crimson); border-radius: var(--radius-sm); margin: 12px 0;">
            <div style="font-family: var(--font-display); font-size: 16px; font-weight: 700; color: var(--pure-white);">${item.team1}</div>
            <p style="font-size: 12px; color: var(--secondary); margin-top: 4px;">${item.details}</p>
          </div>
        ` : `
          <div class="match-teams-row">
            <div class="team-col">
              <div class="team-avatar">
                <span class="material-symbols-outlined" style="font-size: 26px;">sports_basketball</span>
              </div>
              <div class="team-name">${item.team1}</div>
            </div>

            <div class="vs-col">
              ${item.status === 'Completed' || item.status === 'Live' ? `
                <div class="score-display">${item.score1} - ${item.score2}</div>
              ` : `
                <div class="vs-badge">VS</div>
              `}
              <div class="round-sub">${item.round}</div>
            </div>

            <div class="team-col">
              <div class="team-avatar">
                <span class="material-symbols-outlined" style="font-size: 26px;">sports_basketball</span>
              </div>
              <div class="team-name">${item.team2}</div>
            </div>
          </div>
        `}

        <div class="match-card-footer">
          <span style="font-size: 11px; color: var(--text-muted);">
            ${item.referee ? `Ref: ${item.referee}` : 'Maitidevi Arena, Kathmandu'}
          </span>
          <button class="btn btn-secondary btn-sm" onclick="viewMatchDetails('${item.id}')">
            <span>Details</span>
            <span class="material-symbols-outlined" style="font-size: 14px;">visibility</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function viewMatchDetails(matchId) {
  const match = SCHEDULE_DATA.find(m => m.id === matchId);
  if (!match) return;

  const content = document.getElementById('match-modal-body');
  if (content) {
    content.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <span class="badge-tag badge-${match.status.toLowerCase()}">${match.status.toUpperCase()}</span>
        <span style="font-size: 12px; color: var(--secondary); font-weight: 600;">MATCH ID: ${match.id}</span>
      </div>
      <h3 style="font-family: var(--font-display); font-size: 22px; color: var(--pure-white); margin-bottom: 8px;">
        ${match.team1} ${match.isCeremony ? '' : 'vs ' + match.team2}
      </h3>
      <p style="font-size: 13px; color: var(--secondary); margin-bottom: 16px;">${match.details}</p>

      <div style="background: var(--surface-low); padding: 16px; border-radius: var(--radius-sm); border: 1px solid var(--court-border); margin-bottom: 16px; font-size: 13px; display: flex; flex-direction: column; gap: 8px;">
        <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Tournament Round:</span><span style="color: var(--pure-white); font-weight: 600;">${match.round}</span></div>
        <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Tip-Off Schedule:</span><span style="color: var(--pure-white); font-weight: 600;">${match.dateDisplay} at ${match.time}</span></div>
        <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Court Location:</span><span style="color: var(--pure-white); font-weight: 600;">${match.court}</span></div>
        <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Venue Ground:</span><span style="color: var(--pure-white); font-weight: 600;">LBEF Sports Complex, Maitidevi, Kathmandu</span></div>
        ${match.referee ? `<div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Lead Official:</span><span style="color: var(--pure-white); font-weight: 600;">${match.referee}</span></div>` : ''}
      </div>

      <div style="display: flex; gap: 10px; justify-content: flex-end;">
        <button class="btn btn-secondary btn-sm" onclick="downloadSingleMatchICS('${match.id}')">
          <span class="material-symbols-outlined" style="font-size: 16px; color: var(--court-orange)">event</span>
          <span>Add to Calendar (.ics)</span>
        </button>
        <button class="btn btn-primary btn-sm" onclick="closeModal('modal-match-details')">Close</button>
      </div>
    `;
    openModal('modal-match-details');
  }
}

// Download Full Tournament Schedule in .ICS format for October 2026
function downloadICS() {
  let icsContent = "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Lord Buddha Education Foundation//LBEF HOOP FEST 2026//EN\r\nCALSCALE:GREGORIAN\r\nMETHOD:PUBLISH\r\nX-WR-CALNAME:LBEF HOOP FEST 2026 Basketball Schedule\r\n";

  SCHEDULE_DATA.forEach(match => {
    const dtStamp = "20261001T000000Z";
    const day = match.date.split('-')[2];
    const dtStart = `202610${day}T040000Z`;
    const dtEnd = `202610${day}T060000Z`;
    const summary = `LBEF Hoop Fest: ${match.team1} vs ${match.team2} (${match.round})`;
    const location = `Lord Buddha Education Foundation, Maitidevi, Kathmandu, Nepal`;

    icsContent += `BEGIN:VEVENT\r\nUID:${match.id}-oct2026@study.lbef.edu.np\r\nDTSTAMP:${dtStamp}\r\nDTSTART:${dtStart}\r\nDTEND:${dtEnd}\r\nSUMMARY:${summary}\r\nDESCRIPTION:${match.details}\r\nLOCATION:${location}\r\nSTATUS:CONFIRMED\r\nEND:VEVENT\r\n`;
  });

  icsContent += "END:VCALENDAR\r\n";

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "LBEF-HOOP-FEST-2026-Schedule.ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('Tournament Calendar (.ics) downloaded for October 25-30, 2026!', 'success');
}

function downloadSingleMatchICS(matchId) {
  const match = SCHEDULE_DATA.find(m => m.id === matchId);
  if (!match) return;
  const day = match.date.split('-')[2];
  const ics = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//LBEF//EN\r\nBEGIN:VEVENT\r\nUID:${match.id}@study.lbef.edu.np\r\nDTSTAMP:20261001T000000Z\r\nDTSTART:202610${day}T040000Z\r\nDTEND:202610${day}T060000Z\r\nSUMMARY:LBEF Hoop Fest: ${match.team1} vs ${match.team2}\r\nLOCATION:LBEF Maitidevi Arena, Kathmandu\r\nDESCRIPTION:${match.details}\r\nEND:VEVENT\r\nEND:VCALENDAR`;

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `LBEF-Match-${match.id}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`Match ${match.id} saved to calendar (.ics)`, 'success');
}

function resetScheduleFilters() {
  activeFilters = { search: '', date: 'all', round: 'all', status: 'all' };
  const searchInput = document.getElementById('schedule-search');
  if (searchInput) searchInput.value = '';
  const dateSelect = document.getElementById('filter-date');
  if (dateSelect) dateSelect.value = 'all';
  const roundSelect = document.getElementById('filter-round');
  if (roundSelect) roundSelect.value = 'all';
  const statusSelect = document.getElementById('filter-status');
  if (statusSelect) statusSelect.value = 'all';
  renderSchedule();
}

document.addEventListener('DOMContentLoaded', () => {
  renderSchedule();

  const searchInput = document.getElementById('schedule-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeFilters.search = e.target.value.trim();
      renderSchedule();
    });
  }

  const dateSelect = document.getElementById('filter-date');
  if (dateSelect) {
    dateSelect.addEventListener('change', (e) => {
      activeFilters.date = e.target.value;
      renderSchedule();
    });
  }

  const roundSelect = document.getElementById('filter-round');
  if (roundSelect) {
    roundSelect.addEventListener('change', (e) => {
      activeFilters.round = e.target.value;
      renderSchedule();
    });
  }

  const statusSelect = document.getElementById('filter-status');
  if (statusSelect) {
    statusSelect.addEventListener('change', (e) => {
      activeFilters.status = e.target.value;
      renderSchedule();
    });
  }
});

window.viewMatchDetails = viewMatchDetails;
window.downloadICS = downloadICS;
window.downloadSingleMatchICS = downloadSingleMatchICS;
window.resetScheduleFilters = resetScheduleFilters;
