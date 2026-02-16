"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { saveImageUpload } from "@/lib/uploads";
import { buildProjectContent } from "@/lib/projectContent";

export type ProjectActionState = {
  error: string | null;
};

function slugIsValid(slug: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

function parseStringList(raw: string) {
  const parts = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return Array.from(new Set(parts));
}

function parseJsonStringArray(raw: string): string[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string" && item.length > 0);
  } catch {
    return [];
  }
}

export async function createProject(
  _prev: ProjectActionState,
  formData: FormData
): Promise<ProjectActionState> {
  await requireSession();

  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const shortDescription = String(formData.get("shortDescription") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim();
  const externalLink = String(formData.get("externalLink") ?? "").trim();
  const videosRaw = String(formData.get("videos") ?? "").trim();
  const objective = String(formData.get("objective") ?? "").trim();
  const process = String(formData.get("process") ?? "").trim();
  const results = String(formData.get("results") ?? "").trim();
  const lessons = String(formData.get("lessons") ?? "").trim();
  const tools = parseStringList(String(formData.get("tools") ?? ""));
  const featured = formData.get("featured") === "on";

  if (!title || !slug || !shortDescription || !description) {
    return { error: "Missing required fields." };
  }
  if (!slugIsValid(slug)) {
    return { error: "Invalid slug." };
  }

  const videos = videosRaw
    ? videosRaw
        .split(/\r?\n/)
        .map((s) => s.trim())
        .filter(Boolean)
        .filter((s) => s.startsWith("http://") || s.startsWith("https://"))
    : null;

  const content = buildProjectContent({
    description,
    date: date || null,
    externalLink: externalLink || null,
    videos,
    objective: objective || null,
    process: process || null,
    results: results || null,
    lessons: lessons || null
  });

  const cover = formData.get("coverImage");
  if (!(cover instanceof File) || cover.size === 0) {
    return { error: "Cover image is required." };
  }

  const existingSlug = await prisma.project.findUnique({ where: { slug } });
  if (existingSlug) {
    return { error: "Slug already exists." };
  }

  const galleryFiles = formData.getAll("gallery");
  const galleryUploads: string[] = [];
  for (const g of galleryFiles) {
    if (g instanceof File && g.size > 0) {
      try {
        galleryUploads.push(await saveImageUpload(g));
      } catch (e: unknown) {
        return { error: e instanceof Error ? e.message : "Invalid gallery image." };
      }
    }
  }

  let coverPath = "";
  try {
    coverPath = await saveImageUpload(cover);
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Invalid cover image." };
  }

  try {
    await prisma.project.create({
      data: {
        title,
        slug,
        shortDescription,
        content,
        coverImage: coverPath,
        gallery: JSON.stringify(galleryUploads),
        tools: JSON.stringify(tools),
        featured
      }
    });
  } catch (e) {
    return { error: "Failed to create project." };
  }

  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath(`/projects/${slug}`);
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateProject(
  _prev: ProjectActionState,
  formData: FormData
): Promise<ProjectActionState> {
  await requireSession();

  const id = String(formData.get("id") ?? "").trim();
  if (!id) return { error: "Missing project id." };

  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const shortDescription = String(formData.get("shortDescription") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim();
  const externalLink = String(formData.get("externalLink") ?? "").trim();
  const videosRaw = String(formData.get("videos") ?? "").trim();
  const objective = String(formData.get("objective") ?? "").trim();
  const process = String(formData.get("process") ?? "").trim();
  const results = String(formData.get("results") ?? "").trim();
  const lessons = String(formData.get("lessons") ?? "").trim();
  const tools = parseStringList(String(formData.get("tools") ?? ""));
  const featured = formData.get("featured") === "on";

  if (!title || !slug || !shortDescription || !description) {
    return { error: "Missing required fields." };
  }
  if (!slugIsValid(slug)) {
    return { error: "Invalid slug." };
  }

  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) {
    return { error: "Project not found." };
  }

  const videos = videosRaw
    ? videosRaw
        .split(/\r?\n/)
        .map((s) => s.trim())
        .filter(Boolean)
        .filter((s) => s.startsWith("http://") || s.startsWith("https://"))
    : null;

  const content = buildProjectContent({
    description,
    date: date || null,
    externalLink: externalLink || null,
    videos,
    objective: objective || null,
    process: process || null,
    results: results || null,
    lessons: lessons || null
  });

  if (slug !== existing.slug) {
    const slugTaken = await prisma.project.findUnique({ where: { slug } });
    if (slugTaken) return { error: "Slug already exists." };
  }

  const cover = formData.get("coverImage");
  let coverImage = existing.coverImage;
  if (cover instanceof File && cover.size > 0) {
    try {
      coverImage = await saveImageUpload(cover);
    } catch (e: unknown) {
      return { error: e instanceof Error ? e.message : "Invalid cover image." };
    }
  }

  const removeGallerySet = new Set(
    formData
      .getAll("removeGallery")
      .map((v) => String(v))
      .filter(Boolean)
  );

  const existingGallery = parseJsonStringArray(existing.gallery);
  const keptGallery = existingGallery.filter((img) => !removeGallerySet.has(img));

  const galleryFiles = formData.getAll("gallery");
  const newGallery: string[] = [];
  for (const g of galleryFiles) {
    if (g instanceof File && g.size > 0) {
      try {
        newGallery.push(await saveImageUpload(g));
      } catch (e: unknown) {
        return { error: e instanceof Error ? e.message : "Invalid gallery image." };
      }
    }
  }
  const gallery = JSON.stringify([...keptGallery, ...newGallery]);

  try {
    await prisma.project.update({
      where: { id },
      data: {
        title,
        slug,
        shortDescription,
        content,
        tools: JSON.stringify(tools),
        featured,
        coverImage,
        gallery
      }
    });
  } catch (e) {
    return { error: "Failed to update project." };
  }

  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath(`/projects/${existing.slug}`);
  revalidatePath(`/projects/${slug}`);
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteProject(
  formData: FormData
): Promise<void> {
  await requireSession();

  const id = String(formData.get("id") ?? "").trim();
  if (!id) throw new Error("Missing project id.");

  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) {
    throw new Error("Project not found.");
  }

  await prisma.project.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath(`/projects/${existing.slug}`);
  revalidatePath("/admin");
  redirect("/admin");
}
