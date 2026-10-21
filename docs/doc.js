/* The documentation page builds itself from dist/. It types no token value, no
   component list, no rule — add a token or a component, rebuild, it appears. */
const M = window.AODS_MANIFEST, T = window.AODS_TOKENS, P = window.AODS_PALETTE, S = window.AODS_SPECIMENS || {};
/* PENDING PARENT FIX PB1: the a11y field is a checklist of records (check, behavior, app or review, with its WCAG
   criteria), not prose, and the source system still prints it as prose ("[object Object]"). This renderer prints each
   as its kind, its text and its criteria, and goes when the source system takes the fix and the two converge (D36). */
const a11yList = items => (Array.isArray(items) ? items : [items]).map(it => {
  if (typeof it === "string") return esc(it);
  const kind = ["check", "behavior", "app", "review"].find(k => k in it) || Object.keys(it)[0];
  const w = [].concat(it.wcag || []); const wcag = w.length ? ` <span style="opacity:.7">WCAG ${w.map(esc).join(", ")}</span>` : "";
  return `<span style="display:block;overflow-wrap:anywhere"><b>${esc(kind)}</b> ${esc(String(it[kind]))}${wcag}</span>`;
}).join("");
/* Every component the registry marks dark-capable, as a selector — used to stamp the dark clone. */
const PINNED_LIGHT = '[data-surface="light"], [data-panel="light"], .aods-header__mega, .aods-header__menu';
const DARK_SEL = Object.values(M.components || {}).filter(x => (x.ground || []).includes("dark") && x.id !== "ground")   /* a ground is a section: never stamped (P3) */.flatMap(x => (x.class || "").split("|").map(k => "." + k.trim())).filter(k => k.length > 1).join(",");
const $ = (s, r = document) => r.querySelector(s);
const h = (tag, attrs = {}, html = "") => { const e = document.createElement(tag); for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v); e.innerHTML = html; return e; };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
/* THE FAMILIES ARE DATA (2026-09-19). The tiers are retired; components now group by family, and the
   order, the gloss and the members all come from manifest.families (index/families.json), so a family
   added or reordered there reorders this page with no edit here. The one family named below is `conversation`,
   for what only its section carries: the extra rules in its opening line, and the whole-exchange demo.
   A record whose family is not in the order still renders, in a group of its own at the end, because a
   component the page silently drops is worse than one it files oddly. */
const FAM = M.families || { order: [], gloss: {}, members: {} };
const famTitle = f => String(f).charAt(0).toUpperCase() + String(f).slice(1);
const famGloss = f => { const g = (FAM.gloss || {})[f] || ""; return g ? g.charAt(0).toUpperCase() + g.slice(1) + "." : ""; };
const famId = f => "family-" + f;
const byFamily = (() => {
  const out = new Map(FAM.order.map(f => [f, []]));
  for (const c of Object.values(M.components)) { if (!out.has(c.family)) out.set(c.family, []); out.get(c.family).push(c); }
  for (const [f, list] of out) {
    const rank = (FAM.members || {})[f] || [];
    const at = c => { const i = rank.indexOf(c.id); return i < 0 ? rank.length : i; };
    list.sort((a, b) => at(a) - at(b));   /* stable: an unlisted member keeps manifest order, after the listed ones */
  }
  return out;
})();

// ---- masthead
$("#ver").textContent = `v${M.version} · built ${M.generated}`;
$("#counts").textContent = `${M.counts.tokens} tokens · ${M.counts.components} components · ${M.counts.faces} typefaces · ${M.lint.errors.length} lint errors · ${M.lint.warnings.length} warnings`;

// ---- laws: manifest.laws, one sentence each, grouped by topic, with the gate that checks it
const rules = $("#rule-list");
for (const t of M.laws.topics) {
  const rows = M.laws.laws.filter(l => l.topic === t.id);
  if (!rows.length) continue;
  rules.append(h("li", { class: "law-topic", id: "law-" + t.id }, `<b>${esc(t.id)}</b><div><span>${esc(t.gloss)}</span></div>`));
  for (const l of rows) {
    const g = [].concat(l.gate || []).join(" ");
    rules.append(h("li", { id: "law-" + l.id }, `<b>${esc(g || "—")}</b><div><span>${esc(l.law)}</span>
  ${l.ok ? `<pre class="ex ok"><span class="ex-tag">passes</span>${esc(l.ok)}</pre>` : ""}${l.bad ? `<pre class="ex bad"><span class="ex-tag">fails</span>${esc(l.bad)}</pre>` : ""}</div>`));
  }
}

// ---- tiers
const count = tier => Object.values(T).filter(t => t.tier === tier).length;
$("#tier-grid").innerHTML = [["g", "global", "Literals. Hex, px, ms, a family name. Nothing outside tokens.css may bind one."],
  ["s", "semantic", "Intent. References g. Carries the light/dark flip — the only tier that knows about ground."],
  ["c", "component", "Contract. References s. The only tier a component stylesheet may bind."]]
  .map(([k, n, d]) => `<div class="tier"><h3>${k}- · ${n}</h3><p>${d}</p><span class="n">${count(k)} tokens · --${k}-*</span></div>`).join("");

