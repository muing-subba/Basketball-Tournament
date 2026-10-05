/**
 * LBEF HOOP FEST 2026 - Participant & Captain Dashboard
 * Reads persistent localStorage data or default demo team, handles team check-in,
 * personalized match assignments, and demo logout.
 */

function initDashboard() {
  const container = document.getElementById('dashboard-content-area');
  if (!container) return;

  const currentUserRaw = localStorage.getItem('lbef_current_user');
  const storedTeams = JSON.parse(localStorage.getItem('lbef_teams') || '[]');

  let team = null;
  let user = null;

  if (currentUserRaw) {
    user = JSON.parse(currentUserRaw);
    team = storedTeams.find(t => t.id === user.teamId || t.name === user.teamName);
  }

  // Fallback to first team if user logged in generically or requested demo
  if (!team && storedTeams.length > 0) {
    team = storedTeams[0];
    user = {
      name: team.captain,
      role: 'Captain',
      studentId: team.captainSid || 'NP01CP4S24001',
      teamId: team.id,
      teamName: team.name
    };
  }

  if (!team) {
    container.innerHTML = `
      <div style="text-align: center; padding: 60px 24px; background: var(--varsity-navy); border-radius: var(--radius-md); border: 1px dashed var(--court-border);">
        <span class="material-symbols-outlined" style="font-size: 56px; color: var(--court-orange); margin-bottom: 16px;">sports_basketball</span>
        <h2 style="font-family: var(--font-display); font-size: 26px; color: var(--pure-white); margin-bottom: 8px;">No Active Team Registration Found</h2>
        <p style="color: var(--secondary); max-width: 480px; margin: 0 auto 24px auto; font-size: 14px;">
          You haven't registered a varsity team for LBEF Hoop Fest 2026 yet. Join the inter-faculty championship today!
        </p>
        <div style="display: flex; gap: 12px; justify-content: center;">
          <a href="registration.html" class="btn btn-primary">Register Your Team</a>
          <button class="btn btn-secondary" onclick="loadDemoCaptain()">Load Demo Captain Session</button>
        </div>
      </div>
    `;
    return;
  }

  const matches = JSON.parse(localStorage.getItem('lbef_matches') || '[]');
  const myMatches = matches.filter(m => m.team1 === team.name || m.team2 === team.name);

  container.innerHTML = `
    <!-- Top Welcome Card -->
    <div style="background: linear-gradient(135deg, var(--varsity-navy) 0%, var(--varsity-elevated) 100%); border: 1px solid var(--court-border); border-radius: var(--radius-md); padding: 28px; margin-bottom: 28px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 20px;">
      <div style="display: flex; align-items: center; gap: 18px;">
        <div style="width: 64px; height: 64px; background: rgba(255, 87, 34, 0.2); color: var(--court-orange); border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid var(--court-orange);">
          <span class="material-symbols-outlined" style="font-size: 36px;">sports_martial_arts</span>
        </div>
        <div>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <h2 style="font-family: var(--font-display); font-size: 26px; color: var(--pure-white); font-weight: 800;">${team.name}</h2>
            <span class="badge-tag badge-completed">OFFICIAL ROSTER</span>
          </div>
          <p style="font-size: 13px; color: var(--secondary);">
            Captain: <strong style="color: var(--pure-white);">${team.captain}</strong> &bull; ${team.faculty} &bull; Reg Ref: <span style="color: var(--court-orange); font-weight: 700;">${team.id}</span>
          </p>
        </div>
      </div>

      <div style="display: flex; gap: 10px; align-items: center;">
        <button class="btn btn-secondary btn-sm" onclick="downloadPass('${team.id}')">
          <span class="material-symbols-outlined" style="font-size: 16px; color: var(--court-orange);">badge</span>
          <span>Download Team Pass</span>
        </button>
        <button class="btn btn-crimson btn-sm" onclick="handleLogout()">
          <span class="material-symbols-outlined" style="font-size: 16px;">logout</span>
          <span>Sign Out</span>
        </button>
      </div>
    </div>

    <!-- Dashboard Bento Grid -->
    <div style="display: grid; grid-template-columns: 2fr 1.2fr; gap: 24px; margin-bottom: 32px;" class="dashboard-grid">
      <!-- Left Column: Upcoming Team Clashes & Status -->
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <!-- Match Assignments -->
        <div class="card" style="padding: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h3 style="font-family: var(--font-display); font-size: 18px; color: var(--pure-white);">Assigned Tournament Matches</h3>
            <a href="schedule.html" style="font-size: 12px; color: var(--court-orange); text-decoration: none; font-weight: 600;">View Full Schedule &rarr;</a>
          </div>

          ${myMatches.length === 0 ? `
            <div style="padding: 20px; text-align: center; color: var(--secondary); font-size: 13px; background: var(--surface-low); border-radius: var(--radius-sm);">
              Official group fixtures will be finalized on October 22, 2026 after committee verification.
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 12px;">
              ${myMatches.map(m => `
                <div style="background: var(--surface-low); border: 1px solid var(--court-border); padding: 16px; border-radius: var(--radius-sm); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                  <div>
                    <span class="badge-tag badge-${m.status.toLowerCase()}">${m.status.toUpperCase()}</span>
                    <h4 style="font-family: var(--font-display); font-size: 16px; color: var(--pure-white); margin-top: 4px;">
                      ${m.team1} vs ${m.team2}
                    </h4>
                    <span style="font-size: 12px; color: var(--text-muted);">${m.date} &bull; ${m.time} &bull; ${m.court}</span>
                  </div>
                  <button class="btn btn-secondary btn-sm" onclick="checkInMatch('${m.id}')">
                    <span class="material-symbols-outlined" style="font-size: 14px; color: #81c784;">check_box</span>
                    <span>Confirm Check-in</span>
                  </button>
                </div>
              `).join('')}
            </div>
          `}
        </div>

        <!-- Registered Roster -->
        <div class="card" style="padding: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h3 style="font-family: var(--font-display); font-size: 18px; color: var(--pure-white);">Team Roster (5v5 Active)</h3>
            <span style="font-size: 12px; color: var(--secondary);">Total Players: ${team.players ? team.players.length : 5}</span>
          </div>

          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: left;">
              <thead>
                <tr style="border-bottom: 1px solid var(--court-border); color: var(--text-muted); text-transform: uppercase; font-size: 11px;">
                  <th style="padding: 8px 12px;">Jersey</th>
                  <th style="padding: 8px 12px;">Athlete Name</th>
                  <th style="padding: 8px 12px;">Student ID</th>
                  <th style="padding: 8px 12px;">Status</th>
                </tr>
              </thead>
              <tbody>
                ${team.players && team.players.length > 0 ? team.players.map(p => `
                  <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05); color: var(--on-surface);">
                    <td style="padding: 10px 12px; font-weight: 700; color: var(--court-orange);">#${p.jersey}</td>
                    <td style="padding: 10px 12px; font-weight: 600; color: var(--pure-white);">${p.name}</td>
                    <td style="padding: 10px 12px; color: var(--secondary);">${p.sid}</td>
                    <td style="padding: 10px 12px;"><span style="color: #81c784; font-size: 11px; font-weight: 600;">ELIGIBLE</span></td>
                  </tr>
                `).join('') : `
                  <tr style="color: var(--on-surface);">
                    <td style="padding: 10px 12px; font-weight: 700; color: var(--court-orange);">#23</td>
                    <td style="padding: 10px 12px; font-weight: 600; color: var(--pure-white);">${team.captain} (Captain)</td>
                    <td style="padding: 10px 12px; color: var(--secondary);">NP01CP4S24001</td>
                    <td style="padding: 10px 12px;"><span style="color: #81c784; font-size: 11px; font-weight: 600;">ELIGIBLE</span></td>
                  </tr>
                  <tr style="color: var(--on-surface);">
                    <td style="padding: 10px 12px; font-weight: 700; color: var(--court-orange);">#7</td>
                    <td style="padding: 10px 12px; font-weight: 600; color: var(--pure-white);">Sanjay Gurung</td>
                    <td style="padding: 10px 12px; color: var(--secondary);">NP01CP4S24002</td>
                    <td style="padding: 10px 12px;"><span style="color: #81c784; font-size: 11px; font-weight: 600;">ELIGIBLE</span></td>
                  </tr>
                  <tr style="color: var(--on-surface);">
                    <td style="padding: 10px 12px; font-weight: 700; color: var(--court-orange);">#11</td>
                    <td style="padding: 10px 12px; font-weight: 600; color: var(--pure-white);">Manish Tamang</td>
                    <td style="padding: 10px 12px; color: var(--secondary);">NP01CP4S24003</td>
                    <td style="padding: 10px 12px;"><span style="color: #81c784; font-size: 11px; font-weight: 600;">ELIGIBLE</span></td>
                  </tr>
                  <tr style="color: var(--on-surface);">
                    <td style="padding: 10px 12px; font-weight: 700; color: var(--court-orange);">#14</td>
                    <td style="padding: 10px 12px; font-weight: 600; color: var(--pure-white);">Praveen Basnet</td>
                    <td style="padding: 10px 12px; color: var(--secondary);">NP01CP4S24004</td>
                    <td style="padding: 10px 12px;"><span style="color: #81c784; font-size: 11px; font-weight: 600;">ELIGIBLE</span></td>
                  </tr>
                  <tr style="color: var(--on-surface);">
                    <td style="padding: 10px 12px; font-weight: 700; color: var(--court-orange);">#30</td>
                    <td style="padding: 10px 12px; font-weight: 600; color: var(--pure-white);">Kabir Bajracharya</td>
                    <td style="padding: 10px 12px; color: var(--secondary);">NP01CP4S24005</td>
                    <td style="padding: 10px 12px;"><span style="color: #81c784; font-size: 11px; font-weight: 600;">ELIGIBLE</span></td>
                  </tr>
                `}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Right Column: Secretariat Bulletins & Quick Links -->
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <!-- Status Card -->
        <div class="card" style="padding: 24px;">
          <h3 style="font-family: var(--font-display); font-size: 18px; color: var(--pure-white); margin-bottom: 12px;">Captains Checklist</h3>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px; font-size: 13px;">
            <li style="display: flex; align-items: center; gap: 8px; color: #81c784;">
              <span class="material-symbols-outlined" style="font-size: 18px;">check_circle</span>
              <span>Online Roster Submitted</span>
            </li>
            <li style="display: flex; align-items: center; gap: 8px; color: #81c784;">
              <span class="material-symbols-outlined" style="font-size: 18px;">check_circle</span>
              <span>Student ID Validation Cleared</span>
            </li>
            <li style="display: flex; align-items: center; gap: 8px; color: var(--secondary);">
              <span class="material-symbols-outlined" style="font-size: 18px; color: var(--court-orange);">radio_button_unchecked</span>
              <span>Captains Technical Briefing (October 23)</span>
            </li>
            <li style="display: flex; align-items: center; gap: 8px; color: var(--secondary);">
              <span class="material-symbols-outlined" style="font-size: 18px; color: var(--court-orange);">radio_button_unchecked</span>
              <span>Official Jersey Inspection</span>
            </li>
          </ul>
        </div>

        <!-- Secretariat Announcements -->
        <div class="card" style="padding: 24px;">
          <h3 style="font-family: var(--font-display); font-size: 18px; color: var(--pure-white); margin-bottom: 12px;">Secretariat Notices</h3>
          <div style="display: flex; flex-direction: column; gap: 12px; font-size: 12px;">
            <div style="padding: 10px; background: var(--surface-low); border-left: 3px solid var(--court-orange); border-radius: var(--radius-sm);">
              <strong style="color: var(--pure-white); display: block;">Floor Warm-up Window</strong>
              <span style="color: var(--secondary);">Teams receive 20 minutes warm-up prior to scheduled tip-off.</span>
            </div>
            <div style="padding: 10px; background: var(--surface-low); border-left: 3px solid var(--institution-crimson); border-radius: var(--radius-sm);">
              <strong style="color: var(--pure-white); display: block;">Smart Campus Card Required</strong>
              <span style="color: var(--secondary);">All roster athletes must display physical college ID at Court 1 gates.</span>
            </div>
          </div>
        </div>

        <!-- Downloads -->
        <div class="card" style="padding: 24px;">
          <h3 style="font-family: var(--font-display); font-size: 18px; color: var(--pure-white); margin-bottom: 12px;">Quick Resources</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <a href="resources.html" class="btn btn-secondary btn-sm" style="justify-content: flex-start;">
              <span class="material-symbols-outlined" style="font-size: 16px; color: var(--court-orange);">description</span>
              <span>Official Rulebook &amp; Code</span>
            </a>
            <a href="competitions.html" class="btn btn-secondary btn-sm" style="justify-content: flex-start;">
              <span class="material-symbols-outlined" style="font-size: 16px; color: var(--court-orange);">account_tree</span>
              <span>Tournament Bracket Tree</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

function checkInMatch(matchId) {
  showToast(`Match ${matchId} Check-in Confirmed! Table officials notified.`, 'success');
}

function downloadPass(teamId) {
  const teams = JSON.parse(localStorage.getItem('lbef_teams') || '[]');
  const team = teams.find(t => t.id === teamId) || { id: teamId, name: 'Team', captain: 'Captain' };

  let pass = `========================================================\n`;
  text = `   LORD BUDDHA EDUCATION FOUNDATION - HOOP FEST 2026   \n`;
  text += `                OFFICIAL TEAM PASS CARD                \n`;
  text += `========================================================\n\n`;
  text += `TEAM:       ${team.name}\n`;
  text += `REF ID:     ${team.id}\n`;
  text += `CAPTAIN:    ${team.captain}\n`;
  text += `VENUE:      LBEF Maitidevi Arena Hardwood Floor\n`;
  text += `ACCESS:     Players Tunnel, Locker Room B, Bench Area\n`;
  text += `VALIDITY:   October 25 - 30, 2026\n\n`;
  text += `* Certified by LBEF Athletic Advisory Council *\n`;
  text += `========================================================\n`;

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `LBEF-TeamPass-${team.id}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('Team Access Pass downloaded!', 'success');
}

