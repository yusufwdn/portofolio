// Fails when a language file's keys drift from messages/en.json. Run in CI
// (and by hand) so a new sentence cannot ship in English only.
import { readdirSync, readFileSync } from "node:fs";

const dir = new URL("../messages/", import.meta.url);

const flatten = (obj, prefix = "") =>
  Object.entries(obj).flatMap(([key, value]) =>
    value && typeof value === "object" && !Array.isArray(value)
      ? flatten(value, `${prefix}${key}.`)
      : [`${prefix}${key}`],
  );

const load = (file) => new Set(flatten(JSON.parse(readFileSync(new URL(file, dir), "utf8"))));

const base = load("en.json");
let failed = false;

for (const file of readdirSync(dir).filter((f) => f.endsWith(".json") && f !== "en.json")) {
  const keys = load(file);
  const missing = [...base].filter((k) => !keys.has(k));
  const extra = [...keys].filter((k) => !base.has(k));
  if (missing.length || extra.length) {
    failed = true;
    console.error(`${file}: ${missing.length} missing, ${extra.length} extra`);
    missing.forEach((k) => console.error(`  - ${k}`));
    extra.forEach((k) => console.error(`  + ${k}`));
  }
}

if (failed) process.exit(1);
console.log("messages: all languages match en.json");
