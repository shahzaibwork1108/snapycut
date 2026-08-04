#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const root = process.argv[2] || 'dist';
const textExts = new Set(['.js', '.css', '.html', '.json', '.svg', '.txt']);

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

const files = walk(root).filter(f => textExts.has(path.extname(f)));

for (const file of files) {
  const content = fs.readFileSync(file);

  // gzip
  try {
    const gz = zlib.gzipSync(content, { level: zlib.constants.Z_BEST_COMPRESSION });
    fs.writeFileSync(file + '.gz', gz);
  } catch (e) {
    console.warn('gzip failed for', file, e.message);
  }

  // brotli
  try {
    const br = zlib.brotliCompressSync(content, {
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
      },
    });
    fs.writeFileSync(file + '.br', br);
  } catch (e) {
    console.warn('brotli failed for', file, e.message);
  }
}

console.log(`Compressed ${files.length} files under ${root}`);
