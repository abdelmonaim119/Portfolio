import Image from "next/image";

export default function ProjectGallery({ title, images }: { title: string; images: string[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {images.map((src) => (
        <div
          key={src}
          className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-paper-200 bg-white"
        >
          <Image
            src={src}
            alt={`${title} image`}
            fill
            className="object-cover"
            quality={95}
            sizes="(min-width: 1024px) 448px, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      ))}
    </div>
  );
}
