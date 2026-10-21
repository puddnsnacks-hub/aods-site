/* AODS — "What the machine reads".
   The page builds itself from dist/. It types no token value, no component list, no rule and
   no count: everything factual is read at load from window.AODS_MANIFEST, window.AODS_TOKENS,
   window.AODS_INDEX, window.AODS_PALETTE and window.AODS_SPECIMENS. The only authored text here is the PROSE that
   explains what each metadata field MEANS and what a builder does with it — which is the one
   thing the data cannot say about itself. Rebuild the system and this page follows.

   Script tags, not fetch, so it works from file://. */

const M = window.AODS_MANIFEST, T = window.AODS_TOKENS, P = window.AODS_PALETTE || {}, S = window.AODS_SPECIMENS || {};
const MAIN = document.getElementById("m-main");
/* THE FAMILIES ARE DATA (2026-09-19): order, gloss and members come from manifest.families
   (index/families.json). This page names no family; it reads them. */
const FAM = M.families || { order: [], gloss: {}, members: {} };
const famTitle = f => String(f).charAt(0).toUpperCase() + String(f).slice(1);
const famGloss = f => { const g = (FAM.gloss || {})[f] || ""; return g ? g.charAt(0).toUpperCase() + g.slice(1) + "." : ""; };

const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const h = (tag, attrs = {}, html = "") => { const e = document.createElement(tag); for (const [k, v] of Object.entries(attrs)) if (v !== null && v !== undefined && v !== false) e.setAttribute(k, v === true ? "" : v); e.innerHTML = html; return e; };
const byVar = {}; for (const [n, t] of Object.entries(T)) byVar[t.cssVar] = { name: n, ...t };
const tok = v => byVar[v] || null;
const chip = v => `<span class="m-chip" style="background:${esc(v)}"></span>`;
const val = t => (t.type === "color" ? chip(t.light) : "") + esc(t.light);
const darkCell = t => t.flips ? (t.type === "color" ? chip(t.dark) : "") + esc(t.dark) : `<span class="m-same">same</span>`;
const list = (arr, n = 3) => {
  const a = (arr || []).map(esc);
  if (!a.length) return `<span class="m-same">—</span>`;
  if (a.length <= n) return `<span class="m-mono">${a.join("<br>")}</span>`;
  return `<span class="m-mono">${a.slice(0, n).join("<br>")}</span><details class="m-more"><summary>+${a.length - n} more</summary><div>${a.slice(n).join("<br>")}</div></details>`;
};

/* ---------------------------------------------------------------- page primitives */
/* The rail's group name is also a level of the document: printed once, where the group begins,
   above the section's own heading. ORIENTATION → TOKEN METADATA → COMPONENT METADATA → … */
let lastGroup = null;
function section(id, nav, title) {
  const s = h("section", { class: "m-section", id, "data-nav": nav });
  const group = (nav.split("||")[0] || "").split("/")[0];
  if (group && group !== lastGroup) { s.append(h("p", { class: "m-group" }, esc(group))); lastGroup = group; }
  s.append(h("h2", {}, esc(title)));
  MAIN.append(s);
  return s;
}
function p(host, html) { host.append(h("p", {}, html)); return host; }

/* the one collapsible-table primitive — every table on this page is one of these */
function table(host, { title, note, head, rows, open = false, count }) {
  const d = h("details", { class: "m-table", open });
  d.append(h("summary", {}, `<span>${esc(title)}</span><span class="m-table__count">${esc(count ?? (rows.length + (rows.length === 1 ? " row" : " rows")))}</span>`));
  const body = h("div", { class: "m-table__body" });
  if (note) body.append(h("p", { class: "m-table__note" }, note));
  const scroll = h("div", { class: "m-scroll" });
  scroll.innerHTML = `<table class="m-grid"><thead><tr>${head.map(c => `<th>${esc(c)}</th>`).join("")}</tr></thead>`
    + `<tbody>${rows.map(r => `<tr>${r.join("")}</tr>`).join("")}</tbody></table>`;
  body.append(scroll);
  d.append(body);
  host.append(d);
  return d;
}
const td = (html, cls) => `<td${cls ? ` class="${cls}"` : ""}>${html}</td>`;

/* ================================================================ 1 · orientation */
{
  const head = h("header", { class: "m-head", id: "top", "data-nav": "Orientation||What this page is" });
  lastGroup = "Orientation";
  head.innerHTML = `
    <p class="m-group">Orientation</p>
    <p class="m-eyebrow">AODS · V${esc(M.version)} · generated ${esc(M.generated)}</p>
    <h1>What the machine reads</h1>
    <p class="m-lede">Every fact an AI builder can read about this design system, in one place — and, next to each
      one, what the field is for. A person writing a page reads the components. An agent writing a page reads
      <em>this</em>: the tiers, the families, the contracts, the props, the states, the bound tokens, and the laws
      the build and the page linter enforce.</p>
    <p class="m-lede">Nothing on this page was typed twice. The prose explaining each field is authored; every value,
      count, component, token and rule beside it is read at load from the same five files an agent reads
      — <code>dist/manifest.js</code>, <code>dist/tokens.js</code>, <code>dist/index.js</code>,
      <code>dist/palette.js</code>, <code>docs/specimens.js</code>. The page is built out of the system it documents: its own CSS binds
      <code>--s-*</code> tokens only, and every component below is the real, running component.</p>
    <div class="m-stats">
      ${[["tokens", M.counts.tokens], ["components", M.counts.components], ["typefaces", M.counts.faces],
         ["page templates", M.counts.pages], ["laws", M.laws.laws.length], ["gated laws", M.laws.laws.filter(l => l.gate).length],
         ["lint errors", M.lint.errors.length]]
        .map(([k, v]) => `<div class="m-stat"><b>${v}</b><span>${k}</span></div>`).join("")}
    </div>`;
  MAIN.append(head);
}

/* ---- where the metadata lives */
{
  const s = section("files", "Orientation||Where the metadata lives", "Where the metadata lives");
  /* the counts in the sentence are counted from the table, so adding a row cannot make the prose wrong */
  const FILES = [
      ["tokens/g.json", "hand", "The global tier: literal values only — color ramps, the space scale, type steps, durations, easing curves.", "Read to see what raw material exists. Never bind one of these from a component (R4)."],
      ["tokens/s.json", "hand", "The semantic tier: meaning. References <code>g.*</code>, and carries <code>$dark</code> — the light/dark flip lives here and nowhere else.", "Read to find the intent you want (<code>action.base</code>, <code>surface.raised</code>). Page CSS binds these."],
      ["tokens/c.json", "hand", "The component tier: the contract each component binds. References <code>s.*</code> only.", "Add a leaf here when a component needs a value that does not exist yet, then rebuild."],
      ["components/registry.json", "hand", "The per-component record — family, class, summary, element, props, states, ground, a11y, starter markup, notes — every record in one field order (<code>build/record_shape.py</code>).", "The AUTHORED contract, and it stays in the source tree \u2014 a release carries the built one. Reading from a release, the law book is <code>dist/manifest.json</code>, which holds these same records plus their bound tokens, selectors and behavior."],
      ["index/families.json", "hand", "The component families: their order, a gloss for each (what the user does with it), and their members.", "Copied whole into <code>manifest.families</code>. Read it there; every grouping of components on these pages follows its order."],
      ["components/CHOOSE.md &middot; dist/CHOOSE.md", "hand", "Every “which component” decision, in one document: a section per family, each decision a question whose answers name one component, and a last section of what is NOT in the system and what to use instead. <code>manifest.chooser</code> gives its path.", "Read it before picking a component. It is Markdown, not a script, so no page here can load it from a double-clicked file — open it beside the manifest."],
      ["docs/specimens.js", "hand", "Real, running markup for every component, on both grounds.", "Copy a specimen as the starting point instead of inventing markup."],
      ["dist/tokens.json &middot; tokens.js", "build", "Every token flattened and fully resolved: light value, dark value, whether it flips, and every consumer.", "The lookup table. Resolve a name to a value, or a value to everything downstream of it."],
      ["dist/manifest.json &middot; manifest.js", "build", "The components with their bound tokens and selectors, the families, the token tier map, the surface contract, the laws, the page templates, the lint report.", "The single richest file. If an agent reads one thing, read this."],
      ["dist/index.json &middot; index.js", "build", "The intent index: every capability (a component, or one value of one prop) and the words people use for it. Its <code>map</code> names every shipped file and says what it is — printed in full below.", "Resolve a word the user said to the component or value it means. Opened first, its <code>map</code> sends an agent to the right file."],
      ["dist/palette.js", "build", "The color ramps as plain objects.", "Drawing swatches, or checking which rung a hex belongs to."],
  ];
  const nHand = FILES.filter(r => r[1] === "hand").length, nBuild = FILES.length - nHand;
  const word = n => ["no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"][n] || String(n);
  const cap = w => w.charAt(0).toUpperCase() + w.slice(1);
  p(s, `${cap(word(FILES.length))} files carry everything. ${cap(word(nHand))} are <b>authored</b> — a person decides what goes in them. ${cap(word(nBuild))} are
    <b>generated</b> by <code>build/build.py</code>, which is also the thing that refuses to build when an
    authored file breaks a rule. An agent should read the generated files (they are resolved and complete) and
    edit the authored ones (they are the source of truth).`);
  table(s, {
    title: "The files an AI builder reads", open: true,
    head: ["file", "written by", "what it holds", "what a builder does with it"],
    rows: FILES.map(r => [td(`<span class="m-mono">${r[0]}</span>`), td(esc(r[1])), td(r[2], "m-prose"), td(r[3], "m-prose")]),
  });
  /* THE MAP IS READ, NOT RETYPED (2026-09-19). dist/index.json carries a `map` of every shipped file and
     what it is, for an agent that opens the index first. index.js is its script-tag twin, so the map
     prints here as the build wrote it. */
  const MAP = (window.AODS_INDEX || {}).map;
  if (MAP) table(s, {
    title: "dist/index.json · map — every shipped file, in the index's own words", count: `${Object.keys(MAP).filter(k => !k.startsWith("$")).length} files`,
    note: MAP.$read ? esc(MAP.$read) : null,
    head: ["file", "what it is"],
    rows: Object.entries(MAP).filter(([k]) => !k.startsWith("$")).map(([k, v]) => [td(`<span class="m-mono">${esc(k)}</span>`), td(esc(v), "m-prose")]),
  });
  const pre = h("pre", {}, esc(
`<!-- the 60-second contract: three files, and the metadata twins beside them -->
<link rel="stylesheet" href="dist/tokens.css">   <!-- :root + the dark scope -->
<link rel="stylesheet" href="dist/aods.css">      <!-- the components -->
<script src="dist/aods.js" defer><\/script>       <!-- behaviors + the icon sprite -->

<script src="dist/manifest.js"><\/script>        <!-- window.AODS_MANIFEST -->
<script src="dist/tokens.js"><\/script>          <!-- window.AODS_TOKENS -->`));
  s.append(pre);
  p(s, `<span class="m-extag">note</span>The <code>.js</code> twins exist so a page can read the metadata with a
    plain script tag — no fetch, no server. That is why every documentation page here, including this one, works
    from a double-clicked file.`);
}

