#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = process.argv[2] || 'dist';

function walk(dir) {
  const results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const d of list) {
    const full = path.join(dir, d.name);
    if (d.isDirectory()) results.push(...walk(full));
    else results.push(full);
  }
  return results;
}

if (!fs.existsSync(root)) {
  console.error(`Directory not found: ${root}`);
  process.exit(2);
}

const files = walk(root);
const total = files.length;
const br = files.filter(f => f.endsWith('.br'));
const gz = files.filter(f => f.endsWith('.gz'));

// Find original files that lack compressed counterparts for common text types
const textExts = ['.js', '.css', '.html', '.json', '.svg'];
const originals = files.filter(f => textExts.includes(path.extname(f)));
const missing = [];
for (const orig of originals) {
  const brPath = orig + '.br';
  const gzPath = orig + '.gz';
  if (!fs.existsSync(brPath) && !fs.existsSync(gzPath)) missing.push(path.relative(root, orig));
}

console.log(`Scanned: ${total} files in ${root}`);
console.log(`Found: ${br.length} .br files and ${gz.length} .gz files`);
if (missing.length) {
  console.log('\nText assets missing precompressed variants:');
  missing.slice(0, 30).forEach(f => console.log(' -', f));
  if (missing.length > 30) console.log(`...and ${missing.length - 30} more`);
  process.exitCode = 1;
} else {
  console.log('\nAll common text assets have at least one precompressed file (.br or .gz).');
}
