// Generates Fugu's layer kit (assets/icons/layers/<key>.svg) from the shape
// functions in Not a Chef's mockups/exploded-builds.html, in its formula style.
// Usage, from the site root:
//   node mockups/export-layers.mjs mockups/exploded-builds.html themes/fugu/assets/icons/layers
// Then commit the SVGs in Fugu. Keys missing from the list below are skipped.
import fs from 'node:fs';
const [mock, out] = process.argv.slice(2);
const html = fs.readFileSync(mock, 'utf8');
const js = html.split('<script>')[1].split('/* ---------- Composer')[0];
const L = new Function(js + '; return L;')();

const RX = 70, CX = 105, W = 210;
const INK = 'stroke="currentColor"';
// var() only works in style, not in presentation attributes. The site's
// tokens first (as the formula icons use), then Fugu's (fugu.css).
const SOFT = 'var(--accent-soft, var(--fugu-accent-soft))', SURF = 'var(--surface, var(--fugu-surface))';
const soft = `style="fill:${SOFT}"`, surf = `style="fill:${SURF}"`;
// A patty's seared top (mockups/patty-sear.html): Fugu's fallbacks in fugu.css.
const SEAR = 'var(--sear, var(--fugu-sear))', FLECK = 'var(--sear-fleck, var(--fugu-sear-fleck))', CHAR = 'var(--sear-char, var(--fugu-sear-char))';
// Food colours (mockups/spreads-and-colour.html, 2026-10-14): Fugu's fallbacks in fugu.css.
const KIT = n => `var(--kit-${n}, var(--fugu-kit-${n}))`;
// The mockup's .fstyle rules as attributes, so a file needs no stylesheet.
const S = (w) => `stroke-width="${w}"`;
const style = {
  body: `${soft} ${INK} ${S(1.8)}`,
  top: `${surf} ${INK} ${S(1.8)}`,
  seed: `${surf} ${INK} ${S(1)}`,
  'leaf-vein': `${INK} ${S(1.2)}`,
  'tom-in': `${INK} ${S(1.1)}`,
  ring: `${INK} ${S(1.8)}`,
  'only-f': `${INK} ${S(1.8)}`,
  'bacon-stripe': `${surf} ${INK} ${S(.9)}`,
  fried: `${INK} ${S(1.5)}`,
  'fried-pad': soft,
  'tom-wall': `${INK} ${S(1)}`, 'crumb-hole': `${INK} ${S(1)}`, gloss: `${INK} ${S(1)}`,
  'tom-seed': `${surf} ${INK} ${S(.8)}`, 'pick-pip': `${surf} ${INK} ${S(.8)}`,
  'pick-ring': `${INK} ${S(.7)}`,
  pore: `${soft} ${INK} ${S(.7)}`,
  rim: `${INK} ${S(1)}`, 'crust-line': `${INK} ${S(1)}`,
  'squeeze-out': `${INK} ${S(5.2)}`,
  'squeeze-in': `style="stroke:${SOFT}" ${S(2.6)}`,
  chunk: `${surf} ${INK} ${S(.9)}`,
  bubble: `${soft} ${INK} ${S(.8)}`,
  // Round 4 texture (2026-10-11)
  tx: `${INK} ${S(.9)}`, 'tx-fine': `${INK} ${S(.6)}`, 'tx-bold': `${INK} ${S(1.5)}`,
  'tx-hatch': `${INK} ${S(.5)} stroke-opacity=".55"`,
  stip: 'fill="currentColor"',
  char: `style="fill:${CHAR};stroke:${CHAR}" ${S(.4)}`,
  'char-spat': `style="fill:${CHAR}"`,
  'sear-stip': `style="fill:${FLECK}"`,
  'sear-pit': `style="stroke:${FLECK}" ${S(.6)}`,
  sear: `style="fill:${SEAR}" ${INK} ${S(1.8)}`,
  seed2: `${surf} ${INK} ${S(.85)}`,
  jelly: `${soft} ${INK} ${S(.9)}`,
  'strand-out': `${INK} ${S(3.4)}`, 'swirl-out': `${INK} ${S(3.4)}`,
  'strand-in': `style="stroke:${SOFT}" ${S(1.6)}`, 'swirl-in': `style="stroke:${SOFT}" ${S(1.6)}`,
  'swirl-in-light': `style="stroke:${SURF}" ${S(1.6)}`,
  // Spreads (2026-10-14): swoop lips and their echoes.
  ridge: 'fill="currentColor"',
  'ridge-echo': `${INK} ${S(.5)} stroke-opacity=".7"`,
  // Slaw's carrot shreds (2026-10-27): round strands in the kit's red.
  'carrot-out': `${INK} ${S(3)}`, carrot: `style="stroke:${KIT('red')}" ${S(1.6)}`,
};
const bodies = ['onion-side','bun','leaf-back','tom-side','pick-side','cheese-side','meat','bacon','sauce-red','sauce-yel','sauce-pink','ragu'];
const tops = ['onion','crumb','leaf','tom','pick','cheese','bech','pasta'];
const hidden = ['ring-in','meat-dot','crust'];

