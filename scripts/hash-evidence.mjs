#!/usr/bin/env node
/** Offline, deterministic evidence snapshot hashing; does not assign 'verified' status. */
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve } from "node:path";
function stable(value) {
  if (Array.isArray(value)) return "["+value.map(stable).join(",")+"]";
  if (value!==null && typeof value==="object") return "{"+Object.keys(value).sort().map(k=>JSON.stringify(k)+":"+stable(value[k])).join(",")+"}";
  return JSON.stringify(value);
}
function usage() {
  console.error("Usage: node scripts/hash-evidence.mjs <snapshot.json> [--verify sha256:<64 lowercase hex>]");
  process.exitCode=2;
}
const [file,flag,expected]=process.argv.slice(2);
if(!file || (flag!==undefined && flag!=="--verify") || (flag==="--verify" && !expected)) usage();
else {
  try {
    const raw=readFileSync(resolve(file),"utf8");
    const record=JSON.parse(raw);
    if (!record || Array.isArray(record) || typeof record!=="object") throw Error("Snapshot must be a JSON object");
    for (const key of ["sourceUrl","retrievedAt"]) if(typeof record[key]!=="string" || !record[key]) throw Error("Missing "+key);
    if (!/^https:\/\//.test(record.sourceUrl) || !Number.isFinite(Date.parse(record.retrievedAt))) throw Error("Invalid source URL or retrieval timestamp");
    if(!Object.hasOwn(record,"facts") || !record.facts || typeof record.facts!=="object" || Array.isArray(record.facts)) throw Error("facts must be an object");
    const digest="sha256:"+createHash("sha256").update(stable({sourceUrl:record.sourceUrl,retrievedAt:record.retrievedAt,facts:record.facts})).digest("hex");
    if(flag==="--verify") {
      if(!/^sha256:[a-f0-9]{64}$/.test(expected)) throw Error("Expected hash must be sha256:<64 lowercase hex>");
      if(digest!==expected) { console.error("MISMATCH expected="+expected+" computed="+digest);process.exitCode=1; }
      else console.log("MATCH "+digest);
    } else console.log(digest);
  } catch(e) { console.error("ERROR "+e.message); process.exitCode=1; }
}
