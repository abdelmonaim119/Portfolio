import { notFound } from "next/navigation";
import ProjectForm from "@/components/ProjectForm";
import { getProjectById } from "@/lib/projects";
import { extractProjectSections } from "@/lib/projectContent";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);
  if (!project) notFound();

  const sections = extractProjectSections(project.content);

  const formProject = {
    id: project.id,
    title: project.title,
    slug: project.slug,
    shortDescription: project.shortDescription,
    description: sections.description || project.content,
    date: sections.date ?? "",
    externalLink: sections.externalLink ?? "",
    videos: sections.videos ? sections.videos.join("\n") : "",
    objective: sections.objective ?? "",
    process: sections.process ?? "",
    results: sections.results ?? "",
    lessons: sections.lessons ?? "",
    tools: project.tools,
    featured: project.featured,
    coverImage: project.coverImage,
    gallery: project.gallery
  };

  return (
    <div className="rounded-2xl border border-paper-200 bg-white p-6">
      <h2 className="text-base font-semibold tracking-tight text-ink-950">Edit Project</h2>
      <div className="mt-6">
        <ProjectForm mode="edit" project={formProject} />
      </div>
    </div>
  );
}
