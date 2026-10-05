/**
 * LBEF HOOP FEST 2026 - Registration & Payment Demonstration Module
 * Handles Team Registration, Volunteer Applications, Nepali Phone Validation,
 * Roster Management, LocalStorage Persistence, and Payment Demo
 */

let rosterCount = 5;

// Nepali Mobile Number Regex: optional +977, followed by 98 or 97 and 8 digits
const NEPALI_PHONE_REGEX = /^(?:\+977[- ]?)?(98|97)\d{8}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function switchRegTab(tabType) {
  const teamForm = document.getElementById('team-reg-section');
  const volForm = document.getElementById('volunteer-reg-section');
  const lookupForm = document.getElementById('lookup-reg-section');
  const tabs = document.querySelectorAll('.reg-nav-btn');

  tabs.forEach(btn => btn.classList.remove('active'));

  if (tabType === 'team') {
    teamForm.style.display = 'block';
    volForm.style.display = 'none';
    lookupForm.style.display = 'none';
    document.getElementById('tab-btn-team').classList.add('active');
  } else if (tabType === 'volunteer') {
    teamForm.style.display = 'none';
    volForm.style.display = 'block';
    lookupForm.style.display = 'none';
    document.getElementById('tab-btn-volunteer').classList.add('active');
  } else if (tabType === 'lookup') {
    teamForm.style.display = 'none';
    volForm.style.display = 'none';
    lookupForm.style.display = 'block';
    document.getElementById('tab-btn-lookup').classList.add('active');
  }
}

// Add extra player slot to roster (up to 10 players)
function addPlayerSlot() {
  if (rosterCount >= 10) {
    showToast('Maximum roster size is 10 players.', 'error');
    return;
  }
  rosterCount++;
  const container = document.getElementById('roster-inputs-container');
  const div = document.createElement('div');
  div.className = 'form-grid player-row';
  div.id = `player-row-${rosterCount}`;
  div.innerHTML = `
    <div class="form-group">
      <label class="form-label">Player #${rosterCount} Full Name</label>
      <input type="text" class="form-input player-name" placeholder="Full Name" required>
    </div>
    <div class="form-group">
      <label class="form-label">Student ID</label>
      <input type="text" class="form-input player-sid" placeholder="e.g. NP01CP4S2400${rosterCount}" required>
    </div>
    <div class="form-group">
      <label class="form-label">Jersey Number</label>
      <input type="number" class="form-input player-jersey" placeholder="#" min="0" max="99" required>
    </div>
    <div class="form-group" style="justify-content: flex-end;">
      <button type="button" class="btn btn-secondary btn-sm" onclick="removePlayerSlot(${rosterCount})" style="height: 42px;">
        <span class="material-symbols-outlined" style="font-size: 16px; color: #ff8a80;">delete</span>
        <span>Remove</span>
      </button>
    </div>
  `;
  container.appendChild(div);
  showToast(`Added Player #${rosterCount} slot`, 'info');
}

function removePlayerSlot(slotId) {
  if (rosterCount <= 5) {
    showToast('Minimum 5 players required for a full-court roster.', 'error');
    return;
  }
  const row = document.getElementById(`player-row-${slotId}`);
  if (row) {
    row.remove();
    rosterCount--;
  }
}

