# GSC / SEO / AEO / GEO release ledger — 2026-10-24

## Evidence-backed release status

Status: **NOT READY TO CLAIM 100/100 OR CONFIRMED GSC SUBMISSION**.
This repository provides an indexable catalog and publication gates, but source correctness, live crawlability, site ownership, indexing and AI citations require distinct proofs. Submission to Google Search Console is not a ranking guarantee.

### Immediate blocking defect corrected in this PR
`package.json` on main had a missing comma after the freshness script and a duplicate `verify` property. A JSON parser / `npm ci` cannot continue with that manifest. This PR repairs the manifest and restores both editorial and freshness validation.

### Static checks included
- `npm run verify:gsc-release` validates the intended robots sitemap, canonical sitemap generator, evidenced `lastModified`, Next.js redirect wiring, essential pillar paths and script integration.
- Existing `verify:gsc`, `verify:crawl-graph`, `verify:quarantine`, `verify:publication`, `verify:freshness`, `verify:editorial`, build, typecheck, lint and JSON-LD validation remain required.
- This preflight is not a substitute for visiting production URLs; the output explicitly identifies unavailable external evidence.

### Publication queue and content gates
- Uploaded 110-term glossary is a **draft**, not 110 independently verified terms; it contains questionable citation locators, outdated MCP sections and unsupported reviewer/verification attestations. Preserve current noindex/quarantine behavior until term-level evidence review is complete.
- `/glossary` currently redirects to `/glossary-hub` through `data/legacy-redirects.json`, while its source page declares `/glossary` canonical. Resolve with a single editorially approved canonical path before trying to index the new glossary; do not inject it into sitemap in this PR.
- Uploaded G1 Foundations content is under editorial review; do not publish old or fabricated datePublished, product histories, medical/legal compliance, model performance, or publisher-reported statistics without direct evidence.
- Homepage 10K manuscript and proposed TSX are NOT currently one deployed 10K homepage. Keep current Atlas discovery and cost-scenario views until new content passes claim review and layout tests.
- A source URL included in `[EV:...]` markup is not a verified receipt until its locator is checked against an immutable retained source snapshot.

## Search Console submission steps (only after successful production deployment)
1. Verify ownership of `https://www.bestaiagent.in/` in Google Search Console (DNS domain property preferred if available).
2. Request `https://www.bestaiagent.in/robots.txt` and ensure it names exactly the intended sitemap `https://www.bestaiagent.in/sitemap.xml`.
3. Request `/sitemap.xml`, check HTTP 200, XML parse, absolute canonical URLs, no redirects, no 404/5xx, no noindex targets and no unsupported lastmod dates.
4. Sample `/`, `/agents`, `/mcp`, `/compare`, `/india`, one public entity profile and one quarantined profile. Check status, canonical, robots, HTML content and schema.
5. In GSC > Sitemaps submit `sitemap.xml`. Capture time, property, accepted status, and Search Console screenshot/export. This cannot be claimed complete from CI alone.
6. Use URL Inspection for the homepage and a few priority canonical URLs. Request indexing only when policy and site permit. Monitor Page Indexing/duplicate-canonical reports over time.
7. Submit neither draft glossary URLs nor preserved noindex legacy routes until source review and canonical consolidation finish.
8. Measure real Search Console impressions/clicks and reproducible AI-answer citation tests separately; never claim `100/100` as an outcome of word count or citation-unit quantity.

## Evidence required to close the remaining gates
- Successful GitHub Actions CI run on the release commit (Node 22 install, typecheck, lint, build, JSON-LD checks).
- Production deployment ID and URL, plus HTTPS smoke-test report.
- Sitemap/robots canonical audit against production, Search Console property access and submitted-sitemap receipt.
- Independent editorial signoff on new facts and volatile prices, source-claim locator review, plus accessibility/mobile performance checks.
- Versioned rollback procedure and a post-release verification log.

No Google property verification, GSC submission, production deploy or external security review is asserted by this document.
