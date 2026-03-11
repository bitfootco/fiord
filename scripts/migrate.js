#!/usr/bin/env node
/**
 * Fiord Migration Script (one-time use)
 *
 * Reads existing fully-formed HTML files from public/ and extracts definition
 * content into src/, stripping all boilerplate.
 *
 * Output per component:
 *   src/{base,aesthetics/<name>}/components/<component>.html
 *     — pure HTML markup (content between first FIORD:COMPONENT_START and last
 *       FIORD:COMPONENT_END; intermediate sentinel lines stripped)
 *     — if the component uses a non-default wrapper width (max-w-*), a
 *       <!-- fiord:wrapper CLASS --> comment is prepended as the first line
 *
 *   src/{base,aesthetics/<name>}/components/<component>.js  (when present)
 *     — script body only (content inside <script> in the FIORD:JS_START block)
 *
 * After running: node scripts/generate.js
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT   = path.join(__dirname, '..');
const SRC    = path.join(ROOT, 'src');
const PUBLIC = path.join(ROOT, 'public');

const RE_START  = /<!--\s*FIORD:COMPONENT_START[^>]*-->/;
const RE_END    = /<!--\s*FIORD:COMPONENT_END\s*-->/;
const RE_JSSTART = /<!--\s*FIORD:JS_START\s*-->/;
const RE_JSEND   = /<!--\s*FIORD:JS_END\s*-->/;
const RE_SCROPEN = /^\s*<script>\s*$/;
const RE_SCRCLOSE = /^\s*<\/script>\s*$/;

/** Extract the wrapper div's class from the first <div> after <body>. */
function wrapperClass(lines) {
  let pastBody = false;
  for (const l of lines) {
    if (l.includes('<body')) { pastBody = true; continue; }
    if (pastBody && l.trim().startsWith('<div class="')) {
      const m = l.match(/class="([^"]+)"/);
      return m ? m[1] : null;
    }
    if (pastBody && RE_START.test(l)) return null; // hit content before wrapper
  }
  return null;
}

/** Extract max-w-* token from a class string (e.g. "max-w-4xl"). */
function maxWToken(cls) {
  const m = (cls || '').match(/\bmax-w-\S+/);
  return m ? m[0] : null;
}

/** Extract all markup between first START and last END, stripping sentinel lines. */
function extractComponent(lines) {
  let first = -1, last = -1;
  lines.forEach((l, i) => {
    if (RE_START.test(l) && first === -1) first = i;
    if (RE_END.test(l)) last = i;
  });
  if (first === -1 || last === -1) return null;

  const out = [];
  for (let i = first + 1; i < last; i++) {
    if (RE_START.test(lines[i]) || RE_END.test(lines[i])) continue;
    out.push(lines[i]);
  }
  while (out.length && out[out.length - 1].trim() === '') out.pop();
  return out.join('\n');
}

/** Extract script body inside FIORD:JS_START block. */
function extractJs(lines) {
  let inBlock = false, inScript = false;
  const out = [];
  for (const l of lines) {
    if (!inBlock && RE_JSSTART.test(l))           { inBlock = true; continue; }
    if (inBlock && RE_JSEND.test(l))              break;
    if (inBlock && !inScript && RE_SCROPEN.test(l))  { inScript = true; continue; }
    if (inBlock && inScript && RE_SCRCLOSE.test(l))  { inScript = false; continue; }
    if (inScript) out.push(l);
  }
  while (out.length && out[out.length - 1].trim() === '') out.pop();
  return out.length ? out.join('\n') : null;
}

function migrateDir(inputDir, outputDir, defaultWrapperClass) {
  if (!fs.existsSync(inputDir)) { console.warn(`  [skip] ${inputDir}`); return 0; }
  fs.mkdirSync(outputDir, { recursive: true });

  const defaultMaxW = maxWToken(defaultWrapperClass);
  let count = 0, jsCount = 0, wrapperCount = 0;

  for (const file of fs.readdirSync(inputDir).filter(f => f.endsWith('.html')).sort()) {
    const lines = fs.readFileSync(path.join(inputDir, file), 'utf8').split('\n');

    const markup = extractComponent(lines);
    if (!markup) { console.warn(`  [warn] no component block: ${file}`); continue; }

    // Check if this file's wrapper uses a different max-w-* than the default
    const cls = wrapperClass(lines);
    const fileMaxW = maxWToken(cls);
    let definition = markup;
    if (cls && fileMaxW && fileMaxW !== defaultMaxW) {
      definition = `<!-- fiord:wrapper ${cls} -->\n` + markup;
      wrapperCount++;
    }

    fs.writeFileSync(path.join(outputDir, file), definition + '\n');
    count++;

    const js = extractJs(lines);
    if (js) {
      fs.writeFileSync(path.join(outputDir, path.basename(file, '.html') + '.js'), js + '\n');
      jsCount++;
    }
  }

  const label = path.relative(ROOT, outputDir);
  const extras = [jsCount && `${jsCount} js`, wrapperCount && `${wrapperCount} wrapper overrides`].filter(Boolean);
  console.log(`  ${label}: ${count} html${extras.length ? ' (' + extras.join(', ') + ')' : ''}`);
  return count;
}

// ── main ────────────────────────────────────────────────────────────────────

const bpBase = JSON.parse(fs.readFileSync(path.join(SRC, 'base', 'boilerplate.json'), 'utf8'));
console.log('Migrating base...');
migrateDir(path.join(PUBLIC, 'base', 'components'), path.join(SRC, 'base', 'components'), bpBase.wrapper_class);

const aestheticsDir = path.join(PUBLIC, 'aesthetics');
if (fs.existsSync(aestheticsDir)) {
  for (const name of fs.readdirSync(aestheticsDir)) {
    const inputDir = path.join(aestheticsDir, name, 'components');
    if (!fs.existsSync(inputDir)) continue;
    const bpFile = path.join(SRC, 'aesthetics', name, 'boilerplate.json');
    if (!fs.existsSync(bpFile)) { console.warn(`[warn] no boilerplate.json for ${name}`); continue; }
    const bp = JSON.parse(fs.readFileSync(bpFile, 'utf8'));
    console.log(`Migrating ${name}...`);
    migrateDir(inputDir, path.join(SRC, 'aesthetics', name, 'components'), bp.wrapper_class);
  }
}

console.log('\nDone. Run `node scripts/generate.js` to rebuild public/.');
