'use strict';

// ═══════════════════════════════════════════════════════════
//  DEFAULT DATA
// ═══════════════════════════════════════════════════════════
const DEFAULT_CATS = [
  'Reconnaissance','File Search','Login Pages',
  'Exposed Directories','Sensitive Info','Vulnerabilities',
  'Cloud & APIs','CMS & Frameworks','Miscellaneous'
];

// version 1.0.0
const DEFAULT_DORKS = [
  // RECONNAISSANCE
  {id:'r1',name:'All Indexed Pages',query:'site:{target}',desc:'List all pages indexed for a domain',category:'Reconnaissance',tags:['site','enum'],engines:['google','bing','ddg'],pinned:false},
  {id:'r2',name:'Subdomain Enum',query:'site:*.{target} -www',desc:'Discover subdomains of target',category:'Reconnaissance',tags:['subdomains','enum'],engines:['google'],pinned:false},
  {id:'r3',name:'Related Sites',query:'related:{target}',desc:'Find websites similar to target',category:'Reconnaissance',tags:['related','osint'],engines:['google'],pinned:false},
  {id:'r4',name:'Cached Version',query:'cache:{target}',desc:"Google's cached snapshot of the page",category:'Reconnaissance',tags:['cache','osint'],engines:['google'],pinned:false},
  {id:'r5',name:'Inbound Links',query:'link:{target}',desc:'Pages that link to target domain',category:'Reconnaissance',tags:['links','osint'],engines:['google'],pinned:false},
  {id:'r6',name:'Tech Stack Clues',query:'site:{target} intext:"Powered by" OR intext:"Built with"',desc:'Detect underlying technologies',category:'Reconnaissance',tags:['tech','osint'],engines:['google','bing'],pinned:false},
  {id:'r7',name:'Job Listings',query:'site:{target} intitle:"jobs" OR intitle:"careers" OR intitle:"hiring"',desc:'Tech stack hints from job postings',category:'Reconnaissance',tags:['osint','tech'],engines:['google','bing'],pinned:false},

  // FILE SEARCH
  {id:'f1',name:'PDF Documents',query:'site:{target} filetype:pdf',desc:'Exposed PDF files on target',category:'File Search',tags:['pdf','filetype'],engines:['google','bing'],pinned:false},
  {id:'f2',name:'Excel / CSV',query:'site:{target} filetype:xls OR filetype:xlsx OR filetype:csv',desc:'Exposed spreadsheet data',category:'File Search',tags:['excel','data','filetype'],engines:['google','bing'],pinned:false},
  {id:'f3',name:'SQL Dumps',query:'site:{target} filetype:sql',desc:'Exposed SQL database dump files',category:'File Search',tags:['sql','database','filetype'],engines:['google'],pinned:false},
  {id:'f4',name:'Config Files',query:'site:{target} filetype:conf OR filetype:cfg OR filetype:ini',desc:'Configuration files left exposed',category:'File Search',tags:['config','sensitive','filetype'],engines:['google'],pinned:false},
  {id:'f5',name:'Log Files',query:'site:{target} filetype:log',desc:'Exposed server or application logs',category:'File Search',tags:['logs','filetype'],engines:['google'],pinned:false},
  {id:'f6',name:'Backup Files',query:'site:{target} filetype:bak OR filetype:backup OR filetype:old',desc:'Backup files not removed from server',category:'File Search',tags:['backup','filetype'],engines:['google'],pinned:false},
  {id:'f7',name:'XML Files',query:'site:{target} filetype:xml',desc:'Exposed XML data files',category:'File Search',tags:['xml','filetype'],engines:['google','bing'],pinned:false},
  {id:'f8',name:'Word Docs',query:'site:{target} filetype:doc OR filetype:docx',desc:'Exposed Word documents',category:'File Search',tags:['doc','filetype'],engines:['google','bing'],pinned:false},
  {id:'f9',name:'ZIP / Archives',query:'site:{target} filetype:zip OR filetype:tar OR filetype:gz',desc:'Downloadable archive files',category:'File Search',tags:['archive','filetype'],engines:['google'],pinned:false},

  // LOGIN PAGES
  {id:'l1',name:'Admin Login',query:'site:{target} inurl:admin intitle:login',desc:'Admin login portals',category:'Login Pages',tags:['admin','login'],engines:['google','bing'],pinned:false},
  {id:'l2',name:'cPanel',query:'site:{target} inurl:cpanel OR inurl:2082 OR inurl:2083',desc:'cPanel hosting control panel',category:'Login Pages',tags:['cpanel','hosting','login'],engines:['google'],pinned:false},
  {id:'l3',name:'phpMyAdmin',query:'site:{target} inurl:phpmyadmin',desc:'phpMyAdmin database UI',category:'Login Pages',tags:['phpmyadmin','database','login'],engines:['google','bing'],pinned:false},
  {id:'l4',name:'WordPress Login',query:'site:{target} inurl:wp-login.php',desc:'WordPress /wp-login.php page',category:'Login Pages',tags:['wordpress','cms','login'],engines:['google','bing'],pinned:false},
  {id:'l5',name:'Joomla Admin',query:'site:{target} inurl:administrator intitle:"Administration"',desc:'Joomla admin panel',category:'Login Pages',tags:['joomla','cms','login'],engines:['google'],pinned:false},
  {id:'l6',name:'Webmail',query:'site:{target} inurl:webmail OR inurl:roundcube OR inurl:squirrelmail',desc:'Webmail login interfaces',category:'Login Pages',tags:['webmail','email','login'],engines:['google'],pinned:false},
  {id:'l7',name:'VPN / Portal',query:'site:{target} inurl:vpn OR inurl:remote OR intitle:"SSL VPN"',desc:'Remote access / VPN portals',category:'Login Pages',tags:['vpn','remote','login'],engines:['google','bing'],pinned:false},
  {id:'l8',name:'Kibana / Grafana',query:'site:{target} inurl:kibana OR inurl:grafana',desc:'Dashboard panels often unauthenticated',category:'Login Pages',tags:['kibana','grafana','dashboard'],engines:['google'],pinned:false},

  // EXPOSED DIRECTORIES
  {id:'d1',name:'Open Directories',query:'intitle:"index of" site:{target}',desc:'Apache/Nginx open directory listings',category:'Exposed Directories',tags:['directory','listing'],engines:['google','bing'],pinned:false},
  {id:'d2',name:'Open /uploads',query:'intitle:"index of" inurl:upload site:{target}',desc:'Open upload directories',category:'Exposed Directories',tags:['upload','directory'],engines:['google'],pinned:false},
  {id:'d3',name:'Open /backup',query:'intitle:"index of" inurl:backup site:{target}',desc:'Open backup directories',category:'Exposed Directories',tags:['backup','directory'],engines:['google'],pinned:false},
  {id:'d4',name:'Apache Default',query:'intitle:"Apache2 Ubuntu Default Page" site:{target}',desc:'Unconfigured Apache default pages',category:'Exposed Directories',tags:['apache','misconfigured'],engines:['google'],pinned:false},
  {id:'d5',name:'IIS Default',query:'intitle:"IIS Windows Server" site:{target}',desc:'Unconfigured IIS default pages',category:'Exposed Directories',tags:['iis','misconfigured'],engines:['google'],pinned:false},

  // SENSITIVE INFO
  {id:'s1',name:'Email Addresses',query:'site:{target} intext:"@{target}" -inurl:subscribe',desc:'Employee email addresses',category:'Sensitive Info',tags:['email','osint'],engines:['google','bing'],pinned:false},
  {id:'s2',name:'Password Files',query:'site:{target} inurl:password filetype:txt',desc:'Plaintext password files',category:'Sensitive Info',tags:['password','credentials'],engines:['google'],pinned:false},
  {id:'s3',name:'Private Keys',query:'site:{target} filetype:pem OR filetype:key',desc:'Exposed SSL/SSH private keys',category:'Sensitive Info',tags:['keys','crypto','credentials'],engines:['google'],pinned:false},
  {id:'s4',name:'.env Files',query:'site:{target} filetype:env "DB_PASSWORD" OR "APP_KEY"',desc:'Laravel / Node .env with secrets',category:'Sensitive Info',tags:['env','credentials','database'],engines:['google'],pinned:false},
  {id:'s5',name:'API Keys in JS',query:'site:{target} "api_key" OR "apikey" filetype:js',desc:'Hardcoded API keys in JavaScript',category:'Sensitive Info',tags:['api','credentials','keys'],engines:['google'],pinned:false},
  {id:'s6',name:'AWS Credentials',query:'site:{target} "aws_access_key_id" OR "aws_secret_access_key"',desc:'Exposed AWS access credentials',category:'Sensitive Info',tags:['aws','cloud','credentials'],engines:['google'],pinned:false},
  {id:'s7',name:'Connection Strings',query:'site:{target} "connectionString" OR "mongodb://" OR "postgres://"',desc:'Database connection strings exposed',category:'Sensitive Info',tags:['database','credentials'],engines:['google'],pinned:false},
  {id:'s8',name:'SSH Config',query:'site:{target} filetype:pub "ssh-rsa"',desc:'Exposed public SSH keys',category:'Sensitive Info',tags:['ssh','keys'],engines:['google'],pinned:false},

  // VULNERABILITIES
  {id:'v1',name:'SQL Errors',query:'site:{target} "Warning: mysql_" OR "SQL syntax.*MySQL" OR "ORA-[0-9]"',desc:'SQL error messages revealing DB info',category:'Vulnerabilities',tags:['sql','errors','injection'],engines:['google'],pinned:false},
  {id:'v2',name:'PHP Errors',query:'site:{target} "Fatal error:" OR "Parse error:" OR "Warning:" filetype:php',desc:'PHP stack traces and errors',category:'Vulnerabilities',tags:['php','errors'],engines:['google'],pinned:false},
  {id:'v3',name:'Exposed .git',query:'site:{target} inurl:"/.git/" intitle:"Index of"',desc:'Accessible .git repository directories',category:'Vulnerabilities',tags:['git','source','exposed'],engines:['google'],pinned:false},
  {id:'v4',name:'Open Redirect',query:'site:{target} inurl:redirect= OR inurl:return_url= OR inurl:goto=',desc:'Potential open redirect parameters',category:'Vulnerabilities',tags:['redirect','open-redirect'],engines:['google','bing'],pinned:false},
  {id:'v5',name:'.htaccess Exposed',query:'site:{target} intitle:"Index of" ".htaccess"',desc:'Exposed Apache .htaccess files',category:'Vulnerabilities',tags:['htaccess','config'],engines:['google'],pinned:false},
  {id:'v6',name:'Debug Mode On',query:'site:{target} intext:"DEBUG = True" OR intext:"APP_DEBUG=true"',desc:'Applications running in debug mode',category:'Vulnerabilities',tags:['debug','misconfigured'],engines:['google'],pinned:false},
  {id:'v7',name:'CORS Misconfig',query:'site:{target} intext:"Access-Control-Allow-Origin: *"',desc:'Permissive CORS headers',category:'Vulnerabilities',tags:['cors','headers'],engines:['google'],pinned:false},
  {id:'v8',name:'Exposed Swagger',query:'site:{target} inurl:swagger OR inurl:api-docs intitle:"Swagger"',desc:'Swagger/OpenAPI documentation exposed',category:'Vulnerabilities',tags:['api','swagger','docs'],engines:['google','bing'],pinned:false},

  // CLOUD & APIs
  {id:'c1',name:'S3 Bucket',query:'site:s3.amazonaws.com "{target}"',desc:'Public AWS S3 buckets for target org',category:'Cloud & APIs',tags:['aws','s3','cloud'],engines:['google','bing'],pinned:false},
  {id:'c2',name:'Azure Blob',query:'site:blob.core.windows.net "{target}"',desc:'Azure Blob Storage containers',category:'Cloud & APIs',tags:['azure','cloud'],engines:['google'],pinned:false},
  {id:'c3',name:'GCP Bucket',query:'site:storage.googleapis.com "{target}"',desc:'Google Cloud Storage buckets',category:'Cloud & APIs',tags:['gcp','cloud'],engines:['google'],pinned:false},
  {id:'c4',name:'GitHub Code',query:'site:github.com "{target}" password OR secret OR key',desc:'Secrets accidentally pushed to GitHub',category:'Cloud & APIs',tags:['github','credentials','leak'],engines:['google','bing'],pinned:false},
  {id:'c5',name:'Pastebin Leaks',query:'site:pastebin.com "{target}" password OR email',desc:'Target data leaked on Pastebin',category:'Cloud & APIs',tags:['pastebin','leak','osint'],engines:['google'],pinned:false},

  // CMS & FRAMEWORKS
  {id:'m1',name:'WordPress Version',query:'site:{target} intext:"WordPress" inurl:wp-content',desc:'Identify WordPress version hints',category:'CMS & Frameworks',tags:['wordpress','version'],engines:['google','bing'],pinned:false},
  {id:'m2',name:'Drupal Install',query:'site:{target} inurl:user/login intitle:"Log in"',desc:'Drupal login pages',category:'CMS & Frameworks',tags:['drupal','cms','login'],engines:['google'],pinned:false},
  {id:'m3',name:'Laravel Debug',query:'site:{target} intext:"Whoops! There was an error"',desc:'Laravel Whoops error page',category:'CMS & Frameworks',tags:['laravel','php','errors'],engines:['google'],pinned:false},
  {id:'m4',name:'Django Error',query:'site:{target} intext:"Django" intitle:"Page not found"',desc:'Django 404/debug pages',category:'CMS & Frameworks',tags:['django','python','errors'],engines:['google'],pinned:false},
  {id:'m5',name:'Jenkins CI',query:'site:{target} inurl:jenkins intitle:"Dashboard"',desc:'Exposed Jenkins CI dashboards',category:'CMS & Frameworks',tags:['jenkins','ci','devops'],engines:['google','bing'],pinned:false},
];

