// embed - returns a 384-dimension gte-small embedding for a piece of text.
// Runs entirely inside Supabase using the built-in Edge Runtime AI model, so
// semantic search never leaves the platform and needs no third-party API.

import { corsHeaders } from "../_shared/cors.ts";

// The `Supabase` global is injected by the Edge Runtime at execution time.
// deno-lint-ignore no-explicit-any
declare const Supabase: any;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { text } = await req.json();
    if (!text || typeof text !== "string") {
      return json({ error: "text is required" }, 400);
    }

    const session = new Supabase.ai.Session("gte-small");
    const embedding: number[] = await session.run(text, {
      mean_pool: true,
      normalize: true,
    });

    return json({ embedding });
  } catch (err) {
    return json(
      { error: err instanceof Error ? err.message : String(err) },
      500,
    );
  }
});

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