/* ---- the shape of the system */
{
  const s = section("shape", "Orientation||The shape of the system", "The shape an agent has to hold");
  p(s, `Three token tiers, one direction of reference, and one hard boundary at each hop. Everything else on this
    page is detail hanging off this diagram.`);
  const pre = h("pre", {}, esc(
`g  global    literals only                    #017097   16px   400ms
│               ▲ nothing references upward
s  semantic  meaning; carries $dark           {g.color.brand.vivid.50}  → light #017097 · dark #3cb1de
│               ▲ the ONLY tier that knows about ground
c  component the contract a component binds   {s.color.action.base}
│
└─ components/aods.css binds --c-* only        var(--c-button-primary-fill)
   page + doc CSS binds --s-* only         var(--s-color-surface-sunken)`));
  s.append(pre);
  const dl = h("dl", { class: "m-deflist" });
  dl.innerHTML = Object.entries(M.tiers).map(([k, v]) =>
    `<dt>${esc(k)}<span class="m-table__count"> · ${Object.values(T).filter(t => t.tier === k).length} tokens</span></dt><dd>${esc(v)}</dd>`).join("");
  s.append(dl);
  const c = h("div", { class: "m-callout" });
  c.innerHTML = `<p><b>The one thing agents get wrong.</b> There is no dark mode. <code>data-surface="dark"</code>
    is a <em>variant on specific components</em>, used to break a layout up and carry hierarchy. Putting it on a
    component that is not dark-capable does nothing at all — the attribute has no selector. The list of which
    components can carry it is data: <code>manifest.surface</code>, printed in full below.</p>`;
  s.append(c);
}

/* ================================================================ 2 · token metadata */
const TOKEN_AUTHORED = [
  ["$value", "every leaf, all three tiers",
    "The value. At <code>g</code> it is a literal (<code>#017097</code>, <code>16px</code>, <code>400ms</code>). At <code>s</code> and <code>c</code> it is a reference in braces: <code>{g.color.brand.vivid.50}</code>.",
    "This is the line you edit. A leaf without <code>$value</code> fails the build — note the <code>$</code>; plain <code>value</code> is the most common authoring mistake."],
  ["$type", "every leaf",
    `The DTCG type. In this system: ${[...new Set(Object.values(T).map(t => t.type))].sort().map(t => `<code>${esc(t)}</code>`).join(", ")}.`,
    "Tells you what CSS property the token may legally land on, and lets a generator emit correct units without guessing."],
  ["$description", "any leaf, optional",
    "Free prose, by convention opening with <code>RULE:</code> (a standing constraint) or <code>RULING &lt;date&gt;:</code> (a decision, dated, in the words it was made in).",
    "The <em>why</em>. Read it before changing a value — most descriptions are the record of an argument that was already had."],
  ["$note", "any leaf, optional",
    `Prose like <code>$description</code>, for a DIFFERENT AUDIENCE. The description is builder-facing \u2014 what the token is for. The note is the record: why the value is what it is, what was tried, who decided and when. ${M.counts && M.counts.notes ? M.counts.notes : "Many"} tokens carry one.`,
    "Read it before changing a value; you will almost never write one. It is also the field that decides DISTRIBUTION: <code>$note</code> never reaches a build-agent payload, because rationale is design-agent material. The proof is on this page \u2014 the resolved shape below has a <code>description</code> column and no note column, because <code>dist/tokens.json</code> carries one and not the other. A packet that ships the authored <code>tokens/</code> is shipping the argument with them."],
  ["$dark", "<code>s</code> tier only",
    "The value this token takes inside a dark-capable component. Its presence is the entire mechanism of the flip.",
    "R3 forbids <code>$dark</code> on <code>c.*</code>. If a component needs to look different on dark, the answer is an <code>s</code> token that flips — never a second component token."],
  ["$allow-radius", "<code>s</code> tier only",
    "Declares a token an exception to “corner radius is 0”. Without it the build fails any radius that resolves to a non-zero value (R6).",
    "You will almost never add one. It exists for the conversational family and the step circles, and each one is a ruling."],
  ["$comment", "file and group level",
    "A note attached to a file or a group rather than a token — the fixed federal copy on <code>gov-banner</code> is one.",
    "Read it; it usually says “do not edit this”."],
];

const TOKEN_RESOLVED = [
  ["<em>key</em>", "The dotted address — <code>c.button.primary-fill</code>. Every other file refers to a token by this string.", "How you look a token up, and how <code>consumers</code> lists point at each other."],
  ["tier", "<code>g</code>, <code>s</code> or <code>c</code>.", "Decides what may legally reference it (R1–R3) and whether a component may bind it (R4: only <code>c</code>)."],
  ["cssVar", "The custom property name — <code>--c-button-primary-fill</code>.", "Literally what you type in CSS. Never derive it from the key by hand; multi-word segments make that guess wrong."],
  ["type", "The <code>$type</code>, carried through.", "Same use as above, now available without opening the source file."],
  ["raw", "The authored <code>$value</code> before resolution — a literal at <code>g</code>, a <code>{…}</code> reference at <code>s</code> and <code>c</code>.", "Shows the next hop up the chain, so you can walk <code>c → s → g</code> and see where a value is really decided."],
  ["rawDark", "The authored <code>$dark</code>, or <code>null</code>.", "Tells you whether the flip was declared <em>here</em> or inherited from further up the chain."],
  ["light", "The fully resolved value on the light ground.", "What actually renders. Also what to assert against in a test."],
  ["dark", "The fully resolved value inside a <code>data-surface=\"dark\"</code> scope. Equal to <code>light</code> when the token does not flip.", "What renders on a dark surface, without simulating the cascade in your head."],
  ["flips", "Boolean: <code>light</code> ≠ <code>dark</code>.", "The fastest possible check for “will this hold up on a dark surface?”. Filter on it before proposing a dark variant."],
  ["description", "The <code>$description</code>, carried through.", "The ruling, available at lookup time."],
  ["consumers", "Everything that references this token: <code>c</code>-tier paths for <code>g</code> and <code>s</code> tokens, and the literal consuming file (<code>components/aods.css</code>, <code>docs/doc.css</code>) for <code>c</code> tokens.", "Impact analysis. Before changing a <code>g</code> value, read <code>consumers</code> to see everything downstream. An empty list is the R7/R8 signal: a <code>c</code> token nothing binds fails the build; an <code>s</code> token nothing binds is a warning."],
];

