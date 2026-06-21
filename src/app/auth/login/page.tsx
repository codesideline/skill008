"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F3E9] px-4 text-[#20201E]">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="font-mono text-lg font-bold tracking-tight">
            skill
            <span className="ml-0.5 rounded bg-[#F5B62B] px-1 text-[#20201E]">008</span>
          </Link>
          <p className="mt-3 text-sm text-[#6E685D]">
            Sign in to train your next agent.
          </p>
        </div>

        {sent ? (
          <div className="rounded-2xl border border-[#E7DFCD] bg-white p-6 text-center shadow-sm">
            <p className="mb-2 font-semibold">Check your email</p>
            <p className="text-sm text-[#6E685D]">
              We sent a magic link to{" "}
              <span className="font-medium text-[#20201E]">{email}</span>. Click
              it to sign in.
            </p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-4 rounded-2xl border border-[#E7DFCD] bg-white p-6 shadow-sm">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-[#8a8478]"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@work.com"
                  required
                  className="w-full rounded-lg border border-[#E7DFCD] bg-[#F7F3E9] px-3 py-2.5 text-sm placeholder:text-[#a8a294] focus:border-[#F5B62B] focus:outline-none"
                />
              </div>

              {error && <p className="text-sm text-[#C9512C]">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-[#F5B62B] py-2.5 text-sm font-semibold text-[#20201E] shadow-sm transition-colors hover:bg-[#E7A618] disabled:opacity-50"
              >
                {loading ? "Sending..." : "Email me a magic link"}
              </button>
            </div>

            <p className="text-center text-xs text-[#8a8478]">
              No password needed. We send a one-time link to your email.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
