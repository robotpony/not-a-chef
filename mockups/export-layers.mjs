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
};
const bodies = ['bun','leaf-back','tom-side','pick-side','cheese-side','meat','bacon','sauce-red','sauce-yel','sauce-pink','ragu'];
const tops = ['crumb','leaf','tom','pick','cheese','meat-top','bech','pasta'];
const hidden = ['ring-in','meat-dot','crust'];

function attrs(cls){
  const c = cls.split(/\s+/);
  if (c.some(k => hidden.includes(k))) return null;
  if (c[0] === 's'){
    if (c.includes('leaf-back')) return style.body;
    if (bodies.some(k => c.includes(k))) return style.body;
    if (tops.some(k => c.includes(k))) return style.top;
    throw new Error('unstyled ' + cls);
  }
  const a = style[c[0]];
  if (!a) throw new Error('unstyled ' + cls);
  return a;
}

function restyle(svg){
  // Elements are flat (no nesting), each self-closing or a single <path .../>.
  return svg.replace(/<(\w+)\s([^>]*?)\/>/g, (m, tag, body) => {
    const cls = (body.match(/class="([^"]*)"/) || [])[1];
    if (!cls) throw new Error('no class: ' + m);
    const a = attrs(cls);
    if (a === null) return '';
    body = body.replace(/\s*class="[^"]*"/, '').replace(/\s*opacity="[^"]*"/, '').replace(/\s*style="[^"]*"/, '');
    return `<${tag} ${a} ${body.trim()}/>`;
  });
}

const keys = ['bun-top','lettuce','tomato','onion-raw','onion-fried','pickle','cheese','bacon','patty-thin','patty-thick','patty-smash','sauce-ketchup-mustard','sauce-burger','mustard','bun-base','bread','pasta','ragu','bechamel','cheese-top','mayo'];
fs.mkdirSync(out, {recursive: true});
for (const k of keys){
  const o = L[k](CX, 0, RX);
  const h = Math.round(o.h*10)/10, edge = Math.round(o.edge*10)/10;
  const body = restyle(o.svg.replace(/<\/?g>/g, '')).replace(/\/></g, '/>\n  <');
  fs.writeFileSync(`${out}/${k}.svg`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${h}" data-edge="${edge}" fill="none" stroke-linecap="round" stroke-linejoin="round" overflow="visible">\n  ${body}\n</svg>\n`);
  console.log(k, h, edge);
}
