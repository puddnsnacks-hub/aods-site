/* AODS — style guide renderer.
   Reads dist/manifest.js + dist/tokens.js + docs/specimens.js at load.
   It states no token value, no component, no rule, no count. Rebuild the system
   and these pages change with it. If a fact is not in dist/, it is not on the page. */
(() => {
const M = window.AODS_MANIFEST, T = window.AODS_TOKENS, S = window.AODS_SPECIMENS || {};
if (!M || !T) { document.body.innerHTML = '<p style="padding:2rem">dist/ not loaded — open this from aods/docs/guide/ so ../../dist/*.js resolve.</p>'; return; }

const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c]));
const $  = s => document.querySelector(s);
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
const mount = (id, node) => { const h = document.getElementById(id); if (h && node) h.replaceChildren(node); };

/* token helpers — every lookup goes through here so nothing is typed twice */
const tok    = n => T[n];
const val    = n => (T[n] ? T[n].light : "");
const grp    = pre => Object.keys(T).filter(k => k.startsWith(pre)).map(k => [k, T[k]]);
const px     = v => String(v || "").replace("px", "");
const cssvar = n => (T[n] ? `var(${T[n].cssVar})` : "inherit");
const desc   = n => String((T[n] && T[n].description) || "").replace(/^\s*(RULE|RULING)\b[:\s-]*/i, "");
const cons   = n => ((T[n] && T[n].consumers) || []);
const uses   = n => cons(n).length;
/* consumers are c-tier token paths (c.<component>.<token>) plus the odd file like docs/doc.css.
   The component id is the second segment — so the list below is derived, never typed. */
const usedComps = n => [...new Set(cons(n).filter(c => c.startsWith("c.")).map(c => c.split(".")[1]))].sort();
const usedByNote = n => {
  const all = cons(n), comps = usedComps(n), other = all.filter(c => !c.startsWith("c."));
  if (!all.length) return `<b>USED BY</b> — nothing binds this yet`;
  let out = `<b>USED BY</b> — ${all.length} token${all.length === 1 ? "" : "s"} across ${comps.length} component${comps.length === 1 ? "" : "s"}`;
  if (comps.length) out += `<span class="g-used">${comps.map(esc).join("  ·  ")}</span>`;
  if (other.length) out += `<span class="g-used">also — ${other.map(esc).join("  ·  ")}</span>`;
  return out;
};

/* section opener — eyebrow · rule · heading · body, the shape the guide uses everywhere */
function opener(eyebrow, heading, bodies) {
  const s = el("section", "g-section");
  s.append(el("p", "g-eyebrow", esc(eyebrow)), el("div", "g-rule"), el("h2", "g-heading", esc(heading)));
  for (const b of [].concat(bodies || [])) if (b) s.append(el("p", "g-body", esc(b)));
  return s;
}
/* the row primitive: id column, then specimen + token name + notes */
function row(idTop, idSub, specimenHTML, tokenName, notes) {
  const r = el("div", "g-row");
  r.append(el("div", "g-id", `<b>${esc(idTop)}</b>${idSub ? `<span class="g-sub">${esc(idSub)}</span>` : ""}`));
  const body = el("div", "");
  body.append(el("div", "g-specimen", specimenHTML));
  if (tokenName) body.append(el("p", "g-token", esc(tokenName)));
  for (const n of [].concat(notes || [])) if (n) body.append(el("p", "g-note", n));
  r.append(body);
  return r;
}
const rows = list => { const w = el("div", "g-rows"); list.forEach(n => n && w.append(n)); return w; };

/* ---------- chrome shared by every page ---------- */
const PAGES = [
  ["index.html",      "Cover",      "How to read this guide, and what it is generated from."],
  ["typography.html", "Typography", "One ramp, six faces. Which face a role picks and why."],
  ["color.html",      "Color",     "The ramps, the semantic roles, and what flips on a dark ground."],
  ["space.html",      "Measure",    "Space, size, edge, radius — every rung, and the grid they sit on."],
  ["layout.html",     "Layout",     "Three components and five laws — ground, container, paper, and how width is decided."],
  ["motion.html",     "Motion",     "The curves, the durations, the six keyframes, and what stops them."],
  ["components.html", "Components", "Every component, its props, its states, and a live instance."],
  ["conversational.html", "Conversational", "The assistant family — thread, message, steps, sources, composer."],
  ["rules.html",      "Rules",      "The lint rules as passes/fails, plus every standing ruling."]
];
function bar() {
  const here = (location.pathname.split("/").pop() || "index.html");
  const b = el("nav", "g-bar"), w = el("div", "g-wrap");
  /* THE WAY OUT (2026-08-25). The guide's own bar carried the wordmark as a dead <a> with no href —
     it looked like the way home and was not. Audited: this section offered ZERO links out. */
  const back = el("a", "g-back", "\u2190 AODS"); back.href = "../../index.html";
  w.append(back);
  const brand = el("a", "g-brand", esc(M.name)); brand.href = "index.html"; w.append(brand);
  for (const [href, label] of PAGES) {
    const a = el("a", null, esc(label)); a.href = href;
    if (href === here) a.setAttribute("aria-current", "page");
    w.append(a);
  }
  w.append(el("span", "g-ver", `v${esc(M.version)} · built ${esc(M.generated)}`));
  b.append(w); return b;
}
function foot() {
  const f = el("footer", "g-foot"), w = el("div", "g-wrap");
  w.innerHTML = `${esc(M.counts.tokens)} tokens · ${esc(M.counts.components)} components · ${esc(M.counts.faces)} typefaces
    · ${M.lint.errors.length} lint errors · ${M.lint.warnings.length} warnings<br>
    Generated from dist/manifest.js and dist/tokens.js. Nothing on this page is typed by hand.`;
  f.append(w); return f;
}

