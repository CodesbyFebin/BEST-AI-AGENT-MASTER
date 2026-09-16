import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Explicit allow rules for real AI-crawler user-agent tokens, on top of the
// wildcard allow below — makes the intent unambiguous rather than relying
// on "*" to implicitly cover them. Tokens are the ones actually documented
// by their operators: GPTBot/ChatGPT-User (OpenAI), ClaudeBot (Anthropic),
// PerplexityBot (Perplexity), Google-Extended (Gemini/AI Overviews
// training — separate from Googlebot itself), Applebot-Extended (Apple
// Intelligence — separate from Applebot), OAI-SearchBot (OpenAI's search
// crawler, distinct from GPTBot).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" }
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url
  };
}
