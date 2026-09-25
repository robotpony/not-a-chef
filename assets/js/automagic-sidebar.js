// Sidebar behaviour: section relocation, the mobile toggle, the
// frontmatter meta rail's live Serves value, and the reading sidebar's
// "On this page" section toggles.
//
// Split out of ingredients.js so the sidebar can work on pages that have
// no ingredient list. Everything here is driven by markup, not page type:
// it runs wherever it finds slots ([data-sidebar-slot]) and marked
// headings (h2[data-sidebar-heading], set by render-heading.html).
//
// Loaded before ingredients.js (single.html), so its DOMContentLoaded
// handler runs first: sections are already in the sidebar when the
// ingredient walks run, and the servings listener is attached before
// ingredients.js fires its first scale event.

(function () {
  // --- Sidebar relocation -------------------------------------------------
  //
  // Mechanic / To serve / Notes are simple optional top-level sections
  // (FORMAT.md) — render-heading.html flags each one's H2 with
  // data-sidebar-heading so this can walk forward to the next H2 (same
  // "walk from a marked heading" approach as the ingredient/method walks
  // in ingredients.js, for the same reason: Hugo's heading-only render hook
  // has no "end of section" hook to close a template-level wrapper
  // around). The matched heading + everything after it up to the next H2 is
  // moved (not copied) into the matching slot single.html already laid out;
  // slots with nothing to show stay hidden.
  function moveSidebarSections(article) {
    var slots = {};
    document.querySelectorAll('[data-sidebar-slot]').forEach(function (el) {
      slots[el.dataset.sidebarSlot] = el;
    });
    if (!Object.keys(slots).length) return;

    article.querySelectorAll('h2[data-sidebar-heading]').forEach(function (h2) {
      var slot = slots[h2.dataset.sidebarHeading];
      if (!slot) return;
      var nodes = [h2];
      var el = h2.nextElementSibling;
      while (el && el.tagName !== 'H2') {
        nodes.push(el);
        el = el.nextElementSibling;
      }
      nodes.forEach(function (node) { slot.appendChild(node); });
    });

    // Notes and Equipment/Hardware both render as a plain <ul> today —
    // give them the em-dash-bullet list style now that they live in the
    // sidebar rather than the prose flow (mockups/STYLE.md's "Notes list"
    // component; Equipment/Hardware is the same shape of content — a flat
    // reference list — so it gets the same treatment rather than a second
    // bullet style).
    ['notes', 'equipment'].forEach(function (key) {
      var list = slots[key] && slots[key].querySelector('ul');
      if (list) list.classList.add('notes-list');
    });

    // Mechanic's prose becomes the accent-bordered callout box
    // (mockups/STYLE.md's "Mechanic callout") now that it's off on its
    // own in the sidebar instead of opening the article body.
    if (slots.mechanic && slots.mechanic.children.length > 1) {
      var box = document.createElement('div');
      box.className = 'mechanic';
      var heading = slots.mechanic.firstElementChild;
      while (heading.nextSibling) box.appendChild(heading.nextSibling);
      slots.mechanic.appendChild(box);
    }

    Object.keys(slots).forEach(function (key) {
      var slot = slots[key];
      if (slot.hasChildNodes()) slot.hidden = false;
    });
  }

  // --- Meta rail: Serves --------------------------------------------------
  //
  // The sidebar's Serves meta row (single.html) is plain server-rendered
  // text, not a .qty span — it isn't a quantity in an ingredient/method
  // sense, just a frontmatter fact, but it should still track the scale
  // slider. ingredients.js announces scale changes with a `recipe:scale`
  // event rather than touching the sidebar itself. Only updated when the
  // frontmatter value is a bare number (data-servings-base); a descriptive
  // value like "4–6" or "1 loaf" (FORMAT.md allows both) can't be scaled
  // arithmetically and is left exactly as written.
  function initServings() {
    var el = document.getElementById('recipe-meta-servings');
    if (!el) return;
    var raw = el.dataset.servingsBase;
    // A strict whole-string match, not just isNaN(parseFloat(...)) — that
    // check passes "4-6" (parseFloat reads its leading "4" and stops,
    // silently truncating a real range like braised-red-cabbage's
    // servings instead of leaving it alone).
    if (!/^\d+(\.\d+)?$/.test(raw)) return;
    var base = parseFloat(raw);
    document.addEventListener('recipe:scale', function (e) {
      el.textContent = String(Math.round(base * e.detail.scale));
    });
  }

  // --- Mobile toggle ------------------------------------------------------
  //
  // Mobile-only collapse for the recipe sidebar (single.html's
  // .recipe-sidebar-wrap / .recipe-sidebar-toggle) — see that file's
  // comment for why this is a plain button + class toggle rather than
  // <details>. No-ops (and stays hidden via the lg: media query in
  // custom.css) above the lg breakpoint, where the button is display:none
  // and the sidebar is always shown regardless of `.is-open`.
  function initSidebarToggle() {
    var toggle = document.querySelector('.recipe-sidebar-toggle');
    var wrap = document.querySelector('.recipe-sidebar-wrap');
    if (!toggle || !wrap) return;
    toggle.addEventListener('click', function () {
      var open = wrap.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // --- On this page toggles -----------------------------------------------
  //
  // Reading sidebar "On this page" (partials/reading-sidebar.html): on long
  // pages each section with subsections gets a count button. The markup
  // ships open with the buttons hidden, so without JS every subsection
  // stays reachable; this collapses the groups and shows the buttons.
  function initTocToggles() {
    document.querySelectorAll('.rs-toc-toggle').forEach(function (button) {
      var group = document.getElementById(button.getAttribute('aria-controls'));
      if (!group) return;
      group.hidden = true;
      button.setAttribute('aria-expanded', 'false');
      button.hidden = false;
      button.addEventListener('click', function () {
        var open = group.hidden;
        group.hidden = !open;
        button.setAttribute('aria-expanded', String(open));
      });
    });
  }

  function init() {
    var article = document.querySelector('.article-content');
    if (article) moveSidebarSections(article);
    initServings();
    initSidebarToggle();
    initTocToggles();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