const CHEATSHEET_OPS = [
  {op:'site:',desc:'Restrict results to a domain',ex:'site:example.com'},
  {op:'filetype:',desc:'Filter by file extension',ex:'filetype:pdf'},
  {op:'inurl:',desc:'Keyword must appear in URL',ex:'inurl:admin'},
  {op:'intitle:',desc:'Keyword in page title',ex:'intitle:"index of"'},
  {op:'intext:',desc:'Keyword in page body',ex:'intext:"password"'},
  {op:'ext:',desc:'Extension filter (like filetype)',ex:'ext:php'},
  {op:'related:',desc:'Sites similar to domain',ex:'related:cnn.com'},
  {op:'cache:',desc:"Google's cached snapshot",ex:'cache:example.com'},
  {op:'-keyword',desc:'Exclude a term',ex:'-inurl:htm'},
  {op:'"phrase"',desc:'Exact phrase match',ex:'"index of /"'},
  {op:'OR',desc:'Either term (uppercase)',ex:'filetype:doc OR docx'},
  {op:'*',desc:'Wildcard match',ex:'site:*.example.com'},
];

const CHEATSHEET_EXAMPLES = [
  {label:'Find exposed env files',query:'site:{target} filetype:env "DB_PASSWORD"'},
  {label:'Open directory + sensitive ext',query:'intitle:"index of" site:{target} (pdf|sql|log)'},
  {label:'Admin panels on subdomains',query:'site:*.{target} inurl:admin'},
  {label:'GitHub source leaks',query:'site:github.com "{target}" "api_key" OR "secret"'},
  {label:'Exposed S3 buckets',query:'site:s3.amazonaws.com "{target}"'},
  {label:'Misconfigured cloud storage',query:'site:s3.amazonaws.com OR site:blob.core.windows.net "{target}"'},
];

