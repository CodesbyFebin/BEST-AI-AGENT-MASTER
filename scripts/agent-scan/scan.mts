import { execFile } from "node:child_process";
import { appendFile, mkdtemp, readFile, readdir, readFile as readBinary, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, extname, join, relative, resolve } from "node:path";
import { promisify } from "node:util";
import { analyzeSignals } from "./analyze.mts";
import { scanSecurity, triageCandidate } from "./security.mts";

const execFileAsync = promisify(execFile);
if (process.argv.includes("--help") || process.argv.includes("-h")) {
  console.log("Usage: node scripts/agent-scan/scan.mts [--input <targets.json>] [--out <reports.json>]");
  process.exit(0);
}
const MAX_REPOSITORIES = 200;
const MAX_FILES = 3000;
const MAX_DIRECTORIES = 5000;
const MAX_FILE_BYTES = 96 * 1024;
const MAX_REPOSITORY_BYTES = 12 * 1024 * 1024;
const CLONE_TIMEOUT_MS = 120_000;
const CONCURRENCY = 4;
const SOURCE_EXTENSIONS = new Set([
  ".c", ".cc", ".cpp", ".cs", ".go", ".gradle", ".h", ".hpp", ".java", ".js", ".jsx", ".kt", ".mjs", ".mts", ".php", ".ps1", ".py", ".rb", ".rs", ".sh", ".sql", ".toml", ".ts", ".tsx", ".txt", ".xml", ".yaml", ".yml"
]);
const SOURCE_NAMES = new Set(["AGENTS.md", "Dockerfile", "Makefile", "Pipfile", "README", "README.md", "package.json", "pyproject.toml", "requirements.txt", "SKILL.md", "go.mod", "Cargo.toml"]);
const SKIP_DIRS = new Set([".git", ".next", ".venv", "build", "coverage", "dist", "node_modules", "out", "target", "vendor"]);
const SKIP_FILES = new Set(["Cargo.lock", "composer.lock", "package-lock.json", "pnpm-lock.yaml", "poetry.lock", "uv.lock", "yarn.lock"]);
const SAFE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type Target = { slug: string; repository: string };
type ExistingScan = { entitySlug: string; repository: string; repositoryCommit: string; [key: string]: unknown };

function argument(name: string, fallback: string) {
  const index = process.argv.indexOf(name);
  return index < 0 ? fallback : process.argv[index + 1] ?? fallback;
}

function validateTarget(target: Target): Target {
  if (!target || !SAFE_SLUG.test(target.slug)) throw new Error("Invalid target slug in scan target file.");
  let url: URL;
  try { url = new URL(target.repository); } catch { throw new Error(`Invalid repository URL for ${target.slug}.`); }
  if (url.protocol !== "https:" || url.hostname.toLowerCase() !== "github.com" || url.username || url.password || url.search || url.hash) {
    throw new Error(`Repository for ${target.slug} must be an HTTPS GitHub URL without credentials or query parameters.`);
  }
  const parts = url.pathname.split("/").filter(Boolean);
  if (parts.length !== 2 || !/^[A-Za-z0-9-]+$/.test(parts[0]) || !/^[A-Za-z0-9_.-]+$/.test(parts[1].replace(/\.git$/i, ""))) {
    throw new Error(`Repository for ${target.slug} must use https://github.com/owner/repository.`);
  }
  return { slug: target.slug, repository: `https://github.com/${parts[0]}/${parts[1].replace(/\.git$/i, "")}` };
}

function shouldRead(path: string) {
  const name = basename(path);
  if (SKIP_FILES.has(name) || /^\.env(?:\.|$)/i.test(name) || /\.(?:min\.js|bundle\.js|lock|pem|key|p12|pfx|png|jpe?g|gif|webp|ico|pdf|zip|gz|wasm)$/i.test(name)) return false;
  return SOURCE_NAMES.has(name) || SOURCE_EXTENSIONS.has(extname(name).toLowerCase());
}

async function collectTextFiles(root: string) {
  const files: Array<{ path: string; content: string }> = [];
  let totalBytes = 0;
  let skipped = 0;
  const pending = [root];
  let directoriesVisited = 0;

  while (pending.length && files.length < MAX_FILES && totalBytes < MAX_REPOSITORY_BYTES && directoriesVisited < MAX_DIRECTORIES) {
    const directory = pending.pop()!;
    directoriesVisited++;
    let entries;
    try { entries = await readdir(directory, { withFileTypes: true }); }
    catch { skipped++; continue; }
    entries.sort((a, b) => a.name.localeCompare(b.name));
    for (const entry of entries) {
      if (files.length >= MAX_FILES || totalBytes >= MAX_REPOSITORY_BYTES) break;
      if (entry.isSymbolicLink()) { skipped++; continue; }
      const path = join(directory, entry.name);
      if (entry.isDirectory()) {
        if (!SKIP_DIRS.has(entry.name)) pending.push(path);
        continue;
      }
      if (!entry.isFile() || !shouldRead(path)) continue;
      try {
        const info = await stat(path);
        if (info.size > MAX_FILE_BYTES || totalBytes + info.size > MAX_REPOSITORY_BYTES) { skipped++; continue; }
        const buffer = await readBinary(path);
        if (buffer.includes(0)) { skipped++; continue; }
        files.push({ path: relative(root, path).split("\\").join("/"), content: buffer.toString("utf8") });
        totalBytes += info.size;
      } catch { skipped++; }
    }
  }
  return { files, skipped };
}

