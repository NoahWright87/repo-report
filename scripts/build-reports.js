#!/usr/bin/env node
// Post-build script: generates index.html for each report directory.
// Each report page is the same as the root index.html but with
// window.__REPORT_DATA_URL__ injected so the app knows to load that report's data.json.

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const distDir = 'dist';
const reportsDir = join(distDir, 'reports');

// Read the root index.html built by Vite
const rootHtml = readFileSync(join(distDir, 'index.html'), 'utf-8');

// Inject the data URL script just before </head>
function makeReportHtml(slug) {
  const injection = `  <script>window.__REPORT_DATA_URL__ = './data.json';</script>\n`;
  return rootHtml.replace('</head>', injection + '</head>');
}

// Find all report directories (any dir inside dist/reports/ that has a data.json)
let reportDirs;
try {
  reportDirs = readdirSync(reportsDir).filter(name => {
    const dir = join(reportsDir, name);
    return statSync(dir).isDirectory() && (() => {
      try { statSync(join(dir, 'data.json')); return true; } catch { return false; }
    })();
  });
} catch {
  console.log('No reports directory found in dist/ — skipping report HTML generation.');
  process.exit(0);
}

for (const slug of reportDirs) {
  const reportHtml = makeReportHtml(slug);
  const outputPath = join(reportsDir, slug, 'index.html');
  writeFileSync(outputPath, reportHtml, 'utf-8');
  console.log(`  ✓ ${outputPath}`);
}

console.log(`Generated index.html for ${reportDirs.length} report(s).`);
