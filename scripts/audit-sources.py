#!/usr/bin/env python3
"""
Source-type audit for the noindex legacy/imported catalog.

Scans lib/imported-agents.ts, lib/imported-models.ts and
lib/imported-frameworks.ts (the pools that feed the noindex "legacy"
routes — see isEntityIndexable() in lib/catalog.ts) and buckets every
entry by what kind of source its sourceUrl actually is, so it's clear
which ones have a real, scriptable API to verify against and which need
a slower, per-entity manual check.

    python3 scripts/audit-sources.py
    python3 scripts/audit-sources.py --list github      # full list for one bucket
    python3 scripts/audit-sources.py --json > audit.json

Buckets:
  github        api.github.com/repos/{owner}/{repo}  — same method already used
  huggingface   huggingface.co/api/models/{id}       — same method already used
  npm           registry.npmjs.org/{pkg}             — same method, not used yet
  pypi          pypi.org/pypi/{pkg}/json             — same method, not used yet
  docs          a docs./readthedocs/GitBook-style site — no stable API, needs a
                per-page fetch-and-compare approach, not a batch script
  marketing     everything else (product homepage, blog, social) — no API,
                genuinely needs a human to find the real primary source
"""

import argparse
import json
import re
import sys
from collections import defaultdict
from pathlib import Path

FILES = [
    "lib/imported-agents.ts",
    "lib/imported-models.ts",
    "lib/imported-frameworks.ts",
]

ENTRY_RE = re.compile(
    r'slug:\s*"([^"]+)"\s*,\s*name:\s*"([^"]+)"\s*,\s*developer:\s*"([^"]*)"\s*,\s*sourceUrl:\s*"([^"]*)"'
)


def parse_entities(file_path: Path, type_hint: str):
    if not file_path.exists():
        return []
    text = file_path.read_text(encoding="utf-8")
    out = []
    for m in ENTRY_RE.finditer(text):
        slug, name, developer, source_url = m.groups()
        out.append({"slug": slug, "name": name, "developer": developer,
                     "sourceUrl": source_url, "type": type_hint})
    return out


def categorize(url: str) -> str:
    if not url:
        return "other"
    u = url.lower()
    if "github.com" in u:
        return "github"
    if "huggingface.co" in u:
        return "huggingface"
    if "npmjs.com" in u or "npmjs.org" in u:
        return "npm"
    if "pypi.org" in u:
        return "pypi"
    if re.search(r"docs\.|/docs/|readthedocs|gitbook", u):
        return "docs"
    return "marketing"


AUTO_VERIFY = {
    "github": "HIGH — api.github.com, same method already used for 34 entities",
    "huggingface": "HIGH — huggingface.co/api/models, same method already used for 2",
    "npm": "HIGH — registry.npmjs.org, unused so far but equally scriptable",
    "pypi": "HIGH — pypi.org/pypi/{pkg}/json, unused so far but equally scriptable",
    "docs": "LOW — no stable API; would need a per-page fetch-and-compare, not a batch script",
    "marketing": "LOW — no API; needs a human to find the real primary source first",
    "other": "UNKNOWN — url is empty, malformed, or an unrecognized domain",
}


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--list", choices=list(AUTO_VERIFY.keys()), help="print the full entry list for one bucket")
    parser.add_argument("--json", action="store_true", help="emit machine-readable JSON instead of the report")
    args = parser.parse_args()

    root = Path(__file__).resolve().parent.parent
    buckets = defaultdict(list)

    for rel in FILES:
        type_hint = "agent" if "agents" in rel else "model" if "models" in rel else "framework"
        for e in parse_entities(root / rel, type_hint):
            buckets[categorize(e["sourceUrl"])].append(e)

    total = sum(len(v) for v in buckets.values())

    if args.json:
        print(json.dumps({k: v for k, v in buckets.items()}, indent=2))
        return

    if args.list:
        for e in buckets[args.list]:
            print(f"  {e['name']} ({e['slug']}, {e['type']}) -> {e['sourceUrl']}")
        print(f"\n{len(buckets[args.list])} entries in '{args.list}'")
        return

    print("Source-type audit — noindex legacy/imported catalog")
    print("=" * 60)
    print(f"Total noindex entries scanned: {total}\n")

    for key in ["github", "huggingface", "npm", "pypi", "docs", "marketing", "other"]:
        entries = buckets[key]
        print(f"{key.upper():<12} {len(entries):>5}   auto-verify: {AUTO_VERIFY[key]}")
        for e in entries[:5]:
            print(f"             - {e['name']} ({e['slug']}) -> {e['sourceUrl']}")
        if len(entries) > 5:
            print(f"             ... and {len(entries) - 5} more (--list {key} for the full set)")
        print()

    scriptable = len(buckets["github"]) + len(buckets["huggingface"]) + len(buckets["npm"]) + len(buckets["pypi"])
    print("-" * 60)
    print(f"Scriptable via a real API right now: {scriptable} of {total}")
    print(f"Need per-entity manual verification:  {len(buckets['docs']) + len(buckets['marketing']) + len(buckets['other'])} of {total}")


if __name__ == "__main__":
    main()
