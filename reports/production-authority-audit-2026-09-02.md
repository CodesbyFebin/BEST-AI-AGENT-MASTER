# Production authority audit — 2026-09-02

## Scope and identity

- Canonical repository: `CodesbyFebin/BESTAIAGENT-MASTER`
- Audited base: `main` at `23b48ea391d671efaad770b7d0019d244b8e43e2`
- Linked Vercel project: `projects555/bestaiagent-master`
- Production domain: `https://www.bestaiagent.in`
- The uploaded archive was accepted only after Git blob hashes for representative source files matched GitHub `main`.

This report does not promise rankings or a universal “100/100” score. Organic performance depends on search demand, competition, external signals, crawl/indexing decisions, and ongoing editorial quality. The goal of this change is a measurable, fail-closed publication boundary.

## Material findings

| Finding | Baseline | Correction |
|---|---|---|
| Authority publication gate | 398 authority records declared `index: true`; only four page receipts existed | An authority page is indexable only when every declared receipt exists, belongs to the page, is verified, and has a syntactically valid SHA-256 digest |
| Blog evidence | 18 deep blog pages were indexable without page-level receipts | Blog hub and articles remain reachable but `noindex,follow` and are excluded from sitemap and LLM feeds pending receipts and review |
| Utility content | Events, newsletter and integration pages presented unsupported records, functionality or legal simplifications | Fabricated records and functionality claims removed; affected routes held `noindex,follow` and removed from machine feeds |
| Structured data | Homepage duplicated the global Organization and WebSite graph with different identifiers | Root layout is the single owner of the global graph |
| Sitemap dates | Unrelated URLs inherited one fallback modification date | `lastModified` is emitted only for records with a real page review/publication date |
| Entity images | Every card attempted a live request to Google’s favicon proxy | Local neutral icons are used where present; deterministic initials are the fallback |
| CI parity | `verify:crawl-graph` existed but did not run in GitHub Actions | Crawl-graph and publication-integrity gates now run in CI |

## Verification performed

- Catalog receipts: 69 entity hashes plus four authority hashes recomputed successfully.
- Crawl graph: passed; no held routes entered the sitemap or LLM feeds.
- GSC migration invariants: passed.
- Candidate quarantine: passed; 50 donor pillars and 2,500 donor clusters remain outside runtime publication imports.
- TypeScript: passed.
- ESLint: passed.
- Next.js production build: passed; 2,048 routes generated.
- Rendered JSON-LD validation: 2,032 HTML pages scanned, 3,982 blocks parsed, zero syntax or required-field errors.
- Rendered spot checks: one canonical per tested page; one Organization graph per tested page; verified authority pages index; unsupported authority/blog/utility pages noindex; sitemap excludes held routes.

## Publication inventory after this change

- Entity publication remains governed by the existing primary-evidence predicate.
- Comparison publication remains governed by both-side public entity resolution.
- Authority publication is newly governed by page receipt completeness.
- Generated candidates remain quarantined and are not imported by the runtime.
- Draft pages are preserved for editorial work, but reachability is not represented as publication approval.

## Remaining work before broader organic expansion

1. Create claim-level receipts and human review records for high-opportunity authority and blog pages, then promote individually.
2. Replace generic same-day review dates with actual per-page review events as pages are reviewed.
3. Add an author/editor entity model before emitting article author markup or editorial bylines.
4. Validate Core Web Vitals and accessibility with field data or repeatable browser lab runs; a successful static build is not a performance score.
5. Reconcile the 2,550-row candidate inventory pillar by pillar; do not bulk-index templates.
6. Monitor Search Console coverage, canonical selection, crawl stats and query/page cohorts after release.

## Non-negotiable release rule

Do not merge or describe this change as production-complete unless the exact proposed GitHub commit passes repository CI. After merge, verify that Vercel production reports `READY`, serves that exact commit, and that the custom domain exposes the expected robots, canonical, sitemap and structured-data state.
