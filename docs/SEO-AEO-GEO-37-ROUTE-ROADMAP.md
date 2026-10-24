# SEO · AEO · GEO: 37-route editorial implementation backlog

Based on the four-repository archived master source tree and the publisher's explicit route list (2026-10-24). **This is not proof of rendered-page word counts, indexing, ranking or 100/100 scores.** Google does not prescribe a preferred word count.

## Editorial constraints

- Expand a guide to 1,500+ words only where genuinely useful; never pad directory indexes, legal policies, contact pages, machine-readable XML or API references.
- For every substantive answer: a concise direct answer, scope, evidence-backed comparisons, reproducible workflow, limitations, user-focused FAQs, genuinely useful related links, verified editor/review time.
- Follow existing evidence/publication rules. `verified` identity is not evidence of benchmarks, pricing, compliance, or MCP execution. Preserve `noindex` until gate requirements are fulfilled.
- No fictional UGC, testimonials, author identities, reviews, badges, certifications, service statistics, hash attestations or dates. UGC needs moderated original submissions and a verified consent process.
- Implement JSON-LD only for visible, accurate, relevant page content. Never fabricate review or rating objects.

## Route map

| Group | Route | Editorial deliverable |
|---|---|---|
| Directory | `/agents` | verified scope, inclusion criteria, evidence-based examples, filters, uncertainty |
| Directory | `/models` | verified scope, inclusion criteria, evidence-based examples, filters, uncertainty |
| Directory | `/frameworks` | verified scope, inclusion criteria, evidence-based examples, filters, uncertainty |
| Directory | `/providers` | verified scope, inclusion criteria, evidence-based examples, filters, uncertainty |
| Directory | `/categories` | verified scope, inclusion criteria, evidence-based examples, filters, uncertainty |
| Directory | `/compare` | verified scope, inclusion criteria, evidence-based examples, filters, uncertainty |
| Directory | `/india` | verified scope, inclusion criteria, evidence-based examples, filters, uncertainty |
| Directory | `/mcp` | verified scope, inclusion criteria, evidence-based examples, filters, uncertainty |
| Directory | `/mcp/servers` | verified scope, inclusion criteria, evidence-based examples, filters, uncertainty |
| Directory | `/tools` | verified scope, inclusion criteria, evidence-based examples, filters, uncertainty |
| Resources | `/blog` | original articles, ownership, archive/update policy, linked sources |
| Resources | `/glossary` | original articles, ownership, archive/update policy, linked sources |
| Resources | `/learning` | original articles, ownership, archive/update policy, linked sources |
| Resources | `/integrations` | original articles, ownership, archive/update policy, linked sources |
| Resources | `/events` | original articles, ownership, archive/update policy, linked sources |
| Resources | `/research` | original articles, ownership, archive/update policy, linked sources |
| Resources | `/newsletter` | original articles, ownership, archive/update policy, linked sources |
| Guides | `/guides` | direct answer, worked implementation, failure modes, security and evaluation, FAQ |
| Guides | `/ai-agents` | direct answer, worked implementation, failure modes, security and evaluation, FAQ |
| Guides | `/agentic-workflows` | direct answer, worked implementation, failure modes, security and evaluation, FAQ |
| Guides | `/multi-agent-systems` | direct answer, worked implementation, failure modes, security and evaluation, FAQ |
| Guides | `/ai-agent-orchestration` | direct answer, worked implementation, failure modes, security and evaluation, FAQ |
| Guides | `/ai-agent-tool-calling` | direct answer, worked implementation, failure modes, security and evaluation, FAQ |
| Guides | `/ai-agent-memory` | direct answer, worked implementation, failure modes, security and evaluation, FAQ |
| Authority | `/trust` | transparent evidence/methodology, correction process, limits and accountability |
| Authority | `/verify` | transparent evidence/methodology, correction process, limits and accountability |
| Authority | `/trust/evidence-methodology` | transparent evidence/methodology, correction process, limits and accountability |
| Authority | `/trust/rating-methodology` | transparent evidence/methodology, correction process, limits and accountability |
| Authority | `/trust/corrections` | transparent evidence/methodology, correction process, limits and accountability |
| Authority | `/changelog` | transparent evidence/methodology, correction process, limits and accountability |
| Company & machine | `/about` | accurate utility/legal/API details; no artificial word target |
| Company & machine | `/contact` | accurate utility/legal/API details; no artificial word target |
| Company & machine | `/press` | accurate utility/legal/API details; no artificial word target |
| Company & machine | `/privacy-policy` | accurate utility/legal/API details; no artificial word target |
| Company & machine | `/terms` | accurate utility/legal/API details; no artificial word target |
| Company & machine | `/sitemap.xml` | accurate utility/legal/API details; no artificial word target |
| Company & machine | `/api-docs` | accurate utility/legal/API details; no artificial word target |

## Priority work batches

1. **Technical crawl:** confirm HTTP 200/canonical, page title/description, h1, render, internal links, sitemap, robots, JSON-LD validity, mobile Core Web Vitals and accessibility against live production.
2. **Directory:** create each hub's own data-backed buying/evaluation framework, with genuine examples dynamically fetched from published public catalog; share only UI primitives, not repetitive 1,500-word prose.
3. **Guides:** produce the six substantive agent architecture topics, detailed examples and linked evidence; 1,500 words is an editorial target where it improves comprehensiveness, not an SEO requirement.
4. **Trust:** describe cryptographic snapshot provenance and its limits; accurately document field-level evidence, source freshness and correction paths.
5. **Resources:** publish original researched articles with named actual editors and real dates; keep thin/empty hubs noindex until approved.
6. **Legal/company/API:** legal owner review and live API testing; XML sitemap stays XML, not prose.
7. **Release gate:** verify catalog/build/metadata/structured data; launch staging, recheck all routes, then observe Google Search Console and actual citations.

## Quality rubric (internal, not external ranking)

For each published editorial page score: intent fulfillment 20, source provenance 20, original practical depth 20, technical crawlability 15, navigability/accessibility 10, machine-readable consistency 10, freshness/corrections 5. Record evidence for each criterion. A score of 100 on this internal rubric does **not** imply a 100/100 Google SEO score or AI search placement.

Sources: [Google people-first guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content); [structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

The attached upgrade notes contain proposed snapshot integrity and surface-drift checks. Adopt only after source files/tests are reviewed against the live Next.js 16 repository; do not overwrite current App Router architecture with the attachment's Next.js 15 template.
