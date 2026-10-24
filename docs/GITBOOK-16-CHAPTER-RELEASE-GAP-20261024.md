# GitBook Guides & Tutorials ingestion status — 2026-10-24

The user-supplied delivery note reports 17 modular Markdown files, a master edition, 16 chapter routes, 85,120 prose/code/table words, 233 citation units, and 9 verification gates. These are *claims from an external report*, not proof of files or CI execution in this repository.

## Repository inspection
- Current `main` has `app/guides/page.tsx`, `app/tutorials/page.tsx` and `app/learning/page.tsx`. The guides index explicitly sets `robots.index = false` pending editorial review; the learning index likewise remains noindex.
- Current `main` does **not** contain `lib/gitbook-docs.ts`, `app/guides/[slug]/page.tsx`, `app/tutorials/[slug]/page.tsx`, or the 16 chapter Markdown sources. The three previously uploaded `BEST-AI-AGENT-MASTER-merged` archives inspected in the workspace do not contain these files either.
- Current Next.js is 16.x, not the claimed Next.js 15 codebase. The reported `npm run verify:evidence-lint` and `citation:audit` scripts are not present on inspected main.
- The report's G5 Precision@3/Recall@3, T5 attack success rates, and 9/9 claims have no runnable corresponding code or source logs in the inspected repository. These must remain **NOT_RUN / UNVERIFIED**.
- Legal obligations, factual benchmarks, published model claims and historical dates need independent primary-source review; an evidence marker is not a verification event.

## Import contract
Expected content paths are `content/gitbook/G1_foundations.md` through `G8_india-deployment.md`, and `content/gitbook/T1_mcp-stdio-setup.md` through `T8_local-model-mcp.md`. Expected routes are `app/guides/[slug]/page.tsx` and `app/tutorials/[slug]/page.tsx`, driven by `lib/gitbook-docs.ts`.

Use `npm run verify:gitbook-inventory` to report missing files without breaking the existing website. After actual source import, use `npm run verify:gitbook-release` to **fail closed** on missing assets or malformed citation markers. The strict check is necessary but insufficient: it does not validate factual claims, compile code examples, prove security, or complete a live browser test.

## Required release gates
1. Receive and inspect actual Markdown chapter files and any code/fixture sources. Do not synthesize benchmark scores or test output.
2. Stage a single canonical data module and server-rendered chapter pages in Next.js; ensure no path conflicts with existing authority pages and redirects.
3. Check internal links, `<h1>` uniqueness, heading fragments, dates, schema equality to visible content, code blocks, escaping, WCAG keyboard navigation and offline support assertions.
4. Remove unverifiable publisher/test/legal/security claims; version and hash each retained primary-source receipt.
5. Verify chapter code in disposable environments, pin versions, report test commands and exact pass/fail results.
6. Run Node 22 CI `npm ci && npm run verify`, capture a deployment preview and run route/browser smoke tests.
7. Only after editorial approval change noindex policy and canonical sitemap membership, then request GSC indexing.
8. Do not run `deploy-and-privatize-repos.sh` to force-push `main` or change repository visibility; deployment and access changes require a separate reviewed release.

**Result**: Missing chapters and source artifacts are a real blocker. This PR installs tracking and a fail-closed import gate, not the falsely advertised full GitBook application.