/* ---- how to name a token, and what to call things (2026-08-31)
   operator: "I would like a diagram of the different names of the segments in a token name, like
   'leaf' and the others. the documents should also be a glossary of how to talk about the system."
   Every segment word below is one the BUILD already uses — tier, block, leaf, ramp, rung, family,
   state — so this documents the vocabulary rather than inventing a parallel one. The specimens are
   read from the live token set, so the diagram cannot drift from the names it is describing. */
{
  const s = section("naming", "Orientation||How to say it", "How to name a token, and what to call things");
  p(s, `Two agents describing the same token should use the same words for its parts. These are the
    words the build itself uses — <code>tier</code>, <code>block</code>, <code>leaf</code>,
    <code>ramp</code>, <code>rung</code>, <code>state</code> — not a parallel vocabulary invented
    for the documentation.`);

  /* pick real tokens, so a rename breaks this diagram rather than dating it silently */
  const pick = (pred, fallback) => (Object.keys(T).find(pred) || fallback);
  const gName = pick(n => /^g\.color\.brand\.[a-z]+\.\d+$/.test(n), "g.color.brand.gray.10");
  const sName = pick(n => n === "s.color.surface.page", "s.color.surface.page");
  const cName = pick(n => n === "c.card.emphasis-edge", "c.card.emphasis-edge");

  const ANATOMY = [
    { name: gName, parts: ["tier", "group", "family", "ramp", "rung"], split: gName.split("."),
      note: "A global token. The last segment of a ramp is a <b>rung</b> — a numbered step. Rungs are spare by design: nothing has to bind one." },
    { name: sName, parts: ["tier", "group", "family", "leaf"], split: sName.split("."),
      note: "A semantic token. The <b>leaf</b> is the terminal segment — the one carrying <code>$value</code>. This is the only tier that also carries <code>$dark</code>." },
    { name: cName, parts: ["tier", "block", "name"], split: [cName.split(".")[0], cName.split(".")[1], cName.split(".").slice(2).join(".")],
      note: "A component token. The <b>block</b> is the component it belongs to; the <b>name</b> is everything after it, and is where the naming rules in R10 apply." }
  ];
  const wrap = h("div", { class: "m-anat" });
  wrap.innerHTML = ANATOMY.map(a => `
    <div class="m-anat__row">
      <code class="m-anat__full">${esc(a.name)}</code>
      <div class="m-anat__segs">${a.split.map((seg, i) =>
        `<span class="m-anat__seg"><b>${esc(seg)}</b><i>${esc(a.parts[i] || "")}</i></span>`).join(
        `<span class="m-anat__dot">.</span>`)}</div>
      <p class="m-anat__note">${a.note}</p>
    </div>`).join("");
  s.append(wrap);

  p(s, `A component <b>name</b> has its own grammar, and R10 enforces it. Read left to right: what
    part of the component, what it paints, which property, and — always last — the state.`);
  const nm = h("div", { class: "m-anat m-anat--name" });
  const NPARTS = [["item", "part"], ["edge", "role"], ["width", "property"], ["selected", "state"]];
  nm.innerHTML = `
    <div class="m-anat__row">
      <code class="m-anat__full">c.menu.item-edge-width-selected</code>
      <div class="m-anat__segs">${NPARTS.map(([seg, lab]) =>
        `<span class="m-anat__seg"><b>${esc(seg)}</b><i>${esc(lab)}</i></span>`).join(
        `<span class="m-anat__dot">-</span>`)}</div>
      <p class="m-anat__note">The <b>state</b> goes last, never first and never in the middle —
        <code>surface-selected</code>, not <code>selected-surface</code>. The build fails on both.</p>
    </div>`;
  s.append(nm);

  /* ---- the glossary */
  p(s, `<b>The glossary.</b> Words with a fixed meaning in this system. Where a word could mean two
    things, only one of them is correct here.`);
  const G = [
    ["Tiers", [
      ["g · global", "A literal value. References nothing, and nothing outside g may be a literal."],
      ["s · semantic", "Meaning. The only tier that carries <code>$dark</code>, so the only tier that knows a ground can flip."],
      ["c · component", "The contract a component binds. Components bind <code>--c-*</code> and nothing else."]
    ]],
    ["Parts of a name", [
      ["tier", "g, s or c — the first segment."],
      ["group", "The kind of thing: color, space, type, size, radius."],
      ["family", "The role group inside a tier — surface, action, status, border, emphasis."],
      ["ramp", "A family whose members are numbered."],
      ["rung", "One numbered step on a ramp. Rungs may be unbound without being dead."],
      ["leaf", "The terminal segment — the one that carries a value."],
      ["block", "In the c tier, the component a token belongs to."],
      ["name", "In the c tier, everything after the block."],
      ["state", "hover, pressed, disabled, selected, current, checked, complete, upcoming. Always the last word."],
      ["compound part", "A part name can be one noun of several words &mdash; <code>quote-mark</code> is a quotation mark, not a part plus a role. It mints no vocabulary."]
    ]],
    ["What a color is for — the five words", [
      ["ink", "The color of a mark: text, and marks that read as text — icons, bullets, glyphs."],
      ["fill", "The color of a painted area. <code>surface</code> and <code>action</code> are families of fills."],
      ["border", "A stroke that surrounds a fill, and pairs to that fill."],
      ["divider", "A stroke that separates two things and belongs to neither, so it takes a divider color rather than a pairing."],
      ["edge", "A one-sided stroke that carries <b>state</b> — severity, emphasis level, selection."]
    ]],
    ["Layout", [
      ["ground", "Carries the color. Holds its content 32 from the window's side edges; never has vertical padding."],
      ["container", "Carries the content. No fill, no margin, 24 from the color, padded 1.5 &times; its own largest line-height."],
      ["paper", "A container that carries a fill — so it also takes a margin and a stroke."],
      ["fill / hug / set", "The three widths a container can be set to. Two side by side are named for the one that is not fill."],
      ["seam", "Where two columns meet. Always 24 + 24 = 48 &mdash; two container pads, because a ground has no vertical padding and contributes nothing at a boundary with no window in it."],
      ["law", "One of the five statements the layout model reduces to. Everything else in the model is a consequence of one of them, or the measurement that settled it."],
      ["measure", "The max-width a text component binds &mdash; <code>s.size.measure-prose</code>, 672. It is what stops a hugging container from asking for a paragraph on one line, so hug needs no validity condition."],
      ["truncate", "What a value with no useful wrap does instead of wrapping: one line, clipped at the box, with an ellipsis. A <b>text</b> rule and not a sixth law &mdash; copy wraps at its measure, a value truncates at its box, and hug, fill and set treat both identically."]
    ]],
    ["Words that are easy to misuse", [
      ["rule", "A <b>law of the system</b>. Never a line — a line that separates is a divider. Retired from every token name 2026-08-31 for exactly this reason."],
      ["polarity", "Light or dark. A property of a value, not of a page: light at step 10 or under, dark at 60 or over."],
      ["flip", "The light-to-dark substitution, which happens on a component carrying <code>data-surface=\"dark\"</code> — never on a page."],
      ["theme", "A brand color swap. A theme replaces the four brand ramps and nothing else."],
      ["band", "The contrast range a stroke has to land in against its own fill — the shipped light pairings sit between 1.21 and 1.56."],
      ["dark mode", "Does not exist. Say <b>dark variant</b>, or name the component."],
      ["family", `Two senses. In a token name, the role group inside a tier (surface, action, status). On a component, one of the ${FAM.order.length} groups in <code>manifest.families</code>, named for the end the user has in mind rather than the mechanism: ${FAM.order.map(f => `<code>${esc(f)}</code>`).join(", ")}.`],
      ["tier", "Tokens only: <code>g</code>, <code>s</code>, <code>c</code>. Components carried a tier until 2026-09-19; the families replaced it."],
      ["truncation", "Painted, not measured. Clipping does not reduce a max-content contribution, so truncating can never rescue a track that came out too wide &mdash; the same shape as law 2."]
    ]]
  ];
  const gl = h("div", { class: "m-gloss" });
  gl.innerHTML = G.map(([title, rows]) => `
    <h3 class="m-gloss__h">${esc(title)}</h3>
    <dl class="m-deflist">${rows.map(([t, d]) => `<dt>${t}</dt><dd>${d}</dd>`).join("")}</dl>`).join("");
  s.append(gl);
}

