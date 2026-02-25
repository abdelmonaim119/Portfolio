import { prisma } from "@/lib/prisma";
import type { Project as PrismaProject } from "@prisma/client";

export type ProjectListItem = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  coverImage: string;
  tools: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type FeaturedProject = ProjectListItem & {
  content: string;
};

export type Project = Omit<PrismaProject, "tools" | "gallery"> & {
  tools: string[];
  gallery: string[];
};

export type PortfolioMetrics = {
  totalProjects: number;
  featuredProjects: number;
  uniqueTools: number;
  lastUpdated: Date | null;
};

function parseJsonStringArray(v: unknown): string[] {
  if (typeof v !== "string") return [];
  try {
    const parsed: unknown = JSON.parse(v);
    if (!Array.isArray(parsed)) return [];
    const out: string[] = [];
    for (const item of parsed) {
      if (typeof item === "string" && item.trim()) out.push(item);
    }
    return out;
  } catch {
    return [];
  }
}

function toListItem(row: {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  coverImage: string;
  tools: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}): ProjectListItem {
  return {
    ...row,
    tools: parseJsonStringArray(row.tools)
  };
}

function normalizeProject(p: PrismaProject): Project {
  return {
    ...p,
    tools: parseJsonStringArray(p.tools),
    gallery: parseJsonStringArray(p.gallery)
  };
}

async function withFallback<T>(query: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await query();
  } catch {
    return fallback;
  }
}

export async function listProjects(): Promise<ProjectListItem[]> {
  const rows = await withFallback(
    () =>
      prisma.project.findMany({
        select: {
          id: true,
          title: true,
          slug: true,
          shortDescription: true,
          coverImage: true,
          tools: true,
          featured: true,
          createdAt: true,
          updatedAt: true
        },
        orderBy: { createdAt: "desc" }
      }),
    []
  );
  return rows.map(toListItem);
}

export async function listFeaturedProjects(limit = 3): Promise<FeaturedProject[]> {
  const rows = await withFallback(
    () =>
      prisma.project.findMany({
        where: { featured: true },
        select: {
          id: true,
          title: true,
          slug: true,
          shortDescription: true,
          coverImage: true,
          tools: true,
          featured: true,
          createdAt: true,
          updatedAt: true,
          content: true
        },
        orderBy: [{ createdAt: "desc" }],
        take: limit
      }),
    []
  );
  return rows.map((row) => ({ ...toListItem(row), content: row.content }));
}

export async function getPortfolioMetrics(): Promise<PortfolioMetrics> {
  const [totalProjects, featuredProjects, toolRows] = await withFallback(
    () =>
      prisma.$transaction([
        prisma.project.count(),
        prisma.project.count({ where: { featured: true } }),
        prisma.project.findMany({
          select: {
            tools: true,
            updatedAt: true
          }
        })
      ]),
    [0, 0, [] as Array<{ tools: string; updatedAt: Date }>]
  );

  const uniqueTools = new Set<string>();
  let lastUpdated: Date | null = null;

  for (const row of toolRows) {
    for (const tool of parseJsonStringArray(row.tools)) uniqueTools.add(tool);
    if (!lastUpdated || row.updatedAt.getTime() > lastUpdated.getTime()) {
      lastUpdated = row.updatedAt;
    }
  }

  return {
    totalProjects,
    featuredProjects,
    uniqueTools: uniqueTools.size,
    lastUpdated
  };
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const row = await withFallback(
    () =>
      prisma.project.findUnique({
        where: { slug }
      }),
    null
  );
  return row ? normalizeProject(row) : null;
}

export async function getProjectById(id: string): Promise<Project | null> {
  const row = await withFallback(
    () =>
      prisma.project.findUnique({
        where: { id }
      }),
    null
  );
  return row ? normalizeProject(row) : null;
}
