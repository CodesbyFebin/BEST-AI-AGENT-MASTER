# Route tree reconciliation — 2026-10-25

This document reconciles the operator-provided long-form site tree against the main source tree inspected on 2026-10-25. It is **not** a live HTTP crawl, content-depth audit, or authenticated Google Search Console measurement.

## Source-of-truth hierarchy

1. `lib/site.ts`: code canonical `https://bestaiagent.in` (apex).
2. `app/`: Next.js route templates; dynamic route existence does not prove a particular slug is generated.
3. `lib/catalog.ts`, publication gates, source receipts: determine approved entities and comparisons.
4. `app/sitemap.ts`: single evidence-gated XML sitemap. No split sitemap migration is activated.
5. Dated network audits and authenticated GSC data: establish observed production HTTP/indexing, not build files or drafted route trees.

## Existing route templates confirmed in source

```text
app/
├── page.tsx                                homepage
├── [slug]/page.tsx                         authority pages (generated subset)
├── agents/{page.tsx,[slug]/page.tsx}       agent directory + profiles
├── models/{page.tsx,[slug]/page.tsx}       model directory + profiles
├── frameworks/{page.tsx,[slug]/page.tsx}   frameworks
├── providers/{page.tsx,[slug]/page.tsx}    providers
├── mcp/page.tsx
├── mcp/servers/{page.tsx,[slug]/page.tsx}
├── tools/{page.tsx,[slug]/page.tsx}
├── coding-agents/{page.tsx,cli,ide,local,open-source,self-hosted}
├── best-ai-agents/{page.tsx,coding/page.tsx}
├── compare/{page.tsx,[slug]/page.tsx,research,archive}
├── alternatives/page.tsx
├── marketplace/{page.tsx,[type]/[slug]/page.tsx}
├── submit/page.tsx
├── blog/{page.tsx,[...slug]/page.tsx}
├── glossary/{page.tsx,[term]/page.tsx}
├── categories/{page.tsx,[slug]/page.tsx}
├── trust/{page.tsx,[slug]/page.tsx}
├── tutorials/page.tsx
├── guides/page.tsx
├── research/{page.tsx,[slug]/page.tsx}
├── india/page.tsx
├── india/ecosystem/_skeleton/page.tsx       skeleton, not verified shipped ecosystem category
├── pricing/page.tsx
├── search/page.tsx
├── archive/{page.tsx,agents/page.tsx}
├── learning/page.tsx
├── events/page.tsx
├── newsletter/page.tsx
├── integrations/page.tsx
├── changelog/page.tsx
├── press/page.tsx
├── agents.json/route.ts
├── models.json/route.ts
├── frameworks.json/route.ts
├── providers.json/route.ts
├── catalog.json/route.ts
├── llms.txt/route.ts
├── llms-full.txt/route.ts
├── api/search/route.ts                     static-export JSON search
├── api/catalog/route.ts
├── api/health/route.ts
├── robots.ts
└── sitemap.ts
```

Static publication must be confirmed through the production build's `out/` inventory and route-specific output; dynamic templates are **not** proof of hundreds of live profiles.

## Discrepancies and unverified claims in uploaded tree

| Uploaded assertion | Correct interpretation |
| --- | --- |
| `https://www.bestaiagent.in` canonical and apex→www 308 | **Superseded**: apex `https://bestaiagent.in` in source, intended Cloudflare www→apex 301 externally unverified |
| `www` sitemap/robots/llms links | Use apex for all current generated canonical links |
| 57 templates and ~1,055 indexable URLs | Estimate in draft; no direct build-output enumeration supports it here |
| `925 indexed`, `509 discovered`, `0 crawled-not-indexed` | Historical operator-provided GSC observations, not a current verified API query |
| Exact source-line lengths for routes | Not validated from current SHA; they must be computed from current files |
| `/india/ecosystem` and named India subroutes | Only an `_skeleton` route file observed; not evidence of published subroutes |
| `/glossary/[term]` entries with lock icons | Template exists; publication/indexability must be checked per term |
| `/blog/[...slug]` deep article titles | Template exists, content inventory and approved generated paths must be audited separately |
| Legacy sitemap shards and compatibility rewrites | Old inventory document is historical; current single sitemap is authoritative; no guarantee arbitrary redirects work on GitHub Pages |
| 301/410 for hundreds of URLs | **Planning states only**. Cloudflare redirect coverage and 410 response support require external edge implementation, reviewed mapping and real HTTP checks |
| All policy pages marked newly shipped | Validate actual route presence and build output; missing templates cannot be inferred from draft |
| `/authors/priya-iyer` and other names | No such source route was confirmed in route-template listing; never invent public author profiles |
| `/api/search/` | Static JSON search artifact; not a runtime database/search service |
| `/llms.txt` and `/llms-full.txt` | Built from `app/llms*.txt/route.ts`, not duplicate static public files |
| `/agentic-marketplace` | Separate companion GitHub repository only; no confirmed payment/runtime integration |

## Correct route maturity labels

- **TEMPLATE:** A Next.js page or route handler exists in source.
- **GENERATED:** A specific static output path exists in `out/` after a successful build.
- **PUBLIC:** Live HTTP request returns the expected response and content.
- **INDEXABLE:** Valid canonical, published sitemap eligibility and appropriate robots/meta policy are confirmed.
- **INDEXED:** Dated, authenticated search-engine evidence for the exact property and URL.
- **PLANNED:** Draft URL or content request without corresponding verified generated output.
- **QUARANTINED:** Intentionally restricted/unreviewed or noindex content.

These states are cumulative only when separately verified. A source file should never be labeled INDEXED merely because its route template exists.

## Reproduction

```bash
gh repo clone CodesbyFebin/BEST-AI-AGENT-MASTER
cd BEST-AI-AGENT-MASTER
git rev-parse HEAD
find app -type f \( -name page.tsx -o -name route.ts \) | sort
npm ci
GITHUB_PAGES_STATIC=1 npm run build
find out -type f | sort > /tmp/bestaiagent-static-output-paths.txt
bash scripts/verify-apex-redirect.sh
npm run audit:live-hosts -- host-audit.json
```

The build verifies exported artifacts but not Cloudflare or GSC. The redirect check should be run only to observe real HTTP behavior; do not claim it passed until output is captured.

## Release gates

Before expanding the glossary, authority slugs, and legacy long-tail URLs, verify Cloudflare www→apex permanent redirects preserving paths/query strings, submit the apex sitemap in GSC on the verified property, triage the historical URLs with actual coverage exports, and review every proposed MERGE/PRUNE mapping. Optional IndexNow/Crawler Hints applies to participating engines and does not imply Google indexing.

**No claims of 100/100 performance, new indexed pages, live third-party verification, or complete migration are supported by this inventory alone.**
