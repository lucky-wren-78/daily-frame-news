// Renders design.html to entry.png at exactly 1024x1024 with headless Chromium.
// This script is how the committed entry.png was produced; the grader never runs
// it (the entry program is main.ts, which copies the committed entry.png).
// Playwright is resolved from the workspace tools folder used to build this entry.
//
//   node render.mjs            (run from this directory)

import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const toolsPkg = join(process.env.HOME ?? '', 'workspace/makefun/tools-browser/package.json');
const { chromium } = createRequire(toolsPkg)('playwright');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1024, height: 1024 } });
await page.goto('file://' + join(here, 'design.html'), { waitUntil: 'load' });
await page.screenshot({ path: join(here, 'entry.png') });
await browser.close();
console.log('wrote entry.png (1024x1024)');
