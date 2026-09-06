#!/usr/bin/env python3
"""
GSC performance export -> canonical generation targets.

Stdlib implementation of the canonicalization pipeline (pandas-free so it
runs in this environment without dependency installs). Logic, rules, and
output schema match the approved process_gsc_to_canonical spec:

  1. normalize_url: lowercase, strip trailing slash, force https, drop www
  2. aggregate clicks/impressions by canonical URL, tracking raw variants
  3. default_action:
       - variant_count > 1                    -> CANONICALIZE_ALIASES_THEN_UPGRADE
       - canonical in protected_targets       -> PROTECT_AND_UPGRADE
       - otherwise                            -> AUDIT_UPGRADE_OR_CREATE
  4. sort by impressions_sum descending

The committed bestaiagent-296-canonical-generation-targets.csv extends this
schema with three reality-overlay columns (in_current_build,
recommended_action, redirect_candidate) produced by the repo cross-reference
step. This script regenerates the core six columns only; re-running the
overlay requires the route registries (see session audit, commit 49c70d9).

DOCTRINE NOTE: AUDIT_UPGRADE_OR_CREATE does NOT mean blanket-recreate.
281 of the 317 targets were deliberately removed by the evidence-first
cleanup and currently have no route in the codebase. Each needs an
evidence-gated decision (rebuild with primary-source receipts, redirect to
an evidence-ready equivalent, or leave as 404).
"""

import csv
import re
import sys
from collections import defaultdict

INPUT_CSV = "gsc_raw_export.csv"
OUTPUT_CSV = "bestaiagent-296-canonical-generation-targets-core.csv"

PROTECTED_TARGETS = {
    "https://bestaiagent.in/",
    "https://bestaiagent.in/tools/flowise",
    "https://bestaiagent.in/tools/yellow-ai",
    "https://bestaiagent.in/tools/crewai",
    "https://bestaiagent.in/tools/vapi-ai",
    "https://bestaiagent.in/tools/retell-ai",
    "https://bestaiagent.in/tools/intercom-ai",
}


def normalize_url(url: str) -> str:
    url = str(url).strip().lower()
    if url.endswith("/"):
        url = url[:-1]
    url = url.replace("http://www.", "https://")
    url = url.replace("https://www.", "https://")
    url = url.replace("http://", "https://")
    return url


def main() -> None:
    try:
        rows = list(csv.DictReader(open(INPUT_CSV, encoding="utf-8")))
    except FileNotFoundError:
        print(f"Error: '{INPUT_CSV}' not found. Export columns must be URL,Clicks,Impressions.")
        sys.exit(1)

    agg: dict = defaultdict(lambda: {"variants": set(), "clicks": 0, "impressions": 0})
    for r in rows:
        raw = r["URL"].strip()
        canon = normalize_url(raw)
        clicks = int(float(r["Clicks"] or 0))
        imps = int(float(str(r["Impressions"]).replace(",", "") or 0))
        agg[canon]["variants"].add(raw)
        agg[canon]["clicks"] += clicks
        agg[canon]["impressions"] += imps

    out = []
    for canon, a in agg.items():
        vc = len(a["variants"])
        if vc > 1:
            action = "CANONICALIZE_ALIASES_THEN_UPGRADE"
        elif canon in PROTECTED_TARGETS:
            action = "PROTECT_AND_UPGRADE"
        else:
            action = "AUDIT_UPGRADE_OR_CREATE"
        out.append({
            "canonical_normalized": canon,
            "observed_variant_count": vc,
            "observed_variants": " | ".join(sorted(a["variants"])),
            "clicks_sum": a["clicks"],
            "impressions_sum": a["impressions"],
            "default_action": action,
        })
    out.sort(key=lambda r: -r["impressions_sum"])

    with open(OUTPUT_CSV, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=[
            "canonical_normalized", "observed_variant_count", "observed_variants",
            "clicks_sum", "impressions_sum", "default_action"])
        w.writeheader()
        w.writerows(out)

    from collections import Counter
    print(f"Processed {len(rows)} raw rows into {len(out)} canonical targets.")
    print(f"Output: {OUTPUT_CSV}")
    print("Action summary:", dict(Counter(r["default_action"] for r in out)))


if __name__ == "__main__":
    main()