const CHEATSHEET_TIPS = [
  'Google Dorks only work on publicly indexed pages — not behind login walls.',
  'Combine multiple operators for precise results: site: + filetype: + inurl:',
  'Use quotes for exact phrases: intitle:"index of /admin"',
  'Bing & DuckDuckGo support most operators but results differ — try all engines.',
  'The minus sign (-) excludes terms: site:example.com -inurl:blog',
  'OR must be uppercase; lowercase "or" is treated as a literal word.',
  'Wildcard (*) in site: finds all subdomains: site:*.example.com',
  'Dorks only find what Google has indexed — recent exposures may not appear yet.',
];

const ENGINE_URLS = {
  google: q => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
  bing:   q => `https://www.bing.com/search?q=${encodeURIComponent(q)}`,
  ddg:    q => `https://duckduckgo.com/?q=${encodeURIComponent(q)}`,
};

const ENGINE_NOTES = {
  google: '',
  bing:   '⚠ Bing: some operators differ',
  ddg:    '⚠ DDG: limited operator support',
};

// ═══════════════════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════════════════
let S = {
  dorks: [], cats: [],
  activeCat: 'all', activeTags: new Set(),
  search: '', engine: 'google',
  editId: null, pendingDork: null,
  recentTargets: [],
};

// ═══════════════════════════════════════════════════════════
//  STORAGE
// ═══════════════════════════════════════════════════════════
function save() {
  const d = { dorks: S.dorks, cats: S.cats, engine: S.engine, recentTargets: S.recentTargets };
  try {
    if (typeof chrome !== 'undefined' && chrome.storage) chrome.storage.local.set(d);
    else localStorage.setItem('dh2', JSON.stringify(d));
  } catch(e){}
}

