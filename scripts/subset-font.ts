/**
 * Scans all source files for non-ASCII characters and produces a subsetted
 * WOFF2 font containing only those glyphs.
 *
 * Uses subset-font (HarfBuzz WASM) — no Python required.
 */

import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join, extname } from "path";
import subsetFont from "subset-font";

const ROOT       = process.cwd();
const SRC_DIR    = join(ROOT, "src");
const FONT_IN    = join(ROOT, "public/fonts/OPPOSans.woff2");
const FONT_OUT   = join(ROOT, "public/fonts/OPPOSans.subset.woff2");
const EXTENSIONS = new Set([".tsx", ".ts", ".css"]);

function collectFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectFiles(full));
    } else if (EXTENSIONS.has(extname(entry.name))) {
      results.push(full);
    }
  }
  return results;
}

const chars = new Set<string>();
for (const file of collectFiles(SRC_DIR)) {
  for (const ch of readFileSync(file, "utf8")) {
    if (ch.codePointAt(0)! > 127) chars.add(ch);
  }
}

const text = [...chars].join("");
console.log(`[subset-font] ${chars.size} unique non-ASCII glyphs found`);

const input = readFileSync(FONT_IN);
subsetFont(input, text, { targetFormat: "woff2" }).then((output) => {
  writeFileSync(FONT_OUT, output);
  console.log(`[subset-font] ✓ ${FONT_OUT}`);
});
