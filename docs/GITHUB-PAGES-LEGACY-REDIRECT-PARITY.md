# GitHub Pages redirect and crawl parity assessment

The site ships 84 legacy redirect mappings in `data/legacy-redirects.json`. These were executed using Next.js `redirects()` on a server host. **GitHub Pages does not execute those mappings**. The existing GitHub Pages export workflow produces static HTML and other assets; a green Pages deployment alone is not evidence that the 84 old URLs return HTTP 301/308.

## Engineering impact
- Google Search Console may revisit legacy URLs and encounter 404 or different canonical content after cutover.
- JavaScript redirects or HTML meta-refresh pages would be browser conveniences, not semantically equivalent HTTP 301 redirects. Do not call them permanent redirects in SEO verification.
- DNS records and GitHub Pages do not offer arbitrary path-level redirect rules. True HTTP redirect parity requires a redirect-capable HTTP layer (such as an approved edge proxy/CDN) or alternative hosting.
- Do not alter DNS, publish fake 301 status claims, or index legacy aliases to conceal missing redirects.

## Added protection
`npm run test:unit` now checks the redirect graph's internal targets, lack of chains, and sitemap source invariants. It runs in both CI and Pages build pipelines. This does **not** prove that the Pages origin serves those redirects.

## Release gates before declaring GSC migration complete
1. Verify custom domain, HTTPS certificate, and actual Pages-hosted response.
2. Crawl an exported list of legacy source paths with an HTTP client and retain status, Location, target status, robots and canonical.
3. Require real 301/308 Location responses for important migrated URLs, or document a reviewed disposition with no assertion of equivalent SEO value.
4. Run PageSpeed Insights/CrUX on the live Pages domain, not on a local generated file; report measured results instead of a 100/100 estimate.
5. Inspect GSC verified property coverage and sitemap submission receipts separately.

Source integrity, unit tests, build validation and successful GitHub Pages Actions deployment are separate from live SEO ranking, AI citation share or Google indexing.