// Team Registration Form Submission
function handleTeamRegistration(e) {
  e.preventDefault();

  const teamNameInput = document.getElementById('reg-team-name');
  const captainNameInput = document.getElementById('reg-captain-name');
  const captainSidInput = document.getElementById('reg-captain-sid');
  const emailInput = document.getElementById('reg-email');
  const phoneInput = document.getElementById('reg-phone');
  const deptInput = document.getElementById('reg-dept');
  const consentInput = document.getElementById('reg-consent');

  const teamName = teamNameInput.value.trim();
  const captainName = captainNameInput.value.trim();
  const captainSid = captainSidInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const dept = deptInput.value;
  const consent = consentInput.checked;

  let isValid = true;

  // Validate Email
  if (!EMAIL_REGEX.test(email)) {
    document.getElementById('err-email').style.display = 'block';
    emailInput.classList.add('error');
    isValid = false;
  } else {
    document.getElementById('err-email').style.display = 'none';
    emailInput.classList.remove('error');
  }

  // Validate Nepali Phone
  if (!NEPALI_PHONE_REGEX.test(phone)) {
    document.getElementById('err-phone').style.display = 'block';
    phoneInput.classList.add('error');
    isValid = false;
  } else {
    document.getElementById('err-phone').style.display = 'none';
    phoneInput.classList.remove('error');
  }

  // Duplicate Team Name Check
  const storedTeams = JSON.parse(localStorage.getItem('lbef_teams') || '[]');
  const isDuplicate = storedTeams.some(t => t.name.toLowerCase() === teamName.toLowerCase());
  if (isDuplicate) {
    document.getElementById('err-team-name').textContent = 'This team name is already registered. Please choose another name.';
    document.getElementById('err-team-name').style.display = 'block';
    teamNameInput.classList.add('error');
    isValid = false;
  } else {
    document.getElementById('err-team-name').style.display = 'none';
    teamNameInput.classList.remove('error');
  }

  if (!consent) {
    showToast('Please accept the FIBA Code of Conduct and LBEF Regulations.', 'error');
    return;
  }

  // Collect Players
  const playerNames = document.querySelectorAll('.player-name');
  const playerSids = document.querySelectorAll('.player-sid');
  const playerJerseys = document.querySelectorAll('.player-jersey');
  const players = [];

  for (let i = 0; i < playerNames.length; i++) {
    const pName = playerNames[i].value.trim();
    const pSid = playerSids[i].value.trim();
    const pJersey = playerJerseys[i].value.trim();
    if (!pName || !pSid || !pJersey) {
      showToast(`Please complete details for Player #${i + 1}`, 'error');
      isValid = false;
      break;
    }
    players.push({ name: pName, sid: pSid, jersey: pJersey });
  }

  if (!isValid) return;

  // Generate Demonstration Registration ID
  const regId = `LBEF-HF26-${Math.floor(1000 + Math.random() * 9000)}`;
  const regDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const newRegistration = {
    id: regId,
    name: teamName,
    faculty: dept,
    seed: storedTeams.length + 1,
    captain: captainName,
    captainSid,
    email,
    phone,
    players,
    status: 'Pending Verification',
    feeStatus: 'Unpaid Demo',
    regDate
  };

  storedTeams.push(newRegistration);
  localStorage.setItem('lbef_teams', JSON.stringify(storedTeams));

  // Store active session for demo dashboard
  localStorage.setItem('lbef_current_user', JSON.stringify({
    name: captainName,
    role: 'Captain',
    studentId: captainSid,
    teamId: regId,
    teamName: teamName
  }));

  // Show Payment Demonstration Modal
  openPaymentModal(newRegistration);
}