// ---- color ramps: from palette.js, never typed here
const fams = $("#families");
const meta = {
  "brand-primary": "Identity primary — surfaces and structure. The dark grounds live here (80 page · 70 raised · 90 sunken).",
  "brand-vivid": "Identity vivid — action and links. Step 50 is the primary button. Step 40 is the emphasis edge.",
  "brand-accent": "Identity accent — eyebrows, rules, secondary identity. Never a control fill.",
  "brand-gray": "The one gray. Text, and light-ground borders (10 on page/sunken, 20 on raised).",
  page: "Universal neutral. 0 white · 5 page · 10 sunken · 100 black. Never re-hued.",
  focus: "Reserved. Focus only, off-ladder. 60 on light, 30 on dark.",
  emergency: "Status · interrupt rank 1 of 5", error: "Status · rank 2", warning: "Status · rank 3", success: "Status · rank 4", info: "Status · rank 5",
};
const hex2rgb = x => [1, 3, 5].map(i => parseInt(x.slice(i, i + 2), 16) / 255);
const lin = c => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
const Y = x => { const [r, g, b] = hex2rgb(x).map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const ratio = (a, b) => { const x = Y(a) + 0.05, y = Y(b) + 0.05; return (x > y ? x / y : y / x).toFixed(2); };
for (const fam of Object.keys(meta).filter(f => P[f])) {
  const steps = Object.entries(P[fam]);
  const sec = h("section", { class: "family" }, `<h3>${fam}</h3><p class="path">g.color.${fam}.* · ${steps.length} steps</p><p class="blurb" style="margin:0 0 8px">${meta[fam]}</p>`);
  const ramp = h("div", { class: "ramp " + (steps.length === 4 ? "short" : steps.length === 2 ? "two" : "") });
  for (const [step, hex] of steps) {
    const n = +step, dark = n < 50 || (fam === "page" && n < 100);
    const sw = h("div", { class: "swatch", style: `background:${hex};color:${dark ? "#000" : "#fff"}` },
      `<b>${step}</b><span>${hex.toUpperCase()}<br>white ${ratio(hex, "#ffffff")}<br>black ${ratio(hex, "#000000")}</span>`);
    ramp.append(sw);
  }
  sec.append(ramp); fams.append(sec);
}

// ---- semantic table
const sbody = $("#s-table tbody");
for (const [name, t] of Object.entries(T).filter(([, t]) => t.tier === "s")) {
  const chip = v => t.type === "color" && /^#|^rgb/.test(v) ? `<span class="chip" style="background:${v}"></span>` : "";
  sbody.append(h("tr", {}, `<td>${t.cssVar}</td><td>${esc(t.raw)}</td><td>${chip(t.light)}${esc(t.light)}</td><td>${t.flips ? chip(t.dark) + esc(t.dark) : "<span style='opacity:.4'>same</span>"}</td><td class="d">${esc(t.description || "")}</td>`));
}

// ---- components at a glance: one row per component, the facts a builder needs before reading any CSS
const idx = $("#index-table tbody");
for (const c of [...byFamily.values()].flat()) {
  const dark = (c.ground || ["light"]).includes("dark") ? (c.darkTokens ? "partial" : "yes") : "no";
  const radius = c.tokens.some(v => { const t = Object.values(T).find(x => x.cssVar === v); return t && /radius/.test(v) && t.light !== "0"; }) ? "yes" : "0";
  idx.append(h("tr", {}, `<td><a href="#c-${c.id}">${c.id}</a></td><td class="d"><a href="#${famId(c.family)}">${esc(c.family)}</a></td><td class="d">${dark}</td><td class="d">${radius}</td><td class="d">${(c.composes || []).join(", ") || "—"}</td><td class="d">${Object.keys(c.props || {}).filter(k => !k.startsWith("__")).join(", ") || "—"}</td><td class="d">${c.tokens.length}</td>`));
}
// ---- patterns: rulings that live on a component, as data
const pat = $("#patterns-list");
for (const [cid, list] of Object.entries(M.patterns || {})) {
  // a pattern MAY carry markup: a pairing that lives at body level has no single component whose
  // own html example could ever hold it, so the starter hangs off the rule that describes it.
  const sec = h("div", { class: "panel", style: "margin-bottom:16px" }, `<h4>${cid}</h4><dl>${list.map(p =>
    `<dt>${esc(p.id)}</dt><dd style="font-family:inherit">${esc(p.rule)}`
    + (p.html ? `<pre class="pat-starter"><code>${esc(p.html)}</code></pre>` : "")
    + `</dd>`).join("")}</dl>`);
  pat.append(sec);
}

// ---- facets (2026-08-25). Three things a reader scans for: what KIND of component it is (the
// family, authored in the registry so it is system data, not a docs opinion), whether it has a dark
// variant, and whether it is built out of other components. Everything but the family is derived,
// so a component cannot claim a facet its registry entry does not support.
/* A configurator is documentation: it says what is possible, and refuses what is not. Where a component has
   one, it is linked from the entry itself and from the menu, directly under the component (2026-08-25). */
const TOOLS = {};   /* build-a-card is parked in /review until it ships — nothing links to it from here. */
const facetsOf = c => {
  const f = [];
  if (c.family) f.push(c.family);
  if ((c.ground || ["light"]).includes("dark")) f.push("dark");
  if ((c.composes || []).length) f.push("composed");
  return f;
};
/* the family is already the entry's tag line and its section, so its chip would say it a third time (2026-09-19) */
const facetChips = c => { const f = facetsOf(c).filter(x => x !== c.family); return !f.length ? "" :
  `<div class="aods-chip-group entry-facets" aria-label="what this component is">` + f.map(x => `<span class="aods-chip">${esc(x)}</span>`).join("") + `</div>`; };

// ---- components
const nav = $("#nav-components");
const host = $("#components-host");
/* ONE SECTION PER FAMILY, in manifest order (2026-09-19). The section's name is the family's, and its
   opening line is the family's gloss: what the user does with everything in it. */
/* What a family's gloss cannot say. The conversational family keeps the rules its old section opened
   with, because the records still hold them: conv-thread's notes make it the radius exception,
   conv-source's make brand-accent a single use. The shared block and the light-only ground are read
   from the members, so the sentence goes the day either stops being true. */
const FAMILY_MORE = {
  conversation: list => {
    const blocks = [...new Set(list.map(c => c.block || `c.${c.id}.*`))];
    const lightOnly = list.every(c => !(c.ground || []).includes("dark"));
    return "A mini system inside the system. The radius exception (<code>s.radius.conv-*</code>): here the corner carries meaning. " +
      "Tones are brand-gray and brand-vivid; brand-accent appears exactly once, on the source marker." +
      (blocks.length === 1 ? ` One shared token block, <code>${esc(blocks[0])}</code>, parts prefixed by component.` : "") +
      (lightOnly ? " Light ground only." : "");
  }
};
for (const [fam, list] of byFamily) {
  if (!list.length) continue;
  /* the menu heading is the SECTION's name, and the link under it is that section's landing —
     every heading in the menu has a home (2026-08-25). */
  const famName = famTitle(fam);
  nav.append(h("h2", { "data-section": famId(fam) }, famName));
  const more = FAMILY_MORE[fam] ? " " + FAMILY_MORE[fam](list) : "";
  const sec = h("section", { class: "doc-section", id: famId(fam) }, `<h2>${esc(famName)}</h2><p class="blurb">${esc(famGloss(fam))}${more}</p>`);
  /* The collapsed section is an index, so it names what is in it. Nav chips, not prose: 22 component
     names read in one sweep where a sentence has to be parsed. Built from the same registry as the
     entries below, so the strip cannot drift from the section (2026-08-25). */
  const strip = h("div", { class: "aods-chip-group sec-chips", "aria-label": `${famName}, by component` },
    list.map(c => `<a class="aods-chip" href="#c-${c.id}" data-facets="${facetsOf(c).join(" ")}">${esc(c.id)}</a>`).join(""));

  /* A facet earns a filter chip only where it divides this family: one every component has narrows
     nothing, and one no component has is a dead control. */
  const tally = {};
  list.forEach(c => facetsOf(c).forEach(f => { tally[f] = (tally[f] || 0) + 1; }));
  const useful = [...FAM.order, "dark", "composed"].filter(f => tally[f] && tally[f] < list.length);
  /* One control that hides seven of eight chips is not a filter, it is a trap door: a bar needs at
     least two ways to cut the family before it earns its space. */
  if (useful.length > 1) {
    const bar = h("div", { class: "sec-filters" },
      `<p class="filter-label" id="fl-${fam}">Filter</p>` +
      `<div class="aods-chip-group" role="group" aria-labelledby="fl-${fam}">` +
      `<button type="button" class="aods-chip" aria-pressed="true" data-facet="*">All<span class="facet-n">${list.length}</span></button>` +
      useful.map(f => `<button type="button" class="aods-chip" aria-pressed="false" data-facet="${f}">${esc(f)}<span class="facet-n">${tally[f]}</span></button>`).join("") +
      `</div><p class="filter-count" role="status"></p>`);
    const count = bar.querySelector(".filter-count");
    const all = bar.querySelector('[data-facet="*"]');
    /* RULING 2026-08-25: the filter outlives the fold. The strip is the closed section's list and the
       entries are the open one, so the SAME filter narrows whichever is showing — a bar that stayed on
       screen while the thing it filtered went away was the bug. Because the open list can be narrowed,
       there has to be a way back to all of it: that is the All chip, and it is pressed whenever nothing
       else is. */
    const apply = () => {
      const on = [...bar.querySelectorAll('button[data-facet]:not([data-facet="*"])')]
        .filter(b => b.getAttribute("aria-pressed") === "true").map(b => b.dataset.facet);
      const match = el => on.every(f => (el.dataset.facets || "").split(" ").includes(f));
      let shown = 0;
      strip.querySelectorAll("a").forEach(a => { const ok = match(a); a.hidden = !ok; if (ok) shown++; });
      /* The list SHRINKS rather than dimming: the point of a filter is a short list to read, and a
         disabled row still costs the eye a stop. The count is what says something is hidden. */
      sec.querySelectorAll("article.entry").forEach(e => { e.hidden = on.length ? !match(e) : false; });
      count.textContent = on.length ? `${shown} of ${list.length}` : "";
      bar.dataset.on = on.length ? "yes" : "";
      all.setAttribute("aria-pressed", String(!on.length));
    };
    bar.addEventListener("click", e => {
      const b = e.target.closest("button[data-facet]"); if (!b) return;
      if (b === all) bar.querySelectorAll('button[data-facet]').forEach(x => x.setAttribute("aria-pressed", "false"));
      else b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") === "true" ? "false" : "true");
      apply();
    });
    sec.append(bar);
  }
  sec.append(strip);
/* ---- docket: what is filed against a component, for the maintainer only.
   It used to live in the summary, which is the field that ships into the agent contract - so an
   open defect was reaching build agents as guidance, and the reasonable reading of a described
   defect is to work around it. R31 now keeps the two apart. The maintainer still needs to see it,
   and this is the page the maintainer reads, so it renders here and nowhere else. */
const docket = c => !(c.docket || []).length ? "" :
  `<div class="docket">${c.docket.map(d => `
     <p class="docket-head"><span class="docket-kind" data-kind="${esc(d.kind || "item")}">${esc(d.kind || "item")}</span>
        <span class="docket-id">${esc(d.id)}</span> · filed ${esc(d.filed)}${d.state ? " · " + esc(d.state) : ""}</p>
     ${d.operator ? `<p class="docket-quote">&ldquo;${esc(d.operator)}&rdquo;</p>` : ""}
     <p class="docket-note">${esc(d.note || "")}</p>`).join("")}</div>`;

/* ---- summary, then where / how many / never, then picks (2026-09-19). The summary is one sentence -
   what the component IS. The rules it used to carry are typed fields now and render right under it, so
   a reader who stops at the summary still meets them. `picks` says which value of a prop to use when. */
/* place, count and never (2026-09-19): the rules a record's prose `notes` used to carry, as data. Written
   out in words here; the field names and the page gate that checks each are shown beside them. */
const RULE_WORDS = { in: "in", notIn: "never in", on: "on", first: "first in", last: "last in", before: "before",
  after: "after", notAdjacent: "never next to" };
const placeText = p => {
  if (!p) return "";
  const out = Object.entries(p).filter(([k]) => k !== "gate" && k !== "otherwise")
    .map(([k, v]) => `${RULE_WORDS[k] || k} ${[].concat(v).join(" or ")}`);
  if (p.otherwise) out.push("otherwise " + placeText(p.otherwise));
  return out.join(" · ");
};
const countText = c => [].concat(c || []).map(x => {
  const n = x.min != null && x.max != null ? (x.min === x.max ? `${x.min}` : `${x.min} to ${x.max}`)
          : x.max != null ? `at most ${x.max}` : `at least ${x.min}`;
  return `${n}${x.of ? " " + x.of : ""} per ${x.per}`;
}).join(" · ");
const gatesOf = (...fs) => [...new Set(fs.flatMap(f => [].concat(f || []).flatMap(x => [].concat((x && x.gate) || []))))];
const rulesLines = c => {
  const L = [];
  if (c.place) L.push(["where", placeText(c.place), gatesOf(c.place)]);
  if (c.count) L.push(["how many", countText(c.count), gatesOf(c.count)]);
  if (c.never && c.never.length) L.push(["never", c.never.join(" · "), []]);
  return L;
};
const notesOf = c => rulesLines(c).map(([k, v, g]) =>
  `<p style="margin-top:var(--s-space-sm)"><b>${esc(k)}</b> &mdash; <code>${esc(v)}</code>${g.length ? ` <span class="cap">${esc(g.join(" "))}</span>` : ""}</p>`).join("");
const picksOf = c => {
  const all = Object.entries(c.picks || {});
  if (!all.length) return "";
  return all.map(([prop, spec]) => {
    const when = Object.entries(spec || {}).filter(([k]) => k !== "test");
    return `<p style="margin-top:var(--s-space-sm)"><b>Which <code>${esc(prop)}</code>.</b>${spec && spec.test ? " " + esc(spec.test) : ""}</p>` +
      (when.length ? `<ul style="margin:var(--s-space-2xs) 0 0;padding-inline-start:var(--s-space-lg);color:var(--s-color-text-secondary)">${when.map(([v, w]) =>
        `<li><code>${esc(v)}</code> &mdash; ${esc(w)}</li>`).join("")}</ul>` : "");
  }).join("");
};

  for (const c of list) {
    nav.append(h("a", { href: "#c-" + c.id }, c.id));
    if (TOOLS[c.id]) nav.append(h("a", { class: "nav-tool", href: TOOLS[c.id].href }, TOOLS[c.id].label));
    const e = h("article", { class: "entry", id: "c-" + c.id, "data-facets": facetsOf(c).join(" ") });
    e.append(h("div", { class: "entry-head" },
      `<div><h3>.${esc(c.class)}</h3><span class="tier-tag">${esc(c.family)} · binds ${c.block || "c." + c.id + ".*"}</span>${facetChips(c)}${TOOLS[c.id] ? `<p class="entry-tool"><a class="aods-link" href="${TOOLS[c.id].href}">${TOOLS[c.id].label}</a> &mdash; every fill, emphasis and surface this component allows, with the combinations that fail ruled out</p>` : ""}</div>
       <div><p>${esc(c.summary)}</p>${notesOf(c)}${picksOf(c)}<p class="font-line">font: ${esc(c.font)} · element: ${esc(c.element)}</p>${docket(c)}</div>`));
    const spec = S[c.id] || `<p class="cap">no specimen authored</p>`;
    const darkCapable = (c.ground || ["light"]).includes("dark");
    const pair = h("div", { class: "spec-pair" + ((c.wide || !darkCapable || c.darkSpecimen === false) ? " single" : "") });
    const light = h("div", { class: "spec aods-page", "data-ground": "light" });
    light.innerHTML = `<div class="spec-marker"><span>pattern begins · light</span><span>${darkCapable ? "rest" : "no dark variant"}</span></div>${spec}`;
    pair.append(light);
    if (darkCapable && c.darkSpecimen !== false) {
      // The dark specimen IS the same markup with data-surface="dark" on the component. The small parts are shown
      // inside a dark card, which is where they meet a dark surface in practice (the inCard list below).
      const classes = c.class.split("|").map(s => s.trim());
      const wrap = h("div");
      wrap.innerHTML = spec;
      wrap.querySelectorAll(classes.map(k => "." + k).join(",")).forEach(el => el.setAttribute("data-surface", "dark"));
      // Every OTHER dark-capable component inside the clone takes the dark surface too. RULING 2026-08-25: a sentence
      // of .aods-text wrapped around an inline icon kept the light ink and measured 1.08:1 on the dark ground — the
      // clone was stamping only the component the block is ABOUT. Regions a specimen deliberately pins light (a hero's
      // light panel, the header's mega menu) are left alone.
      wrap.querySelectorAll(DARK_SEL).forEach(el => { if (!el.closest(PINNED_LIGHT)) el.setAttribute("data-surface", "dark"); });
      // The clone must not share ids with the light specimen: every id and every reference to one gets a -dark suffix,
      // so the dark modal's opener opens the dark dialog and a dark label focuses the dark input. Only references that
      // point INSIDE the clone are rewritten — a href to the sprite or to a doc anchor is left alone.
      const ids = new Set([...wrap.querySelectorAll("[id]")].map(el => el.id));
      const suffix = v => ids.has(v) ? v + "-dark" : v;
      wrap.querySelectorAll("[id]").forEach(el => el.id = el.id + "-dark");
      for (const attr of ["for", "aria-controls", "aria-labelledby", "aria-describedby", "data-modal-open", "data-modal-close"]) {
        wrap.querySelectorAll(`[${attr}]`).forEach(el => { const v = el.getAttribute(attr); if (v) el.setAttribute(attr, v.split(/\s+/).map(suffix).join(" ")); });
      }
      wrap.querySelectorAll('[href^="#"]').forEach(el => { const v = el.getAttribute("href").slice(1); if (ids.has(v)) el.setAttribute("href", "#" + v + "-dark"); });
      wrap.querySelectorAll('[fill^="url(#"]').forEach(el => { const v = el.getAttribute("fill").slice(5, -1); if (ids.has(v)) el.setAttribute("fill", `url(#${v}-dark)`); });
      /* NAMED, NOT INFERRED (2026-09-19). The second line was the typography tier: type roles that paint no
         surface of their own, so the only way to show one on dark is on a dark card. The tier is retired;
         the reason is not, so they are listed by name. */
      const inCard = ["button", "link", "badge", "divider", "button-group", "accordion", "breadcrumb", "in-page-nav", "pagination", "label", "checkbox", "switch", "field",
        "prose", "text", "eyebrow", "section-heading", "pull-quote", "stat", "section-opener", "objective"].includes(c.id);
      const dark = h("div", { class: "spec aods-page", "data-ground": "dark" });
      dark.innerHTML = `<div class="spec-marker"><span>pattern begins · dark surface</span><span>${inCard ? `inside .aods-card[data-surface="dark"]` : `.${classes[0]}[data-surface="dark"]`}</span></div>` +
        (inCard ? `<div class="aods-card" data-surface="dark">${wrap.innerHTML}</div>` : wrap.innerHTML);
      pair.append(dark);
      if (c.darkFirst) pair.prepend(dark);
    }
    e.append(pair);
    // apparatus: props, states, html, tokens
    /* the default is marked where the value is listed (2026-09-19): propDefaults says which value an
       omitted attribute means, and a reader choosing a value needs that beside the choices. */
    const defs = c.propDefaults || {};
    const props = (Object.entries(c.props || {}).map(([k, v]) => `<dt>${esc(k)}</dt><dd>${(Array.isArray(v) ? v : [v]).map(x => esc(x) + (defs[k] === x ? " <i>(default)</i>" : "")).join(" · ")}</dd>`).join("")
      + Object.entries(defs).filter(([k, d]) => !(Array.isArray((c.props || {})[k]) && c.props[k].includes(d))).map(([k, d]) => `<dt>${esc(k)}</dt><dd>default: ${esc(d)}</dd>`).join(""))
      || "<dt>—</dt><dd>no props</dd>";
    const toks = c.tokens.map(v => { const t = T[v.replace(/^--/, "").replace(/-/g, ".")] || Object.values(T).find(x => x.cssVar === v); return `<tr><td>${v}</td><td>${esc(t?.raw ?? "")}</td><td>${t?.type === "color" ? `<span class="chip" style="background:${t.light}"></span>` : ""}${esc(t?.light ?? "")}</td><td>${t?.flips ? `<span class="chip" style="background:${t.dark}"></span>${esc(t.dark)}` : "<span style='opacity:.4'>same</span>"}</td></tr>`; }).join("");
    e.append(h("div", { class: "apparatus" }, `
      <div class="panel"><h4>props</h4><dl>${props}</dl></div>
      <div class="panel"><h4>states</h4><dl><dt>states</dt><dd>${c.states.map(esc).join(" · ")}</dd>${c.composes ? `<dt>composes</dt><dd>${c.composes.join(" · ")}</dd>` : ""}${(c.optionalParts || []).length ? `<dt>optional parts</dt><dd>${c.optionalParts.map(esc).join(" · ")}</dd>` : ""}${c.a11y ? `<dt>a11y</dt><dd style="font-family:inherit">${a11yList(c.a11y)}</dd>` : ""}</dl></div>
      <div class="panel wide"><h4>html</h4><pre>${esc(c.html)}</pre></div>
      <div class="panel wide"><h4>bound tokens · ${c.tokens.length} · every one is c-, every one resolves through s- to g-</h4>
        <details class="toks"><summary>show the binding table</summary><div class="scroll-x"><table class="tok-table"><thead><tr><th>c- token</th><th>→ s-</th><th>light</th><th>dark</th></tr></thead><tbody>${toks}</tbody></table></div></details>
        <details class="toks"><summary>spec as JSON</summary><pre>${esc(JSON.stringify({ id: c.id, family: c.family, class: c.class, element: c.element, props: c.props, states: c.states, composes: c.composes || [], tokens: c.tokens, selectors: c.selectors }, null, 1))}</pre></details>
      </div>`));
    sec.append(e);
  }
  if (fam === "conversation") {
    const demo = h("article", { class: "entry entry--demo", id: "c-conv-demo", "data-facets": "" }, `<div class="entry-head"><div><h3>a whole exchange</h3><span class="tier-tag">composition · nothing new</span></div><div><p>Every part above, in one thread: notice, two turns, steps, sources, actions, typing, composer.</p></div></div>`);
    const pane = h("div", { class: "spec-pair single" }); const l = h("div", { class: "spec aods-page", "data-ground": "light" });
    l.innerHTML = `<div class="spec-marker"><span>pattern begins · light</span><span>composition</span></div>` + (S["conv-demo"] || "");
    pane.append(l); demo.append(pane); sec.append(demo);
  }
  host.append(sec);
}

// ---- lint
$("#lint-out").innerHTML = M.lint.errors.length ? `<p><b>${M.lint.errors.length} errors</b></p><pre>${esc(M.lint.errors.join("\n"))}</pre>` : `<p>0 errors.</p>`;
$("#lint-out").innerHTML += `<details class="toks"><summary>${M.lint.warnings.length} warnings (unconsumed spare rungs)</summary><pre>${esc(M.lint.warnings.join("\n"))}</pre></details>`;

// ---- interactivity that a spec needs
window.AODS?.init(document);
document.querySelectorAll(".indet").forEach(i => i.indeterminate = true);

/* HEADROOM FOR AN UPWARD PANEL (2026-08-25). A disclosure opens UPWARD as an overlay, and a specimen box
   clips — it scrolls, because a wide component has to be reachable inside it. A five-row panel overshot the
   top of its box by 6px and the first row was cut off. The box is given exactly the headroom the open panel
   needs: measured, not guessed, so a longer list gets more room and a closed one gets none. Pushing the box's
   top padding down moves the bar down by the same amount, and the panel rides on the bar — so one pass lands
   it flush with the padding edge. `toggle` does not bubble, hence the capture listener. */
document.addEventListener("toggle", e => {
  const d = e.target; if (!d.classList || !d.classList.contains("aods-disclosure")) return;
  const spec = d.closest(".spec"); if (!spec) return;
  requestAnimationFrame(() => {
    spec.style.removeProperty("padding-top");
    const panels = [...spec.querySelectorAll(".aods-disclosure[open] > .aods-disclosure__panel")];
    if (!panels.length) return;
    const base = parseFloat(getComputedStyle(spec).paddingTop) || 0;
    const edge = spec.getBoundingClientRect().top + base;
    const need = Math.max(0, ...panels.map(p => edge - p.getBoundingClientRect().top));
    if (need > 0) spec.style.paddingTop = (base + need) + "px";
  });
}, true);
/* the ground select was removed 2026-08-24 — specimens always show rest AND dark surface. */

/* ============================================================================
   PARTS (2026-08-25). Every heading in the side menu now has a home: a real
   section with a title, an intro, and the sections it covers nested inside it.
   The menu stops being a flat list of fifteen destinations and becomes four
   named places, and a reader who lands on one is told what is in it before
   opening anything. The sub-sections keep their own ids, so every anchor that
   ever pointed at them still lands. RULING 2026-08-25: the component groups
   are NOT wrapped in a part — each one is a section in its own right, with its
   own intro and its own control, and the component index carries the copy that
   introduces them all. Since 2026-09-19 the groups are the families.
   ============================================================================ */
const PARTS = [
  { id: "foundations", title: "Foundations", members: ["rules", "tiers", "color", "semantic", "icons", "index"],
    lede: "What the components are made of, and the rules that decide what a component may say. The generator enforces the rules; the three tiers say where a value may live; the ramps are every color the system owns; the semantic layer is the only tier that knows about ground. Read this before the components — everything below binds to what is defined here." },
  { id: "patterns", title: "Patterns", members: [] },
  { id: "meta", title: "Meta", members: ["open", "lint", "files"],
    lede: "The state of the system rather than its contents: the decisions still open, what the linter is complaining about in this build, and the files the generator reads and writes." }
];
for (const part of PARTS) {
  let el = document.getElementById(part.id);
  if (!el) {
    el = h("section", { class: "doc-section doc-part", id: part.id }, `<h2>${part.title}</h2><p class="blurb">${part.lede}</p>`);
    const at = document.getElementById(part.anchor || part.members[0]);
    if (!at) continue;
    at.parentNode.insertBefore(el, at);
  } else {
    el.classList.add("doc-part");
  }
  for (const id of part.members) {
    const sec = document.getElementById(id);
    if (!sec) continue;
    const head = sec.querySelector(":scope > h2");
    if (head) head.replaceWith(h("h3", {}, head.innerHTML));   /* a section inside a part is one level down */
    el.appendChild(sec);
  }
}

/* ============================================================================
   COLLAPSE + the compact drawer (2026-08-22). Everything the side menu reaches
   folds, from the menu or from its own heading, and the two share one state.
   Below the narrow breakpoint the nav leaves the flow entirely.
   ============================================================================ */
(function () {
  /* RULING 2026-08-24: the page opens CLOSED — every section, every entry, every menu group.
     A reference of 63 components is a table of contents first and a document second, so the
     reader chooses what unfolds. State is per-visit; nothing is remembered between loads. */
  const closed = new Set();
  const write = () => {};
  let syncAll = () => {};      /* assigned once the page-wide switch exists; every toggle re-checks it */

  /* everything after the head becomes one collapsible body */
  function fold(host, head, id, label, count) {
    const body = document.createElement("div");
    body.className = host.classList.contains("entry") ? "entry-body" : "sec-body";
    body.id = id + "-body";
    let n = head.nextSibling;
    while (n) { const next = n.nextSibling; body.appendChild(n); n = next; }
    host.appendChild(body);
    /* The opening line stays OUT of the fold (2026-08-25): a collapsed section shows its title and what
       it holds, so a part reads as a directory of its sections rather than a stack of bare headings. */
    while (body.firstElementChild && (body.firstElementChild.classList.contains("blurb") || body.firstElementChild.classList.contains("sec-chips") || body.firstElementChild.classList.contains("sec-filters")))
      host.insertBefore(body.firstElementChild, body);

    const btn = document.createElement("button");
    btn.type = "button"; btn.className = "toggle";
    btn.setAttribute("aria-controls", body.id);
    btn.innerHTML = `<span class="chev" aria-hidden="true"></span><span class="toggle__label"></span>` +
                    (count ? `<span class="count">${count}</span>` : "");
    btn.querySelector(".toggle__label").textContent = label;
    head.textContent = ""; head.appendChild(btn);

    const set = open => { btn.setAttribute("aria-expanded", String(open)); body.hidden = !open;
                          open ? closed.delete(id) : closed.add(id); };
    set(false);
    /* Whatever the surrounding rhythm does, the heading the user just clicked stays where it was:
       measure it, toggle, measure again, and give the difference back to the scroll position. */
    btn.addEventListener("click", () => {
      const was = btn.getBoundingClientRect().top;
      set(body.hidden); write(closed); syncAll();
      const now = btn.getBoundingClientRect().top;
      if (now !== was) window.scrollBy(0, now - was);
    });
    return { host, body, btn, set: o => { set(o); write(closed); } };
  }

  /* ---- content: one fold per section, one per component entry ---- */
  const sections = new Map();
  document.querySelectorAll("section.doc-section").forEach(sec => {
    const head = sec.querySelector(":scope > h2, :scope > h3"); if (!head || !sec.id) return;
    const entries = sec.querySelectorAll(":scope > .entry:not(.entry--demo)").length;
    const kids = sec.querySelectorAll(":scope > section.doc-section").length;
    const deep = sec.querySelectorAll(".entry:not(.entry--demo)").length;   /* a part counts what is actually in it */
    const count = entries ? `${entries} components` : deep ? `${deep} components` : kids ? `${kids} sections` : "";
    sections.set(sec.id, fold(sec, head, sec.id, head.textContent.trim(), count));
  });
  const entries = new Map();
  document.querySelectorAll("article.entry").forEach(entry => {
    const head = entry.querySelector(":scope > .entry-head > div > h3"); if (!head || !entry.id) return;
    const wrap = entry.querySelector(":scope > .entry-head");
    const body = document.createElement("div"); body.className = "entry-body"; body.id = entry.id + "-body";
    let n = wrap.nextSibling; while (n) { const next = n.nextSibling; body.appendChild(n); n = next; }
    entry.appendChild(body);
    const label = head.textContent.trim();
    const btn = document.createElement("button");
    btn.type = "button"; btn.className = "toggle"; btn.setAttribute("aria-controls", body.id);
    btn.innerHTML = `<span class="chev" aria-hidden="true"></span><span class="toggle__label"></span>`;
    btn.querySelector(".toggle__label").textContent = label;
    head.textContent = ""; head.appendChild(btn);
    const set = open => { btn.setAttribute("aria-expanded", String(open)); body.hidden = !open;
                          open ? closed.delete(entry.id) : closed.add(entry.id); };
    set(false);
    btn.addEventListener("click", () => {
      const was = btn.getBoundingClientRect().top;
      set(body.hidden); write(closed); syncAll();
      const now = btn.getBoundingClientRect().top;
      if (now !== was) window.scrollBy(0, now - was);
    });
    entries.set(entry.id, { set: o => { set(o); write(closed); } });
  });

  /* ---- side menu: flatten it, group each heading's links, mirror the sections ---- */
  const navEl = document.querySelector(".doc-nav");
  const comps = document.querySelector("#nav-components");
  if (comps) { while (comps.firstChild) navEl.insertBefore(comps.firstChild, comps); comps.remove(); }
  const groups = [];
  let current = null;
  [...navEl.children].forEach(el => {
    /* a heading that IS a link (a part with no sub-sections) closes the run — it has nothing to expand */
    if (el.tagName === "H2" && el.classList.contains("nav-solo")) { current = null; return; }
    if (el.tagName === "H2") { current = { head: el, links: [] }; groups.push(current); }
    else if (current && el.tagName === "A") current.links.push(el);
  });
  groups.forEach((g, i) => {
    const list = document.createElement("div"); list.className = "nav-group"; list.id = "nav-group-" + i;
    g.head.after(list); g.links.forEach(a => list.appendChild(a));
    const label = g.head.textContent.trim(), id = "nav:" + label;
    const target = g.head.dataset.section || "";
    const btn = document.createElement("button");
    btn.type = "button"; btn.className = "toggle"; btn.setAttribute("aria-controls", list.id);
    btn.setAttribute("aria-label", `${label} links`);
    btn.innerHTML = `<span class="chev" aria-hidden="true"></span>`;
    g.head.textContent = ""; g.head.appendChild(btn);
    /* the name is a link to the section it heads — following it opens the group on the way (see reveal) */
    const name = document.createElement(target ? "a" : "span");
    name.className = "nav-head__link";
    if (target) name.setAttribute("href", "#" + target);
    name.textContent = label;
    g.head.appendChild(name);
    /* the sections this group reaches — the menu and the content are the same switch */
    g.targets = [...new Set(g.links.map(a => {
      const t = document.getElementById(a.getAttribute("href").slice(1));
      return t ? (t.closest("section.doc-section") || t).id : null;
    }).filter(Boolean))];
    if (target && !g.targets.includes(target)) g.targets.push(target);
    /* DECOUPLED 2026-08-24: the menu is navigation, not a remote control. Opening a group shows its
       links; it no longer throws open every section those links point at. Content opens when a link
       is followed (see reveal), or from the section's own heading. */
    const set = open => {
      btn.setAttribute("aria-expanded", String(open)); list.hidden = !open;
      open ? closed.delete(id) : closed.add(id);
    };
    set(false);
    btn.addEventListener("click", () => { set(list.hidden); write(closed); syncAll(); });
    g.set = set;
  });

  /* ---- compact: the nav folds behind the sticky hamburger ---- */
  const menu = document.querySelector(".doc-menu"), scrim = document.querySelector(".doc-scrim");
  const root = document.querySelector(".doc") || document.body;   // published as a fragment, .doc is a div, not <body>
  /* the breakpoint comes from the token, so the JS and the CSS cannot drift */
  const NARROW = (getComputedStyle(document.documentElement).getPropertyValue("--s-breakpoint-narrow") || "600px").trim();
  function setNav(open) {
    root.dataset.nav = open ? "open" : "";
    menu?.setAttribute("aria-expanded", String(open));
    if (scrim) scrim.hidden = !open;
    if (open) navEl.querySelector("a, button")?.focus();
  }
  setNav(false);
  menu?.addEventListener("click", () => setNav(root.dataset.nav !== "open"));
  scrim?.addEventListener("click", () => setNav(false));
  addEventListener("keydown", e => { if (e.key === "Escape" && root.dataset.nav === "open") { setNav(false); menu?.focus(); } });
  matchMedia(`(max-width: ${NARROW})`).addEventListener("change", e => { if (!e.matches) setNav(false); });
  /* ---- a link to something folded away opens it on the way ---- */
  const reveal = hash => {
    const t = hash && document.getElementById(hash.slice(1)); if (!t) return;
    /* Sections nest now, so a target can be two folds deep: open the whole chain, outermost first. */
    const chain = [];
    for (let sec = t.closest("section.doc-section"); sec; sec = sec.parentElement && sec.parentElement.closest("section.doc-section")) chain.unshift(sec);
    chain.forEach(sec => sections.get(sec.id)?.set(true));
    if (chain.length) groups.forEach(g => { if (chain.some(sec => g.targets.includes(sec.id))) g.set(true); });
    /* A link may point at an entry a filter is currently hiding — following it clears that section's
       filter rather than traveling to something invisible. */
    const ent = t.closest("article.entry");
    if (ent && ent.hidden) ent.closest("section.doc-section")?.querySelector('.sec-filters button[data-facet="*"]')?.click();
    if (t.classList.contains("entry")) entries.get(t.id)?.set(true);
    write(closed);
  };
  /* A folded target has no position until it opens, so revealing and scrolling cannot happen in the
     same frame: open first, let layout settle, then jump. Instant, per the documentation ruling. */
  const jumpTo = hash => {
    const id = hash && decodeURIComponent(hash.slice(1));
    const t = id && document.getElementById(id); if (!t) return false;
    reveal(hash);
    requestAnimationFrame(() => {
      const margin = parseFloat(getComputedStyle(t).scrollMarginBlockStart) || 0;
      window.scrollTo({ top: Math.max(0, window.scrollY + t.getBoundingClientRect().top - margin), behavior: "auto" });
      if (t.tabIndex < 0 && !t.hasAttribute("tabindex")) t.setAttribute("tabindex", "-1");
      t.focus({ preventScroll: true });
    });
    return true;
  };
  document.addEventListener("click", e => {
    const a = e.target.closest ? e.target.closest('a[href^="#"]') : null; if (!a) return;
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const href = a.getAttribute("href");
    if (href === "#" || !document.getElementById(decodeURIComponent(href.slice(1)))) return;   /* mocked links in specimens stay inert */
    e.preventDefault();
    try { history.pushState(null, "", href); } catch (err) { /* srcdoc iframes forbid pushState */ }
    jumpTo(href);
    if (navEl.contains(a) && matchMedia(`(max-width: ${NARROW})`).matches) setNav(false);
  });
  /* ============================================================ SEARCH  (2026-08-25)
     Both search forms on the site were inert — they looked like a promise the system did not keep, and
     on a page whose whole claim is "nothing here is typed by hand" an ornamental control is the worst
     kind of lie. They now submit to this page as ?q=, and this reads it.
     A RESULTS PANEL, NOT A FILTER. The family sections already own a facet filter; driving that from a
     text query would mean one control quietly fighting another, and a filtered-to-nothing section
     reads as a broken page. The panel sits above the sections, says what it found, and every hit is a
     #c-<id> link — which already opens the family, clears a filter that would hide the entry, unfolds
     the entry and jumps to it. So the search reuses navigation that was already proven rather than
     inventing a second way to arrive.
     The corpus is the manifest: id, class, family and its gloss, summary, notes, prop names and values,
     states, a11y note and token names. That is everything the page itself shows, so a reader can search
     for what they can see. Notes joined 2026-09-19, when they took the rules the summary used to hold. */
  const searchCorpus = c => [c.id, c.class, c.family, (FAM.gloss || {})[c.family] || "", c.summary, placeText(c.place), (c.never || []).join(" "), (c.states || []).join(" "),
    Object.entries(c.props || {}).map(([k, v]) => k + " " + (Array.isArray(v) ? v.join(" ") : v)).join(" "),
    (c.tokens || []).join(" "), JSON.stringify(c.a11y || "")].join(" ").toLowerCase();

  /* Ranked, so an exact component name is never buried under something that merely mentions it in
     prose. Name beats class beats summary beats everything else. */
  const searchScore = (c, q) => {
    const id = c.id.toLowerCase(), cls = (c.class || "").toLowerCase();
    if (id === q) return 100;
    if (id.startsWith(q)) return 80;
    if (id.includes(q)) return 60;
    if (cls.includes(q)) return 50;
    if ((c.summary || "").toLowerCase().includes(q)) return 30;
    return searchCorpus(c).includes(q) ? 10 : 0;
  };

  const runSearch = raw => {
    const q = String(raw || "").trim().toLowerCase();
    document.getElementById("doc-results")?.remove();
    if (!q) return;
    const hits = Object.values(M.components)
      .map(c => ({ c, s: searchScore(c, q) })).filter(h => h.s > 0)
      .sort((a, b) => b.s - a.s || a.c.id.localeCompare(b.c.id));
    const head = document.querySelector(".doc-head");
    const panel = h("section", { class: "doc-results", id: "doc-results", tabindex: "-1" },
      `<p class="doc-results__count" role="status">${hits.length
        ? `${hits.length} component${hits.length === 1 ? "" : "s"} for &ldquo;${esc(q)}&rdquo;`
        : `Nothing matches &ldquo;${esc(q)}&rdquo;`}</p>` +
      (hits.length
        ? `<ul class="doc-results__list">${hits.map(({ c }) =>
            `<li><a href="#c-${c.id}"><b>${esc(c.id)}</b> <span class="tier-tag">${esc(c.family)}</span></a>
             <p>${esc((c.summary || "").split(". ")[0]).slice(0, 160)}</p></li>`).join("")}</ul>`
        /* A dead end has to offer a way on, or the user has nowhere to go but back. */
        : `<p class="doc-results__none">Try a component name (<code>card</code>, <code>disclosure</code>),
           a class (<code>aods-hero</code>) or a family
           (<code>${esc((M.components.card || {}).family || FAM.order[0] || "")}</code>).</p>`) +
      `<p><a class="doc-results__clear" href="index.html">Clear search</a></p>`);
    head.insertAdjacentElement("afterend", panel);
    panel.focus({ preventScroll: true });
  };

  const q0 = new URLSearchParams(location.search).get("q");
  if (q0) runSearch(q0);

  addEventListener("hashchange", () => jumpTo(location.hash));
  if (location.hash) jumpTo(location.hash);


})();