/* ================= COVER ================= */
function pageCover(main) {
  const cover = el("header", "aods-hero g-cover"); cover.setAttribute("data-surface", "dark");
  const cw = el("div", "g-wrap");
  cw.append(el("p", "g-eyebrow", `${esc(M.name)} · STYLE GUIDE`), el("div", "g-rule"));
  cw.append(el("h1", "g-title", "Built as code, documented by the same build"));
  cw.append(el("p", "g-lede",
    "One generator emits three tiers of tokens to CSS. These pages read that output — every value, count, rule and component below comes out of dist/, so the guide cannot drift from the system it describes."));
  cw.append(el("p", "g-token", `{tier}.{group}.{role}  ·  g → s → c`));
  cw.append(el("p", "g-note",
    `${esc(M.counts.tokens)} tokens &nbsp;·&nbsp; ${esc(M.counts.components)} components &nbsp;·&nbsp; ${esc(M.counts.faces)} typefaces &nbsp;·&nbsp; v${esc(M.version)}, built ${esc(M.generated)}`));
  cover.append(cw); main.append(cover);

  const page = el("div", "g-wrap"); main.append(page);
  const s = opener("CONTENTS", `${PAGES.length - 1} pages`, null);
  const cards = el("div", "g-cards");
  const counts = {
    "typography.html": `${grp("s.type.").length} type tokens · ${grp("s.font.").length} font tokens`,
    "color.html":      `${grp("g.color.").length} globals · ${grp("s.color.").length} roles · ${Object.values(T).filter(t => t.flips).length} flip on dark`,
    "space.html":      `${grp("s.space.").length + grp("s.size.").length + grp("s.radius.").length} rungs`,
    "components.html": `${Object.values(M.components).filter(c => c.family !== CONV_FAMILY).length} components · ${Object.keys(S).length} live specimens`,
    "conversational.html": `${Object.values(M.components).filter(c => c.family === CONV_FAMILY).length} components`,
    "rules.html":      `${M.laws.laws.length} laws · ${M.laws.laws.filter(l => l.gate).length} gated`,
    "index.html":      `v${M.version}`
  };
  for (const [href, label, blurb] of PAGES) {
    if (href === "index.html") continue;
    const a = el("a", "g-card", `<h3>${esc(label)}</h3><p>${esc(blurb)}</p><span class="g-count">${esc(counts[href] || "")}</span>`);
    a.href = href; cards.append(a);
  }
  s.append(cards); page.append(s);

  const t = opener("THE THREE TIERS", "A token is only ever one of three things",
    "A component may bind the c tier and nothing else. The build fails if it reaches past it.");
  t.append(rows(Object.entries(M.tiers).map(([k, d]) =>
    row(`${k}-`, `${Object.values(T).filter(x => x.tier === k).length} tokens`,
      `<p class="g-body" style="margin:0">${esc(d)}</p>`, `--${k}-*`, null))));
  page.append(t);
}

/* ================= TYPOGRAPHY ================= */
/* Weight and tracking are OFF pending the tracking fix (g.font.tracking.ui is 0.06px where
   0.06em was meant, and the per-step --c-text-*-tracking tokens the role rules reference do
   not exist). Flip this to true once that lands — it restores them on every ramp row. */
const SHOW_WEIGHT_TRACKING = false;

const ROLE_FAMILY = { ui: "s.font.family.ui", body: "s.font.family.body", heading: "s.font.family.heading", display: "s.font.family.display", code: "s.font.family.code" };
const FACE_STEP = { ui: "ui-2xl", body: "body-md", heading: "heading-md", display: "display-xs", code: "code-lg", doc: "body-sm", "doc-mono": "code-md" };
const SAMPLE = {
  display: "Build big, beautiful infrastructure.",
  heading: "Nine Program Offices",
  body:    "Transportation is central to the strength of our Nation and its economy.",
  ui:      "Download the Plan",
  code:    "s.color.brand-accent.50"
};
function pageTypography(main) {
  main.append(opener("TYPOGRAPHY", "One ramp, read by role", [
    "Every piece of text is set by a token, never by a loose font size. A type token names a role and a step; the role picks the face, the step picks the size and the line height it is paired with.",
    "Pick the role by what the text is doing on the page, never by how big you want it to be."
  ]));

  /* the faces — descriptions come from the tokens themselves */
  const faces = opener("THE FACES", `${grp("s.font.family.").length} faces, one job each`,
    "Role is the only segment that changes the face.");
  faces.append(rows(grp("s.font.family.").map(([name, t]) => {
    const short = name.split(".").pop();
    const spec = SAMPLE[short] || "Transportation is central to the strength of our Nation.";
    const step = FACE_STEP[short] || "heading-xs";
    return row(short, `${t.light} · shown at ${step}`,
      `<div style="font-family:${cssvar(name)}, system-ui, sans-serif; font-size:${cssvar("s.type." + step + ".size")}; line-height:${cssvar("s.type." + step + ".line-height")}; color:var(--s-color-text-primary)">${esc(spec)}</div>`,
      name, [desc(name) ? `<b>RULE</b> — ${esc(desc(name))}` : null,
             usedByNote(name)]);
  })));
  main.append(faces);

  /* the ramp — grouped by role prefix, live at real size */
  const steps = grp("s.type.").filter(([k]) => k.endsWith(".size"));
  const byRole = {};
  for (const [k] of steps) {
    const step = k.split(".")[2];              // e.g. "ui-md"
    const role = step.split("-")[0];
    (byRole[role] = byRole[role] || []).push(step);
  }
  const ramp = opener("THE RAMP", `${steps.length} steps across ${Object.keys(byRole).length} roles`,
    "Each step pairs a size with the line height it is meant to be set at. They are one decision, not two.");
  for (const [role, list] of Object.entries(byRole)) {
    const fam = ROLE_FAMILY[role] || "s.font.family.ui";
    const head = el("div", "g-row");
    head.append(el("div", "g-id", `<b>${esc(role)}</b><span class="g-sub">${esc(val(fam))} · ${list.length} steps</span>`));
    head.append(el("div", "", `<p class="g-note" style="margin:0">${esc(desc(fam) || "")}</p>`));
    const wrap = el("div", "g-rows"); wrap.append(head);
    for (const step of list) {
      const sz = `s.type.${step}.size`, lh = `s.type.${step}.line-height`;
      wrap.append(row(step, `${px(val(sz))} / ${px(val(lh))}`,
        `<p class="aods-text" data-role="${esc(step)}">${esc(SAMPLE[role] || SAMPLE.body)}</p>`,
        `${sz}   ·   ${lh}`,
        [`<span data-resolve><b>RESOLVED</b> — measuring…</span>`]));
    }
    ramp.append(wrap);
  }
  main.append(ramp);

}

/* THE INK ON A SWATCH is chosen by measuring the swatch, not by guessing from its hex's first letter: the
   old test read the value's spelling and put white on #FCFBFB and near-black on #262321 (2026-09-19,
   200 labels under 4.5:1 on this page). Steps 20 to 50 belong to neither polarity, so the ink is simply
   whichever of the two measures higher. */
