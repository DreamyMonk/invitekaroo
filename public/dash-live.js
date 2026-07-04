/* ── LIVE adapter: layers Firestore + email-OTP on top of the verbatim
   reference dashboard (dash.js). Reassigns the demo data vars with real
   Firestore data and overrides the mutation + login handlers. ───────────── */
(function () {
  var __uid = null, __community = null, __cid = null, __sent = false;

  // Make the reference use the REAL current date (it hardcodes 22 May 2026).
  try { var _n = new Date(); TODAY = { y: _n.getFullYear(), m: _n.getMonth(), d: _n.getDate() }; DEMO_NOW_MIN = _n.getHours() * 60 + _n.getMinutes(); } catch (e) {}

  function $(id) { return document.getElementById(id); }

  // Boot veil — cover the login screen until Firebase resolves the persisted
  // session, so a signed-in host doesn't see a login flash on refresh.
  (function () {
    try {
      var st = document.createElement('style');
      st.textContent = '@keyframes bootspin{to{transform:rotate(360deg)}}';
      document.head.appendChild(st);
      var v = document.createElement('div'); v.id = 'boot-veil';
      v.style.cssText = 'position:fixed;inset:0;z-index:99999;background:linear-gradient(160deg,#1A0E3D,#3D2582,#7C5CBF);display:flex;align-items:center;justify-content:center;';
      v.innerHTML = '<div style="text-align:center;color:#fff;font-family:Fraunces,Georgia,serif;"><div style="font-size:2rem;font-weight:900;letter-spacing:-.5px;">Invite <span style="color:#F5C87A;">Karoo</span></div><div style="margin:16px auto 0;width:26px;height:26px;border:3px solid rgba(255,255,255,.25);border-top-color:#fff;border-radius:50%;animation:bootspin .8s linear infinite;"></div></div>';
      (document.body || document.documentElement).appendChild(v);
    } catch (e) {}
  })();
  var _veilGone = false;
  function hideVeil() { if (_veilGone) return; _veilGone = true; var v = $('boot-veil'); if (!v) return; v.style.transition = 'opacity .25s'; v.style.opacity = '0'; setTimeout(function () { if (v.parentNode) v.parentNode.removeChild(v); }, 260); }
  // Safety net: never trap the user behind the veil if auth never resolves.
  setTimeout(hideVeil, 6000);

  // Busy overlay — shown while a Firestore write/read is in flight so the host
  // knows the action is processing (e.g. a delete isn't lost, just saving).
  function busy(on, label) {
    var b = $('busy-veil');
    if (on) {
      if (!b) {
        b = document.createElement('div'); b.id = 'busy-veil';
        b.style.cssText = 'position:fixed;inset:0;z-index:90000;background:rgba(26,14,61,.26);display:flex;align-items:center;justify-content:center;';
        b.innerHTML = '<div style="background:#fff;border-radius:14px;padding:15px 22px;box-shadow:0 14px 44px rgba(0,0,0,.20);display:flex;align-items:center;gap:12px;"><div style="width:20px;height:20px;border:3px solid rgba(60,37,130,.22);border-top-color:#3D2582;border-radius:50%;animation:bootspin .8s linear infinite;"></div><span id="busy-label" style="font-size:.8rem;font-weight:700;color:#3D2582;font-family:Inter,system-ui,sans-serif;">Working…</span></div>';
        (document.body || document.documentElement).appendChild(b);
      }
      var l = $('busy-label'); if (l) l.textContent = label || 'Working…'; b.style.display = 'flex';
    } else if (b) { b.style.display = 'none'; }
  }
  window.busy = busy;

  function applyData(d) {
    community = d.community;                 // eslint-disable-line
    edition = d.edition;                     // eslint-disable-line
    programmes = d.programmes;               // eslint-disable-line
    subscribers = d.subscribers;             // eslint-disable-line
    attLog = d.attLog;                       // eslint-disable-line
    donations = d.donations;                 // eslint-disable-line
    reminders = d.reminders;                 // eslint-disable-line
    team = d.team;                           // eslint-disable-line
    if (d.reminderAutomation) { try { reminderAutomation = d.reminderAutomation; } catch (e) {} }
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

  window.__enter = function (d) { applyData(d); enterApp(); hideVeil(); };

  window.__reload = async function () {
    if (!__uid) return;
    busy(true, 'Updating…');
    try { var d = await window.__fb.loadAll(__uid); applyData(d); if (typeof current !== 'undefined' && current) nav(current); } catch (e) {}
    finally { busy(false); }
  };

  // ── Login: exact UI, email OTP underneath. "Send code" sits beside the email
  //    field (per client request); the main button verifies + signs in. ──
  window.liveSendCode = async function () {
    var email = ($('lg-email') && $('lg-email').value || '').trim().toLowerCase();
    var send = $('lg-send'), msg = $('lg-msg');
    if (!email || email.indexOf('@') < 1) { if (msg) msg.textContent = 'Enter a valid email'; return; }
    window.__hostEmail = email;
    if (send) { send.textContent = 'Sending…'; send.disabled = true; }
    busy(true, 'Sending code…');
    try {
      await window.__fb.sendOtp(email); __sent = true;
      if (msg) msg.textContent = 'Code sent to ' + email;
      if (send) send.textContent = 'Resend';
      var b0 = document.querySelector('.lg-otp input'); if (b0) b0.focus();
    } catch (e) { if (msg) msg.textContent = String(e.message || e); if (send) send.textContent = 'Send code'; }
    finally { busy(false); }
    if (send) send.disabled = false;
  };

  window.liveSignIn = async function () {
    var email = ($('lg-email') && $('lg-email').value || '').trim().toLowerCase();
    var boxes = document.querySelectorAll('.lg-otp input');
    var code = Array.prototype.map.call(boxes, function (b) { return b.value; }).join('');
    var btn = $('lg-btn'), msg = $('lg-msg');
    if (!email) { if (msg) msg.textContent = 'Enter your email'; return; }
    if (!__sent) { if (msg) msg.textContent = 'Tap “Send code” first'; return; }
    if (code.length < 6) { if (msg) msg.textContent = 'Enter the 6-digit code'; return; }
    if (btn) { btn.textContent = 'Verifying…'; btn.disabled = true; }
    busy(true, 'Signing in…');
    try {
      __uid = await window.__fb.verifyOtp(email, code);
      var d = await window.__fb.loadAll(__uid);
      if (!d) { busy(false); if (msg) msg.textContent = 'No community yet for this host — create one first.'; if (btn) { btn.textContent = 'Sign in'; btn.disabled = false; } return; }
      busy(false); window.__enter(d);
    } catch (e) { busy(false); if (msg) msg.textContent = String(e.message || e); if (btn) { btn.textContent = 'Sign in'; btn.disabled = false; } }
  };

  // logout → back to login
  var _origLogout = window.logout;
  window.logout = function () { try { window.__fb && window.__fb.watchAuth; } catch (e) {} if (_origLogout) _origLogout(); __sent = false; };

  // ── Mutation overrides (persist to Firestore, then reload+render) ──
  function fnDocId(id) { var x = findFn(id); return x && x.f && x.f._docId; }

  window.saveFn = async function () {
    var name = ($('m-name').value || '').trim(); if (!name) { toast('Enter an event name'); return; }
    var p = { title: name, date: $('m-date').value || todayIso(), time: (typeof time12==='function'?time12($('m-time').value):($('m-time').value)) || '9:00 AM', dur: $('m-dur') ? $('m-dur').value : '', venue: $('m-venue') ? $('m-venue').value : '', description: $('m-desc') ? $('m-desc').value : '', youtube: $('m-yt') ? $('m-yt').value : '', published: true, status: 'scheduled' };
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

  // ── Live stats helpers (called by the reference render functions) ──
  window.subsFmt = function () { try { return Number(subscribers.length).toLocaleString('en-IN'); } catch (e) { return '0'; } };
  window.totalCheckins = function () { try { var n = 0; for (var k in attLog) n += attLog[k].length; return n; } catch (e) { return 0; } };
  window.donTotal = function () { try { return donations.reduce(function (s, d) { return s + (d.amt || 0); }, 0); } catch (e) { return 0; } };
  window.citiesReached = function () { try { var s = {}; subscribers.forEach(function (x) { if (x.city) s[x.city] = 1; }); return Object.keys(s).length; } catch (e) { return 0; } };

  // ── Community profile save ──
  window.saveCommunity = async function () {
    var g = function (id) { var e = $(id); return e ? e.value : undefined; };
    var data = {};
    [['name', 'name'], ['recur', 'recurrence'], ['about', 'about'], ['city', 'city'], ['area', 'area'], ['venue', 'venue'], ['guru', 'guru'], ['venueAddr', 'venueAddr']].forEach(function (p) { var v = g('c-' + p[0]); if (v !== undefined) data[p[1]] = v; });
    try { await window.__fb.updateCommunity(__cid, data); toast('Community profile saved · updated across the app', true); await window.__reload(); } catch (e) { toast('Error: ' + (e.message || e)); }
  };

  // ── Logo / cover upload (downscaled to a small JPEG data URL, stored on the community doc) ──
  function downscale(file, maxW) {
    return new Promise(function (res, rej) {
      var fr = new FileReader();
      fr.onload = function () {
        var img = new Image();
        img.onload = function () {
          var w = img.width, h = img.height, scale = Math.min(1, maxW / w);
          var cw = Math.round(w * scale), ch = Math.round(h * scale);
          var cv = document.createElement('canvas'); cv.width = cw; cv.height = ch;
          cv.getContext('2d').drawImage(img, 0, 0, cw, ch);
          res(cv.toDataURL('image/jpeg', 0.82));
        };
        img.onerror = rej; img.src = fr.result;
      };
      fr.onerror = rej; fr.readAsDataURL(file);
    });
  }
  window.uploadImg = async function (input, kind) {
    var file = input && input.files && input.files[0]; if (!file) return;
    try {
      var url = await downscale(file, kind === 'logo' ? 256 : 1000);
      // instant visual feedback on the tile
      var tile = $(kind + '-tile');
      if (tile) { tile.style.background = '#fff center/cover no-repeat url("' + url + '")'; if (kind === 'cover') { tile.style.border = '1.5px solid var(--bd2)'; tile.innerHTML = '<input type="file" accept="image/*" style="display:none" onchange="uploadImg(this,\'cover\')"/>'; } else { tile.innerHTML = '<input type="file" accept="image/*" style="display:none" onchange="uploadImg(this,\'logo\')"/>'; } }
      var data = {}; data[kind] = url;
      await window.__fb.updateCommunity(__cid, data);
      if (typeof community !== 'undefined' && community) community[kind] = url;
      toast((kind === 'logo' ? 'Logo' : 'Cover photo') + ' updated · shown across the app', true);
    } catch (e) { toast('Upload failed: ' + (e.message || e)); }
  };

  // ── Create / update the active edition ──
  window.createEdition = async function () {
    var g = function (id) { var e = $(id); return e ? e.value : ''; };
    var name = g('ne-name').trim(), sv = g('ne-start'), ev = g('ne-end'), venue = g('ne-venue').trim();
    if (!name) { toast('Enter an edition name'); return; }
    if (!sv || !ev) { toast('Pick start and end dates'); return; }
    var sd = new Date(sv), ed = new Date(ev);
    var days = Math.max(1, Math.round((ed - sd) / 86400000) + 1);
    var data = { editionLabel: name, editionStart: sv, editionEnd: ev, editionDays: days };
    if (venue) data.venue = venue;
    try { await window.__fb.updateCommunity(__cid, data); toast('Edition “' + name + '” created', true); await window.__reload(); } catch (e) { toast('Error: ' + (e.message || e)); }
  };

  // ── Rewards ──
  window.saveGift = async function (id) {
    var s = subscribers.filter(function (x) { return x.id === id; })[0]; if (!s) return;
    var gv = ($('gift-name') && $('gift-name').value || '').trim(); if (!gv) { toast('Enter a gift'); return; }
    try { await window.__fb.addSub(__cid, 'rewards', { devotee: s.name, gift: gv, reason: '' }); closeModal(); toast('Gift “' + gv + '” given to ' + s.name + ' 🎁'); await window.__reload(); } catch (e) { toast('Error: ' + (e.message || e)); }
  };
  window.clearGift = async function (id) {
    var s = subscribers.filter(function (x) { return x.id === id; })[0]; if (!s) return; closeModal();
    try { if (s._giftDoc) await window.__fb.deleteSub(__cid, 'rewards', s._giftDoc); toast('Gift removed'); await window.__reload(); } catch (e) { toast('Error: ' + (e.message || e)); }
  };

  // ── Subscriber suspend / reactivate ──
  window.toggleSuspend = async function (id) {
    var s = subscribers.filter(function (x) { return x.id === id; })[0]; if (!s || !s._docId) return;
    var sus = s.status !== 'suspended';
    try { await window.__fb.updateSub(__cid, 'subscribers', s._docId, { suspended: sus }); closeDrawer(); toast(s.name + (sus ? ' suspended' : ' reactivated')); await window.__reload(); } catch (e) { toast('Error: ' + (e.message || e)); }
  };

  // ── Team / Access Manager ──
  window.sendInvite = async function () {
    var email = ($('inv-email') && $('inv-email').value || '').trim(); if (!email || email.indexOf('@') < 1) { toast('Enter a valid email'); return; }
    var name = ($('inv-name') && $('inv-name').value || '').trim() || email.split('@')[0];
    var role = $('inv-role') ? $('inv-role').value : 'Viewer';
    try { await window.__fb.addSub(__cid, 'team', { name: name, email: email, role: role }); closeModal(); toast('Invite sent to ' + email + ' · they log in with email + OTP'); await window.__reload(); } catch (e) { toast('Error: ' + (e.message || e)); }
  };
  window.saveMember = async function () {
    var m = team.filter(function (x) { return x.id === apMember; })[0]; if (!m) return;
    try { await window.__fb.updateSub(__cid, 'team', m.id, { role: apRole, perms: apPerms }); closeDrawer(); toast('Access updated for ' + m.name); await window.__reload(); } catch (e) { toast('Error: ' + (e.message || e)); }
  };
  window.memberRevoke = function (id) {
    var m = team.filter(function (x) { return x.id === id; })[0]; if (!m) return;
    openConfirm('Revoke access?', 'Remove ' + m.name + ' from your team? They lose all access.', 'Revoke', 'btn-er', async function () {
      try { await window.__fb.deleteSub(__cid, 'team', m.id); toast(m.name + ' removed'); await window.__reload(); } catch (e) { toast('Error: ' + (e.message || e)); }
    });
  };

  // ── Reminder automation rules → persist to the community doc ──
  function persistRules() { try { window.__fb.updateCommunity(__cid, { reminderRules: reminderAutomation }); } catch (e) {} }
  var _tra = window.toggleRemAuto, _rra = window.removeRemAuto, _trc = window.toggleRemCh, _sra = window.saveRemAuto;
  if (_tra) window.toggleRemAuto = function (id) { _tra(id); persistRules(); };
  if (_rra) window.removeRemAuto = function (id) { _rra(id); persistRules(); };
  if (_trc) window.toggleRemCh = function (id, ch) { _trc(id, ch); persistRules(); };
  if (_sra) window.saveRemAuto = function () { _sra(); persistRules(); };

  // Fault-tolerant nav: a throw in one view's render must NOT leave the old view
  // stuck (that's why clicking a menu item "did nothing"). Render into #view
  // inside try/catch so the view always changes and errors surface.
  window.nav = function (id) {
    current = id;
    var cfg = (NAVCFG.filter(function (x) { return x.id === id; })[0]) || { t: id, s: '' };
    var tt = $('tb-t'); if (tt) tt.textContent = cfg.t;
    var ts = $('tb-s'); if (ts) ts.textContent = cfg.s;
    buildNav();
    var v = $('view');
    var map = { overview: vOverview, schedule: vSchedule, community: vCommunity, editions: vEditions, subscribers: vSubscribers, attendance: vAttendance, analytics: vAnalytics, rsvp: vRSVP, donations: vDonations, rewards: vRewards, reminders: vReminders, access: vAccess, settings: vSettings };
    var fn = map[id], html = '';
    try { html = fn ? fn() : ''; }
    catch (e) { console.error('view ' + id + ' render error:', e); html = '<div class="card"><div class="empty"><div class="t">Couldn’t render this view</div><div class="s">' + ((e && e.message) ? e.message : e) + '</div></div></div>'; }
    if (v) v.innerHTML = '<div class="view-in">' + html + '</div>';
    var vw = document.querySelector('.view'); if (vw) vw.scrollTop = 0;
    if (window._afterHooks) { try { window._afterHooks(id); } catch (e) { console.error('afterHooks ' + id, e); } }
    if (id === 'overview' && ts) { var t = new Date(); ts.textContent = 'Today · ' + WD[t.getDay()] + ', ' + t.getDate() + ' ' + MONTHL[t.getMonth()] + ' ' + t.getFullYear(); }
  };

  // Auto-enter if already signed in (session persists)
  if (window.__fb && window.__fb.watchAuth) {
    window.__fb.watchAuth(async function (u) {
      if (u && !__uid) {
        __uid = u.uid;
        try { var d = await window.__fb.loadAll(__uid); if (d) { window.__enter(d); return; } } catch (e) {}
        hideVeil();
      } else if (!u) {
        // No persisted session → reveal the login screen.
        hideVeil();
      }
    });
  } else {
    hideVeil();
  }
})();
