# BestAIAgent.in — Trust & Crawl Cleanup (Phase 1) and Topic-Cluster Authority Build (Phase 2)

**Date:** 2026-09-01
**Status:** Approved
**Scope:** Phase 1 + Phase 2 in sequence, gated by measurable evidence.

---

## 1. Doctrine

The site's optimization hierarchy is:

```
TRUST
> EVIDENCE
> ENTITY CORRECTNESS
> CRAWL QUALITY
> SEARCH INTENT
> CONTENT SCALE
```

Page count is never a success metric.

A claim is published only when:

1. There is a primary-source evidence receipt with a SHA-256 hash of the actual retrieved content, OR
2. The field is explicitly marked `UNKNOWN` with a verified reason for remaining unknown.

Unknown stays unknown. Conservative uncertainty is a feature.

---

## 2. Phase 1 — Trust & Crawl Cleanup

### 2.1 Goals

- Remove the 715 legacy agent entries from the main `/agents` crawl surface.
- Split `/compare/` so only the 10 evidence-ready comparisons are on the indexable hub.
- Strip every unsupported quantitative claim from `/press` and replace with live registry counts.
- Mark changelog entries containing retired scoring/inventory claims with a global historical disclosure.
- Establish a single source-of-truth predicate `isPublicIndexableEntity` and reuse it everywhere.
- Ensure HTML, sitemap, catalog JSON, per-type JSON, and llms.txt all derive from the same predicate.

### 2.2 Public route map after Phase 1

```
/agents/                                verified public agents only                  [indexable]
/agents/[verified-slug]/                verified entity detail                        [indexable]
/agents/[legacy-slug]/                  preserved legacy entity detail                [noindex,follow, sitemap excluded]
/archive/                               archive hub landing                            [noindex,follow]
/archive/agents/                        legacy/unverified agent inventory             [noindex,follow]
/catalog/                               verified public cross-entity catalog          [indexable]
/compare/                               evidence-ready comparisons only (~10)         [indexable]
/compare/[evidence-slug]/               evidence-ready comparison detail              [indexable]
/compare/research/                      active research hub                           [noindex,follow]
/compare/research/[slug]/               active research detail                        [noindex,follow]
/compare/archive/                       preserved legacy comparison hub               [noindex,follow]
/compare/archive/[slug]/                preserved legacy comparison detail            [noindex,follow]
/press                                  dynamic verified counts only                  [indexable]
/changelog                              historical entries with disclosure            [indexable]
```

No new detail URLs are created under `/archive/agents/[slug]/`. The existing `/agents/[legacy-slug]/` URLs are reused so that backlink equity is preserved.

### 2.3 Legacy URL disposition

Every legacy URL in the current build is classified into one of:

```
KEEP_INDEXED          — passes publication gate, included as-is
NOINDEX_PRESERVE      — preserved at 200, robots=noindex,follow, sitemap excluded
301_VERIFIED_REPLACEMENT — redirect to a verified canonical replacement
410_INVALID_OR_REMOVED — gone
```

A `301` is allowed **only** when an intent-equivalent verified destination exists. Mass-redirects to `/agents/`, `/catalog/`, or `/` are forbidden.

### 2.4 Legacy classification rules

Classification uses only:

1. The entity's **current structured classification** if it already maps to a primary entity type in `lib/catalog-types.ts` (Agent, Model, Framework, Provider, MCPServer) with a verified identity receipt.
2. The **verified evidence classification** if the entity has an evidence receipt that pins its primary type.
3. Otherwise → **NOINDEX_PRESERVE**.

There is no heuristic classifier. No summary-text inference, no domain-based inference, no category-based inference.

Allowed disposition labels applied to each preserved legacy entry:

```
VERIFIED_AGENT
VERIFIED_MODEL
VERIFIED_FRAMEWORK
VERIFIED_PROVIDER
VERIFIED_MCP
LEGACY_UNVERIFIED
ARCHIVE_NON_CORE        — only assigned when explicit non-core identity exists (e.g. record is a Tool/Dataset, not a primary entity)
```

