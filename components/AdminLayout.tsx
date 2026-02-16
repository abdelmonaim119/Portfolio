import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
            <p className="text-sm text-ink-800">Manage projects.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center justify-center rounded-xl bg-ink-950 px-4 py-2 text-sm font-medium text-white hover:bg-ink-900"
            >
              Add Project
            </Link>
            <SignOutButton />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
