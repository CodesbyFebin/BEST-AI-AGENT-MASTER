#!/usr/bin/env node
// Inventory ONLY: no assertions of source authenticity, runnable examples or release qualification.
// To fail when the promised docs system is incomplete: node scripts/verify-gitbook-inventory.mjs --strict
import fs from "node:fs";
import path from "node:path";
const guides=["foundations","models-and-tokens","tool-calling","orchestration-frameworks","memory-and-rag","evaluation-harnesses","security-production","india-deployment"];
const tutorials=["mcp-stdio-setup","mcp-http-server","tool-contract-design","postgres-mcp-project","prompt-injection-hardening","agent-evals-ci","observability-logging","local-model-mcp"];
const expected=[
  "lib/gitbook-docs.ts",
  "app/guides/[slug]/page.tsx",
  "app/tutorials/[slug]/page.tsx",
  ...guides.map((slug,i)=>`content/gitbook/G${i+1}_${slug}.md`),
  ...tutorials.map((slug,i)=>`content/gitbook/T${i+1}_${slug}.md`)
];
const missing=expected.filter(file=>!fs.existsSync(path.join(process.cwd(),file)));
const present=expected.filter(file=>!missing.includes(file));
const issues=[];
if(!missing.length){
  for(const file of expected.filter(x=>x.endsWith(".md"))){
    const body=fs.readFileSync(file,"utf8");
    if(!/\[EV:https?:\/\/[^|\]]+\|[^|\]]+\|\d{4}-\d\d-\d\d\]/.test(body))issues.push(`${file}: no formatted primary-source evidence marker`);
    if(!/^#\s+\S/m.test(body))issues.push(`${file}: missing top-level heading`);
  }
}
const status=missing.length?"NOT_IMPORTED":issues.length?"INVALID_DRAFT":"STRUCTURE_PRESENT_SOURCE_REVIEW_REQUIRED";
console.log(JSON.stringify({status,expected:expected.length,present:present.length,missing,issues,notes:["A structured marker does not prove the underlying source or execution result.","External security, DPDP applicability, metrics and product prices need claim-level review.","No Next.js build, production deployment, indexing or API endpoints are established by this check."]},null,2));
if(process.argv.includes("--strict")&&(missing.length||issues.length))process.exitCode=1;
