export default function Section({
  id,
  title,
  description,
  children
}: {
  id?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-5xl scroll-mt-24">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold tracking-tight text-ink-950">{title}</h2>
        {description ? <p className="text-sm text-ink-800">{description}</p> : null}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