{
  const s = section("token-fields", "Token metadata||Fields on every token", "Token metadata, field by field");
  p(s, `A token appears twice: once as you author it, and once as the build resolves it. Both shapes are metadata
    an agent reads, and they answer different questions. The authored shape says what was <em>decided</em>. The
    resolved shape says what will <em>render</em>.`);

  table(s, {
    title: "Authored — the fields in tokens/g.json, s.json, c.json", open: true,
    head: ["field", "appears on", "what it is", "what an AI builder uses it for"],
    rows: TOKEN_AUTHORED.map(r => [td(`<span class="m-mono m-tok">${r[0]}</span>`), td(r[1], "m-prose"), td(r[2], "m-prose"), td(r[3], "m-prose")]),
  });
  const ex = h("pre", {}, esc(
`tokens/s.json
  "action": {
    "base": {
      "$value": "{g.color.brand.vivid.50}",
      "$type": "color",
      "$description": "RULE: primary buttons are step 50 of the action family, on both grounds."
    }
  }`));
  s.append(ex);

  table(s, {
    title: "Resolved — the fields in dist/tokens.json (window.AODS_TOKENS)", open: true,
    head: ["field", "what it is", "what an AI builder uses it for"],
    rows: TOKEN_RESOLVED.map(r => [td(`<span class="m-mono m-tok">${r[0]}</span>`), td(r[1], "m-prose"), td(r[2], "m-prose")]),
  });

  s.append(h("h3", {}, "One token, all the way down"));
  p(s, `The same decision seen at each tier. This is what “bind the contract, not the value” means in practice:
    the button never mentions a color, the semantic tier never mentions a button, and the global tier never
    mentions anything at all.`);
  /* Each token is printed as it really is, with leader lines drawn to the parts that carry the
     argument. Not every line — only the ones that say something about how the chain holds. */
  const NOTES = {
    "g.color.brand.vivid.50": [
      ["tier", "The global tier", "Literal values live here and nowhere above. This is raw material, not a decision."],
      ["raw", "The value itself", "A g token points at nothing — it IS the hex. Every other tier eventually lands here."],
      ["dark", "No flip at this tier", "Light and dark read the same: a literal has no opinion about the ground it sits on."],
      ["consumers", "Who may bind it", "Semantic tokens only. A component that binds a g token fails the build (R4)."],
    ],
    "s.color.action.base": [
      ["raw", "The pointer upward", "The only tier allowed to name a g token — the one place a literal gets chosen."],
      ["flips", "Where the ground lives", "true would mean the value changes on a dark surface. The flip exists at this tier and nowhere else — this particular decision holds on both grounds."],
      ["dark", "The other ground", "What the intent resolves to on a dark surface — the same hex here, because this decision does not flip."],
      ["consumers", "Who may bind it", "Component tokens, plus page and documentation CSS (R5)."],
    ],
    "c.button.primary-fill": [
      ["cssVar", "What the stylesheet writes", "The only name a component may mention: --c-*, never --s-* or --g-*."],
      ["raw", "The contract", "Points at meaning, never at a value. The button never learns what color it is."],
      ["consumers", "Who binds it", "Exactly one component. A c token nothing binds is an error and the build stops."],
    ],
  };
  const chain = ["g.color.brand.vivid.50", "s.color.action.base", "c.button.primary-fill"].map(n => [n, T[n]]).filter(([, t]) => t);
  const redraws = [];
  for (const [name, t] of chain) {
    const notes = NOTES[name] || [];
    const keys = new Set(notes.map(n => n[0]));
    const wrap = h("div", { class: "m-annot" });

    const code = h("pre", { class: "m-annot__code" });
    code.innerHTML = JSON.stringify(t, null, 1).split("\n").map(line => {
      const key = (line.match(/^\s*"([^"]+)":/) || [])[1];
      const noted = key && keys.has(key);
      return `<span class="m-annot__line"${noted ? ` data-key="${esc(key)}" data-noted` : ""}>${esc(line) || " "}</span>`;
    }).join("");   /* the spans are already blocks — a newline between them would print a second, empty line */

    const col = h("div", { class: "m-annot__notes" });
    for (const [key, title, text] of notes) col.append(h("div", { class: "m-annot__note", "data-for": key }, `<b>${esc(title)}</b><span>${esc(text)}</span>`));

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "m-annot__wires"); svg.setAttribute("aria-hidden", "true");
    wrap.append(code, col, svg);
    s.append(wrap);

    /* the wires are measured, never guessed: they are redrawn on resize and once the fonts land */
    const draw = () => {
      const box = wrap.getBoundingClientRect();
      if (!box.width || getComputedStyle(svg).display === "none") return;
      svg.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
      svg.setAttribute("width", box.width); svg.setAttribute("height", box.height);
      let d = "", dots = "";
      for (const [key] of notes) {
        const line = code.querySelector(`[data-key="${key}"]`), note = col.querySelector(`[data-for="${key}"]`);
        if (!line || !note) continue;
        const l = line.getBoundingClientRect(), n = note.getBoundingClientRect();
        const x1 = Math.min(l.right, code.getBoundingClientRect().right) - box.left + 4;
        const y1 = l.top + l.height / 2 - box.top;
        const x2 = n.left - box.left - 6, y2 = n.top - box.top + 9;
        const mid = x1 + Math.max(14, (x2 - x1) * 0.4);
        d += `M${x1} ${y1} H${mid} V${y2} H${x2} `;
        dots += `<circle cx="${x1}" cy="${y1}" r="2.5"/>`;
      }
      svg.innerHTML = `<path d="${d}" fill="none"/>${dots}`;
    };
    redraws.push(draw);
  }
  const drawAll = () => redraws.forEach(f => f());
  requestAnimationFrame(drawAll);
  addEventListener("resize", drawAll);
  document.fonts?.ready.then(drawAll);
}

/* ---- every g and s token */
/* The description reads second, right after the name — it is the thing a person needs. Everything
   the machine resolves (type, raw, light, dark, consumers) rides in ONE column as a labeled block,
   so the table is three columns wide instead of seven and never scrolls sideways to be read. */
const resolved = t => `<dl class="m-res">
  <dt>type</dt><dd>${esc(t.type)}</dd>
  <dt>raw</dt><dd>${esc(t.raw)}</dd>
  <dt>light</dt><dd>${val(t)}</dd>
  <dt>dark</dt><dd>${darkCell(t)}</dd>
  <dt>used by</dt><dd>${list(t.consumers, 2)}</dd>
</dl>`;
function tokenRows(tier) {
  return Object.entries(T).filter(([, t]) => t.tier === tier).map(([n, t]) => [
    td(`<span class="m-mono">${esc(n)}</span><br><span class="m-mono" style="opacity:.6">${esc(t.cssVar)}</span>`),
    td(esc(t.description || "") || `<span class="m-same">—</span>`, "m-prose"),
    td(resolved(t)),
  ]);
}
{
  const s = section("token-tables", "Token metadata||Every g and s token", "Every global and semantic token");
  p(s, `The full resolved table for the two upper tiers, exactly as an agent would read it out of
    <code>dist/tokens.json</code>. The component tier is not listed here: each of its ${Object.values(T).filter(t => t.tier === "c").length}
    tokens belongs to a component, and is printed in that component's own section below.`);
  const flips = Object.values(T).filter(t => t.tier === "s" && t.flips).length;
  table(s, {
    title: "g · global tokens — literal values, referenced by nothing", note: `Raw material. A component may never bind one of these (R4).`,
    head: ["token", "description", "resolved"],
    rows: tokenRows("g"),
  });
  table(s, {
    title: "s · semantic tokens — meaning, and the only place the ground flips",
    note: `${flips} of these carry a different value on a dark surface. Page and documentation CSS binds this tier (R5).`,
    head: ["token", "description", "resolved"],
    rows: tokenRows("s"),
  });
  table(s, {
    title: "Unconsumed — tokens nothing currently binds",
    note: `Kept deliberately. <code>g</code> ramps hold spare rungs by design; an unconsumed <code>s</code> token is a warning you should read, not ignore. An unconsumed <code>c</code> token is an error and the build stops.`,
    head: ["tier", "tokens"],
    rows: Object.entries(M.unconsumed).map(([tier, arr]) => [td(`<span class="m-mono">${esc(tier)}</span>`), td(list(arr, 6))]),
  });
}

/* ================================================================ 3 · component metadata */
/* THE RECORD'S ORDER (2026-09-19) - a copy of ORDER in build/record_shape.py, which is Python and cannot
   be read from a double-clicked page. The copy cannot drift silently: the self-check below tests every
   live record's key order against it and names any record that disagrees. Every field sits in the group
   of the question a builder is asking when they reach it; the manifest's derived fields sit in place. */
const RECORD_GROUPS = [
  ["which", "Is this the component?", ["id", "family", "class", "is", "summary"]],
  ["where", "May it go here?", ["ground", "darkFirst", "place", "count"]],
  ["made of", "What is it built from?", ["element", "parts", "composes", "optionalParts"]],
  ["set", "What can I choose, and which value?", ["props", "propDefaults", "picks", "never", "states"]],
  ["start from", "The sample, after the choices", ["html"]],
  ["obligations", "What must be true of what I write?", ["a11y", "font"]],
  ["paint", "What does it bind?", ["tokensFrom", "block", "darkTokens", "darkParts", "lightParts", "tokens", "selectors", "bindsOnly"]],
  ["with others", "How does it sit with its neighbors?", ["patterns"]],
  ["reference", "Anything else that is law", ["geometry", "copy"]],
  ["docs only", "For the reference site", ["wide", "darkSpecimen", "docket"]],
];
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
const RECORD_ORDER = RECORD_GROUPS.flatMap(g => g[2]);

