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
      v.innerHTML = '<div style="text-align:center;"><div style="width:120px;margin:0 auto;background:#fff;border-radius:20px;padding:12px;box-shadow:0 10px 34px rgba(0,0,0,.28);"><img src="/logo.jpg" alt="Invite Karoo" style="width:100%;display:block;border-radius:10px;"/></div><div style="margin:18px auto 0;width:26px;height:26px;border:3px solid rgba(255,255,255,.25);border-top-color:#fff;border-radius:50%;animation:bootspin .8s linear infinite;"></div></div>';
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

  // Build an honest toast from the real /api/notify result. Previously these
  // sends were fire-and-forget with a hard-coded "sent" toast, so a failing
  // push/WhatsApp (e.g. server env not set → 500) looked like success. Now we
  // surface exactly what happened so delivery problems are visible.
  function pushToastMsg(prefix, r, cid) {
    if (!r || r.ok === false) return prefix + ' saved — but PUSH FAILED: ' + ((r && r.error) || 'no response from /api/notify');
    var parts = [prefix + ' · push sent'];
    if (!cid) parts.push('⚠ no community id (nobody subscribed to this topic)');
    if (r.wa && typeof r.wa.sent === 'number') parts.push('WhatsApp ' + r.wa.sent + '/' + r.wa.total);
    else if (r.wa && r.wa.error) parts.push('WhatsApp FAILED: ' + r.wa.error);
    return parts.join(' · ');
  }

  window.saveFn = async function () {
    var name = ($('m-name').value || '').trim(); if (!name) { toast('Enter an event name'); return; }
    var p = { title: name, date: $('m-date').value || todayIso(), time: (typeof time12==='function'?time12($('m-time').value):($('m-time').value)) || '9:00 AM', dur: $('m-dur') ? $('m-dur').value : '', venue: $('m-venue') ? $('m-venue').value : '', description: $('m-desc') ? $('m-desc').value : '', youtube: $('m-yt') ? $('m-yt').value : '', published: true, status: 'scheduled' };
    try {
      if (typeof editingFn !== 'undefined' && editingFn) { var did = fnDocId(editingFn); if (did) await window.__fb.updateProgram(did, p); var _cn = (__community.name || 'your community'); var _line = name + ' has been updated · ' + p.date + (p.time ? ' · ' + p.time : ''); var _ru = await window.__fb.pushNotify('Update from ' + _cn, _line, __cid, { template: 'community_update', bodyVars: [_cn, _line] }); toast(pushToastMsg('Event updated', _ru, __cid), !(_ru && _ru.ok === false)); }
      else { await window.__fb.addProgram(__community, p); var _r = await window.__fb.pushNotify('New programme: ' + name, (__community.name || '') + ' · ' + p.date + (p.time ? ' · ' + p.time : ''), __cid, { template: 'new_programme_alert', bodyVars: [(__community.name || 'the community'), name, (p.date + (p.time ? ' · ' + p.time : '')), (p.venue || __community.venue || '—')] }); toast(pushToastMsg('Event created', _r, __cid), !(_r && _r.ok === false)); }
      closeModal(); if (p.date) schedSel = p.date; await window.__reload();
    } catch (e) { toast('Error: ' + (e.message || e)); }
  };

  function statusChange(id, status, note, msg, confirmTitle, confirmBody, btnLabel, btnCls) {
    openConfirm(confirmTitle, confirmBody, btnLabel, btnCls, async function () {
      var did = fnDocId(id); if (!did) return;
      var patch = { status: status }; if (status === 'ended' || status === 'cancelled') patch.published = false; if (status === 'scheduled') patch.published = true;
      try {
        await window.__fb.updateProgram(did, patch);
        // Actually alert subscribers with an FCM push. 'ended' (turn off) is a
        // silent hide, so it does not notify.
        if (status !== 'ended') {
          var x = findFn(id); var evName = (x && x.f && x.f.name) || 'An event';
          var verb = status === 'cancelled' ? 'cancelled' : status === 'postponed' ? 'postponed' : 'back on';
          var pfx = status === 'cancelled' ? 'Cancelled' : status === 'postponed' ? 'Postponed' : 'Reactivated';
          var commName = (__community.name || 'your community');
          var line = evName + ' has been ' + verb + '.';
          // Push + WhatsApp fan-out (community_update template).
          var _r = await window.__fb.pushNotify('Update from ' + commName, line, __cid, { template: 'community_update', bodyVars: [commName, line] });
          toast(pushToastMsg(pfx, _r, __cid), !(_r && _r.ok === false));
        } else {
          toast(msg, true);
        }
        await window.__reload();
      } catch (e) { toast('Error: ' + (e.message || e)); }
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
    var email = (($('d-email') && $('d-email').value) || '').trim();
    var data = { donor: s ? s.name : '', amount: amt, at: ($('d-date') && $('d-date').value) || '', mode: ($('d-mode') && $('d-mode').value) || 'UPI', note: ($('d-purp') && $('d-purp').value) || 'General', email: email };
    try {
      await window.__fb.addSub(__cid, 'donations', data);
      toast('Donation recorded', true);
      closeModal();
      // Auto-email the PDF receipt when the donor's email was captured.
      if (email) {
        await sendDonationReceipt({ donor: data.donor, amt: amt, date: (typeof fmtIsoDM === 'function' && data.at) ? fmtIsoDM(data.at) : data.at, mode: data.mode, purpose: data.note, no: (typeof donations !== 'undefined' ? donations.length + 1 : 1) }, email);
      }
      await window.__reload();
    } catch (e) { toast('Error: ' + (e.message || e)); }
  };

  // Reminders composer → real send (addSub + push)
  window._msgSend = async function (o) {
    try {
      var when = new Date();
      await window.__fb.addSub(__cid, 'reminders', { title: 'Custom alert', message: o.text || '', sentAt: when.getDate() + ' ' + MONTHS[when.getMonth()] + ' ' + when.getFullYear() });
      var _r = await window.__fb.pushNotify('Update from ' + (__community.name || 'your community'), o.text || '', __cid, { template: 'community_update', bodyVars: [(__community.name || 'your community'), (o.text || '')] });
      toast(pushToastMsg('Alert', _r, __cid), !(_r && _r.ok === false)); await window.__reload();
    } catch (e) { toast('Error: ' + (e.message || e)); }
  };

  // "Send broadcast" composer → REAL send. The dash.js sendBroadcast() is a
  // no-op stub: it only added a fake log row and toasted "Broadcast sent" while
  // sending nothing. This override actually pushes to the community's FCM topic
  // and/or fans out WhatsApp, honouring the In-app / WhatsApp channel toggles.
  window.sendBroadcast = async function () {
    var msgEl = document.getElementById('bc-msg');
    var msg = ((msgEl && msgEl.value) || '').trim();
    var appEl = document.getElementById('bc-app');
    var waEl = document.getElementById('bc-wa');
    var app = !!(appEl && appEl.classList.contains('on'));
    var wa = !!(waEl && waEl.classList.contains('on'));
    if (!app && !wa) { toast('Pick at least one channel'); return; }
    if (!msg) { toast('Type a message first'); return; }
    if (!__cid) { toast('No community loaded — reopen the dashboard'); return; }
    var commName = (__community && __community.name) || 'your community';
    try {
      var when = new Date();
      await window.__fb.addSub(__cid, 'reminders', { title: 'Announcement', message: msg, sentAt: when.getDate() + ' ' + MONTHS[when.getMonth()] + ' ' + when.getFullYear() });
      var waPayload = wa ? { template: 'community_update', bodyVars: [commName, msg] } : null;
      // 5th arg = whether to send the in-app push (false → WhatsApp only).
      var _r = await window.__fb.pushNotify('Update from ' + commName, msg, __cid, waPayload, app);
      toast(pushToastMsg('Broadcast', _r, __cid), !(_r && _r.ok === false));
      if (msgEl) msgEl.value = '';
      await window.__reload();
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
      busy(true, 'Uploading…');
      var dataUrl = await downscale(file, kind === 'logo' ? 400 : 1400);
      // Upload to Cloudflare R2 (server route) → returns a public media URL.
      var res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: dataUrl, folder: 'community/' + (__cid || 'x') + '/' + kind, ext: 'jpg' }),
      });
      var j = await res.json();
      busy(false);
      if (!j || !j.ok || !j.url) { toast('Upload failed: ' + ((j && j.error) || res.status)); return; }
      var url = j.url;
      // Visual feedback on the tile.
      var tile = $(kind + '-tile');
      if (tile) { tile.style.background = '#fff center/cover no-repeat url("' + url + '")'; if (kind === 'cover') { tile.style.border = '1.5px solid var(--bd2)'; tile.innerHTML = '<input type="file" accept="image/*" style="display:none" onchange="uploadImg(this,\'cover\')"/>'; } else { tile.innerHTML = '<input type="file" accept="image/*" style="display:none" onchange="uploadImg(this,\'logo\')"/>'; } }
      var data = {}; data[kind] = url;
      await window.__fb.updateCommunity(__cid, data);
      if (typeof community !== 'undefined' && community) community[kind] = url;
      toast((kind === 'logo' ? 'Logo' : 'Cover photo') + ' updated · shown across the app', true);
    } catch (e) { busy(false); toast('Upload failed: ' + (e.message || e)); }
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
  // Persist team-member suspend/reactivate (dash.js stub only flipped local state
  // and lost it on reload).
  window.memberSuspend = async function (id) {
    var m = team.filter(function (x) { return x.id === id; })[0]; if (!m) return;
    var next = m.status === 'suspended' ? 'active' : 'suspended';
    try { await window.__fb.updateSub(__cid, 'team', id, { status: next }); closeDrawer(); toast(m.name + (next === 'suspended' ? ' suspended' : ' reactivated'), next !== 'suspended'); await window.__reload(); } catch (e) { toast('Error: ' + (e.message || e)); }
  };
  // Team invites are just a team record + email-OTP login — there is no separate
  // invite email to "re-send". Tell the truth instead of faking it.
  window.resendInvite = function (id) {
    var m = team.filter(function (x) { return x.id === id; })[0]; if (!m) return;
    toast(m.name + ' can sign in now at the host dashboard with ' + m.email + ' · email + OTP', true);
  };

  // ── Messaging specific subscribers (real WhatsApp send) ──
  // In-app push can only target a whole community topic (no per-device tokens
  // are stored), so targeted messages go out over WhatsApp; the app channel is
  // reported honestly rather than faked.
  async function sendMsgToSubs(recips, o) {
    var commName = (__community && __community.name) || 'your community';
    if (o.wa) {
      var nums = recips.map(function (s) { return s.phone; }).filter(Boolean);
      if (!nums.length) { toast('No mobile numbers on file for these subscribers'); }
      else {
        var okc = 0;
        for (var i = 0; i < nums.length; i++) {
          try { var r = await window.__fb.sendWhatsApp(nums[i], 'community_update', 'en', [commName, o.text]); if (r && r.ok) okc++; } catch (e) {}
        }
        toast('WhatsApp: ' + okc + '/' + nums.length + ' sent' + (okc < nums.length ? ' (check template approval)' : ''), okc > 0);
      }
    }
    if (o.app && !o.wa) {
      toast('In-app messages to selected subscribers aren’t supported yet — use “Send broadcast” to reach all, or WhatsApp for individuals.');
    }
  }
  window.remindSub = function (id) {
    var s = subscribers.filter(function (x) { return x.id === id; })[0]; if (!s) return;
    openMsgModal(s.name + ' · ' + (s.phone || 'no number'), function (o) { return sendMsgToSubs([s], o); });
  };
  window.bulkMsg = function () {
    var recips = subscribers.filter(function (s) { return selectedSubs[s.id]; });
    if (!recips.length) return;
    openMsgModal(recips.length + ' selected subscriber' + (recips.length === 1 ? '' : 's'), function (o) { clearSel(); return sendMsgToSubs(recips, o); });
  };
  // Donor thank-you over WhatsApp (was a fake toast).
  window.waThankYou = async function (id) {
    var d = findDon(id); if (!d) return;
    var s = subscribers.filter(function (x) { return x.id === d.sub; })[0];
    var phone = s && s.phone;
    if (!phone) { toast('No mobile number on file for this donor'); return; }
    var commName = (__community && __community.name) || 'your community';
    var text = 'Thank you for your generous donation of ₹' + (d.amt || 0) + ' to ' + commName + '. 🙏';
    try { var r = await window.__fb.sendWhatsApp(phone, 'community_update', 'en', [commName, text]); toast(r && r.ok ? 'WhatsApp thank-you sent to ' + (s.name || 'donor') : 'WhatsApp failed: ' + ((r && r.error) || 'check template approval'), !!(r && r.ok)); } catch (e) { toast('Error: ' + (e.message || e)); }
  };
  // Email a PDF-invoice donation receipt via Resend (was a fake toast).
  async function sendDonationReceipt(d, toEmail) {
    var email = (toEmail || d.email || '').trim();
    if (!email) { toast('No donor email on file — add one on the donation to email the receipt'); return { ok: false }; }
    var commName = (__community && __community.name) || 'your community';
    var payload = {
      to: email,
      donorName: d.donor || 'Donor',
      receiptNo: (typeof receiptNo === 'function' ? receiptNo(d) : ('IK/2026/' + String(d.no || 1).padStart(4, '0'))),
      amount: d.amt || d.amount || 0,
      date: d.date || d.at || '',
      mode: d.mode || '-',
      purpose: d.purpose || d.note || 'General',
      communityName: commName,
    };
    try {
      var r = await window.__fb.sendReceipt(payload);
      toast(r && r.ok ? 'Receipt emailed to ' + email : 'Receipt email failed: ' + ((r && r.error) || 'unknown'), !!(r && r.ok));
      return r;
    } catch (e) { toast('Error: ' + (e.message || e)); return { ok: false }; }
  }
  window.emailReceipt = function (id) {
    var d = findDon(id); if (!d) return;
    return sendDonationReceipt(d);
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

  // ── OTP boxes: digit-only + numeric keypad, auto-advance on type, and
  //    backspace jumps to (and clears) the previous box one by one. ──
  function wireOtp() {
    var boxes = document.querySelectorAll('.lg-otp input');
    if (!boxes.length) return;
    Array.prototype.forEach.call(boxes, function (b, i) {
      b.addEventListener('input', function () {
        b.value = (b.value || '').replace(/[^0-9]/g, '').slice(0, 1);
        if (b.value && i < boxes.length - 1) boxes[i + 1].focus();
      });
      b.addEventListener('keydown', function (e) {
        if (e.key === 'Backspace') {
          if (!b.value && i > 0) {
            boxes[i - 1].value = '';
            boxes[i - 1].focus();
            e.preventDefault();
          }
        } else if (e.key === 'ArrowLeft' && i > 0) {
          boxes[i - 1].focus(); e.preventDefault();
        } else if (e.key === 'ArrowRight' && i < boxes.length - 1) {
          boxes[i + 1].focus(); e.preventDefault();
        }
      });
      b.addEventListener('paste', function (e) {
        var t = ((e.clipboardData || window.clipboardData).getData('text') || '').replace(/[^0-9]/g, '');
        if (t.length > 1) {
          e.preventDefault();
          for (var k = 0; k < boxes.length; k++) boxes[k].value = t[k] || '';
          var last = Math.min(t.length, boxes.length) - 1;
          if (last >= 0) boxes[last].focus();
        }
      });
    });
  }
  wireOtp();
})();
