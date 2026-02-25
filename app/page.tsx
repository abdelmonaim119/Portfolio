import Link from "next/link";
import { getPortfolioMetrics, listFeaturedProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import Section from "@/components/Section";
import { profile } from "@/lib/profile";
import { extractProjectSections } from "@/lib/projectContent";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const projects = await listFeaturedProjects(3);
  const metrics = await getPortfolioMetrics();

  return (
    <div className="px-5 py-12 sm:px-8">
      <section className="mx-auto max-w-5xl">
        <div className="rounded-2xl border border-paper-200 bg-white p-8 sm:p-10">
          <p className="text-sm font-medium text-ink-800">{profile.title}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {profile.name}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-950/90">
            {profile.summary}
          </p>
          <p className="mt-3 max-w-2xl text-sm text-ink-800">{profile.value}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center rounded-xl bg-ink-950 px-4 py-2 text-sm font-medium text-white hover:bg-ink-900"
            >
              View Portfolio
            </Link>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl border border-paper-200 bg-white px-4 py-2 text-sm font-medium text-ink-950 hover:bg-paper-100"
            >
              Contact
            </a>
          </div>
        </div>
      </section>

      <div className="mt-12 space-y-12">
        <Section
          title="Featured Projects"
          description="Latest featured work. Each project page includes problem, process, results, and documentation when available."
        >
          <div className="flex items-center justify-end">
            <Link href="/portfolio" className="text-sm font-medium text-ink-800 hover:text-ink-950">
              All Projects
            </Link>
          </div>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </Section>

        <Section
          id="skills"
          title="What I Deliver"
          description="Workflow automation, API integrations, AI-enhanced pipelines, and data processing systems."
        >
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-paper-200 bg-white p-6">
              <h3 className="text-sm font-semibold text-ink-950">Deliverables</h3>
              <ul className="mt-4 space-y-2">
                {profile.deliverables.map((item) => (
                  <li key={item} className="text-sm text-ink-950/90">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-paper-200 bg-white p-6">
              <h3 className="text-sm font-semibold text-ink-950">Industries</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {profile.industries.map((industry) => (
                  <li
                    key={industry}
                    className="rounded-full border border-paper-200 bg-paper-100 px-3 py-1 text-xs font-medium text-ink-900"
                  >
                    {industry}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section
          title="Engagement Process"
          description="Structured implementation flow from audit to documentation."
        >
          <div className="rounded-2xl border border-paper-200 bg-white p-6">
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {profile.engagementProcess.map((item) => (
                <li key={item.step} className="rounded-xl border border-paper-200 bg-paper-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-800">
                    Step {item.step}
                  </p>
                  <p className="mt-2 text-sm font-medium text-ink-950">{item.title}</p>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        <Section
          title="Result"
          description="Outcome-focused delivery with measurable operational impact."
        >
          <div className="rounded-2xl border border-paper-200 bg-white p-6">
            <p className="text-sm leading-relaxed text-ink-950/90">{profile.result}</p>
          </div>
        </Section>

        <Section
          id="case-studies"
          title="Case Studies"
          description="Deeper dives into featured projects: problem, solution, execution, and measurable outcomes where available."
        >
          <div className="grid gap-5">
            {projects.map((p) => {
              const sections = extractProjectSections(p.content);
              const hasDeepDive = Boolean(
                sections.objective || sections.process || sections.results || sections.lessons
              );

              return (
                <article key={p.id} className="rounded-2xl border border-paper-200 bg-white p-6">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base font-semibold tracking-tight text-ink-950">{p.title}</h3>
                    <p className="text-sm text-ink-800">{p.shortDescription}</p>
                  </div>

                  {hasDeepDive ? (
                    <div className="mt-5 grid gap-5 lg:grid-cols-2">
                      {sections.objective ? (
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wide text-ink-800">
                            Objective
                          </h4>
                          <p className="mt-2 whitespace-pre-wrap text-sm text-ink-950/90">
                            {sections.objective}
                          </p>
                        </div>
                      ) : null}
                      {sections.process ? (
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wide text-ink-800">
                            Process
                          </h4>
                          <p className="mt-2 whitespace-pre-wrap text-sm text-ink-950/90">
                            {sections.process}
                          </p>
                        </div>
                      ) : null}
                      {sections.results ? (
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wide text-ink-800">
                            Results
                          </h4>
                          <p className="mt-2 whitespace-pre-wrap text-sm text-ink-950/90">
                            {sections.results}
                          </p>
                        </div>
                      ) : null}
                      {sections.lessons ? (
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wide text-ink-800">
                            Lessons
                          </h4>
                          <p className="mt-2 whitespace-pre-wrap text-sm text-ink-950/90">
                            {sections.lessons}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  ) : null}

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="text-sm font-medium text-ink-950 hover:underline"
                    >
                      Read Project
                    </Link>
                    {sections.externalLink ? (
                      <a
                        href={sections.externalLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium text-ink-800 hover:underline"
                      >
                        External Link
                      </a>
                    ) : null}
                  </div>
                </article>
              );
            })}
            {projects.length === 0 ? (
              <div className="rounded-2xl border border-paper-200 bg-white p-6">
                <p className="text-sm text-ink-800">No featured projects yet.</p>
              </div>
            ) : null}
          </div>
        </Section>

        <Section
          title="Data and Metrics"
          description="Automatically computed from your current portfolio content."
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-paper-200 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-800">Projects</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-ink-950">
                {metrics.totalProjects}
              </p>
            </div>
            <div className="rounded-2xl border border-paper-200 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-800">Featured</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-ink-950">
                {metrics.featuredProjects}
              </p>
            </div>
            <div className="rounded-2xl border border-paper-200 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-800">
                Unique Tools
              </p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-ink-950">
                {metrics.uniqueTools}
              </p>
            </div>
            <div className="rounded-2xl border border-paper-200 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-800">
                Last Updated
              </p>
              <p className="mt-3 text-base font-semibold tracking-tight text-ink-950">
                {metrics.lastUpdated ? metrics.lastUpdated.toLocaleDateString() : "N/A"}
              </p>
            </div>
          </div>
        </Section>

        {profile.testimonials.length > 0 ? (
          <Section
            title="Testimonials"
            description="Selected references and endorsements."
          >
            <div className="grid gap-5 lg:grid-cols-2">
              {profile.testimonials.map((t) => (
                <figure key={`${t.source}:${t.quote}`} className="rounded-2xl border border-paper-200 bg-white p-6">
                  <blockquote className="text-sm leading-relaxed text-ink-950/90">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-4 text-sm font-semibold text-ink-950">
                    {t.href ? (
                      <a href={t.href} target="_blank" rel="noreferrer" className="hover:underline">
                        {t.source}
                      </a>
                    ) : (
                      t.source
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Section>
        ) : null}

        <Section
          title="Additional Resources"
          description="Code, articles, presentations, and other supporting material."
        >
          <div className="rounded-2xl border border-paper-200 bg-white p-6">
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link href="/portfolio" className="font-medium text-ink-950 hover:underline">
                  Browse All Projects
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="font-medium text-ink-950 hover:underline"
                >
                  Email Me
                </a>
              </li>
              {profile.resources.map((r) => (
                <li key={r.href}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-ink-950 hover:underline"
                  >
                    {r.label}
                  </a>
                  {r.note ? <span className="ml-2 text-ink-800">{r.note}</span> : null}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section
          title="FAQs"
          description="Common questions and concise answers."
        >
          <div className="space-y-3">
            {profile.faqs.map((f) => (
              <details
                key={f.question}
                className="group rounded-2xl border border-paper-200 bg-white px-6 py-4"
              >
                <summary className="cursor-pointer list-none text-sm font-semibold text-ink-950">
                  {f.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-950/90">{f.answer}</p>
              </details>
            ))}
          </div>
        </Section>

        <Section
          id="contact"
          title="Contact"
          description="Links and contact information."
        >
          <div className="rounded-2xl border border-paper-200 bg-white p-6">
            <p className="text-sm font-medium text-ink-950">Email</p>
            <a
              href={`mailto:${profile.contact.email}`}
              className="mt-2 inline-block text-sm font-medium text-ink-800 hover:text-ink-950 hover:underline"
            >
              {profile.contact.email}
            </a>
            {profile.contact.links.length > 0 ? (
              <div className="mt-5">
                <p className="text-sm font-medium text-ink-950">Links</p>
                <ul className="mt-3 flex flex-wrap gap-3">
                  {profile.contact.links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-xl border border-paper-200 bg-paper-100 px-4 py-2 text-sm font-medium text-ink-950 hover:bg-paper-200"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </Section>
      </div>
    </div>
  );
}
