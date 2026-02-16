import Image from "next/image";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/projects";
import ProjectGallery from "@/components/ProjectGallery";
import { extractProjectSections } from "@/lib/projectContent";

export const revalidate = 120;

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  const sections = extractProjectSections(project.content);

  return (
    <div className="px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">{project.title}</h1>
          <p className="text-base text-ink-800">{project.shortDescription}</p>
          {sections.date ? <p className="text-sm font-medium text-ink-800">{sections.date}</p> : null}
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-paper-200 bg-white">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 896px, 100vw"
              priority
            />
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="whitespace-pre-wrap leading-relaxed text-ink-950/90">
              {sections.description || project.content}
            </p>

            {(sections.objective || sections.process || sections.results || sections.lessons) ? (
              <div className="mt-10 grid gap-7">
                {sections.objective ? (
                  <div>
                    <h2 className="text-sm font-semibold tracking-tight text-ink-950">Objective</h2>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-ink-950/90">
                      {sections.objective}
                    </p>
                  </div>
                ) : null}
                {sections.process ? (
                  <div>
                    <h2 className="text-sm font-semibold tracking-tight text-ink-950">Process</h2>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-ink-950/90">
                      {sections.process}
                    </p>
                  </div>
                ) : null}
                {sections.results ? (
                  <div>
                    <h2 className="text-sm font-semibold tracking-tight text-ink-950">Results</h2>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-ink-950/90">
                      {sections.results}
                    </p>
                  </div>
                ) : null}
                {sections.lessons ? (
                  <div>
                    <h2 className="text-sm font-semibold tracking-tight text-ink-950">Lessons Learned</h2>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-ink-950/90">
                      {sections.lessons}
                    </p>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
          <aside className="rounded-2xl border border-paper-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-ink-950">Tools</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tools.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-paper-200 bg-paper-100 px-3 py-1 text-xs font-medium text-ink-900"
                >
                  {t}
                </li>
              ))}
            </ul>
            {sections.videos && sections.videos.length > 0 ? (
              <div className="mt-6">
                <h2 className="text-sm font-semibold text-ink-950">Videos</h2>
                <ul className="mt-3 space-y-2">
                  {sections.videos.map((v) => (
                    <li key={v}>
                      <a
                        href={v}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium text-ink-800 hover:text-ink-950 hover:underline break-words"
                      >
                        {v}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {sections.externalLink ? (
              <div className="mt-6">
                <h2 className="text-sm font-semibold text-ink-950">External Link</h2>
                <a
                  href={sections.externalLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-sm font-medium text-ink-800 hover:text-ink-950 hover:underline break-words"
                >
                  {sections.externalLink}
                </a>
              </div>
            ) : null}
          </aside>
        </div>

        {project.gallery.length > 0 ? (
          <div className="mt-10">
            <h2 className="text-lg font-semibold tracking-tight">Gallery</h2>
            <div className="mt-4">
              <ProjectGallery title={project.title} images={project.gallery} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
