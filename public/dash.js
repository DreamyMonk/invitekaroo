/* ═══════════════ ICONS (Lucide-style, inline) ═══════════════ */
var IC={
  grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
  flower:'<circle cx="12" cy="12" r="2.5"/><path d="M12 9.5c0-2 1.5-3.5 0-5.5-1.5 2-1.5 3.5 0 5.5M12 14.5c0 2-1.5 3.5 0 5.5 1.5-2 1.5-3.5 0-5.5M9.5 12c-2 0-3.5 1.5-5.5 0 2-1.5 3.5-1.5 5.5 0M14.5 12c2 0 3.5-1.5 5.5 0-2 1.5-3.5 1.5-5.5 0"/>',
  layers:'<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  cal:'<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  qr:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><line x1="14" y1="14" x2="14" y2="17"/><line x1="17" y1="14" x2="21" y2="14"/><line x1="21" y1="14" x2="21" y2="21"/><line x1="14" y1="21" x2="18" y2="21"/>',
  heart:'<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  gift:'<polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>',
  bell:'<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  chart:'<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  pin:'<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  building:'<path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-3"/>',
  guru:'<path d="M12 2a3 3 0 0 0-3 3c0 1.5.7 2.5 1.5 3.5C9 10 8 11.5 8 14a4 4 0 0 0 8 0c0-2.5-1-4-2.5-5.5C14.3 7.5 15 6.5 15 5a3 3 0 0 0-3-3z"/><path d="M9 17v5M15 17v5"/>',
  edit:'<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
  trash:'<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  plus:'<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  x:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  check:'<polyline points="20 6 9 17 4 12"/>',
  chevR:'<polyline points="9 18 15 12 9 6"/>',
  chevL:'<polyline points="15 18 9 12 15 6"/>',
  refresh:'<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>',
  wa:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  send:'<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
  rupee:'<path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3a5 5 0 0 0 0-10"/>',
  star:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  ban:'<circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>',
  arrowR:'<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  img:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
  info:'<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
  search:'<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  trend:'<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  award:'<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
  logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>'
};
function sIcon(n,cls){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="'+(cls||'')+'">'+(IC[n]||'')+'</svg>';}

/* ═══════════════ DATA MODEL ═══════════════ */
var TODAY={y:2026,m:4,d:22}; // 22 May 2026 (0-indexed month)
var MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var MONTHL=['January','February','March','April','May','June','July','August','September','October','November','December'];
var WD=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

var community={
  name:'Jain Community Sammelan',
  about:'A 9-day spiritual gathering for the Jain community featuring daily Pravachan, Yuva Sammelan, Bhakti Sangeet, Annadanam and Sandhya Aarti. Open to all subscribers.',
  recurrence:'Annual',
  // discovery attributes (one-time setup) — drive search visibility
  city:'Chennai', area:'Nandambakkam',
  venue:'Chennai Convention Centre',
  venueAddr:'Mount Poonamallee High Rd, Nandambakkam, Chennai – 600089',
  guru:'Muni Shri Tarun Sagar Ji', guruDesc:'Senior Jain Acharya · Digambar tradition',
  youtube:'https://youtube.com/@jainsammelan/live', helpline:'+91 90000 12345',
  amenities:['Parking','Wheelchair access','Prasad / Bhojan','Live stream']
};
var edition={ label:'Edition 2', start:{y:2026,m:4,d:20}, end:{y:2026,m:4,d:28}, days:9, status:'active' };
var nextEdition={ label:'Edition 3', text:'10 Oct – 25 Dec 2026 · venue TBA', inDays:135 };

// programmes keyed by ISO date 'YYYY-MM-DD'
var programmes={
  '2026-05-20':[
    {id:1,name:'Inauguration & Mangalacharan',time:'9:00 AM',dur:'90 min',venue:'Main Hall',guru:1,status:'done',rem:['1d','1h']},
    {id:2,name:'Opening Pravachan',time:'11:00 AM',dur:'2 hr',venue:'Main Hall',guru:1,status:'done',rem:['1h']},
    {id:3,name:'Sandhya Aarti',time:'6:30 PM',dur:'45 min',venue:'Mandir Hall',status:'done',rem:['1h']}
  ],
  '2026-05-21':[
    {id:4,name:'Morning Pravachan',time:'7:00 AM',dur:'2 hr',venue:'Main Hall',guru:1,status:'done',rem:['1d','1h']},
    {id:5,name:'Bhakti Sangeet',time:'5:00 PM',dur:'90 min',venue:'Open Air Theatre',status:'done',rem:['1h']}
  ],
  '2026-05-22':[
    {id:6,name:'Morning Pravachan',time:'7:00 AM',dur:'2 hr',venue:'Main Hall',guru:1,status:'live',rem:['1d','1h','15m']},
    {id:7,name:'Bhakti Sangeet',time:'10:00 AM',dur:'90 min',venue:'Main Hall',status:'scheduled',rem:['1h']},
    {id:8,name:'Community Lunch (Annadanam)',time:'12:30 PM',dur:'2 hr',venue:'Bhojan Hall',status:'scheduled',rem:['30m']},
    {id:9,name:'Yuva Sammelan',time:'4:00 PM',dur:'2 hr',venue:'Hall B',status:'scheduled',rem:['1d','1h']},
    {id:10,name:'Sandhya Aarti',time:'6:30 PM',dur:'45 min',venue:'Mandir Hall',status:'scheduled',rem:['1h']},
    {id:11,name:'Cultural Programme',time:'8:00 PM',dur:'2 hr',venue:'Open Air Theatre',status:'scheduled',rem:['1d']}
  ],
  '2026-05-23':[
    {id:12,name:'Morning Pravachan',time:'7:00 AM',dur:'2 hr',venue:'Main Hall',guru:1,status:'scheduled',rem:['1d','1h']},
    {id:13,name:'Mahila Sammelan',time:'11:00 AM',dur:'2 hr',venue:'Hall B',status:'scheduled',rem:['1d']},
    {id:14,name:'Community Lunch (Annadanam)',time:'12:30 PM',dur:'2 hr',venue:'Bhojan Hall',status:'scheduled',rem:['30m']},
    {id:15,name:'Bhajan Sandhya',time:'5:00 PM',dur:'90 min',venue:'Open Air Theatre',status:'postponed',rem:['1h'],note:'Moved from 4:00 PM due to guest arrival'}
  ],
  '2026-05-24':[
    {id:16,name:'Morning Pravachan',time:'7:00 AM',dur:'2 hr',venue:'Main Hall',guru:1,status:'scheduled',rem:['1d','1h']},
    {id:17,name:'Yuva Sammelan',time:'11:00 AM',dur:'2 hr',venue:'Hall B',status:'scheduled',rem:['1d']},
    {id:18,name:'Cultural Programme',time:'8:00 PM',dur:'2 hr',venue:'Open Air Theatre',status:'cancelled',rem:[],note:'Cancelled — performers unavailable'}
  ],
  '2026-05-25':[
    {id:19,name:'Morning Pravachan',time:'7:00 AM',dur:'2 hr',venue:'Main Hall',guru:1,status:'scheduled',rem:['1d','1h']},
    {id:20,name:'Sandhya Aarti',time:'6:30 PM',dur:'45 min',venue:'Mandir Hall',status:'scheduled',rem:['1h']}
  ],
  '2026-05-26':[{id:21,name:'Morning Pravachan',time:'7:00 AM',dur:'2 hr',venue:'Main Hall',guru:1,status:'scheduled',rem:['1d','1h']}],
  '2026-05-27':[{id:22,name:'Morning Pravachan',time:'7:00 AM',dur:'2 hr',venue:'Main Hall',guru:1,status:'scheduled',rem:['1d','1h']},{id:23,name:'Bhakti Sangeet',time:'5:00 PM',dur:'90 min',venue:'Open Air Theatre',status:'scheduled',rem:['1h']}],
  '2026-05-28':[{id:24,name:'Valedictory & Vidaai',time:'10:00 AM',dur:'2 hr',venue:'Main Hall',guru:1,status:'scheduled',rem:['1d','1h']}]
};
var _fnId=24;

// subscribers
var subscribers=[
  {id:1,name:'Anil Jain',family:'Jain',phone:'+91 98401 22113',city:'Chennai',since:'Edition 1',status:'active',editions:2,attended:18,rsvp:21,donated:25000,gift:'Gold (Top devotee)',events:['Morning Pravachan','Bhakti Sangeet','Annadanam']},
  {id:2,name:'Sunita Mehta',family:'Mehta',phone:'+91 99620 55410',city:'Chennai',since:'Edition 2',status:'active',editions:1,attended:14,rsvp:16,donated:11000,gift:null,events:['Bhakti Sangeet','Sandhya Aarti']},
  {id:3,name:'Rakesh Bothra',family:'Bothra',phone:'+91 90030 71288',city:'Chennai',since:'Edition 1',status:'active',editions:2,attended:21,rsvp:24,donated:51000,gift:'Platinum (Highest donor)',events:['Morning Pravachan','Annadanam','Cultural Programme','Yuva Sammelan']},
  {id:4,name:'Priya Shah',family:'Shah',phone:'+91 73059 90021',city:'Coimbatore',since:'Edition 2',status:'active',editions:1,attended:9,rsvp:12,donated:5100,gift:null,events:['Mahila Sammelan','Bhakti Sangeet']},
  {id:5,name:'Mahaveer Surana',family:'Surana',phone:'+91 98843 10077',city:'Chennai',since:'Edition 1',status:'active',editions:2,attended:16,rsvp:18,donated:21000,gift:null,events:['Morning Pravachan','Annadanam']},
  {id:6,name:'Kiran Doshi',family:'Doshi',phone:'+91 90420 88123',city:'Chennai',since:'Edition 2',status:'suspended',editions:1,attended:7,rsvp:9,donated:0,gift:null,events:['Cultural Programme']},
  {id:7,name:'Neha Sancheti',family:'Sancheti',phone:'+91 81229 44567',city:'Madurai',since:'Edition 2',status:'active',editions:1,attended:11,rsvp:13,donated:8000,gift:null,events:['Bhajan Sandhya','Annadanam']},
  {id:8,name:'Dinesh Kothari',family:'Kothari',phone:'+91 99529 30012',city:'Chennai',since:'Edition 1',status:'active',editions:2,attended:19,rsvp:22,donated:31000,gift:'Silver (Regular)',events:['Morning Pravachan','Sandhya Aarti','Yuva Sammelan']},
  {id:9,name:'Pooja Lodha',family:'Lodha',phone:'+91 70108 67234',city:'Chennai',since:'Edition 2',status:'active',editions:1,attended:5,rsvp:6,donated:2100,gift:null,events:['Mahila Sammelan']},
  {id:10,name:'Vikram Jain',family:'Jain',phone:'+91 98841 55098',city:'Chennai',since:'Edition 2',status:'active',editions:1,attended:13,rsvp:15,donated:15000,gift:null,events:['Morning Pravachan','Cultural Programme']}
];
var TOTAL_FUNCTIONS_SO_FAR=11; // functions held in edition up to today
// attendance log per function (today's functions) : fnId -> [subId...]
var attLog={ 6:[1,2,3,5,8,10], 7:[], 8:[], 9:[], 10:[], 11:[] };

// donations
var donations=[
  {id:1,no:1,sub:3,amt:51000,date:'21 May 2026',mode:'UPI',purpose:'Annadanam sponsor'},
  {id:2,no:2,sub:8,amt:31000,date:'21 May 2026',mode:'Cash',purpose:'General'},
  {id:3,no:3,sub:1,amt:25000,date:'20 May 2026',mode:'UPI',purpose:'Pravachan sponsor'},
  {id:4,no:4,sub:5,amt:21000,date:'22 May 2026',mode:'Bank',purpose:'General'},
  {id:5,no:5,sub:10,amt:15000,date:'20 May 2026',mode:'UPI',purpose:'Cultural night'},
  {id:6,no:6,sub:2,amt:11000,date:'22 May 2026',mode:'UPI',purpose:'General'},
  {id:7,no:7,sub:7,amt:8000,date:'21 May 2026',mode:'Cash',purpose:'Bhojan'}
];
var _rcptSeq=7;

// reminders / dispatch log
var reminders=[
  {id:1,kind:'reminder',fn:'Morning Pravachan',when:'Today 6:00 AM',msg:'Starts in 1 hour at Main Hall',ch:['app','wa'],reach:1248,status:'sent'},
  {id:2,kind:'postponed',fn:'Bhajan Sandhya',when:'23 May, auto',msg:'Rescheduled to 5:00 PM (from 4:00 PM)',ch:['app','wa'],reach:1248,status:'sent'},
  {id:3,kind:'cancelled',fn:'Cultural Programme · 24 May',when:'Today 8:10 AM',msg:'Cancelled — performers unavailable',ch:['app','wa'],reach:1248,status:'sent'},
  {id:4,kind:'reminder',fn:'Yuva Sammelan',when:'Today, scheduled',msg:'Starts in 1 day · Hall B',ch:['app'],reach:1248,status:'scheduled'},
  {id:5,kind:'new',fn:'Bhakti Sangeet · 27 May',when:'Yesterday 7:30 PM',msg:'New programme added to schedule',ch:['app','wa'],reach:1240,status:'sent'}
];

// reminder automation rules — default reminders pushed to subscribers for every event
var reminderAutomation=[
  {id:1,label:'1 day before',off:'1d',app:true,wa:true,on:true},
  {id:2,label:'1 hour before',off:'1h',app:true,wa:true,on:true},
  {id:3,label:'30 minutes before',off:'30m',app:true,wa:false,on:true},
  {id:4,label:'15 minutes before',off:'15m',app:true,wa:false,on:false},
  {id:5,label:'At start time',off:'0m',app:true,wa:false,on:true}
];
var _raId=5;

// ── Access Manager ──
var moduleList=[
  {id:'overview',label:'Overview',ic:'grid'},
  {id:'schedule',label:'Schedule',ic:'cal'},
  {id:'community',label:'Community Profile',ic:'flower'},
  {id:'editions',label:'Editions',ic:'layers'},
  {id:'subscribers',label:'Subscribers',ic:'users'},
  {id:'attendance',label:'Attendance & QR',ic:'qr'},
  {id:'analytics',label:'Analytics',ic:'chart'},
  {id:'rsvp',label:'RSVP',ic:'check'},
  {id:'donations',label:'Donations',ic:'rupee'},
  {id:'rewards',label:'Rewards',ic:'gift'},
  {id:'reminders',label:'Reminders',ic:'bell'},
  {id:'access',label:'Access Manager',ic:'user'}
];
var roleTemplates={
  'Owner':{all:'manage'},
  'Co-host':{all:'manage'},
  'Event Manager':{overview:'view',schedule:'manage',attendance:'manage',rsvp:'manage',analytics:'view',reminders:'manage'},
  'Accounts':{overview:'view',subscribers:'view',donations:'manage',rewards:'manage',analytics:'view'},
  'Volunteer':{overview:'view',schedule:'view',attendance:'manage',subscribers:'view'},
  'Viewer':{all:'view'},
  'Custom':{}
};
var team=[
  {id:1,name:'Mahesh Ranka',email:'mahesh@jainsammelan.org',role:'Owner',status:'owner',last:'Active now'},
  {id:2,name:'Suresh Jain',email:'suresh.jain@gmail.com',role:'Event Manager',status:'active',last:'2 hours ago'},
  {id:3,name:'Anita Shah',email:'anita.shah@gmail.com',role:'Accounts',status:'active',last:'Yesterday'},
  {id:4,name:'Rohit Bothra',email:'rohit.b@gmail.com',role:'Volunteer',status:'invited',last:'Invite pending'},
  {id:5,name:'Priya Mehta',email:'priya.mehta@gmail.com',role:'Viewer',status:'suspended',last:'5 days ago'}
];
var _tmId=5;
function permLevel(m,mod){if(m.perms&&m.perms[mod])return m.perms[mod];var t=roleTemplates[m.role];if(!t)return 'none';if(t.all)return t.all;return t[mod]||'none';}
function applyRoleToPerms(role){var t=roleTemplates[role]||{};var p={};moduleList.forEach(function(md){p[md.id]=t.all?t.all:(t[md.id]||'none');});return p;}
function modulesCount(m){return moduleList.filter(function(md){return permLevel(m,md.id)!=='none';}).length;}

/* ═══════════════ HELPERS ═══════════════ */
function iso(y,m,d){return y+'-'+String(m+1).padStart(2,'0')+'-'+String(d).padStart(2,'0');}
function todayIso(){return iso(TODAY.y,TODAY.m,TODAY.d);}
function fnsOn(isoStr){return programmes[isoStr]||[];}
function statusMeta(s){return {
  live:{cls:'cg',dot:'#16A34A',lbl:'● Live now'},
  scheduled:{cls:'ci',dot:'var(--in)',lbl:'Scheduled'},
  done:{cls:'cn',dot:'var(--ink4)',lbl:'Done'},
  cancelled:{cls:'ce',dot:'var(--er)',lbl:'Cancelled'},
  postponed:{cls:'ca',dot:'var(--g4)',lbl:'Postponed'},
  ended:{cls:'cn',dot:'var(--ink4)',lbl:'Ended · hidden in app'}
}[s]||{cls:'cn',dot:'var(--ink4)',lbl:s};}
function rsvpCount(f){return 90+(f.id*37)%160;}
function remLabel(r){return {'15m':'15 min','30m':'30 min','1h':'1 hour','1d':'1 day'}[r]||r;}
function money(n){return '₹'+n.toLocaleString('en-IN');}
function colorFor(str){var c=['#7C5CBF','#D97706','#16A34A','#A21CAF','#1D4ED8','#0F766E','#B45309'];var s=0;for(var i=0;i<str.length;i++)s+=str.charCodeAt(i);return c[s%c.length];}
function totalSubs(){return 1248;}
function attendedTodayCount(){var set={};Object.keys(attLog).forEach(function(f){attLog[f].forEach(function(s){set[s]=1;});});return Object.keys(set).length;}

/* ═══════════════ NAV / ROUTER ═══════════════ */
var NAVCFG=[
  {sec:'Manage'},
  {id:'overview',label:'Overview',ic:'grid',t:'Overview',s:'Today · Friday, 22 May 2026'},
  {id:'schedule',label:'Schedule',ic:'cal',t:'Schedule',s:'Day-wise programmes · Edition 2',badge:'6'},
  {id:'community',label:'Community Profile',ic:'flower',t:'Community Profile',s:'Identity & discovery setup'},
  {id:'editions',label:'Editions',ic:'layers',t:'Editions',s:'Edition lifecycle & history'},
  {sec:'People'},
  {id:'subscribers',label:'Subscribers',ic:'users',t:'Subscribers',s:'1,248 active subscribers'},
  {id:'attendance',label:'Attendance & QR',ic:'qr',t:'Attendance & QR',s:'Function-wise check-in'},
  {id:'analytics',label:'Analytics',ic:'chart',t:'Analytics',s:'Attendance & engagement insights'},
  {id:'rsvp',label:'RSVP',ic:'check',t:'RSVP Management',s:'Confirmations & headcount for arrangements'},
  {id:'donations',label:'Donations',ic:'rupee',t:'Donations',s:'Contributions ledger'},
  {id:'rewards',label:'Rewards',ic:'gift',t:'Rewards',s:'Top devotees & gifts'},
  {sec:'Comms'},
  {id:'reminders',label:'Reminders',ic:'bell',t:'Reminders & Alerts',s:'App + WhatsApp dispatch',badge:'3',badgeRed:true},
  {sec:'Admin'},
  {id:'access',label:'Access Manager',ic:'user',t:'Access Manager',s:'Team access & module permissions'},
  {id:'settings',label:'Settings',ic:'gear',t:'Settings',s:'Host account & preferences'}
];
var current='overview';
function buildNav(){
  document.getElementById('nav').innerHTML=NAVCFG.map(function(n){
    if(n.sec)return '<div class="nav-sec">'+n.sec+'</div>';
    return '<div class="nav-i'+(n.id===current?' on':'')+'" onclick="nav(\''+n.id+'\')">'+sIcon(n.ic)+'<span>'+n.label+'</span>'+(n.badge?'<span class="badge'+(n.badgeRed?' red':'')+'">'+n.badge+'</span>':'')+'</div>';
  }).join('');
}
function nav(id){
  current=id;
  var cfg=NAVCFG.filter(function(x){return x.id===id;})[0]||{t:id,s:''};
  document.getElementById('tb-t').textContent=cfg.t;
  document.getElementById('tb-s').textContent=cfg.s;
  buildNav();
  var v=document.getElementById('view');
  var fn=({overview:vOverview,schedule:vSchedule,community:vCommunity,editions:vEditions,subscribers:vSubscribers,attendance:vAttendance,analytics:vAnalytics,rsvp:vRSVP,donations:vDonations,rewards:vRewards,reminders:vReminders,access:vAccess,settings:vSettings})[id];
  v.innerHTML='<div class="view-in">'+(fn?fn():'')+'</div>';
  document.querySelector('.view').scrollTop=0;
  if(window._afterHooks)window._afterHooks(id);
}
function enterApp(){document.getElementById('login').classList.add('hide');document.getElementById('app').classList.remove('hide');buildNav();nav('overview');}

function toast(msg,wa){var t=document.getElementById('toast');t.innerHTML=(wa?sIcon('wa'):sIcon('check'))+'<span>'+msg+'</span>';t.classList.add('on');t.className='toast on'+(wa?' wa':'');clearTimeout(t._t);t._t=setTimeout(function(){t.classList.remove('on');},2800);}

/* ═══════════════ VIEW: OVERVIEW ═══════════════ */
function vOverview(){
  var todayFns=fnsOn(todayIso());
  var live=todayFns.filter(function(f){return f.status==='live';})[0];
  var attRate=Math.round(attendedTodayCount()/totalSubs()*100);
  var kpis=[
    {ic:'users',bg:'var(--t1)',st:'var(--t7)',val:'1,248',lbl:'Subscribers',delta:'+36 this edition',up:1},
    {ic:'cal',bg:'var(--g1)',st:'var(--g5)',val:todayFns.length,lbl:'Functions today',delta:'Day 3 of 9'},
    {ic:'qr',bg:'var(--ok1)',st:'#16A34A',val:attendedTodayCount(),lbl:'Checked in today',delta:attRate+'% of subs',up:1},
    {ic:'rupee',bg:'var(--in1)',st:'var(--in)',val:money(142200),lbl:'Donations · edition',delta:'7 contributors',up:1}
  ];
  var kpiHtml=kpis.map(function(k){return '<div class="kpi">'
    +(k.delta?'<div class="delta '+(k.up?'up':'')+'">'+k.delta+'</div>':'')
    +'<div class="ic" style="background:'+k.bg+';color:'+k.st+'">'+sIcon(k.ic)+'</div>'
    +'<div class="val">'+k.val+'</div><div class="lbl">'+k.lbl+'</div></div>';}).join('');

  // today schedule mini
  var sched=todayFns.map(function(f,i){var m=statusMeta(f.status);
    return '<div class="fn '+f.status+'" style="margin-bottom:9px;padding:11px 13px;">'
      +'<div class="seq">'+(i+1)+'</div>'
      +'<div class="tm">'+f.time+'</div>'
      +'<div class="body"><div class="nm" style="font-size:.84rem;">'+f.name+'</div>'
        +'<div class="meta">'+sIcon('pin')+f.venue+'</div></div>'
      +'<div class="acts"><span class="chip '+m.cls+'">'+m.lbl+'</span></div></div>';
  }).join('');

  var lead=subscribers.slice().sort(function(a,b){return b.attended-a.attended;}).slice(0,5);
  var leadHtml=lead.map(function(s,i){return '<div style="display:flex;align-items:center;gap:11px;padding:9px 0;border-bottom:1px solid var(--bd);">'
    +'<div style="width:22px;font-family:var(--fm);font-weight:700;color:'+(i===0?'var(--g4)':'var(--ink4)')+';font-size:.84rem;">'+(i+1)+'</div>'
    +'<div class="av-sm" style="background:'+colorFor(s.name)+'">'+s.name.split(' ').map(function(x){return x[0];}).join('').slice(0,2)+'</div>'
    +'<div style="flex:1;min-width:0;"><div style="font-weight:700;font-size:.8rem;color:var(--ink);">'+s.name+'</div><div style="font-size:.62rem;color:var(--ink4);">'+s.since+'</div></div>'
    +'<div style="font-family:var(--fm);font-weight:700;font-size:.86rem;color:var(--t7);">'+s.attended+'</div>'
    +'<span style="font-size:.6rem;color:var(--ink4);margin-left:3px;">events</span></div>';
  }).join('');

  var recent=reminders.slice(0,4).map(function(r){var km={reminder:{i:'clock',c:'var(--in)'},postponed:{i:'refresh',c:'var(--g4)'},cancelled:{i:'ban',c:'var(--er)'},new:{i:'plus',c:'#16A34A'}}[r.kind];
    return '<div style="display:flex;gap:10px;align-items:flex-start;padding:9px 0;border-bottom:1px solid var(--bd);">'
      +'<div style="width:30px;height:30px;border-radius:9px;background:var(--t0);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:'+km.c+'">'+sIcon(km.i)+'</div>'
      +'<div style="flex:1;min-width:0;"><div style="font-size:.76rem;font-weight:700;color:var(--ink);">'+r.fn+'</div><div style="font-size:.64rem;color:var(--ink3);">'+r.msg+'</div></div>'
      +'<div style="font-size:.58rem;color:var(--ink4);white-space:nowrap;">'+r.when.replace('Today ','')+'</div></div>';
  }).join('');

  return ''
  +'<div class="grid g4" style="margin-bottom:18px;">'+kpiHtml+'</div>'
  +(live?'<div class="card" style="margin-bottom:18px;background:linear-gradient(135deg,#1A0E3D,#3D2582);border:none;color:#fff;display:flex;align-items:center;gap:16px;">'
      +'<div style="width:46px;height:46px;border-radius:13px;background:rgba(255,255,255,.14);display:flex;align-items:center;justify-content:center;flex-shrink:0;">'+sIcon('qr')+'</div>'
      +'<div style="flex:1;"><div style="display:flex;align-items:center;gap:6px;"><span style="width:7px;height:7px;border-radius:50%;background:#4ADE80;animation:pulse 1.3s infinite;"></span><span style="font-size:.6rem;font-weight:800;color:#86EFAC;text-transform:uppercase;letter-spacing:.6px;">Live now</span></div>'
        +'<div style="font-family:var(--fd);font-size:1.15rem;font-weight:800;margin-top:2px;">'+live.name+'</div>'
        +'<div style="font-size:.7rem;color:rgba(255,255,255,.6);">'+live.time+' · '+live.venue+' · '+attLog[live.id].length+' checked in</div></div>'
      +'<button class="btn btn-gold" onclick="nav(\'attendance\')">'+sIcon('qr')+'Open QR check-in</button></div>':'')
  +'<div class="grid" style="grid-template-columns:1.5fr 1fr;align-items:start;">'
    +'<div class="card"><div class="card-h"><div class="ttl">'+sIcon('cal')+'Today\u2019s schedule</div><button class="btn btn-s btn-sm" onclick="nav(\'schedule\')">Open schedule'+sIcon('arrowR')+'</button></div>'+sched+'</div>'
    +'<div style="display:flex;flex-direction:column;gap:18px;">'
      +'<div class="card"><div class="card-h"><div class="ttl">'+sIcon('award')+'Top devotees</div><span class="chip ca">Rewards</span></div>'+leadHtml+'</div>'
      +'<div class="card"><div class="card-h"><div class="ttl">'+sIcon('bell')+'Recent alerts</div><button class="btn btn-ghost btn-sm" onclick="nav(\'reminders\')">All</button></div>'+recent+'</div>'
    +'</div>'
  +'</div>';
}
/*__MORE__*/

/* ═══════════════ VIEW: SCHEDULE (core) ═══════════════ */
var schedSel=todayIso();
var DEMO_NOW_MIN=7*60+45; // demo "now" = 7:45 AM
var _cdInt=null;
function edStr(o){return o.d+' '+MONTHS[o.m]+' '+o.y;}
function daysDone(){var t=new Date(TODAY.y,TODAY.m,TODAY.d);var c=0;editionDays().forEach(function(d){if(new Date(d.y,d.m,d.d)<t)c++;});return c;}
function editionDays(){var out=[];var s=edition.start;for(var i=0;i<edition.days;i++){var dt=new Date(s.y,s.m,s.d+i);out.push({iso:iso(dt.getFullYear(),dt.getMonth(),dt.getDate()),y:dt.getFullYear(),m:dt.getMonth(),d:dt.getDate(),wd:WD[dt.getDay()],idx:i+1});}return out;}
function vSchedule(){
  var d=editionDays();var done=daysDone();var pct=Math.round((done)/edition.days*100);
  return ''
  +'<div class="card" style="margin-bottom:16px;">'
    +'<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:14px;flex-wrap:wrap;">'
      +'<div><div class="eyebrow">'+edition.label+' · Active</div>'
        +'<div class="disp" style="font-size:1.3rem;font-weight:800;margin-top:3px;">'+edition.days+'-day edition</div>'
        +'<div style="display:flex;align-items:center;gap:10px;margin-top:9px;font-size:.76rem;color:var(--ink2);" class="mono">'
          +'<span style="display:inline-flex;align-items:center;gap:5px;color:var(--t7);font-weight:600;">'+sIcon('cal')+edStr(edition.start)+'</span>'
          +'<span style="color:var(--ink4);">'+sIcon('arrowR')+'</span>'
          +'<span style="display:inline-flex;align-items:center;gap:5px;color:var(--g5);font-weight:600;">'+edStr(edition.end)+'</span></div></div>'
      +'<div style="display:flex;gap:8px;"><button class="btn btn-s btn-sm" onclick="bulkDayModal()">'+sIcon('layers')+'Copy a day</button><button class="btn btn-p btn-sm" onclick="openFnModal()">'+sIcon('plus')+'Add function</button></div>'
    +'</div>'
    +'<div style="display:flex;align-items:center;gap:12px;margin-top:14px;">'
      +'<div class="bar-track" style="flex:1;"><div class="bar-fill" style="width:'+pct+'%;"></div></div>'
      +'<span class="mono" style="font-size:.72rem;font-weight:700;color:var(--ink2);white-space:nowrap;">Day '+(done+1)+' of '+edition.days+'</span></div>'
  +'</div>'
  +'<div class="grid" style="grid-template-columns:252px 1fr;gap:16px;align-items:start;">'
    +'<div class="card" style="padding:10px;"><div style="padding:5px 8px 9px;"><span class="eyebrow">All '+edition.days+' days</span></div>'
      +'<div id="dayList" style="max-height:610px;overflow-y:auto;"></div></div>'
    +'<div id="dayPanel"></div>'
  +'</div>';
}
function afterSchedule(){renderDayList();renderDayPanel();}
function renderDayList(){
  var box=document.getElementById('dayList');if(!box)return;
  box.innerHTML=editionDays().map(function(dy){
    var fns=fnsOn(dy.iso);var act=fns.filter(function(f){return f.status!=='cancelled'&&f.status!=='ended';});
    var isToday=dy.iso===todayIso();var on=dy.iso===schedSel;var hasLive=fns.some(function(f){return f.status==='live';});
    var right=hasLive?'<span class="vd-live"><i></i>Live</span>':(fns.length?'<span class="vd-cnt">'+act.length+'</span>':'<span class="vd-add">+</span>');
    return '<div class="vday'+(on?' on':'')+(isToday?' today':'')+'" onclick="schedSel=\''+dy.iso+'\';afterSchedule()">'
      +'<div class="vd-date"><span class="dn">'+dy.d+'</span><span class="mo">'+MONTHS[dy.m]+'</span></div>'
      +'<div class="vd-mid"><div class="wd">'+dy.wd+' · Day '+dy.idx+(isToday?' · Today':'')+'</div>'
        +'<div class="vd-sub'+(fns.length?'':' none')+'">'+(fns.length?(act.length+' function'+(act.length===1?'':'s')):'No functions yet')+'</div></div>'
      +right+'</div>';
  }).join('');
}
function cdBox(id,lbl){return '<div style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.16);border-radius:10px;padding:7px 0 5px;width:48px;text-align:center;"><div id="'+id+'" class="mono" style="font-size:1.2rem;font-weight:700;color:#FDE68A;line-height:1;">00</div><div style="font-size:.46rem;font-weight:700;color:rgba(255,255,255,.5);letter-spacing:1px;margin-top:4px;">'+lbl+'</div></div>';}
function cdSep(){return '<div class="mono" style="font-size:1.2rem;font-weight:700;color:rgba(255,255,255,.35);padding-bottom:14px;">:</div>';}
function startCd(targetMin){
  if(_cdInt){clearInterval(_cdInt);_cdInt=null;}
  var virtual=DEMO_NOW_MIN*60;
  function tick(){
    var h=document.getElementById('cdH');if(!h){if(_cdInt){clearInterval(_cdInt);_cdInt=null;}return;}
    var rem=targetMin*60-virtual;if(rem<0)rem=0;
    var H=Math.floor(rem/3600),M=Math.floor((rem%3600)/60),S=rem%60;
    h.textContent=String(H).padStart(2,'0');
    var em=document.getElementById('cdM');if(em)em.textContent=String(M).padStart(2,'0');
    var es=document.getElementById('cdS');if(es)es.textContent=String(S).padStart(2,'0');
    virtual++;
  }
  tick();_cdInt=setInterval(tick,1000);
}
function renderDayPanel(){
  if(_cdInt){clearInterval(_cdInt);_cdInt=null;}
  var fns=fnsOn(schedSel).slice().sort(function(a,b){return t24(a.time)-t24(b.time);});
  var dt=schedSel.split('-');var dd=new Date(+dt[0],+dt[1]-1,+dt[2]);
  var isToday=schedSel===todayIso();
  var live=fns.filter(function(f){return f.status==='live';})[0];
  var upcoming=fns.filter(function(f){return f.status==='scheduled'||f.status==='postponed';});
  var next=isToday?(upcoming.filter(function(f){return t24(f.time)>=DEMO_NOW_MIN;})[0]||upcoming[0]):upcoming[0];
  var doneN=fns.filter(function(f){return f.status==='done';}).length;
  var head='<div class="card-h"><div><div class="disp" style="font-size:1.05rem;font-weight:800;">'+WD[dd.getDay()]+', '+(+dt[2])+' '+MONTHL[+dt[1]-1]+' '+dt[0]+'</div><div style="font-size:.7rem;color:var(--ink3);margin-top:1px;">'+fns.length+' function'+(fns.length===1?'':'s')+(isToday?' · Today':'')+'</div></div>'
    +'<button class="btn btn-gold btn-sm" onclick="openFnModal(null,\''+schedSel+'\')">'+sIcon('plus')+'Add to this day</button></div>';
  var strip='';
  if(fns.length){strip='<div class="sstrip">'
    +(live?'<span class="si cg">'+sIcon('clock')+'Live now'+'</span>':'')
    +'<span class="si ci">'+sIcon('cal')+upcoming.length+' upcoming</span>'
    +(doneN?'<span class="si cn">'+sIcon('check')+doneN+' done</span>':'')
  +'</div>';}
  var banner='';
  if(isToday&&(live||next)){
    banner='<div class="now-banner"><div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">';
    if(live)banner+='<div style="flex:1;min-width:170px;"><div style="display:flex;align-items:center;gap:6px;"><span style="width:7px;height:7px;border-radius:50%;background:#4ADE80;animation:pulse 1.3s infinite;"></span><span style="font-size:.56rem;font-weight:800;color:#86EFAC;letter-spacing:.7px;">LIVE NOW</span></div><div style="font-family:var(--fd);font-size:1.05rem;font-weight:800;margin-top:3px;">'+live.name+'</div><div style="font-size:.66rem;color:rgba(255,255,255,.6);">'+live.time+' · '+live.venue+'</div></div>';
    if(next&&next!==live)banner+='<div style="flex:1;min-width:200px;'+(live?'border-left:1px solid rgba(255,255,255,.15);padding-left:16px;':'')+'"><div style="font-size:.56rem;font-weight:800;color:rgba(255,255,255,.5);letter-spacing:.7px;">UP NEXT</div><div style="font-family:var(--fd);font-size:1.05rem;font-weight:800;margin-top:3px;">'+next.name+'</div>'
      +'<div style="font-size:.62rem;color:rgba(255,255,255,.55);margin-top:1px;">'+next.time+' · '+next.venue+'</div>'
      +'<div style="display:flex;align-items:flex-end;gap:6px;margin-top:9px;">'
        +cdBox('cdH','HRS')+cdSep()+cdBox('cdM','MIN')+cdSep()+cdBox('cdS','SEC')
      +'</div></div>';
    banner+='</div></div>';
  }
  var body;
  if(!fns.length){
    body='<div class="empty">'+sIcon('cal')+'<div class="t">No functions yet for this day</div><div class="s">Add the first programme — subscribers see it instantly.</div><button class="btn btn-p btn-sm" style="margin-top:14px;" onclick="openFnModal(null,\''+schedSel+'\')">'+sIcon('plus')+'Add function</button></div>';
  } else {
    body=fns.map(function(f,i){var m=statusMeta(f.status);var off=f.status==='ended';
      return '<div class="fn '+f.status+'"'+(off?' style="opacity:.6;"':'')+'>'
        +'<div class="seq">'+(i+1)+'</div>'
        +'<div class="tm">'+f.time+'<div style="font-size:.58rem;color:var(--ink4);font-weight:400;margin-top:2px;">'+(f.dur||'')+'</div></div>'
        +'<div class="body" style="cursor:pointer;" onclick="openEventDetail('+f.id+')">'
          +'<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;"><span class="nm">'+f.name+'</span><span class="chip '+m.cls+'">'+m.lbl+'</span></div>'
          +'<div class="meta">'+sIcon('pin')+f.venue+(f.guru?'<span style="margin:0 2px;">·</span>'+sIcon('guru')+community.guru:'')
            +(f.status!=='cancelled'&&!off?'<span style="margin:0 2px;">·</span>'+sIcon('check')+'<span style="color:var(--in);font-weight:600;">'+rsvpCount(f)+' RSVP\u2019d</span>':'')
            +'<span style="margin:0 2px;">·</span><span style="color:var(--t6);font-weight:600;">View details ›</span></div>'
          +(f.note?'<div style="font-size:.64rem;color:var(--g5);margin-top:4px;background:var(--g1);border-radius:7px;padding:4px 8px;display:inline-block;">'+f.note+'</div>':'')
        +'</div>'
        +'<div class="acts">'
          +(f.status!=='cancelled'&&!off?'<button class="btn btn-icon btn-s" title="Edit" onclick="openFnModal('+f.id+')">'+sIcon('edit')+'</button>':'')
          +(f.status!=='cancelled'&&!off?'<button class="btn btn-icon btn-s" title="Copy to other dates" onclick="copyFnModal('+f.id+')" style="color:var(--t6);">'+sIcon('layers')+'</button>':'')
          +(f.status==='scheduled'?'<button class="btn btn-icon btn-s" title="Postpone" onclick="postponeFn('+f.id+')" style="color:var(--g5);">'+sIcon('refresh')+'</button>':'')
          +(f.status==='scheduled'||f.status==='postponed'||f.status==='live'?'<button class="btn btn-icon btn-s" title="Turn off (end in app)" onclick="endFn('+f.id+')">'+sIcon('ban')+'</button>':'')
          +(off?'<button class="btn btn-icon btn-s" title="Reactivate" onclick="reactivateFn('+f.id+')" style="color:#16A34A;">'+sIcon('refresh')+'</button>':'')
          +(f.status==='scheduled'||f.status==='postponed'||f.status==='live'?'<button class="btn btn-icon btn-s" title="Cancel" onclick="cancelFn('+f.id+')" style="color:var(--er);">'+sIcon('x')+'</button>':'')
          +'<button class="btn btn-icon btn-s" title="Delete" onclick="deleteFn('+f.id+')">'+sIcon('trash')+'</button>'
        +'</div></div>';
    }).join('');
  }
  document.getElementById('dayPanel').innerHTML='<div class="card">'+head+strip+banner+body+'</div>';
  if(isToday&&next&&next!==live)startCd(t24(next.time));
}
function t24(t){var m=(t||'').match(/(\d+):(\d+)\s*(AM|PM)/i);if(!m)return 0;var h=+m[1];if(/pm/i.test(m[3])&&h!==12)h+=12;if(/am/i.test(m[3])&&h===12)h=0;return h*60+ +m[2];}
function findFn(id){var r=null;Object.keys(programmes).forEach(function(k){programmes[k].forEach(function(f){if(f.id===id)r={f:f,iso:k};});});return r;}

function postponeFn(id){var x=findFn(id);if(!x)return;openConfirm('Postpone this event?','“'+x.f.name+'” will be marked postponed and all subscribers notified on app + WhatsApp.','Yes, postpone','btn-gold',function(){x.f.status='postponed';x.f.note='Postponed — new timing to be confirmed';afterSchedule();pushReminder('postponed',x.f.name,'Rescheduled — please check updated time',true);toast('Postponed · app + WhatsApp alert sent to 1,248 subscribers',true);});}
function cancelFn(id){var x=findFn(id);if(!x)return;openConfirm('Cancel this function?','“'+x.f.name+'” will be marked cancelled and all subscribers notified on app + WhatsApp.','Cancel function','btn-er',function(){x.f.status='cancelled';x.f.note='Cancelled by host';x.f.rem=[];afterSchedule();pushReminder('cancelled',x.f.name,'This programme has been cancelled',true);toast('Cancelled · alert sent to 1,248 subscribers',true);});}
function deleteFn(id){var x=findFn(id);if(!x)return;openConfirm('Delete this function?','“'+x.f.name+'” will be removed from the schedule. This cannot be undone.','Delete','btn-er',function(){programmes[x.iso]=programmes[x.iso].filter(function(f){return f.id!==id;});afterSchedule();toast('Function deleted');});}
function endFn(id){var x=findFn(id);if(!x)return;openConfirm('Turn off this event?','“'+x.f.name+'” will be marked ended and hidden in the app for subscribers. You can reactivate it any time.','Turn off event','btn-s',function(){x.f._prev=x.f.status;x.f.status='ended';x.f.rem=[];afterSchedule();pushReminder('cancelled',x.f.name,'This event has ended',true);toast('Event turned off · now shows as ended in the app',true);});}
function reactivateFn(id){var x=findFn(id);if(!x)return;openConfirm('Reactivate this event?','“'+x.f.name+'” will be active again, shown in the app, and added back to subscribers\u2019 calendars (they\u2019ll be notified).','Yes, reactivate','btn-ok',function(){x.f.status=x.f._prev||'scheduled';afterSchedule();pushReminder('new',x.f.name,'Event is active again · added back to calendar',true);toast('Event reactivated · subscribers notified + calendar updated',true);});}
function pushReminder(kind,fn,msg,wa){reminders.unshift({id:Date.now(),kind:kind,fn:fn,when:'Just now',msg:msg,ch:wa?['app','wa']:['app'],reach:1248,status:'sent'});}

/* ═══════════════ VIEW: COMMUNITY PROFILE ═══════════════ */
function vCommunity(){
  var disc=[
    {k:'city',ic:'pin',lbl:'City',val:community.city,hint:'Shown under “Location” search'},
    {k:'area',ic:'pin',lbl:'Area',val:community.area,hint:'Shown under “Area” search'},
    {k:'venue',ic:'building',lbl:'Current venue',val:community.venue,hint:'Shown under “Venue” search'},
    {k:'guru',ic:'guru',lbl:'Guru / Speaker',val:community.guru,hint:'Shown under “Guru” search'}
  ];
  return ''
  +'<div class="grid" style="grid-template-columns:1.4fr 1fr;align-items:start;">'
  +'<div style="display:flex;flex-direction:column;gap:16px;">'
    +'<div class="card"><div class="card-h"><div class="ttl">'+sIcon('flower')+'Community identity</div><button class="btn btn-s btn-sm" onclick="toast(\'Identity saved\')">'+sIcon('check')+'Save</button></div>'
      +'<div class="grid g2" style="gap:14px;">'
        +fld('Community name','Jain Community Sammelan')
        +fld('Recurrence','Annual')
      +'</div>'
      +'<label class="flbl" style="margin-top:6px;">About</label><textarea rows="3">'+community.about+'</textarea>'
      +'<label class="flbl" style="margin-top:12px;">Logo & cover images</label>'
      +'<div style="display:flex;gap:10px;">'
        +'<div style="width:84px;height:84px;border-radius:14px;background:linear-gradient(135deg,#3D2582,#7C5CBF);display:flex;align-items:center;justify-content:center;color:#fff;">'+sIcon('flower')+'</div>'
        +'<div style="flex:1;height:84px;border:1.5px dashed var(--bd2);border-radius:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--ink4);cursor:pointer;gap:4px;">'+sIcon('img')+'<span style="font-size:.66rem;font-weight:600;">Upload cover photos</span></div>'
      +'</div>'
    +'</div>'
    +'<div class="card"><div class="card-h"><div class="ttl">'+sIcon('search')+'Discovery setup</div><span class="chip cp">One-time</span></div>'
      +'<div class="info-box" style="margin-bottom:14px;">'+sIcon('info')+'<div>These attributes decide <b>who can find and subscribe</b> to your community. A subscriber searching by any of these — city, area, venue or guru — will see your community in Invite Karoo.</div></div>'
      +'<div class="grid g2" style="gap:14px;">'+disc.map(function(d){return '<div><label class="flbl">'+d.lbl+'</label><div style="position:relative;"><input value="'+d.val+'"/></div><div class="hint">'+d.hint+'</div></div>';}).join('')+'</div>'
      +'<label class="flbl" style="margin-top:12px;">Venue address</label><input value="'+community.venueAddr+'"/>'
      +'<div style="margin-top:14px;"><button class="btn btn-p btn-sm" onclick="toast(\'Discovery settings updated\')">'+sIcon('check')+'Save discovery setup</button></div>'
    +'</div>'
  +'</div>'
  +'<div style="display:flex;flex-direction:column;gap:16px;">'
    +'<div class="card"><div class="card-h"><div class="ttl">'+sIcon('search')+'Search preview</div></div>'
      +'<div class="hint" style="margin-bottom:10px;">How subscribers find you across filters:</div>'
      +['Community','Venue','Location','Area','Guru'].map(function(f){return '<div style="display:flex;align-items:center;gap:9px;padding:8px 0;border-bottom:1px solid var(--bd);"><span class="chip cp" style="min-width:78px;justify-content:center;">'+f+'</span><span style="font-size:.74rem;color:var(--ink2);">'+({Community:'Jain Community Sammelan',Venue:'Chennai Convention Centre',Location:'Chennai',Area:'Nandambakkam',Guru:'Muni Shri Tarun Sagar Ji'}[f])+'</span></div>';}).join('')
    +'</div>'
    +'<div class="card"><div class="card-h"><div class="ttl">'+sIcon('users')+'Reach</div></div>'
      +statRow('Total subscribers','1,248')
      +statRow('New this edition','+36')
      +statRow('Avg. daily check-ins','612')
      +statRow('Cities reached','7')
    +'</div>'
  +'</div></div>';
}
function fld(l,v){return '<div><label class="flbl">'+l+'</label><input value="'+v+'"/></div>';}
function statRow(l,v){return '<div style="display:flex;align-items:center;justify-content:space-between;padding:9px 0;border-bottom:1px solid var(--bd);"><span style="font-size:.76rem;color:var(--ink3);">'+l+'</span><span class="mono" style="font-weight:700;color:var(--ink);">'+v+'</span></div>';}

/* ═══════════════ VIEW: EDITIONS ═══════════════ */
function vEditions(){
  var done=11, total=24, pct=Math.round(done/total*100);
  return ''
  +'<div class="grid" style="grid-template-columns:1.3fr 1fr;align-items:start;">'
  +'<div style="display:flex;flex-direction:column;gap:16px;">'
    +'<div class="card" style="background:linear-gradient(135deg,#1A0E3D,#3D2582);border:none;color:#fff;">'
      +'<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;"><div><span class="chip cg" style="background:rgba(22,163,74,.25);color:#86EFAC;border-color:transparent;"><span style="width:5px;height:5px;border-radius:50%;background:#4ADE80;display:inline-block;"></span>Active</span><div class="disp" style="font-size:1.4rem;font-weight:800;margin-top:8px;">Edition 2</div><div style="font-size:.72rem;color:rgba(255,255,255,.6);">20 May – 28 May 2026 · 9 days</div></div>'
        +'<button class="btn btn-gold btn-sm" onclick="toast(\'Edition settings\')">'+sIcon('edit')+'Edit</button></div>'
      +'<div style="display:flex;gap:9px;">'
        +'<div style="flex:1;background:rgba(255,255,255,.1);border-radius:11px;padding:11px;text-align:center;"><div class="mono" style="font-size:1.3rem;font-weight:700;">3</div><div style="font-size:.56rem;color:rgba(255,255,255,.6);">Days done</div></div>'
        +'<div style="flex:1;background:rgba(255,255,255,.1);border-radius:11px;padding:11px;text-align:center;"><div class="mono" style="font-size:1.3rem;font-weight:700;color:#FDE68A;">6</div><div style="font-size:.56rem;color:rgba(255,255,255,.6);">Days left</div></div>'
        +'<div style="flex:1;background:rgba(255,255,255,.1);border-radius:11px;padding:11px;text-align:center;"><div class="mono" style="font-size:1.3rem;font-weight:700;">'+total+'</div><div style="font-size:.56rem;color:rgba(255,255,255,.6);">Functions</div></div>'
      +'</div></div>'
    +'<div class="card"><div class="card-h"><div class="ttl">'+sIcon('refresh')+'Next edition</div><span class="chip ci">in 135 days</span></div>'
      +'<div style="font-size:.92rem;font-weight:700;color:var(--ink);">Edition 3 · Oct–Dec 2026</div>'
      +'<div class="mono" style="font-size:.7rem;color:var(--ink3);margin-top:3px;">'+nextEdition.text+'</div>'
      +'<div class="hint" style="margin-top:6px;">Subscribers stay subscribed across editions and are auto-notified 2 weeks before this begins.</div>'
      +'<button class="btn btn-s btn-sm" style="margin-top:12px;" onclick="toast(\'Plan next edition\')">'+sIcon('plus')+'Plan next edition</button>'
    +'</div>'
    +'<div class="card"><div class="card-h"><div class="ttl">'+sIcon('clock')+'Past editions</div></div>'
      +'<div style="display:flex;align-items:center;gap:11px;padding:10px 0;"><div style="width:9px;height:9px;border-radius:50%;background:var(--ink4);"></div><div style="flex:1;"><div style="font-size:.8rem;font-weight:700;color:var(--ink);">Edition 1 · Jan–Mar 2025</div><div class="mono" style="font-size:.62rem;color:var(--ink4);">15 Jan – 18 Mar 2025 · 63 days · SPP Gardens</div></div><span class="chip cn">Ended</span></div>'
    +'</div>'
  +'</div>'
  +'<div class="card"><div class="card-h"><div class="ttl">'+sIcon('layers')+'Create new edition</div></div>'
    +'<div class="info-box" style="margin-bottom:14px;">'+sIcon('info')+'<div>An edition is one date-ranged run of your community (a festival, a 180-day satsang season, etc.). Set the dates and the day-wise schedule opens up for that span.</div></div>'
    +'<label class="flbl">Edition name</label><input placeholder="e.g. Chaturmas Pravachan 2026"/>'
    +'<div class="grid g2" style="gap:12px;margin-top:12px;"><div><label class="flbl">Start date</label><input type="date" value="2026-10-10"/></div><div><label class="flbl">End date</label><input type="date" value="2027-04-08"/></div></div>'
    +'<label class="flbl" style="margin-top:12px;">Venue for this edition</label><input value="'+community.venue+'"/>'
    +'<div class="hint" style="margin-top:8px;">Tip: a 180-day edition gives you 180 days of schedule to fill — add functions to any day.</div>'
    +'<button class="btn btn-p btn-full" style="margin-top:16px;" onclick="toast(\'New edition created\')">'+sIcon('plus')+'Create edition</button>'
  +'</div></div>';
}
/*__MORE__*/

/* ═══════════════ VIEW: SUBSCRIBERS ═══════════════ */
var subQuery='',subFilter='all',selectedSubs={};
function selCount(){return Object.keys(selectedSubs).filter(function(k){return selectedSubs[k];}).length;}
function vSubscribers(){
  var active=subscribers.filter(function(s){return s.status==='active';}).length;
  return ''
  +'<div class="grid g4" style="margin-bottom:18px;">'
    +miniKpi('users','var(--t1)','var(--t7)','1,248','Total subscribers')
    +miniKpi('check','var(--ok1)','#16A34A',active+' / '+subscribers.length,'Active (sample)')
    +miniKpi('qr','var(--g1)','var(--g5)','612','Avg daily check-ins')
    +miniKpi('bell','var(--in1)','var(--in)','Bulk','App + WhatsApp ready')
  +'</div>'
  +'<div id="bulkBar" style="display:none;background:linear-gradient(135deg,#1A0E3D,#3D2582);border-radius:14px;padding:12px 16px;margin-bottom:14px;align-items:center;gap:12px;color:#fff;">'
    +'<span style="font-size:.82rem;font-weight:700;"><b id="bulkN" class="mono">0</b> selected</span>'
    +'<div style="flex:1;"></div>'
    +'<button class="btn btn-gold btn-sm" onclick="bulkMsg()">'+sIcon('send')+'Send message</button>'
    +'<button class="btn btn-s btn-sm" style="background:rgba(255,255,255,.12);color:#fff;border-color:transparent;" onclick="bulkSuspend()">'+sIcon('ban')+'Suspend</button>'
    +'<button class="btn btn-ghost btn-sm" style="color:rgba(255,255,255,.7);" onclick="clearSel()">Clear</button>'
  +'</div>'
  +'<div class="card" style="padding:0;overflow:hidden;">'
    +'<div style="padding:14px 16px;display:flex;align-items:center;gap:12px;border-bottom:1px solid var(--bd);flex-wrap:wrap;">'
      +'<div style="position:relative;flex:1;min-width:200px;max-width:320px;"><svg viewBox="0 0 24 24" fill="none" stroke="var(--ink4)" stroke-width="2" style="width:16px;height:16px;position:absolute;left:12px;top:50%;transform:translateY(-50%);">'+IC.search+'</svg><input placeholder="Search name, family, city or number…" style="padding-left:38px;" oninput="subQuery=this.value.toLowerCase();renderSubRows()"/></div>'
      +'<div class="seg"><div class="s'+(subFilter==='all'?' on':'')+'" onclick="subFilter=\'all\';nav(\'subscribers\')">All</div><div class="s'+(subFilter==='active'?' on':'')+'" onclick="subFilter=\'active\';nav(\'subscribers\')">Active</div><div class="s'+(subFilter==='suspended'?' on':'')+'" onclick="subFilter=\'suspended\';nav(\'subscribers\')">Suspended</div></div>'
      +'<div style="flex:1;"></div><button class="btn btn-s btn-sm" onclick="exportSubscribers()">'+sIcon('layers')+'Export XLS</button>'
    +'</div>'
    +'<table><thead><tr>'
      +'<th style="width:38px;"><span class="cbox" onclick="toggleAll(this)"></span></th>'
      +'<th>Subscriber</th><th>City</th><th>Editions</th><th>Attendance</th><th>RSVP</th><th>Status</th>'
    +'</tr></thead><tbody id="subRows"></tbody></table>'
  +'</div>';
}
function renderSubRows(){
  var qd=subQuery.replace(/\D/g,'');
  var rows=subscribers.filter(function(s){
    if(subFilter!=='all'&&s.status!==subFilter)return false;
    if(!subQuery)return true;
    if((s.name+' '+s.family+' '+s.city).toLowerCase().indexOf(subQuery)>-1)return true;
    if(qd&&s.phone.replace(/\D/g,'').indexOf(qd)>-1)return true;
    return false;
  });
  document.getElementById('subRows').innerHTML=rows.map(function(s){
    var pct=Math.round(s.attended/TOTAL_FUNCTIONS_SO_FAR*100);if(pct>100)pct=100;
    var susp=s.status==='suspended';
    return '<tr style="'+(susp?'opacity:.6;':'')+'">'
      +'<td onclick="event.stopPropagation();toggleSel('+s.id+',this)"><span class="cbox'+(selectedSubs[s.id]?' on':'')+'">'+(selectedSubs[s.id]?sIcon('check'):'')+'</span></td>'
      +'<td onclick="openSub('+s.id+')"><div class="u-cell"><div class="av-sm" style="background:'+colorFor(s.name)+'">'+inits(s.name)+'</div><div><div class="nm">'+s.name+'</div><div class="sb">'+s.family+' family · <span class="mono">'+s.phone+'</span></div></div></div></td>'
      +'<td onclick="openSub('+s.id+')">'+s.city+'</td>'
      +'<td onclick="openSub('+s.id+')"><span class="chip cp">'+s.editions+' attended</span></td>'
      +'<td onclick="openSub('+s.id+')"><div style="display:flex;align-items:center;gap:8px;"><div class="bar-track" style="width:58px;"><div class="bar-fill" style="width:'+pct+'%;"></div></div><span class="mono" style="font-size:.72rem;font-weight:700;color:var(--ink2);">'+s.attended+'</span></div></td>'
      +'<td onclick="openSub('+s.id+')"><span class="mono" style="font-weight:600;color:var(--in);">'+s.rsvp+'</span></td>'
      +'<td onclick="openSub('+s.id+')">'+(susp?'<span class="chip ce">'+sIcon('ban')+'Suspended</span>':'<span class="chip cg">Active</span>')+'</td></tr>';
  }).join('');
  updateBulkBar();
}
function toggleSel(id,el){selectedSubs[id]=!selectedSubs[id];el.querySelector('.cbox').classList.toggle('on');el.querySelector('.cbox').innerHTML=selectedSubs[id]?sIcon('check'):'';updateBulkBar();}
function toggleAll(el){var on=!el.classList.contains('on');subscribers.forEach(function(s){selectedSubs[s.id]=on;});renderSubRows();var hdr=document.querySelectorAll('thead .cbox')[0];if(hdr){hdr.classList.toggle('on',on);hdr.innerHTML=on?sIcon('check'):'';}}
function clearSel(){selectedSubs={};renderSubRows();}
function updateBulkBar(){var n=selCount();var bar=document.getElementById('bulkBar');if(!bar)return;bar.style.display=n?'flex':'none';var nb=document.getElementById('bulkN');if(nb)nb.textContent=n;}
function bulkMsg(){var n=selCount();if(!n)return;openMsgModal(n+' selected subscriber'+(n===1?'':'s'),function(o){clearSel();toast('Message sent to '+n+' subscribers · '+chLabel(o),o.wa);});}
function chLabel(o){return o.app&&o.wa?'app + WhatsApp':(o.wa?'WhatsApp only':'app only');}
function openMsgModal(label,sendFn){
  window._msgSend=sendFn;
  openModal('<div class="modal"><div class="modal-h"><div class="ttl">Send message</div><div class="x" onclick="closeModal()">'+sIcon('x')+'</div></div>'
    +'<div class="modal-b">'
      +'<div style="font-size:.74rem;color:var(--ink3);margin-bottom:12px;">To&nbsp;:&nbsp;<b style="color:var(--ink);">'+label+'</b></div>'
      +'<label class="flbl">Message</label><textarea id="msg-text" rows="4" placeholder="Type your message to subscribers…"></textarea>'
      +'<label class="flbl" style="margin-top:12px;">Send via — you decide the channel</label>'
      +'<div style="display:flex;gap:8px;flex-wrap:wrap;" id="msg-ch"><span class="chip cp" data-ch="app" onclick="this.classList.toggle(\'cp\');this.classList.toggle(\'cn\')" style="cursor:pointer;padding:9px 14px;">'+sIcon('bell')+'App notification</span><span class="chip cg" data-ch="wa" onclick="this.classList.toggle(\'cg\');this.classList.toggle(\'cn\')" style="cursor:pointer;padding:9px 14px;">'+sIcon('wa')+'WhatsApp</span></div>'
      +'<div class="hint" style="margin-top:8px;">Pick one or both — message can go individually on app, individually on WhatsApp, or both together.</div>'
    +'</div>'
    +'<div class="modal-f"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-p" onclick="doSendMsg()">'+sIcon('send')+'Send</button></div></div>');
}
function doSendMsg(){
  var text=(document.getElementById('msg-text').value||'').trim();
  var app=false,wa=false;document.querySelectorAll('#msg-ch .chip').forEach(function(c){var on=!c.classList.contains('cn');if(c.getAttribute('data-ch')==='app')app=on;if(c.getAttribute('data-ch')==='wa')wa=on;});
  if(!app&&!wa){toast('Pick at least one channel');return;}
  if(!text){toast('Type a message first');return;}
  closeModal();window._msgSend&&window._msgSend({app:app,wa:wa,text:text});
}
function bulkSuspend(){var n=selCount();if(!n)return;Object.keys(selectedSubs).forEach(function(k){if(selectedSubs[k]){var s=subscribers.filter(function(x){return x.id==k;})[0];if(s)s.status='suspended';}});clearSel();nav('subscribers');toast(n+' subscriber(s) suspended');}
function inits(n){return n.split(' ').map(function(x){return x[0];}).join('').slice(0,2);}
function miniKpi(ic,bg,st,val,lbl){return '<div class="kpi"><div class="ic" style="background:'+bg+';color:'+st+'">'+sIcon(ic)+'</div><div class="val">'+val+'</div><div class="lbl">'+lbl+'</div></div>';}

function addMins(t,mins){var m=t.match(/(\d+):(\d+)\s*(AM|PM)/i);if(!m)return t;var h=+m[1];var mn=+m[2];if(/pm/i.test(m[3])&&h!==12)h+=12;if(/am/i.test(m[3])&&h===12)h=0;var tot=h*60+mn+mins;tot=tot%1440;var hh=Math.floor(tot/60),mm=tot%60;var ap=hh>=12?'PM':'AM';var h12=hh%12;if(h12===0)h12=12;return h12+':'+String(mm).padStart(2,'0')+' '+ap;}
function subHistory(s){
  var out=[];var tnum=new Date(TODAY.y,TODAY.m,TODAY.d);
  editionDays().forEach(function(dy){
    if(new Date(dy.y,dy.m,dy.d)>tnum)return; // only days up to today
    var fns=fnsOn(dy.iso);if(!fns.length)return;
    var lbl=dy.d+' '+MONTHS[dy.m];
    fns.forEach(function(f){
      if(f.status==='cancelled'||f.status==='ended')return;
      var present;
      if(dy.iso===todayIso())present=(attLog[f.id]||[]).indexOf(s.id)>-1;
      else present=((s.id+f.id)%5)!==0; // deterministic past attendance
      var dur=parseInt(f.dur)||2;var outT=present?addMins(f.time,(/min/.test(f.dur)?dur:dur*60)):null;
      out.push({date:lbl,fn:f.name,time:f.time,present:present,cin:present?f.time:null,cout:outT});
    });
  });
  return out;
}
function openSub(id){
  var s=subscribers.filter(function(x){return x.id===id;})[0];if(!s)return;
  var pct=Math.round(s.attended/TOTAL_FUNCTIONS_SO_FAR*100);if(pct>100)pct=100;
  var hist=subHistory(s);
  var dons=donations.filter(function(d){return d.sub===id;});
  var susp=s.status==='suspended';
  var grouped={};hist.forEach(function(h){(grouped[h.date]=grouped[h.date]||[]).push(h);});
  var histHtml=Object.keys(grouped).map(function(dt){
    return '<div style="margin-bottom:12px;"><div class="mono" style="font-size:.62rem;font-weight:700;color:var(--ink4);text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px;">'+dt+' 2026</div>'
      +grouped[dt].map(function(h){return '<div style="display:flex;align-items:center;gap:9px;padding:8px 10px;border:1px solid var(--bd);border-radius:10px;margin-bottom:6px;background:#fff;">'
        +'<div style="width:24px;height:24px;border-radius:7px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:'+(h.present?'var(--ok1)':'var(--er1)')+';color:'+(h.present?'#16A34A':'var(--er)')+';">'+sIcon(h.present?'check':'x')+'</div>'
        +'<div style="flex:1;min-width:0;"><div style="font-size:.74rem;font-weight:600;color:var(--ink);">'+h.fn+'</div>'
          +(h.present?'<div class="mono" style="font-size:.58rem;color:var(--ink3);">In '+h.cin+' · Out '+h.cout+'</div>':'<div style="font-size:.58rem;color:var(--er);">Did not check in</div>')+'</div>'
        +'<span class="chip '+(h.present?'cg':'ce')+'">'+(h.present?'Present':'Missed')+'</span></div>';}).join('')
    +'</div>';
  }).join('');

  var d=document.getElementById('drawerOv');
  d.innerHTML='<div class="drawer">'
    +'<div style="background:linear-gradient(150deg,#1A0E3D,#3D2582);padding:22px 20px;color:#fff;position:relative;">'
      +'<div style="position:absolute;top:14px;right:14px;width:32px;height:32px;border-radius:9px;background:rgba(255,255,255,.14);display:flex;align-items:center;justify-content:center;cursor:pointer;" onclick="closeDrawer()">'+sIcon('x')+'</div>'
      +'<div style="display:flex;align-items:center;gap:13px;"><div class="av-sm" style="width:56px;height:56px;font-size:1.1rem;background:'+colorFor(s.name)+';border:2px solid rgba(255,255,255,.25);">'+inits(s.name)+'</div>'
        +'<div style="min-width:0;"><div class="disp" style="font-size:1.25rem;font-weight:800;">'+s.name+'</div><div style="font-size:.66rem;color:rgba(255,255,255,.6);">'+s.family+' family · '+s.city+'</div>'
        +'<div class="mono" style="font-size:.72rem;color:rgba(255,255,255,.6);margin-top:2px;">'+s.phone+'</div>'
        +'<div style="display:flex;gap:6px;margin-top:8px;flex-wrap:wrap;">'+(susp?'<span class="chip ce">'+sIcon('ban')+'Suspended</span>':'<span class="chip cg">Active subscriber</span>')+(s.gift?'<span class="chip ca">'+sIcon('gift')+s.gift.split(' ')[0]+'</span>':'')+'</div></div></div>'
    +'</div>'
    +'<div style="padding:18px 20px;">'
      +'<div class="grid g4" style="gap:9px;margin-bottom:16px;">'
        +profStat(s.attended,'Attended','var(--t7)')+profStat(s.rsvp,'RSVPs','var(--in)')+profStat(s.editions,'Editions','#16A34A')+profStat(pct+'%','Rate','var(--g5)')
      +'</div>'
      +'<div class="eyebrow" style="margin-bottom:8px;">Subscribed events</div>'
      +'<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:18px;">'+s.events.map(function(e){return '<span class="chip cp">'+e+'</span>';}).join('')+'</div>'
      +'<div class="eyebrow" style="margin-bottom:8px;">Attendance · day &amp; function wise</div>'+histHtml
      +'<div class="eyebrow" style="margin:6px 0 8px;">RSVP summary</div>'
      +'<div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--in1);border-radius:11px;margin-bottom:18px;"><div style="color:var(--in);">'+sIcon('check')+'</div><div style="flex:1;font-size:.74rem;color:var(--ink2);"><b class="mono">'+s.rsvp+'</b> functions RSVP\u2019d · <b class="mono">'+s.attended+'</b> attended · <b class="mono">'+(s.rsvp-s.attended)+'</b> no-show</div></div>'
      +'<div class="eyebrow" style="margin-bottom:8px;">Donations</div>'
      +(dons.length?dons.map(function(dn){return '<div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--bd);"><div style="width:26px;height:26px;border-radius:8px;background:var(--in1);color:var(--in);display:flex;align-items:center;justify-content:center;">'+sIcon('rupee')+'</div><div style="flex:1;"><div style="font-size:.76rem;font-weight:600;color:var(--ink);">'+money(dn.amt)+'</div><div style="font-size:.6rem;color:var(--ink4);">'+dn.purpose+' · '+dn.mode+'</div></div><span style="font-size:.62rem;color:var(--ink4);">'+dn.date+'</span></div>';}).join(''):'<div style="font-size:.74rem;color:var(--ink4);padding:6px 0;">No donations recorded yet.</div>')
      +'<div style="display:flex;gap:9px;margin-top:20px;"><button class="btn btn-gold btn-full btn-sm" onclick="remindSub('+s.id+')">'+sIcon('send')+'Send message</button>'
        +(susp?'<button class="btn btn-ok btn-full btn-sm" onclick="toggleSuspend('+s.id+')">'+sIcon('check')+'Reactivate</button>':'<button class="btn btn-er btn-full btn-sm" onclick="toggleSuspend('+s.id+')">'+sIcon('ban')+'Suspend</button>')+'</div>'
      +'<div class="hint" style="text-align:center;margin-top:8px;">Reminders go to this subscriber on app + WhatsApp. Suspending stops their access while keeping their record.</div>'
    +'</div></div>';
  d.classList.add('on');
}
function profStat(v,l,c){return '<div class="card" style="padding:11px 8px;text-align:center;"><div class="mono" style="font-size:1.2rem;font-weight:700;color:'+c+';">'+v+'</div><div style="font-size:.54rem;color:var(--ink3);">'+l+'</div></div>';}
function remindSub(id){var s=subscribers.filter(function(x){return x.id===id;})[0];openMsgModal(s.name+' · '+s.phone,function(o){toast('Message sent to '+s.name+' · '+chLabel(o),o.wa);});}
function toggleSuspend(id){var s=subscribers.filter(function(x){return x.id===id;})[0];s.status=s.status==='suspended'?'active':'suspended';closeDrawer();if(current==='subscribers')nav('subscribers');toast(s.name+(s.status==='suspended'?' suspended':' reactivated'));}
function closeDrawer(){document.getElementById('drawerOv').classList.remove('on');}

/* ═══════════════ VIEW: ATTENDANCE & QR ═══════════════ */
var attSelFn=6;
function vAttendance(){
  var todayFns=fnsOn(todayIso()).filter(function(f){return f.status!=='cancelled';});
  return ''
  +'<div class="grid g4" style="margin-bottom:18px;">'
    +miniKpi('qr','var(--ok1)','#16A34A',attendedTodayCount(),'Checked in today')
    +miniKpi('cal','var(--g1)','var(--g5)',todayFns.length,'Functions today')
    +miniKpi('users','var(--t1)','var(--t7)','1,248','Eligible subscribers')
    +miniKpi('trend','var(--in1)','var(--in)',Math.round(attendedTodayCount()/totalSubs()*100)+'%','Attendance rate')
  +'</div>'
  +'<div style="display:flex;align-items:center;gap:12px;background:linear-gradient(135deg,#1A0E3D,#3D2582);border-radius:14px;padding:14px 16px;margin-bottom:16px;color:#fff;flex-wrap:wrap;">'
    +'<div style="width:40px;height:40px;border-radius:11px;background:rgba(255,255,255,.14);display:flex;align-items:center;justify-content:center;flex-shrink:0;">'+sIcon('qr')+'</div>'
    +'<div style="flex:1;min-width:170px;"><div style="font-weight:700;font-size:.9rem;">Public counter display</div><div style="font-size:.66rem;color:rgba(255,255,255,.6);">Show a full-screen QR at the entry, or print a poster — attendees scan to check in. Each function has its own QR.</div></div>'
    +'<button class="btn btn-gold btn-sm" onclick="openKiosk(attSelFn)">'+sIcon('qr')+'Open display</button>'
    +'<button class="btn btn-s btn-sm" style="background:rgba(255,255,255,.14);color:#fff;border-color:transparent;" onclick="printQR(attSelFn)">'+sIcon('layers')+'Print poster</button>'
  +'</div>'
  +'<div class="grid" style="grid-template-columns:1fr 1.4fr;align-items:start;">'
    +'<div class="card"><div class="card-h"><div class="ttl">'+sIcon('cal')+'Today\u2019s functions</div></div>'
      +'<div class="hint" style="margin-bottom:10px;">Pick a function to show its QR & live check-ins.</div>'
      +todayFns.map(function(f){var on=f.id===attSelFn;return '<div onclick="attSelFn='+f.id+';nav(\'attendance\')" style="display:flex;align-items:center;gap:10px;padding:11px;border:1.5px solid '+(on?'var(--t6)':'var(--bd)')+';border-radius:12px;margin-bottom:8px;cursor:pointer;background:'+(on?'var(--t0)':'#fff')+';">'
        +'<div class="seq" style="background:'+(on?'var(--t6)':'var(--t1)')+';color:'+(on?'#fff':'var(--t7)')+';">'+sIcon('qr')+'</div>'
        +'<div style="flex:1;min-width:0;"><div style="font-size:.8rem;font-weight:700;color:var(--ink);">'+f.name+'</div><div class="mono" style="font-size:.62rem;color:var(--ink3);">'+f.time+' · '+f.venue+'</div></div>'
        +'<div style="text-align:right;"><div class="mono" style="font-weight:700;color:var(--t7);">'+(attLog[f.id]?attLog[f.id].length:0)+'</div><div style="font-size:.54rem;color:var(--ink4);">in</div></div></div>';}).join('')
    +'</div>'
    +'<div id="attDetail"></div>'
  +'</div>';
}
function renderAttDetail(){
  var f=findFn(attSelFn);if(!f){document.getElementById('attDetail').innerHTML='';return;}
  f=f.f;var present=attLog[attSelFn]||[];
  var box=document.getElementById('attDetail');if(!box)return;
  box.innerHTML='<div class="card"><div class="card-h"><div class="ttl">'+sIcon('qr')+f.name+'</div><span class="chip '+statusMeta(f.status).cls+'">'+statusMeta(f.status).lbl+'</span></div>'
    +'<div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap;">'
      +'<div style="width:150px;height:150px;border-radius:16px;background:#fff;border:1px solid var(--bd);position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:var(--sh);">'+qrSvg()+'<div style="position:absolute;left:8%;right:8%;height:2px;background:linear-gradient(90deg,transparent,var(--g3),transparent);animation:scanLine 2.4s ease-in-out infinite;"></div></div>'
      +'<div style="flex:1;min-width:160px;"><div class="mono" style="font-size:.62rem;color:var(--ink4);">'+f.time+' · '+f.venue+'</div>'
        +'<div style="display:flex;align-items:baseline;gap:6px;margin-top:8px;"><span class="mono" style="font-size:2rem;font-weight:700;color:var(--t7);">'+present.length+'</span><span style="font-size:.74rem;color:var(--ink3);">checked in</span></div>'
        +'<div class="hint" style="margin:8px 0 12px;">Subscribers scan this QR at entry to mark attendance for this function.</div>'
        +'<div style="display:flex;gap:8px;flex-wrap:wrap;"><button class="btn btn-p btn-sm" onclick="openKiosk('+f.id+')">'+sIcon('qr')+'Open counter display</button><button class="btn btn-s btn-sm" onclick="printQR('+f.id+')">'+sIcon('layers')+'Print poster</button><button class="btn btn-ghost btn-sm" onclick="simScan()">Simulate scan</button></div></div>'
    +'</div>'
    +'<div class="eyebrow" style="margin:18px 0 8px;">Checked-in subscribers ('+present.length+')</div>'
    +(present.length?'<div style="display:flex;flex-wrap:wrap;gap:7px;">'+present.map(function(sid){var s=subscribers.filter(function(x){return x.id===sid;})[0];if(!s)return'';return '<div style="display:flex;align-items:center;gap:7px;background:var(--t0);border:1px solid var(--t1);border-radius:20px;padding:4px 11px 4px 4px;"><div class="av-sm" style="width:24px;height:24px;font-size:.56rem;background:'+colorFor(s.name)+'">'+inits(s.name)+'</div><span style="font-size:.72rem;font-weight:600;color:var(--ink2);">'+s.name+'</span></div>';}).join('')+'</div>':'<div style="font-size:.74rem;color:var(--ink4);">No check-ins yet. Scans will appear here live.</div>')
  +'</div>';
}
function qrSvg(size){var s=size||120;var c='';for(var y=0;y<11;y++)for(var x=0;x<11;x++){if((x*y+x+y)%3===0||(x+y)%4===0)c+='<rect x="'+(x*11+8)+'" y="'+(y*11+8)+'" width="10" height="10" fill="#1A0E3D"/>';}return '<svg viewBox="0 0 140 140" style="width:'+s+'px;height:'+s+'px;"><rect width="140" height="140" fill="#fff"/>'+c+'<rect x="8" y="8" width="34" height="34" fill="none" stroke="#1A0E3D" stroke-width="6"/><rect x="98" y="8" width="34" height="34" fill="none" stroke="#1A0E3D" stroke-width="6"/><rect x="8" y="98" width="34" height="34" fill="none" stroke="#1A0E3D" stroke-width="6"/></svg>';}
function simScan(){var pool=subscribers.filter(function(s){return (attLog[attSelFn]||[]).indexOf(s.id)===-1;});if(!pool.length){toast('All eligible subscribers checked in');return;}var s=pool[Math.floor(Math.random()*pool.length)];if(!attLog[attSelFn])attLog[attSelFn]=[];attLog[attSelFn].push(s.id);renderAttDetail();var sub=subscribers.filter(function(x){return x.id===s.id;})[0];sub.attended++;toast(s.name+' checked in ✓');}

/* ── Public counter display (kiosk) + printable poster ── */
var kioskFid=null,_kioskInt=null;
function kioskTodayEvents(){return fnsOn(todayIso()).filter(function(f){return f.status!=='cancelled'&&f.status!=='ended';}).slice().sort(function(a,b){return t24(a.time)-t24(b.time);});}
function openKiosk(fid){
  var evs=kioskTodayEvents();var def=evs.filter(function(f){return f.status==='live';})[0]||evs[0];
  kioskFid=fid||(def&&def.id)||attSelFn;
  if(!findFn(kioskFid)&&evs[0])kioskFid=evs[0].id;
  renderKiosk();document.getElementById('kioskOv').classList.add('on');
  if(_kioskInt)clearInterval(_kioskInt);_kioskInt=setInterval(kioskTick,2600);
}
function closeKiosk(){document.getElementById('kioskOv').classList.remove('on');if(_kioskInt){clearInterval(_kioskInt);_kioskInt=null;}}
function kioskMove(dir){var evs=kioskTodayEvents();if(!evs.length)return;var pos=0;for(var i=0;i<evs.length;i++){if(evs[i].id===kioskFid)pos=i;}pos=(pos+dir+evs.length)%evs.length;kioskFid=evs[pos].id;renderKiosk();}
function kioskTick(){var pool=subscribers.filter(function(s){return (attLog[kioskFid]||[]).indexOf(s.id)===-1;});if(!pool.length){renderKiosk();return;}var s=pool[Math.floor(Math.random()*pool.length)];if(!attLog[kioskFid])attLog[kioskFid]=[];attLog[kioskFid].push(s.id);var sub=subscribers.filter(function(x){return x.id===s.id;})[0];if(sub)sub.attended++;renderKiosk(s.name);}
function renderKiosk(lastName){
  var x=findFn(kioskFid);var o=document.getElementById('kioskOv');if(!o)return;if(!x){o.innerHTML='<div style="text-align:center;"><div style="font-size:1rem;margin-bottom:14px;">No live event to display right now.</div><button class="btn btn-gold btn-sm" onclick="closeKiosk()">Close</button></div>';return;}
  var f=x.f;var evs=kioskTodayEvents();var pos=0;for(var i=0;i<evs.length;i++){if(evs[i].id===kioskFid)pos=i;}
  var count=(attLog[kioskFid]||[]).length;var live=f.status==='live';
  o.innerHTML=''
    +'<div class="kiosk-exit" onclick="closeKiosk()">'+sIcon('x')+'</div>'
    +(evs.length>1?'<div class="kiosk-nav" style="left:24px;" onclick="kioskMove(-1)">'+sIcon('chevL')+'</div><div class="kiosk-nav" style="right:24px;" onclick="kioskMove(1)">'+sIcon('chevR')+'</div>':'')
    +'<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;"><div style="width:34px;height:34px;border-radius:10px;background:rgba(255,255,255,.14);display:flex;align-items:center;justify-content:center;">'+sIcon('flower')+'</div><div style="font-family:var(--fd);font-weight:800;font-size:1.05rem;">'+community.name+'</div></div>'
    +'<div class="kiosk-card">'
      +(live?'<div style="display:inline-flex;align-items:center;gap:6px;background:var(--ok1);color:#15803D;border-radius:20px;padding:4px 13px;font-size:.62rem;font-weight:800;margin-bottom:10px;"><span style="width:6px;height:6px;border-radius:50%;background:#16A34A;animation:pulse 1.3s infinite;"></span>LIVE NOW</div>':'<div style="display:inline-block;background:var(--in1);color:var(--in);border-radius:20px;padding:4px 13px;font-size:.62rem;font-weight:800;margin-bottom:10px;">UP NEXT · '+f.time+'</div>')
      +'<div class="disp" style="font-size:1.5rem;font-weight:800;color:var(--ink);line-height:1.1;">'+f.name+'</div>'
      +'<div class="mono" style="font-size:.72rem;color:var(--ink3);margin-top:5px;">'+f.time+' · '+f.venue+'</div>'
      +'<div class="kiosk-qr" style="margin:18px 0 14px;">'+qrSvg(244)+'<div class="scan"></div></div>'
      +'<div style="font-size:.96rem;font-weight:800;color:var(--ink);">Scan to mark your attendance</div>'
      +'<div style="font-size:.68rem;color:var(--ink3);margin-top:4px;">Open <b>Invite Karoo</b> → tap <b>Scan</b> → point at this code</div>'
      +'<div style="display:flex;justify-content:center;gap:7px;margin-top:14px;">'+[['phone','Open app'],['qr','Tap Scan'],['check','Done']].map(function(s,idx){return '<div style="background:var(--t0);border:1px solid var(--t1);border-radius:10px;padding:7px 9px;font-size:.58rem;font-weight:700;color:var(--t7);display:flex;align-items:center;gap:4px;">'+sIcon(s[0])+(idx+1)+'. '+s[1]+'</div>';}).join('')+'</div>'
      +'<div style="margin-top:14px;border-top:1px dashed var(--bd2);padding-top:11px;font-size:.6rem;color:var(--ink4);">Need help? Call '+(f.helpline||community.helpline)+'</div>'
    +'</div>'
    +'<div style="margin-top:18px;text-align:center;"><div class="mono" style="font-size:2.4rem;font-weight:700;color:#FDE68A;line-height:1;">'+count+'</div><div style="font-size:.7rem;color:rgba(255,255,255,.55);">checked in'+(live?' · updating live':'')+'</div>'
      +(lastName?'<div style="margin-top:9px;display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,.1);border-radius:20px;padding:5px 13px;font-size:.7rem;"><span style="color:#4ADE80;display:flex;">'+sIcon('check')+'</span>'+lastName+' just checked in</div>':'')+'</div>'
    +'<div class="kiosk-ctrlbar">'+(evs.length>1?'<span style="font-size:.66rem;color:rgba(255,255,255,.5);">Event '+(pos+1)+' of '+evs.length+'</span>':'')+'<button class="btn btn-s btn-sm" onclick="printQR('+kioskFid+')" style="background:rgba(255,255,255,.14);color:#fff;border-color:transparent;">'+sIcon('layers')+'Print poster</button></div>';
}
function printQR(fid){
  var x=findFn(fid||kioskFid||attSelFn);if(!x){toast('Select an event first');return;}
  var f=x.f;var p=x.iso.split('-');var dlbl=(+p[2])+' '+MONTHL[+p[1]-1]+' '+p[0];
  document.getElementById('printArea').innerHTML='<div style="max-width:640px;margin:0 auto;padding:46px 40px;text-align:center;font-family:Sora,sans-serif;color:#1A1028;">'
    +'<div style="border:3px solid #3D2582;border-radius:24px;padding:34px 28px;">'
    +'<div style="font-family:Fraunces,serif;font-size:1.25rem;font-weight:800;margin-bottom:4px;">'+community.name+'</div>'
    +'<div style="font-size:.72rem;font-weight:800;letter-spacing:3px;color:#7C5CBF;text-transform:uppercase;margin-bottom:20px;">Attendance Check-in</div>'
    +'<div style="font-family:Fraunces,serif;font-size:2.1rem;font-weight:800;line-height:1.1;">'+f.name+'</div>'
    +'<div style="font-family:DM Mono,monospace;font-size:.86rem;color:#6B5A8A;margin-top:8px;">'+dlbl+' · '+f.time+' · '+f.venue+'</div>'
    +'<div style="display:inline-block;border:1px solid #e5e0ee;border-radius:18px;padding:18px;margin:24px 0;">'+qrSvg(300)+'</div>'
    +'<div style="font-size:1.15rem;font-weight:800;">Scan to mark your attendance</div>'
    +'<div style="font-size:.86rem;color:#6B5A8A;margin-top:6px;">Open the <b>Invite Karoo</b> app → tap <b>Scan</b> → point at this code</div>'
    +'<div style="font-size:.8rem;color:#6B5A8A;margin-top:18px;">Need help? Call '+(f.helpline||community.helpline)+'</div>'
    +'<div style="font-size:.66rem;color:#A89BC0;margin-top:20px;">Powered by Invite Karoo</div>'
    +'</div></div>';
  window.print();
}

/* ═══════════════ VIEW: ANALYTICS ═══════════════ */
var analyticsDay=todayIso();
var openEvent=null,evMode={};
function attendeesForFn(fid){var x=findFn(fid);if(!x)return [];return attendeesFor(dayLabel(x.iso),x.f.name);}
function absenteesForFn(fid){var ids={};attendeesForFn(fid).forEach(function(s){ids[s.id]=1;});return subscribers.filter(function(s){return !ids[s.id];});}
function toggleEvent(id){openEvent=openEvent===id?null:id;renderFnBreak();}
function setEvMode(id,mode){evMode[id]=mode;renderFnBreak();}
function attChipList(list,mode){
  if(!list.length)return '<div style="font-size:.72rem;color:var(--ink4);padding:12px;text-align:center;">No subscriber found</div>';
  return list.map(function(s){return '<div onclick="openSub('+s.id+')" style="display:flex;align-items:center;gap:10px;padding:9px 11px;border-bottom:1px solid var(--bd);cursor:pointer;background:#fff;">'
    +'<div class="av-sm" style="width:30px;height:30px;font-size:.6rem;background:'+colorFor(s.name)+'">'+inits(s.name)+'</div>'
    +'<div style="flex:1;min-width:0;"><div style="font-size:.76rem;font-weight:600;color:var(--ink);">'+s.name+'</div><div class="mono" style="font-size:.58rem;color:var(--ink4);">'+s.phone+' · '+s.family+' family</div></div>'
    +(mode==='in'?'<span class="chip cg">'+sIcon('check')+'Present</span>':'<span class="chip ce">'+sIcon('x')+'Absent</span>')+'</div>';}).join('');
}
function filterEvAtt(fid){
  var inp=document.getElementById('evSearch-'+fid);var q=(inp&&inp.value||'').toLowerCase();var qd=q.replace(/\D/g,'');
  var mode=evMode[fid]||'in';var src=(mode==='in'?attendeesForFn(fid):absenteesForFn(fid));
  var list=src.filter(function(s){if(!q)return true;if((s.name+' '+s.family).toLowerCase().indexOf(q)>-1)return true;if(qd&&s.phone.replace(/\D/g,'').indexOf(qd)>-1)return true;return false;});
  var box=document.getElementById('evList-'+fid);if(box)box.innerHTML=attChipList(list,mode);
}
function dayLabel(isoStr){var p=isoStr.split('-');return (+p[2])+' '+MONTHS[+p[1]-1];}
function attendeesFor(dyLabel,fnName){return subscribers.filter(function(s){return subHistory(s).some(function(h){return h.date===dyLabel&&h.fn===fnName&&h.present;});});}
function dayUnique(isoStr){var set={};var lbl=dayLabel(isoStr);fnsOn(isoStr).forEach(function(f){attendeesFor(lbl,f.name).forEach(function(s){set[s.id]=1;});});return Object.keys(set).length;}
function vAnalytics(){
  var days=editionDays();
  var totalToday=attendedTodayCount();
  var fnsToday=fnsOn(todayIso()).filter(function(f){return f.status!=='cancelled';});
  var avg=fnsToday.length?Math.round(Object.keys(attLog).reduce(function(a,k){return a+attLog[k].length;},0)/fnsToday.length):0;
  var best=fnsToday.slice().sort(function(a,b){return (attLog[b.id]||[]).length-(attLog[a.id]||[]).length;})[0];
  var totRsvp=subscribers.reduce(function(a,s){return a+s.rsvp;},0),totAtt=subscribers.reduce(function(a,s){return a+s.attended;},0);
  var rsvpToday=fnsToday.reduce(function(a,f){return a+rsvpCount(f);},0);
  // daily chart
  var vals=days.map(function(d){return {label:'D'+d.idx,sub:d.d+' '+MONTHS[d.m],v:dayUnique(d.iso),today:d.iso===todayIso(),future:new Date(d.y,d.m,d.d)>new Date(TODAY.y,TODAY.m,TODAY.d)};});
  var maxV=Math.max.apply(null,vals.map(function(v){return v.v;}))||1;
  var chart='<svg viewBox="0 0 '+(vals.length*64)+' 200" style="width:100%;height:200px;">';
  vals.forEach(function(v,i){var h=v.v/maxV*140;var x=i*64+18;var col=v.today?'#F5A623':v.future?'#D4C4EE':'#7C5CBF';
    chart+='<rect x="'+x+'" y="'+(160-h)+'" width="30" height="'+h+'" rx="5" fill="'+col+'"/>';
    chart+='<text x="'+(x+15)+'" y="'+(160-h-6)+'" text-anchor="middle" font-family="DM Mono" font-size="11" font-weight="700" fill="#3D2D5C">'+(v.v||'')+'</text>';
    chart+='<text x="'+(x+15)+'" y="178" text-anchor="middle" font-family="Sora" font-size="9" font-weight="700" fill="#6B5A8A">'+v.label+'</text>';
    chart+='<text x="'+(x+15)+'" y="192" text-anchor="middle" font-family="Sora" font-size="8" fill="#A89BC0">'+v.sub+'</text>';
  });
  chart+='</svg>';
  return ''
  +'<div class="grid g4" style="margin-bottom:18px;">'
    +miniKpi('qr','var(--ok1)','#16A34A',totalToday,'Check-ins today')
    +miniKpi('check','var(--g1)','var(--g5)',rsvpToday,'RSVPs today (for arrangements)')
    +miniKpi('star','var(--t1)','var(--t7)',best?best.name.split(' ')[0]:'—','Best attended')
    +miniKpi('trend','var(--in1)','var(--in)',Math.round(totAtt/totRsvp*100)+'%','RSVP → attended')
  +'</div>'
  +'<div class="card" style="margin-bottom:18px;"><div class="card-h"><div class="ttl">'+sIcon('chart')+'Daily attendance · unique devotees</div><span class="chip ca">Edition 2</span></div>'+chart
    +'<div style="display:flex;gap:16px;justify-content:center;margin-top:6px;font-size:.62rem;color:var(--ink3);"><span><span style="display:inline-block;width:9px;height:9px;border-radius:2px;background:#7C5CBF;vertical-align:-1px;"></span> Past days</span><span><span style="display:inline-block;width:9px;height:9px;border-radius:2px;background:#F5A623;vertical-align:-1px;"></span> Today</span><span><span style="display:inline-block;width:9px;height:9px;border-radius:2px;background:#D4C4EE;vertical-align:-1px;"></span> Upcoming</span></div></div>'
  +'<div class="card" style="padding:0;overflow:hidden;"><div class="card-h" style="padding:16px;margin:0;flex-wrap:wrap;gap:10px;"><div class="ttl">'+sIcon('users')+'Event-wise attendance · by date</div>'
    +'<select style="width:auto;padding:8px 12px;" onchange="setAnalyticsDay(this.value)">'+days.map(function(d){var fut=new Date(d.y,d.m,d.d)>new Date(TODAY.y,TODAY.m,TODAY.d);return '<option value="'+d.iso+'"'+(d.iso===analyticsDay?' selected':'')+'>'+d.d+' '+MONTHS[d.m]+' '+d.y+' · Day '+d.idx+(d.iso===todayIso()?' (Today)':fut?' (Upcoming)':' (Past)')+'</option>';}).join('')+'</select></div>'
    +'<div style="padding:10px 16px 0;"><div id="attChart"></div>'
      +'<div style="display:flex;gap:18px;justify-content:center;margin:6px 0 4px;font-size:.62rem;color:var(--ink3);"><span><span style="display:inline-block;width:9px;height:9px;border-radius:2px;background:#16A34A;vertical-align:-1px;"></span> Attended</span><span><span style="display:inline-block;width:9px;height:9px;border-radius:2px;background:#C4AEE8;vertical-align:-1px;"></span> Absent</span></div></div>'
    +'<div id="fnBreak" style="padding:4px 16px 16px;"></div>'
  +'</div>';
}
function renderFnBreak(){
  var box=document.getElementById('fnBreak');if(!box)return;
  var fns=fnsOn(analyticsDay).filter(function(f){return f.status!=='cancelled';}).slice().sort(function(a,b){return t24(a.time)-t24(b.time);});
  if(!fns.length){box.innerHTML='<div class="empty">'+sIcon('cal')+'<div class="t">No events this day</div><div class="s">Pick another day from the selector above.</div></div>';return;}
  var future=new Date(+analyticsDay.split('-')[0],+analyticsDay.split('-')[1]-1,+analyticsDay.split('-')[2])>new Date(TODAY.y,TODAY.m,TODAY.d);
  var counts=fns.map(function(f){return attendeesForFn(f.id).length;});
  var mx=Math.max.apply(null,counts)||1;
  var totRsvp=fns.reduce(function(a,f){return a+rsvpCount(f);},0);
  var peak=fns.slice().sort(function(a,b){return rsvpCount(b)-rsvpCount(a);})[0];
  var banner='<div style="display:flex;align-items:center;gap:11px;background:var(--t0);border:1px solid var(--t1);border-radius:12px;padding:11px 13px;margin:4px 0 14px;">'
    +'<div style="color:var(--t6);flex-shrink:0;">'+sIcon('info')+'</div>'
    +'<div style="flex:1;font-size:.72rem;color:var(--t7);line-height:1.5;">Basic RSVP is shown per event below. For companions, total headcount &amp; food/water planning, open <b>RSVP Management</b>.</div>'
    +'<button class="btn btn-s btn-sm" onclick="nav(\'rsvp\')" style="flex-shrink:0;">'+sIcon('check')+'Open RSVP</button></div>';
  box.innerHTML=banner+fns.map(function(f,i){
    var att=attendeesForFn(f.id);var c=att.length;var rsvp=rsvpCount(f);var isOpen=openEvent===f.id;var mode=evMode[f.id]||'in';
    var panel='';
    if(isOpen){
      if(future){panel='<div style="padding:12px 14px 14px;background:var(--t0);border-top:1px solid var(--bd);font-size:.72rem;color:var(--ink4);">Attendance opens on the event day. <b style="color:var(--in);">'+rsvp+'</b> subscribers have RSVP\u2019d so far — useful for planning arrangements.</div>';}
      else{var list=(mode==='in'?att:absenteesForFn(f.id));
        panel='<div style="padding:12px 14px 14px;background:var(--t0);border-top:1px solid var(--bd);">'
          +'<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:11px;">'
            +'<div class="seg"><div class="s'+(mode==='in'?' on':'')+'" onclick="setEvMode('+f.id+',\'in\')">Attended ('+c+')</div><div class="s'+(mode==='out'?' on':'')+'" onclick="setEvMode('+f.id+',\'out\')">Absent ('+(subscribers.length-c)+')</div></div>'
            +'<div style="position:relative;flex:1;min-width:170px;max-width:280px;"><svg viewBox="0 0 24 24" fill="none" stroke="var(--ink4)" stroke-width="2" style="width:15px;height:15px;position:absolute;left:11px;top:50%;transform:translateY(-50%);">'+IC.search+'</svg><input id="evSearch-'+f.id+'" placeholder="Search subscriber in this event…" style="padding:8px 8px 8px 34px;" oninput="filterEvAtt('+f.id+')"/></div>'
          +'</div>'
          +'<div style="font-size:.6rem;color:var(--ink4);margin-bottom:7px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;">'+(mode==='in'?c+' attended':(subscribers.length-c)+' absent')+' · scroll for full list</div>'
          +'<div id="evList-'+f.id+'" style="max-height:300px;overflow-y:auto;border:1px solid var(--bd);border-radius:10px;background:#fff;">'+attChipList(list,mode)+'</div></div>';
      }
    }
    return '<div style="border:1px solid var(--bd);border-radius:13px;margin-bottom:10px;overflow:hidden;'+(isOpen?'box-shadow:var(--sh2);':'')+'">'
      +'<div style="display:flex;align-items:center;gap:12px;padding:12px 14px;cursor:pointer;" onclick="toggleEvent('+f.id+')">'
        +'<div class="seq" style="background:var(--t1);color:var(--t7);">'+(i+1)+'</div>'
        +'<div style="flex:1;min-width:0;"><div style="font-size:.82rem;font-weight:700;color:var(--ink);">'+f.name+'</div><div class="mono" style="font-size:.62rem;color:var(--ink3);">'+f.time+' · '+f.venue+'</div></div>'
        +'<span class="chip ci" style="flex-shrink:0;">'+sIcon('check')+rsvp+' RSVP</span>'
        +'<div style="width:90px;max-width:16vw;"><div class="bar-track" style="height:9px;"><div class="bar-fill" style="width:'+(future?0:Math.round(c/mx*100))+'%;"></div></div></div>'
        +'<div style="text-align:right;min-width:46px;"><span class="mono" style="font-size:1.05rem;font-weight:700;color:var(--t7);">'+(future?'—':c)+'</span><div style="font-size:.5rem;color:var(--ink4);">attended</div></div>'
        +'<button class="btn '+(isOpen?'btn-p':'btn-s')+' btn-sm" onclick="event.stopPropagation();toggleEvent('+f.id+')" style="flex-shrink:0;">'+sIcon('users')+(isOpen?'Hide':(future?'View RSVPs':'View attendees'))+'</button>'
      +'</div>'+panel
    +'</div>';
  }).join('');
}

function renderAttChart(){
  var box=document.getElementById('attChart');if(!box)return;
  var fns=fnsOn(analyticsDay).filter(function(f){return f.status!=='cancelled';}).slice().sort(function(a,b){return t24(a.time)-t24(b.time);});
  var p=analyticsDay.split('-');var dlbl=(+p[2])+' '+MONTHL[+p[1]-1]+' '+p[0];
  if(!fns.length){box.innerHTML='<div style="background:var(--t0);border:1px solid var(--t1);border-radius:11px;padding:14px;text-align:center;font-size:.74rem;color:var(--ink3);">No events on '+dlbl+'.</div>';return;}
  var future=new Date(+p[0],+p[1]-1,+p[2])>new Date(TODAY.y,TODAY.m,TODAY.d);
  if(future){box.innerHTML='<div style="background:var(--t0);border:1px solid var(--t1);border-radius:11px;padding:14px;text-align:center;font-size:.74rem;color:var(--ink3);"><b>'+dlbl+'</b> is upcoming — attendance hasn\u2019t started. RSVP counts are shown per event below.</div>';return;}
  var N=subscribers.length;var colW=124;var W=Math.max(fns.length*colW,300);var H=212;var base=150;var top=16;var maxH=base-top;var bw=30,gap=8;
  var svg='<svg viewBox="0 0 '+W+' '+H+'" style="width:'+(fns.length>4?(W+'px'):'100%')+';height:'+H+'px;min-width:100%;">';
  svg+='<line x1="0" y1="'+base+'" x2="'+W+'" y2="'+base+'" stroke="rgba(124,92,191,.24)" stroke-width="1"/>';
  fns.forEach(function(f,i){
    var att=attendeesForFn(f.id).length;var abs=N-att;
    var gx=i*colW+(colW-(bw*2+gap))/2;var hA=att/N*maxH,hB=abs/N*maxH;
    svg+='<rect x="'+gx+'" y="'+(base-hA)+'" width="'+bw+'" height="'+hA+'" rx="4" fill="#16A34A"/>';
    svg+='<text x="'+(gx+bw/2)+'" y="'+(base-hA-5)+'" text-anchor="middle" font-family="DM Mono" font-size="10" font-weight="700" fill="#15803D">'+att+'</text>';
    var gx2=gx+bw+gap;
    svg+='<rect x="'+gx2+'" y="'+(base-hB)+'" width="'+bw+'" height="'+hB+'" rx="4" fill="#C4AEE8"/>';
    svg+='<text x="'+(gx2+bw/2)+'" y="'+(base-hB-5)+'" text-anchor="middle" font-family="DM Mono" font-size="10" font-weight="700" fill="#6B5A8A">'+abs+'</text>';
    var nm=f.name.length>15?f.name.slice(0,14)+'…':f.name;
    svg+='<text x="'+(i*colW+colW/2)+'" y="'+(base+16)+'" text-anchor="middle" font-family="Sora" font-size="9" font-weight="700" fill="#3D2D5C">'+nm.replace(/&/g,'&amp;')+'</text>';
    svg+='<text x="'+(i*colW+colW/2)+'" y="'+(base+28)+'" text-anchor="middle" font-family="Sora" font-size="8" fill="#A89BC0">'+f.time+'</text>';
  });
  svg+='</svg>';
  box.innerHTML='<div style="font-size:.66rem;color:var(--ink3);margin-bottom:4px;">Events on <b>'+dlbl+'</b> — attended vs absent (tap a bar\u2019s event below for names)</div><div style="overflow-x:auto;">'+svg+'</div>';
}
function setAnalyticsDay(iso){analyticsDay=iso;openEvent=null;renderAttChart();renderFnBreak();}

/* ═══════════════ VIEW: RSVP MANAGEMENT ═══════════════ */
var rsvpView='event',rsvpOpen=null,rsvpDay=null;
function dayRsvp(iso){var total=1248;var seed=0;for(var i=0;i<iso.length;i++)seed+=iso.charCodeAt(i);var responded=Math.round(total*(0.6+(seed%12)/100));var going=Math.round(responded*0.78);var cant=responded-going;var guests=Math.round(going*1.7);return {total:total,responded:responded,going:going,cant:cant,guests:guests,pending:total-responded};}
function rsvpDefaultDay(){var u=upcomingDaysWithEvents();for(var i=0;i<u.length;i++){if(u[i].iso===todayIso())return u[i].iso;}return (u[0]&&u[0].iso)||todayIso();}
function rsvpEvents(){var out=[];editionDays().forEach(function(d){if(new Date(d.y,d.m,d.d)<new Date(TODAY.y,TODAY.m,TODAY.d))return;fnsOn(d.iso).filter(function(f){return f.status!=='cancelled'&&f.status!=='ended';}).forEach(function(f){out.push({f:f,iso:d.iso,idx:d.idx});});});out.sort(function(a,b){return a.iso<b.iso?-1:a.iso>b.iso?1:t24(a.f.time)-t24(b.f.time);});return out;}
function evRsvpStats(f){var responded=rsvpCount(f);var going=Math.round(responded*0.78);var cant=responded-going;var guests=Math.round(going*1.7);return {responded:responded,going:going,cant:cant,guests:guests};}
function rsvpStatusFor(fid,s){var seed=s.id*7+fid*13;if(seed%3===0)return 'pending';return (seed%4===0)?'no':'going';}
function pendingForEvent(fid){return subscribers.filter(function(s){return rsvpStatusFor(fid,s)==='pending';});}
function rsvpRespList(fid){return subscribers.filter(function(s){return rsvpStatusFor(fid,s)!=='pending';}).map(function(s){var st=rsvpStatusFor(fid,s);var pax=st==='going'?1+((s.id*7+fid*13)%4):0;return {s:s,status:st,pax:pax};});}
function vRSVP(){
  if(!rsvpDay)rsvpDay=rsvpDefaultDay();
  var udays=upcomingDaysWithEvents();
  return ''
  +'<div style="display:flex;align-items:center;gap:14px;background:linear-gradient(135deg,#1A0E3D,#3D2582);border-radius:14px;padding:14px 16px;margin-bottom:18px;color:#fff;flex-wrap:wrap;">'
    +'<div style="width:40px;height:40px;border-radius:11px;background:rgba(255,255,255,.14);display:flex;align-items:center;justify-content:center;flex-shrink:0;">'+sIcon('send')+'</div>'
    +'<div style="flex:1;min-width:180px;"><div style="font-weight:700;font-size:.92rem;">Collect RSVPs</div><div style="font-size:.66rem;color:rgba(255,255,255,.65);">Ask subscribers to confirm attendance &amp; how many they\u2019re bringing — so you can plan food &amp; water accurately.</div></div>'
    +'<button class="btn btn-gold btn-sm" onclick="rsvpRequestModal()">'+sIcon('send')+'Send RSVP request</button>'
  +'</div>'
  +'<div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;flex-wrap:wrap;">'
    +'<div style="font-size:.82rem;font-weight:700;color:var(--ink2);">RSVP summary for</div>'
    +'<select id="rsvpDaySel" style="width:auto;padding:8px 12px;" onchange="setRsvpDay(this.value)">'+udays.map(function(d){return '<option value="'+d.iso+'"'+(d.iso===rsvpDay?' selected':'')+'>'+d.d+' '+MONTHS[d.m]+' '+d.y+' · Day '+d.idx+(d.iso===todayIso()?' (Today)':'')+'</option>';}).join('')+'</select>'
  +'</div>'
  +'<div id="rsvpKpis"></div>'
  +'<div style="display:flex;align-items:center;gap:12px;margin:4px 0 14px;flex-wrap:wrap;">'
    +'<div class="seg"><div id="rsvpSegEvent" class="s'+(rsvpView==='event'?' on':'')+'" onclick="setRsvpView(\'event\')">By event</div><div id="rsvpSegDay" class="s'+(rsvpView==='day'?' on':'')+'" onclick="setRsvpView(\'day\')">By day</div></div>'
    +'<span style="font-size:.66rem;color:var(--ink4);">Switch between per-event responses and a day-by-day overview.</span>'
  +'</div>'
  +'<div id="rsvpBody"></div>';
}
function renderRsvpKpis(){
  var box=document.getElementById('rsvpKpis');if(!box)return;var dr=dayRsvp(rsvpDay);
  box.innerHTML='<div class="grid g4" style="margin-bottom:10px;">'
    +miniKpi('check','var(--ok1)','#16A34A',dr.going.toLocaleString('en-IN'),'Going')
    +miniKpi('ban','var(--er1)','var(--er)',dr.cant.toLocaleString('en-IN'),'Can\u2019t go')
    +miniKpi('clock','var(--t1)','var(--t7)',dr.pending.toLocaleString('en-IN'),'Yet to respond')
    +miniKpi('users','var(--g1)','var(--g5)',dr.guests.toLocaleString('en-IN'),'People expected')
  +'</div>'
  +'<div class="info-box" style="margin-bottom:8px;">'+sIcon('info')+'<div><b>'+dr.going.toLocaleString('en-IN')+'</b> going + <b>'+dr.cant.toLocaleString('en-IN')+'</b> can\u2019t go + <b>'+dr.pending.toLocaleString('en-IN')+'</b> yet to respond = <b>'+dr.total.toLocaleString('en-IN')+'</b> subscribers. <b>People expected ('+dr.guests.toLocaleString('en-IN')+')</b> = the going members plus companions they bring — use this for food &amp; water.</div></div>';
}
function setRsvpDay(iso){rsvpDay=iso;rsvpOpen=null;var sel=document.getElementById('rsvpDaySel');if(sel)sel.value=iso;renderRsvpKpis();renderRsvpBody();}
function rsvpPickDay(iso){rsvpDay=iso;rsvpView='event';rsvpOpen=null;var a=document.getElementById('rsvpSegEvent'),b=document.getElementById('rsvpSegDay');if(a)a.classList.add('on');if(b)b.classList.remove('on');var sel=document.getElementById('rsvpDaySel');if(sel)sel.value=iso;renderRsvpKpis();renderRsvpBody();}
function renderRsvpBody(){
  var box=document.getElementById('rsvpBody');if(!box)return;
  if(rsvpView==='day'){
    var udays=upcomingDaysWithEvents();
    if(!udays.length){box.innerHTML='<div class="card"><div class="empty">'+sIcon('check')+'<div class="t">No upcoming events</div><div class="s">Add events in the Schedule to collect RSVPs.</div></div></div>';return;}
    box.innerHTML='<div class="card" style="padding:0;overflow:hidden;"><div style="overflow-x:auto;"><table style="min-width:580px;"><thead><tr><th>Day</th><th>Going</th><th>Can\u2019t go</th><th>Yet to respond</th><th>People expected</th></tr></thead><tbody>'
      +udays.map(function(d){var dr=dayRsvp(d.iso);var isT=d.iso===todayIso();
        return '<tr onclick="rsvpPickDay(\''+d.iso+'\')" style="cursor:pointer;'+(d.iso===rsvpDay?'background:var(--t0);':'')+'"><td><div style="font-weight:700;color:var(--ink);">'+d.d+' '+MONTHS[d.m]+(isT?' · Today':'')+'</div><div style="font-size:.62rem;color:var(--ink4);">Day '+d.idx+'</div></td>'
        +'<td class="mono" style="font-weight:700;color:#16A34A;">'+dr.going.toLocaleString('en-IN')+'</td>'
        +'<td class="mono" style="color:var(--er);">'+dr.cant.toLocaleString('en-IN')+'</td>'
        +'<td class="mono" style="color:var(--ink3);">'+dr.pending.toLocaleString('en-IN')+'</td>'
        +'<td class="mono" style="font-weight:700;color:var(--g5);">'+dr.guests.toLocaleString('en-IN')+'</td></tr>';}).join('')
      +'</tbody></table></div></div>';
    return;
  }
  var evs=dayEvents(rsvpDay);
  if(!evs.length){box.innerHTML='<div class="card"><div class="empty">'+sIcon('check')+'<div class="t">No events on this day</div><div class="s">Pick another day from the selector above.</div></div></div>';return;}
  var p=rsvpDay.split('-');
  box.innerHTML='<div style="font-size:.66rem;color:var(--ink4);margin-bottom:9px;">Per-event responses — a member may RSVP to more than one event, so event counts can differ from the day totals above.</div>'
    +evs.map(function(f){var st=evRsvpStats(f);var isOpen=rsvpOpen===f.id;
    var panel='';
    if(isOpen){var list=rsvpRespList(f.id);
      panel='<div style="padding:12px 14px 14px;background:var(--t0);border-top:1px solid var(--bd);">'
        +'<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:11px;">'
          +'<span class="chip cg">'+st.going+' going</span><span class="chip ce">'+st.cant+' can\u2019t go</span><span class="chip cp" title="Total people expected including companions">'+sIcon('users')+st.guests+' people expected</span>'
          +'<div style="flex:1;min-width:160px;max-width:260px;position:relative;"><svg viewBox="0 0 24 24" fill="none" stroke="var(--ink4)" stroke-width="2" style="width:15px;height:15px;position:absolute;left:11px;top:50%;transform:translateY(-50%);">'+IC.search+'</svg><input id="rsvpSearch-'+f.id+'" placeholder="Search subscriber…" style="padding:8px 8px 8px 34px;" oninput="filterRsvp('+f.id+')"/></div>'
        +'</div>'
        +'<div style="font-size:.6rem;color:var(--ink4);margin-bottom:7px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;">Subscriber responses · the number = people they\u2019re bringing (incl. themselves)</div>'
        +'<div id="rsvpList-'+f.id+'" style="max-height:300px;overflow-y:auto;border:1px solid var(--bd);border-radius:10px;background:#fff;">'+rsvpRows(list)+'</div></div>';
    }
    return '<div style="border:1px solid var(--bd);border-radius:13px;margin-bottom:10px;overflow:hidden;'+(isOpen?'box-shadow:var(--sh2);':'')+'">'
      +'<div style="display:flex;align-items:center;gap:12px;padding:12px 14px;cursor:pointer;" onclick="rsvpToggle('+f.id+')">'
        +'<div style="width:46px;height:48px;border-radius:11px;background:var(--cream);display:flex;flex-direction:column;align-items:center;justify-content:center;flex-shrink:0;"><span class="mono" style="font-size:1.05rem;font-weight:700;color:var(--ink2);line-height:1;">'+(+p[2])+'</span><span style="font-size:.5rem;font-weight:800;color:var(--ink4);text-transform:uppercase;">'+MONTHS[+p[1]-1]+'</span></div>'
        +'<div style="flex:1;min-width:0;"><div style="font-size:.82rem;font-weight:700;color:var(--ink);">'+f.name+'</div><div class="mono" style="font-size:.62rem;color:var(--ink3);">'+f.time+' · '+f.venue+'</div></div>'
        +'<div style="text-align:right;min-width:50px;"><span class="mono" style="font-size:1.05rem;font-weight:700;color:#16A34A;">'+st.going+'</span><div style="font-size:.5rem;color:var(--ink4);">going</div></div>'
        +'<div style="text-align:right;min-width:54px;"><span class="mono" style="font-size:1.05rem;font-weight:700;color:var(--g5);">'+st.guests+'</span><div style="font-size:.5rem;color:var(--ink4);">expected</div></div>'
        +'<button class="btn '+(isOpen?'btn-p':'btn-s')+' btn-sm" onclick="event.stopPropagation();rsvpToggle('+f.id+')" style="flex-shrink:0;">'+sIcon('users')+(isOpen?'Hide':'View responses')+'</button>'
      +'</div>'+panel
    +'</div>';
  }).join('');
}
function rsvpRows(list){
  return list.map(function(r){var s=r.s;var m={going:{c:'cg',l:'Going'},no:{c:'ce',l:'Can\u2019t go'}}[r.status];
    return '<div onclick="openSub('+s.id+')" style="display:flex;align-items:center;gap:10px;padding:9px 11px;border-bottom:1px solid var(--bd);cursor:pointer;background:#fff;">'
      +'<div class="av-sm" style="width:30px;height:30px;font-size:.6rem;background:'+colorFor(s.name)+'">'+inits(s.name)+'</div>'
      +'<div style="flex:1;min-width:0;"><div style="font-size:.76rem;font-weight:600;color:var(--ink);">'+s.name+'</div><div class="mono" style="font-size:.58rem;color:var(--ink4);">'+s.phone+'</div></div>'
      +(r.pax?'<span class="chip cp" title="People attending, including themselves">'+sIcon('users')+r.pax+' '+(r.pax===1?'person':'people')+'</span>':'')
      +'<span class="chip '+m.c+'">'+m.l+'</span></div>';
  }).join('');
}
function filterRsvp(fid){var inp=document.getElementById('rsvpSearch-'+fid);var q=(inp&&inp.value||'').toLowerCase();var qd=q.replace(/\D/g,'');var list=rsvpRespList(fid).filter(function(r){if(!q)return true;if((r.s.name+' '+r.s.family).toLowerCase().indexOf(q)>-1)return true;if(qd&&r.s.phone.replace(/\D/g,'').indexOf(qd)>-1)return true;return false;});var box=document.getElementById('rsvpList-'+fid);if(box)box.innerHTML=list.length?rsvpRows(list):'<div style="font-size:.72rem;color:var(--ink4);padding:12px;text-align:center;">No subscriber found</div>';}
function rsvpToggle(id){rsvpOpen=rsvpOpen===id?null:id;renderRsvpBody();}
function rsvpRequestModal(){
  openModal('<div class="modal"><div class="modal-h"><div class="ttl">Send RSVP request</div><div class="x" onclick="closeModal()">'+sIcon('x')+'</div></div>'
    +'<div class="modal-b"><div class="info-box" style="margin-bottom:14px;">'+sIcon('info')+'<div>The request goes only to subscribers who <b>haven\u2019t responded yet</b> for the selected event — pick an event to see exactly who.</div></div>'
    +'<label class="flbl">Request for</label>'
    +'<select id="rq-day" onchange="fillRqEvents()"><option value="all">All upcoming events</option>'+upcomingDaysWithEvents().map(function(d){return '<option value="'+d.iso+'">'+d.d+' '+MONTHS[d.m]+' '+d.y+' · Day '+d.idx+(d.iso===todayIso()?' (Today)':'')+'</option>';}).join('')+'</select>'
    +'<select id="rq-ev" style="margin-top:8px;display:none;" onchange="renderRqPending()"></select>'
    +'<div id="rqPending" style="margin-top:12px;"><div class="hint">The request will be sent to everyone who hasn\u2019t responded yet across all upcoming events.</div></div>'
    +'<label class="flbl" style="margin-top:14px;">Send via</label><div style="display:flex;gap:8px;" id="rq-ch"><span class="chip cp" data-ch="app" onclick="this.classList.toggle(\'cp\');this.classList.toggle(\'cn\')" style="cursor:pointer;padding:9px 14px;">'+sIcon('bell')+'App</span><span class="chip cg" data-ch="wa" onclick="this.classList.toggle(\'cg\');this.classList.toggle(\'cn\')" style="cursor:pointer;padding:9px 14px;">'+sIcon('wa')+'WhatsApp</span></div>'
    +'<label class="flbl" style="margin-top:12px;">Message (optional)</label><textarea id="rq-msg" rows="2" placeholder="Please confirm your attendance and number of people joining."></textarea></div>'
    +'<div class="modal-f"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-p" onclick="sendRsvpReq()">'+sIcon('send')+'Send request</button></div></div>');
}
function rqTargetPending(){
  var day=document.getElementById('rq-day').value;if(day==='all')return null;
  var ev=document.getElementById('rq-ev');var val=(ev&&ev.style.display!=='none')?ev.value:'';
  if(!val||val.indexOf('day:')===0){var iso=val.indexOf('day:')===0?val.slice(4):day;var set={},list=[];dayEvents(iso).forEach(function(f){pendingForEvent(f.id).forEach(function(s){if(!set[s.id]){set[s.id]=1;list.push(s);}});});return list;}
  return pendingForEvent(+val);
}
function renderRqPending(){
  var box=document.getElementById('rqPending');if(!box)return;
  var day=document.getElementById('rq-day').value;
  if(day==='all'){box.innerHTML='<div class="hint">The request will be sent to everyone who hasn\u2019t responded yet across all upcoming events.</div>';return;}
  var list=rqTargetPending()||[];
  box.innerHTML='<div style="font-size:.6rem;color:var(--ink4);margin-bottom:7px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;">'+list.length+' haven\u2019t responded yet — request goes only to them</div>'
    +(list.length?'<div style="max-height:200px;overflow-y:auto;border:1px solid var(--bd);border-radius:10px;background:#fff;">'+list.map(function(s){return '<div style="display:flex;align-items:center;gap:9px;padding:7px 10px;border-bottom:1px solid var(--bd);"><div class="av-sm" style="width:26px;height:26px;font-size:.56rem;background:'+colorFor(s.name)+'">'+inits(s.name)+'</div><div style="flex:1;min-width:0;"><div style="font-size:.72rem;font-weight:600;color:var(--ink);">'+s.name+'</div><div class="mono" style="font-size:.54rem;color:var(--ink4);">'+s.phone+'</div></div></div>';}).join('')+'</div>':'<div class="hint">Everyone has already responded for this selection — no request needed.</div>');
}
function sendRsvpReq(){
  var app=false,wa=false;document.querySelectorAll('#rq-ch .chip').forEach(function(c){var on=!c.classList.contains('cn');if(c.getAttribute('data-ch')==='app')app=on;if(c.getAttribute('data-ch')==='wa')wa=on;});
  if(!app&&!wa){toast('Pick at least one channel');return;}
  var day=document.getElementById('rq-day').value;var msg;
  if(day==='all'){msg='RSVP request sent to everyone who hasn\u2019t responded across all upcoming events';}
  else{var list=rqTargetPending()||[];if(!list.length){toast('Everyone has already responded — no one to send to');return;}msg='RSVP request sent to '+list.length+' subscriber'+(list.length===1?'':'s')+' who haven\u2019t responded yet';}
  closeModal();toast(msg+' · '+(app&&wa?'app + WhatsApp':wa?'WhatsApp':'app'),wa);
}

/* ═══════════════ VIEW: DONATIONS ═══════════════ */
function vDonations(){
  var total=donations.reduce(function(a,d){return a+d.amt;},0);
  var top=donations.slice().sort(function(a,b){return b.amt-a.amt;})[0];
  return ''
  +'<div class="grid g4" style="margin-bottom:18px;">'
    +miniKpi('rupee','var(--in1)','var(--in)',money(total),'Total · Edition 2')
    +miniKpi('users','var(--t1)','var(--t7)',donations.length,'Contributors')
    +miniKpi('trend','var(--ok1)','#16A34A',money(Math.round(total/donations.length)),'Avg donation')
    +miniKpi('award','var(--g1)','var(--g5)',subName(top.sub).split(' ')[0],'Top donor')
  +'</div>'
  +'<div class="card" style="padding:0;overflow:hidden;">'
    +'<div class="card-h" style="padding:16px;margin:0;"><div class="ttl">'+sIcon('rupee')+'Donation ledger</div><div style="display:flex;gap:8px;"><button class="btn btn-s btn-sm" onclick="exportDonations()">'+sIcon('layers')+'Export XLS</button><button class="btn btn-p btn-sm" onclick="addDonationModal()">'+sIcon('plus')+'Record donation</button></div></div>'
    +'<table><thead><tr><th>Donor</th><th>Amount</th><th>Purpose</th><th>Mode</th><th>Date</th><th>Receipt</th></tr></thead><tbody>'
    +donations.slice().sort(function(a,b){return b.amt-a.amt;}).map(function(d){var s=subscribers.filter(function(x){return x.id===d.sub;})[0];return '<tr><td onclick="openSub('+d.sub+')" style="cursor:pointer;"><div class="u-cell"><div class="av-sm" style="background:'+colorFor(s.name)+'">'+inits(s.name)+'</div><div class="nm">'+s.name+'</div></div></td><td class="mono" style="font-weight:700;color:var(--ink);">'+money(d.amt)+'</td><td>'+d.purpose+'</td><td><span class="chip cp">'+d.mode+'</span></td><td style="color:var(--ink4);">'+d.date+'</td><td><button class="btn btn-s btn-sm" onclick="openReceipt('+d.id+')">'+sIcon('layers')+'Receipt</button></td></tr>';}).join('')
    +'</tbody></table>'
  +'</div>';
}
function subName(id){var s=subscribers.filter(function(x){return x.id===id;})[0];return s?s.name:'';}
function exportXLS(filename,headers,rows){
  var esc=function(v){return String(v==null?'':v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');};
  var t='<table border="1"><thead><tr>'+headers.map(function(h){return '<th>'+esc(h)+'</th>';}).join('')+'</tr></thead><tbody>'+rows.map(function(r){return '<tr>'+r.map(function(c){return '<td>'+esc(c)+'</td>';}).join('')+'</tr>';}).join('')+'</tbody></table>';
  var html='\ufeff<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="utf-8"/></head><body>'+t+'</body></html>';
  var blob=new Blob([html],{type:'application/vnd.ms-excel'});
  var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=filename;document.body.appendChild(a);a.click();
  setTimeout(function(){document.body.removeChild(a);URL.revokeObjectURL(a.href);},120);
}
function exportDonations(){
  var rows=donations.slice().sort(function(a,b){return b.amt-a.amt;}).map(function(d){var s=subscribers.filter(function(x){return x.id===d.sub;})[0]||{};return [s.name||'',s.family||'',s.phone||'',d.amt,d.purpose,d.mode,d.date];});
  exportXLS('donations_edition2.xls',['Donor','Family','Phone','Amount (INR)','Purpose','Mode','Date'],rows);
  toast('Donations exported to XLS');
}
function exportSubscribers(){
  var rows=subscribers.map(function(s){return [s.name,s.family,s.phone,s.city,s.since,s.status,s.editions,s.attended,s.rsvp,s.donated,s.gift||''];});
  exportXLS('subscribers_edition2.xls',['Name','Family','Phone','City','Since','Status','Editions','Attended','RSVP','Donated (INR)','Reward'],rows);
  toast('Subscribers exported to XLS');
}

/* ═══════════════ VIEW: REWARDS ═══════════════ */
function vRewards(){
  var rank=subscribers.slice().sort(function(a,b){return b.attended-a.attended;});
  var top=rank[0],least=rank[rank.length-1];var mx=rank[0].attended||1;
  var bars=rank.map(function(s,i){var w=Math.round(s.attended/mx*100);
    return '<div style="display:flex;align-items:center;gap:9px;margin-bottom:9px;cursor:pointer;" onclick="openSub('+s.id+')">'
      +'<div style="width:16px;font-family:var(--fm);font-weight:700;font-size:.72rem;color:'+(i===0?'var(--g4)':'var(--ink4)')+';">'+(i+1)+'</div>'
      +'<div class="av-sm" style="width:26px;height:26px;font-size:.54rem;background:'+colorFor(s.name)+'">'+inits(s.name)+'</div>'
      +'<div style="width:118px;font-size:.74rem;font-weight:600;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+s.name+'</div>'
      +'<div style="flex:1;"><div class="bar-track" style="height:13px;"><div class="bar-fill" style="width:'+w+'%;background:'+(i===0?'linear-gradient(90deg,#F5A623,#D97706)':(i===rank.length-1?'linear-gradient(90deg,#A89BC0,#6B5A8A)':'linear-gradient(90deg,#7C5CBF,#A07ED4)'))+';"></div></div></div>'
      +'<div class="mono" style="width:26px;text-align:right;font-weight:700;font-size:.78rem;color:var(--t7);">'+s.attended+'</div>'
      +(s.gift?'<span class="chip ca" title="'+s.gift+'" style="padding:3px 6px;">'+sIcon('gift')+'</span>':'<span style="width:22px;display:inline-block;"></span>')
    +'</div>';
  }).join('');
  return ''
  +'<div class="info-box" style="margin-bottom:18px;">'+sIcon('gift')+'<div>The community decides the gift — it can be <b>anything</b> (cash, books, a memento, a shawl…). Whoever attends the most events wins; ranking below is purely by attendance. Tap any devotee for their day-wise, event-wise record.</div></div>'
  +'<div class="grid g3" style="margin-bottom:18px;">'
    +'<div class="card" style="border-top:3px solid var(--g4);"><div class="eyebrow">Most attended</div><div style="display:flex;align-items:center;gap:10px;margin-top:8px;"><div class="av-sm" style="background:'+colorFor(top.name)+'">'+inits(top.name)+'</div><div><div style="font-weight:800;font-family:var(--fd);">'+top.name+'</div><div class="mono" style="font-size:.66rem;color:var(--g5);">'+top.attended+' events · '+top.family+'</div></div></div></div>'
    +'<div class="card"><div class="eyebrow">Devotees ranked</div><div class="mono" style="font-size:1.8rem;font-weight:700;color:var(--t7);margin-top:6px;line-height:1;">'+rank.length+'</div><div style="font-size:.64rem;color:var(--ink3);margin-top:3px;">most → least by attendance</div></div>'
    +'<div class="card" style="border-top:3px solid var(--ink4);"><div class="eyebrow">Least attended</div><div style="display:flex;align-items:center;gap:10px;margin-top:8px;"><div class="av-sm" style="background:'+colorFor(least.name)+'">'+inits(least.name)+'</div><div><div style="font-weight:800;font-family:var(--fd);">'+least.name+'</div><div class="mono" style="font-size:.66rem;color:var(--ink4);">'+least.attended+' events · '+least.family+'</div></div></div></div>'
  +'</div>'
  +'<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(330px,1fr));gap:16px;align-items:start;">'
    +'<div class="card"><div class="card-h"><div class="ttl">'+sIcon('chart')+'Attendance ranking</div><span class="chip ca">most → least</span></div>'+bars+'</div>'
    +'<div class="card" style="padding:0;overflow:hidden;"><div class="card-h" style="padding:16px;margin:0;"><div class="ttl">'+sIcon('award')+'Assign gifts</div></div>'
      +'<div style="overflow-x:auto;"><table style="min-width:420px;"><thead><tr><th>#</th><th>Devotee</th><th>Events</th><th>Gift</th><th></th></tr></thead><tbody>'
      +rank.map(function(s,i){return '<tr><td class="mono" style="color:var(--ink4);font-weight:700;">'+(i+1)+'</td>'
        +'<td onclick="openSub('+s.id+')"><div class="u-cell"><div class="av-sm" style="background:'+colorFor(s.name)+'">'+inits(s.name)+'</div><div><div class="nm">'+s.name+'</div><div class="sb">tap for day-wise detail</div></div></div></td>'
        +'<td class="mono" style="font-weight:700;color:var(--t7);">'+s.attended+'</td>'
        +'<td>'+(s.gift?'<span class="chip ca">'+sIcon('gift')+s.gift+'</span>':'<span style="color:var(--ink4);font-size:.72rem;">—</span>')+'</td>'
        +'<td style="text-align:right;"><button class="btn btn-s btn-sm" onclick="giftModal('+s.id+')" style="white-space:nowrap;">'+sIcon('gift')+(s.gift?'Change':'Give gift')+'</button></td></tr>';}).join('')
      +'</tbody></table></div></div>'
  +'</div>';
}
function giftModal(id){var s=subscribers.filter(function(x){return x.id===id;})[0];
  openModal('<div class="modal"><div class="modal-h"><div class="ttl">Give gift</div><div class="x" onclick="closeModal()">'+sIcon('x')+'</div></div>'
    +'<div class="modal-b"><div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;"><div class="av-sm" style="width:42px;height:42px;background:'+colorFor(s.name)+'">'+inits(s.name)+'</div><div><div style="font-weight:700;">'+s.name+'</div><div class="mono" style="font-size:.64rem;color:var(--ink3);">'+s.attended+' events attended · '+s.family+' family</div></div></div>'
    +'<label class="flbl">Gift (community decides)</label><input id="gift-name" value="'+(s.gift||'')+'" placeholder="e.g. Silver coin, Books set, ₹5,000 cash"/>'
    +'<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:10px;">'+['Gold memento','Silver coin','Books set','Shawl & shriphal','₹5,000 cash'].map(function(g){return '<span class="chip cn" onclick="document.getElementById(\'gift-name\').value=\''+g+'\'" style="cursor:pointer;padding:6px 11px;">'+g+'</span>';}).join('')+'</div>'
    +'<div class="hint" style="margin-top:10px;">Saved to the subscriber\u2019s profile as their reward.</div></div>'
    +'<div class="modal-f">'+(s.gift?'<button class="btn btn-ghost" style="color:var(--er);" onclick="clearGift('+id+')">Remove gift</button>':'')+'<button class="btn btn-gold" onclick="saveGift('+id+')">'+sIcon('gift')+'Save gift</button></div></div>');
}
function saveGift(id){var s=subscribers.filter(function(x){return x.id===id;})[0];var g=(document.getElementById('gift-name').value||'').trim();if(!g){toast('Enter a gift');return;}s.gift=g;closeModal();if(current==='rewards')nav('rewards');toast('Gift “'+g+'” given to '+s.name+' 🎁');}
function clearGift(id){var s=subscribers.filter(function(x){return x.id===id;})[0];s.gift=null;closeModal();if(current==='rewards')nav('rewards');toast('Gift removed');}
/*__MORE__*/

/* ═══════════════ VIEW: REMINDERS ═══════════════ */
function vReminders(){
  var kindMeta={reminder:{i:'clock',c:'var(--in)',bg:'var(--in1)',l:'Reminder'},postponed:{i:'refresh',c:'var(--g5)',bg:'var(--g1)',l:'Postponed'},cancelled:{i:'ban',c:'var(--er)',bg:'var(--er1)',l:'Cancelled'},new:{i:'plus',c:'#16A34A',bg:'var(--ok1)',l:'New programme'}};
  return ''
  +'<div class="grid" style="grid-template-columns:1fr 1.6fr;align-items:start;">'
  +'<div style="display:flex;flex-direction:column;gap:16px;">'
    +'<div class="card"><div class="card-h"><div class="ttl">'+sIcon('send')+'Broadcast</div></div>'
      +'<label class="flbl">About event <span style="font-weight:400;text-transform:none;color:var(--ink4);">(optional)</span></label>'
      +'<select id="bc-day" onchange="fillBcEvents()"><option value="">General announcement</option>'+upcomingDaysWithEvents().map(function(d){return '<option value="'+d.iso+'">'+d.d+' '+MONTHS[d.m]+' '+d.y+' · Day '+d.idx+(d.iso===todayIso()?' (Today)':'')+'</option>';}).join('')+'</select>'
      +'<select id="bc-ev" style="margin-top:8px;display:none;"></select>'
      +'<label class="flbl" style="margin-top:12px;">Send to</label><select id="bc-aud"><option>All subscribers (1,248)</option><option>This event\u2019s RSVPs</option><option>Today\u2019s attendees</option><option>Donors only</option></select>'
      +'<label class="flbl" style="margin-top:12px;">Message</label><textarea id="bc-msg" rows="3" placeholder="e.g. Tonight\u2019s Aarti shifts to 7 PM. Please plan accordingly."></textarea>'
      +'<label class="flbl" style="margin-top:12px;">Channels</label>'
      +'<div style="display:flex;gap:14px;margin:6px 0 14px;"><label style="display:flex;align-items:center;gap:8px;font-size:.78rem;color:var(--ink2);cursor:pointer;"><span class="tg on" id="bc-app" onclick="this.classList.toggle(\'on\')"><i></i></span>In-app</label><label style="display:flex;align-items:center;gap:8px;font-size:.78rem;color:var(--ink2);cursor:pointer;"><span class="tg on" id="bc-wa" onclick="this.classList.toggle(\'on\')"><i></i></span>WhatsApp</label></div>'
      +'<button class="btn btn-p btn-full" onclick="sendBroadcast()">'+sIcon('send')+'Send broadcast</button>'
    +'</div>'
    +'<div class="card"><div class="card-h"><div class="ttl">'+sIcon('bell')+'Reminder automation</div><button class="btn btn-s btn-sm" onclick="addRemAutoModal()">'+sIcon('plus')+'Add</button></div>'
      +'<div class="info-box" style="margin-bottom:12px;">'+sIcon('info')+'<div>These run automatically for <b>every event</b> and reach all subscribers on the chosen channels. Toggle any rule on or off — this is the app\u2019s default reminder set.</div></div>'
      +'<div id="remAutoList"></div>'
    +'</div>'
  +'</div>'
  +'<div class="card" style="padding:0;overflow:hidden;"><div class="card-h" style="padding:16px;margin:0;"><div class="ttl">'+sIcon('clock')+'Dispatch log</div><span class="chip cg">Auto + manual</span></div>'
    +'<div id="remLog">'+reminders.map(function(r){var k=kindMeta[r.kind];return '<div style="display:flex;gap:13px;align-items:flex-start;padding:14px 16px;border-bottom:1px solid var(--bd);">'
      +'<div style="width:36px;height:36px;border-radius:10px;background:'+k.bg+';color:'+k.c+';display:flex;align-items:center;justify-content:center;flex-shrink:0;">'+sIcon(k.i)+'</div>'
      +'<div style="flex:1;min-width:0;"><div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;"><span style="font-size:.84rem;font-weight:700;color:var(--ink);">'+r.fn+'</span><span class="chip '+(r.kind==='cancelled'?'ce':r.kind==='postponed'?'ca':r.kind==='new'?'cg':'ci')+'">'+k.l+'</span></div>'
        +'<div style="font-size:.7rem;color:var(--ink3);margin-top:2px;">'+r.msg+'</div>'
        +'<div style="display:flex;align-items:center;gap:10px;margin-top:7px;">'+r.ch.map(function(c){return '<span style="display:inline-flex;align-items:center;gap:4px;font-size:.6rem;font-weight:700;color:'+(c==='wa'?'#16A34A':'var(--t7)')+';">'+sIcon(c==='wa'?'wa':'bell')+(c==='wa'?'WhatsApp':'In-app')+'</span>';}).join('')
        +'<span style="font-size:.6rem;color:var(--ink4);">· reached '+r.reach.toLocaleString('en-IN')+'</span></div></div>'
      +'<div style="text-align:right;flex-shrink:0;"><span class="chip '+(r.status==='sent'?'cg':'ci')+'">'+r.status+'</span><div style="font-size:.58rem;color:var(--ink4);margin-top:5px;">'+r.when+'</div></div></div>';}).join('')+'</div>'
  +'</div></div>';
}

function upcomingDaysWithEvents(){return editionDays().filter(function(d){return new Date(d.y,d.m,d.d)>=new Date(TODAY.y,TODAY.m,TODAY.d)&&fnsOn(d.iso).some(function(f){return f.status!=='cancelled'&&f.status!=='ended';});});}
function dayEvents(isoStr){return fnsOn(isoStr).filter(function(f){return f.status!=='cancelled'&&f.status!=='ended';}).slice().sort(function(a,b){return t24(a.time)-t24(b.time);});}
function fillBcEvents(){
  var day=document.getElementById('bc-day').value;var ev=document.getElementById('bc-ev');if(!ev)return;
  if(!day){ev.style.display='none';ev.innerHTML='';return;}
  ev.style.display='block';
  ev.innerHTML='<option value="day:'+day+'">Whole day (all events)</option>'+dayEvents(day).map(function(f){return '<option value="'+f.id+'">'+f.name+' · '+f.time+'</option>';}).join('');
}
function fillRqEvents(){
  var day=document.getElementById('rq-day').value;var ev=document.getElementById('rq-ev');if(!ev)return;
  if(day==='all'){ev.style.display='none';ev.innerHTML='';renderRqPending();return;}
  ev.style.display='block';
  ev.innerHTML='<option value="day:'+day+'">All events on this day</option>'+dayEvents(day).map(function(f){return '<option value="'+f.id+'">'+f.name+' · '+f.time+'</option>';}).join('');
  renderRqPending();
}
function setRsvpView(v){rsvpView=v;rsvpOpen=null;var a=document.getElementById('rsvpSegEvent'),b=document.getElementById('rsvpSegDay');if(a)a.classList.toggle('on',v==='event');if(b)b.classList.toggle('on',v==='day');renderRsvpBody();}
function sendBroadcast(){
  var ev=document.getElementById('bc-ev');var evVal=(ev&&ev.style.display!=='none')?ev.value:'';
  var msg=(document.getElementById('bc-msg').value||'').trim();
  var app=document.getElementById('bc-app').classList.contains('on');
  var wa=document.getElementById('bc-wa').classList.contains('on');
  if(!app&&!wa){toast('Pick at least one channel');return;}
  if(!msg){toast('Type a message first');return;}
  var fnName='General announcement';
  if(evVal){if(evVal.indexOf('day:')===0){var p=evVal.slice(4).split('-');fnName='All events · '+(+p[2])+' '+MONTHS[+p[1]-1];}else{var x=findFn(+evVal);if(x)fnName=x.f.name;}}
  var ch=[];if(app)ch.push('app');if(wa)ch.push('wa');
  reminders.unshift({id:Date.now(),kind:'reminder',fn:fnName,when:'Just now',msg:msg,ch:ch,reach:1248,status:'sent'});
  if(current==='reminders')nav('reminders');
  toast('Broadcast sent to 1,248 · '+(app&&wa?'app + WhatsApp':wa?'WhatsApp':'app'),wa);
}
function renderRemAuto(){
  var box=document.getElementById('remAutoList');if(!box)return;
  box.innerHTML=reminderAutomation.map(function(r){
    return '<div style="display:flex;align-items:center;gap:11px;padding:11px 0;border-bottom:1px solid var(--bd);">'
      +'<span class="tg '+(r.on?'on':'')+'" onclick="toggleRemAuto('+r.id+')"><i></i></span>'
      +'<div style="flex:1;min-width:0;"><div style="font-size:.8rem;font-weight:700;color:'+(r.on?'var(--ink)':'var(--ink4)')+';">'+r.label+'</div>'
        +'<div style="display:flex;gap:6px;margin-top:6px;">'
          +'<span class="chip '+(r.app?'cp':'cn')+'" onclick="toggleRemCh('+r.id+',\'app\')" style="cursor:pointer;">'+sIcon('bell')+'App</span>'
          +'<span class="chip '+(r.wa?'cg':'cn')+'" onclick="toggleRemCh('+r.id+',\'wa\')" style="cursor:pointer;">'+sIcon('wa')+'WhatsApp</span>'
        +'</div></div>'
      +'<button class="btn btn-icon btn-s" title="Remove" onclick="removeRemAuto('+r.id+')">'+sIcon('trash')+'</button>'
    +'</div>';
  }).join('')+'<div class="hint" style="margin-top:10px;">'+reminderAutomation.filter(function(r){return r.on;}).length+' of '+reminderAutomation.length+' reminders active · auto-applied to every event.</div>';
}
function toggleRemAuto(id){var r=reminderAutomation.filter(function(x){return x.id===id;})[0];r.on=!r.on;renderRemAuto();toast('“'+r.label+'” '+(r.on?'enabled':'disabled')+' for all events');}
function toggleRemCh(id,ch){var r=reminderAutomation.filter(function(x){return x.id===id;})[0];if(r[ch]&&((ch==='app'&&!r.wa)||(ch==='wa'&&!r.app))){toast('At least one channel required');return;}r[ch]=!r[ch];renderRemAuto();}
function removeRemAuto(id){reminderAutomation=reminderAutomation.filter(function(x){return x.id!==id;});renderRemAuto();toast('Reminder rule removed');}
function addRemAutoModal(){
  var opts=[['2 days before','2d'],['1 day before','1d'],['3 hours before','3h'],['1 hour before','1h'],['30 minutes before','30m'],['15 minutes before','15m'],['5 minutes before','5m'],['At start time','0m']];
  openModal('<div class="modal"><div class="modal-h"><div class="ttl">Add reminder rule</div><div class="x" onclick="closeModal()">'+sIcon('x')+'</div></div>'
    +'<div class="modal-b"><label class="flbl">When to remind subscribers</label><select id="ra-when">'+opts.map(function(o){return '<option value="'+o[1]+'">'+o[0]+'</option>';}).join('')+'</select>'
    +'<label class="flbl" style="margin-top:12px;">Channels</label><div style="display:flex;gap:8px;" id="ra-ch"><span class="chip cp" data-ch="app" onclick="this.classList.toggle(\'cp\');this.classList.toggle(\'cn\')" style="cursor:pointer;padding:8px 13px;">'+sIcon('bell')+'App</span><span class="chip cg" data-ch="wa" onclick="this.classList.toggle(\'cg\');this.classList.toggle(\'cn\')" style="cursor:pointer;padding:8px 13px;">'+sIcon('wa')+'WhatsApp</span></div>'
    +'<div class="info-box" style="margin-top:14px;">'+sIcon('info')+'<div>This rule applies automatically to every event in the schedule.</div></div></div>'
    +'<div class="modal-f"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-p" onclick="saveRemAuto()">'+sIcon('check')+'Add rule</button></div></div>');
}
function saveRemAuto(){
  var sel=document.getElementById('ra-when');var label=sel.options[sel.selectedIndex].text;var off=sel.value;
  var app=false,wa=false;document.querySelectorAll('#ra-ch .chip').forEach(function(c){var ch=c.getAttribute('data-ch');var on=!c.classList.contains('cn');if(ch==='app')app=on;if(ch==='wa')wa=on;});
  if(!app&&!wa){toast('Pick at least one channel');return;}
  reminderAutomation.push({id:++_raId,label:label,off:off,app:app,wa:wa,on:true});
  closeModal();if(current==='reminders')nav('reminders');toast('Reminder rule added · applies to all events');
}

/* ═══════════════ VIEW: ACCESS MANAGER ═══════════════ */
function statusChipAccess(s){return {owner:'<span class="chip cp">Owner</span>',active:'<span class="chip cg">Active</span>',invited:'<span class="chip ci">Invited</span>',suspended:'<span class="chip ce">Suspended</span>'}[s]||'';}
function vAccess(){
  var active=team.filter(function(m){return m.status==='active'||m.status==='owner';}).length;
  var pending=team.filter(function(m){return m.status==='invited';}).length;
  return ''
  +'<div class="grid g4" style="margin-bottom:18px;">'
    +miniKpi('users','var(--t1)','var(--t7)',team.length,'Team members')
    +miniKpi('check','var(--ok1)','#16A34A',active,'Active')
    +miniKpi('bell','var(--g1)','var(--g5)',pending,'Pending invites')
    +miniKpi('grid','var(--in1)','var(--in)',moduleList.length,'Shareable modules')
  +'</div>'
  +'<div class="info-box" style="margin-bottom:16px;">'+sIcon('info')+'<div>Share your dashboard with community members. Invited members sign in with their <b>email + OTP</b> — no password. You control exactly which modules each person can <b>View</b> or <b>Manage</b>.</div></div>'
  +'<div class="card" style="margin-bottom:16px;"><div class="card-h"><div class="ttl">'+sIcon('star')+'Role presets</div></div>'
    +'<div style="display:flex;gap:8px;flex-wrap:wrap;">'+Object.keys(roleTemplates).filter(function(r){return r!=='Owner'&&r!=='Custom';}).map(function(r){var t=roleTemplates[r];var cnt=t.all?moduleList.length:Object.keys(t).length;return '<div style="border:1px solid var(--bd);border-radius:11px;padding:10px 13px;min-width:140px;"><div style="font-size:.8rem;font-weight:700;color:var(--ink);">'+r+'</div><div style="font-size:.62rem;color:var(--ink3);margin-top:2px;">'+(t.all?'Manage all modules':cnt+' modules')+'</div></div>';}).join('')+'</div>'
    +'<div class="hint" style="margin-top:10px;">Presets are a starting point — you can fine-tune each member\u2019s module access individually.</div>'
  +'</div>'
  +'<div class="card" style="padding:0;overflow:hidden;"><div class="card-h" style="padding:16px;margin:0;"><div class="ttl">'+sIcon('users')+'Team & access</div><button class="btn btn-p btn-sm" onclick="inviteModal()">'+sIcon('plus')+'Invite member</button></div>'
    +'<div style="overflow-x:auto;"><table style="min-width:560px;"><thead><tr><th>Member</th><th>Role</th><th>Modules</th><th>Status</th><th>Last active</th></tr></thead><tbody id="accessRows"></tbody></table></div>'
  +'</div>';
}
function renderAccessRows(){
  var box=document.getElementById('accessRows');if(!box)return;
  box.innerHTML=team.map(function(m){var owner=m.status==='owner';
    return '<tr onclick="openMember('+m.id+')" style="'+(m.status==='suspended'?'opacity:.6;':'')+'">'
      +'<td><div class="u-cell"><div class="av-sm" style="background:'+colorFor(m.name)+'">'+inits(m.name)+'</div><div><div class="nm">'+m.name+(owner?' <span style="font-size:.6rem;color:var(--g5);font-weight:800;">★</span>':'')+'</div><div class="sb mono">'+m.email+'</div></div></div></td>'
      +'<td><span class="chip cp">'+m.role+'</span></td>'
      +'<td><span class="mono" style="font-weight:700;color:var(--t7);">'+modulesCount(m)+'</span><span style="font-size:.6rem;color:var(--ink4);"> / '+moduleList.length+'</span></td>'
      +'<td>'+statusChipAccess(m.status)+'</td>'
      +'<td style="color:var(--ink4);font-size:.72rem;">'+m.last+'</td></tr>';
  }).join('');
}

var apMember=null,apPerms={},apRole='';
function permSeg(modId,lvl){return '<div class="seg" style="flex-shrink:0;">'+['none','view','manage'].map(function(o){return '<div class="s'+(lvl===o?' on':'')+'" style="padding:5px 11px;font-size:.64rem;" onclick="setPerm(\''+modId+'\',\''+o+'\')">'+({none:'None',view:'View',manage:'Manage'}[o])+'</div>';}).join('')+'</div>';}
function renderPermMatrix(){
  var box=document.getElementById('permMatrix');if(!box)return;
  box.innerHTML=moduleList.map(function(md){var lvl=apPerms[md.id]||'none';
    return '<div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--bd);">'
      +'<div style="width:30px;height:30px;border-radius:8px;background:'+(lvl==='none'?'var(--cream2)':'var(--t1)')+';color:'+(lvl==='none'?'var(--ink4)':'var(--t7)')+';display:flex;align-items:center;justify-content:center;flex-shrink:0;">'+sIcon(md.ic)+'</div>'
      +'<div style="flex:1;min-width:0;font-size:.78rem;font-weight:600;color:'+(lvl==='none'?'var(--ink4)':'var(--ink)')+';">'+md.label+'</div>'
      +permSeg(md.id,lvl)+'</div>';
  }).join('');
  var el=document.getElementById('permCount');if(el)el.textContent=Object.keys(apPerms).filter(function(k){return apPerms[k]!=='none';}).length;
}
function setPerm(mod,lvl){apPerms[mod]=lvl;apRole='Custom';var rs=document.getElementById('mRole');if(rs)rs.value='Custom';renderPermMatrix();}
function openMember(id){
  var m=team.filter(function(x){return x.id===id;})[0];if(!m)return;
  apMember=id;apRole=m.role;apPerms={};moduleList.forEach(function(md){apPerms[md.id]=permLevel(m,md.id);});
  var owner=m.status==='owner';
  var d=document.getElementById('drawerOv');
  d.innerHTML='<div class="drawer">'
    +'<div style="background:linear-gradient(150deg,#1A0E3D,#3D2582);padding:22px 20px;color:#fff;position:relative;">'
      +'<div style="position:absolute;top:14px;right:14px;width:32px;height:32px;border-radius:9px;background:rgba(255,255,255,.14);display:flex;align-items:center;justify-content:center;cursor:pointer;" onclick="closeDrawer()">'+sIcon('x')+'</div>'
      +'<div style="display:flex;align-items:center;gap:13px;"><div class="av-sm" style="width:54px;height:54px;font-size:1.05rem;background:'+colorFor(m.name)+';border:2px solid rgba(255,255,255,.25);">'+inits(m.name)+'</div>'
        +'<div style="min-width:0;"><div class="disp" style="font-size:1.25rem;font-weight:800;">'+m.name+'</div><div class="mono" style="font-size:.7rem;color:rgba(255,255,255,.6);">'+m.email+'</div>'
        +'<div style="margin-top:7px;">'+statusChipAccess(m.status)+'</div></div></div>'
    +'</div>'
    +'<div style="padding:18px 20px;">'
    +(owner
      ?'<div class="info-box">'+sIcon('info')+'<div><b>Owner (you)</b> has full Manage access to every module. The owner account can\u2019t be restricted or removed.</div></div>'
       +'<div style="margin-top:16px;">'+moduleList.map(function(md){return '<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--bd);"><div style="width:28px;height:28px;border-radius:8px;background:var(--t1);color:var(--t7);display:flex;align-items:center;justify-content:center;">'+sIcon(md.ic)+'</div><div style="flex:1;font-size:.76rem;font-weight:600;color:var(--ink);">'+md.label+'</div><span class="chip cg">Manage</span></div>';}).join('')+'</div>'
      :'<label class="flbl">Role preset</label><select id="mRole" onchange="apRole=this.value;apPerms=applyRoleToPerms(this.value);renderPermMatrix()">'+Object.keys(roleTemplates).map(function(r){return '<option value="'+r+'"'+(r===apRole?' selected':'')+(r==='Owner'?' disabled':'')+'>'+r+'</option>';}).join('')+'</select>'
       +'<div style="display:flex;align-items:center;justify-content:space-between;margin:16px 0 8px;"><span class="eyebrow">Module access</span><span style="font-size:.66rem;color:var(--ink3);"><b class="mono" id="permCount">0</b> of '+moduleList.length+' enabled</span></div>'
       +'<div id="permMatrix"></div>'
       +'<div class="hint" style="margin-top:10px;">None = hidden · View = read-only · Manage = can edit. Changing any toggle sets the role to Custom.</div>'
       +'<div style="display:flex;gap:9px;margin-top:18px;">'
         +(m.status==='invited'?'<button class="btn btn-s btn-full btn-sm" onclick="resendInvite('+m.id+')">'+sIcon('send')+'Resend invite</button>':'')
         +(m.status==='suspended'?'<button class="btn btn-ok btn-full btn-sm" onclick="memberSuspend('+m.id+')">'+sIcon('check')+'Reactivate</button>':'<button class="btn btn-s btn-full btn-sm" onclick="memberSuspend('+m.id+')" style="color:var(--g5);">'+sIcon('ban')+'Suspend</button>')
       +'</div>'
       +'<div style="display:flex;gap:9px;margin-top:9px;"><button class="btn btn-er btn-full btn-sm" onclick="memberRevoke('+m.id+')">'+sIcon('trash')+'Revoke access</button><button class="btn btn-p btn-full btn-sm" onclick="saveMember()">'+sIcon('check')+'Save access</button></div>')
    +'</div></div>';
  d.classList.add('on');
  if(!owner)renderPermMatrix();
}
function saveMember(){var m=team.filter(function(x){return x.id===apMember;})[0];if(!m)return;m.perms=Object.assign({},apPerms);m.role=apRole;closeDrawer();if(current==='access')nav('access');toast('Access updated for '+m.name);}
function memberSuspend(id){var m=team.filter(function(x){return x.id===id;})[0];m.status=m.status==='suspended'?'active':'suspended';closeDrawer();if(current==='access')nav('access');toast(m.name+(m.status==='suspended'?' suspended':' reactivated'));}
function memberRevoke(id){var m=team.filter(function(x){return x.id===id;})[0];openConfirm('Revoke access for '+m.name+'?','They will lose all dashboard access immediately. You can re-invite them later.','Revoke access','btn-er',function(){team=team.filter(function(x){return x.id!==id;});closeDrawer();if(current==='access')nav('access');toast('Access revoked for '+m.name);});}
function resendInvite(id){var m=team.filter(function(x){return x.id===id;})[0];toast('Invite re-sent to '+m.email+' · email + OTP');}
function inviteModal(){
  openModal('<div class="modal"><div class="modal-h"><div class="ttl">Invite member</div><div class="x" onclick="closeModal()">'+sIcon('x')+'</div></div>'
    +'<div class="modal-b">'
      +'<div class="grid g2" style="gap:12px;"><div><label class="flbl">Name</label><input id="inv-name" placeholder="e.g. Suresh Jain"/></div><div><label class="flbl">Email <span class="req">*</span></label><input id="inv-email" placeholder="name@email.com"/></div></div>'
      +'<label class="flbl" style="margin-top:12px;">Role preset</label><select id="inv-role">'+Object.keys(roleTemplates).filter(function(r){return r!=='Owner';}).map(function(r){return '<option value="'+r+'"'+(r==='Viewer'?' selected':'')+'>'+r+'</option>';}).join('')+'</select>'
      +'<div class="info-box" style="margin-top:14px;">'+sIcon('info')+'<div>An invite is emailed to them. They sign in with <b>email + OTP</b> (no password) and immediately get the modules you granted. You can fine-tune their access any time after they join.</div></div>'
    +'</div>'
    +'<div class="modal-f"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-p" onclick="sendInvite()">'+sIcon('send')+'Send invite</button></div></div>');
}
function sendInvite(){
  var email=(document.getElementById('inv-email').value||'').trim();
  if(!email||email.indexOf('@')<1){toast('Enter a valid email');return;}
  var name=(document.getElementById('inv-name').value||'').trim()||email.split('@')[0];
  var role=document.getElementById('inv-role').value;
  team.push({id:++_tmId,name:name,email:email,role:role,status:'invited',last:'Invite pending'});
  closeModal();if(current==='access')nav('access');toast('Invite sent to '+email+' · they log in with email + OTP');
}

/* ═══════════════ VIEW: SETTINGS ═══════════════ */
function vSettings(){
  return ''
  +'<div class="grid" style="grid-template-columns:1fr 1fr;align-items:start;">'
  +'<div class="card"><div class="card-h"><div class="ttl">'+sIcon('user')+'Host account</div></div>'
    +'<div style="display:flex;align-items:center;gap:13px;margin-bottom:16px;"><div class="av-sm" style="width:54px;height:54px;font-size:1.05rem;background:linear-gradient(135deg,#5B3E9E,#2D1B69);">MR</div><div><div style="font-weight:800;font-family:var(--fd);font-size:1.05rem;">Mahesh Ranka</div><div class="mono" style="font-size:.7rem;color:var(--ink3);">+91 98220 11733</div></div></div>'
    +fld('Full name','Mahesh Ranka')+'<div style="height:12px;"></div>'+fld('Role','Community Host')
    +'<div class="info-box" style="margin-top:14px;">'+sIcon('info')+'<div>Host access for <b>Jain Community Sammelan</b> was approved by the Invite Karoo Super Admin on 18 Jan 2026.</div></div>'
  +'</div>'
  +'<div style="display:flex;flex-direction:column;gap:16px;">'
    +'<div class="card"><div class="card-h"><div class="ttl">'+sIcon('bell')+'Notifications</div></div>'
      +['New subscriber alerts','Daily attendance summary','Donation receipts','WhatsApp delivery reports'].map(function(o,i){return '<div style="display:flex;align-items:center;justify-content:space-between;padding:9px 0;border-bottom:1px solid var(--bd);"><span style="font-size:.78rem;color:var(--ink2);">'+o+'</span><span class="tg '+(i<3?'on':'')+'" onclick="this.classList.toggle(\'on\')"><i></i></span></div>';}).join('')
    +'</div>'
    +'<div class="card"><div class="card-h"><div class="ttl">'+sIcon('gear')+'Preferences</div></div>'
      +'<label class="flbl">Language</label><select><option>English</option><option>हिन्दी</option><option>தமிழ்</option></select>'
      +'<label class="flbl" style="margin-top:12px;">Time zone</label><select><option>IST (UTC+5:30)</option></select>'
      +'<button class="btn btn-s btn-full" style="margin-top:16px;color:var(--er);border-color:rgba(220,38,38,.3);" onclick="logout()">'+sIcon('logout')+'Sign out</button>'
    +'</div>'
  +'</div></div>';
}
function logout(){document.getElementById('app').classList.add('hide');document.getElementById('login').classList.remove('hide');}

/* ═══════════════ MODALS ═══════════════ */
function openModal(html){var o=document.getElementById('ov');o.innerHTML=html;o.classList.add('on');}
function closeModal(){document.getElementById('ov').classList.remove('on');}
document.getElementById('ov').addEventListener('click',function(e){if(e.target===this)closeModal();});
document.getElementById('drawerOv').addEventListener('click',function(e){if(e.target===this)closeDrawer();});

var editingFn=null,editingIso=null;
function openFnModal(id,isoStr){
  editingFn=null;editingIso=isoStr||schedSel||todayIso();
  var f={name:'',time:'',dur:'',venue:community.venue,status:'scheduled',rem:['1d','1h'],guru:0,desc:'',youtube:'',helpline:''};
  if(id){var x=findFn(id);if(x){f=x.f;editingFn=id;editingIso=x.iso;}}
  var rems=['1d','1h','30m','15m'];
  var days=editionDays();
  openModal('<div class="modal wide"><div class="modal-h"><div class="ttl">'+(editingFn?'Edit event':'Add event')+'</div><div class="x" onclick="closeModal()">'+sIcon('x')+'</div></div>'
    +'<div class="modal-b">'
      +'<label class="flbl">Event name <span class="req">*</span></label><input id="m-name" value="'+(f.name||'')+'" placeholder="e.g. Morning Pravachan"/>'
      +'<div class="grid g3" style="gap:12px;margin-top:12px;"><div><label class="flbl">Date</label><input id="m-date" type="date" value="'+editingIso+'"/></div><div><label class="flbl">Time</label><input id="m-time" value="'+(f.time||'7:00 AM')+'" placeholder="7:00 AM"/></div><div><label class="flbl">Duration</label><input id="m-dur" value="'+(f.dur||'2 hr')+'"/></div></div>'
      +'<label class="flbl" style="margin-top:12px;">Venue / hall</label><input id="m-venue" value="'+(f.venue||'')+'"/>'
      +'<label class="flbl" style="margin-top:12px;">Description</label><textarea id="m-desc" rows="2" placeholder="What happens in this event…">'+(f.desc||'')+'</textarea>'
      +'<div class="grid g2" style="gap:12px;margin-top:12px;">'
        +'<div><label class="flbl">Guru / Speaker</label><input id="m-guru" value="'+(f.guru?community.guru:'')+'" placeholder="Leave blank if none"/></div>'
        +'<div><label class="flbl">Helpline number</label><input id="m-help" class="mono" value="'+(f.helpline||community.helpline)+'"/></div>'
      +'</div>'
      +'<label class="flbl" style="margin-top:12px;">YouTube live link</label><div class="ip-wrap" style="position:relative;"><input id="m-yt" value="'+(f.youtube||'')+'" placeholder="https://youtube.com/@…/live"/></div>'
      +'<label class="flbl" style="margin-top:12px;">Reminders (app + WhatsApp)</label>'
      +'<div style="display:flex;gap:7px;flex-wrap:wrap;" id="m-rem">'+rems.map(function(r){var on=(f.rem||[]).indexOf(r)>-1;return '<div class="chip '+(on?'cp':'cn')+'" data-r="'+r+'" onclick="this.classList.toggle(\'cp\');this.classList.toggle(\'cn\')" style="cursor:pointer;padding:7px 13px;font-size:.7rem;">'+remLabel(r)+' before</div>';}).join('')+'</div>'
      +(editingFn?'':'<label class="flbl" style="margin-top:14px;">Also repeat on these days <span style="font-weight:400;text-transform:none;color:var(--ink4);">(optional — smart copy)</span></label>'
        +'<div style="display:flex;gap:6px;flex-wrap:wrap;" id="m-rep">'+days.map(function(dy){return '<div class="chip cn" data-iso="'+dy.iso+'" onclick="this.classList.toggle(\'cp\');this.classList.toggle(\'cn\')" style="cursor:pointer;padding:6px 11px;font-size:.66rem;">'+dy.d+' '+MONTHS[dy.m]+'</div>';}).join('')+'</div>')
      +'<div class="info-box" style="margin-top:14px;">'+sIcon('bell')+'<div>New events are pushed instantly to all subscribers and <b>auto-added to their app calendar</b>, with reminders on app + WhatsApp. Any later change re-alerts them automatically.</div></div>'
    +'</div>'
    +'<div class="modal-f"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-p" onclick="saveFn()">'+sIcon('check')+(editingFn?'Save changes':'Add event')+'</button></div></div>');
}
function saveFn(){
  var name=document.getElementById('m-name').value.trim();if(!name){toast('Enter an event name');return;}
  var dt=document.getElementById('m-date').value||editingIso;
  var rem=[];document.querySelectorAll('#m-rem .chip').forEach(function(c){if(c.classList.contains('cp'))rem.push(c.getAttribute('data-r'));});
  var obj={name:name,time:document.getElementById('m-time').value||'9:00 AM',dur:document.getElementById('m-dur').value,venue:document.getElementById('m-venue').value,rem:rem,
    desc:document.getElementById('m-desc').value,guru:document.getElementById('m-guru').value?1:0,helpline:document.getElementById('m-help').value,youtube:document.getElementById('m-yt').value};
  if(editingFn){var x=findFn(editingFn);if(x.iso!==dt){programmes[x.iso]=programmes[x.iso].filter(function(f){return f.id!==editingFn;});if(!programmes[dt])programmes[dt]=[];programmes[dt].push(x.f);}for(var k in obj)x.f[k]=obj[k];toast('Event updated · subscribers re-notified',true);}
  else{
    var targets=[dt];document.querySelectorAll('#m-rep .chip.cp').forEach(function(c){var iv=c.getAttribute('data-iso');if(targets.indexOf(iv)===-1)targets.push(iv);});
    targets.forEach(function(tIso){var o={};for(var k in obj)o[k]=obj[k];o.id=++_fnId;o.status='scheduled';if(!programmes[tIso])programmes[tIso]=[];programmes[tIso].push(o);});
    pushReminder('new',name,'New event added on '+targets.length+' day(s) · auto-added to calendar',true);
    toast(targets.length>1?('Event added to '+targets.length+' days · subscribers notified + calendars updated'):'Event created · pushed to 1,248 subscribers + added to their calendar',true);
  }
  closeModal();schedSel=dt;if(current!=='schedule')nav('schedule');else afterSchedule();
}
function openConfirm(title,body,btnLabel,btnCls,onYes){
  window._confYes=onYes;
  openModal('<div class="modal" style="max-width:420px;"><div class="modal-h"><div class="ttl">'+title+'</div><div class="x" onclick="closeModal()">'+sIcon('x')+'</div></div>'
    +'<div class="modal-b"><div style="font-size:.84rem;color:var(--ink2);line-height:1.6;">'+body+'</div></div>'
    +'<div class="modal-f"><button class="btn btn-ghost" onclick="closeModal()">Keep it</button><button class="btn '+btnCls+'" onclick="(window._confYes&&window._confYes());closeModal()">'+btnLabel+'</button></div></div>');
}
var donPickId=null;
function addDonationModal(){
  donPickId=null;
  openModal('<div class="modal"><div class="modal-h"><div class="ttl">Record donation</div><div class="x" onclick="closeModal()">'+sIcon('x')+'</div></div>'
    +'<div class="modal-b">'
      +'<label class="flbl">Subscriber</label>'
      +'<div style="position:relative;"><svg viewBox="0 0 24 24" fill="none" stroke="var(--ink4)" stroke-width="2" style="width:16px;height:16px;position:absolute;left:12px;top:14px;">'+IC.search+'</svg><input id="d-search" placeholder="Search name or number…" style="padding-left:38px;" oninput="filterDonSubs()"/></div>'
      +'<div id="d-list" style="max-height:172px;overflow-y:auto;border:1px solid var(--bd);border-radius:11px;margin-top:8px;"></div>'
      +'<div class="grid g2" style="gap:12px;margin-top:14px;"><div><label class="flbl">Amount (₹)</label><input id="d-amt" class="mono" placeholder="11000"/></div><div><label class="flbl">Date received</label><input id="d-date" type="date" value="2026-05-22"/></div></div>'
      +'<div class="grid g2" style="gap:12px;margin-top:12px;"><div><label class="flbl">Mode</label><select id="d-mode"><option>UPI</option><option>Cash</option><option>Bank</option><option>Cheque</option></select></div><div><label class="flbl">Purpose</label><input id="d-purp" placeholder="e.g. Annadanam"/></div></div>'
      +'<label class="flbl" style="margin-top:12px;">Donor email <span style="font-weight:400;text-transform:none;color:var(--ink4);">(receipt will be emailed here)</span></label><input id="d-email" placeholder="name@email.com"/>'
    +'</div>'
    +'<div class="modal-f"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-p" onclick="saveDonation()">'+sIcon('check')+'Record</button></div></div>');
  filterDonSubs();
}
function filterDonSubs(){
  var box=document.getElementById('d-list');if(!box)return;
  var inp=document.getElementById('d-search');var q=(inp&&inp.value||'').toLowerCase();var qd=q.replace(/\D/g,'');
  var rows=subscribers.filter(function(s){if(!q)return true;if((s.name+' '+s.family).toLowerCase().indexOf(q)>-1)return true;if(qd&&s.phone.replace(/\D/g,'').indexOf(qd)>-1)return true;return false;});
  box.innerHTML=rows.length?rows.map(function(s){var on=donPickId===s.id;return '<div onclick="pickDonSub('+s.id+')" style="display:flex;align-items:center;gap:10px;padding:9px 11px;cursor:pointer;border-bottom:1px solid var(--bd);background:'+(on?'var(--t0)':'#fff')+';">'
    +'<div class="av-sm" style="width:30px;height:30px;font-size:.6rem;background:'+colorFor(s.name)+'">'+inits(s.name)+'</div>'
    +'<div style="flex:1;min-width:0;"><div style="font-size:.78rem;font-weight:600;color:var(--ink);">'+s.name+'</div><div class="mono" style="font-size:.6rem;color:var(--ink4);">'+s.phone+' · '+s.family+'</div></div>'
    +(on?'<span style="color:var(--t6);">'+sIcon('check')+'</span>':'')+'</div>';}).join(''):'<div style="padding:14px;font-size:.74rem;color:var(--ink4);text-align:center;">No subscriber found</div>';
}
function pickDonSub(id){donPickId=id;var s=subscribers.filter(function(x){return x.id===id;})[0];var inp=document.getElementById('d-search');if(inp)inp.value=s.name;filterDonSubs();}
function saveDonation(){
  if(!donPickId){toast('Select a subscriber first');return;}
  var amt=parseInt(document.getElementById('d-amt').value)||0;if(!amt){toast('Enter an amount');return;}
  var dval=document.getElementById('d-date').value;var dlabel=dval?fmtIsoDM(dval):'22 May 2026';
  var email=(document.getElementById('d-email').value||'').trim();
  var d={id:Date.now(),no:++_rcptSeq,sub:donPickId,amt:amt,date:dlabel,mode:document.getElementById('d-mode').value,purpose:document.getElementById('d-purp').value||'General',email:email};
  donations.unshift(d);
  var s=subscribers.filter(function(x){return x.id===donPickId;})[0];s.donated+=amt;
  closeModal();if(current==='donations')nav('donations');
  openReceipt(d.id,true);
}
function findDon(id){return donations.filter(function(d){return d.id===id;})[0];}
function receiptNo(d){return 'IK/2026/'+String(d.no).padStart(4,'0');}
function amtWords(n){if(n===0)return 'Zero';var a=['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'];var b=['','','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];function two(x){return x<20?a[x]:b[Math.floor(x/10)]+(x%10?' '+a[x%10]:'');}function three(x){return (x>=100?a[Math.floor(x/100)]+' Hundred'+(x%100?' ':''):'')+(x%100?two(x%100):'');}var out='';var cr=Math.floor(n/10000000);n%=10000000;var la=Math.floor(n/100000);n%=100000;var th=Math.floor(n/1000);n%=1000;if(cr)out+=three(cr)+' Crore ';if(la)out+=two(la)+' Lakh ';if(th)out+=two(th)+' Thousand ';if(n)out+=three(n);return out.trim();}
function openReceipt(id,justSent){
  var d=findDon(id);if(!d)return;var s=subscribers.filter(function(x){return x.id===d.sub;})[0];
  openModal('<div class="modal" style="max-width:460px;"><div class="modal-h"><div class="ttl">Donation receipt</div><div class="x" onclick="closeModal()">'+sIcon('x')+'</div></div>'
    +'<div class="modal-b">'
    +(justSent?'<div class="info-box" style="margin-bottom:14px;background:var(--ok1);border-color:rgba(22,163,74,.25);"><span style="color:#16A34A;">'+sIcon('check')+'</span><div style="color:#15803D;">Recorded! Receipt emailed'+(d.email?' to <b>'+d.email+'</b>':'')+' and a thank-you message sent on <b>WhatsApp</b> ('+s.phone+'). No app notification is sent.</div></div>':'')
    +'<div style="border:1px solid var(--bd);border-radius:14px;overflow:hidden;">'
      +'<div style="background:linear-gradient(135deg,#1A0E3D,#3D2582);color:#fff;padding:16px 18px;"><div style="font-family:var(--fd);font-weight:800;font-size:1.05rem;">'+community.name+'</div><div style="font-size:.62rem;color:rgba(255,255,255,.6);margin-top:2px;">Official Donation Receipt</div></div>'
      +'<div style="padding:16px 18px;">'
        +'<div style="display:flex;justify-content:space-between;font-size:.66rem;color:var(--ink4);margin-bottom:12px;"><span>Receipt No.<br><b class="mono" style="color:var(--ink);font-size:.78rem;">'+receiptNo(d)+'</b></span><span style="text-align:right;">Date<br><b style="color:var(--ink);font-size:.78rem;">'+d.date+'</b></span></div>'
        +receiptRow('Received with thanks from',s.name)
        +receiptRow('Contact',s.phone)
        +receiptRow('Purpose',d.purpose)
        +receiptRow('Payment mode',d.mode)
        +'<div style="background:var(--g1);border:1px solid rgba(245,166,35,.3);border-radius:11px;padding:12px 14px;margin-top:12px;"><div style="font-size:.62rem;color:var(--g5);font-weight:700;text-transform:uppercase;letter-spacing:.5px;">Amount received</div><div class="mono" style="font-size:1.5rem;font-weight:800;color:var(--g5);">'+money(d.amt)+'</div><div style="font-size:.64rem;color:var(--ink3);font-style:italic;">Rupees '+amtWords(d.amt)+' only</div></div>'
        +'<div style="font-size:.66rem;color:var(--ink3);margin-top:12px;line-height:1.6;">With heartfelt gratitude for your generous contribution to '+community.name+'. May your kindness be blessed. 🙏</div>'
        +'<div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:16px;"><div style="font-size:.58rem;color:var(--ink4);">Computer-generated receipt</div><div style="text-align:center;"><div style="border-top:1px solid var(--ink3);padding-top:3px;font-size:.6rem;color:var(--ink3);width:120px;">Authorised signatory</div></div></div>'
      +'</div>'
    +'</div></div>'
    +'<div class="modal-f" style="flex-wrap:wrap;gap:8px;"><button class="btn btn-s btn-sm" onclick="emailReceipt('+d.id+')">'+sIcon('send')+'Email receipt</button><button class="btn btn-s btn-sm" onclick="waThankYou('+d.id+')">'+sIcon('wa')+'WhatsApp thank-you</button><button class="btn btn-p btn-sm" onclick="printReceipt('+d.id+')">'+sIcon('layers')+'Print receipt</button></div></div>');
}
function receiptRow(k,v){return '<div style="display:flex;justify-content:space-between;gap:12px;padding:6px 0;border-bottom:1px dashed var(--bd);"><span style="font-size:.68rem;color:var(--ink4);">'+k+'</span><span style="font-size:.74rem;font-weight:600;color:var(--ink);text-align:right;">'+v+'</span></div>';}
function emailReceipt(id){var d=findDon(id);toast('Receipt '+receiptNo(d)+' emailed'+(d.email?' to '+d.email:' to donor'));}
function waThankYou(id){var d=findDon(id);var s=subscribers.filter(function(x){return x.id===d.sub;})[0];toast('Thank-you message sent to '+s.name+' on WhatsApp',true);}
function printReceipt(id){
  var d=findDon(id);if(!d)return;var s=subscribers.filter(function(x){return x.id===d.sub;})[0];
  document.getElementById('printArea').innerHTML='<div style="max-width:640px;margin:0 auto;padding:42px 40px;font-family:Sora,sans-serif;color:#1A1028;">'
    +'<div style="border:2px solid #3D2582;border-radius:18px;overflow:hidden;">'
    +'<div style="background:#3D2582;color:#fff;padding:20px 26px;text-align:center;"><div style="font-family:Fraunces,serif;font-size:1.5rem;font-weight:800;">'+community.name+'</div><div style="font-size:.72rem;letter-spacing:2px;text-transform:uppercase;margin-top:4px;opacity:.8;">Official Donation Receipt</div></div>'
    +'<div style="padding:26px;">'
      +'<div style="display:flex;justify-content:space-between;font-size:.8rem;margin-bottom:18px;"><span>Receipt No.: <b class="mono">'+receiptNo(d)+'</b></span><span>Date: <b>'+d.date+'</b></span></div>'
      +'<table style="width:100%;border-collapse:collapse;font-size:.86rem;">'
        +'<tr><td style="padding:8px 0;color:#6B5A8A;width:42%;">Received with thanks from</td><td style="padding:8px 0;font-weight:700;">'+s.name+'</td></tr>'
        +'<tr><td style="padding:8px 0;color:#6B5A8A;">Contact</td><td style="padding:8px 0;font-weight:700;">'+s.phone+'</td></tr>'
        +'<tr><td style="padding:8px 0;color:#6B5A8A;">Purpose</td><td style="padding:8px 0;font-weight:700;">'+d.purpose+'</td></tr>'
        +'<tr><td style="padding:8px 0;color:#6B5A8A;">Payment mode</td><td style="padding:8px 0;font-weight:700;">'+d.mode+'</td></tr>'
      +'</table>'
      +'<div style="border:2px solid #F5A623;border-radius:12px;padding:16px 18px;margin:18px 0;background:#FEF9EF;"><div style="font-size:.72rem;color:#B45309;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Amount received</div><div style="font-family:DM Mono,monospace;font-size:2rem;font-weight:800;color:#B45309;">'+money(d.amt)+'</div><div style="font-size:.82rem;font-style:italic;color:#6B5A8A;">Rupees '+amtWords(d.amt)+' only</div></div>'
      +'<div style="font-size:.84rem;color:#3D2D5C;line-height:1.7;">With heartfelt gratitude for your generous contribution to '+community.name+'. Your support sustains our community programmes. May your kindness be blessed.</div>'
      +'<div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:38px;"><div style="font-size:.7rem;color:#A89BC0;max-width:55%;">'+(community.venue||'')+'<br>'+(community.venueAddr||'')+'<br>Helpline: '+community.helpline+'</div><div style="text-align:center;"><div style="border-top:1.5px solid #1A1028;padding-top:4px;font-size:.74rem;width:160px;">Authorised signatory</div></div></div>'
      +'<div style="text-align:center;font-size:.64rem;color:#A89BC0;margin-top:22px;border-top:1px solid #eee;padding-top:12px;">This is a computer-generated receipt and does not require a physical signature. · Powered by Invite Karoo</div>'
    +'</div></div></div>';
  window.print();
}
function fmtIsoDM(v){var p=v.split('-');return (+p[2])+' '+MONTHS[+p[1]-1]+' '+p[0];}
function bulkDayModal(){
  var withFns=editionDays().filter(function(d){return fnsOn(d.iso).filter(function(f){return f.status!=='cancelled'&&f.status!=='ended';}).length;});
  var days=editionDays();
  openModal('<div class="modal"><div class="modal-h"><div class="ttl">Copy a full day</div><div class="x" onclick="closeModal()">'+sIcon('x')+'</div></div>'
    +'<div class="modal-b"><div class="hint" style="margin-bottom:12px;">Reuse a whole day\u2019s routine across other days instead of re-adding each event.</div>'
    +'<label class="flbl">Copy all events from</label><select id="bd-from">'+withFns.map(function(d){return '<option value="'+d.iso+'">Day '+d.idx+' · '+d.d+' '+MONTHS[d.m]+' ('+fnsOn(d.iso).filter(function(f){return f.status!=='cancelled'&&f.status!=='ended';}).length+' events)</option>';}).join('')+'</select>'
    +'<label class="flbl" style="margin-top:14px;">Paste onto these days</label>'
    +'<div style="display:flex;gap:6px;flex-wrap:wrap;" id="bd-to">'+days.map(function(dy){return '<div class="chip cn" data-iso="'+dy.iso+'" onclick="this.classList.toggle(\'cp\');this.classList.toggle(\'cn\')" style="cursor:pointer;padding:6px 11px;font-size:.66rem;">'+dy.d+' '+MONTHS[dy.m]+'</div>';}).join('')+'</div></div>'
    +'<div class="modal-f"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-p" onclick="doCopyDay()">'+sIcon('check')+'Copy day</button></div></div>');
}
function doCopyDay(){
  var from=document.getElementById('bd-from').value;var src=fnsOn(from).filter(function(f){return f.status!=='cancelled'&&f.status!=='ended';});
  var to=[];document.querySelectorAll('#bd-to .chip.cp').forEach(function(c){var iv=c.getAttribute('data-iso');if(iv!==from)to.push(iv);});
  if(!to.length){toast('Pick at least one day to paste onto');return;}
  to.forEach(function(tIso){src.forEach(function(f){var o={};for(var k in f)o[k]=f[k];o.id=++_fnId;o.status='scheduled';o.note=undefined;if(!programmes[tIso])programmes[tIso]=[];programmes[tIso].push(o);});});
  pushReminder('new',src.length+' events',' copied to '+to.length+' day(s) · calendars updated',true);
  closeModal();afterSchedule();toast(src.length+' events copied to '+to.length+' day(s) · subscribers notified',true);
}
function copyFnModal(id){
  var x=findFn(id);if(!x)return;var f=x.f;var days=editionDays();
  openModal('<div class="modal"><div class="modal-h"><div class="ttl">Copy “'+f.name+'” to other dates</div><div class="x" onclick="closeModal()">'+sIcon('x')+'</div></div>'
    +'<div class="modal-b"><div class="info-box" style="margin-bottom:14px;">'+sIcon('layers')+'<div>Same event, same time ('+f.time+'), copied to every date you pick — no need to recreate it each day.</div></div>'
    +'<label class="flbl">Pick dates</label>'
    +'<div style="display:flex;gap:6px;flex-wrap:wrap;" id="cf-to">'+days.map(function(dy){var has=fnsOn(dy.iso).some(function(g){return g.name===f.name;});return '<div class="chip '+(has?'cg':'cn')+'" data-iso="'+dy.iso+'"'+(has?'':' onclick="this.classList.toggle(\'cp\');this.classList.toggle(\'cn\')"')+' style="cursor:'+(has?'default':'pointer')+';padding:6px 11px;font-size:.66rem;">'+dy.d+' '+MONTHS[dy.m]+(has?' ✓':'')+'</div>';}).join('')+'</div>'
    +'<div class="hint" style="margin-top:8px;">Green = event already on that day.</div></div>'
    +'<div class="modal-f"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-p" onclick="doCopyFn('+id+')">'+sIcon('check')+'Copy event</button></div></div>');
}
function doCopyFn(id){
  var x=findFn(id);if(!x)return;var f=x.f;
  var to=[];document.querySelectorAll('#cf-to .chip.cp').forEach(function(c){to.push(c.getAttribute('data-iso'));});
  if(!to.length){toast('Pick at least one date');return;}
  to.forEach(function(tIso){var o={};for(var k in f)o[k]=f[k];o.id=++_fnId;o.status='scheduled';o.note=undefined;if(!programmes[tIso])programmes[tIso]=[];programmes[tIso].push(o);});
  pushReminder('new',f.name,'Added on '+to.length+' more day(s) · auto-added to calendar',true);
  closeModal();afterSchedule();toast('“'+f.name+'” copied to '+to.length+' date(s) · subscribers notified',true);
}
function evTile(ic,val,lbl){return '<div style="background:rgba(255,255,255,.08);border-radius:11px;padding:10px 11px;">'
  +'<div style="width:26px;height:26px;border-radius:8px;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;margin-bottom:7px;"><svg viewBox="0 0 24 24" fill="none" stroke="#FDE68A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;">'+(IC[ic]||'')+'</svg></div>'
  +'<div style="font-size:.76rem;font-weight:700;color:#fff;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+val+'</div>'
  +'<div style="font-size:.54rem;color:rgba(255,255,255,.55);text-transform:uppercase;letter-spacing:.5px;margin-top:2px;">'+lbl+'</div></div>';}
function openEventDetail(id){
  var x=findFn(id);if(!x)return;var f=x.f;var m=statusMeta(f.status);
  var dtp=x.iso.split('-');var dlabel=(+dtp[2])+' '+MONTHL[+dtp[1]-1]+' '+dtp[0];
  var desc=f.desc||('Join the community for '+f.name+' at '+f.venue+'. Open to all subscribers of '+community.name+'.');
  var yt=f.youtube||community.youtube;var help=f.helpline||community.helpline;
  openModal('<div class="modal wide"><div class="modal-h"><div class="ttl">Event details</div><div class="x" onclick="closeModal()">'+sIcon('x')+'</div></div>'
    +'<div class="modal-b">'
      +'<div style="background:linear-gradient(135deg,#1A0E3D,#3D2582);border-radius:15px;padding:18px;color:#fff;margin-bottom:16px;">'
        +'<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;"><span class="chip '+m.cls+'">'+m.lbl+'</span>'+(f.status==='live'?'<span style="font-size:.58rem;font-weight:800;color:#86EFAC;letter-spacing:.6px;">● STREAMING</span>':'')+'</div>'
        +'<div class="disp" style="font-size:1.45rem;font-weight:800;margin-top:8px;">'+f.name+'</div>'
        +'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:14px;">'
          +evTile('cal',dlabel,'Date')
          +evTile('clock',f.time,(f.dur||''))
          +evTile('pin',f.venue,'Venue')
          +((f.status!=='cancelled'&&f.status!=='ended')?evTile('check',rsvpCount(f)+'','RSVP\u2019d'):evTile('users','—','RSVP'))
        +'</div>'
      +'</div>'
      +(f.guru?'<div style="display:flex;align-items:center;gap:12px;padding:13px;border:1px solid var(--bd);border-radius:13px;margin-bottom:14px;"><div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#F5A623,#D97706);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#fff;">'+sIcon('guru')+'</div><div><div style="font-size:.6rem;font-weight:800;color:var(--ink4);text-transform:uppercase;letter-spacing:.6px;">Spiritual guide</div><div style="font-family:var(--fd);font-size:1rem;font-weight:800;color:var(--ink);margin-top:1px;">'+community.guru+'</div><div style="font-size:.64rem;color:var(--ink3);">'+community.guruDesc+'</div></div></div>':'')
      +'<div class="eyebrow" style="margin-bottom:6px;">About this event</div><div style="font-size:.8rem;color:var(--ink2);line-height:1.6;margin-bottom:16px;">'+desc+'</div>'
      +'<div class="grid g2" style="gap:12px;">'
        +'<div style="border:1px solid var(--bd);border-radius:13px;padding:13px;"><div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;"><div style="width:30px;height:30px;border-radius:8px;background:var(--er1);color:var(--er);display:flex;align-items:center;justify-content:center;">'+sIcon('send')+'</div><div style="font-size:.7rem;font-weight:700;color:var(--ink);">YouTube live</div></div><div class="mono" style="font-size:.62rem;color:var(--ink3);word-break:break-all;margin-bottom:8px;">'+yt+'</div><button class="btn btn-s btn-sm btn-full" onclick="toast(\'Opening live stream…\')">Open live stream</button></div>'
        +'<div style="border:1px solid var(--bd);border-radius:13px;padding:13px;"><div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;"><div style="width:30px;height:30px;border-radius:8px;background:var(--ok1);color:#16A34A;display:flex;align-items:center;justify-content:center;">'+sIcon('phone')+'</div><div style="font-size:.7rem;font-weight:700;color:var(--ink);">Helpline</div></div><div class="mono" style="font-size:.78rem;font-weight:700;color:var(--ink);margin-bottom:8px;">'+help+'</div><button class="btn btn-s btn-sm btn-full" onclick="toast(\'Helpline for subscribers\')">Call helpline</button></div>'
      +'</div>'
      +(f.rem&&f.rem.length?'<div class="info-box" style="margin-top:14px;">'+sIcon('bell')+'<div>Reminders to subscribers: '+f.rem.map(remLabel).join(', ')+' before · app + WhatsApp.</div></div>':'')
    +'</div>'
    +'<div class="modal-f">'+(f.status!=='cancelled'&&f.status!=='ended'?'<button class="btn btn-s" onclick="closeModal();openFnModal('+id+')">'+sIcon('edit')+'Edit event</button>':'')+'<button class="btn btn-p" onclick="closeModal()">Done</button></div></div>');
}

/* ═══════════════ INIT ═══════════════ */
window._afterHooks=function(id){if(id==='schedule')afterSchedule();if(id==='subscribers')renderSubRows();if(id==='attendance')renderAttDetail();if(id==='analytics'){renderAttChart();renderFnBreak();}if(id==='reminders')renderRemAuto();if(id==='rsvp'){renderRsvpKpis();renderRsvpBody();}if(id==='access')renderAccessRows();};
// OTP auto-advance on login
document.querySelectorAll('.lg-otp input').forEach(function(inp,i,all){inp.addEventListener('input',function(){if(this.value&&all[i+1])all[i+1].focus();});});
