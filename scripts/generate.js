#!/usr/bin/env node
/**
 * Fiord Component Generator
 *
 * Reads definition files from src/{base,aesthetics/<name>}/components/,
 * combines them with boilerplate.json, and writes self-contained HTML files
 * to public/{base,aesthetics/<name>}/components/.
 *
 * Definition files are pure HTML. Interactive components may have a companion
 * .js file (script body only, no <script> tags).
 *
 * Optional first-line comment to override the wrapper div width:
 *   <!-- fiord:wrapper max-w-4xl mx-auto -->
 * If absent, boilerplate.wrapper_class is used.
 *
 * Usage:
 *   node scripts/generate.js
 *   node scripts/generate.js --aesthetic slate
 *   node scripts/generate.js --base
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT   = path.join(__dirname, '..');
const SRC    = path.join(ROOT, 'src');
const PUBLIC = path.join(ROOT, 'public');

const RE_WRAPPER = /^<!--\s*fiord:wrapper\s+([^-].*?)\s*-->\n?/;

function titleCase(name) {
  return name.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
}

/**
 * Parse optional <!-- fiord:wrapper CLASS --> from the first line of a definition file.
 * Returns { wrapperOverride, content } — content has the comment line stripped.
 */
function parseDefinition(raw) {
  const m = raw.match(RE_WRAPPER);
  if (!m) return { wrapperOverride: null, content: raw };
  return { wrapperOverride: m[1].trim(), content: raw.slice(m[0].length) };
}

function buildPage(boilerplate, componentName, definitionRaw, scriptBody) {
  const { aesthetic, display_name, tailwind_config, font_import, body_class, wrapper_class } = boilerplate;
  const { wrapperOverride, content: definitionHtml } = parseDefinition(definitionRaw);
  const wrapper = wrapperOverride || wrapper_class;

  const L = [];
  L.push('<!DOCTYPE html>');
  L.push('<html lang="en">');
  L.push('<head>');
  L.push('  <meta charset="UTF-8">');
  L.push('  <meta name="viewport" content="width=device-width, initial-scale=1.0">');
  L.push(`  <title>Fiord \u2014 ${display_name} / ${titleCase(componentName)}</title>`);
  L.push('  <script src="https://cdn.tailwindcss.com"></script>');
  if (tailwind_config) {
    L.push('  <script>');
    L.push(`    tailwind.config = ${tailwind_config}`);
    L.push('  </script>');
  }
  if (font_import) L.push(`  ${font_import}`);
  L.push('</head>');
  L.push(`<body class="${body_class}">`);
  L.push(`  <div class="${wrapper}">`);
  L.push('');
  L.push(`    <!-- FIORD:COMPONENT_START aesthetic="${aesthetic}" component="${componentName}" -->`);
  L.push(definitionHtml.replace(/\n+$/, ''));
  L.push('');
  L.push(`    <!-- FIORD:COMPONENT_END -->`);
  L.push('');
  L.push('  </div>');
  if (scriptBody) {
    L.push('');
    L.push('  <!-- FIORD:JS_START -->');
    L.push('  <script>');
    L.push(scriptBody.replace(/\n+$/, ''));
    L.push('  </script>');
    L.push('  <!-- FIORD:JS_END -->');
    L.push('');
  }
  L.push('</body>');
  L.push('</html>');
  return L.join('\n') + '\n';
}

function processDir(srcDir, outDir, boilerplate, label) {
  if (!fs.existsSync(srcDir)) { console.warn(`  [skip] ${srcDir}`); return 0; }
  fs.mkdirSync(outDir, { recursive: true });

  const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.html')).sort();
  for (const file of files) {
    const name = path.basename(file, '.html');
    const html = fs.readFileSync(path.join(srcDir, file), 'utf8');
    const jsPath = path.join(srcDir, name + '.js');
    const js = fs.existsSync(jsPath) ? fs.readFileSync(jsPath, 'utf8') : null;
    fs.writeFileSync(path.join(outDir, file), buildPage(boilerplate, name, html, js));
  }

  console.log(`  ${label}: ${files.length} file(s) → ${path.relative(ROOT, outDir)}`);
  return files.length;
}

// ── main ────────────────────────────────────────────────────────────────────

const args         = process.argv.slice(2);
const onlyAesthetic = args.includes('--aesthetic') ? args[args.indexOf('--aesthetic') + 1] : null;
const onlyBase      = args.includes('--base');
let total = 0;

if (!onlyAesthetic) {
  const bpFile = path.join(SRC, 'base', 'boilerplate.json');
  if (fs.existsSync(bpFile)) {
    total += processDir(
      path.join(SRC, 'base', 'components'),
      path.join(PUBLIC, 'base', 'components'),
      JSON.parse(fs.readFileSync(bpFile, 'utf8')),
      'base'
    );
  } else {
    console.warn('[warn] src/base/boilerplate.json not found');
  }
}

if (!onlyBase) {
  const aestheticsDir = path.join(SRC, 'aesthetics');
  if (fs.existsSync(aestheticsDir)) {
    for (const name of fs.readdirSync(aestheticsDir)) {
      if (onlyAesthetic && name !== onlyAesthetic) continue;
      if (!fs.statSync(path.join(aestheticsDir, name)).isDirectory()) continue;
      const bpFile = path.join(aestheticsDir, name, 'boilerplate.json');
      if (!fs.existsSync(bpFile)) { console.warn(`[warn] no boilerplate.json for aesthetic "${name}"`); continue; }
      total += processDir(
        path.join(aestheticsDir, name, 'components'),
        path.join(PUBLIC, 'aesthetics', name, 'components'),
        JSON.parse(fs.readFileSync(bpFile, 'utf8')),
        `aesthetic:${name}`
      );
    }
  }
}

console.log(`\nDone. ${total} file(s) generated.`);
