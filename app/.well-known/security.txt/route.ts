import { SITE } from "@/lib/site";

export const dynamic = "force-static";

// RFC 9116 (https://www.rfc-editor.org/rfc/rfc9116). Contact is the
// project's real, already-public disclosure channel (the same GitHub
// issue tracker cited on /press and /tools) — no dedicated security
// email exists to cite instead. Expires is set one year out, per RFC
// 9116's own recommendation that the file not be valid indefinitely.
export async function GET() {
  const text = `Contact: https://github.com/CodesbyFebin/BEST-AI-AGENT-MASTER/issues
Expires: 2027-09-16T00:00:00.000Z
Canonical: ${SITE.url}/.well-known/security.txt
Preferred-Languages: en
`;
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
