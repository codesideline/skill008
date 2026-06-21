"use client";

import { createClient } from "@/lib/supabase/client";
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
    <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-mono text-lg font-bold text-white">
            skill<span className="text-[#c8f040]">008</span>
          </h1>
          <p className="text-sm text-zinc-500 mt-2">Skills, issued.</p>
        </div>

        {sent ? (
          <div className="bg-[#141418] border border-zinc-800 rounded-lg p-6 text-center">
            <p className="text-white font-medium mb-2">Check your email</p>
            <p className="text-sm text-zinc-400">
              We sent a magic link to <span className="text-white">{email}</span>.
              Click it to sign in.
            </p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="bg-[#141418] border border-zinc-800 rounded-lg p-6 space-y-4">
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-wider text-zinc-500 mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="w-full bg-[#0a0a0c] border border-zinc-800 rounded px-3 py-2.5 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#c8f040] transition-colors"
                />
              </div>

              {error && (
                <p className="text-sm text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#c8f040] text-[#0a0a0c] font-semibold py-2.5 rounded text-sm hover:bg-[#a0c030] transition-colors disabled:opacity-50"
              >
                {loading ? "Sending..." : "Sign in with magic link"}
              </button>
            </div>

            <p className="text-xs text-zinc-600 text-center">
              No password needed. We send a one-time link to your email.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
