export const dynamic = "force-dynamic";
import ProjectForm from "@/components/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="rounded-2xl border border-paper-200 bg-white p-6">
      <h2 className="text-base font-semibold tracking-tight text-ink-950">Add Project</h2>
      <div className="mt-6">
        <ProjectForm mode="create" />
      </div>
    </div>
  );
}

