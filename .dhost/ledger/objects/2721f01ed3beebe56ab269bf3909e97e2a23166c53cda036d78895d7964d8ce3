import type { NextConfig } from "next";
import legacyRedirects from "./data/legacy-redirects.json";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return Object.entries(legacyRedirects).map(([source, destination]) => ({
      source,
      destination,
      permanent: true
    }));
  },
  // Intentionally no sitemap-alias rewrites here. `/sitemap.xml` (app/sitemap.ts)
  // is the single canonical sitemap; Google Search Console flagged duplicate-
  // canonical and discovered-not-indexed issues traced back to a prior set of
  // ~20 fake sitemap alias URLs (e.g. /reddit-sitemap.xml, /blog-sitemap.xml)
  // that all rewrote to the same handful of real sitemaps but were never
  // linked from robots.txt or sitemap.xml itself. Do not re-add that pattern.
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        { key: "X-Frame-Options", value: "DENY" }
      ]
    }];
  }
};

export default nextConfig;
