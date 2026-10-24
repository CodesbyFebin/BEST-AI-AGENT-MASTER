import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { createRequire } from "node:module";
const { load, JSON_SCHEMA } = createRequire(import.meta.url)("js-yaml");

export const DIRECTORIES = {agents:"agent",bots:"bot",models:"model",skills:"skill","mcp-servers":"mcp-server",frameworks:"framework"};
const kinds = new Set(Object.values(DIRECTORIES));
const states = new Set(["pending","under-review","approved","rejected","quarantined"]);
const deployments = new Set(["local","cloud","both"]);
const prices = new Set(["free","freemium","paid","open-source","oss+paid"]);
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const shaPattern = /^[a-f0-9]{64}$/;
const isString = (s,min,max) => typeof s==="string" && s.trim().length>=min && s.length<=max;
const urlCheck = (s) => { try { const u=new URL(s); return u.protocol==="https:" && !!u.hostname && !u.username && !u.password; } catch { return false; } };
const listCheck = (a,max) => Array.isArray(a) && a.length<=max && a.every(x=>isString(x,1,200));
export function validate(data, directory, filename) {
 const err=[];
 if(!data || typeof data!=="object" || Array.isArray(data)) return ["expected a YAML mapping"];
 for(const k of ["id","slug","type","name","version","tagline","description","repository","deployment","license","createdAt","updatedAt","status"]) if(!isString(data[k],1,2000)) err.push("missing/invalid "+k);
 if(!kinds.has(data.type) || DIRECTORIES[directory]!==data.type) err.push("type mismatches directory");
 if(!slugPattern.test(data.slug||"") || data.id!==data.slug || filename!==data.slug+".yaml") err.push("id, slug and filename must match kebab-case");
 if(!isString(data.name,1,80)||!isString(data.tagline,1,120)||!isString(data.description,1,2000)) err.push("name/tagline/description length");
 if(!/^[0-9]+\.[0-9]+\.[0-9]+(?:-[a-zA-Z0-9.-]+)?$/.test(data.version||"")) err.push("version must be semver");
 if(!urlCheck(data.repository)||!/^https:\/\/github\.com\/[\w-]+\/[\w.-]+\/?$/.test(data.repository||"")) err.push("repository must be a public GitHub URL");
 for(const field of ["homepage","documentation","demo"]) if(data[field]!==undefined && !urlCheck(data[field])) err.push("invalid "+field+" URL");
 for(const field of ["categories","tags","capabilities","integrations"]) if(!listCheck(data[field],field==="tags"?10:30)) err.push("invalid "+field+" list");
 if(!deployments.has(data.deployment)) err.push("invalid deployment");
 if(!data.pricing || !prices.has(data.pricing.model)) err.push("invalid pricing");
 if(!states.has(data.status)) err.push("invalid status");
 if(!data.author||!isString(data.author.name,1,100)||!/^[-a-zA-Z0-9]{1,39}$/.test(data.author.github||"")) err.push("invalid author");
 for(const field of ["createdAt","updatedAt"]) if(!Number.isFinite(Date.parse(data[field]))) err.push("invalid "+field);
 if(data.evidence!==undefined) {
  if(!data.evidence || typeof data.evidence!=="object") err.push("invalid evidence");
  else {
    if(!urlCheck(data.evidence.sourceUrl)) err.push("invalid evidence.sourceUrl");
    const hash=data.evidence.sha256||"";
    if(hash && !shaPattern.test(hash)) err.push("invalid evidence.sha256");
    if(hash && !Number.isFinite(Date.parse(data.evidence.retrievedAt))) err.push("hash requires valid retrievedAt");
    if(data.evidence.retrievedAt && !Number.isFinite(Date.parse(data.evidence.retrievedAt))) err.push("invalid evidence.retrievedAt");
  }
 }
 if(data.status==="approved" && !(data.evidence && shaPattern.test(data.evidence.sha256||""))) err.push("approved requires reviewed evidence; hash format alone is insufficient");
 return err;
}
export function readAll(root=join(process.cwd(),"submissions")) {
 const entries=[], errors=[], seen=new Set();
 for(const [dir,type] of Object.entries(DIRECTORIES)) {
  let files=[];try{files=readdirSync(join(root,dir)).filter(n=>n.endsWith(".yaml"));}catch(e){if(e.code!=="ENOENT") throw e;}
  for(const file of files) {
   const path=join(root,dir,file);
   if(statSync(path).size>65536){errors.push(path+": file over 64KB");continue;}
   try {
    const record=load(readFileSync(path,"utf8"),{schema:JSON_SCHEMA});
    const errs=validate(record,dir,file);
    const unique=type+":"+record?.slug;
    if(seen.has(unique)) errs.push("duplicate type/slug");seen.add(unique);
    for(const e of errs) errors.push(path+": "+e);
    if(!errs.length) entries.push(record);
   }catch(e){errors.push(path+": "+e.message);}
  }
 }
 return {entries,errors};
}
if(process.argv[1] && import.meta.url===new URL("file://"+process.argv[1]).href) {
 const result=readAll();
 console.log(JSON.stringify({records:result.entries.length,errors:result.errors},null,2));
 if(result.errors.length) process.exitCode=1;
}
