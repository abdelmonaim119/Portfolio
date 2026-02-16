"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function AdminLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setBusy(true);

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false
    });

    setBusy(false);

    if (!res || res.error) {
      setError("Invalid credentials.");
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-ink-950" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-2 w-full rounded-xl border border-paper-200 bg-white px-3 py-2 text-sm outline-none focus:border-ink-800"
          autoComplete="username"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink-950" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="mt-2 w-full rounded-xl border border-paper-200 bg-white px-3 py-2 text-sm outline-none focus:border-ink-800"
          autoComplete="current-password"
          required
        />
      </div>

      {error ? <p className="text-sm font-medium text-red-700">{error}</p> : null}

      <button
        type="submit"
        disabled={busy}
        className="inline-flex w-full items-center justify-center rounded-xl bg-ink-950 px-4 py-2 text-sm font-medium text-white hover:bg-ink-900 disabled:opacity-60"
      >
        Sign In
      </button>
    </form>
  );
}

