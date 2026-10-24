import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createRequire } from "node:module";
import type { Submission, SubmissionType } from "@/lib/types/submission";

const yaml = createRequire(import.meta.url)("js-yaml") as { load: (value: string, options?: unknown) => unknown; JSON_SCHEMA: unknown };
const categories = { agents: "agent", bots: "bot", models: "model", skills: "skill", "mcp-servers": "mcp-server", frameworks: "framework" } as const;
export const submissionTypes = Object.values(categories) as SubmissionType[];
export const submissionTypePaths = categories;

/** Only maintainer-approved records render; YAML SHA-256 is NOT cryptographic proof by itself. */
export function getApprovedSubmissions(): Submission[] {
  const root = join(process.cwd(), "submissions");
  const result: Submission[] = [];
  for (const [folder, type] of Object.entries(categories)) {
    let names: string[];
    try { names = readdirSync(join(root, folder)).filter((n) => n.endsWith(".yaml")); }
    catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") continue;
      throw error;
    }
    for (const name of names) {
      const record = yaml.load(readFileSync(join(root, folder, name), "utf8"), { schema: yaml.JSON_SCHEMA }) as Submission;
      if (record.status === "approved" && record.type === type && record.slug === name.slice(0, -5)) result.push(record);
    }
  }
  return result.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}
export function getApprovedSubmission(type: string, slug: string) {
  return getApprovedSubmissions().find((s) => s.type === type && s.slug === slug);
}