`ARCHIVE_NON_CORE` is **never** inferred from text. It is assigned only when the existing structured fields explicitly mark the entry as a non-primary-type supporting entity, or when an evidence receipt declares so. If classification is uncertain, the entry is `LEGACY_UNVERIFIED` and stays `noindex,follow` at its existing URL.

### 2.5 Robots policy

Default for preserved legacy pages:

```
<meta name="robots" content="noindex,follow">
```

`nofollow` is used only when:

- The page contains untrusted or generated outbound-link surfaces, OR
- Another documented reason exists and is recorded in `data/legacy-redirects.json`.

The default is `noindex,follow` because historical pages should still allow link discovery for the verified graph they may belong to, while being excluded from the index.

### 2.6 Single publication predicate

Two functions, defined once in `lib/catalog.ts` and reused everywhere:

```ts
export function isPublicIndexableEntity(entity: Entity): boolean { ... }
export function isPublicIndexableComparison(comparison: Comparison): boolean { ... }
```

All of the following must call these predicates and only these predicates:

- `app/page.tsx` (homepage counts and featured lists)
- `app/agents/page.tsx`, `app/agents/[slug]/page.tsx`
- `app/compare/page.tsx`, `app/compare/[slug]/page.tsx`
- `app/catalog/page.tsx` if it exists, otherwise the `/catalog.json` generator
- `app/sitemap.ts` and the per-segment XML generators
- `app/llms.txt/route.ts` and `app/llms-full.txt/route.ts`
- `/api/catalog`, `/api/search`, `/api/entity/[id]`
- `/agents.json`, `/models.json`, `/frameworks.json`, `/providers.json`, `/mcp.json`

The invariant is:

```
HTML public registry
  == sitemap public registry
  == catalog JSON public registry
  == agents/models/frameworks/providers/MCP JSON exports
  == llms public discovery set
```

Drift in any direction fails CI.

### 2.7 Source-of-truth counts

A single provider in `lib/catalog.ts`:

```ts
export function getPublicCatalogStats(): {
  entities: number;
  agents: number;
  models: number;
  frameworks: number;
  providers: number;
  mcpServers: number;
  evidenceReceipts: number;
  comparisons: number;
}
```

Consumers (must call this, never hardcode):

- Homepage hero metric strip
- `/press` four-stat grid
- `/methodology` overview
- `/api-docs` examples
- `llms.txt` header
- `llms-full.txt` header

### 2.8 Press page

The four-stat grid is kept but every value is generated dynamically:

```
Verified Public Entities    ← publicEntities.length
Verified Agent Profiles     ← count where entityType === "agent" && isPublicIndexableEntity
Evidence-Ready Comparisons  ← publicComparisons.length
Verified Evidence Receipts  ← count of evidence receipts with status === "verified"
```

Removed (unless independently supported by current analytics):

- `50K+ monthly readers`
- `150+ pages`
- `69 agent profiles` (when it does not match the live agent count)
- `largest / leading / most trusted`
- Any quantitative claim not derivable from `getPublicCatalogStats()` or analytics evidence

If analytics evidence exists and supports an audience claim, it is included with citation. Otherwise the field is omitted.

### 2.9 Changelog

A single global disclosure is added at the top of `/changelog`:

> Historical release notes may reference inventory, scoring, or publication systems that were later retired or re-verified under BestAIAgent.in's current evidence-first methodology. Current product claims are governed by the live methodology and public evidence registry.

Individual entries are not silently rewritten. Additional per-entry annotations are added only where an old claim could reasonably be mistaken for a current capability.

### 2.10 Archive architecture

- `/archive/` is a noindex hub page with brief explanation and links to:
  - `/archive/agents/`
  - `/compare/archive/`
  - `/compare/research/`
- `/archive/agents/` lists the legacy inventory as a noindex discovery index.
- The existing `/agents/[legacy-slug]/` URLs are reused. No new `/archive/agents/[slug]/` detail URLs are created unless a legacy entity has no current detail page — that case is recorded in `data/legacy-redirects.json` with disposition `410_INVALID_OR_REMOVED` and a `410` is implemented only if the URL has no inbound equity.

