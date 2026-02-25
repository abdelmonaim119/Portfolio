import Link from "next/link";
import Image from "next/image";
import type { ProjectListItem } from "@/lib/projects";

export default function ProjectCard({ project }: { project: ProjectListItem }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-paper-200 bg-white">
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="relative aspect-[16/9] w-full bg-ink-950">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-contain"
            quality={100}
            unoptimized
            sizes="(min-width: 1280px) 560px, (min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
        <div className="p-5">
          <h3 className="text-base font-semibold tracking-tight text-ink-950">{project.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-800">{project.shortDescription}</p>
          {project.tools.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tools.slice(0, 4).map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-paper-200 bg-paper-100 px-3 py-1 text-[11px] font-medium text-ink-900"
                >
                  {t}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
