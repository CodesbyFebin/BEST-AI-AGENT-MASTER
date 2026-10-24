# AGENTS.md — BestAIAgent.in engineering rules

## Repository reality
- Canonical repository: `CodesbyFebin/BEST-AI-AGENT-MASTER`.
- Next.js 16 App Router, TypeScript, React 19. GitHub Pages deploys a static HTML export from `out/` with `GITHUB_PAGES_STATIC=1`.
- Canonical domain: `https://www.bestaiagent.in`. Do not change canonical routing without an explicit migration.
- Public catalog and editorial source records are held in `lib/*.ts`, with evidence and publication checks. A static `app/api/search/route.ts` exports a read-only search index; `components/SearchBox.tsx` filters locally.
- A static site is not immune to supply-chain attacks or content integrity failures. Do not introduce credentials, personal data, or invented evidence.

## Commands
```bash
npm ci
npm run typecheck
npm run lint
npm run verify
GITHUB_PAGES_STATIC=1 npm run build
npm run verify:gitbook-release # strict, intentionally fails until all chapter assets are imported
```

## Source and editorial boundaries
- Imported candidates are not automatically verified. A passing identity receipt does NOT establish pricing, performance, safety, compliance, licensing or data residency.
- Preserve `noindex` for unreviewed guides, blog posts, glossary material, and other quarantined routes. Only add sitemap membership after their publication gates pass.
- No fabricated star ratings, affiliate scores, citations, source snapshots, human reviewers, or benchmark results. Use "unknown" where data is absent.
- Keep `/llms.txt`, `/llms-full.txt`, sitemap, robots and JSON-LD aligned to actual indexable content.
- Do not represent a hash-looking string as an independently verified source receipt.
- Do not add indiscriminate FAQPage schema or stale author/date metadata; markup must agree with visible content and real evidence.

## Static hosting boundaries
- No request-time server APIs, request-dependent searchParams rendering, server actions, auth/session APIs or database access in Pages builds.
- Next.js `redirects()` and `headers()` do not execute on GitHub Pages. Test legacy paths, deep links, canonical tags, noindex output, and response headers before domain cutover.
- No scripts that force-push `main`, modify donor repo visibility, or deploy externally without explicit approval.
- `app/robots.ts`, `app/sitemap.ts`, and the Open Graph image route must remain compatible with static export.

## Definition of done
A change is complete only when Node 22 CI and GitHub Pages static build pass; impacted pages are browser-checked for usable navigation, metadata and structured data; source assertions have an evidence trail; and any live deployment or GSC submission is independently confirmed. Green CI is not proof of SEO rankings, actual AI citations, or production DNS.

## Git-based marketplace intake
- Only validated YAML files in `submissions/{agents,bots,models,skills,mcp-servers,frameworks}/` are accepted.
- New submissions must be `pending` and contain no fabricated evidence digests. Maintainer approval is required for publication.
- `npm run verify:submissions` checks field structure and duplicate slugs, not actual claim authenticity.
- The marketplace does not handle payments or pay-to-rank. Never equate `approved` with cryptographic verification.
