"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/admin" })}
      className="inline-flex items-center justify-center rounded-xl border border-paper-200 bg-white px-4 py-2 text-sm font-medium text-ink-950 hover:bg-paper-100"
    >
      Sign Out
    </button>
  );
}

