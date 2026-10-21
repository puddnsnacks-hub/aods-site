/* THE DOCUMENTATION HEADER (2026-08-25) — one header, injected into every documentation page.
   WHY THIS EXISTS: audited on the 0740 build, /docs/, /docs/guide/, /docs/templates/ and
   /docs/metadata.html each offered ZERO links out. Four disconnected islands, escapable only by the
   browser's Back button. Back-links patched the hole; this closes it properly — every page now carries
   the same masthead, so every page knows where it is and how to leave.
   IT IS THE PRODUCT HEADER. No new class, no new token, no new CSS: the same .aods-header the system
   ships, with documentation words in it. If it needs a rule that aods.css does not already have, that
   is a finding about the component, not a license to write page CSS.
   THE MEGA MENUS ARE GENERATED from manifest.js, so the menu that documents the components cannot fall
   out of step with the components. */
(function () {
  var M = window.AODS_MANIFEST;
  /* ONLY A TOP-LEVEL HEADER COUNTS. The component reference renders header SPECIMENS — live instances
     of .aods-header inside its entries — and a document-wide query sees those and concludes the page
     already has a masthead. It then ships no header to the one page that documents the header. Scope
     the test to a direct child of <body>: that is what "this page has a masthead" actually means. */
  /* NEVER READ THE DOM AT MODULE SCOPE. The .bundle.html twins inline every script into the head with no
     defer, so this file runs before <body> exists: a header test up here saw an empty document, decided
     the page had none, and then bailed at mount time when it found one — which is why the bundles, the
     copies most likely to be opened on their own, were the last pages still trapped. The test belongs
     where it is used. */
  var hasOwnHeader = function () {
    return !!(document.body && document.body.querySelector(":scope > .aods-header"));
  };

  var esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  };

  /* THE ROOT IS MEASURED, NOT CONFIGURED. Every page already links dist/tokens.css; its href carries
     the exact number of ../ needed to reach the site root from wherever this page lives. Reading it
     means the header works at any depth with nothing to keep in sync — and cannot be wrong on one page
     the way a hand-set data attribute eventually is. */
  var link = document.querySelector('link[href$="dist/tokens.css"]');
  var ROOT;
  if (link) {
    ROOT = link.getAttribute("href").replace(/dist\/tokens\.css$/, "");
  } else {
    /* A .bundle.html has no stylesheet LINK — the whole of dist/ is inlined into it, which is the point
       of a bundle. Fall back to counting the path instead. A flat "../" was wrong for exactly the pages
       that need this most: from /docs/templates/x.bundle.html it pointed at /docs/dashboard.html, a 404
       dressed as a way out. */
    var seg = location.pathname.split("/").filter(Boolean);
    var i = seg.lastIndexOf("docs");
    var up = i < 0 ? 1 : (seg.length - 1 - i);        /* directories between here and the site root */
    ROOT = new Array(up + 1).join("../") || "./";
  }
  var DOCS = ROOT + "docs/", T = ROOT + "templates/", G = DOCS + "guide/";

  /* THE THEME SWITCHER (D51) — a ruled hook, kept to this one place: documentation chrome, not a component and not on any
     template page's own markup. It sets data-theme on <html>, the attribute the build already emits theme blocks for, and nothing
     else: dark stays data-surface="dark" (D10) and the two are independent. The theme is, in order, ?theme=<id> in the URL, the id
     stored under `aods-theme` in localStorage (written only when the visitor changes the control), the house. The house writes no
     attribute. dist/theme.js holds the same order, the identity slots (mark, wordmark, favicon) and window.AODS_THEME; the template
     pages load it. A page that has neither it nor the manifest (the documentation copies of the templates) gets it loaded here. */
  var Theme = (function () {
    var KEY = "aods-theme", started = false;
    var T = function () { return window.AODS_THEME; };
    var data = function () { var MT = (M && M.themes) || {}; return T() ? { list: T().list, house: T().house } : { list: MT.themes || [], house: MT.default }; };
    var ok = function (id) { return data().list.some(function (x) { return x.id === id; }); };
    var read = function () { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
    var write = function (id) { try { localStorage.setItem(KEY, id); } catch (e) {} };
    var attr = function (id) { if (id === data().house || !id) document.documentElement.removeAttribute("data-theme"); else document.documentElement.setAttribute("data-theme", id); };
    var current = null;
    var start = function () {                        /* once the theme list is known */
      if (started || !data().list.length) return;
      started = true;
      if (T()) { current = T().current(); return; }
      var q = new URLSearchParams(location.search).get("theme");
      current = ok(q) ? q : (ok(read()) ? read() : data().house);
      attr(current);
    };
    start();
    var self = {
      current: function () { return current; },
      set: function (id) {
        if (!ok(id)) return;
        current = id;
        if (T()) T().set(id, true); else { attr(id); write(id); }
      },
      /* a native <select> with a visible label: keyboard-operable, and its value is the announcement */
      control: function () {
        var house = data().house, list = data().list.slice().sort(function (a, b) { return (a.id === house ? 0 : 1) - (b.id === house ? 0 : 1) || (a.id < b.id ? -1 : 1); });   /* the house first */
        if (list.length < 2) return "";
        return '<label class="doc-theme"><span class="doc-theme__label">Theme</span><select class="doc-theme__select" name="theme">' +
          list.map(function (x) { return '<option value="' + esc(x.id) + '"' + (x.id === current ? " selected" : "") + ">" + esc(x.name) + "</option>"; }).join("") +
          "</select></label>";
      },
      wire: function (scope) {
        var sel = scope.querySelector(".doc-theme__select");
        if (sel) sel.addEventListener("change", function () { self.set(sel.value); });
      },
      /* run fn once the theme list is known: now, or after dist/theme.js has been loaded */
      ready: function (fn) {
        if (data().list.length) { start(); fn(); return; }
        var sc = document.createElement("script"); sc.src = ROOT + "dist/theme.js";
        sc.onload = function () { start(); fn(); };
        document.head.appendChild(sc);
      }
    };
    return self;
  })();

  var here = (location.pathname.replace(/\/$/, "/index.html").split("/docs/")[1] || "");
  var section =
    here.indexOf("guide/") === 0 ? "guide" :
    here.indexOf("templates/") === 0 ? "templates" :
    here.indexOf("metadata") === 0 ? "reference" :
    here.indexOf("figma") === 0 ? "reference" : "components";

  /* BUILT ONLY WHEN IT IS NEEDED. This all reads window.AODS_MANIFEST, and the template pages do not
     load it — they link tokens.css and aods.js and nothing else. At module scope it threw before the
     strip could mount, so the pages that most needed a way out were the ones that got none. */
  var buildMasthead = function () {
    /* ---- the mega menus, read from the manifest ----
       ONE COLUMN PER FAMILY (2026-09-19). The tiers are retired, and with them the tier-by-family cross
       tab: the families are the grouping now, so each column is one family, in manifest.families order,
       naming its members in their listed order. Members are the records that carry the family, not a
       second list, so a record can never be in the menu under a family it does not claim. */
    var F = M.families || { order: [], members: {} };
    var title = function (f) { return String(f).charAt(0).toUpperCase() + String(f).slice(1); };
    var fams = F.order.slice(), members = {};
    fams.forEach(function (f) { members[f] = []; });
    Object.keys(M.components).forEach(function (k) {
      var c = M.components[k];
      if (!members[c.family]) { members[c.family] = []; fams.push(c.family); }   /* unlisted: last, never dropped */
      members[c.family].push(c.id);
    });
    fams.forEach(function (f) {
      var rank = (F.members || {})[f] || [];
      var at = function (id) { var i = rank.indexOf(id); return i < 0 ? rank.length : i; };
      members[f].sort(function (a, b) { return at(a) - at(b); });
    });
    /* A COLUMN NAMES AT MOST NAME_MEMBERS_MAX. The cap is inclusive: three families have exactly ten
       members and list every one. A longer family lists one fewer and ends on a link to the whole
       section, so the column keeps its height and the rest is one step away. Every member is written
       into the markup; fitMega (below) decides how many show. NAME_MEMBERS_MAX is set beside it. */
    var familyColumn = function (f) {
      var ids = members[f], home = DOCS + "index.html#family-" + f;
      return '<div class="aods-header__mega-column" data-family="' + esc(f) + '">' +
        '<a class="aods-header__mega-heading" href="' + home + '">' + esc(title(f) + " · " + ids.length) + "</a>" +
        '<ul class="aods-header__mega-list">' +
        ids.map(function (id, i) {
          return "<li" + (i >= NAME_MEMBERS_MAX - 1 && ids.length > NAME_MEMBERS_MAX ? " hidden" : "") + '><a class="aods-header__mega-link" href="' +
            DOCS + "index.html#c-" + id + '">' + esc(id) + "</a></li>";
        }).join("") +
        "<li data-more" + (ids.length > NAME_MEMBERS_MAX ? "" : " hidden") + '><a class="aods-header__mega-link" href="' + home + '">all ' + ids.length + " \u2192</a></li>" +
        "</ul></div>";
    };
    var column = function (heading, links, href) {
      return '<div class="aods-header__mega-column">' +
        (href ? '<a class="aods-header__mega-heading" href="' + href + '">' + esc(heading) + "</a>"
              : '<p class="aods-header__mega-heading">' + esc(heading) + "</p>") +
        '<ul class="aods-header__mega-list">' +
        links.map(function (l) {
          return '<li><a class="aods-header__mega-link" href="' + l[1] + '">' + esc(l[0]) + "</a></li>";
        }).join("") + "</ul></div>";
    };

    var megaComponents =
      '<div class="aods-header__mega" id="xdh-c" hidden><div class="aods-header__content">' +
      fams.filter(function (f) { return members[f].length; }).map(familyColumn).join("") + "</div></div>";

    var GUIDE = [["index.html", "Cover"], ["typography.html", "Typography"], ["color.html", "Color"],
      ["space.html", "Measure"], ["components.html", "Components"],
      ["conversational.html", "Conversational"], ["rules.html", "Rules"]];
    var megaGuide =
      '<div class="aods-header__mega" id="xdh-g" hidden><div class="aods-header__content">' +
      column("The style guide · 7", GUIDE.map(function (p) { return [p[1], G + p[0]]; }), G + "index.html") +
      "</div></div>";
    /* REFERENCE GREW A SECOND PAGE (2026-09-04): the metadata reference and the Figma how-to. Two pages is a
       column, not a link, so it takes the same mega as the guide. */
    var REFERENCE = [["metadata.html", "Metadata — what the machine reads"], ["figma.html", "Figma — keeping the library in sync"]];
    var megaReference =
      '<div class="aods-header__mega" id="xdh-r" hidden><div class="aods-header__content">' +
      column("Reference · " + REFERENCE.length, REFERENCE.map(function (p) { return [p[1], DOCS + p[0]]; }), DOCS + "metadata.html") +
      "</div></div>";

    var lockup =
      '<a class="aods-header__lockup" href="' + ROOT + 'index.html">' +
      /* the mark is inline: the sprite carries icons, not the department's logo, and the real header
         markup inlines it too. Lifted verbatim so this is the system's own lockup, not a copy of it. */
      '<svg class="aods-header__logo" viewBox="0 0 48 48" aria-hidden="true"><path d="M2 2H12L46 36V46H36L2 12Z"/><path d="M10 28L20 38L12 46H2V36Z"/><path d="M28 10L36 2H46V12L38 20Z"/></svg>' +
      '<span class="aods-header__brand">AODS</span></a>';

    var nav = [
      ["components", "Components", null, "xdh-c"],
      ["guide", "Guide", null, "xdh-g"],
      ["templates", "Templates", T + "index.html", null],
      ["reference", "Reference", null, "xdh-r"]
    ].map(function (n) {
      var cur = n[0] === section ? ' aria-current="page"' : "";
      return "<li>" + (n[2]
        ? '<a class="aods-header__nav-item" href="' + n[2] + '"' + cur + ">" + n[1] + "</a>"
        : '<button class="aods-header__nav-item" type="button" aria-expanded="false" aria-controls="' +
          n[3] + '"' + cur + ">" + n[1] + "</button>") + "</li>";
    }).join("");

    var search =
      '<form class="aods-header__search" role="search" method="get" action="' + DOCS + 'index.html">' +
      '<input class="aods-input" type="search" name="q" aria-label="Search the system" placeholder="Search the system">' +
      '<button class="aods-button" data-variant="primary" data-icon="only" aria-label="Search" type="submit">' +
      '<svg class="aods-icon aods-button__icon" aria-hidden="true"><use href="#aods-search"></use></svg></button></form>';

    var html =
      '<header class="aods-header">' +
        '<div class="aods-header__utility" data-surface="dark"><div class="aods-header__content">' +
          '<ul class="aods-header__utility-links">' +
            '<li><a class="aods-header__utility-link" href="https://agency.example">agency.example</a></li>' +
            '<li><a class="aods-header__utility-link" href="' + ROOT + 'index.html">Home</a></li>' +
            '<li><a class="aods-header__utility-link" href="' + DOCS + 'index.html#meta">System state</a></li>' +
          "</ul>" + Theme.control() + "</div></div>" +
        '<div class="aods-header__bar"><div class="aods-header__content">' + lockup +
          '<button class="aods-header__menu" type="button" aria-label="Menu" aria-expanded="false">' +
            '<svg class="aods-icon aods-header__menu-open" aria-hidden="true"><use href="#aods-menu"></use></svg>' +
            '<svg class="aods-icon aods-header__menu-close" aria-hidden="true"><use href="#aods-close"></use></svg></button>' +
          '<div class="aods-header__drawer"><nav aria-label="Primary"><ul class="aods-header__nav">' + nav +
          "</ul></nav>" + search + "</div>" +
        "</div></div>" + megaComponents + megaGuide + megaReference +
      "</header>";
    return html;
  };

  /* THE COMPONENTS MENU FITS THE WINDOW, MEASURED (2026-09-19). The header is sticky and the mega hangs
     off it, so a panel taller than the window cannot be scrolled into view: its last rows are simply
     unreachable. Eleven family columns wrap to three rows below about 1400px, and at ten names a column
     that is roughly 1100px tall; at 1024 by 768 the chrome, conversation and layout columns were off the
     bottom. So each time the panel opens, and on resize, every column starts with every name and the
     cap comes down one name at a time until the panel's foot is inside the window. A column that is cut
     ends on "all N", and its heading already links the whole section. A wide window keeps every name.
     Inline in the drawer the panel is a list the drawer scrolls, so there it shows everything. */
  var NAME_MEMBERS_MAX = 10, NAME_MEMBERS_MIN = 3;
  var fitMega = function (mega) {
    if (!mega || mega.hidden) return;
    var cols = [].slice.call(mega.querySelectorAll(".aods-header__mega-column[data-family]"));
    var apply = function (cap) {
      cols.forEach(function (col) {
        var items = [].slice.call(col.querySelectorAll("li:not([data-more])")), more = col.querySelector("li[data-more]");
        var cut = items.length > cap;
        items.forEach(function (li, i) { li.hidden = cut && i >= cap - 1; });
        if (more) more.hidden = !cut;
      });
    };
    var overlay = mega.parentNode && mega.parentNode.classList && mega.parentNode.classList.contains("aods-header");
    if (!overlay) { apply(Infinity); return; }
    for (var cap = NAME_MEMBERS_MAX; cap >= NAME_MEMBERS_MIN; cap--) {
      apply(cap);
      if (mega.getBoundingClientRect().bottom <= window.innerHeight) return;
    }
  };

  /* A TEMPLATE ALREADY HAS A HEADER — AND IT IS THE POINT (2026-08-25, : "even those should have
     the documentation nav, right?"). Yes: opening a template was a dead end. But a template page exists
     to show what a real Agency page looks like, and a second masthead above the one it is demonstrating
     would make the specimen lie about its own top-of-page. So the way out here is a THIN STRIP that
     reads as documentation chrome rather than as part of the page: it sits above everything, does not
     stick, and does not compete with the product header directly beneath it.
     It needs no manifest, which is why the manifest check moved below this branch — the template pages
     link tokens.css and aods.js only. */
  var strip = function () {
    var el = document.createElement("div");
    el.className = "t-docbar";
    el.innerHTML =
      '<div class="t-docbar__in">' +
        '<a href="' + ROOT + 'index.html">&larr; AODS</a>' +
        '<a href="' + T + 'index.html">All templates</a>' +
        '<span class="t-docbar__note">Template preview &mdash; the page below is a specimen of the system</span>' +
      "</div>";
    document.body.insertAdjacentElement("afterbegin", el);
    Theme.ready(function () {
      var c = Theme.control();
      if (c) { el.querySelector(".t-docbar__note").insertAdjacentHTML("beforebegin", c); Theme.wire(el); }
    });
  };

  var mount = function () {
    if (hasOwnHeader()) { if (!document.querySelector(".t-docbar")) strip(); return; }
    if (!M || !M.components) return;                     /* no manifest, no masthead — never a broken one */
    var skip = document.querySelector('a[href^="#"][class*="skip"]');
    var box = document.createElement("div");
    box.innerHTML = buildMasthead();
    var el = box.firstChild;
    if (skip && skip.parentNode === document.body) skip.insertAdjacentElement("afterend", el);
    else document.body.insertAdjacentElement("afterbegin", el);
    /* aods.js binds on DOMContentLoaded; a header inserted after that has to ask for its own wiring.
       init(scope) searches INSIDE the scope — scope.querySelectorAll(".aods-header") — so handing it the
       header itself finds nothing and the megas never open. Hand it the parent. */
    if (window.AODS && typeof window.AODS.init === "function") window.AODS.init(el.parentNode || document);
    Theme.wire(el);
    /* opening is aods.js flipping `hidden`, so watch the attribute rather than the click */
    var mega = el.querySelector("#xdh-c");
    if (mega && window.MutationObserver) {
      new MutationObserver(function () { fitMega(mega); }).observe(mega, { attributes: true, attributeFilter: ["hidden"] });
      window.addEventListener("resize", function () { fitMega(mega); });
    }
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