### 2.11 Phase 1 release gates (must pass before declaring done)

```
G0  SOURCE FREEZE       — exact commit recorded.
G1  BUILD               — production build succeeds.
G2  TYPECHECK/LINT      — zero blocking diagnostics.
G3  TESTS               — all mandatory tests green, including new assertions below.
G4  PUBLICATION GATE    — /agents and /compare contain only public-indexable entries.
G5  SEO                 — canonicals, titles, descriptions, H1, robots, sitemaps clean.
G6  EVIDENCE            — no unsupported claims are published, including first-party claims.
G7  LEGACY              — legacy crawl bloat contained, no legacy URL in any sitemap.
G8  COMPARISON          — incomplete comparisons are noindex and excluded from /compare/.
G9  MACHINE DATA        — HTML/API/JSON/llms outputs are consistent.
G10 PERFORMANCE         — measured; no regression.
G11 ACCESSIBILITY       — no regression.
G12 SECURITY            — no regression.
G13 LIVE SMOKE          — production URLs verified.
```

### 2.12 New automated tests

Added to `scripts/verify-catalog.mjs` and a new `scripts/verify-crawl-graph.mjs`:

1. `canonicalIndexableRegistry === completeSitemapUrlSet` — fail on difference either way.
2. No URL with `robots: noindex` in any sitemap segment.
3. No redirect URL in any sitemap.
4. No 404 URL in any sitemap.
5. No duplicate canonical across all routes.
6. No non-public legacy `/agents/[slug]/` URL in `sitemap-agents.xml`.
7. No non-public `/compare/[slug]/` URL in `sitemap-comparisons.xml`.
8. `/agents/` HTML body contains no anchor link to a legacy slug (only an "archive" link to `/archive/agents/`).
9. `/compare/` HTML body contains no anchor link to a non-public comparison slug.
10. Every `/agents/[legacy-slug]/` returns 200, has `<meta name="robots" content="noindex,follow">`, and is not in any sitemap.
11. `/press` HTML body does not contain the strings `50K+`, `150+ pages`, `69 agent profiles` (unless wrapped in a verified historical disclosure with current numbers in the same paragraph).
12. `publicEntities.length` on the live homepage equals the count shown on `/press` equals the count exposed in `/catalog.json` equals the sum of `agents.json + models.json + frameworks.json + providers.json + mcp.json`.
13. `llms.txt` and `llms-full.txt` contain zero references to noindex routes.
14. `getPublicCatalogStats()` is called by every consumer (static check via grep).
15. Every preserved legacy URL appears in `/archive/agents/` (the noindex discovery index).
16. No mass redirect from a legacy entity URL to `/agents/`, `/catalog/`, or `/`.

### 2.13 Phase 1 deliverables at completion

1. Exact release commit SHA.
2. Route inventory (before and after counts).
3. Indexed route count.
4. Noindex route count.
5. Redirected route count.
6. Legacy route migration map (every preserved legacy URL → its disposition).
7. Public entity counts by type.
8. Comparison inventory (evidence-ready vs research vs archive).
9. Metadata audit (canonical, title, description, H1, robots for each).
10. Sitemap audit.
11. Internal-link audit (no legacy link from public hub pages).
12. Evidence audit.
13. Self-claim audit.
14. `llms.txt` and `llms-full.txt` audit.
15. Build, typecheck, lint, test, CI results.
16. Live smoke results.

---

## 3. Phase 2 — Topic-Cluster Authority Build

Phase 2 begins only after Phase 1's G13 (live smoke) passes and the predicates are stable.

### 3.1 Priority order

