// Ingredient list decoration + checkbox persistence + recipe scaling/units.
//
// Hugo/Goldmark has no render hook for lists (only headings, links, images,
// etc.), so render-heading.html can only mark where an ingredient section
// *starts* (an h2 with data-ing-heading="true") — it can't reach into the
// <ul>/<li> markup that Goldmark renders underneath it. This script does
// that part: walk forward from each marked heading to the next h2,
// collecting the <ul> it finds, and turn it into the real component
// (checkbox, quantity span, sub-note rows) with checked state persisted
// per-browser via localStorage. See PLAN.md 6.2b.
//
// It also injects a config menu (next to the first Ingredients heading)
// that scales quantities and converts them between metric/imperial. See
// PLAN.md's "Ingredient helpers" line under Phase 9 — this is a scoped-down
// first cut of that, living here rather than a separate warped-food.js
// since it only touches the same qty spans this file already owns.

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

  // --- Quantity parsing/formatting, for scaling + unit conversion ---------

  var UNICODE_FRAC = {
    '¼': 0.25, '½': 0.5, '¾': 0.75, '⅓': 1 / 3, '⅔': 2 / 3,
    '⅛': 0.125, '⅜': 0.375, '⅝': 0.625, '⅞': 0.875, '⅙': 1 / 6, '⅚': 5 / 6
  };

  function parseSimpleNumber(tok) {
    tok = tok.trim();
    if (!tok) return null;
    if (tok.length === 1 && UNICODE_FRAC.hasOwnProperty(tok)) return UNICODE_FRAC[tok];
    var slash = tok.match(/^(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/);
    if (slash) return parseFloat(slash[1]) / parseFloat(slash[2]);
    var m = tok.match(/^(\d+(?:\.\d+)?)([¼½¾⅓⅔⅛⅜⅝⅞⅙⅚])?$/);
    if (m) {
      var n = parseFloat(m[1]);
      if (m[2]) n += UNICODE_FRAC[m[2]];
      return n;
    }
    return null;
  }

  // The regex above treats a plain space and a hyphen/en-dash the same way
  // (it has to, to match both "1 1/2" and "2-3" with one pattern) — so
  // disambiguating a mixed number from a range happens here instead: if
  // the second half is itself a "n/d" fraction, it's read as the fractional
  // part of a mixed number (added to the first half); otherwise the two
  // halves are a range's endpoints.
  function parseQtyToken(raw) {
    raw = raw.trim();
    var sep = raw.match(/^(.+?)[\s\-–—]+(.+)$/);
    if (sep) {
      var a = parseSimpleNumber(sep[1]);
      var b = sep[2];
      if (a != null) {
        if (b.indexOf('/') !== -1) {
          var frac = parseSimpleNumber(b);
          if (frac != null) return { kind: 'single', value: a + frac };
        } else {
          var hi = parseSimpleNumber(b);
          if (hi != null) return { kind: 'range', lo: a, hi: hi };
        }
      }
    }
    var single = parseSimpleNumber(raw);
    if (single != null) return { kind: 'single', value: single };
    return null;
  }

  var UNIT_ALIASES = {
    g: 'g', kg: 'kg', mg: 'mg',
    ml: 'ml', l: 'l',
    cup: 'cup', cups: 'cup',
    tsp: 'tsp', tsps: 'tsp', teaspoon: 'tsp', teaspoons: 'tsp',
    tbsp: 'tbsp', tbsps: 'tbsp', tablespoon: 'tbsp', tablespoons: 'tbsp',
    oz: 'oz', ounce: 'oz', ounces: 'oz',
    lb: 'lb', lbs: 'lb', pound: 'lb', pounds: 'lb'
  };

  function normalizeUnit(raw) {
    if (!raw) return null;
    var key = raw.trim().toLowerCase();
    return UNIT_ALIASES.hasOwnProperty(key) ? UNIT_ALIASES[key] : null;
  }

  // "base" is the unit's size in its family's canonical unit (grams for
  // mass, mL for volume) — approximate, cooking-standard conversions
  // (1 cup = 240 mL, not the precise 236.588), consistent with this
  // project's existing tolerance for ballpark-not-exact numbers (see
  // data/ingredient_prices.yaml in PLAN.md).
  var UNIT_INFO = {
    g: { system: 'metric', family: 'mass', base: 1 },
    kg: { system: 'metric', family: 'mass', base: 1000 },
    mg: { system: 'metric', family: 'mass', base: 0.001 },
    ml: { system: 'metric', family: 'volume', base: 1 },
    l: { system: 'metric', family: 'volume', base: 1000 },
    tsp: { system: 'imperial', family: 'volume', base: 5 },
    tbsp: { system: 'imperial', family: 'volume', base: 15 },
    cup: { system: 'imperial', family: 'volume', base: 240 },
    oz: { system: 'imperial', family: 'mass', base: 28.35 },
    lb: { system: 'imperial', family: 'mass', base: 453.6 }
  };

  var UNIT_LABELS = {
    g: ['g', 'g'], kg: ['kg', 'kg'], mg: ['mg', 'mg'],
    ml: ['ml', 'ml'], l: ['L', 'L'],
    cup: ['cup', 'cups'], tsp: ['tsp', 'tsp'], tbsp: ['tbsp', 'tbsp'],
    oz: ['oz', 'oz'], lb: ['lb', 'lb']
  };

  function unitLabel(key, value) {
    var pair = UNIT_LABELS[key];
    if (!pair) return '';
    return Math.abs(value - 1) < 1e-9 ? pair[0] : pair[1];
  }

  function isMetricUnit(key) {
    return key === 'g' || key === 'kg' || key === 'mg' || key === 'ml' || key === 'l';
  }

  function roundToNearest(n, step) {
    return Math.round(n / step) * step;
  }

  // Converts a value in `fromKey`'s unit to the best-fitting unit in
  // `targetSystem`, or returns null if it's already in that system (the
  // caller then just relabels/re-pluralizes without touching the number).
  function convert(value, fromKey, targetSystem) {
    var info = UNIT_INFO[fromKey];
    if (!info || info.system === targetSystem) return null;
    var base = value * info.base;
    if (info.family === 'mass') {
      if (targetSystem === 'metric') {
        if (base >= 1000) return { value: base / 1000, unit: 'kg' };
        return { value: roundToNearest(base, base < 20 ? 1 : 5), unit: 'g' };
      }
      var lb = base / UNIT_INFO.lb.base;
      if (lb >= 1) return { value: lb, unit: 'lb' };
      return { value: base / UNIT_INFO.oz.base, unit: 'oz' };
    }
    if (targetSystem === 'metric') {
      if (base >= 1000) return { value: base / 1000, unit: 'l' };
      return { value: roundToNearest(base, base < 50 ? 5 : 25), unit: 'ml' };
    }
    if (base >= 180) return { value: base / UNIT_INFO.cup.base, unit: 'cup' };
    if (base >= 15) return { value: base / UNIT_INFO.tbsp.base, unit: 'tbsp' };
    return { value: base / UNIT_INFO.tsp.base, unit: 'tsp' };
  }

  var FRACTIONS = [
    [1 / 8, '⅛'], [1 / 6, '⅙'], [1 / 4, '¼'], [1 / 3, '⅓'], [3 / 8, '⅜'], [1 / 2, '½'],
    [5 / 8, '⅝'], [2 / 3, '⅔'], [3 / 4, '¾'], [5 / 6, '⅚'], [7 / 8, '⅞']
  ];

  // Imperial/unitless quantities read naturally as mixed numbers ("1½
  // tsp"), same style as the source recipes.
  function formatFraction(value) {
    if (value <= 0) return '0';
    var whole = Math.floor(value + 1e-9);
    var frac = value - whole;
    if (frac < 0.03) return String(whole || 0);
    var best = null, bestDiff = 0.06;
    FRACTIONS.forEach(function (pair) {
      var diff = Math.abs(frac - pair[0]);
      if (diff <= bestDiff) { bestDiff = diff; best = pair; }
    });
    if (best) return (whole > 0 ? String(whole) : '') + best[1];
    return String(Math.round(value * 100) / 100);
  }

  // Metric quantities read naturally as decimals ("2.4 L"), not fractions.
  function formatDecimal(value) {
    if (value <= 0) return '0';
    return String(parseFloat(value.toFixed(2)));
  }

  function wrapQty(li) {
    var node = firstTextNode(li);
    if (!node) return;
    var m = node.textContent.match(QTY_RE);
    if (!m) return;
    var qty = document.createElement('span');
    qty.className = 'qty mono';
    var text = m[0].replace(/\s+$/, '');
    qty.textContent = text;
    qty.dataset.qtyOriginal = text;

    var parsed = parseQtyToken(m[1]);
    if (parsed) {
      qty.dataset.qtyKind = parsed.kind;
      if (parsed.kind === 'single') {
        qty.dataset.qtyValue = String(parsed.value);
      } else {
        qty.dataset.qtyLo = String(parsed.lo);
        qty.dataset.qtyHi = String(parsed.hi);
      }
      var unitKey = normalizeUnit(m[2]);
      if (unitKey) qty.dataset.qtyUnit = unitKey;
      if (m[2]) qty.dataset.qtyUnitRaw = m[2].trim();
    }

    // m[0]'s trailing whitespace is consumed by the match (so the qty span
    // itself doesn't end in a space) but a real space still has to survive
    // between the span and the rest of the text — otherwise "200g" and
    // "red lentils" render jammed together as "200gred lentils".
    var rest = document.createTextNode(' ' + node.textContent.slice(m[0].length));
    node.parentNode.insertBefore(qty, node);
    node.parentNode.insertBefore(rest, node);
    node.parentNode.removeChild(node);
  }

  // Re-renders one qty span for a given scale factor + unit system
  // ('original' | 'metric' | 'imperial' | 'kelvin'). At the default 1x/original state
  // it just restores the untouched source text, so a page nobody has
  // touched the config menu on looks exactly as before this feature.
  function renderQty(qty, scale, unitSystem) {
    var kind = qty.dataset.qtyKind;
    if (!kind) return;
    if (scale === 1 && unitSystem === 'original') {
      qty.textContent = qty.dataset.qtyOriginal;
      return;
    }

    var unitKey = qty.dataset.qtyUnit || '';
    var rawUnit = qty.dataset.qtyUnitRaw || '';

    // Picks the natural size for a metric value at its own (unrounded)
    // magnitude — scaling up crosses the 1000 line for real ("1000g" reads
    // as "1kg", "1500g" as "1.5kg"), whether or not the units toggle is
    // actively converting between systems.
    function renormalizeMetric(value, key) {
      var info = UNIT_INFO[key];
      var base = value * info.base;
      if (info.family === 'mass') {
        return base >= 1000 ? { value: base / 1000, unit: 'kg' } : { value: base, unit: 'g' };
      }
      return base >= 1000 ? { value: base / 1000, unit: 'l' } : { value: base, unit: 'ml' };
    }

    function relabelNative(key, value) {
      if (isMetricUnit(key)) {
        var r = renormalizeMetric(value, key);
        return { value: r.value, unit: r.unit, label: unitLabel(r.unit, r.value) };
      }
      return { value: value, unit: key, label: unitLabel(key, value) };
    }

    // `forceUnit`, when given, expresses the result directly in that unit
    // instead of picking one — used to keep both ends of a range in the
    // same unit (never "800–1.2 kg").
    function transform(raw, forceUnit) {
      var value = raw * scale;
      var label = '';
      var finalUnit = unitKey || null;
      if (unitKey) {
        if (forceUnit) {
          value = (value * UNIT_INFO[unitKey].base) / UNIT_INFO[forceUnit].base;
          finalUnit = forceUnit;
          label = unitLabel(forceUnit, value);
        } else if (unitSystem === 'metric' || unitSystem === 'imperial') {
          var converted = convert(value, unitKey, unitSystem);
          if (converted) {
            value = converted.value;
            finalUnit = converted.unit;
            label = unitLabel(converted.unit, value);
          } else {
            var native = relabelNative(unitKey, value);
            value = native.value; finalUnit = native.unit; label = native.label;
          }
        } else {
          // 'original' or 'kelvin' — Kelvin has no applicable ingredient
          // unit (nothing in an ingredient list is a temperature), so it's
          // inert here: scaled and relabelled like 'original', not
          // converted between systems.
          var native2 = relabelNative(unitKey, value);
          value = native2.value; finalUnit = native2.unit; label = native2.label;
        }
      } else if (rawUnit) {
        // A count unit not in UNIT_ALIASES (cloves, cans, pinches, ...) —
        // no conversion table and re-pluralizing it correctly isn't worth
        // the risk (bunch/bunches, pinch/pinches don't just take "+s"), so
        // the original word is carried over as-is. Same tolerance this
        // file already has for a "harmless fallback, not a broken layout."
        label = rawUnit;
      }
      return { value: value, label: label, unit: finalUnit, metric: isMetricUnit(finalUnit) };
    }

    if (kind === 'single') {
      var r = transform(parseFloat(qty.dataset.qtyValue));
      var fmt = r.metric ? formatDecimal : formatFraction;
      qty.textContent = fmt(r.value) + (r.label ? ' ' + r.label : '');
    } else {
      var hi = transform(parseFloat(qty.dataset.qtyHi));
      var lo = transform(parseFloat(qty.dataset.qtyLo), hi.unit);
      var fmt2 = hi.metric ? formatDecimal : formatFraction;
      qty.textContent = fmt2(lo.value) + '–' + fmt2(hi.value) + (hi.label ? ' ' + hi.label : '');
    }
  }

  // --- Checkbox rows --------------------------------------------------

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

  // --- Config menu: scale recipe / change units ------------------------

  var SCALE_MIN = 1;
  var SCALE_MAX = 5;
  var SCALE_STEP = 0.5;
  var GEAR_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="3"></circle>' +
    '<path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1.03-1.56V3a2 2 0 1 1 4 0v.09A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.56 1.03H21a2 2 0 1 1 0 4h-.09A1.7 1.7 0 0 0 19.4 15z"></path>' +
    '</svg>';

  function buildUnitButton(text, value) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ing-btn';
    btn.textContent = text;
    btn.dataset.units = value;
    return btn;
  }

  function formatScaleValue(n) {
    return (Number.isInteger(n) ? String(n) : n.toFixed(1)) + '×';
  }

  // One menu governs the whole page: a multi-component recipe (e.g.
  // dal-tadka's "## Dal" / "## Tadka") has several ingredient headings,
  // but scaling/units is a whole-recipe operation, so this is injected
  // once, on the first one, and re-renders every .qty under `root`.
  function buildConfigMenu(root, pageKey) {
    var details = document.createElement('details');
    details.className = 'ing-config';

    var summary = document.createElement('summary');
    summary.className = 'ing-config-btn';
    summary.setAttribute('aria-label', 'Ingredient options: scale recipe or change units');
    summary.innerHTML = GEAR_ICON;
    details.appendChild(summary);

    var panel = document.createElement('div');
    panel.className = 'ing-config-panel';

    var scaleGroup = document.createElement('div');
    scaleGroup.className = 'ing-config-group';
    var scaleLabel = document.createElement('div');
    scaleLabel.className = 'ing-config-label';
    scaleLabel.textContent = 'Scale recipe';
    scaleGroup.appendChild(scaleLabel);

    var scaleSliderRow = document.createElement('div');
    scaleSliderRow.className = 'ing-scale-slider';
    var scaleSlider = document.createElement('input');
    scaleSlider.type = 'range';
    scaleSlider.id = 'ing-scale-slider';
    scaleSlider.min = String(SCALE_MIN);
    scaleSlider.max = String(SCALE_MAX);
    scaleSlider.step = String(SCALE_STEP);
    var scaleValue = document.createElement('span');
    scaleValue.className = 'ing-scale-value mono';
    scaleSliderRow.appendChild(scaleSlider);
    scaleSliderRow.appendChild(scaleValue);
    scaleGroup.appendChild(scaleSliderRow);
    panel.appendChild(scaleGroup);

    var unitsGroup = document.createElement('div');
    unitsGroup.className = 'ing-config-group ing-config-group--units';
    var unitsLabel = document.createElement('div');
    unitsLabel.className = 'ing-config-label';
    unitsLabel.textContent = 'Units';
    unitsGroup.appendChild(unitsLabel);
    var unitsRow = document.createElement('div');
    unitsRow.className = 'ing-config-row';
    var unitButtons = [
      ['original', 'As written'], ['metric', 'Metric'], ['imperial', 'Imperial'], ['kelvin', 'Kelvin']
    ].map(function (pair) {
      var btn = buildUnitButton(pair[1], pair[0]);
      unitsRow.appendChild(btn);
      return btn;
    });
    unitsGroup.appendChild(unitsRow);
    panel.appendChild(unitsGroup);

    details.appendChild(panel);

    // Units are a general taste, kept site-wide (like the theme toggle);
    // scale is specific to this recipe's yield, kept per-page.
    var scaleKey = 'ing:scale:' + pageKey;
    var unitsKey = 'ing:units';

    function readScale() {
      try {
        var v = parseFloat(localStorage.getItem(scaleKey));
        return Math.min(SCALE_MAX, Math.max(SCALE_MIN, v || SCALE_MIN));
      } catch (e) { return SCALE_MIN; }
    }
    function readUnits() {
      try {
        var v = localStorage.getItem(unitsKey);
        return (v === 'metric' || v === 'imperial' || v === 'kelvin') ? v : 'original';
      } catch (e) { return 'original'; }
    }

    var state = { scale: readScale(), units: readUnits() };

    function syncControls() {
      scaleSlider.value = String(state.scale);
      scaleValue.textContent = formatScaleValue(state.scale);
      unitButtons.forEach(function (btn) {
        btn.classList.toggle('active', btn.dataset.units === state.units);
      });
    }

    function apply() {
      root.querySelectorAll('.qty').forEach(function (qty) {
        renderQty(qty, state.scale, state.units);
      });
      syncControls();
    }

    scaleSlider.addEventListener('input', function () {
      state.scale = parseFloat(scaleSlider.value);
      try { localStorage.setItem(scaleKey, String(state.scale)); } catch (e) {}
      apply();
    });
    unitButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.units = btn.dataset.units;
        try { localStorage.setItem(unitsKey, state.units); } catch (e) {}
        apply();
      });
    });

    syncControls();
    if (state.scale !== 1 || state.units !== 'original') apply();

    return details;
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

    if (headings.length) {
      headings[0].appendChild(buildConfigMenu(root, pageKey));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
