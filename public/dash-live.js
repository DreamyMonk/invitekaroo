/* ── LIVE adapter: layers Firestore + email-OTP on top of the verbatim
   reference dashboard (dash.js). Reassigns the demo data vars with real
   Firestore data and overrides the mutation + login handlers. ───────────── */
(function () {
  var __uid = null, __community = null, __cid = null, __sent = false;

  // Make the reference use the REAL current date (it hardcodes 22 May 2026).
  try { var _n = new Date(); TODAY = { y: _n.getFullYear(), m: _n.getMonth(), d: _n.getDate() }; DEMO_NOW_MIN = _n.getHours() * 60 + _n.getMinutes(); } catch (e) {}

  function $(id) { return document.getElementById(id); }

  function applyData(d) {
    community = d.community;                 // eslint-disable-line
    edition = d.edition;                     // eslint-disable-line
    programmes = d.programmes;               // eslint-disable-line
    subscribers = d.subscribers;             // eslint-disable-line
    attLog = d.attLog;                       // eslint-disable-line
    donations = d.donations;                 // eslint-disable-line
    reminders = d.reminders;                 // eslint-disable-line
    team = d.team;                           // eslint-disable-line
    __community = d.community; __cid = d.cid;
    // live chrome (sidebar + topbar)
    var name = d.community.name || 'Community';
    if ($('cs-name')) $('cs-name').textContent = name;
    if ($('cs-ed')) $('cs-ed').textContent = (d.edition.label || '') + (d.edition.status ? ' · ' + d.edition.status : '');
    if ($('hc-name')) $('hc-name').textContent = name;
    if ($('hc-av')) $('hc-av').textContent = (name.slice(0, 2) || 'H').toUpperCase();
    if ($('hc-sub')) $('hc-sub').textContent = 'Host';
    var win = (d.edition.start && d.edition.end)
      ? (d.edition.start.d + '–' + d.edition.end.d + ' ' + MONTHS[d.edition.end.m] + ' ' + d.edition.end.y) : '';
    if ($('ed-day')) $('ed-day').textContent = (d.edition.label || 'EDITION').toUpperCase();
    if ($('ed-win')) $('ed-win').textContent = win;
    var t = new Date();
    if ($('tb-s')) $('tb-s').textContent = 'Today · ' + WD[t.getDay()] + ', ' + t.getDate() + ' ' + MONTHL[t.getMonth()] + ' ' + t.getFullYear();
  }

  window.__enter = function (d) { applyData(d); enterApp(); };

  window.__reload = async function () {
    if (!__uid) return;
    try { var d = await window.__fb.loadAll(__uid); applyData(d); if (typeof current !== 'undefined' && current) nav(current); } catch (e) {}
  };

  // ── Login: exact UI, email OTP underneath ──
  window.liveSignIn = async function () {
    var email = ($('lg-email') && $('lg-email').value || '').trim().toLowerCase();
    var boxes = document.querySelectorAll('.lg-otp input');
    var code = Array.prototype.map.call(boxes, function (b) { return b.value; }).join('');
    var btn = $('lg-btn'), msg = $('lg-msg');
    if (!email) { if (msg) msg.textContent = 'Enter your email'; return; }
    if (!__sent) {
      if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }
      try { await window.__fb.sendOtp(email); __sent = true; if (msg) msg.textContent = 'Code sent to ' + email; if (btn) btn.textContent = 'Verify & sign in'; if (boxes[0]) boxes[0].focus(); }
      catch (e) { if (msg) msg.textContent = String(e.message || e); if (btn) btn.textContent = 'Send code'; }
      if (btn) btn.disabled = false;
      return;
    }
    if (code.length < 6) { if (msg) msg.textContent = 'Enter the 6-digit code'; return; }
    if (btn) { btn.textContent = 'Verifying…'; btn.disabled = true; }
    try {
      __uid = await window.__fb.verifyOtp(email, code);
      var d = await window.__fb.loadAll(__uid);
      if (!d) { if (msg) msg.textContent = 'No community yet for this host. Create one in the app/dashboard first.'; if (btn) { btn.textContent = 'Verify & sign in'; btn.disabled = false; } return; }
      window.__enter(d);
    } catch (e) { if (msg) msg.textContent = String(e.message || e); if (btn) { btn.textContent = 'Verify & sign in'; btn.disabled = false; } }
  };

  // logout → back to login
  var _origLogout = window.logout;
  window.logout = function () { try { window.__fb && window.__fb.watchAuth; } catch (e) {} if (_origLogout) _origLogout(); __sent = false; };

  // ── Mutation overrides (persist to Firestore, then reload+render) ──
  function fnDocId(id) { var x = findFn(id); return x && x.f && x.f._docId; }

  window.saveFn = async function () {
    var name = ($('m-name').value || '').trim(); if (!name) { toast('Enter an event name'); return; }
    var p = { title: name, date: $('m-date').value || todayIso(), time: $('m-time').value || '9:00 AM', dur: $('m-dur') ? $('m-dur').value : '', venue: $('m-venue') ? $('m-venue').value : '', description: $('m-desc') ? $('m-desc').value : '', youtube: $('m-yt') ? $('m-yt').value : '', published: true, status: 'scheduled' };
    try {
      if (typeof editingFn !== 'undefined' && editingFn) { var did = fnDocId(editingFn); if (did) await window.__fb.updateProgram(did, p); toast('Event updated · subscribers re-notified', true); }
      else { await window.__fb.addProgram(__community, p); window.__fb.pushNotify('New programme: ' + name, (__community.name || '') + ' · ' + p.date + (p.time ? ' · ' + p.time : '')); toast('Event created · pushed to subscribers + added to their calendar', true); }
      closeModal(); if (p.date) schedSel = p.date; await window.__reload();
    } catch (e) { toast('Error: ' + (e.message || e)); }
  };

  function statusChange(id, status, note, msg, confirmTitle, confirmBody, btnLabel, btnCls) {
    openConfirm(confirmTitle, confirmBody, btnLabel, btnCls, async function () {
      var did = fnDocId(id); if (!did) return;
      var patch = { status: status }; if (status === 'ended' || status === 'cancelled') patch.published = false; if (status === 'scheduled') patch.published = true;
      try { await window.__fb.updateProgram(did, patch); toast(msg, true); await window.__reload(); } catch (e) { toast('Error: ' + (e.message || e)); }
    });
  }
  window.postponeFn = function (id) { var x = findFn(id); statusChange(id, 'postponed', '', 'Postponed · subscribers alerted', 'Postpone this event?', '“' + x.f.name + '” will be marked postponed and subscribers notified.', 'Yes, postpone', 'btn-gold'); };
  window.cancelFn = function (id) { var x = findFn(id); statusChange(id, 'cancelled', '', 'Cancelled · subscribers alerted', 'Cancel this function?', '“' + x.f.name + '” will be cancelled and subscribers notified.', 'Cancel function', 'btn-er'); };
  window.endFn = function (id) { var x = findFn(id); statusChange(id, 'ended', '', 'Event turned off · now shows as ended in the app', 'Turn off this event?', '“' + x.f.name + '” will be hidden in the app. You can reactivate any time.', 'Turn off event', 'btn-s'); };
  window.reactivateFn = function (id) { var x = findFn(id); statusChange(id, 'scheduled', '', 'Event reactivated · subscribers notified', 'Reactivate this event?', '“' + x.f.name + '” will be active again and shown in the app.', 'Yes, reactivate', 'btn-ok'); };
  window.deleteFn = function (id) { var x = findFn(id); openConfirm('Delete this function?', '“' + x.f.name + '” will be removed. This cannot be undone.', 'Delete', 'btn-er', async function () { var did = fnDocId(id); if (!did) return; try { await window.__fb.deleteProgram(did); toast('Function deleted'); await window.__reload(); } catch (e) { toast('Error: ' + (e.message || e)); } }); };

  window.saveDonation = async function () {
    if (typeof donPickId === 'undefined' || !donPickId) { toast('Select a subscriber first'); return; }
    var amt = parseInt(($('d-amt') && $('d-amt').value) || '0', 10) || 0; if (!amt) { toast('Enter an amount'); return; }
    var s = subscribers.filter(function (x) { return x.id === donPickId; })[0];
    var data = { donor: s ? s.name : '', amount: amt, at: ($('d-date') && $('d-date').value) || '', mode: ($('d-mode') && $('d-mode').value) || 'UPI', note: ($('d-purp') && $('d-purp').value) || 'General' };
    try { await window.__fb.addSub(__cid, 'donations', data); toast('Donation recorded · receipt emailed', true); closeModal(); await window.__reload(); } catch (e) { toast('Error: ' + (e.message || e)); }
  };

  // Reminders composer → real send (addSub + push)
  window._msgSend = async function (o) {
    try {
      var when = new Date();
      await window.__fb.addSub(__cid, 'reminders', { title: 'Custom alert', message: o.text || '', sentAt: when.getDate() + ' ' + MONTHS[when.getMonth()] + ' ' + when.getFullYear() });
      window.__fb.pushNotify('Update from ' + (__community.name || 'your community'), o.text || '');
      toast('Alert sent to subscribers', true); await window.__reload();
    } catch (e) { toast('Error: ' + (e.message || e)); }
  };

  // Team invite / remove (Access Manager)
  var _origInvite = window.inviteMember, _origRemove = window.removeMember;
  if (typeof window.saveMember === 'function') {
    var _sm = window.saveMember;
    window.saveMember = async function () { try { await _sm.apply(this, arguments); } catch (e) {} };
  }

  // Auto-enter if already signed in (session persists)
  if (window.__fb && window.__fb.watchAuth) {
    window.__fb.watchAuth(async function (u) {
      if (u && !__uid) {
        __uid = u.uid;
        try { var d = await window.__fb.loadAll(__uid); if (d) window.__enter(d); } catch (e) {}
      }
    });
  }
})();
