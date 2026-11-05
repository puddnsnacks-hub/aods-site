/* FOCUS STYLE — a UX experiment, not a system component.
   Applies the visitor's chosen focus indicator on every template page by stamping
   data-focus-style on <html>; templates.css turns that into an override of the three
   shared focus bindings (--c-page-focus-ring/-width/-gap). The choice lives in
   localStorage under `aods-focus-style`, so it follows the visitor across pages —
   and across the srcdoc iframes of the artifact wrapper, which share one origin. */
(function () {
  var KEY = "aods-focus-style";
  var STYLES = ["standard", "highlight", "mint", "contrast"];

  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function store(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function apply(v) {
    if (v === "highlight" || v === "mint" || v === "contrast") document.documentElement.dataset.focusStyle = v;
    else delete document.documentElement.dataset.focusStyle;
  }

  apply(stored());

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  /* THE CHAPTERS RAIL, site-wide (hit list 7, 2026-08-23): the rail is persistent across the whole
     site, so it can be CLOSED — the choice is remembered here alongside the focus pick, and a quiet
     vertical "Chapters" tab at the right edge brings it back. */
  var RAIL_KEY = "aods-rail-closed";
  /* RULING 2026-08-25 : the rail starts CLOSED. It is a way back, not a thing to read past —
     and open, it lands on the cover photo. Only an explicit open ("0") reopens it on the next page. */
  function railStored() { try { return localStorage.getItem(RAIL_KEY) !== "0"; } catch (e) { return true; } }
  function railApply(closed) {
    if (closed) document.documentElement.setAttribute("data-rail-closed", "");
    else document.documentElement.removeAttribute("data-rail-closed");
  }
  function railStore(closed) { try { localStorage.setItem(RAIL_KEY, closed ? "1" : "0"); } catch (e) {} }
  railApply(railStored());

  ready(function () {
    var rail = document.querySelector("[data-rail]");
    if (rail) {
      var closeBtn = rail.querySelector(".t-rail-close");
      if (closeBtn) closeBtn.addEventListener("click", function () {
        /* hit list 22: the reopen tab appears exactly WHERE they clicked the X, so the eye
           follows the control instead of losing it — "oh, there it is." */
        var r = closeBtn.getBoundingClientRect();
        openTab.style.top = Math.max(8, Math.round(r.top)) + "px";
        openTab.style.transform = "none";
        railApply(true); railStore(true); openTab.focus();
      });
      var openTab = document.createElement("button");
      openTab.type = "button"; openTab.className = "t-rail-open"; openTab.textContent = "Chapters";
      openTab.setAttribute("aria-label", "Show the chapters menu");
      openTab.addEventListener("click", function () {
        railApply(false); railStore(false);
        var first = rail.querySelector(".aods-in-page-nav__link"); if (first) first.focus();
      });
      document.body.appendChild(openTab);
    }

    /* Cross-page nav inside the artifact wrapper: pages live in srcdoc iframes there,
       so a relative href cannot resolve. Hand the wrapper the template id instead. */
    if (window.parent !== window) {
      document.addEventListener("click", function (e) {
        var a = e.target && e.target.closest && e.target.closest("a[href]");
        if (!a) return;
        var m = /(?:^|\/)([a-z0-9-]+)\.html$/.exec(a.getAttribute("href") || "");
        if (!m) return;
        e.preventDefault();
        try { window.parent.postMessage({ aodsTemplate: m[1] }, "*"); } catch (err) {}
      });
    }

    /* The chooser (focus-style.html only): real radios; selecting applies immediately. */
    var chooser = document.querySelector("[data-focus-chooser]");
    if (!chooser) return;
    var current = stored();
    if (STYLES.indexOf(current) < 0) current = "standard";
    var r = chooser.querySelector('input[name="focus-style"][value="' + current + '"]');
    if (r) r.checked = true;
    chooser.addEventListener("change", function () {
      var picked = chooser.querySelector('input[name="focus-style"]:checked');
      if (!picked || STYLES.indexOf(picked.value) < 0) return;
      apply(picked.value);
      store(picked.value);
    });
  });
})();
