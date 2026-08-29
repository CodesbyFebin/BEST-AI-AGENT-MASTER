#!/usr/bin/env python3
"""
Validates every JSON-LD block emitted by the production build.

Scans .next/server/app/**/*.html (the actual prerendered output — what a
crawler sees, not the source .tsx), extracts every
<script type="application/ld+json"> block, and checks:

  1. The block is syntactically valid JSON.
  2. Every node has an @type.
  3. Each @type carries the fields Google/Bing actually require to build a
     rich result from it (not the full schema.org spec — just the subset
     this site relies on).

Run after `npm run build`:
    python3 scripts/validate-jsonld.py
    python3 scripts/validate-jsonld.py --verbose
    python3 scripts/validate-jsonld.py --path some/other/build/app

Exit code is non-zero if any page fails to parse or fails a required-field
check, so this can be wired into CI the same way verify:catalog is.
"""

import argparse
import json
import re
import sys
from collections import Counter
from pathlib import Path

SCRIPT_RE = re.compile(
    r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
    re.DOTALL | re.IGNORECASE,
)

# Required-field rules per schema.org @type this site actually emits.
# Each entry: field name -> validator(value) -> True/False (or None to just
# check presence).
REQUIRED_FIELDS = {
    "WebPage": {
        "name": None,
        "url": None,
    },
    "CollectionPage": {
        "name": None,
        "url": None,
    },
    "Organization": {
        "name": None,
        "url": None,
    },
    "WebSite": {
        "name": None,
        "url": None,
    },
    "BreadcrumbList": {
        "itemListElement": lambda v: isinstance(v, list) and len(v) > 0,
    },
    "ListItem": {
        "position": lambda v: isinstance(v, int),
        "name": None,
        "item": None,
    },
    "FAQPage": {
        "mainEntity": lambda v: isinstance(v, list) and len(v) > 0,
    },
    "Question": {
        "name": None,
        "acceptedAnswer": lambda v: isinstance(v, dict) and "text" in v and bool(v["text"]),
    },
    "DefinedTerm": {
        "name": None,
        "description": None,
    },
    "SoftwareApplication": {
        "name": None,
    },
}

# Fields that, if present, must not be empty strings/None — catches the
# "field exists but is blank" failure mode a presence-only check would miss.
NON_EMPTY_STRING_FIELDS = {"name", "url", "description"}


def find_html_files(root: Path):
    return sorted(p for p in root.rglob("*.html") if not p.name.startswith("_"))


def extract_jsonld_blocks(html: str):
    return [m.strip() for m in SCRIPT_RE.findall(html) if m.strip()]


def flatten_nodes(payload):
    """A JsonLd payload is either a single node or {"@context":..., "@graph":[...]}."""
    if isinstance(payload, dict) and "@graph" in payload:
        return payload["@graph"]
    return [payload]


def is_id_reference(node):
    """{"@id": "..."} with nothing else is a pointer to another node in the
    same @graph, not an inline node — schema.org allows this everywhere a
    full node is otherwise expected, and it deliberately carries no @type."""
    return isinstance(node, dict) and set(node.keys()) <= {"@id"} and "@id" in node


