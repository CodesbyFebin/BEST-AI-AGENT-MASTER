# Search Console discovery triage

The number **509** is from an uploaded historical briefing and has not been confirmed from a current GSC export. Do not call the template a completed triage.

Enter GSC property, export date, normalized canonical URL, coverage and measured traffic. Do not treat missing metrics as zero. Only evaluate URLs when both host and publication status are known.

- **KEEP / REVIEW:** impressions, clicks, backlinks, strategic pillar relevance, unique substantive content, or direct evidence of visitor value. Review actual rendered content; do not impose arbitrary word minimums.
- **MERGE / REVIEW:** highly overlapping pages with a defensible relevant parent, no independent use case, and a technically available genuine HTTP redirect. GitHub Pages alone cannot serve arbitrary 301/308 rules.
- **PRUNE / REVIEW:** redundant, unsafe, or unsupported content following editorial approval, link/backlink checking, and a recovery plan. Do not automatically issue 410 based on a 28/90-day absence of clicks or a fixed calendar timer.
- **NEEDS_EVIDENCE:** missing GSC metrics, source receipts, ambiguous canonical, unavailable redirect destination, or inconsistent data.

Approval and audit evidence must precede noindex, delete, redirects, or sitemap mutation. A glossary or blog term listed in an uploaded document is a **candidate**, not proof of actual Google indexing.