async function load() {
  return new Promise(resolve => {
    try {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.get(['dorks','cats','engine','recentTargets'], r => resolve(r));
      } else {
        const raw = localStorage.getItem('dh2');
        resolve(raw ? JSON.parse(raw) : {});
      }
    } catch { resolve({}); }
  });
}

// ═══════════════════════════════════════════════════════════
//  FILTERING
// ═══════════════════════════════════════════════════════════
function filtered() {
  let list = [...S.dorks];

  // pinned always first
  list.sort((a,b) => (b.pinned?1:0) - (a.pinned?1:0));

  return list.filter(d => {
    const catOk = S.activeCat === 'all' || d.category === S.activeCat;
    const tagOk = S.activeTags.size === 0 || [...S.activeTags].every(t => (d.tags||[]).includes(t));
    const q = S.search.trim().toLowerCase();
    const searchOk = !q ||
      d.name.toLowerCase().includes(q) ||
      d.query.toLowerCase().includes(q) ||
      (d.desc||'').toLowerCase().includes(q) ||
      (d.tags||[]).some(t => t.includes(q)) ||
      (d.category||'').toLowerCase().includes(q);
    return catOk && tagOk && searchOk;
  });
}

function visibleTags() {
  const base = S.dorks.filter(d => S.activeCat==='all' || d.category===S.activeCat);
  const set = new Set();
  base.forEach(d => (d.tags||[]).forEach(t => set.add(t)));
  return [...set].sort();
}

// ═══════════════════════════════════════════════════════════
//  RENDER
// ═══════════════════════════════════════════════════════════
function render() {
  renderCats();
  renderTags();
  renderList();
  refreshCatScrollBtns();
}

function renderCats() {
  const el = $('cat-tabs'); el.innerHTML = '';
  const counts = {};
  S.dorks.forEach(d => counts[d.category] = (counts[d.category]||0) + 1);

  const allBtn = btn('button', 'ctab' + (S.activeCat==='all'?' active':''), 'All');
  const allN = mk('span','ctab-n'); allN.textContent = S.dorks.length;
  allBtn.appendChild(allN);
  allBtn.onclick = () => { S.activeCat='all'; S.activeTags.clear(); render(); };
  el.appendChild(allBtn);

  S.cats.forEach(c => {
    const b = btn('button','ctab'+(S.activeCat===c?' active':''), c);
    if (counts[c]) { const n=mk('span','ctab-n'); n.textContent=counts[c]; b.appendChild(n); }
    b.onclick = () => { S.activeCat=c; S.activeTags.clear(); render(); };
    el.appendChild(b);
  });
}

function renderTags() {
  const tags = visibleTags();
  const bar = $('tag-bar'), strip = $('tag-strip');
  if (!tags.length) { bar.style.display='none'; return; }
  bar.style.display='block'; strip.innerHTML='';
  tags.forEach(t => {
    const c = mk('span','tchip'+(S.activeTags.has(t)?' active':''));
    c.textContent = '#'+t;
    c.onclick = () => { S.activeTags.has(t)?S.activeTags.delete(t):S.activeTags.add(t); render(); };
    strip.appendChild(c);
  });
}