def validate_node(node, path_ctx):
    """Returns a list of (severity, message) tuples for one JSON-LD node."""
    issues = []
    if not isinstance(node, dict):
        issues.append(("error", f"{path_ctx}: node is not a JSON object ({type(node).__name__})"))
        return issues

    if is_id_reference(node):
        return issues  # bare {"@id": "..."} reference — valid, nothing to check

    node_type = node.get("@type")
    if not node_type:
        issues.append(("error", f"{path_ctx}: node is missing @type"))
        return issues

    types = node_type if isinstance(node_type, list) else [node_type]

    for t in types:
        rules = REQUIRED_FIELDS.get(t)
        if rules is None:
            continue  # type we don't have a rule for — not an error, just unchecked
        for field, validator in rules.items():
            if field not in node:
                issues.append(("error", f"{path_ctx}: {t} is missing required field '{field}'"))
                continue
            value = node[field]
            if field in NON_EMPTY_STRING_FIELDS and isinstance(value, str) and not value.strip():
                issues.append(("error", f"{path_ctx}: {t}.{field} is an empty string"))
            if validator is not None and not validator(value):
                issues.append(("error", f"{path_ctx}: {t}.{field} failed validation (got: {value!r})"))

    # Recurse into nested objects/arrays so a bad ListItem inside a
    # BreadcrumbList, or a bad Question inside a FAQPage, is still caught.
    for key, value in node.items():
        if key.startswith("@"):
            continue
        if isinstance(value, dict):
            issues.extend(validate_node(value, f"{path_ctx} > {key}"))
        elif isinstance(value, list):
            for i, item in enumerate(value):
                if isinstance(item, dict):
                    issues.extend(validate_node(item, f"{path_ctx} > {key}[{i}]"))

    return issues


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--path", default=".next/server/app", help="Directory of prerendered HTML to scan")
    parser.add_argument("--verbose", action="store_true", help="Print every issue, not just the summary")
    parser.add_argument("--no-jsonld-warning", action="store_true",
                         help="Don't warn about indexable pages with zero JSON-LD blocks")
    args = parser.parse_args()

    root = Path(args.path)
    if not root.exists():
        print(f"error: {root} does not exist — run `npm run build` first", file=sys.stderr)
        sys.exit(2)

    html_files = find_html_files(root)
    if not html_files:
        print(f"error: no .html files found under {root}", file=sys.stderr)
        sys.exit(2)

    total_pages = 0
    pages_with_jsonld = 0
    pages_without_jsonld = []
    total_blocks = 0
    parse_errors = []
    validation_errors = []
    type_counter = Counter()

    for html_path in html_files:
        total_pages += 1
        rel = html_path.relative_to(root)
        html = html_path.read_text(encoding="utf-8", errors="replace")
        blocks = extract_jsonld_blocks(html)

        if not blocks:
            pages_without_jsonld.append(str(rel))
            continue

        pages_with_jsonld += 1
        for i, raw in enumerate(blocks):
            total_blocks += 1
            try:
                payload = json.loads(raw)
            except json.JSONDecodeError as e:
                parse_errors.append((str(rel), i, str(e)))
                continue

            for node in flatten_nodes(payload):
                node_type = node.get("@type") if isinstance(node, dict) else None
                for t in (node_type if isinstance(node_type, list) else [node_type]):
                    if t:
                        type_counter[t] += 1
                issues = validate_node(node, f"{rel} [block {i}]")
                validation_errors.extend(issues)

    # ---- report ----
    print("JSON-LD validation report")
    print("=" * 60)
    print(f"Pages scanned:            {total_pages}")
    print(f"Pages with JSON-LD:       {pages_with_jsonld}")
    print(f"Pages with NO JSON-LD:    {len(pages_without_jsonld)}")
    print(f"Total JSON-LD blocks:     {total_blocks}")
    print(f"JSON parse errors:        {len(parse_errors)}")
    print(f"Required-field errors:    {len(validation_errors)}")
    print()
    print("Nodes emitted by @type:")
    for t, n in sorted(type_counter.items(), key=lambda x: -x[1]):
        print(f"  {t:<20} {n}")

    if parse_errors:
        print()
        print(f"PARSE ERRORS ({len(parse_errors)})")
        for rel, idx, msg in parse_errors[: None if args.verbose else 20]:
            print(f"  {rel} [block {idx}]: {msg}")
        if not args.verbose and len(parse_errors) > 20:
            print(f"  ... and {len(parse_errors) - 20} more (use --verbose)")

    if validation_errors:
        print()
        print(f"REQUIRED-FIELD ERRORS ({len(validation_errors)})")
        for _, msg in validation_errors[: None if args.verbose else 20]:
            print(f"  {msg}")
        if not args.verbose and len(validation_errors) > 20:
            print(f"  ... and {len(validation_errors) - 20} more (use --verbose)")

    if pages_without_jsonld and not args.no_jsonld_warning:
        print()
        print(f"PAGES WITH NO JSON-LD AT ALL ({len(pages_without_jsonld)})")
        sample = pages_without_jsonld[: None if args.verbose else 15]
        for rel in sample:
            print(f"  {rel}")
        if not args.verbose and len(pages_without_jsonld) > 15:
            print(f"  ... and {len(pages_without_jsonld) - 15} more (use --verbose)")

    print()
    ok = not parse_errors and not validation_errors
    print("RESULT: PASS" if ok else "RESULT: FAIL")
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
