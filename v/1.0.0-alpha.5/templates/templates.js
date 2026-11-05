/* Templates landing page. The same behavior as the component and token reference (documentation/doc.js):
   sections, entries and nav groups fold; the Contents menu opens the nav on phones; a link to #t-<slug> opens its
   entry. "View template" opens the page in a new tab that can close itself and return here. */
(function () {
  "use strict";

  function fold(head, body, label, count, startOpen, onToggle) {
    var btn = document.createElement("button");
    btn.type = "button"; btn.className = "toggle"; btn.setAttribute("aria-controls", body.id);
    btn.innerHTML = '<span class="chev" aria-hidden="true"></span><span class="toggle__label"></span>' +
                    (count ? '<span class="count"></span>' : "");
    btn.querySelector(".toggle__label").textContent = label;
    if (count) btn.querySelector(".count").textContent = count;
    head.textContent = ""; head.appendChild(btn);
    function set(open) { btn.setAttribute("aria-expanded", String(open)); body.hidden = !open; if (onToggle) onToggle(open); }
    set(startOpen);
    btn.addEventListener("click", function () {
      var was = btn.getBoundingClientRect().top;
      set(body.hidden);
      var now = btn.getBoundingClientRect().top;
      if (now !== was) window.scrollBy(0, now - was);
    });
    return set;
  }

  /* sections: open, so every template is one click away */
  var sections = {};
  document.querySelectorAll("section.doc-section").forEach(function (sec) {
    var head = sec.querySelector(":scope > h2"); if (!head) return;
    var body = document.createElement("div"); body.className = "sec-body"; body.id = sec.id + "-body";
    var n = head.nextSibling; while (n) { var next = n.nextSibling; body.appendChild(n); n = next; }
    sec.appendChild(body);
    var count = sec.querySelectorAll("article.entry").length;
    sections[sec.id] = fold(head, body, head.textContent.trim(), count + (count === 1 ? " template" : " templates"), true);
  });

  /* entries: closed; opening one loads its previews */
  var entries = {};
  document.querySelectorAll("article.entry").forEach(function (entry) {
    var head = entry.querySelector(":scope > .entry-head > div > h3"); if (!head) return;
    var wrap = entry.querySelector(":scope > .entry-head");
    var body = document.createElement("div"); body.className = "entry-body"; body.id = entry.id + "-body";
    var n = wrap.nextSibling; while (n) { var next = n.nextSibling; body.appendChild(n); n = next; }
    entry.appendChild(body);
    entries[entry.id] = fold(head, body, head.textContent.trim(), "", false);
  });

  /* nav groups, as on the reference page */
  var navEl = document.querySelector(".doc-nav"), groups = [], current = null;
  Array.prototype.slice.call(navEl.children).forEach(function (el) {
    if (el.tagName === "H2" && el.classList.contains("nav-solo")) { current = null; return; }
    if (el.tagName === "H2") { current = { head: el, links: [] }; groups.push(current); }
    else if (current && el.tagName === "A") current.links.push(el);
  });
  groups.forEach(function (g, i) {
    var list = document.createElement("div"); list.className = "nav-group"; list.id = "nav-group-" + i;
    g.head.after(list); g.links.forEach(function (a) { list.appendChild(a); });
    var label = g.head.textContent.trim(), target = g.head.dataset.section || "";
    var btn = document.createElement("button");
    btn.type = "button"; btn.className = "toggle"; btn.setAttribute("aria-controls", list.id);
    btn.setAttribute("aria-label", label + " links");
    btn.innerHTML = '<span class="chev" aria-hidden="true"></span>';
    g.head.textContent = ""; g.head.appendChild(btn);
    var name = document.createElement("a"); name.className = "nav-head__link"; name.href = "#" + target; name.textContent = label;
    g.head.appendChild(name);
    g.target = target;
    g.set = function (open) { btn.setAttribute("aria-expanded", String(open)); list.hidden = !open; };
    g.set(true);
    btn.addEventListener("click", function () { g.set(list.hidden); });
  });

  /* the Contents menu on phones */
  var menu = document.querySelector(".doc-menu"), scrim = document.querySelector(".doc-scrim");
  var root = document.querySelector(".doc") || document.body;
  function setNav(open) {
    root.dataset.nav = open ? "open" : "";
    if (menu) menu.setAttribute("aria-expanded", String(open));
    if (scrim) scrim.hidden = !open;
    if (open) { var f = navEl.querySelector("a, button"); if (f) f.focus(); }
  }
  setNav(false);
  if (menu) menu.addEventListener("click", function () { setNav(root.dataset.nav !== "open"); });
  if (scrim) scrim.addEventListener("click", function () { setNav(false); });
  addEventListener("keydown", function (e) { if (e.key === "Escape" && root.dataset.nav === "open") { setNav(false); if (menu) menu.focus(); } });
  navEl.addEventListener("click", function (e) { if (e.target.closest("a[href^='#']")) setNav(false); });

  /* a link to a template opens its section and entry, then lands on it */
  function reveal(hash) {
    var t = hash && document.getElementById(hash.slice(1)); if (!t) return;
    var sec = t.closest("section.doc-section"); if (sec && sections[sec.id]) sections[sec.id](true);
    var ent = t.closest("article.entry"); if (ent && entries[ent.id]) entries[ent.id](true);
    requestAnimationFrame(function () { t.scrollIntoView({ block: "start" }); if (ent) ent.focus({ preventScroll: true }); });
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[href^='#']"); if (!a) return;
    var id = a.getAttribute("href"); if (id.length < 2 || !document.getElementById(id.slice(1))) return;
    e.preventDefault(); history.pushState(null, "", id); reveal(id);
  });
  addEventListener("hashchange", function () { reveal(location.hash); });
  if (location.hash) reveal(location.hash);

  /* View template: a new tab that keeps a way back here */
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[data-tpl-open]"); if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
    var w = window.open(a.href, "_blank");      /* keeps window.opener, so the template's Close button can return */
    if (w) { e.preventDefault(); try { w.focus(); } catch (err) {} }
  });
})();