function renderList() {
  const list = $('dork-list'), empty = $('empty');
  const items = filtered();
  $('count-label').textContent = `${items.length} dork${items.length!==1?'s':''}${S.search||S.activeTags.size?' (filtered)':''}`;

  if (!items.length) {
    list.style.display='none'; empty.style.display='flex';
    $('empty-title').textContent = S.search ? 'No results for "'+S.search+'"' : 'No dorks here';
    $('empty-sub').textContent = S.search ? 'Try different keywords' : 'Add a dork or change category';
    return;
  }
  list.style.display='flex'; empty.style.display='none';
  list.innerHTML='';

  items.forEach(d => {
    const card = mk('div','dork-card'+(d.pinned?' pinned':''));
    card.dataset.id = d.id;

    // TOP
    const top = mk('div','dc-top');
    const left = mk('div','dc-left');
    if (d.pinned) { const s=mk('span','pin-star'); s.textContent='📌'; left.appendChild(s); }
    const name = mk('span','dc-name'); name.textContent=d.name; left.appendChild(name);
    top.appendChild(left);

    const acts = mk('div','dc-actions');
    const runB = ab('run','▶','Search with '+S.engine); runB.onclick=()=>handleRun(d);
    const copyB= ab('copy','⎘','Copy query');  copyB.onclick=()=>copyQuery(d.query);
    const pinB = ab('pin'+(d.pinned?' on':''),'📌','Pin to top'); pinB.onclick=()=>togglePin(d.id);
    const editB= ab('edit','✎','Edit'); editB.onclick=()=>openEdit(d);
    const delB = ab('del','✕','Delete'); delB.onclick=()=>deleteDork(d.id);
    acts.append(runB,copyB,pinB,editB,delB);
    top.appendChild(acts);
    card.appendChild(top);

    // QUERY
    const q=mk('div','dc-query'); q.textContent=d.query; card.appendChild(q);

    // DESC
    if (d.desc) { const de=mk('div','dc-desc'); de.textContent=d.desc; card.appendChild(de); }

    // META
    const meta=mk('div','dc-meta');
    const cat=mk('span','dc-cat'); cat.textContent=d.category; meta.appendChild(cat);
    (d.engines||['google']).forEach(e => {
      const eb=mk('span','dc-engine'); eb.textContent=e; meta.appendChild(eb);
    });
    (d.tags||[]).forEach(t => {
      const tb=mk('span','dc-tag'); tb.textContent='#'+t; meta.appendChild(tb);
    });
    card.appendChild(meta);

    list.appendChild(card);
  });
}

// ═══════════════════════════════════════════════════════════
//  ACTIONS
// ═══════════════════════════════════════════════════════════
function handleRun(dork) {
  if (dork.query.includes('{target}')) {
    S.pendingDork = dork;
    $('target-preview').textContent = dork.query;
    $('target-input').value = '';
    renderRecentTargets();
    show('ov-target');
    setTimeout(()=>$('target-input').focus(),80);
  } else {
    runSearch(dork.query);
  }
}

function runSearch(query) {
  const url = ENGINE_URLS[S.engine](query);
  if (typeof chrome!=='undefined' && chrome.tabs) {
    chrome.tabs.query({active:true,currentWindow:true}, tabs => {
      chrome.tabs.update(tabs[0].id, {url});
      window.close();
    });
  } else { window.open(url,'_blank'); }
  toast('Searching on '+S.engine+'…');
}

function copyQuery(query) {
  navigator.clipboard.writeText(query).then(()=>toast('Query copied!')).catch(()=>{
    // fallback
    const ta=document.createElement('textarea');
    ta.value=query; document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); document.body.removeChild(ta);
    toast('Query copied!');
  });
}

function togglePin(id) {
  const d = S.dorks.find(x=>x.id===id);
  if (d) { d.pinned=!d.pinned; save(); render(); toast(d.pinned?'Pinned to top':'Unpinned'); }
}

function deleteDork(id) {
  if (!confirm('Delete this dork?')) return;
  S.dorks = S.dorks.filter(d=>d.id!==id);
  save(); render(); toast('Dork deleted');
}

// ── EDIT / ADD PANEL ──
function openAdd() {
  S.editId=null;
  $('edit-title').textContent='ADD DORK';
  $('e-name').value=''; $('e-query').value=''; $('e-desc').value=''; $('e-tags').value='';
  populateCatSelect();
  // reset engine checkboxes
  $$('#e-engines input').forEach(cb => cb.checked = cb.value==='google');
  show('ov-edit');
  setTimeout(()=>$('e-name').focus(),80);
}

function openEdit(dork) {
  S.editId=dork.id;
  $('edit-title').textContent='EDIT DORK';
  $('e-name').value=dork.name;
  $('e-query').value=dork.query;
  $('e-desc').value=dork.desc||'';
  $('e-tags').value=(dork.tags||[]).join(', ');
  populateCatSelect(dork.category);
  $$('#e-engines input').forEach(cb => cb.checked=(dork.engines||['google']).includes(cb.value));
  show('ov-edit');
}

