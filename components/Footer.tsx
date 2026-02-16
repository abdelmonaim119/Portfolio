export default function Footer() {
  return (
    <footer className="border-t border-paper-200 bg-white">
      <div className="mx-auto max-w-5xl px-5 py-8 text-sm text-ink-800 sm:px-8">
        <p>© {new Date().getFullYear()} Portfolio</p>
      </div>
    </footer>
  );
}