// Payment Interface Demonstration Modal
function openPaymentModal(teamData) {
  const content = document.getElementById('payment-modal-body');
  if (content) {
    content.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <span class="academic-badge" style="margin-bottom: 8px;">Illustrative Payment Demonstration</span>
        <h3 style="font-family: var(--font-display); font-size: 22px; color: var(--pure-white); text-transform: uppercase;">
          Tournament Entry Fee
        </h3>
        <p style="font-size: 13px; color: var(--secondary); margin-top: 4px;">
          Team: <strong style="color: var(--pure-white);">${teamData.name}</strong> &bull; Registration Ref: <strong style="color: var(--court-orange);">${teamData.id}</strong>
        </p>
      </div>

      <div style="background: var(--surface-low); border: 1px solid var(--court-border); padding: 16px; border-radius: var(--radius-sm); margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 8px;">
          <span style="color: var(--secondary);">Team Registration Fee (FIBA 5v5):</span>
          <span style="font-weight: 700; color: var(--pure-white);">NPR 5,000</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted); border-top: 1px solid rgba(255, 255, 255, 0.06); padding-top: 8px;">
          <span>Includes Official Game Ball, Medical Kit, &amp; Match Officials</span>
          <span style="color: #81c784; font-weight: 600;">Subsidized by LBEF</span>
        </div>
      </div>

      <div style="margin-bottom: 20px;">
        <label class="form-label" style="margin-bottom: 8px; display: block;">Select Demo Payment Channel</label>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
          <label style="display: flex; align-items: center; gap: 8px; padding: 12px; background: var(--surface-high); border: 1px solid var(--court-border); border-radius: var(--radius-sm); cursor: pointer;">
            <input type="radio" name="payment_method" value="eSewa" checked>
            <span style="font-weight: 600; font-size: 13px; color: #60bb46;">eSewa Wallet</span>
          </label>
          <label style="display: flex; align-items: center; gap: 8px; padding: 12px; background: var(--surface-high); border: 1px solid var(--court-border); border-radius: var(--radius-sm); cursor: pointer;">
            <input type="radio" name="payment_method" value="Khalti">
            <span style="font-weight: 600; font-size: 13px; color: #5c2d91;">Khalti Digital</span>
          </label>
          <label style="display: flex; align-items: center; gap: 8px; padding: 12px; background: var(--surface-high); border: 1px solid var(--court-border); border-radius: var(--radius-sm); cursor: pointer;">
            <input type="radio" name="payment_method" value="Bank Transfer">
            <span style="font-weight: 600; font-size: 13px; color: var(--pure-white);">Bank Transfer</span>
          </label>
          <label style="display: flex; align-items: center; gap: 8px; padding: 12px; background: var(--surface-high); border: 1px solid var(--court-border); border-radius: var(--radius-sm); cursor: pointer;">
            <input type="radio" name="payment_method" value="Cash Secretariat">
            <span style="font-weight: 600; font-size: 13px; color: var(--court-orange);">Cash at Campus</span>
          </label>
        </div>
      </div>

      <div style="padding: 12px; background: rgba(255, 87, 34, 0.1); border-left: 3px solid var(--court-orange); border-radius: var(--radius-sm); font-size: 12px; color: var(--secondary); margin-bottom: 20px;">
        <strong>Academic Demonstration Notice:</strong> This is a front-end simulation for an academic project. No real banking or wallet funds will be deducted, and no financial credentials are ever collected.
      </div>

      <div style="display: flex; gap: 12px; justify-content: flex-end;">
        <button type="button" class="btn btn-secondary" onclick="confirmDemoPayment('${teamData.id}', 'Pay Later at Venue')">Skip / Pay at Venue</button>
        <button type="button" class="btn btn-primary" onclick="confirmDemoPayment('${teamData.id}', 'Simulate Instant Payment')">Simulate Demo Payment</button>
      </div>
    `;
    openModal('modal-payment-demo');
  }
}

function confirmDemoPayment(regId, mode) {
  const selectedMethod = document.querySelector('input[name="payment_method"]:checked')?.value || 'Cash';
  const teams = JSON.parse(localStorage.getItem('lbef_teams') || '[]');
  const team = teams.find(t => t.id === regId);

  if (team) {
    team.feeStatus = `Paid (Demo - ${selectedMethod})`;
    localStorage.setItem('lbef_teams', JSON.stringify(teams));
  }

  closeModal('modal-payment-demo');
  showSuccessSummaryModal(team || { id: regId, name: 'Team', feeStatus: 'Paid' });
}

function showSuccessSummaryModal(team) {
  const content = document.getElementById('summary-modal-body');
  if (content) {
    content.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <div style="width: 56px; height: 56px; background: rgba(76, 175, 80, 0.2); color: #81c784; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px auto;">
          <span class="material-symbols-outlined" style="font-size: 32px;">check_circle</span>
        </div>
        <span class="badge-tag badge-completed" style="margin-bottom: 6px;">Registration Successfully Recorded</span>
        <h3 style="font-family: var(--font-display); font-size: 24px; color: var(--pure-white); text-transform: uppercase;">
          ${team.name}
        </h3>
        <p style="font-size: 13px; color: var(--secondary);">Demonstration Registration Reference: <strong style="color: var(--court-orange);">${team.id}</strong></p>
      </div>

      <div style="background: var(--surface-low); border: 1px solid var(--court-border); padding: 16px; border-radius: var(--radius-sm); font-size: 13px; display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Captain:</span><span style="color: var(--pure-white); font-weight: 600;">${team.captain || 'Captain'}</span></div>
        <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Faculty / Dept:</span><span style="color: var(--pure-white);">${team.faculty || 'Inter-Faculty'}</span></div>
        <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Fee Status:</span><span style="color: #81c784; font-weight: 600;">${team.feeStatus || 'Verified Demo'}</span></div>
        <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Venue:</span><span style="color: var(--pure-white);">LBEF Maitidevi Arena, Kathmandu</span></div>
      </div>

      <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
        <button class="btn btn-secondary btn-sm" onclick="downloadRegSlip('${team.id}')">
          <span class="material-symbols-outlined" style="font-size: 16px; color: var(--court-orange);">download</span>
          <span>Download Entry Slip</span>
        </button>
        <a href="dashboard.html" class="btn btn-primary btn-sm">
          <span>Go to Participant Dashboard</span>
          <span class="material-symbols-outlined" style="font-size: 16px;">arrow_forward</span>
        </a>
      </div>
    `;
    openModal('modal-reg-summary');
  }
}

