#!/usr/bin/env python3
"""
Submits the site's real URLs to IndexNow (supported by Bing, Yandex, Seznam
and others — Google has no equivalent; their sitemap ping endpoint was
deprecated in June 2023, so this intentionally doesn't try to hit it).

Reads URLs from the live sitemap.xml rather than re-deriving them from
lib/*.ts — that keeps this script honest by construction: it can only ever
submit a URL that the real evidence-gated sitemap already decided to include
(see app/sitemap.ts, which filters through publicEntities/publicComparisons).
There is no second, separately-maintained list of "which pages count" for
this to drift out of sync with.

Usage:
    python3 scripts/indexnow-submit.py                        # all URLs from the live sitemap
    python3 scripts/indexnow-submit.py --url /agents/openhands --url /compare/vllm-vs-tgi
    python3 scripts/indexnow-submit.py --dry-run              # show what would be submitted, send nothing

Requires the key file this script's key corresponds to to already be
deployed at https://<host>/<key>.txt (see public/<key>.txt in this repo).
"""

import argparse
import json
import sys
import urllib.request
import xml.etree.ElementTree as ET

HOST = "www.bestaiagent.in"
KEY = "f26b7d574bedfc3da7504e166bc393c9"
KEY_LOCATION = f"https://{HOST}/{KEY}.txt"
SITEMAP_URL = f"https://{HOST}/sitemap.xml"
INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"


def fetch_sitemap_urls(sitemap_url: str) -> list[str]:
    with urllib.request.urlopen(sitemap_url, timeout=20) as resp:
        data = resp.read()
    root = ET.fromstring(data)
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    return [loc.text.strip() for loc in root.findall(".//sm:url/sm:loc", ns) if loc.text]


def submit(urls: list[str], dry_run: bool) -> None:
    if not urls:
        print("No URLs to submit.")
        return

    payload = {
        "host": HOST,
        "key": KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": urls,
    }

    print(f"Prepared {len(urls)} URL(s) for IndexNow.")
    print(f"  keyLocation: {KEY_LOCATION}")
    print(f"  sample: {urls[:3]}{' ...' if len(urls) > 3 else ''}")

    if dry_run:
        print("\n--dry-run set, not sending anything.")
        return

    body = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        INDEXNOW_ENDPOINT,
        data=body,
        method="POST",
        headers={"Content-Type": "application/json; charset=utf-8"},
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            print(f"\nIndexNow responded: HTTP {resp.status}")
    except urllib.error.HTTPError as e:
        # IndexNow returns 200/202 on success; 400/403/422/429 carry a real
        # reason in the body (e.g. key file not reachable yet at keyLocation).
        print(f"\nIndexNow responded: HTTP {e.code}")
        print(e.read().decode("utf-8", errors="replace"))
        sys.exit(1)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--url", action="append", dest="urls", help="Submit specific path(s) instead of the whole sitemap, e.g. /agents/openhands. Repeatable.")
    parser.add_argument("--dry-run", action="store_true", help="Print what would be submitted without sending it.")
    args = parser.parse_args()

    if args.urls:
        urls = [f"https://{HOST}{u}" if not u.startswith("http") else u for u in args.urls]
    else:
        print(f"Fetching {SITEMAP_URL} ...")
        urls = fetch_sitemap_urls(SITEMAP_URL)

    submit(urls, args.dry_run)


if __name__ == "__main__":
    main()
