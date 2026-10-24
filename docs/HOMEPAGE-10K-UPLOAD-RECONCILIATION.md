# Homepage 10K upload — reconciliation and release review (2026-10-24)

## Scope
Reviewed user-uploaded `homepage_10k_aeo_geo_master.md`, `homepage_content.ts`, `page.tsx`, and two `BEST-AI-AGENT-MASTER-merged` ZIP files. The ZIPs are integrity-readable. They are NOT proof that the archive was merged to current GitHub main or deployed.

The uploaded homepage code would replace the newer `AtlasDiscovery` and `AtlasCostScenario` UI currently present on `main`; this change is not approved by this PR. Instead, this PR adds ten canonical navigation pillars and an evidence-policy FAQ while preserving both Atlas components.

## Factual blockers in uploaded draft
- Source links such as `https://www.google.com/search?q=/agents` or concatenated `https://www.bestaiagent.inhttps://...` are not acceptable primary-source evidence.
- The declared `420+ engineering hours` and purported reviewer approval have no corresponding independent work log or reviewer signoff in the supplied files.
- Declared `CLS = 0.00`, `LCP < 1.0s`, `INP < 100ms`, 60 KB JavaScript and `100/100` SEO are targets, NOT recorded test results.
- The 10,036-word editorial manuscript is not the same as rendered homepage body copy; its long-form content lives in Markdown instead of the supplied `page.tsx`.
- Claims such as 69 public entities, 100 receipts, or 716 quarantined routes must always be generated from the current catalog and its evidence. A user-declared count is not a fresh production check.
- Dates on evidence records describe historical retrieval, not `Last verified today`. Identity receipts do not verify vendor prices, reviews, licensing, benchmarks, speed or compliance.
- A SHA-256-shaped marker alone is not proof that stored source bytes were recomputed against an independent snapshot.
- `homepage_content.ts` associates some directory-level paragraphs with a specific unrelated `evidenceId`. These are not valid claim-to-source bindings and should not be imported wholesale.
- The uploaded deploy/privacy script changes repository visibility and pushes directly to `main` before CI, and must not be run to publish this content.

## Publication gates
1. Review editorial claims and source locator accuracy, including volatile pricing.
2. Verify all outbound and inbound link targets; no search-engine query URLs as substitute for canonical internal links.
3. Validate rendered visible text against JSON-LD. Do not imply FAQ rich results will be granted.
4. Run `npm ci`, `npm run verify` and the CI workflow, then browser smoke tests and Core Web Vitals measurements.
5. Preview on Vercel, merge reviewed PR, and verify real production deployment and rollback.
6. Keep donors private only after an explicit access and credential audit; donor privacy changes are separate from this PR.

This is a **partial website improvement**, not a 10,036-word homepage import or a passed 9-gate release.
