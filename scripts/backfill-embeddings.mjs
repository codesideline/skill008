// Backfill pgvector embeddings for any skills that don't have one yet
// (starter packs, plus skills created before embeddings were wired in).
//
// Usage:
//   NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... \
//     node scripts/backfill-embeddings.mjs
//
// The service role key is required because starter skills have no owner, so
// only the service role can update their rows (RLS denies anon/authenticated).

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the environment.",
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey);

const { data: skills, error } = await supabase
  .from("skills")
  .select("id, title, structured_json")
  .is("embedding", null);

if (error) {
  console.error("Failed to list skills:", error.message);
  process.exit(1);
}

console.log(`Embedding ${skills.length} skill(s) with no vector...`);

for (const s of skills) {
  const text = [s.title, s.structured_json?.goal, s.structured_json?.criteria]
    .filter(Boolean)
    .join("\n");

  const { data: emb, error: embErr } = await supabase.functions.invoke("embed", {
    body: { text },
  });

  if (embErr || !emb?.embedding) {
    console.warn(`  skip ${s.id}: ${embErr?.message ?? "no embedding returned"}`);
    continue;
  }

  const { error: upErr } = await supabase
    .from("skills")
    .update({ embedding: emb.embedding })
    .eq("id", s.id);

  console.log(upErr ? `  fail ${s.id}: ${upErr.message}` : `  ok   ${s.title}`);
}

console.log("Done.");