// Download printable / plain text Registration Slip
function downloadRegSlip(regId) {
  const teams = JSON.parse(localStorage.getItem('lbef_teams') || '[]');
  const team = teams.find(t => t.id === regId) || { id: regId, name: 'Team', captain: 'Captain', faculty: 'IT' };

  let text = `========================================================\n`;
  text += `   LORD BUDDHA EDUCATION FOUNDATION - HOOP FEST 2026   \n`;
  text += `        OFFICIAL TEAM REGISTRATION ENTRY SLIP          \n`;
  text += `========================================================\n\n`;
  text += `REGISTRATION REF: ${team.id}\n`;
  text += `TEAM NAME:        ${team.name}\n`;
  text += `CAPTAIN NAME:     ${team.captain}\n`;
  text += `STUDENT ID:       ${team.captainSid || 'N/A'}\n`;
  text += `FACULTY:          ${team.faculty}\n`;
  text += `CONTACT PHONE:    ${team.phone || 'N/A'}\n`;
  text += `CONTACT EMAIL:    ${team.email || 'N/A'}\n`;
  text += `PAYMENT STATUS:   ${team.feeStatus || 'Demonstration Mode'}\n`;
  text += `VENUE:            LBEF Sports Complex, Maitidevi, Kathmandu\n`;
  text += `TOURNAMENT DATES: October 25 - 30, 2026\n\n`;
  text += `ROSTER PLAYERS:\n`;
  if (team.players && team.players.length > 0) {
    team.players.forEach((p, idx) => {
      text += `  ${idx + 1}. ${p.name} (Jersey #${p.jersey}) - ID: ${p.sid}\n`;
    });
  } else {
    text += `  Roster registered under official faculty advisory list.\n`;
  }
  text += `\nNOTICE: This document is generated for demonstration purposes.\n`;
  text += `========================================================\n`;

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `LBEF-HoopFest2026-${team.id}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('Registration Slip downloaded!', 'success');
}

// Volunteer Registration Form Submission
function handleVolunteerRegistration(e) {
  e.preventDefault();

  const nameInput = document.getElementById('vol-name');
  const sidInput = document.getElementById('vol-sid');
  const emailInput = document.getElementById('vol-email');
  const phoneInput = document.getElementById('vol-phone');
  const roleInput = document.getElementById('vol-role');
  const availInput = document.getElementById('vol-availability');
  const expInput = document.getElementById('vol-experience');

  const name = nameInput.value.trim();
  const sid = sidInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const role = roleInput.value;
  const avail = availInput.value;
  const exp = expInput.value.trim();

  let isValid = true;

  if (!EMAIL_REGEX.test(email)) {
    document.getElementById('vol-err-email').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('vol-err-email').style.display = 'none';
  }

  if (!NEPALI_PHONE_REGEX.test(phone)) {
    document.getElementById('vol-err-phone').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('vol-err-phone').style.display = 'none';
  }

  if (!isValid) return;

  const volId = `LBEF-VOL-${Math.floor(100 + Math.random() * 900)}`;
  const volunteers = JSON.parse(localStorage.getItem('lbef_volunteers') || '[]');

  volunteers.push({
    id: volId,
    name,
    studentId: sid,
    email,
    phone,
    role,
    availability: avail,
    experience: exp,
    submittedAt: new Date().toISOString()
  });

  localStorage.setItem('lbef_volunteers', JSON.stringify(volunteers));

  // Reset form
  e.target.reset();

  showToast(`Volunteer application recorded! Reference: ${volId}`, 'success');

  const content = document.getElementById('summary-modal-body');
  if (content) {
    content.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <span class="badge-tag badge-completed" style="margin-bottom: 6px;">Volunteer Application Received</span>
        <h3 style="font-family: var(--font-display); font-size: 22px; color: var(--pure-white); text-transform: uppercase;">
          Welcome to the Courtside Crew!
        </h3>
        <p style="font-size: 13px; color: var(--secondary);">Volunteer ID: <strong style="color: var(--court-orange);">${volId}</strong></p>
      </div>
      <div style="background: var(--surface-low); border: 1px solid var(--court-border); padding: 16px; border-radius: var(--radius-sm); font-size: 13px; display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Name:</span><span style="color: var(--pure-white); font-weight: 600;">${name}</span></div>
        <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Role:</span><span style="color: var(--pure-white);">${role}</span></div>
        <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Availability:</span><span style="color: var(--pure-white);">${avail}</span></div>
        <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Briefing Venue:</span><span style="color: var(--pure-white);">LBEF Maitidevi Hall B (October 23, 10 AM)</span></div>
      </div>
      <div style="text-align: center;">
        <button class="btn btn-primary btn-sm" onclick="closeModal('modal-reg-summary')">Acknowledged</button>
      </div>
    `;
    openModal('modal-reg-summary');
  }
}

