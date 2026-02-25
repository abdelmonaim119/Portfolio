import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-paper-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="text-sm font-semibold tracking-tight text-ink-950">
          Portfolio
        </Link>
        <nav className="flex items-center gap-5">
          <Link href="/portfolio" className="text-sm font-medium text-ink-800 hover:text-ink-950">
            Portfolio
          </Link>
          <Link href="/#skills" className="text-sm font-medium text-ink-800 hover:text-ink-950">
            Deliverables
          </Link>
          <Link href="/#case-studies" className="text-sm font-medium text-ink-800 hover:text-ink-950">
            Case Studies
          </Link>
          <Link href="/#contact" className="text-sm font-medium text-ink-800 hover:text-ink-950">
            Contact
          </Link>
          <Link href="/admin" className="text-sm font-medium text-ink-800 hover:text-ink-950">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
