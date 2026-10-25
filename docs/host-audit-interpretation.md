# Host audit interpretation (GitHub Pages, 2026-10-25)

Canonical host is `https://www.bestaiagent.in` per `lib/site.ts`. Run `npm run audit:live-hosts -- host-audit.json` from a network-enabled environment.

For a sample **www** HTML route, PASS means HTTP 200 with `rel=canonical` pointing to the same www path (allow normalized trailing slash); a safe same-host redirect can also be acceptable if its final destination is checked. For an **apex** URL, PASS means HTTP 301 or 308 to the equivalent www URL, including path and query string. A 200 response from apex, a redirect to the wrong host, invalid TLS, a 404, timeout, or a contradictory canonical is a **FAIL/INVESTIGATE**. XML, TXT and JSON assets do not have HTML canonical tags, so evaluate their availability and redirect separately.

The current script samples nine paths across two hosts. Its result is diagnostic, not a full 50-URL migration certification. Treat any network errors as inconclusive, not evidence of success. Save date, location, status, content type and canonical; verify important legacy redirects separately. Do not flip sitemap canonical or DNS based only on code inspection.

**Stop gate:** unresolved host conflicts block claims of completed host consolidation and any canonical/sitemap-host migration. Editorial drafting may proceed independently without publishing unverifiable claims.
