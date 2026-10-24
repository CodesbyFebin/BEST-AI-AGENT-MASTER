# GitHub Pages migration (2026-10-24)

This repo is being migrated from Vercel to a **static Next.js export** deployed with GitHub Actions. The workflow builds `out/` using `GITHUB_PAGES_STATIC=1` and publishes it through official GitHub Pages Actions. Existing catalog, noindex and evidence gates remain active.

## Architectural changes
- `next.config.ts`: opt-in `output: 'export'` and `trailingSlash`, with server-only redirects and custom response headers disabled in Pages builds. GitHub Pages cannot perform Next.js redirects or attach server headers.
- `/api/search/` is emitted as a static JSON index and `SearchBox` filters it in the browser, not on an always-on server. This changes the API contract and should be reviewed by any downstream consumers.
- Metadata and sitemap URLs remain `https://www.bestaiagent.in` (the intended canonical host).
- Do not claim equivalent server-side support for request-time API routes, authorization, database services, or Next server middleware.

## Important release steps
1. Inspect the PR's **GitHub Pages build** and the existing CI run. Do not change Pages settings or DNS before the static build is green and all critical URLs are checked.
2. In GitHub repo Settings > Pages, set **Build and deployment** source to **GitHub Actions**. Confirm the deploy job has Pages permissions.
3. GitHub Pages custom domain: configure **www.bestaiagent.in** and HTTPS. Only after a verified successful Pages deployment, update DNS CNAME for `www` and apex forwarding / A records per GitHub's current instructions. Avoid breaking a working website early.
4. Confirm `/robots.txt`, `/sitemap.xml`, `/catalog.json`, `/api/search/`, article and entity routes; test that deep URL refreshes work with trailing slash.
5. **Critical**: because GitHub Pages does not run Next.js `redirects()`, legacy redirected routes can become 404s. Recreate required static redirect pages or serve equivalent legacy destinations before production cutover, and recheck all former GSC redirect mappings. Redirect behavior is not yet parity-equivalent.
6. Recheck noindex content and sitemap; pages must not self-declare stale canonical status. Search Console submission happens only after domain migration and crawl validation.
7. The old Vercel project may remain running until Pages cutover is verified. After cutover, retire its domain routing; do not delete without recovery plan.

No production migration, domain/DNS update, or GSC submission is claimed by this PR.
