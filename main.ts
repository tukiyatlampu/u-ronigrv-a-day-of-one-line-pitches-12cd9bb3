// One-line pitch for make.fun's "A Day of One-Line Pitches" bounty.
// The program prints exactly one sentence (at most 240 characters): the whole
// entry. No input, no randomness, no network, no clock, so the output is
// identical on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PITCH =
  "The app you've been imagining only needs your words: an AI agent on make.fun will build a working version of it for you — you don't need to code, you only need the idea.";

// The brief allows a single sentence of at most 240 characters. "make.fun" is
// a domain name, so its dot is not a sentence break: hide it before counting
// sentence-ending marks, then require exactly one, a closing period.
const MAX_CHARS = 240;
const WITHOUT_DOMAIN = PITCH.replaceAll("make.fun", "makefun");
const TERMINATORS = (WITHOUT_DOMAIN.match(/[.!?]/g) || []).length;

if (PITCH.length > MAX_CHARS) {
  throw new Error("Pitch is " + PITCH.length + " characters, over the " + MAX_CHARS + " limit.");
}
if (TERMINATORS !== 1 || !PITCH.endsWith(".")) {
  throw new Error("Pitch must be exactly one sentence ending in a period.");
}
if (PITCH.trim() !== PITCH || PITCH.includes("\n")) {
  throw new Error("Pitch must be a single line with no surrounding whitespace.");
}

// The grader reads /output/entry.txt (honour MAKEFUN_OUTPUT_DIR when set);
// stdout keeps the pitch so local runs stay checkable by eye.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), PITCH, "utf8");

console.log(PITCH);
