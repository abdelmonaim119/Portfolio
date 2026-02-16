"use client";

import Link from "next/link";
import Image from "next/image";
import { useFormState, useFormStatus } from "react-dom";
import { createProject, updateProject, type ProjectActionState } from "@/app/actions/projects";

type ProjectFormProject = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  date: string;
  externalLink: string;
  videos: string;
  objective: string;
  process: string;
  results: string;
  lessons: string;
  tools: string[];
  featured: boolean;
  coverImage: string;
  gallery: string[];
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-xl bg-ink-950 px-4 py-2 text-sm font-medium text-white hover:bg-ink-900 disabled:opacity-60"
    >
      {label}
    </button>
  );
}

export default function ProjectForm({
  mode,
  project
}: {
  mode: "create" | "edit";
  project?: ProjectFormProject;
}) {
  const initialState: ProjectActionState = { error: null };
  const [state, formAction] = useFormState(
    mode === "create" ? createProject : updateProject,
    initialState
  );

  return (
    <form action={formAction} encType="multipart/form-data" className="space-y-6">
      {mode === "edit" ? <input type="hidden" name="id" value={project?.id ?? ""} /> : null}
      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-ink-950" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            defaultValue={project?.title ?? ""}
            required
            className="mt-2 w-full rounded-xl border border-paper-200 bg-white px-3 py-2 text-sm outline-none focus:border-ink-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink-950" htmlFor="slug">
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            defaultValue={project?.slug ?? ""}
            required
            pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
            className="mt-2 w-full rounded-xl border border-paper-200 bg-white px-3 py-2 text-sm outline-none focus:border-ink-800"
          />
          <p className="mt-2 text-xs text-ink-800">Lowercase letters, numbers, and hyphens only.</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink-950" htmlFor="shortDescription">
          Short Description
        </label>
        <input
          id="shortDescription"
          name="shortDescription"
          defaultValue={project?.shortDescription ?? ""}
          required
          className="mt-2 w-full rounded-xl border border-paper-200 bg-white px-3 py-2 text-sm outline-none focus:border-ink-800"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink-950" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={project?.description ?? ""}
          required
          rows={10}
          className="mt-2 w-full rounded-xl border border-paper-200 bg-white px-3 py-2 text-sm outline-none focus:border-ink-800"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-ink-950" htmlFor="date">
            Date
          </label>
          <input
            id="date"
            name="date"
            defaultValue={project?.date ?? ""}
            className="mt-2 w-full rounded-xl border border-paper-200 bg-white px-3 py-2 text-sm outline-none focus:border-ink-800"
          />
          <p className="mt-2 text-xs text-ink-800">Format: YYYY-MM-DD</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-950" htmlFor="externalLink">
            External Link
          </label>
          <input
            id="externalLink"
            name="externalLink"
            defaultValue={project?.externalLink ?? ""}
            className="mt-2 w-full rounded-xl border border-paper-200 bg-white px-3 py-2 text-sm outline-none focus:border-ink-800"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink-950" htmlFor="videos">
          Video Links (optional)
        </label>
        <textarea
          id="videos"
          name="videos"
          defaultValue={project?.videos ?? ""}
          rows={4}
          className="mt-2 w-full rounded-xl border border-paper-200 bg-white px-3 py-2 text-sm outline-none focus:border-ink-800"
        />
        <p className="mt-2 text-xs text-ink-800">One URL per line. Only http(s) links are kept.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-ink-950" htmlFor="objective">
            Objective / Problem Statement
          </label>
          <textarea
            id="objective"
            name="objective"
            defaultValue={project?.objective ?? ""}
            rows={5}
            className="mt-2 w-full rounded-xl border border-paper-200 bg-white px-3 py-2 text-sm outline-none focus:border-ink-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-950" htmlFor="process">
            Process / Methodology
          </label>
          <textarea
            id="process"
            name="process"
            defaultValue={project?.process ?? ""}
            rows={5}
            className="mt-2 w-full rounded-xl border border-paper-200 bg-white px-3 py-2 text-sm outline-none focus:border-ink-800"
          />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-ink-950" htmlFor="results">
            Results / Outcomes
          </label>
          <textarea
            id="results"
            name="results"
            defaultValue={project?.results ?? ""}
            rows={5}
            className="mt-2 w-full rounded-xl border border-paper-200 bg-white px-3 py-2 text-sm outline-none focus:border-ink-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-950" htmlFor="lessons">
            Lessons Learned / Innovations
          </label>
          <textarea
            id="lessons"
            name="lessons"
            defaultValue={project?.lessons ?? ""}
            rows={5}
            className="mt-2 w-full rounded-xl border border-paper-200 bg-white px-3 py-2 text-sm outline-none focus:border-ink-800"
          />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-ink-950" htmlFor="tools">
            Tools
          </label>
          <input
            id="tools"
            name="tools"
            defaultValue={project?.tools?.join(", ") ?? ""}
            className="mt-2 w-full rounded-xl border border-paper-200 bg-white px-3 py-2 text-sm outline-none focus:border-ink-800"
          />
          <p className="mt-2 text-xs text-ink-800">Comma-separated.</p>
        </div>

        <div className="flex items-end">
          <label className="inline-flex items-center gap-2 text-sm font-medium text-ink-950">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={project?.featured ?? false}
              className="h-4 w-4 rounded border-paper-200 text-ink-950 focus:ring-ink-800"
            />
            Featured
          </label>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-ink-950" htmlFor="coverImage">
            Cover Image {mode === "create" ? "(required)" : "(optional)"}
          </label>
          <input
            id="coverImage"
            name="coverImage"
            type="file"
            accept="image/*"
            required={mode === "create"}
            className="mt-2 w-full rounded-xl border border-paper-200 bg-white px-3 py-2 text-sm"
          />
          {mode === "edit" && project?.coverImage ? (
            <div className="mt-3 overflow-hidden rounded-xl border border-paper-200 bg-paper-100">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={project.coverImage}
                  alt="Current cover"
                  fill
                  className="object-cover"
                  unoptimized
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
              </div>
            </div>
          ) : null}
        </div>

        <div>
          <label className="block text-sm font-medium text-ink-950" htmlFor="gallery">
            Gallery Images (optional)
          </label>
          <input
            id="gallery"
            name="gallery"
            type="file"
            accept="image/*"
            multiple
            className="mt-2 w-full rounded-xl border border-paper-200 bg-white px-3 py-2 text-sm"
          />
          {mode === "edit" && project?.gallery?.length ? (
            <div className="mt-3 rounded-xl border border-paper-200 bg-paper-50 p-3">
              <p className="text-xs font-medium text-ink-800">Current gallery (select to remove)</p>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {project.gallery.map((img) => (
                  <label key={img} className="block">
                    <div className="overflow-hidden rounded-lg border border-paper-200 bg-white">
                      <div className="relative aspect-square w-full">
                        <Image
                          src={img}
                          alt="Gallery image"
                          fill
                          className="object-contain"
                          unoptimized
                          sizes="(min-width: 1024px) 20vw, 40vw"
                        />
                      </div>
                    </div>
                    <span className="mt-2 inline-flex items-center gap-2 text-xs text-ink-900">
                      <input type="checkbox" name="removeGallery" value={img} />
                      Remove
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {state.error ? <p className="text-sm font-medium text-red-700">{state.error}</p> : null}

      <div className="flex flex-wrap items-center gap-3">
        <SubmitButton label={mode === "create" ? "Create Project" : "Save Changes"} />
        <Link
          href="/admin"
          className="inline-flex items-center justify-center rounded-xl border border-paper-200 bg-white px-4 py-2 text-sm font-medium text-ink-950 hover:bg-paper-100"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