function saveDork() {
  const name=$('e-name').value.trim();
  const query=$('e-query').value.trim();
  const desc=$('e-desc').value.trim();
  const category=$('e-cat').value;
  const tags=$('e-tags').value.split(',').map(t=>t.trim().toLowerCase()).filter(Boolean);
  const engines=[...$$(  '#e-engines input:checked')].map(cb=>cb.value);
  if (!name||!query) { toast('Name and Query are required',true); return; }
  if (!engines.length) { toast('Select at least one engine',true); return; }

  if (S.editId) {
    const i=S.dorks.findIndex(d=>d.id===S.editId);
    if (i!==-1) S.dorks[i]={...S.dorks[i],name,query,desc,category,tags,engines};
    toast('Dork updated ✓');
  } else {
    S.dorks.push({id:'d'+Date.now(),name,query,desc,category,tags,engines,pinned:false});
    toast('Dork added ✓');
  }
  save(); hide('ov-edit'); render();
}

function populateCatSelect(selected) {
  const sel=$('e-cat'); sel.innerHTML='';
  S.cats.forEach(c => {
    const o=document.createElement('option');
    o.value=c; o.textContent=c;
    if (c===selected) o.selected=true;
    sel.appendChild(o);
  });
}

// ── CATEGORIES ──
function renderCatManager() {
  const ul=$('mcat-list'); ul.innerHTML='';
  const counts={};
  S.dorks.forEach(d => counts[d.category]=(counts[d.category]||0)+1);
  S.cats.forEach(c => {
    const li=document.createElement('li');
    const info=mk('div','mcat-info');
    const nm=mk('span',null); nm.textContent=c; info.appendChild(nm);
    const n=mk('span','mcat-n'); n.textContent=(counts[c]||0)+' dorks'; info.appendChild(n);
    li.appendChild(info);
    const db=mk('button','mcat-del'); db.textContent='✕'; db.title='Delete category';
    db.onclick=()=>deleteCat(c); li.appendChild(db);
    ul.appendChild(li);
  });
}

function addCat() {
  const v=$('new-cat').value.trim();
  if (!v) return;
  if (S.cats.includes(v)) { toast('Category already exists',true); return; }
  S.cats.push(v); save(); renderCatManager(); renderCats();
  $('new-cat').value=''; toast('Category added ✓');
}

function deleteCat(cat) {
  const n=S.dorks.filter(d=>d.category===cat).length;
  if (n>0) { toast(`${n} dork(s) use this category — reassign first`,true); return; }
  S.cats=S.cats.filter(c=>c!==cat);
  if (S.activeCat===cat) S.activeCat='all';
  save(); renderCatManager(); render(); toast('Category removed');
}

// ── BUILDER ──
const BUILDER_FIELDS = ['site','filetype','inurl','intitle','intext','ext','excl','exact','extra'];

function buildQuery() {
  const parts=[];
  const site=$('b-site').value.trim();
  const ft=$('b-filetype').value.trim();
  const inurl=$('b-inurl').value.trim();
  const intitle=$('b-intitle').value.trim();
  const intext=$('b-intext').value.trim();
  const ext=$('b-ext').value.trim();
  const excl=$('b-excl').value.trim();
  const exact=$('b-exact').value.trim();
  const extra=$('b-extra').value.trim();

  if (site) parts.push('site:'+site);
  if (ft) {
    const exts=ft.split(/[,\s]+/).filter(Boolean);
    parts.push(exts.map(e=>'filetype:'+e).join(' OR '));
  }
  if (inurl) {
    const us=inurl.split(/[,\s]+/).filter(Boolean);
    parts.push(us.map(u=>'inurl:'+u).join(' OR '));
  }
  if (intitle) parts.push('intitle:'+(/\s/.test(intitle)?'"'+intitle+'"':intitle));
  if (intext) parts.push('intext:'+(/\s/.test(intext)?'"'+intext+'"':intext));
  if (ext) parts.push('ext:'+ext);
  if (excl) { const es=excl.split(/[,\s]+/).filter(Boolean); es.forEach(e=>parts.push('-inurl:'+e)); }
  if (exact) parts.push('"'+exact+'"');
  if (extra) parts.push(extra);

  return parts.join(' ').trim();
}

function updateBuilderPreview() {
  const q=buildQuery();
  $('b-preview').textContent=q||'—';
}

function clearBuilder() {
  BUILDER_FIELDS.forEach(f => { const el=$('b-'+f); if(el) el.value=''; });
  updateBuilderPreview();
}

function runBuilderDork() {
  const q=buildQuery();
  if (!q) { toast('Add at least one operator',true); return; }
  hide('ov-builder');
  if (q.includes('{target}')) { S.pendingDork={query:q,name:'Builder Query'}; show('ov-target'); }
  else runSearch(q);
}