function handleLogout() {
  localStorage.removeItem('lbef_current_user');
  showToast('Signed out of demonstration session.', 'info');
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 1000);
}

function loadDemoCaptain() {
  const demoTeam = {
    id: 'LBEF-HF26-7821',
    name: 'Cyber Warriors',
    captain: 'Aayush Shrestha',
    captainSid: 'NP01CP4S24001',
    faculty: 'Faculty of Information Technology',
    feeStatus: 'Verified (Demo)',
    players: [
      { name: 'Aayush Shrestha', jersey: 23, sid: 'NP01CP4S24001' },
      { name: 'Sanjay Gurung', jersey: 7, sid: 'NP01CP4S24002' },
      { name: 'Manish Tamang', jersey: 11, sid: 'NP01CP4S24003' },
      { name: 'Praveen Basnet', jersey: 14, sid: 'NP01CP4S24004' },
      { name: 'Kabir Bajracharya', jersey: 30, sid: 'NP01CP4S24005' }
    ]
  };

  const storedTeams = JSON.parse(localStorage.getItem('lbef_teams') || '[]');
  if (!storedTeams.some(t => t.id === demoTeam.id)) {
    storedTeams.push(demoTeam);
    localStorage.setItem('lbef_teams', JSON.stringify(storedTeams));
  }

  localStorage.setItem('lbef_current_user', JSON.stringify({
    name: demoTeam.captain,
    role: 'Captain',
    studentId: demoTeam.captainSid,
    teamId: demoTeam.id,
    teamName: demoTeam.name
  }));

  showToast('Loaded Demo Captain session for Cyber Warriors!', 'success');
  initDashboard();
}

document.addEventListener('DOMContentLoaded', () => {
  initDashboard();
});

window.checkInMatch = checkInMatch;
window.downloadPass = downloadPass;
window.handleLogout = handleLogout;
window.loadDemoCaptain = loadDemoCaptain;