async function cloneRepository(target: Target, workRoot: string) {
  const path = join(workRoot, target.slug);
  const env = { ...process.env, GIT_CONFIG_GLOBAL: "/dev/null", GIT_CONFIG_NOSYSTEM: "1", GIT_TERMINAL_PROMPT: "0" };
  await execFileAsync("git", [
    "clone", "--quiet", "--depth", "1", "--no-tags", "--no-recurse-submodules",
    "--filter=blob:limit=1048576", target.repository, path
  ], { timeout: CLONE_TIMEOUT_MS, maxBuffer: 2 * 1024 * 1024, env });
  const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: path, timeout: 10_000, env });
  return { path, commit: stdout.trim() };
}

async function scanTarget(target: Target, workRoot: string) {
  const { path, commit } = await cloneRepository(target, workRoot);
  const { files, skipped } = await collectTextFiles(path);
  const signals = analyzeSignals(files);
  const security = scanSecurity(files);
  security.filesSkipped = skipped;
  const triage = triageCandidate(signals.typeConfidence, security.riskScore);
  return {
    entitySlug: target.slug,
    repository: target.repository,
    repositoryCommit: commit,
    scannedAt: security.scannedAt,
    standard: security.standard,
    scannerVersion: security.scannerVersion,
    scoreMethod: security.scoreMethod,
    heuristicRiskScore: security.riskScore,
    heuristicRiskLevel: security.riskLevel,
    typeConfidence: signals.typeConfidence,
    confidenceSignals: signals.confidenceSignals,
    triage,
    publicationStatus: "unreviewed",
    badges: security.badges,
    findings: security.findings,
    filesScanned: security.filesScanned,
    filesSkipped: security.filesSkipped,
    scopeNote: "Heuristic static pattern scan of selected text files only. It does not execute code, inspect runtime behavior, or establish that a repository is secure."
  };
}

const input = resolve(argument("--input", "data/agent-security-targets.json"));
const output = resolve(argument("--out", "data/agent-security-scans.json"));
const targetsRaw = JSON.parse(await readFile(input, "utf8")) as Target[];
if (!Array.isArray(targetsRaw) || targetsRaw.length > MAX_REPOSITORIES) {
  throw new Error(`Scan target input must be an array with no more than ${MAX_REPOSITORIES} repositories.`);
}
const targets = targetsRaw.map(validateTarget);
if (new Set(targets.map((item) => item.slug)).size !== targets.length) throw new Error("Scan target slugs must be unique.");

const oldManifest = JSON.parse(await readFile(output, "utf8").catch(() => '{"schemaVersion":1,"reports":[]}')) as { reports?: ExistingScan[] };
const oldBySlug = new Map((oldManifest.reports ?? []).map((report) => [report.entitySlug, report]));
const workRoot = await mkdtemp(join(tmpdir(), "bestaiagent-agent-scan-"));
const completed: Array<ExistingScan | null> = Array(targets.length).fill(null);
const failures: Array<{ slug: string; repository: string; reason: string }> = [];
let targetIndex = 0;

async function worker() {
  while (true) {
    const index = targetIndex++;
    if (index >= targets.length) return;
    const target = targets[index];
    try { completed[index] = await scanTarget(target, workRoot); }
    catch (error) {
      failures.push({
        slug: target.slug,
        repository: target.repository,
        reason: error instanceof Error ? error.message.slice(0, 240) : "Unknown scan error"
      });
    }
  }
}

try {
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, targets.length) }, () => worker()));
} finally {
  await rm(workRoot, { recursive: true, force: true });
}

if (completed.every((report) => report === null) && failures.length > 0) {
  throw new Error("No repositories scanned successfully; the existing report manifest was left unchanged.");
}

const reports = targets.flatMap((target, index) => {
  const current = completed[index];
  return current ? [current] : oldBySlug.has(target.slug) ? [oldBySlug.get(target.slug)!] : [];
});
const manifest = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  methodology: "Heuristic source-pattern scan; publication remains manual and separate from identity evidence.",
  reports,
  failures
};
await writeFile(output, `${JSON.stringify(manifest, null, 2)}\n`);

const outputPath = process.env.GITHUB_OUTPUT;
if (outputPath) await appendFile(outputPath, `count=${reports.length}\nfailures=${failures.length}\n`);
console.log(`Scanned ${targets.length} repositories; ${reports.length} report(s) available; ${failures.length} refresh failure(s).`);
if (failures.length) console.warn(JSON.stringify(failures));
