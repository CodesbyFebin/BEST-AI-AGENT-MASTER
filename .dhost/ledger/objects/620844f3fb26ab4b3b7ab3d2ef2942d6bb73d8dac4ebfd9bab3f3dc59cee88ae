import { SITE } from "@/lib/site";
import { xmlResponse } from "@/lib/xml";
import { entitiesByType } from "@/lib/catalog";

export const dynamic = "force-static";

export async function GET() {
  const verifiedServerUrls = entitiesByType("mcp-server").map((e) => `${SITE.url}/mcp/servers/${e.slug}`);
  return xmlResponse([`${SITE.url}/mcp`, `${SITE.url}/mcp/servers`, ...verifiedServerUrls]);
}