function saveBuilderAsDork() {
  const q=buildQuery();
  if (!q) { toast('Build a query first',true); return; }
  hide('ov-builder');
  S.editId=null;
  $('edit-title').textContent='SAVE BUILDER QUERY';
  $('e-name').value='';
  $('e-query').value=q;
  $('e-desc').value='';
  $('e-tags').value='';
  populateCatSelect();
  $$('#e-engines input').forEach(cb=>cb.checked=cb.value==='google');
  show('ov-edit');
}

// ── TARGET PANEL ──
function renderRecentTargets() {
  const el=$('recent-targets'); el.innerHTML='';
  if (!S.recentTargets.length) return;
  const lbl=mk('span',null); lbl.textContent='Recent: '; lbl.style.cssText='font-size:9px;color:var(--dim);font-family:var(--mono)';
  el.appendChild(lbl);
  S.recentTargets.forEach(t => {
    const c=mk('span','rt-chip'); c.textContent=t;
    c.onclick=()=>{ $('target-input').value=t; updateTargetPreview(); };
    el.appendChild(c);
  });
}

function updateTargetPreview() {
  const t=$('target-input').value.trim();
  if (S.pendingDork) {
    const preview = t ? S.pendingDork.query.replace(/\{target\}/g,t) : S.pendingDork.query;
    $('target-preview').textContent=preview;
  }
}

function addRecentTarget(target) {
  S.recentTargets = [target, ...S.recentTargets.filter(t=>t!==target)].slice(0,5);
  save();
}

function doTargetSearch() {
  const t=$('target-input').value.trim();
  if (!t) { toast('Enter a target',true); return; }
  const q=S.pendingDork.query.replace(/\{target\}/g,t);
  addRecentTarget(t);
  hide('ov-target');
  runSearch(q);
}

// ── CHEATSHEET ──
function renderCheatsheet() {
  const grid=$('cs-core'); grid.innerHTML='';
  CHEATSHEET_OPS.forEach(o => {
    const item=mk('div','cs-item');
    item.onclick=()=>{ hide('ov-cheat'); openBuilderWithOp(o.op); };
    const op=mk('span','cs-op'); op.textContent=o.op;
    const desc=mk('span','cs-desc'); desc.textContent=o.desc;
    const ex=mk('span','cs-ex'); ex.textContent=o.ex;
    item.append(op,desc,ex); grid.appendChild(item);
  });

  const exs=$('cs-examples'); exs.innerHTML='';
  CHEATSHEET_EXAMPLES.forEach(e => {
    const eg=mk('div','cs-eg');
    eg.onclick=()=>{ hide('ov-cheat'); openBuilderWithQuery(e.query); };
    const lbl=mk('div','cs-eg-label'); lbl.textContent=e.label;
    const q=mk('div','cs-eg-query'); q.textContent=e.query;
    eg.append(lbl,q); exs.appendChild(eg);
  });

  const tips=$('cs-tips'); tips.innerHTML='';
  CHEATSHEET_TIPS.forEach(t => {
    const li=document.createElement('li'); li.textContent=t; tips.appendChild(li);
  });
}

function openBuilderWithOp(op) {
  show('ov-builder');
  // focus the relevant field
  const map={'site:':'b-site','filetype:':'b-filetype','inurl:':'b-inurl',
    'intitle:':'b-intitle','intext:':'b-intext','ext:':'b-ext'};
  const fld=map[op];
  if (fld) setTimeout(()=>$(fld).focus(),100);
}

function openBuilderWithQuery(q) {
  clearBuilder();
  $('b-extra').value=q;
  updateBuilderPreview();
  show('ov-builder');
}

// ── EXPORT / IMPORT ──
function exportDorks() {
  const data=JSON.stringify({version:'2.0',dorks:S.dorks,cats:S.cats},null,2);
  const blob=new Blob([data],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url; a.download='dorkhunter-export.json'; a.click();
  URL.revokeObjectURL(url);
  toast('Exported '+S.dorks.length+' dorks');
}

function importDorks(file) {
  const reader=new FileReader();
  reader.onload=e=>{
    try {
      const data=JSON.parse(e.target.result);
      const incoming=Array.isArray(data)?data:(data.dorks||[]);
      const inCats=data.cats||[];
      let added=0;
      incoming.forEach(d => {
        if (d.query && !S.dorks.find(x=>x.id===d.id)) {
          S.dorks.push({...d, id:d.id||'d'+Date.now()+Math.random(), pinned:d.pinned||false});
          added++;
        }
      });
      inCats.forEach(c=>{ if(!S.cats.includes(c)) S.cats.push(c); });
      save(); render();
      toast(`Imported ${added} dork${added!==1?'s':''}!`);
    } catch { toast('Invalid JSON file',true); }
  };
  reader.readAsText(file);
}

// ═══════════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════════
function refreshCatScrollBtns() {
  const w = document.getElementById('cat-tabs-wrap');
  const l = document.getElementById('cat-scroll-left');
  const r = document.getElementById('cat-scroll-right');
  if (!w || !l || !r) return;
  // Use setTimeout so the DOM has finished painting new tabs
  setTimeout(() => {
    const atStart = w.scrollLeft <= 2;
    const atEnd   = w.scrollLeft + w.clientWidth >= w.scrollWidth - 2;
    l.disabled = atStart;
    r.disabled = atEnd;
    l.style.opacity = atStart ? '0.3' : '1';
    r.style.opacity = atEnd   ? '0.3' : '1';
  }, 40);
}
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);
function mk(tag,cls){ const e=document.createElement(tag); if(cls) e.className=cls; return e; }
function btn(tag,cls,txt){ const e=mk(tag,cls); e.textContent=txt; return e; }
function ab(cls,icon,title){ const b=mk('button','ab '+cls); b.textContent=icon; b.title=title; return b; }

