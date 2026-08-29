"use client";

import { useState } from "react";
import catalogIconManifest from "@/lib/catalog-icon-manifest.json";

type IconManifestEntry = { name: string; category: string; slug: string; svg: string; png: string; type: string };

const iconBySlug = new Map<string, IconManifestEntry>(
  (catalogIconManifest as IconManifestEntry[]).map((entry) => [entry.slug, entry])
);

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/**
 * Looks up a neutral catalog icon (see public/icons/svg + lib/catalog-icon-manifest.json)
 * by trying the entity's own slug, then its developer name, then its display
 * name. These are intentionally generic name/initial badges, not third-party
 * trademarks — see public/icons/svg for the originals and their README.
 */
function findCatalogIcon(candidates: Array<string | null | undefined>): string | null {
  for (const candidate of candidates) {
    if (!candidate) continue;
    const match = iconBySlug.get(slugify(candidate));
    if (match) return `/icons/${match.svg}`;
  }
  return null;
}

function domainFromUrl(url: string): string | null {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

/**
 * Renders a real favicon fetched live from the entity's own source domain via
 * Google's public favicon service (no API key, no hosting, no scraping — it's
 * the same mechanism a browser tab icon uses). If that fails to load (a
 * domain with no favicon, a dead link, etc.), falls back to a neutral catalog
 * icon when the entity/developer name matches one; if neither is available,
 * falls back to a text-initials glyph — never a broken image.
 */
export function EntityLogo({
  name,
  sourceUrl,
  developer,
  size = 40,
}: {
  name: string;
  sourceUrl?: string | null;
  developer?: string | null;
  size?: number;
}) {
  const [liveFailed, setLiveFailed] = useState(false);
  const [catalogFailed, setCatalogFailed] = useState(false);
  const domain = sourceUrl ? domainFromUrl(sourceUrl) : null;
  const catalogIcon = findCatalogIcon([name, developer]);

  if (!liveFailed && domain) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="glyph"
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=${size * 2}`}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        style={{ objectFit: "contain", background: "#fff", padding: 4 }}
        onError={() => setLiveFailed(true)}
      />
    );
  }

  if (!catalogFailed && catalogIcon) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="glyph"
        src={catalogIcon}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        style={{ objectFit: "contain" }}
        onError={() => setCatalogFailed(true)}
      />
    );
  }

  return <div className="glyph" aria-hidden="true" style={{ width: size, height: size }}>{name.slice(0, 2).toUpperCase()}</div>;
}
