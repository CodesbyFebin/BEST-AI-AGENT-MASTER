# Blog design upload integration review — 2026-10-24

Two user-supplied HTML mockups served as the visual and editorial reference. The mockups advertise 100 published posts, 1,527 community citations, 847 hashes, 42 contributors, 1,042 subscribers, 3,847 submissions, fabricated-looking truncated SHA badges, and unproven product benchmark winners. Those numbers are not backed by actual community, payment, evidence, post, or subscriber records in this repository. They were deliberately **not imported**.

The original Next.js blog index already has real data records in `lib/blog-posts.ts` and three-segment dynamic routes under `app/blog/[...slug]/page.tsx`. Those detail pages currently remain **noindex** with source-review notices.

## Integration
- Blog index now derives displayed article count, categories, taxonomy, dates, and links directly from `blogPosts`, rather than from the mockup's hardcoded figures.
- Preserved deep canonical article paths. Added category anchor navigation, responsive card grouping, and disclosure of draft evidence state.
- Uses existing site shell, card/grid styles, and current `JsonLd` component rather than adding browser-loaded Tailwind CDN.
- Kept `robots.index = false` for the blog index as individual article claims have not passed independent review. Blog schema describes the editorial collection without creating invented published post instances.

## Publication backlog
1. Link each factual claim on individual posts to a checked first-party record and retained source evidence, then record actual review author and date.
2. Remove unsupported comparisons, precise benchmark ranks, legal conclusions, claim counts and reviewer personas.
3. Introduce a separately approved `indexableBlogPosts` filter in both metadata and sitemap; do not index unreviewed pages by changing one boolean.
4. Implement verified subscriber and UGC systems only with actual database, moderation, opt-in and privacy controls. Until then, do not show artificial subscribers or live contribution feeds.
5. Run CI, render /blog and deep article URLs in a preview, check mobile navigation, canonical URL, HTTP status, JSON-LD and sitemap/noindex behavior.
6. Production deployment and Search Console submission require completed release gates and access; neither occurs in this PR.

## Honesty of measurements
The code changes are a directory-page integration, **not** 100 new full articles, SEO 100/100, real browser validation, a successful production deploy, or an independently verified comparison leaderboard.
