# BestAIAgent.in

![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)
![Static catalog](https://img.shields.io/badge/type-static%20catalog-22c55e)
![License](https://img.shields.io/badge/license-not%20yet%20specified-lightgrey)
![CI](https://img.shields.io/github/actions/workflow/status/CodesbyFebin/BESTAIAGENT-MASTER/ci.yml?label=CI&logo=github)

> Evidence-first authority graph for AI agents, models, frameworks, providers and MCP infrastructure. Unknown stays unknown, no synthetic rankings, no fake reviews.

[Live site](https://bestaiagent.in) · [catalog.json](https://bestaiagent.in/catalog.json) · [llms.txt](https://bestaiagent.in/llms.txt)

## What this is, and isn't

This is a static content catalog, not a product with accounts or a database. Every page is generated at build time from typed data in `lib/*.ts` — there's no Prisma, no Redis, no runtime database to drift out of sync with the source.

What it covers:
- **AI agents** — coding agents, research agents, autonomous workflow tools
- **Models** — with capability claims held to the same evidence standard as everything else
- **Frameworks** — orchestration, RAG, fine-tuning and inference infrastructure
- **MCP servers** — cataloged by source-link status, not capability claims
- **Comparisons** — evidence-ready only when both sides are independently verified

## Production

- Canonical domain: `https://bestaiagent.in`
- WWW: `https://www.bestaiagent.in`
- Vercel project: `bestaiagent-master` (team `projects555`)
- Production repository: `CodesbyFebin/BESTAIAGENT-MASTER`

## Publication doctrine

A verified identity does not automatically verify pricing, capabilities, compliance, benchmark performance, data residency, or licensing — those each require field-specific evidence. Concretely:

```text
primary source (GitHub repo API, model card API, official site)
  → normalized snapshot of specific fields
  → SHA-256 hash of that snapshot + retrieval timestamp
  → isEntityIndexable() gate in lib/catalog.ts
  → indexed HTML / catalog.json / sitemap.xml / llms.txt
```

An entity without a passing evidence receipt still gets a page — it just stays `noindex` until one exists. See `docs/EVIDENCE_POLICY.md` and `CONTRIBUTING.md` for the exact mechanics, including how to add a new one.

What's deliberately excluded: synthetic rankings, fabricated ratings or review counts, unverifiable benchmark claims, mass-generated placeholder pages, and any comparison whose title doesn't match the entities it actually points to (this repo has caught and fixed exactly that bug once already — see `CONTRIBUTING.md`).

## Quick start

```bash
git clone https://github.com/CodesbyFebin/BESTAIAGENT-MASTER.git
cd BESTAIAGENT-MASTER
npm install
npm run verify:catalog   # checks evidence hashes before you do anything else
npm run dev
```

Production build:

```bash
npm run build
npm start
```

Full verification (what CI runs):

```bash
npm run verify                       # catalog + GSC + quarantine checks, typecheck, lint, build
python3 scripts/validate-jsonld.py   # validates every JSON-LD block in the built output
```

## Machine-readable surfaces

| Endpoint | Format | Notes |
| :--- | :--- | :--- |
| `/catalog.json` | JSON | Full normalized catalog, evidence-gated |
| `/agents.json`, `/models.json`, `/frameworks.json`, `/providers.json` | JSON | Per-type slices of the same gated data |
| `/llms.txt`, `/llms-full.txt` | Text | AI-crawler ingestion surfaces |
| `/sitemap.xml` | XML | Only indexable URLs — noindex pages are never listed here |
| `/robots.txt` | Text | Explicitly allows OAI-SearchBot and PerplexityBot alongside standard crawlers |
| `/api/health`, `/api/search`, `/api/catalog` | JSON | — |

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) — it covers the two-tier verification model, exactly how to promote an entity from imported to verified with a real evidence hash, and what gets rejected on review (fabricated schema data, gate-lowering changes, unverifiable claims).

## License

Not yet specified. Contact the maintainer before reusing code or data from this repository.