/* the authored fields, in RECORD_ORDER (the derived ones are in COMPONENT_GENERATED below) */
const COMPONENT_FIELDS = [
  ["id", "always", "The component's name — <code>button</code>, <code>conv-step</code>. Also the key in <code>manifest.components</code>.", "The address. Page templates list components by id; the token block is <code>c.&lt;id&gt;.*</code>."],
  ["family", "always", `One of the ${FAM.order.length} families in <code>manifest.families</code>, each named for what the user does with it: ${FAM.order.map(f => `<code>${esc(f)}</code> (${esc((FAM.gloss || {})[f] || "")})`).join(", ")}.`, "Where to look in <code>dist/CHOOSE.md</code>: find the family by what the user is doing, then answer that family's questions. The family names the end goal, not the mechanism."],
  ["class", "always", "The root class — <code>aods-button</code>. Parts are <code>__part</code>, variants are <code>data-*</code>.", "Every class you write begins <code>aods-</code>. If a class is not in this field or in <code>selectors</code>, it does not exist."],
  ["is", "occasionally", "A short classification, for the few components whose family and summary leave the kind of thing unclear: <code>layout primitive</code>, <code>definition list</code>.", "A hint about what kind of thing it is. Read it with the family, not instead of it."],
  ["summary", "always", "One sentence: what the component is. Nothing else — the rules it used to carry are <code>place</code>, <code>count</code>, <code>never</code>, <code>picks</code> and the behavior contract.", "Read it to decide whether this is the right component at all, then read <code>notes</code> before using it. Choosing between two components is not its job: every such decision is in <code>dist/CHOOSE.md</code>."],
  ["ground", "always", "<code>[\"light\"]</code> or <code>[\"light\",\"dark\"]</code>.", "The permission slip for <code>data-surface=\"dark\"</code>. If <code>dark</code> is not in this list, the attribute does nothing."],
  ["darkFirst", "documentation", "The dark specimen is the canonical one and is shown first.", "For components born dark — the gov banner, the footer."],
  ["place", "when it has a place", "Where it goes, as data: <code>in</code> (what holds it), <code>notIn</code>, <code>on</code> (the ground), <code>first</code> / <code>last</code> (the scope it opens or closes), <code>before</code> / <code>after</code> (the sibling it touches), <code>notAdjacent</code>, <code>otherwise</code>, and the page <code>gate</code> that checks it. Every value is a component id, a model word or an attribute selector.", "Where the page linter can see it, a misplaced component fails the page. Read it before you move a component somewhere new."],
  ["count", "when there is a limit", "How many: <code>{per, min, max}</code>, with <code>of</code> when what is counted is not the component itself, and the <code>gate</code> that checks it.", "One hero per page, one breadcrumb, three to five figures in a stat band."],
  ["element", "always", "The HTML element(s) the root may be, written as alternatives: <code>button | a[role=button]</code>.", "Pick the element from semantics, not from looks. Getting this wrong is the most common accessibility failure in generated markup."],
  ["composes", "when it reuses another", "Other components this one is built from — <code>card</code> composes <code>menu</code>.", "Tells you the child's contract applies inside. Read the composed component's entry too."],
  ["optionalParts", "when a part may be left out", "The parts the markup may omit — a <code>hero</code> may drop its eyebrow, subhead, search or actions.", "Leave out only what is listed here. A part missing from <code>parts</code> that is not optional is a broken component, not a simpler one."],
  ["props", "always", "The variants. Keys that look like <code>data-size</code> are attributes on the root; keys that begin <code>__</code> (<code>__item[aria-current]</code>) are attributes on a named part. Values are the complete legal set.", "This is the whole API surface. A value not listed here is not supported — there is no “close enough” prop value."],
  ["propDefaults", "when an attribute has a default", "The value an omitted attribute means — a <code>dl</code> with no <code>data-layout</code> is <code>stacked</code>.", "Write the attribute only to get something other than the default. The starter <code>html</code> picks a value, and it may not be the default."],
  ["picks", "when a value needs choosing", "Which value of a prop to use when: <code>{prop: {test, value: when}}</code> — the test to apply, then each value with the case it is for.", `Apply the test, take the value it lands on.${Object.values(M.components).some(c => c.picks) ? "" : " No record fills it yet; the field is live, and each entry below renders it the day one does."}`],
  ["never", "when something is forbidden", "Selectors relative to the component's root that a page never authors: <code>[attr]</code>, <code>[attr=value]</code>, <code>__part[attr=value]</code> — retired attributes, attributes the script writes, values that are illegal together.", "Gated: R38 fails a record whose own sample writes one, and page gate P30 fails a page that does."],
  ["states", "always", "Every state the component implements, in the vocabulary the system uses: <code>hover</code>, <code>pressed</code>, <code>focus-visible</code>, <code>disabled</code>, <code>open</code>, <code>busy (aria-busy)</code>…", "Tells you what already works so you do not rebuild it, and what to test. R13 fails the build if a declared state is not implemented."],
  ["html", "always", "A one-line skeleton of the minimal correct markup. It sits after the options on purpose: a sample anchors the values a builder picks.", "The fastest correct starting point, once the props are chosen. <code>docs/specimens.js</code> has the full worked example."],
  ["a11y", "always", "The accessibility checklist. Each item is one requirement with the WCAG 2.2 success criterion it serves, of one kind: <code>check</code> (what your markup must say; the linter tests it), <code>behavior</code> (what the script does; the id of its line in <code>manifest.behavior</code>), <code>app</code> (what your own script must do) or <code>review</code> (what a person must judge).", "Non-negotiable. R41 fails the build if a sample fails a check, P35 reports a page that does, and R14 fails an interactive component with no checklist."],
  ["font", "always", "Which typeface each part is set in — <code>ui</code>, <code>body</code>, <code>heading</code>, <code>display</code>, <code>code</code>, or a per-part breakdown.", "Interactive controls are Outfit; anything carrying a body is Newsreader; headings are Lato. Never set a face yourself — the component already did."],
  ["tokensFrom", "shared block", "This component binds another component's token block — <code>radio</code> binds <code>checkbox</code>.", "Do not look for a <code>c.radio.*</code> block; it does not exist. The entry exists so the index answers the word."],
  ["darkTokens", "partial dark", "The named subset of tokens that flip on dark, when the whole component does not — a checkbox flips its label text, never the control itself.", "Do not assume a dark-capable component flips everything. This is the exact list."],
  ["darkParts", "partial dark", "A named part that may carry the dark variant on its own — a dark bar over light rows.", "Put the attribute on the part, not on the root."],
  ["lightParts", "mixed grounds", "Parts that stay light inside a dark component.", "Explains a light region inside a dark block. It is intentional; do not “fix” it."],
  ["patterns", "with its neighbors", "Named rules about how the component sits with its neighbors, as data: <code>{id, rule}</code>, and optionally <code>html</code> — a starter for a pairing that lives at body level and so has no single component whose own example could carry it. Gated by R21 like any other example.", "A pairing, an order, a placement. Read them before using the component in a new way."],
  ["geometry", "icon only", "The drawing contract for the icon set — grid, stroke weight, and the silhouette ruling that no two statuses may share a shape.", "Read before adding an icon. The set is IBM Carbon; the ruling is ours."],
  ["copy", "gov-banner only", "Fixed copy that may not be edited, translated ad hoc or shortened.", "Federal requirement. Paste it exactly."],
  ["wide", "layout hint", "The component needs the full width of a page to be shown honestly.", "Documentation hint. It is why some specimens below are shown full width and not side by side."],
  ["darkSpecimen", "documentation", "<code>false</code> suppresses the dark twin in documentation.", "Only affects how it is documented, never how it behaves."],
  ["docket", "documentation", "What is filed against the component — an open defect or question, dated, with its state — for the person maintaining the system.", "Never guidance: a described defect reads as an instruction to work around it. The contract an agent is handed does not carry it, and the packages strip it."],
];
const COMPONENT_GENERATED = [
  ["parts", "Every <code>__part</code> name the component's selectors style, derived from the stylesheet.", "The complete list of parts that exist. A part not named here is styled by nothing; <code>optionalParts</code> says which of these may be left out."],
  ["block", "The shared token block a family member binds — <code>c.conv.*</code>.", "Where to look when a component's tokens are not under its own name."],
  ["tokens", "Every <code>--c-*</code> custom property this component binds, in declaration order.", "The complete list of what is themeable about this component. Anything not on this list is not a knob."],
  ["selectors", "Every selector in <code>components/aods.css</code> that targets this component, including the attribute and pseudo-class forms.", "The ground truth for markup. If your class/attribute combination is not in here, nothing will style it."],
  ["bindsOnly", "Always <code>c</code>.", "A standing reminder of R4: a component may bind the component tier and nothing else."],
];

