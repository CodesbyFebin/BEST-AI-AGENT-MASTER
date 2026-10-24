# Consolidation release controls — 24 October 2026

## Observed state
The uploaded `BEST-AI-AGENT-MASTER-merged.zip` has 264 ZIP entries and includes proposed `studio/`, `packages/mcp/`, `app/evidence/`, and verification scripts. Its nine named standalone checks exit 0 when run in the extracted archive. The current public master branch does **not** yet contain the proposed Studio, MCP server, or evidence route implementation. The ZIP is a source bundle, not proof of a production integration.

A Node 22 `npm ci --offline` attempt was blocked by an uncached npm package. Therefore full Next.js/TypeScript/build verification for the uploaded bundle remains **not independently completed** in the local runtime.

## Safe import sequence
1. Keep current `main` and Vercel production deploy as rollback baseline. Preserve the merged site's newer Atlas homepage and public catalog; do not overwrite the root Next.js app using ZIP files without three-way diffs.
2. Stage the optional FastAPI Studio under `studio/` with **no public Vercel routes**, isolated dependencies, secret scanning, authorization review, and an explicit offline/nonproduction disclaimer until acceptance tests pass.
3. Stage `packages/mcp/` separately. Validate tool names, JSON-RPC framing, allowed capabilities, permissions, outbound HTTP, rate limits and test coverage before exposing an endpoint.
4. Port evidence inspection pages using the existing canonical `lib/catalog.ts` publication predicate. Verify SHA-256 **against the underlying captured snapshot bytes**, not merely the format or a digest of a new JSON wrapper.
5. Review donor comparison claims, redirects, and media licenses individually. Do not overwrite canonical paths or publish refresh-pending pages as verified.
6. Run `npm ci && npm run verify` using Node 22, Studio Python tests, MCP package tests, security scans and route smoke tests. Only after all mandatory gates pass merge via PR and let `main` trigger Vercel production.
7. Check production domain aliases, canonical /sitemap.xml, robots, JSON-LD, noindex quarantine, relevant HTTP redirects and rollback target. Never mark the deployment verified from CI alone.

## Repository visibility
Requested: `BEST-AI-AGENT-MASTER` public; `bestaiagent.in`, `Best-Ai-Agents`, `best-ai-agent` private. Last observed `bestaiagent.in` was still public; the other donors were private. GitHub app tools lack repository settings mutation. Change its visibility through GitHub Settings, then independently verify.

**Security / disclosure:** Publishing the four-repository ZIP in this public master permanently exposes included private donor code. User authorized public publication of the ZIP; scan the archive for secrets, credentials, private customer material, and unlicensed third-party source before uploading it.

## Evidence and result interpretation
- Successful catalog hash checks establish consistency for the checked objects, not factual accuracy of vendor claims.
- A timestamp freshness command should report stale receipts explicitly, not simply print `PASS` for old sources.
- The 50-query × five-engine citation *configuration* is not evidence of real searches on five engines.
- Nine script exit codes do not prove auth, live service functionality, production data isolation, browser SEO, or deployed MCP behavior.

The temporary failed workflow `.github/workflows/publish-consolidation-zip.yml` was removed from `main`: GitHub Actions could not clone the now-private donor repositories with its scoped default token. Do not restore it with hardcoded credentials.
