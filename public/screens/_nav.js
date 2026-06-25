(function () {
  var PAGE = window.__NB_PAGE || 'home';
  // Pages with no header (transitional)
  var NO_HEADER = { loading: 1, processing: 1 };

  function navTo(target) {
    try { window.parent.postMessage({ type: 'nb-nav', target: target }, '*'); } catch (e) {}
  }
  window.navTo = navTo;

  function toast(msg) {
    var t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#1A3C5E;color:#fff;padding:10px 18px;border-radius:8px;font:600 14px Inter,sans-serif;z-index:9999;box-shadow:0 6px 20px rgba(0,0,0,.2);';
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 2000);
  }

  function buildHeader(active) {
    var isHome = active === 'home', isReports = active === 'reports';
    var homeCls = isHome
      ? 'text-white font-medium border-b-2 border-white pb-1'
      : 'text-white/80 hover:text-white font-medium transition-colors';
    var reportsCls = isReports
      ? 'text-white font-medium border-b-2 border-white pb-1'
      : 'text-white/80 hover:text-white font-medium transition-colors';
    return ''
      + '<header style="background:#1A3C5E" class="text-white sticky top-0 w-full z-50 shadow-md">'
      + '  <div class="flex justify-between items-center w-full px-8 max-w-7xl mx-auto h-20">'
      + '    <div class="text-2xl font-bold tracking-tight" style="cursor:pointer" data-nb="home">NeedBridge</div>'
      + '    <nav class="hidden md:flex gap-8 items-center">'
      + '      <a class="' + homeCls + '" href="#" data-nb="home">Home</a>'
      + '      <a style="background:#F57C00" class="text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90 transition" href="#" data-nb="submit">Submit Need</a>'
      + '      <a class="' + reportsCls + '" href="#" data-nb="reports">Reports</a>'
      + '    </nav>'
      + '    <div class="flex items-center gap-4">'
      + '      <div class="hidden md:flex items-center rounded-full p-1 text-sm font-medium" style="background:#284E75">'
      + '        <button class="bg-white px-4 py-1.5 rounded-full shadow-sm" style="color:#1A3C5E">EN</button>'
      + '        <button class="text-white px-4 py-1.5 rounded-full hover:bg-white/10">FIL</button>'
      + '      </div>'
      + '    </div>'
      + '  </div>'
      + '</header>';
  }

  function activeName() {
    if (PAGE === 'home') return 'home';
    if (PAGE === 'reports') return 'reports';
    if (PAGE === 'submit') return 'submit';
    return ''; // dashboard, ai have no underline match
  }

  function mountHeader() {
    var mount = document.body && document.body.querySelector('!--nav-mount--');
    // The placeholder comment is not directly queryable; find by walking.
    var found = null;
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_COMMENT, null);
    while (walker.nextNode()) {
      if (walker.currentNode.nodeValue && walker.currentNode.nodeValue.indexOf('nav-mount') >= 0) {
        found = walker.currentNode;
        break;
      }
    }
    var html = buildHeader(activeName());
    var wrap = document.createElement('div');
    wrap.innerHTML = html;
    var headerEl = wrap.firstChild;
    if (found && found.parentNode) {
      found.parentNode.insertBefore(headerEl, found);
      found.parentNode.removeChild(found);
    } else {
      document.body.insertBefore(headerEl, document.body.firstChild);
    }
    // Wire nav links
    headerEl.querySelectorAll('[data-nb]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        navTo(el.getAttribute('data-nb'));
      });
    });
  }

  function addBackLink() {
    var main = document.querySelector('main');
    if (!main) return;
    var back = document.createElement('a');
    back.href = '#';
    back.textContent = '← Back to Home';
    back.style.cssText = 'display:inline-block;margin:16px 0 0 24px;color:#1A3C5E;font-weight:600;font-family:Inter,sans-serif;text-decoration:none;font-size:14px;';
    back.addEventListener('mouseenter', function () { back.style.textDecoration = 'underline'; });
    back.addEventListener('mouseleave', function () { back.style.textDecoration = 'none'; });
    back.addEventListener('click', function (e) { e.preventDefault(); navTo('home'); });
    main.parentNode.insertBefore(back, main);
  }

  // Per-page wiring runs after DOM ready
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  function findButtonsByText(rx) {
    var out = [];
    document.querySelectorAll('button, a').forEach(function (b) {
      if (rx.test((b.textContent || '').trim())) out.push(b);
    });
    return out;
  }

  function wireHome() {
    findButtonsByText(/^Submit a Need$/).forEach(function (b) {
      b.addEventListener('click', function (e) { e.preventDefault(); navTo('submit'); });
    });
    findButtonsByText(/^View Reports$/).forEach(function (b) {
      b.addEventListener('click', function (e) { e.preventDefault(); navTo('reports'); });
    });
    findButtonsByText(/^View All/).forEach(function (b) {
      b.addEventListener('click', function (e) { e.preventDefault(); navTo('reports'); });
    });
    // Each submission card -> AI response
    document.querySelectorAll('section .grid > div').forEach(function (card) {
      if (card.querySelector('h3')) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function () { navTo('ai'); });
      }
    });
  }

  function wireSubmit() {
    addBackLink();
    findButtonsByText(/^(Continue to AI Plan|Analyze with NeedBridge)/i).forEach(function (b) {
      b.addEventListener('click', function (e) { e.preventDefault(); navTo('loading'); });
    });
  }

  function wireLoading() {
    setTimeout(function () { navTo('ai'); }, 3500);
  }

  function wireProcessing() {
    setTimeout(function () { navTo('ai'); }, 3500);
  }

  function wireAI() {
    addBackLink();
    findButtonsByText(/Flag for/i).forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        var subject = encodeURIComponent('NeedBridge Escalation: Clogged Drainage - Barangay 123');
        var body = encodeURIComponent('Please find attached the AI-generated action plan for escalation review.\n\nIssue: Clogged Drainage\nSeverity: High\nLocation: Barangay 123\n\n— Sent via NeedBridge');
        window.location.href = 'mailto:engineering@city.gov.ph?subject=' + subject + '&body=' + body;
      });
    });
    findButtonsByText(/View Full Build Guide/i).forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        var guide = document.getElementById('nb-build-guide');
        if (!guide) {
          guide = document.createElement('div');
          guide.id = 'nb-build-guide';
          guide.style.cssText = 'margin-top:24px;background:#fff;border:1px solid #c3c6cf;border-radius:12px;padding:24px;font-family:Inter,sans-serif;';
          guide.innerHTML = '<h3 style="font-size:20px;font-weight:700;color:#1A3C5E;margin-bottom:12px;">Full Build Guide</h3>'
            + '<ol style="list-style:decimal;padding-left:20px;line-height:1.7;color:#43474e;font-size:15px;">'
            + '<li>Secure the perimeter with cones and warning signage.</li>'
            + '<li>Use the heavy-duty drain snake to clear the primary blockage.</li>'
            + '<li>Inspect joints; apply hydraulic cement to any cracked sections.</li>'
            + '<li>Embed reinforcing mesh over patched joints before final smoothing.</li>'
            + '<li>Flush the line with water to confirm flow is restored.</li>'
            + '<li>Document the repair with photos and update the report status.</li>'
            + '</ol>';
          document.querySelector('main').appendChild(guide);
        }
        guide.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
    findButtonsByText(/Search on Shopee/i).forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        window.open('https://shopee.ph/search?keyword=drain+snake+hydraulic+cement', '_blank', 'noopener');
      });
    });
    findButtonsByText(/^Download PDF|^PDF$/i).forEach(function (b) {
      b.addEventListener('click', function (e) { e.preventDefault(); window.print(); });
    });
    findButtonsByText(/Share(\s+Plan)?$/i).forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        var url = (window.parent && window.parent.location && window.parent.location.href) || window.location.href;
        try {
          navigator.clipboard.writeText(url).then(function () { toast('Link copied'); });
        } catch (_) { toast('Link copied'); }
      });
    });
  }

  function wireReports() {
    document.querySelectorAll('main article').forEach(function (card) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function () { navTo('ai'); });
    });
    findButtonsByText(/Load More Reports/i).forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        var grid = document.querySelector('main section.grid');
        if (!grid || grid.dataset.loaded) return;
        grid.dataset.loaded = '1';
        var extras = [
          { sev: 'Medium', id: '#NB-2024-078', title: 'Damaged Footbridge Railing', desc: 'Wooden railings on the Purok 3 footbridge are loose and pose a fall risk.', loc: 'Barangay Mabini', date: 'Oct 19, 2024', color: '#F9A825', bg: 'bg-yellow-50', tc: 'text-medium-priority' },
          { sev: 'Low', id: '#NB-2024-076', title: 'Faded Pedestrian Markings', desc: 'Crosswalk paint at the school zone has faded and needs repainting.', loc: 'Barangay Poblacion', date: 'Oct 18, 2024', color: '#388E3C', bg: 'bg-green-50', tc: 'text-low-priority' },
          { sev: 'High', id: '#NB-2024-072', title: 'Open Manhole Cover', desc: 'A manhole near the public market is missing its cover, creating a serious hazard.', loc: 'Barangay San Roque', date: 'Oct 17, 2024', color: '#C62828', bg: 'bg-red-50', tc: 'text-high-priority' }
        ];
        extras.forEach(function (e) {
          var a = document.createElement('article');
          a.className = 'bg-surface border-y border-r border-outline-variant rounded-lg flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-200';
          a.style.borderLeft = '4px solid ' + e.color;
          a.style.cursor = 'pointer';
          a.innerHTML = '<div class="p-6 flex flex-col gap-4 flex-grow">'
            + '<div class="flex justify-between items-start mb-2"><div class="flex gap-3 items-center">'
            + '<span class="' + e.bg + ' text-[13px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wide" style="color:' + e.color + '">' + e.sev + '</span>'
            + '<span class="text-xs text-outline font-medium">ID: ' + e.id + '</span></div></div>'
            + '<div><h3 class="text-[17px] font-semibold text-on-surface mb-2 leading-snug">' + e.title + '</h3>'
            + '<p class="text-[14px] text-on-surface-variant line-clamp-2 leading-relaxed">' + e.desc + '</p></div>'
            + '<div class="mt-auto pt-5 border-t border-outline-variant flex justify-between items-center text-xs text-outline font-medium">'
            + '<span>📍 ' + e.loc + '</span><span>' + e.date + '</span></div></div>';
          a.addEventListener('click', function () { navTo('ai'); });
          grid.appendChild(a);
        });
        b.style.display = 'none';
      });
    });
  }

  function wireDashboard() {
    // Login gate
    var KEY = 'nb-coordinator-auth';
    if (sessionStorage.getItem(KEY) !== '1') {
      var overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;background:#F5F6FA;z-index:9998;display:flex;align-items:center;justify-content:center;font-family:Inter,sans-serif;';
      overlay.innerHTML = ''
        + '<form id="nb-login" style="background:#fff;padding:36px;border-radius:14px;box-shadow:0 10px 30px rgba(0,0,0,.08);width:380px;max-width:90%;border-top:6px solid #F57C00;">'
        + '<h2 style="font-size:22px;font-weight:700;color:#1A3C5E;margin-bottom:6px;">Coordinator Sign In</h2>'
        + '<p style="color:#6b7280;font-size:14px;margin-bottom:20px;">Access restricted to authorized barangay coordinators.</p>'
        + '<label style="display:block;font-size:13px;font-weight:600;color:#1A3C5E;margin-bottom:6px;">Email</label>'
        + '<input id="nb-email" type="email" required style="width:100%;padding:10px 12px;border:1px solid #c3c6cf;border-radius:8px;margin-bottom:14px;font-size:14px;" placeholder="coordinator@needbridge.ph"/>'
        + '<label style="display:block;font-size:13px;font-weight:600;color:#1A3C5E;margin-bottom:6px;">Password</label>'
        + '<input id="nb-pw" type="password" required style="width:100%;padding:10px 12px;border:1px solid #c3c6cf;border-radius:8px;margin-bottom:14px;font-size:14px;"/>'
        + '<div id="nb-err" style="color:#C62828;font-size:13px;margin-bottom:10px;display:none;">Invalid credentials.</div>'
        + '<button type="submit" style="width:100%;padding:12px;background:#F57C00;color:#fff;border:none;border-radius:8px;font-weight:700;font-size:15px;cursor:pointer;">Sign In</button>'
        + '</form>';
      document.body.appendChild(overlay);
      overlay.querySelector('#nb-login').addEventListener('submit', function (e) {
        e.preventDefault();
        var em = overlay.querySelector('#nb-email').value.trim().toLowerCase();
        var pw = overlay.querySelector('#nb-pw').value;
        if (em === 'coordinator@needbridge.ph' && pw === 'needbridge2026') {
          sessionStorage.setItem(KEY, '1');
          overlay.remove();
          wireDashboardRows();
        } else {
          overlay.querySelector('#nb-err').style.display = 'block';
        }
      });
      return;
    }
    wireDashboardRows();
  }

  function wireDashboardRows() {
    document.querySelectorAll('main .grid.grid-cols-1').forEach(function (row) {
      if (row.className.indexOf('md:grid-cols-[80px') >= 0) {
        row.addEventListener('click', function () { navTo('ai'); });
      }
    });
    findButtonsByText(/Generate Report/i).forEach(function (b) {
      b.addEventListener('click', function (e) { e.preventDefault(); window.print(); });
    });
  }

  ready(function () {
    if (!NO_HEADER[PAGE]) mountHeader();
    if (PAGE === 'home') wireHome();
    else if (PAGE === 'submit') wireSubmit();
    else if (PAGE === 'loading') wireLoading();
    else if (PAGE === 'processing') wireProcessing();
    else if (PAGE === 'ai') wireAI();
    else if (PAGE === 'reports') wireReports();
    else if (PAGE === 'dashboard') wireDashboard();
  });
})();