```
P1   Homepage search-intent/entity hierarchy cleanup
P2   /best-ai-agents/                    authority hub
P3   /best-ai-agents/coding/             coding authority pillar
P4   /coding-agents/                     coding cluster root
P5   /coding-agents/open-source/         open-source coding sub-cluster
P6   /coding-agents/cli/                 CLI coding sub-cluster
P7   /coding-agents/ide/                 IDE coding sub-cluster
P8   /coding-agents/local/               local coding sub-cluster
P9   /coding-agents/self-hosted/         self-hosted coding sub-cluster
P10  /coding-agents/autonomous/          autonomous coding sub-cluster (only if evidence supports)
P11  Supporting coding-agent guides
```

Routes are not mass-generated. Each route must clear the same editorial/publication gate used for entities: verified identity, substantive unique content, non-duplicative copy, useful to a real query, internal-link integration, editorial review.

### 3.2 Homepage changes (P1)

H1 is changed to:

```
Find and Compare AI Agents Backed by Evidence
```

Supporting line:

```
Discover coding, research, automation, voice and business AI agents using verified primary-source evidence, transparent unknowns and dated comparisons.
```

The site does not use an unsupported universal "best" claim in the H1 merely because the domain contains "best".

The hero's semantic hierarchy is restructured to put workflows before models/frameworks/MCP, in this order:

```
Best AI Agents (Coding · Research · Automation · Voice · Sales · Customer Support · Business)
Featured Verified Agents
Compare Agents
India / Indic AI
Agent Frameworks
Models
MCP Infrastructure
Research / Methodology
Machine-Readable Data
FAQ
Footer entity graph
```

### 3.3 Coding cluster content contract

Every coding-cluster page contains:

- unique H1
- direct answer paragraph
- entity table of verified coding agents with `evidenceStatus`, `license`, `deployment`, `pricing status`
- "Best fit for" matrix (no fabricated winner — if no winner can be established, the page says so)
- "Evidence available" section linking to per-entity evidence
- "Last verified" date
- Limitations / unknowns section
- Related agents, comparisons, guides
- Methodology and evidence links
- Breadcrumb

### 3.4 Comparisons expansion (after cluster scaffold)

Each new comparison must have field-level evidence on both sides. The current public list is small; comparison expansion is paced so that quality does not regress.

### 3.5 Internal-link graph

After the cluster scaffold:

- Agent pages link to relevant workflow pillar and at least one cluster sub-page.
- Cluster pages link to all member agent pages and at least one comparison.
- Comparisons link to both entity pages, the cluster pillar, and methodology.
- Guides link to entities and clusters.

No random sitewide related-link lists.

### 3.6 Phase 2 release gates

Same gates as Phase 1, plus:

- Each new cluster route clears G4 (publication gate).
- No new thin/duplicate content.
- Cluster-level internal-link audit passes.
- Cluster-level Search Console measurement plan documented (even if not yet measurable).

### 3.7 Phase 2 deliverables at completion

Same list as Phase 1, plus:

- Topic-cluster route map.
- Cluster-level content audit.
- Cluster-level internal-link audit.
- Cluster-level evidence audit.

---

## 4. Out of scope (separate specs)

- Reproducible research reports (`/research/coding-agent-benchmark/`, etc.) — separate spec, requires raw inputs, hardware/software versions, scripts, and outputs.
- Per-entity AEO schema expansion beyond the existing JSON-LD.
- New entity onboarding beyond the current verified set.
- Internationalization beyond the existing `en-IN` declaration.
- Public API authentication / rate-limiting hardening (only documented minimums apply for now).
- Replacing the heuristic-free classification with one — this spec rejects that approach by design.

---

## 5. Definition of done for the combined Phase 1 + Phase 2 effort

10/10 is claimed **only** if every mandatory gate is evidenced. If any required gate is not proven, the agent reports the exact score, the failing gates, and the remaining blockers instead of declaring completion.

The final deliverable includes:

1. Exact commit SHA.
2. Changed files list.
3. Before/after crawl inventory.
4. Public entity counts.
5. Sitemap counts.
6. Legacy disposition counts.
7. Comparison counts.
8. Unsupported claims removed.
9. Topic-cluster routes added.
10. Build, type, lint, test results.
11. Live smoke results.
12. Remaining blockers.
13. Final evidence-backed score (not 10/10 unless every gate is evidenced).
