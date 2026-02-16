import { listProjects } from "@/lib/projects";
import { deleteProject } from "@/app/actions/projects";

export default async function AdminPage() {
  const projects = await listProjects();

  return (
    <div className="rounded-2xl border border-paper-200 bg-white">
      <div className="border-b border-paper-200 px-5 py-4">
        <h2 className="text-sm font-semibold text-ink-950">Projects</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-paper-100 text-left text-ink-800">
            <tr>
              <th className="px-5 py-3 font-medium">Title</th>
              <th className="px-5 py-3 font-medium">Slug</th>
              <th className="px-5 py-3 font-medium">Featured</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-t border-paper-200">
                <td className="px-5 py-3 font-medium text-ink-950">{p.title}</td>
                <td className="px-5 py-3 text-ink-800">{p.slug}</td>
                <td className="px-5 py-3 text-ink-800">{p.featured ? "Yes" : "No"}</td>
                <td className="px-5 py-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={`/admin/projects/edit/${p.id}`}
                      className="text-sm font-medium text-ink-950 hover:underline"
                    >
                      Edit
                    </a>
                    <form action={deleteProject}>
                      <input type="hidden" name="id" value={p.id} />
                      <button
                        type="submit"
                        className="text-sm font-medium text-red-700 hover:underline"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 ? (
              <tr className="border-t border-paper-200">
                <td className="px-5 py-6 text-ink-800" colSpan={4}>
                  No projects yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