// Lookup Registration Records
function handleLookup(e) {
  e.preventDefault();
  const query = document.getElementById('lookup-query').value.trim().toLowerCase();
  const resultsDiv = document.getElementById('lookup-results');

  const teams = JSON.parse(localStorage.getItem('lbef_teams') || '[]');
  const match = teams.find(t => 
    (t.id && t.id.toLowerCase() === query) ||
    (t.captainSid && t.captainSid.toLowerCase() === query) ||
    (t.name && t.name.toLowerCase() === query)
  );

  if (!match) {
    resultsDiv.innerHTML = `
      <div style="padding: 16px; background: rgba(198, 40, 40, 0.15); border: 1px solid var(--institution-crimson); border-radius: var(--radius-sm); color: #ffb4ac; font-size: 13px;">
        No registration found matching "${query}". Please check your Student ID or Reference Number.
      </div>
    `;
    return;
  }

  resultsDiv.innerHTML = `
    <div style="background: var(--surface-low); border: 1px solid var(--court-border); padding: 20px; border-radius: var(--radius-sm);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <span class="badge-tag badge-completed">${match.feeStatus || 'Verified'}</span>
        <span style="font-weight: 700; color: var(--court-orange); font-size: 14px;">${match.id}</span>
      </div>
      <h4 style="font-family: var(--font-display); font-size: 20px; color: var(--pure-white); margin-bottom: 6px;">${match.name}</h4>
      <p style="font-size: 13px; color: var(--secondary); margin-bottom: 14px;">Captain: ${match.captain} &bull; ${match.faculty}</p>
      
      <div style="display: flex; gap: 10px;">
        <button class="btn btn-secondary btn-sm" onclick="downloadRegSlip('${match.id}')">Download Slip</button>
        <a href="dashboard.html" class="btn btn-primary btn-sm">Access Dashboard</a>
      </div>
    </div>
  `;
}

// Global hooks
window.switchRegTab = switchRegTab;
window.addPlayerSlot = addPlayerSlot;
window.removePlayerSlot = removePlayerSlot;
window.handleTeamRegistration = handleTeamRegistration;
window.handleVolunteerRegistration = handleVolunteerRegistration;
window.handleLookup = handleLookup;
window.downloadRegSlip = downloadRegSlip;
window.confirmDemoPayment = confirmDemoPayment;