{
  const s = section("component-fields", "Component metadata||Fields on every component", "Component metadata, field by field");
  p(s, `Each of the ${M.counts.components} components carries an authored contract in
    <code>components/registry.json</code>. The build copies it into <code>manifest.components</code> and adds
    ${COMPONENT_GENERATED.length} generated fields. Together they are enough to write correct markup without reading a single line of CSS —
    which is the point.`);
  p(s, `Every record lists its fields in one order (<code>build/record_shape.py</code>), the order a builder works in:
    ${RECORD_GROUPS.map(([g, q]) => `<b>${esc(g)}</b> — ${esc(q.charAt(0).toLowerCase() + q.slice(1))}`).join("; ")}.
    The tables below follow it, and so does every entry further down.`);
  table(s, {
    title: "Authored — the contract in components/registry.json", open: true,
    head: ["field", "present on", "what it is", "what an AI builder uses it for"],
    rows: COMPONENT_FIELDS.map(r => {
      const n = Object.values(M.components).filter(c => c[r[0]] !== undefined).length;
      return [td(`<span class="m-mono m-tok">${r[0]}</span>`), td(`${esc(r[1])}<br><span class="m-mono" style="opacity:.6">${n}/${M.counts.components}</span>`, "m-prose"), td(r[2], "m-prose"), td(r[3], "m-prose")];
    }),
  });
  table(s, {
    title: "Generated — what build.py adds to every entry", open: true,
    head: ["field", "what it is", "what an AI builder uses it for"],
    rows: COMPONENT_GENERATED.map(r => [td(`<span class="m-mono m-tok">${r[0]}</span>`), td(r[1], "m-prose"), td(r[2], "m-prose")]),
  });

  s.append(h("h3", {}, "How to read the props notation"));
  const dl = h("dl", { class: "m-deflist" });
  dl.innerHTML = `
    <dt>data-variant: ["primary", "secondary", …]</dt><dd>An attribute on the <b>root</b>. The array is the complete legal set of values.</dd>
    <dt>__item[aria-current]: ["page"]</dt><dd>An attribute on the <b>part</b> <code>.aods-&lt;id&gt;__item</code>. The double underscore names the part; the brackets name the attribute it takes.</dd>
    <dt>__region[data-surface]: ["raised", "sunken"]</dt><dd>Same shape. Read it as: the region part may carry <code>data-surface</code>, and these are the only two values that do anything.</dd>`;
  s.append(dl);

  /* the self-check: any field in the data with no entry above, any documented field the record order
     does not place, and any record whose keys are not in that order - the third is what keeps
     RECORD_ORDER an honest copy of build/record_shape.py (2026-09-19) */
  const documented = new Set([...COMPONENT_FIELDS.map(r => r[0]), ...COMPONENT_GENERATED.map(r => r[0])]);
  const seen = new Set(); Object.values(M.components).forEach(c => Object.keys(c).forEach(k => seen.add(k)));
  const missing = [...seen].filter(k => !documented.has(k));
  const unplaced = [...documented].filter(k => !RECORD_ORDER.includes(k));
  const outOfOrder = Object.values(M.components).filter(c => {
    const at = Object.keys(c).filter(k => RECORD_ORDER.includes(k)).map(k => RECORD_ORDER.indexOf(k));
    return at.some((v, i) => i && v < at[i - 1]);
  }).map(c => c.id);
  const tokDocumented = new Set(TOKEN_RESOLVED.map(r => r[0]));
  const tokSeen = new Set(); Object.values(T).forEach(t => Object.keys(t).forEach(k => tokSeen.add(k)));
  const tokMissing = [...tokSeen].filter(k => !tokDocumented.has(k));
  const c = h("div", { class: "m-callout" });
  c.innerHTML = `<p><b>Self-check.</b> This page compares its own field dictionary against the live data every
    time it loads, so it cannot quietly fall behind the system.
    Component fields in the data with no entry above: <code>${missing.length ? missing.map(esc).join(", ") : "none"}</code>.
    Records whose fields are out of the record order: <code>${[...outOfOrder, ...unplaced.map(k => "field " + k)].map(esc).join(", ") || "none"}</code>.
    Token fields with no entry: <code>${tokMissing.length ? tokMissing.map(esc).join(", ") : "none"}</code>.</p>`;
  s.append(c);
}

/* ================================================================ 4 · system metadata */
{
  const s = section("surface", "System metadata||The surface contract", "The surface contract");
  p(s, `<code>manifest.surface</code> is the answer to “can this go on dark?”, as data. Note
    <code>mode: false</code> — it is there to say, in the metadata itself, that this is not a theme.`);
  p(s, `<span class="m-extag">note</span>${esc(M.surface.note)}`);
  table(s, {
    title: "Dark-capable — may carry data-surface=\"dark\"", open: true, count: `${M.surface.darkCapable.length} components`,
    head: ["component", "what flips"],
    rows: M.surface.darkCapable.map(id => [
      td(`<a href="#c-${esc(id)}" class="m-mono">${esc(id)}</a>`),
      td(M.surface.partial[id] ? `partial — only <span class="m-mono">${M.surface.partial[id].map(esc).join(", ")}</span>` : `the whole component`, "m-prose"),
    ]),
  });
  table(s, {
    title: "Light only — the attribute does nothing", count: `${M.surface.lightOnly.length} components`,
    note: `These stay light even inside a dark component. Inputs have no dark variant on purpose.`,
    head: ["component"],
    rows: M.surface.lightOnly.map(id => [td(`<a href="#c-${esc(id)}" class="m-mono">${esc(id)}</a>`)]),
  });
}
{
  const s = section("rules", "System metadata||The laws", "The laws");
  p(s, `<code>manifest.laws</code> carries every system law as data: one sentence each, grouped by topic, with
    the gate that checks it (R in <code>build/build.py</code>, P in <code>build/lint_pages.py</code>) and, where a
    gate has them, a passing and a failing example so an agent can pattern-match instead of interpret. A gated
    law is not style advice: the build or the page linter fails on a violation. A rule about one component
    lives on that component's record, not here.`);
  for (const t of M.laws.topics) {
    const rows = M.laws.laws.filter(l => l.topic === t.id);
    if (!rows.length) continue;
    const wrap = h("div");
    wrap.append(h("h3", { class: "m-entry__summary", style: "margin-block:24px 8px" }, `<b>${esc(t.id)}</b> &middot; ${esc(t.gloss)}`));
    for (const l of rows) {
      const g = [].concat(l.gate || []).join(" ");
      const d = h("details", { class: "m-table" });
      d.append(h("summary", {}, `<span><span class="m-mono m-tok">${esc(g || "\u2014")}</span> &nbsp;${esc(l.law)}</span>`));
      const body = h("div", { class: "m-table__body", style: "padding:16px" });
      body.append(h("p", { class: "m-entry__summary" }, `<span class="m-mono">${esc(l.id)}</span> &middot; applies to ${esc(l.applies)}`));
      if (l.ok) body.append(h("pre", { class: "m-ok", style: "margin-block-start:12px" }, `<span class="m-extag">passes</span>${esc(l.ok)}`));
      if (l.bad) body.append(h("pre", { class: "m-bad", style: "margin-block-start:12px" }, `<span class="m-extag">fails</span>${esc(l.bad)}`));
      d.append(body); wrap.append(d);
    }
    s.append(wrap);
  }
  table(s, {
    title: "Patterns: how a component sits with its neighbors", count: `${Object.keys(M.patterns || {}).length} components`,
    note: `<code>manifest.patterns</code>.`,
    head: ["component", "id", "rule"],
    rows: Object.entries(M.patterns || {}).flatMap(([cid, arr]) => arr.map((pt, i) => [
      td(i === 0 ? `<a href="#c-${esc(cid)}" class="m-mono">${esc(cid)}</a>` : ""),
      td(`<span class="m-mono">${esc(pt.id)}</span>`),
      td(esc(pt.rule), "m-prose"),
    ])),
  });
}
{
  const s = section("pages", "System metadata||Page templates", "Page templates");
  p(s, `<code>manifest.pages</code> — ${M.counts.pages} whole pages described as an ordered list of component ids.
    Every id is validated against the registry at build time, so a template can never name a component that does
    not exist. For an agent this is the recipe layer: it answers “what goes on a page of this kind, and in what
    order” without a single line of markup.`);
  table(s, {
    title: "The page templates, as component order", open: true,
    head: ["id", "title", "file", "purpose", "component order"],
    rows: M.pages.map(pg => [
      td(`<span class="m-mono">${esc(pg.id)}</span>`),
      td(esc(pg.title), "m-prose"),
      td(`<span class="m-mono">${esc(pg.file)}</span>`),
      td(esc(pg.purpose), "m-prose"),
      td(pg.order.map(id => `<a href="#c-${esc(id)}" class="m-mono">${esc(id)}</a>`).join(" · "), "m-prose"),
    ]),
  });
}
{
  const s = section("lint", "System metadata||The lint report", "The lint report");
  p(s, `<code>manifest.lint</code> is the build's own verdict on itself, shipped inside the metadata. An agent
    should read it before trusting anything else in the file: a manifest with errors describes a system that does
    not currently build.`);
  const c = h("div", { class: "m-callout" });
  c.innerHTML = `<p><b>${M.lint.errors.length} errors · ${M.lint.warnings.length} warnings</b> at
    v${esc(M.version)}, generated ${esc(M.generated)}. Errors are never accepted. Warnings are readable — read them.</p>`;
  s.append(c);
  if (M.lint.errors.length) table(s, { title: "Errors", open: true, head: ["error"], rows: M.lint.errors.map(e => [td(esc(e), "m-prose")]) });
  table(s, { title: "Warnings", head: ["warning"], rows: M.lint.warnings.map(w => [td(esc(w), "m-prose")]) });
}

/* ================================================================ 5 · the components */
/* ONE GROUP PER FAMILY, in manifest.families order, each opening with its gloss (2026-09-19). Members
   follow the order families.json lists them in; a record whose family is not in the order still renders,
   in a group of its own at the end, because a component the page silently drops is worse than one it
   files oddly. */
