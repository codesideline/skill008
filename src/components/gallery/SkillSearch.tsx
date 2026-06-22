"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Result = {
  id: string;
  title: string;
  vertical: string | null;
  goal: string;
  similarity: number;
};

export function SkillSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  async function runSearch(e: React.FormEvent) {
    e.preventDefault();
    const text = query.trim();
    if (!text) return;
    setLoading(true);
    setUnavailable(false);

    try {
      const supabase = createClient();
      const { data: emb, error: embError } = await supabase.functions.invoke(
        "embed",
        { body: { text } },
      );
      if (embError || !emb?.embedding) throw new Error("embed unavailable");

      const { data, error } = await supabase.rpc("match_skills", {
        query_embedding: emb.embedding,
        match_count: 12,
        similarity_threshold: 0.2,
      });
      if (error) throw error;

      setResults((data as Result[]) ?? []);
    } catch {
      setResults(null);
      setUnavailable(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mb-12">
      <form onSubmit={runSearch} className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search skills by what you want to get done..."
          className="w-full rounded-xl border border-[#E7DFCD] bg-white px-4 py-3 text-sm focus:border-[#F5B62B] focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="rounded-xl bg-[#20201E] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      <p className="mt-2 font-mono text-xs text-[#8a8478]">
        Semantic search, powered by pgvector and a Supabase Edge Function.
      </p>

      {unavailable && (
        <p className="mt-4 text-sm text-[#8a8478]">
          Search isn&apos;t available right now. Browse the starter packs below.
        </p>
      )}

      {results && results.length === 0 && !unavailable && (
        <p className="mt-4 text-sm text-[#8a8478]">
          No close matches yet. Try different words, or browse the packs below.
        </p>
      )}

      {results && results.length > 0 && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {results.map((r) => (
            <Link
              key={r.id}
              href={`/share/${r.id}`}
              className="block rounded-xl border border-[#E7DFCD] bg-white p-5 shadow-sm transition-colors hover:border-[#F5B62B]"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold">{r.title}</h3>
                <span className="font-mono text-xs text-[#C9512C]">
                  {Math.round(r.similarity * 100)}%
                </span>
              </div>
              {r.goal && <p className="mt-1 text-sm text-[#6E685D]">{r.goal}</p>}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
