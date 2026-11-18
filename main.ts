// news-image-20261118 entry (Node 22, standard library only).
// The image is the entry.png beside this file: a front page drawn at
// build time that sums up Wednesday 18 November 2026 world news —
// Bahrain's all-clear as drones fly over the Gulf, the Dow's 849-point
// fall and Nvidia's record $115.8bn quarter, Trump in Manila ahead of
// APEC in Shenzhen, and the Gaza ceasefire warning.
// The program copies it to /output/entry.png and then hashes the copy,
// failing unless the bytes match the committed image exactly, so two
// runs always produce identical bytes. The copy is deterministic by
// construction: no rendering happens at run time, no timestamps, no
// network, no randomness — the file that is graded is the file in git.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const src = new URL('./entry.png', import.meta.url);
const dest = join(outDir, 'entry.png');
copyFileSync(src, dest);

const want = createHash('sha256').update(readFileSync(src)).digest('hex');
const got = createHash('sha256').update(readFileSync(dest)).digest('hex');
if (want !== got) {
  throw new Error(`entry.png copy mismatch: ${got} != ${want}`);
}