function show(id){ $(id).style.display='flex'; }
function hide(id){ $(id).style.display='none'; }

let _toastTimer;
function toast(msg,err=false){
  const t=$('toast');
  t.textContent=msg;
  t.className='toast show'+(err?' err':'');
  clearTimeout(_toastTimer);
  _toastTimer=setTimeout(()=>t.classList.remove('show'),2200);
}

// ═══════════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════════
async function init() {
  const stored=await load();
  S.cats = stored.cats || [...DEFAULT_CATS];
  S.dorks = stored.dorks || DEFAULT_DORKS.map(d=>({...d}));
  S.engine = stored.engine || 'google';
  S.recentTargets = stored.recentTargets || [];
  if (!stored.dorks) save();

  render();
  renderCheatsheet();
  updateEngineUI();

  // ── SEARCH ──
  $('search').addEventListener('input', e=>{
    S.search=e.target.value;
    $('search-clear').style.display=S.search?'block':'none';
    render();
  });
  $('search-clear').addEventListener('click',()=>{
    $('search').value=''; S.search='';
    $('search-clear').style.display='none';
    render(); $('search').focus();
  });

  // ── ENGINE PILLS ──
  $$('.epill').forEach(p=>p.addEventListener('click',()=>{
    S.engine=p.dataset.engine; save();
    updateEngineUI(); render();
  }));

  // ── CATEGORY SCROLL BUTTONS ──
  const catWrap = $('cat-tabs-wrap');
  $('cat-scroll-left').addEventListener('click', () => {
    catWrap.scrollBy({ left: -140, behavior: 'smooth' });
    setTimeout(refreshCatScrollBtns, 250);
  });
  $('cat-scroll-right').addEventListener('click', () => {
    catWrap.scrollBy({ left: 140, behavior: 'smooth' });
    setTimeout(refreshCatScrollBtns, 250);
  });
  catWrap.addEventListener('scroll', refreshCatScrollBtns);

  // ── HEADER BUTTONS ──
  $('btn-add').addEventListener('click', openAdd);
  $('btn-builder').addEventListener('click',()=>show('ov-builder'));
  $('btn-cheatsheet').addEventListener('click',()=>show('ov-cheat'));
  $('btn-export').addEventListener('click', exportDorks);
  $('import-file').addEventListener('change', e=>{ if(e.target.files[0]) importDorks(e.target.files[0]); e.target.value=''; });
  $('btn-manage-cats').addEventListener('click',()=>{ renderCatManager(); show('ov-cats'); });

  // ── EDIT PANEL ──
  $('e-save').addEventListener('click', saveDork);
  $('e-query').addEventListener('input',()=>{
    const hint=$('e-query').parentElement?.querySelector('.hint');
  });

  // ── BUILDER ──
  BUILDER_FIELDS.forEach(f=>{ const el=$('b-'+f); if(el) el.addEventListener('input',updateBuilderPreview); });
  $('b-run').addEventListener('click', runBuilderDork);
  $('b-save-as').addEventListener('click', saveBuilderAsDork);
  $('b-clear').addEventListener('click', clearBuilder);

  // ── TARGET PANEL ──
  $('target-input').addEventListener('input', updateTargetPreview);
  $('target-input').addEventListener('keydown', e=>{ if(e.key==='Enter') doTargetSearch(); });
  $('t-run').addEventListener('click', doTargetSearch);

  // ── CATEGORY MANAGER ──
  $('cat-add-btn').addEventListener('click', addCat);
  $('new-cat').addEventListener('keydown', e=>{ if(e.key==='Enter') addCat(); });

  // ── CLOSE BUTTONS (data-close) ──
  $$('[data-close]').forEach(b=>b.addEventListener('click',()=>hide(b.dataset.close)));

  // ── OVERLAY CLICK TO CLOSE ──
  $$('.overlay').forEach(ov=>ov.addEventListener('click',e=>{
    if(e.target===ov) hide(ov.id);
  }));

  // ── KEYBOARD SHORTCUTS ──
  document.addEventListener('keydown', e=>{
    if (e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA') return;
    if (e.key==='a'||e.key==='A') openAdd();
    if (e.key==='b'||e.key==='B') show('ov-builder');
    if (e.key==='/'){ e.preventDefault(); $('search').focus(); }
    if (e.key==='Escape') $$('.overlay').forEach(ov=>ov.style.display='none');
  });
}

function updateEngineUI() {
  $$('.epill').forEach(p=>{
    p.classList.toggle('active', p.dataset.engine===S.engine);
  });
  $('engine-note').textContent = ENGINE_NOTES[S.engine]||'';
}

document.addEventListener('DOMContentLoaded', init);