function inkOn(color) {
  color = (String(color).match(/#[0-9a-f]{3,8}\b|rgba?\([^)]*\)/i) || [color])[0];   /* a gradient: read its first stop */
  const probe = document.createElement("span"); probe.style.color = color; document.body.append(probe);
  const m = getComputedStyle(probe).color.match(/[\d.]+/g); probe.remove();
  if (!m) return "var(--s-color-text-primary)";
  const a = m.length > 3 ? +m[3] : 1, over = c => c * a + 255 * (1 - a);        /* a film is read over the white page */
  const L = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  const lum = 0.2126 * L(over(+m[0])) + 0.7152 * L(over(+m[1])) + 0.0722 * L(over(+m[2]));
  const dark = 0.0176;                      /* the luminance of the primary text ink, #262321 */
  return (1.05 / (lum + 0.05)) >= ((lum + 0.05) / (dark + 0.05)) ? "#fff" : "var(--s-color-text-primary)";
}
/* ================= COLOR ================= */
function pageColor(main) {
    /* THE LAWS, rendered here so the page that shows every ramp and role also states the rules they
     obey. They are read from manifest.laws (topics color and dark), the one home for system rules. */
  const CL = M.color || {};
  {
    const list = lawsOf("color", "dark");
    const cl = opener("THE LAWS", `${list.length} laws the color system reduces to`,
      "Each is one sentence from manifest.laws, labeled with the gate that checks it.");
    cl.append(lawRows(list));
    main.append(cl);
  }
  if (CL.vocabulary) {
    const vo = opener("THE FIVE WORDS", "What a color is for",
      "Where a word could mean two things, only one of them is correct here. \u201cRule\u201d means a law of the system; it is never a line.");
    vo.append(rows(Object.entries(CL.vocabulary).map(([k, v]) =>
      row(k, null, `<p class="g-body" style="margin:0">${esc(v)}</p>`, null, null))));
    main.append(vo);
  }
main.append(opener("COLOR", "Globals hold the values, roles hold the meaning", [
    "A global is a literal and references nothing. A semantic role references a global and is the only tier that knows about ground — it is where the light and dark values sit side by side.",
    "Bind a role. A component never reaches a global."
  ]));

  /* global ramps */
  const fams = {};
  for (const [k] of grp("g.color.")) { const f = k.split(".")[2]; (fams[f] = fams[f] || []).push(k); }
  const gs = opener("THE RAMPS", `${Object.keys(fams).length} families`, null);
  for (const [fam, keys] of Object.entries(fams)) {
    const r = el("div", "g-row");
    r.append(el("div", "g-id", `<b>${esc(fam)}</b><span class="g-sub">${keys.length} steps</span>`));
    const ramp = el("div", "g-ramp");
    for (const k of keys) {
      const t = T[k], step = k.split(".").pop();
      const sw = el("div", "g-swatch", `<span>${esc(step)}</span><span>${esc(t.light)}</span>`);
      sw.style.background = t.light;
      sw.style.color = inkOn(t.light);
      ramp.append(sw);
    }
    const box = el("div", ""); box.append(ramp);
    if (desc(keys[0])) box.append(el("p", "g-note", `<b>NOTE</b> — ${esc(desc(keys[0]))}`));
    r.append(box); gs.append(r);
  }
  main.append(gs);

  /* semantic roles, light + dark side by side */
  const sems = grp("s.color.");
  const flips = sems.filter(([, t]) => t.flips).length;
  const ss = opener("THE ROLES", `${sems.length} roles · ${flips} flip on a dark ground`,
    "Left half is the light value, right half is what the same token resolves to inside data-surface=\"dark\". A role with one value is the same on both grounds by design.");
  const byGroup = {};
  for (const [k, t] of sems) { const g = k.split(".")[2]; (byGroup[g] = byGroup[g] || []).push([k, t]); }
  for (const [g, list] of Object.entries(byGroup)) {
    const wrap = el("div", "g-rows");
    const head = el("div", "g-row");
    head.append(el("div", "g-id", `<b>${esc(g)}</b><span class="g-sub">${list.length} roles</span>`));
    head.append(el("div", ""));
    wrap.append(head);
    for (const [k, t] of list) {
      const duo = el("div", "g-duo");
      const a = el("div", "", `<span>${esc(t.light)}</span>`); a.style.background = t.light; a.style.color = inkOn(t.light); a.style.mixBlendMode = "normal";
      const b = el("div", "", `<span style="color:${inkOn(t.dark)}">${esc(t.dark)}</span>`); b.style.background = t.dark;
      duo.append(a, b);
      wrap.append(row(k.split(".").slice(2).join("/"), t.flips ? "flips" : "same on both",
        duo.outerHTML, k, [desc(k) ? `<b>NOTE</b> — ${esc(desc(k))}` : null,
                           usedByNote(k)]));
    }
    ss.append(wrap);
  }
  main.append(ss);
}

/* ================= MEASURE ================= */
const NUM_GROUPS = [
  ["space",        "The stack and gap rungs. Spacing is the grouping."],
  ["size",         "Control heights, icon boxes, measures."],
  ["border-width", "The hairline and its two steps up."],
  ["emphasis",     "The four emphasis edges a card can carry."],
  ["radius",       "Zero everywhere, with two ruled exceptions."],
  ["focus",        "One focus ring for the whole system."],
  ["opacity",      ""], ["motion", ""], ["elevation", ""], ["breakpoint", ""]
];
function pageSpace(main) {
  main.append(opener("MEASURE", "Every number comes off a rung", [
    "Nothing between the rungs exists. A spec that asks for 18px lands on 20, and the token description records what it was asked for — that record is how the system stays honest about its own compromises."
  ]));
  spaceGrid(main);
  for (const [g, blurb] of NUM_GROUPS) {
    const list = grp(`s.${g}.`);
    if (!list.length) continue;
    const s = opener(g.toUpperCase(), `s.${g}.*`, blurb || null);
    const max = Math.max(...list.map(([, t]) => parseFloat(t.light) || 0), 1);
    s.append(rows(list.map(([k, t]) => {
      const n = parseFloat(t.light) || 0;
      const viz = /px/.test(t.light)
        ? `<div class="g-bar-viz" style="width:${Math.max(2, (n / max) * 100)}%"></div>`
        : "";
      return row(k.split(".").pop(), t.light, viz, `${k}   →   ${t.raw}`,
        [desc(k) ? `<b>NOTE</b> — ${esc(desc(k))}` : null]);
    })));
    main.append(s);
  }
}

/* ================= COMPONENTS ================= */
/* BY FAMILY (2026-09-19). The tiers are retired; the components page groups by family, in the order
   and with the gloss manifest.families gives, and the conversation family keeps its own page. Only the one
   family this file routes elsewhere is named here - the rest are read, never typed. */
const CONV_FAMILY = "conversation";
const FAM = M.families || { order: [], gloss: {}, members: {} };
const gloss = f => { const g = (FAM.gloss || {})[f] || ""; return g ? g.charAt(0).toUpperCase() + g.slice(1) : ""; };
/* members in their listed order; a record whose family is not in the order is appended, never dropped */
function familyGroups(comps) {
  const out = new Map(FAM.order.map(f => [f, []]));
  for (const c of comps) { if (!out.has(c.family)) out.set(c.family, []); out.get(c.family).push(c); }
  for (const [f, list] of out) {
    const rank = (FAM.members || {})[f] || [];
    const at = c => { const i = rank.indexOf(c.id); return i < 0 ? rank.length : i; };
    list.sort((a, b) => at(a) - at(b));
  }
  return out;
}
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
function componentRow(c) {
  const notes = [];
  if (c.summary) notes.push(`<b>IS</b> — ${esc(c.summary)}`);
  /* the summary is one sentence; the rules it used to carry are place, count and never */
  for (const [k, v, g] of rulesLines(c)) notes.push(`<b>${esc(k.toUpperCase())}</b> — ${esc(v)}${g.length ? " (" + esc(g.join(" ")) + ")" : ""}`);
  if (c.element) notes.push(`<b>ELEMENT</b> — ${esc(c.element)}`);
  /* a11y is a checklist (2026-09-19): check / behavior / app / review, each with its WCAG criterion */
  const behIds = ((window.AODS_MANIFEST || {}).behavior || {}).ids || {};
  for (const it of [].concat(c.a11y || [])) {
    if (!it || typeof it !== "object") continue;
    const kind = ["check", "behavior", "app", "review"].find(k => k in it) || "?";
    const text = kind === "behavior" && behIds[it[kind]] ? `${it[kind]}: ${behIds[it[kind]].text}` : String(it[kind]);
    notes.push(`<b>A11Y ${esc(kind.toUpperCase())}</b> — ${esc(text)} (${esc([].concat(it.wcag || []).join(" "))})`);
  }
  if (c.ground)  notes.push(`<b>GROUND</b> — ${[].concat(c.ground).join(" · ")}`);
  if (c.states && c.states.length) notes.push(`<b>STATES</b> — ${esc(c.states.join(" · "))}`);
  /* a pattern is {id, rule} - printing the object printed "[object Object]" */
  if (c.patterns) [].concat(c.patterns).forEach(pt => notes.push(`<b>PATTERN</b> — ${pt && typeof pt === "object" ? `${esc(pt.id)}: ${esc(pt.rule)}` : esc(pt)}`));
  /* picks: which value of a prop, and when. No record fills it yet; it renders the day one does. */
  for (const [prop, spec] of Object.entries(c.picks || {})) {
    const when = Object.entries(spec || {}).filter(([k]) => k !== "test").map(([v, w]) => `${esc(v)} — ${esc(w)}`);
    notes.push(`<b>PICK ${esc(prop)}</b> — ${spec && spec.test ? esc(spec.test) : ""}${when.length ? `<span class="g-used">${when.join("  ·  ")}</span>` : ""}`);
  }
  if (c.tokens)  notes.push(`<b>TOKENS</b> — binds ${Array.isArray(c.tokens) ? c.tokens.length : Object.keys(c.tokens).length} c-tier tokens`);

  let demo = "";
  if (S[c.id]) demo = `<div class="g-demo">${S[c.id]}</div>`;

  let props = "";
  if (c.props && Object.keys(c.props).length) {
    props = `<table class="g-props"><tbody>` + Object.entries(c.props).map(([k, v]) =>
      `<tr><th>${esc(k)}</th><td>${esc([].concat(v).join("  ·  "))}</td></tr>`).join("") + `</tbody></table>`;
  }
  return row(c.id, `.${c.class}`, demo + props, c.class ? `.${c.class}` : "", notes);
}

function pageComponents(main) {
  const comps = Object.values(M.components).filter(c => c.family !== CONV_FAMILY);
  const head = opener("COMPONENTS", `${comps.length} components`, [
    "Each entry is the registry speaking for itself — the props are the attributes you write, the states are what the browser applies. Where a live specimen exists it is real markup wearing dist/aods.css, not a picture.",
    "They are grouped by family: named for the end the user has in mind, not for how the component is built."
  ]);
  /* opener() escapes its bodies, which printed this link as markup; the one line that carries a link is built here */
  head.append(el("p", "g-body", `The ${Object.values(M.components).filter(c => c.family === CONV_FAMILY).length} conversational components live on <a class="aods-link" href="conversational.html">their own page</a> — they are a family with rules of their own.`));
  main.append(head);
  for (const [fam, list] of familyGroups(comps)) {
    if (!list.length) continue;
    const s = opener(String(fam).toUpperCase(), `${gloss(fam) || fam} · ${list.length} component${list.length === 1 ? "" : "s"}`, null);
    const wrap = el("div", "g-rows");
    for (const c of list) wrap.append(componentRow(c));
    s.append(wrap); main.append(s);
  }
}

/* ================= CONVERSATIONAL ================= */
function pageConversational(main) {
  const list = [...familyGroups(Object.values(M.components).filter(c => c.family === CONV_FAMILY)).values()].flat();
  main.append(opener("CONVERSATIONAL", `${gloss(CONV_FAMILY) || CONV_FAMILY} · ${list.length} components`, [
    "The assistant family. These are the only components in the system that describe a machine talking back, so they are documented apart from the kit rather than buried at the end of it.",
    "Everything here is built from the same three tiers as the rest of the system — each one binds the c tier and nothing else. What makes it a family is the shared shape of a turn: who spoke, what they said, what the machine did to answer, and what you can do about it."
  ]));

  if (S["conv-demo"]) {
    const w = opener("THE WHOLE EXCHANGE", "One thread, every part in order",
      "Live markup wearing dist/aods.css. Read downward: the date notice, the person's turn, the work the assistant did, its answer with sources and actions, the typing state, and the composer.");
    const d = el("div", "g-demo");
    d.innerHTML = S["conv-demo"];
    w.append(d); main.append(w);
  }

  const parts = opener("THE PARTS", `${list.length} components`, null);
  const wrap = el("div", "g-rows");
  for (const c of list) wrap.append(componentRow(c));
  parts.append(wrap); main.append(parts);
}

/* ================= RULES ================= */
function pageRules(main) {
  const all = (M.laws && M.laws.laws) || [];
  main.append(opener("LAWS", `${all.length} laws, ${all.filter(l => l.gate).length} of them gated`, [
    "One sentence each, grouped by topic. A gated law is not style advice: build.py (R) or lint_pages.py (P) fails on a violation. A rule about one component lives on that component's record."
  ]));
  for (const t of (M.laws && M.laws.topics) || []) {
    const list = lawsOf(t.id);
    if (!list.length) continue;
    const sec = opener(t.id.toUpperCase(), t.gloss, null);
    const rl = el("div", "g-rows");
    for (const l of list) {
      const pair = el("div", "g-pair");
      if (l.ok)  { const c = el("div", "g-case", `<p class="g-kicker">passes</p><pre>${esc(l.ok)}</pre>`); c.setAttribute("data-case", "ok");  pair.append(c); }
      if (l.bad) { const c = el("div", "g-case", `<p class="g-kicker">fails</p><pre>${esc(l.bad)}</pre>`);  c.setAttribute("data-case", "bad"); pair.append(c); }
      rl.append(row(lawGate(l), null, `<p class="g-body" style="margin:0">${esc(l.law)}</p>` + (pair.children.length ? pair.outerHTML : ""), null, null));
    }
    sec.append(rl); main.append(sec);
  }

  const su = M.surface;
  const sf = opener("THE SURFACE CONTRACT", `${su.attribute}="${[].concat(su.values).join("|")}"`, su.note || null);
  sf.append(rows([
    row("dark-capable", `${su.darkCapable.length} components`, `<p class="g-note" style="margin:0">${esc(su.darkCapable.join(" · "))}</p>`, null, null),
    row("light-only",   `${su.lightOnly.length} components`,   `<p class="g-note" style="margin:0">${esc([].concat(su.lightOnly).join(" · "))}</p>`, null,
      ["<b>WHY</b> — these keep their light values inside a dark scope; the build pins them so a surrounding dark surface cannot reach them."]),
    su.partial ? row("partial", `${Object.keys(su.partial).length} components`, `<p class="g-note" style="margin:0">${esc(Object.keys(su.partial).join(" · "))}</p>`, null,
      ["<b>WHY</b> — only the label or help text flips; the control itself does not."]) : null
  ]));
  main.append(sf);

  const li = opener("LINT", `${M.lint.errors.length} errors · ${M.lint.warnings.length} warnings`, null);
  const lw = el("div", "g-rows");
  if (!M.lint.errors.length && !M.lint.warnings.length)
    lw.append(row("clean", null, `<p class="g-body" style="margin:0">The build passes with nothing outstanding.</p>`, null, null));
  for (const e of M.lint.errors)   lw.append(row("error",   null, `<p class="g-body" style="margin:0">${esc(e)}</p>`, null, null));
  for (const e of M.lint.warnings) lw.append(row("warning", null, `<p class="g-body" style="margin:0">${esc(e)}</p>`, null, null));
  li.append(lw); main.append(li);
}

/* Read back what the browser actually computed for each ramp specimen. This is the only
   honest source for weight and tracking — aods.css sets those on the ROLE rule
   (.aods-text[data-role^="ui"] etc.), so they are not per-step tokens to look up. */
function resolveSpecimens() {
  for (const slot of document.querySelectorAll("[data-resolve]")) {
    const rowEl = slot.closest(".g-row");
    const spec  = rowEl && rowEl.querySelector(".g-specimen .aods-text");
    if (!spec) { slot.remove(); continue; }
    const c = getComputedStyle(spec);
    const face = esc(c.fontFamily.split(",")[0].replace(/["']/g, "").replace(/ [a-z]+$/, ""));   // a theme face is named "<Family> <theme id>"; show the family
    let out = `<b>RESOLVED</b> — size ${esc(c.fontSize)} · line-height ${esc(c.lineHeight)} · ${face}`;
    if (SHOW_WEIGHT_TRACKING) {
      const track = c.letterSpacing === "normal" ? "none" : c.letterSpacing;
      out += ` · weight ${esc(c.fontWeight)} · tracking ${esc(track)}`;
    }
    slot.innerHTML = out;
  }
}


/* THE GRID (2026-08-30). Two operator rulings: horizontal space falls on 8 with 4 for precision,
   and vertical space comes off the line-height, with a section padding by twice the line-height of
   the tallest heading it holds. They are ONE grid, and the reason is in the numbers below rather
   than in this comment: every line-height in the scale is already a multiple of 4, so a vertical
   step lands on the 4 grid unasked and a doubled one lands on 8. Read from manifest.space, which
   build.py derives and R24 enforces — nothing here is typed by hand. */
function spaceGrid(main) {
  const sp = M.space; if (!sp) return;
  const s = opener("THE GRID", "One grid, seen from two directions", [
    "Horizontal space falls on " + sp.grid + ", with " + sp.precision + " where " + sp.grid +
    " is too coarse. Vertical space is built from line-heights. Those are not two systems: all " +
    Object.keys(sp.lineHeights).length + " line-heights in this scale are already multiples of " +
    sp.precision + ", so a vertical step lands on the grid for free, and a section pad of two " +
    "line-heights lands on " + sp.grid + " — necessarily, because twice a multiple of " +
    sp.precision + " is a multiple of " + sp.grid + ".",
    "The floor between two components is " + sp.componentFloor + "px, the smallest line-height in " +
    "the system. Tighter than that is spacing WITHIN a component; zero is flush, which is a third " +
    "thing and is how the page chrome stacks."
  ]);
  const off = Object.keys(sp.offGrid || {});
  const list = [
    row("grid", "horizontal", `<b class="g-num">${sp.grid}</b>`, "base 8",
        ["Every spacing value is a multiple of this."]),
    row("precision", "horizontal", `<b class="g-num">${sp.precision}</b>`, "base 4",
        ["Allowed where 8 is too coarse. " + Object.keys(sp.precisionSteps || {}).length +
         " steps use it."]),
    row("floor", "between components", `<b class="g-num">${sp.componentFloor}px</b>`, null,
        ["Measured, not chosen: no gap between two components anywhere in the shipped templates " +
         "falls between 8 and 16."]),
    row("line-heights", "on the 4 grid",
        `<b class="g-num">${Object.values(sp.lineHeights).filter(v => v % 4 === 0).length} / ${Object.keys(sp.lineHeights).length}</b>`,
        null, [sp.allLineHeightsOn4
          ? "All of them. This is the measurement the vertical rule stands on, and R24 fails the build if it stops being true."
          : "<b>NOT all of them</b> — the vertical unit is broken."]),
  ];
  if (off.length) list.push(row("off grid", "legacy",
      `<b class="g-num">${off.length}</b>`, off.join("  ·  "),
      ["These predate the rule. R24 warns rather than fails, because rounding them moves shipped " +
       "pixels and that is a decision, not a build step."]));
  s.append(rows(list));
  main.append(s);

  /* the section ladder: what a section pads by, per the tallest heading it holds */
  const pad = sp.sectionPadding || {};
  const order = Object.entries(pad).sort((a, b) => b[1] - a[1]);
  if (!order.length) return;
  const s2 = opener("SECTION RHYTHM", "A section pads by two line-heights", [
    "The tallest heading in a section sets the space above and below it. Every result lands on " +
    sp.grid + "."
  ]);
  const max = Math.max(...order.map(([, v]) => v), 1);
  s2.append(rows(order.map(([role, v]) => row(
    role, (sp.lineHeights[role] || 0) + "px line",
    `<div class="g-bar-viz" style="width:${Math.max(2, (v / max) * 100)}%"></div>`,
    `${v}px   =   2 \u00d7 ${sp.lineHeights[role]}px   =   ${v / sp.grid} \u00d7 ${sp.grid}`,
    null))));
  main.append(s2);
}

/* ================= MOTION ================= */
/* M46, 2026-08-30. Motion was fully implemented and documented nowhere as a subject — the curves,
   the durations, the six keyframes and the reduced-motion contract were scattered one component at
   a time. Read from manifest.motion, which build.py derives from the shipped CSS, so this page
   cannot describe motion the system does not actually have.
   NOTHING ON THIS PAGE MOVES ON LOAD. A motion page that animates itself is the one page most
   likely to break its own reduced-motion contract, so every demonstration is behind a control and
   every control is disabled when the user has asked for less motion. */
function pageMotion(main) {
  const mo = M.motion;
  if (!mo) { main.append(opener("MOTION", "No motion data in this build", null)); return; }

  main.append(opener("MOTION", "Three curves, the durations, the keyframes", [
    lawsOf("motion").map(l => l.law).join(" "),
    "Everything below is read out of the shipped stylesheet: " + mo.transitions + " transitions, " +
    mo.animations + " animations and " + mo.reducedMotionBlocks + " reduced-motion blocks. Press a " +
    "curve or a duration to play it. Nothing on this page moves until you ask it to, and if your " +
    "system asks for reduced motion the controls stay still."
  ]));

  const EASE_NOTE = {
    standard: "The default. Leaves and arrives with weight — used for every state change.",
    enter:    "Something arriving. Starts at full speed and decelerates into place.",
    exit:     "Something leaving. Accelerates away and is not waited for."
  };
  const es = opener("EASING", "s.motion.ease-*", null);
  es.append(rows(Object.entries(mo.easings).map(([name, curve]) => row(
    name, null,
    `<div class="g-ease"><div class="g-ease-track"><span class="g-ease-dot" data-ease="${esc(curve)}"></span></div>` +
    `<button type="button" class="g-play" data-play="ease">Play</button>` +
    `<svg class="g-ease-plot" viewBox="-6 -6 112 112" aria-hidden="true"><path d="" data-curve="${esc(curve)}"/></svg></div>`,
    "s.motion.ease-" + name + "   →   " + curve,
    [EASE_NOTE[name] ? "<b>IS</b> — " + EASE_NOTE[name] : null]))));
  main.append(es);

  const ds = opener("DURATION", "s.motion.*", [
    "One number per kind of move. A state change is fast because the user caused it and is " +
    "already looking; a panel opening is slower because its height is changing under the text."
  ]);
  const dmax = Math.max(...Object.values(mo.durations).map(v => parseFloat(v) || 0), 1);
  ds.append(rows(Object.entries(mo.durations).map(([name, val]) => {
    const n = parseFloat(val) || 0;
    const wide = n > 1000;
    return row(name, null,
      `<div class="g-bar-viz" style="width:${Math.max(2, (wide ? 100 : (n / 400) * 100))}%"></div>` +
      `<button type="button" class="g-play" data-play="dur" data-ms="${n}">Play</button>`,
      "s.motion." + name + "   →   " + val,
      [wide ? "<b>NOTE</b> — a dwell, not a move: how long a toast stays before it leaves." : null]);
  })));
  main.append(ds);

  const ks = opener("KEYFRAMES", "what actually animates", [
    "Six, and every one of them is used. The list of components under each is derived from the " +
    "stylesheet, so a keyframe that stops being used shows up here as an empty row."
  ]);
  ks.append(rows(Object.entries(mo.keyframes).map(([kf, users]) => row(
    kf, users.length + (users.length === 1 ? " user" : " users"),
    `<button type="button" class="g-play" data-play="kf" data-kf="${esc(kf)}">Play</button>` +
    `<div class="g-kf-stage"><div class="g-kf-box">${esc(kf.replace("aods-", ""))}</div></div>`,
    "@keyframes " + kf,
    [users.length ? "<b>USED BY</b> — " + users.map(esc).join("  ·  ")
                  : "<b>UNUSED</b> — nothing animates this."]))));
  main.append(ks);

  const rs = opener("REDUCED MOTION", "The one thing that is not optional", [
    "prefers-reduced-motion stops all of it. " + mo.reducedMotionBlocks + " blocks in the shipped " +
    "stylesheet honor it. This is a contract, not a nicety: a reader who has asked their system " +
    "for less motion has told you something about how they read, and the system does not argue."
  ]);
  rs.append(rows([row("your setting", null,
    `<b class="g-num" id="g-rm">—</b>`, "@media (prefers-reduced-motion: reduce)",
    ["Read live from this browser. If it says <b>reduce</b>, every control on this page is inert " +
     "and that is the correct behavior, not a bug."])]));
  main.append(rs);

  wireMotion();
}

/* the demonstrations. One listener, delegated, and a hard stop when the user wants less motion. */
function wireMotion() {
  const REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const badge = document.getElementById("g-rm");
  if (badge) badge.textContent = REDUCED ? "reduce" : "no preference";
  /* plot each cubic-bezier as a curve so it can be read without playing it */
  document.querySelectorAll(".g-ease-plot path[data-curve]").forEach(pth => {
    const m = /cubic-bezier\(([^)]+)\)/.exec(pth.getAttribute("data-curve"));
    if (!m) return;
    const [x1, y1, x2, y2] = m[1].split(",").map(v => parseFloat(v));
    pth.setAttribute("d", `M0 100 C ${x1 * 100} ${100 - y1 * 100}, ${x2 * 100} ${100 - y2 * 100}, 100 0`);
  });
  document.addEventListener("click", ev => {
    const b = ev.target.closest(".g-play"); if (!b) return;
    if (REDUCED) return;                       /* asked for less motion: the control does nothing */
    const rowEl = b.closest(".g-specimen");
    const kind = b.getAttribute("data-play");
    if (kind === "ease") {
      const dot = rowEl.querySelector(".g-ease-dot");
      dot.style.transition = "none"; dot.style.transform = "translateX(0)";
      void dot.offsetWidth;
      const track = dot.parentElement;
      const travel = Math.max(0, track.clientWidth - dot.offsetWidth - 8);
      dot.style.transition = `transform 900ms ${dot.getAttribute("data-ease")}`;
      dot.style.transform = `translateX(${travel}px)`;
    } else if (kind === "dur") {
      const ms = Math.min(parseFloat(b.getAttribute("data-ms")) || 200, 1200);
      const bar = rowEl.querySelector(".g-bar-viz");
      bar.style.transition = "none"; bar.style.opacity = ".25";
      void bar.offsetWidth;
      bar.style.transition = `opacity ${ms}ms var(--c-page-motion-ease, linear)`;
      bar.style.opacity = "1";
    } else if (kind === "kf") {
      const box = rowEl.querySelector(".g-kf-box");
      box.style.animation = "none"; void box.offsetWidth;
      box.style.animation = `${b.getAttribute("data-kf")} 700ms var(--c-page-motion-ease-enter, ease) both`;
    }
  });
}

/* ---------- boot ---------- */
/* ================= LAYOUT =================
   Everything on this page comes out of manifest.layout, which build.py resolves from
   docs/layout.json - the numbers are token values and the border pairing is COMPUTED by the
   build, so this page cannot drift from the system it documents. */
/* manifest.laws, one topic at a time: each law one sentence, labeled with the gate that checks it. */
const lawsOf = (...topics) => ((M.laws && M.laws.laws) || []).filter(l => topics.includes(l.topic));
const lawGate = l => [].concat(l.gate || []).join(" ") || "\u2014";
const lawRows = list => rows(list.map(l =>
  row(lawGate(l), null, `<p class="g-body" style="margin:0">${esc(l.law)}</p>`, null, null)));

function layNum(v) { const n = parseFloat(v); return isNaN(n) ? null : n; }

function pageLayout(main) {
  const L = M.layout, MO = L.model || {}, W = L.width || {};
  const gInset = MO.ground ? MO.ground.inset : L.regionInset;
  const cInset = MO.container ? MO.container.inset : null;

  main.append(opener("LAYOUT", "Three components and five laws", [
    "A section is at most three components. Everything else here is a consequence of the five laws, or the measurement that settled it — kept as working rather than added as more rules.",
    "Nothing on this page is typed twice: the numbers are token values, and the border pairing table is computed by the build from the tokens themselves."
  ]));

  /* ---- the three components ---- */
  const cs = opener("THE COMPONENTS", "What each one owns",
    "A section is at most these three, and the division between them is what keeps the numbers from stacking.");
  cs.append(rows([
    MO.ground ? row("ground", MO.ground.inset,
      `<p class="g-body" style="margin:0">Carries <b>${esc(MO.ground.carries)}</b>, and holds its content ${esc(MO.ground.inset)} from ${esc(MO.ground.insetFrom)}.</p>`,
      `${MO.ground.shipsAs || ""}   ·   vertical padding ${MO.ground.verticalPadding}`,
      MO.ground.note ? [`<b>NOTE</b> — ${esc(MO.ground.note)}`] : null) : null,
    MO.container ? row("container", MO.container.inset,
      `<p class="g-body" style="margin:0">Carries <b>${esc(MO.container.carries)}</b>. No fill, no margin, ${esc(MO.container.inset)} from ${esc(MO.container.insetFrom)}, padded ${esc(MO.container.padBlock)}.</p>`,
      `${MO.container.shipsAs || ""}   ·   no fill, no margin`,
      MO.container.note ? [`<b>NOTE</b> — ${esc(MO.container.note)}`] : null) : null,
    MO.paper ? row("paper", MO.paper.inset,
      `<p class="g-body" style="margin:0">Is <b>${esc(MO.paper.is)}</b>. It is placed by <b>${esc(MO.paper.placedBy)}</b>, takes no margin, and holds its content ${esc(MO.paper.inset)} from ${esc(MO.paper.insetFrom)}.</p>`,
      `${MO.paper.shipsAs || ""}   ·   border ${MO.paper.border}`,
      MO.paper.note ? [`<b>NOTE</b> — ${esc(MO.paper.note)}`] : null) : null
  ]));
  if (gInset && cInset) {
    const g = layNum(gInset), c = layNum(cInset);
    cs.append(rows([row("consequence", `${g + c}px`,
      `<p class="g-body" style="margin:0">Window to first character is ${g} + ${c} = <b>${g + c}</b>. An interior seam is ${c} + ${c} = <b>${c * 2}</b> — two container pads, because neither ground contributes at a boundary with no window in it.</p>`,
      null, ["<b>CHECK</b> — a seam measuring " + (g + c) * 2 + " means the ground rule was misapplied. This is arithmetic, not a rule."])]));
  }
  main.append(cs);

  /* ---- the laws ---- */
  {
    const list = lawsOf("layout", "space");
    const lw = opener("THE LAWS", `${list.length} laws the model reduces to`,
      "Everything else in this guide is a consequence of one of these. Each is one sentence from manifest.laws, labeled with the gate that checks it.");
    lw.append(lawRows(list));
    main.append(lw);
  }

  /* ---- width ---- */
  const wd = opener("WIDTH", "Fill, hug, or set", [
    W.namedFor ? "Two containers side by side are named for " + W.namedFor : null
  ]);
  wd.append(rows(Object.entries(W.settings || {}).map(([k, v]) =>
    row(k, v.css, `<p class="g-body" style="margin:0">Takes ${esc(v.takes)}.</p>`, `css — ${v.css}`,
      [v.minimum ? `<b>MINIMUM</b> — ${esc(v.minimum)}` : null,
       v.note ? `<b>NOTE</b> — ${esc(v.note)}` : null]))));
  wd.append(rows(Object.entries(W.variants || {}).map(([k, v]) =>
    row(k, v, layWidthDemo(k), null, null))));
  main.append(wd);

  /* ---- the set ladder, with the text measure derived rather than stated ---- */
  if (L.maxWidth && cInset) {
    const c = layNum(cInset);
    const lad = opener("THE SET LADDER", "A declared width is the container's", [
      "Space is measured from the outside in, so the name is the CONTAINER's width with its own inset already inside it on both edges. The text measure is the name minus " + (c * 2) + "."
    ]);
    const max = Math.max(...Object.values(L.maxWidth).map(v => layNum(v) || 0), 1);
    lad.append(rows(Object.entries(L.maxWidth).map(([k, v]) => {
      const n = layNum(v) || 0;
      return row(k, v,
        `<div class="g-bar-viz" style="width:${Math.max(2, (n / max) * 100)}%"></div>`,
        `container ${n}px   →   text measure ${n - c * 2}px`,
        [`<b>CAPS AT</b> — a ${n + 2 * (layNum(gInset) || 0)}px window, where the ground's inset stops paying.`]);
    })));
    main.append(lad);
  }

  /* ---- the border pairing, computed ---- */
  const BP = L.borderPairing;
  if (BP && BP.resolved) {
    const band = BP.band || {};
    const bp = opener("THE BORDER PAIRING", "Every fill carries a stroke", [
      (lawsOf("color").find(l => l.id === "color-stroke-pairs-by-role") || {}).law,
      band.lo ? `The band is ${band.lo} to ${band.hi} — a visible edge that is not a line you notice. Contrast below is measured by the build, not recorded here.` : null
    ]);
    bp.append(rows(BP.resolved.map(r => {
      const cell = p => {
        if (!p) return `<div class="g-lay-pol" data-band="na"><span class="g-lay-na">n/a</span></div>`;
        return `<div class="g-lay-pol" data-band="${p.inBand ? "in" : "out"}">`
             + `<span class="g-lay-chip" style="background:${esc(p.fillValue)};box-shadow:0 0 0 2px ${esc(p.borderValue)} inset"></span>`
             + `<span class="g-lay-n">${p.contrast.toFixed(2)}</span>`
             + `<span class="g-lay-tag">${p.inBand ? "in band" : "out"}</span></div>`;
      };
      return row(r.fill.replace(/^s\.color\./, ""), r.pinned ? "pinned" : null,
        `<div class="g-lay-pols"><div><p class="g-kicker">light</p>${cell(r.light)}</div>`
        + `<div><p class="g-kicker">dark</p>${cell(r.dark)}</div></div>`,
        `${r.fill}   →   ${r.border}`,
        [r.pinned ? "<b>PINNED</b> — this fill does not flip, so it has one polarity and not two." : null]);
    })));
    if (BP.tints) bp.append(rows([row("tints", "none", `<p class="g-body" style="margin:0">${esc(BP.tints)}</p>`, null, null)]));
    main.append(bp);
  }

  /* ---- truncation ---- */
  const T = L.truncate;
  if (T) {
    const tr = opener("TRUNCATION", "A value with no useful wrap truncates", [(lawsOf("layout").find(l => l.id === "layout-truncate") || {}).law]);
    tr.append(rows([
      row("treatment", T.shipsAs || null, `<pre>${esc(T.declarations)}</pre>`, T.shipsAs ? `${T.shipsAs} &mdash; the class that carries them` : null,
        [T.loadBearing ? `<b>LOAD-BEARING</b> — ${esc(T.loadBearing)}` : null,
         T.shippedBy ? `<b>ALREADY SHIPPED BY</b> — ${esc([].concat(T.shippedBy).join(" · "))}` : null]),
      row("live", null, layTruncDemo(), null, null)
    ]));
    main.append(tr);
  }

  /* ---- grounds ---- */
  if (M.grounds && M.grounds.length) {
    const gr = opener("GROUNDS", `${M.grounds.length} grounds a section can take`, null);
    gr.append(rows(M.grounds.map(g => row(g.id, g.bleed,
      `<div class="g-swatch" style="background:${esc(g.fill)};color:${inkOn(g.fill)}"><span>${esc(g.fill)}</span></div>`,
      g.class ? "." + g.class : null,
      [g.dark ? "<b>DARK</b> — components inside it may carry data-surface=dark." : null]))));
    main.append(gr);
  }

  /* ---- the rest of the geometry ---- */
  const geo = opener("GEOMETRY", "The remaining numbers", null);
  const flat = [];
  for (const k of ["regionInset", "asideWidth"]) if (L[k]) flat.push(row(k, L[k], "", null, null));
  for (const k of ["gutter", "breakpoint"])
    if (L[k]) for (const [kk, vv] of Object.entries(L[k])) flat.push(row(`${k}.${kk}`, vv, "", null, null));
  geo.append(rows(flat));
  main.append(geo);

  layMeasure();
}

/* THE WIDTH VARIANTS, LIVE. Drawn rather than described, because the whole question is what
   max-content and 1fr actually resolve to, and a diagram of that would just be an assertion.
   Each demo reports its own two numbers. */
function layWidthDemo(variant) {
  const cols = variant === "hug-left"  ? "max-content minmax(0, 1fr)"
             : variant === "hug-right" ? "minmax(0, 1fr) max-content"
             : "minmax(0, 1fr) minmax(0, 1fr)";
  const a = variant === "hug-left" ? "hug" : "fill";
  const b = variant === "hug-right" ? "hug" : "fill";
  return `<div class="g-lay-row" data-variant="${variant}" style="grid-template-columns:${cols}">`
       + `<div class="g-lay-cell" data-w="${a}"><span>${a}</span></div>`
       + `<div class="g-lay-cell" data-w="${b}"><span>${b}</span></div></div>`
       + `<p class="g-lay-read"></p>`;
}

function layTruncDemo() {
  const u = "https://agency.example/programs/modernization/2026/appendix-c/attachment-17-final.pdf";
  return `<div class="g-lay-trunc"><p class="g-lay-wrap">${esc(u)}</p>`
       + `<p class="g-lay-clip">${esc(u)}</p></div><p class="g-lay-read" data-trunc="1"></p>`;
}

/* MEASURED AFTER THE FONTS RESOLVE, NOT AT FIRST PAINT. A readout taken before document.fonts.ready
   reports the FALLBACK face's numbers - which is how the layout board came to print an ink of 903
   where the rendered ink was 826 (caught 2026-08-31). Measure-capped numbers survive that; content
   -sized ones do not. */
function layMeasure() {
  const run = () => {
    document.querySelectorAll(".g-lay-row").forEach(g => {
      const k = [...g.children], out = g.parentElement.querySelector(".g-lay-read:not([data-trunc])");
      if (!out || k.length < 2) return;
      const w = n => Math.round(n.getBoundingClientRect().width);
      out.textContent = `${k[0].dataset.w} ${w(k[0])} · ${k[1].dataset.w} ${w(k[1])} · row ${w(g)}`;
    });
    document.querySelectorAll(".g-lay-trunc").forEach(d => {
      const clip = d.querySelector(".g-lay-clip"), wrap = d.querySelector(".g-lay-wrap");
      const out = d.parentElement.querySelector('.g-lay-read[data-trunc]');
      if (!out || !clip || !wrap) return;
      const box = Math.round(clip.getBoundingClientRect().width);
      const lh = parseFloat(getComputedStyle(wrap).lineHeight) || 22;
      out.textContent = `wrapping ${Math.round(wrap.getBoundingClientRect().height / lh)} lines`
        + ` · truncating 1 line · ink ${clip.scrollWidth} in a box of ${box}`
        + (clip.scrollWidth > Math.ceil(box) ? " · CLIPPED" : "");
    });
  };
  addEventListener("resize", run); run();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(run);
}

const RENDER = { cover: pageCover, typography: pageTypography, color: pageColor, space: pageSpace, layout: pageLayout, motion: pageMotion, components: pageComponents, conversational: pageConversational, rules: pageRules };
document.addEventListener("DOMContentLoaded", () => {
  const which = document.body.dataset.guide;
  /* THE MASTHEAD COMES FIRST (2026-08-25). doc-header.js mounts the documentation header at the top of
     <body>; prepending unconditionally put the guide's own bar ABOVE it, so the page opened with a
     second-level nav and the way home underneath it. Insert after the masthead when there is one. */
  var _mast = document.body.querySelector(":scope > .aods-header");
  if (_mast) _mast.insertAdjacentElement("afterend", bar()); else document.body.prepend(bar());
  const main = $("#g-main");
  if (main && RENDER[which]) {
    if (which !== "cover") { const w = el("div", "g-wrap"); main.append(w); RENDER[which](w); }
    else RENDER[which](main);
  }
  document.body.append(foot());
  resolveSpecimens();
  document.title = `${(PAGES.find(p => p[0] === (location.pathname.split("/").pop() || "index.html")) || [,"Guide"])[1]} · ${M.name} style guide`;
});
})();