// The layers that take a food colour, and which of their parts change: bodies and sauce lines
// the deeper value, top faces the paler one; tomato flesh deeper, its seed segments paler.
const COLOUR = {'lettuce':'green', 'lettuce-shredded':'green', 'slaw':'green', 'marinara':'red', 'lettuce-chunks':'green', 'pickle':'green', 'tomato':'red', 'ketchup':'red', 'mustard':'yellow', 'cheese-american':'yellow', 'sauce-ketchup-mustard':'km'};
function tint(c, a, key){
  const g = COLOUR[key], has = (...k) => k.some(x => c.includes(x));
  if (!g || a === null) return a;
  if (g === 'green'){
    if (c.includes('hair') && c.includes('leaf')) return `style="fill:${KIT('green-ink')}" ${INK} ${S(.6)}`;
    if (has('leaf-back', 'pick-side')) return a.replace(SOFT, KIT('green'));
    if (has('leaf', 'pick')) return a.replace(SURF, KIT('green-top'));
  }
  if (g === 'red'){
    if (has('tom-side', 'tom')) return a.replace(SOFT, KIT('red')).replace(SURF, KIT('red'));
    if (has('jelly')) return a.replace(SOFT, KIT('red-top'));
    if (has('sauce-red')) return a.replace(SOFT, KIT('red'));
  }
  if ((g === 'red' || g === 'km') && has('swirl-in-light')) return a.replace(SURF, KIT('red'));
  if (g === 'yellow' && has('cheese-side')) return a.replace(SOFT, KIT('yellow'));
  if (g === 'yellow' && has('cheese')) return a.replace(SURF, KIT('yellow-top'));
  if ((g === 'yellow' || g === 'km') && c[0] === 'swirl-in') return a.replace(SOFT, KIT('yellow'));
  return a;
}

function attrs(cls){
  const c = cls.split(/\s+/);
  if (c.some(k => hidden.includes(k))) return null;
  if (c[0] === 's'){
    const w = a => c.includes('thin') ? a.replace(S(1.8), S(1.2)) : c.includes('hair') ? a.replace(S(1.8), S(.9)) : a;
    if (c.includes('leaf-back')) return style.body;
    if (c.includes('meat-top')) return w(style.sear);
    if (bodies.some(k => c.includes(k))) return w(style.body);
    if (tops.some(k => c.includes(k))) return w(style.top);
    throw new Error('unstyled ' + cls);
  }
  const a = style[c[0]];
  if (!a) throw new Error('unstyled ' + cls);
  return a;
}

function restyle(svg, key){
  // Elements are flat (no nesting), each self-closing or a single <path .../>.
  return svg.replace(/<(\w+)\s([^>]*?)\/>/g, (m, tag, body) => {
    const cls = (body.match(/class="([^"]*)"/) || [])[1];
    if (!cls) throw new Error('no class: ' + m);
    const a = tint(cls.split(/\s+/), attrs(cls), key);
    if (a === null) return '';
    body = body.replace(/\s*class="[^"]*"/, '').replace(/\s*opacity="[^"]*"/, '').replace(/\s*style="[^"]*"/, '');
    return `<${tag} ${a} ${body.trim()}/>`;
  });
}

const keys = ['bun-top','lettuce','lettuce-shredded','slaw','patty-chicken','marinara','lettuce-chunks','tomato','onion-raw','onion-fried','onion-minced','pickle','cheese','cheese-american','bacon','patty-thin','patty-thin-grilled','patty-thick','patty-thick-grilled','patty-smash','ketchup','sauce-ketchup-mustard','sauce-burger','mustard','bun-base','bun-top+mayo','bun-base+mayo','bun-top+sauce-burger','bun-base+sauce-burger','bread','pasta','ragu','bechamel','cheese-top','mayo'];
fs.mkdirSync(out, {recursive: true});
for (const k of keys){
  const o = L[k](CX, 0, RX);
  const h = Math.round(o.h*10)/10, edge = Math.round(o.edge*10)/10;
  const body = restyle(o.svg.replace(/<\/?g>/g, ''), k).replace(/\/></g, '/>\n  <');
  fs.writeFileSync(`${out}/${k}.svg`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${h}" data-edge="${edge}" fill="none" stroke-linecap="round" stroke-linejoin="round" overflow="visible">\n  ${body}\n</svg>\n`);
  console.log(k, h, edge);
}
