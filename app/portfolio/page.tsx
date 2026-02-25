import { listProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const projects = await listProjects();

  return (
    <div className="px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">Portfolio</h1>
          <p className="text-sm text-ink-800">Selected work and recent projects.</p>
        </div>

        {projects.length > 0 ? (
          <div className="mt-7 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <div className="mt-7 rounded-2xl border border-paper-200 bg-white p-6">
            <p className="text-sm text-ink-800">
              No projects are currently available. If you already added projects, check database
              connectivity and `DATABASE_URL` configuration.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
