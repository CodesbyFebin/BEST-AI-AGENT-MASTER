# Host consolidation / GSC recovery — evidence reconciliation (2026-10-25)

## Decision record
Current source-of-truth for the deployed GitHub Pages app: `lib/site.ts` sets **https://www.bestaiagent.in**. Sitemap, canonical tags and machine-readable exports should remain aligned to this host until a deliberate DNS and editorial migration is approved.

Three newly supplied draft plans conflict with this: an older Vercel/Next 15 five-file branding draft, and two Cloudflare Pages plans that propose the *opposite* canonical host (`https://bestaiagent.in`). These are proposals, **not deployed configuration**. Do not copy them verbatim: doing so could create dueling canonicals, outdated badges, fabricated "2,100+ verified" claims or contradictory redirects.

## Confirmed discrepancy
Public search fetch on 2026-10-25 retrieved different site copy from `https://bestaiagent.in/` and `https://www.bestaiagent.in/`. The first displayed older ranking-oriented copy; the latter displayed the evidence-first Atlas landing page (69 verified entities, 74 receipts). These are externally observed snapshots, not a conclusive HTTP redirect trace. The new `scripts/audit-live-hosts.mjs` inspects HTTP status, Location and link rel=canonical on a fixed set of public paths. This audit is **read-only**, must be run from a network-enabled test runner, and exits nonzero when sampled apex URLs are not redirected to `www`.

Run:
```bash
node scripts/audit-live-hosts.mjs host-audit.json
```

## Search Console source dates and uncertainty
The uploaded plans cite **509 discovered/not indexed, 0 crawled/not indexed, and 925 indexed**. Treat these as historical user-provided figures until the dated Google Search Console property export is independently checked. The checked-in `data/gsc-migration-policy.json` is based on an older 2026-08-20 observation set and has materially different buckets, so it cannot verify the October numbers. The uploaded plans assert host fragmentation is *the* root cause; it is a plausible hypothesis, not yet proven causation.

The plans also propose numerical startup/funding claims (e.g. 124 startups, $436M) without retained first-party data. Do **not** publish those values or derived Dataset schema until primary evidence passes the existing publication gate.

## Safe sequence
1. Preserve the GitHub Pages `www` canonical until domain owner approves any change. Verify 50 representative URLs, status/Location and exact target (including paths and query strings) from both hosts; store dated results.
2. Check actual DNS, SSL and Pages custom-domain settings. Implement redirect-capable edge rules **outside** GitHub Pages for apex → www, if host consolidation requires it. Pages `next.config.ts` redirects do not execute under static export.
3. Export dated GSC Page Indexing and Performance datasets, compare across both host properties, and triage every discovered URL into KEEP / MERGE / PRUNE or NEEDS_EVIDENCE with documented rationale. Do not bulk-remove pages on zero clicks alone.
4. Validate sitemap membership against `noindex`, canonical and actual published URL; preserve evidence-dated lastmod only. Avoid synthetic build timestamps. Any sitemap sharding must retain an accurate index.
5. Test six representative page templates using PageSpeed Insights and real-user Core Web Vitals where available. Laboratory Lighthouse runs **cannot measure field INP p75**.
6. Add answer-first source-backed content on evidence-ready pillar pages only. Schema type and stats must match actual on-page information. Avoid guaranteed AI citation uplift claims.
7. Verify each release through CI, GitHub Pages deployment, live crawl, GSC submissions and follow-up coverage exports. An unchanged GSC bucket after deployment does not establish cause.

## Not completed by this PR
Cloudflare/DNS setting changes, an apex HTTP redirect, legacy 84-path HTTP 301/308 redirect parity, live GSC API submission, sitemap shards, content deepening, field INP, and any 100/100 SEO/GEO certification. These require separate actual evidence and review.
