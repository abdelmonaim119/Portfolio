export type ProjectSections = {
  description: string;
  date: string | null;
  externalLink: string | null;
  videos: string[] | null;
  objective: string | null;
  process: string | null;
  results: string | null;
  lessons: string | null;
};

function normalizeKey(raw: string) {
  const k = raw.trim().toLowerCase();
  if (k === "date") return "date";
  if (k === "external link" || k === "link" || k === "external") return "externalLink";
  if (k === "videos" || k === "video" || k === "video links") return "videos";
  if (k === "objective" || k === "problem" || k === "problem statement") return "objective";
  if (k === "process" || k === "methodology" || k === "execution") return "process";
  if (k === "results" || k === "outcomes" || k === "impact") return "results";
  if (k === "lessons" || k === "lessons learned" || k === "innovations") return "lessons";
  return null;
}

export function extractProjectSections(content: string): ProjectSections {
  const lines = content.split(/\r?\n/);
  const buckets: Record<string, string[]> = {};
  const descriptionLines: string[] = [];

  let current: string | null = null;
  let startedStructured = false;

  for (const rawLine of lines) {
    const line = rawLine.replace(/\s+$/g, "");
    const m = line.match(/^([A-Za-z][A-Za-z ]{1,30}):\s*(.*)$/);
    if (m) {
      const key = normalizeKey(m[1]);
      if (key) {
        startedStructured = true;
        current = key;
        buckets[current] = buckets[current] ?? [];
        const rest = (m[2] ?? "").trim();
        if (rest) buckets[current].push(rest);
        continue;
      }
    }

    if (!startedStructured) {
      descriptionLines.push(rawLine);
      continue;
    }

    if (current) {
      buckets[current] = buckets[current] ?? [];
      buckets[current].push(rawLine);
    }
  }

  const desc = descriptionLines.join("\n").trim();

  const getBlock = (k: string) => {
    const v = (buckets[k] ?? []).join("\n").trim();
    return v ? v : null;
  };

  const parseLinks = (raw: string | null) => {
    if (!raw) return null;
    const links = raw
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean)
      .filter((s) => s.startsWith("http://") || s.startsWith("https://"));
    return links.length ? links : null;
  };

  return {
    description: desc,
    date: getBlock("date"),
    externalLink: getBlock("externalLink"),
    videos: parseLinks(getBlock("videos")),
    objective: getBlock("objective"),
    process: getBlock("process"),
    results: getBlock("results"),
    lessons: getBlock("lessons")
  };
}

export function buildProjectContent(input: Omit<ProjectSections, "description"> & { description: string }) {
  const parts: string[] = [];
  const description = input.description.trim();
  if (description) parts.push(description);

  const blocks: Array<[string, string | null]> = [
    ["Date", input.date],
    ["Objective", input.objective],
    ["Process", input.process],
    ["Results", input.results],
    ["Lessons Learned", input.lessons],
    ["Videos", input.videos && input.videos.length ? input.videos.join("\n") : null],
    ["External Link", input.externalLink]
  ];

  const anyMeta = blocks.some(([, v]) => (v ?? "").trim());
  if (!anyMeta) return parts.join("\n\n");

  parts.push("");

  for (const [label, value] of blocks) {
    const v = (value ?? "").trim();
    if (!v) continue;
    if (label === "Date" || label === "External Link") {
      parts.push(`${label}: ${v}`);
      parts.push("");
      continue;
    }
    parts.push(`${label}:`);
    parts.push(v);
    parts.push("");
  }

  return parts.join("\n").trim();
}
