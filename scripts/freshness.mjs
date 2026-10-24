#!/usr/bin/env node
/**
 * Reports evidence age without treating stale evidence as current.
 * Freshness is NOT source authentication or semantic claim verification.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const lib = ["evidence.ts", "recovery-evidence.ts"].map(name => fs.readFileSync(path.join(root, "lib", name), "utf8")).join("\n");
const authority = JSON.parse(fs.readFileSync(path.join(root, "data/authority-evidence.json"), "utf8"));
const timestamps = [...lib.matchAll(/retrievedAt:\s*"([^"]+)"/g)].map(match => match[1])
  .concat(authority.map(record => record.retrievedAt));
const counts = { fresh: 0, warning: 0, stale: 0, invalid: 0, future: 0 };
const now = Date.now();
for (const value of timestamps) {
  const time = Date.parse(value);
  if (!Number.isFinite(time)) { counts.invalid++; continue; }
  const age = (now - time) / 86400000;
  if (age < -1) counts.future++;
  else if (age < 30) counts.fresh++;
  else if (age <= 90) counts.warning++;
  else counts.stale++;
}
console.log("Evidence freshness (age since recorded retrieval):", JSON.stringify({total: timestamps.length, ...counts}));
if (counts.warning || counts.stale) console.warn("Evidence older than 30 days requires claim-level review; hash validity does not imply freshness.");
if (!timestamps.length || counts.invalid || counts.future) process.exitCode = 1;