const byFamily = (() => {
  const out = new Map(FAM.order.map(f => [f, []]));
  for (const c of Object.values(M.components)) { if (!out.has(c.family)) out.set(c.family, []); out.get(c.family).push(c); }
  for (const [f, list] of out) {
    const rank = (FAM.members || {})[f] || [];
    const at = c => { const i = rank.indexOf(c.id); return i < 0 ? rank.length : i; };
    list.sort((a, b) => at(a) - at(b));
  }
  return out;
})();
const TOKEN_KINDS = [
  [/(^|-)(surface|fill|ground|scrim|track|knob)(-|$)/, "surfaces and fills"],
  [/(^|-)ink(-|$)/, "text and glyph inks"],
  [/(^|-)(border|rule|edge|outline|divider)(-|$)/, "borders and rules"],
  [/(^|-)(inset|gap|stack|space|indent|offset)(-|$)/, "spacing"],
  [/(^|-)(font|size|line-height|tracking|weight|measure)(-|$)/, "type"],
  [/(^|-)(motion|ease|duration)(-|$)/, "motion"],
  [/(^|-)radius(-|$)/, "radius"],
  [/(^|-)(width|height|min|max|column|inline|block)(-|$)/, "geometry"],
];
function tokenSummary(c) {
  const buckets = new Map();
  for (const v of c.tokens) {
    const name = v.replace(/^--c-/, "");
    const hit = TOKEN_KINDS.find(([re]) => re.test(name));
    const k = hit ? hit[1] : "other";
    buckets.set(k, (buckets.get(k) || 0) + 1);
  }
  const parts = [...buckets.entries()].sort((a, b) => b[1] - a[1]).map(([k, n]) => `${n} ${k}`);
  const flips = c.tokens.map(tok).filter(t => t && t.flips).length;
  const block = c.block || `c.${c.tokensFrom || c.id}.*`;
  return `<b>${c.tokens.length} bound tokens</b> from <span class="m-mono">${esc(block)}</span> — ${parts.join(", ")}.
    ${flips ? `${flips} of them resolve to a different value on a dark surface.` : `None of them flip: this component looks the same wherever it lands.`}
    Every one references an <span class="m-mono">s.*</span> intent, and nothing else about the component is themeable.`;
}

/* NAMED, NOT INFERRED (2026-09-19). The second line was the typography tier: type roles that paint no
   surface of their own, so the only way to show one on dark is on a dark card. The tier is retired; the
   reason is not, so they are listed by name. */
const IN_CARD = new Set(["button", "link", "badge", "divider", "button-group", "accordion", "breadcrumb", "in-page-nav", "pagination", "label", "checkbox", "switch", "field",
  "prose", "text", "eyebrow", "section-heading", "pull-quote", "stat", "section-opener", "objective"]);
const META_PINNED_LIGHT = '[data-surface="light"], [data-panel="light"], .aods-header__mega, .aods-header__menu';
const META_DARK_SEL = Object.values(M.components || {}).filter(x => (x.ground || []).includes("dark") && x.id !== "ground")
  .flatMap(x => (x.class || "").split("|").map(k => "." + k.trim())).filter(k => k.length > 1).join(",");
function specimenPair(c) {
  const spec = S[c.id] || `<p class="cap">no specimen authored</p>`;
  const darkCapable = (c.ground || ["light"]).includes("dark");
  const single = c.wide || !darkCapable || c.darkSpecimen === false;
  const pair = h("div", { class: "m-specpair", "data-single": single ? "" : null });
  const light = h("div", { class: "m-spec aods-page", "data-ground": "light" });
  light.innerHTML = `<div class="m-spec__marker"><span>the component · light</span><span>${darkCapable ? "rest" : "no dark variant"}</span></div>${spec}`;
  pair.append(light);
  if (darkCapable && c.darkSpecimen !== false) {
    const classes = c.class.split("|").map(x => x.trim());
    const wrap = h("div"); wrap.innerHTML = spec;
    wrap.querySelectorAll(classes.map(k => "." + k).join(",")).forEach(el => el.setAttribute("data-surface", "dark"));
    // and every OTHER dark-capable component in the clone, as a page must write it - the same rule doc.js has
    // carried since 2026-08-25 (a sentence of .aods-text around an inline icon measured 1.08:1 here until
    // 2026-09-19). Regions a specimen pins light (a hero's light panel, the header's mega menu) are left alone;
    // a ground is a section and never carries the attribute (P3).
    wrap.querySelectorAll(META_DARK_SEL).forEach(el => { if (!el.closest(META_PINNED_LIGHT)) el.setAttribute("data-surface", "dark"); });
    const ids = new Set([...wrap.querySelectorAll("[id]")].map(el => el.id));
    const suffix = v => ids.has(v) ? v + "-dark" : v;
    wrap.querySelectorAll("[id]").forEach(el => el.id = el.id + "-dark");
    for (const attr of ["for", "aria-controls", "aria-labelledby", "aria-describedby", "data-modal-open", "data-modal-close"])
      wrap.querySelectorAll(`[${attr}]`).forEach(el => { const v = el.getAttribute(attr); if (v) el.setAttribute(attr, v.split(/\s+/).map(suffix).join(" ")); });
    wrap.querySelectorAll('[href^="#"]').forEach(el => { const v = el.getAttribute("href").slice(1); if (ids.has(v)) el.setAttribute("href", "#" + v + "-dark"); });
    const inCard = IN_CARD.has(c.id);
    const dark = h("div", { class: "m-spec aods-page", "data-ground": "dark" });
    dark.innerHTML = `<div class="m-spec__marker"><span>the component · dark surface</span><span>${inCard ? `inside .aods-card[data-surface="dark"]` : `.${esc(classes[0])}[data-surface="dark"]`}</span></div>`
      + (inCard ? `<div class="aods-card" data-surface="dark">${wrap.innerHTML}</div>` : wrap.innerHTML);
    pair.append(dark);
    if (c.darkFirst) pair.prepend(dark);
  }
  return pair;
}

/* which fields an entry shows, and in what order: the record's own order. Anything a record carries that
   the order does not name is still shown, last, so the page never hides a field it has not learned. */
const FIELD_ORDER = [...RECORD_ORDER, ...[...new Set(Object.values(M.components).flatMap(c => Object.keys(c)))].filter(k => !RECORD_ORDER.includes(k))];
const RENDER_AS_TABLE = new Set(["props", "picks", "tokens", "selectors", "patterns", "docket"]);
/* an object of short strings reads as `key = value` pairs; anything deeper stays JSON */
const shownValue = v => Array.isArray(v) ? v.map(x => typeof x === "object" ? esc(JSON.stringify(x)) : esc(x)).join(" · ")
  : v && typeof v === "object" ? (Object.values(v).every(x => typeof x === "string") ? Object.entries(v).map(([k, x]) => `${esc(k)} = ${esc(x)}`).join(" · ") : esc(JSON.stringify(v)))
  : esc(v);

