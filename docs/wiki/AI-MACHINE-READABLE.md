# AI and machine-readable documentation map

The live static export provides these canonical apex artifacts:

| Artifact | Purpose | Production location |
| --- | --- | --- |
| Machine orientation | Directory scope, caveats and published routes | https://bestaiagent.in/llms.txt |
| Extended index | Public entities and evidence-ready authority entries | https://bestaiagent.in/llms-full.txt |
| Canonical sitemap | Indexable pages after publication gates | https://bestaiagent.in/sitemap.xml |
| Robots policy | Crawler handling rules | https://bestaiagent.in/robots.txt |
| Catalog | Build-time normalized public data | https://bestaiagent.in/catalog.json |
| Agent registry | Public agent slice | https://bestaiagent.in/agents.json |
| Model registry | Public model slice | https://bestaiagent.in/models.json |
| Framework registry | Public framework slice | https://bestaiagent.in/frameworks.json |
| Provider registry | Public provider slice | https://bestaiagent.in/providers.json |

**Do not create duplicate `public/llms.txt` files**: `app/llms.txt/route.ts` and `app/llms-full.txt/route.ts` build the two machine-oriented text responses. Their URLs derive from `lib/site.ts`. These files are an aid to automated readers, not an official search ranking or citation guarantee.

The source repository also exposes [CITATION.cff](../../CITATION.cff), [AGENTS.md](../../AGENTS.md), [AUTHORS.md](../../AUTHORS.md), the [versioned engineering wiki](README.md), and [marketplace submission schema](../../submissions/README.md). The [Agentic Marketplace](https://github.com/CodesbyFebin/Agentic-Marketplace) is a separate companion repository and should not be described as an operational component of the current site's static export.

When generating descriptions for models, agents or MCP servers, cite the originating publisher's actual source URL and specify whether a claim is unknown, source-linked or field-verified. Never elevate vendor copy into independently tested benchmarks without a reproducible procedure.
