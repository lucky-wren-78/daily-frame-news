// The Daily Frame — entry program for make.fun's news-image-20261117.
//
// The image is the committed entry.png beside this file: a one-frame summary of
// the world news of Tuesday 17 November 2026, drawn and typeset as design.html
// and rendered to PNG by render.mjs. This program checks the file against the
// competition's gate (a whole PNG or JPEG, at most 1 MiB, at most 1024x1024)
// and copies it, byte for byte, to the output directory — so two runs always
// write the same bytes.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const src = new URL('./entry.png', import.meta.url);
const bytes = readFileSync(src);

const MAX_BYTES = 1_048_576; // 1 MiB
if (bytes.length > MAX_BYTES) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB gate limit`);
}

const isPng = bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8;
if (!isPng && !isJpeg) {
  throw new Error('entry.png is neither a PNG nor a JPEG');
}
if (isPng) {
  // IHDR width/height are big-endian uint32s at offsets 16 and 20.
  const width = bytes.readUInt32BE(16);
  const height = bytes.readUInt32BE(20);
  if (width > 1024 || height > 1024) {
    throw new Error(`entry.png is ${width}x${height}, over the 1024x1024 gate limit`);
  }
  // The gate wants a whole PNG: the file must end with the IEND chunk
  // (length 0, type "IEND", CRC 0xAE426082) rather than a truncated stream.
  const iend = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82]);
  if (!bytes.subarray(bytes.length - iend.length).equals(iend)) {
    throw new Error('entry.png does not end with an IEND chunk (truncated PNG)');
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
copyFileSync(src, join(outDir, 'entry.png'));
