# Apex canonical audit interpretation (2026-10-25)

Canonical host in source: `https://bestaiagent.in`. Execute `npm run audit:live-hosts -- host-audit.json` from a network-enabled runner. PASS on a www URL requires HTTP 301 to the exact apex path, preserving query string, with no unexpected redirect chain. PASS on apex HTML requires a successful response whose canonical is apex. Static assets such as robots and sitemap need availability and correct URL metadata, not HTML canonical tags. Any failure, unexpected canonical, timeout, 200 on www, or absent Location remains unresolved; **do not claim host consolidation from a build check**.

GitHub Pages does not create Cloudflare account-level redirects. Cloudflare DNS proxy/rule changes and authenticated Search Console submission are separate operator operations.
