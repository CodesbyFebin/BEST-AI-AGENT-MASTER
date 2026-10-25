# Superseding canonical decision — 2026-10-25

The site operator explicitly corrected the intended canonical to `https://bestaiagent.in` (apex). Earlier `www` migration guidance in this repository is historical and superseded. `lib/site.ts` defines the current code canonical; do not change it back to www. The current sitemap is a single apex sitemap; sitemap shards remain disabled.

**Operational gates unverified:** Cloudflare www → apex 301 preserving paths and queries; live canonical sampling; current GSC apex/domain property and sitemap submission; IndexNow/Crawler Hints enablement; and cross-host traffic. The uploaded historical counts of 925 indexed and 509 discovered are not equivalent to a fresh authenticated GSC export. Do not infer these operator actions have occurred merely because the source code uses apex.

**Publication doctrine:** Keep impression-bearing routes without unsupported product winners. The old mock SWE-bench, India funding data, pricing tier and glossary hashes must not be promoted as evidence. No license decision has been supplied; do not add MIT by default.