{
  const intro = section("components", "The components||How to read a component entry", "The components");
  p(intro, `${M.counts.components} entries, in ${[...byFamily.values()].filter(l => l.length).length} families. Each one opens with its summary and
    its notes, then the real component — not a screenshot, the running thing, on both grounds where it has
    both — then a plain-language account of the tokens that control it, then every metadata field on the
    entry as a collapsible table.`);
  p(intro, `The tables are closed by default so the page reads as prose. Open the ones you need.
    <b>Contract</b> is the authored registry entry. <b>Bound tokens</b> is the complete themeable surface, resolved.
    <b>Selectors</b> is the ground truth for markup — a class or attribute combination not listed there is styled by
    nothing. <b>Starter markup</b> is the skeleton plus the specimen source you are looking at.`);

  for (const [fam, listing] of byFamily) {
    if (!listing.length) continue;
    const g = h("section", { class: "m-tiergroup", id: "family-" + fam });
    g.innerHTML = `<h2>${esc(famTitle(fam))} <span class="m-table__count">${listing.length}</span></h2><p>${esc(famGloss(fam))}</p>`;
    MAIN.append(g);

    for (const c of listing) {
      const e = h("article", { class: "m-entry", id: "c-" + c.id, "data-nav": `The components/${famTitle(fam)}||${c.id}` });
      const darkCapable = (c.ground || ["light"]).includes("dark");
      const head = h("div", { class: "m-entry__head" });
      head.innerHTML = `
        <div class="m-entry__title">
          <h3>.${esc(c.class)}</h3>
          <span class="m-tag">${esc(c.family)}</span>
          ${c.is ? `<span class="m-tag">${esc(c.is)}</span>` : ""}
          <span class="m-tag"${darkCapable ? ' data-kind="dark"' : ""}>${darkCapable ? (c.darkTokens ? "dark · partial" : "dark-capable") : "light only"}</span>
          <span class="m-tag">${esc(c.element)}</span>
        </div>
        <p class="m-entry__summary">${esc(c.summary)}</p>
        ${rulesLines(c).map(([k, v, g]) => `<p class="m-entry__summary"><b>${esc(k)}</b> — <code>${esc(v)}</code>${g.length ? " &middot; " + esc(g.join(" ")) : ""}</p>`).join("")}`;
      e.append(head);
      e.append(specimenPair(c));
      e.append(h("p", { class: "m-entry__tokensum" }, tokenSummary(c)));
      e.append(h("p", { class: "m-entry__tokensum" },
        `<b>Metadata on this entry:</b> <span class="m-mono">${FIELD_ORDER.filter(k => c[k] !== undefined).map(esc).join(" · ")}</span>`));

      /* contract — every scalar/short field, one row each */
      const contractRows = FIELD_ORDER.filter(k => c[k] !== undefined && !RENDER_AS_TABLE.has(k)).map(k =>
        [td(`<span class="m-mono m-tok">${esc(k)}</span>`), td(shownValue(c[k]), "m-prose")]);
      table(e, { title: "Contract — the authored registry entry", head: ["field", "value"], rows: contractRows });

      const defs = c.propDefaults || {};
      const propRows = Object.entries(c.props || {}).map(([k, v]) => [
        td(`<span class="m-mono">${esc(k)}</span>`),
        td(k.startsWith("__") ? "part attribute" : "root attribute", "m-prose"),
        td(Array.isArray(v) ? `<span class="m-mono">${v.map(x => esc(x) + (defs[k] === x ? " (default)" : "")).join(" · ")}</span>` : esc(v), "m-prose"),
      ]);
      table(e, {
        title: "props — the complete variant API", count: `${propRows.length} ${propRows.length === 1 ? "prop" : "props"}`,
        note: propRows.length ? `A value not listed here is not supported.` : null,
        head: ["prop", "sits on", "legal values"],
        rows: propRows.length ? propRows : [[`<td colspan="3" class="m-prose"><span class="m-same">no props — this component has no variants</span></td>`]],
      });

      const tokRows = c.tokens.map(v => {
        const t = tok(v);
        return [
          td(`<span class="m-mono">${esc(v)}</span>`),
          td(`<span class="m-mono">${esc(t?.raw ?? "")}</span>`),
          td(esc(t?.type ?? ""), "m-mono"),
          td(t ? val(t) : "", "m-mono"),
          td(t ? darkCell(t) : "", "m-mono"),
          td(esc(t?.description || "") || `<span class="m-same">—</span>`, "m-prose"),
        ];
      });
      /* picks: which value, and when (2026-09-19). No record fills it yet; this renders the day one does. */
      const pickRows = Object.entries(c.picks || {}).flatMap(([prop, spec]) => {
        const when = Object.entries(spec || {}).filter(([k]) => k !== "test");
        return (when.length ? when : [["", ""]]).map(([v, w], i) => [
          td(i ? "" : `<span class="m-mono">${esc(prop)}</span>`),
          td(i ? "" : esc((spec || {}).test || ""), "m-prose"),
          td(`<span class="m-mono">${esc(v)}</span>`),
          td(esc(w), "m-prose"),
        ]);
      });
      if (pickRows.length) table(e, {
        title: "Picks — which value, and when", count: `${Object.keys(c.picks).length} ${Object.keys(c.picks).length === 1 ? "prop" : "props"}`,
        head: ["prop", "the test", "value", "use it when"],
        rows: pickRows,
      });

      table(e, {
        title: "Bound tokens — everything themeable about this component", count: `${tokRows.length} tokens`,
        note: `Every row is a <span class="m-mono">--c-*</span> property bound in <span class="m-mono">components/aods.css</span>, resolved through the semantic tier. The build fails if any of them is unbound (R7).`,
        head: ["c- token", "→ s-", "type", "light", "dark", "ruling"],
        rows: tokRows,
      });

      table(e, {
        title: "Selectors — the ground truth for markup", count: `${c.selectors.length} selectors`,
        note: `Every selector in <span class="m-mono">components/aods.css</span> that targets this component. If your markup does not match one of these, nothing styles it.`,
        head: ["selector"],
        rows: c.selectors.map(sel => [td(`<span class="m-mono">${esc(sel)}</span>`)]),
      });

      if (c.patterns) table(e, {
        title: "Patterns on this component", count: `${c.patterns.length} ${c.patterns.length === 1 ? "pattern" : "patterns"}`,
        head: ["id", "rule"],
        rows: c.patterns.map(pt => [td(`<span class="m-mono">${esc(pt.id)}</span>`), td(esc(pt.rule), "m-prose")]),
      });

      /* the docket is for the maintainer, never guidance - so it is its own table, named as such */
      if ((c.docket || []).length) table(e, {
        title: "Docket — filed against this component, for the maintainer", count: `${c.docket.length} filed`,
        note: `Not guidance. The contract an agent is handed does not carry it.`,
        head: ["id", "kind", "filed", "state", "note"],
        rows: c.docket.map(d => [td(`<span class="m-mono">${esc(d.id)}</span>`), td(esc(d.kind || "item")), td(esc(d.filed || ""), "m-mono"), td(esc(d.state || "")),
          td((d.operator ? `&ldquo;${esc(d.operator)}&rdquo;<br>` : "") + esc(d.note || ""), "m-prose")]),
      });

      const mk = h("details", { class: "m-table" });
      mk.append(h("summary", {}, `<span>Starter markup</span><span class="m-table__count">html + specimen source</span>`));
      const mkBody = h("div", { class: "m-table__body", style: "padding:16px" });
      mkBody.append(h("pre", {}, `<span class="m-extag">registry · html</span>${esc(c.html)}`));
      mkBody.append(h("pre", { style: "margin-block-start:12px" }, `<span class="m-extag">specimens.js · the markup rendered above</span>${esc((S[c.id] || "").trim())}`));
      mkBody.append(h("pre", { style: "margin-block-start:12px" }, `<span class="m-extag">the entry as JSON — what an agent actually parses</span>${esc(JSON.stringify(c, null, 1))}`));
      mk.append(mkBody); e.append(mk);

      MAIN.append(e);
    }
  }
}

/* ---- colophon */
{
  const f = h("p", { class: "m-foot" }, `AODS · v${esc(M.version)} · generated ${esc(M.generated)} ·
    ${M.counts.tokens} tokens · ${M.counts.components} components · ${M.lint.errors.length} lint errors.
    This page reads dist/ at load and types no system fact of its own.`);
  MAIN.append(f);
}

/* ================================================================ the side menu */
{
  const nav = document.getElementById("m-nav");
  nav.append(h("div", { class: "m-nav__head" }, `<b>What the machine reads</b><span>AODS · v${esc(M.version)} · ${M.counts.components} components</span>`));
  const groups = new Map();
  for (const node of document.querySelectorAll("[data-nav]")) {
    const [path, label] = node.getAttribute("data-nav").split("||");
    const [group, sub] = path.split("/");
    if (!groups.has(group)) groups.set(group, { items: [], subs: new Map() });
    const g = groups.get(group);
    if (sub) { if (!g.subs.has(sub)) g.subs.set(sub, []); g.subs.get(sub).push([node.id, label]); }
    else g.items.push([node.id, label]);
  }
  const link = ([id, label]) => `<a href="#${esc(id)}"><code>${esc(label)}</code></a>`;
  const plain = ([id, label]) => `<a href="#${esc(id)}">${esc(label)}</a>`;
  for (const [group, g] of groups) {
    const count = g.items.length + [...g.subs.values()].reduce((n, a) => n + a.length, 0);
    const d = h("details", { class: "m-navgroup", open: group !== "The components" });
    d.append(h("summary", {}, `<span>${esc(group)}</span><span class="m-navgroup__count">${count}</span>`));
    const body = h("div");
    body.innerHTML = g.items.map(plain).join("");
    for (const [sub, items] of g.subs) {
      const sd = h("details", { class: "m-navgroup" });
      sd.append(h("summary", {}, `<span>${esc(sub)}</span><span class="m-navgroup__count">${items.length}</span>`));
      sd.append(h("div", {}, items.map(link).join("")));
      body.append(sd);
    }
    d.append(body); nav.append(d);
  }

  /* Current-section marker. An IntersectionObserver only reports what CHANGED, so scrolling past
     several sections in one gesture left the mark behind. This asks the document directly: the
     current section is the last one whose top has crossed the reading line. Deterministic, and
     right whichever way you arrived — scroll, anchor jump, or a reload deep in the page. */
  const marks = [...document.querySelectorAll("[data-nav]")];
  const links = new Map([...nav.querySelectorAll("a")].map(a => [a.getAttribute("href").slice(1), a]));
  const LINE = 140;
  let currentId = null;
  const mark = () => {
    let id = marks[0]?.id;
    for (const n of marks) { if (n.getBoundingClientRect().top <= LINE) id = n.id; else break; }
    const doc = document.documentElement;
    if (window.scrollY + window.innerHeight >= doc.scrollHeight - 2) id = marks[marks.length - 1]?.id;  /* the last section never reaches the line */
    if (id === currentId) return;
    currentId = id;
    nav.querySelectorAll("[data-current]").forEach(el => el.removeAttribute("data-current"));
    const a = links.get(id); if (!a) return;
    a.setAttribute("data-current", "");
    for (let d = a.closest("details.m-navgroup"); d; d = d.parentElement?.closest("details.m-navgroup")) {
      d.open = true; d.querySelector(":scope > summary")?.setAttribute("data-current", "");
    }
    if (!window.matchMedia("(max-width: 900px)").matches) a.scrollIntoView({ block: "nearest" });
  };
  let ticking = false;
  addEventListener("scroll", () => { if (ticking) return; ticking = true; requestAnimationFrame(() => { ticking = false; mark(); }); }, { passive: true });
  addEventListener("resize", mark);
  addEventListener("hashchange", () => requestAnimationFrame(mark));
  requestAnimationFrame(mark);

  /* compact: the nav folds behind the bar */
  const btn = document.getElementById("m-menu");
  const compact = () => window.matchMedia("(max-width: 900px)").matches;
  const setOpen = v => { nav.hidden = !v; btn.setAttribute("aria-expanded", String(v)); };
  if (compact()) setOpen(false);
  btn.addEventListener("click", () => setOpen(nav.hidden));
  nav.addEventListener("click", ev => { if (ev.target.closest("a") && compact()) setOpen(false); });
  window.addEventListener("resize", () => { if (!compact()) nav.hidden = false; });
}

/* the specimens are real components: wire their behaviors after they are in the document */
window.AODS?.init(document);
document.querySelectorAll(".indet").forEach(i => { i.indeterminate = true; });
