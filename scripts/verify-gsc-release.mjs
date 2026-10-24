#!/usr/bin/env node
// Static preflight, NOT confirmation of Google indexing or production deployment.
import fs from "node:fs";
const errors = [], warnings=[];
const read=p=>fs.readFileSync(p,"utf8");
const assert=(ok,msg)=>{if(!ok)errors.push(msg)};
const redirects=JSON.parse(read("data/legacy-redirects.json"));
const packageData=JSON.parse(read("package.json"));
const sitemap=read("app/sitemap.ts");
const robots=read("app/robots.ts");
const next=read("next.config.ts");
const glossary=read("app/glossary/page.tsx");
const paths=["/","/agents","/models","/frameworks","/compare","/mcp","/india","/tools","/trust"];
assert(packageData.scripts.verify.includes("verify:gsc-release"),"GSC preflight absent from verify aggregate");
assert(robots.includes("sitemap.xml"),"robots.ts missing canonical sitemap");
assert(sitemap.includes("new Set<string>"),"sitemap deduplication absent");
assert(sitemap.includes("latestEvidenceDate"),"sitemap lastmod is not evidence-derived");
assert(next.includes("legacyRedirects"),"redirect mapping missing in Next config");
assert(!Object.keys(redirects).some(x=>x===redirects[x]),"redirect self-loop");
for(const p of paths) assert(sitemap.includes('"'+p+'"'),"canonical pillar absent from sitemap: "+p);
const redir=redirects["/glossary"];
if(redir){warnings.push("/glossary redirects to "+redir+"; do not advertise /glossary as a separately indexable canonical until route migration is performed");}
if(/Verified Terms|Last verified: 2026-10-24/.test(glossary)){warnings.push("Glossary may contain unsupported publication-status language; human review required");}
// Strip comments before checking config syntax: the old regex incorrectly matched
// "no sitemap-alias rewrites here" in a comment, then the unrelated headers() return.
const executableConfig = next.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
assert(!/async\s+rewrites\s*\(/.test(executableConfig), "unexpected Next.js rewrites() in configuration; review canonical sitemap aliases");
const output={status:errors.length?"FAIL":"STATIC_PREFLIGHT_PASS",checks:["package parse","verification pipeline","canonical sitemap reference","sitemap dedup","evidence-derived lastmod","Next redirect mapping","pillar paths"],errors,warnings,notVerified:["HTTP status and redirect destinations on deployed domain","actual generated sitemap membership and noindex consistency","Search Console property ownership and sitemap submission","GSC indexed/coverage status","production release, Core Web Vitals, and AI citation rate"]};
console.log(JSON.stringify(output,null,2));if(errors.length)process.exitCode=1;
