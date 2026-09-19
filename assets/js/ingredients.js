// Ingredient list decoration + checkbox persistence.
//
// Hugo/Goldmark has no render hook for lists (only headings, links, images,
// etc.), so render-heading.html can only mark where an ingredient section
// *starts* (an h2 with data-ing-heading="true") — it can't reach into the
// <ul>/<li> markup that Goldmark renders underneath it. This script does
// that part: walk forward from each marked heading to the next h2,
// collecting the <ul> it finds, and turn it into the real component
// (checkbox, quantity span, sub-note rows) with checked state persisted
// per-browser via localStorage. See PLAN.md 6.2b.

(function () {
  // Best-effort leading-quantity matcher, built from real recipes in this
  // vault (not every case in FORMAT.md's grammar — "a pinch of", "to
  // taste" etc. have no leading number and are left unstyled, which is a
  // harmless fallback, not a broken layout).
  var QTY_RE = new RegExp(
    '^\\s*(' +
      // "1½" (glued mixed number, FORMAT.md's own example style) as well
      // as "1 1/2", "1.5", and "2–3"/"2-3" ranges.
      '\\d+[¼½¾⅓⅔⅛⅜⅝⅞⅙⅚]?(?:\\.\\d+)?(?:\\s?/\\s?\\d+)?(?:[\\s\\-–—]\\d+[¼½¾⅓⅔⅛⅜⅝⅞⅙⅚]?(?:\\.\\d+)?(?:\\s?/\\s?\\d+)?)?' +
      '|[¼½¾⅓⅔⅛⅜⅝⅞⅙⅚]' +
        '(?:[\\s\\-–—][¼½¾⅓⅔⅛⅜⅝⅞⅙⅚\\d]+)?' +
    ')' +
    '(\\s?(?:g|kg|mg|ml|mL|L|l|cups?|tsps?|tbsps?|teaspoons?|tablespoons?|oz|ounces?|lbs?|pounds?|' +
      'cloves?|heads?|cans?|packages?|slices?|pinch(?:es)?|dash(?:es)?|sprigs?|bunch(?:es)?|stalks?|sheets?)\\b)?' +
    '\\.?\\s+',
    'i'
  );

  function firstTextNode(el) {
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    return walker.nextNode();
  }

  function wrapQty(li) {
    var node = firstTextNode(li);
    if (!node) return;
    var m = node.textContent.match(QTY_RE);
    if (!m) return;
    var qty = document.createElement('span');
    qty.className = 'qty mono';
    qty.textContent = m[0].replace(/\s+$/, '');
    // m[0]'s trailing whitespace is consumed by the match (so the qty span
    // itself doesn't end in a space) but a real space still has to survive
    // between the span and the rest of the text — otherwise "200g" and
    // "red lentils" render jammed together as "200gred lentils".
    var rest = document.createTextNode(' ' + node.textContent.slice(m[0].length));
    node.parentNode.insertBefore(qty, node);
    node.parentNode.insertBefore(rest, node);
    node.parentNode.removeChild(node);
  }

  function enhanceRow(li, pageKey) {
    li.classList.add('ing');
    wrapQty(li);

    var label = document.createElement('label');
    while (li.firstChild) label.appendChild(li.firstChild);

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    li.appendChild(checkbox);
    li.appendChild(label);

    var key = 'ing:' + pageKey + ':' + label.textContent.trim();
    try {
      if (localStorage.getItem(key) === '1') checkbox.checked = true;
    } catch (e) {}

    checkbox.addEventListener('change', function () {
      try {
        if (checkbox.checked) localStorage.setItem(key, '1');
        else localStorage.removeItem(key);
      } catch (e) {}
    });
  }

  function enhanceSubRow(li) {
    li.classList.add('ing', 'sub');
    li.insertBefore(document.createTextNode('— '), li.firstChild);
  }

  function enhanceList(ul, pageKey) {
    ul.classList.add('ing-list');
    var items = Array.prototype.slice.call(ul.children).filter(function (el) {
      return el.tagName === 'LI';
    });
    items.forEach(function (li) {
      var nested = li.querySelector(':scope > ul');
      var subItems = [];
      if (nested) {
        subItems = Array.prototype.slice.call(nested.children).filter(function (el) {
          return el.tagName === 'LI';
        });
        nested.parentNode.removeChild(nested);
      }
      enhanceRow(li, pageKey);
      subItems.forEach(function (sub) {
        enhanceSubRow(sub);
        li.parentNode.insertBefore(sub, li.nextSibling);
        li = sub; // keep inserting subsequent sub-items in order after this one
      });
    });
  }

  function init() {
    var root = document.querySelector('.article-content[data-page-key]');
    if (!root) return;
    var pageKey = root.dataset.pageKey;

    var headings = root.querySelectorAll('h2[data-ing-heading="true"]');
    headings.forEach(function (h2) {
      var el = h2.nextElementSibling;
      while (el && el.tagName !== 'H2') {
        if (el.tagName === 'UL') enhanceList(el, pageKey);
        el = el.nextElementSibling;
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
