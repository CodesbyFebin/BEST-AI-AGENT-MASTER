// Read-only production host and canonical audit. No DNS/GSC changes.
import { writeFileSync } from "node:fs";
const canonical = "https://www.bestaiagent.in";
const hosts = [canonical, "https://bestaiagent.in"];
const paths = ["/", "/india", "/mcp", "/agents", "/marketplace", "/blog", "/sitemap.xml", "/llms.txt", "/robots.txt"];
const entries = [];
for (const host of hosts) for (const path of paths) {
 const url = host + path;
 try {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
   const res = await fetch(url, { method: "GET", redirect: "manual", signal: controller.signal, headers: { "user-agent": "BestAIAgent-HostAudit/1.0" } });
   const redirectTo = res.headers.get("location");
   const type = res.headers.get("content-type") || "";
   let canonicalTag = null;
   if (type.includes("text/html") && res.ok) {
     const html = (await res.text()).slice(0, 200000);
     canonicalTag = html.match(/<link\\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)/i)?.[1] ?? null;
   } else await res.body?.cancel();
   entries.push({ url, status: res.status, location: redirectTo, canonicalTag, contentType: type });
  } finally { clearTimeout(timeout); }
 } catch (error) { entries.push({ url, error: String(error) }); }
}
const apex = entries.filter(x => x.url.startsWith("https://bestaiagent.in/"));
const conflicts = apex.filter(x => !(x.status >= 300 && x.status < 400 && x.location?.startsWith(canonical)));
const result = { timestamp: new Date().toISOString(), expectedCanonicalHost: canonical, sampledUrls: entries.length, entries, apexHostNotRedirectingToWww: conflicts.map(x => x.url), note: "Sampling is diagnostic only. No authority over DNS, GSC property or Cloudflare configuration." };
const dest = process.argv[2];
if (dest) writeFileSync(dest, JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify({ sampledUrls: entries.length, apexHostConflicts: conflicts.length, findings: conflicts, reportFile: dest ?? null }, null, 2));
if (conflicts.length) process.exitCode = 1;
