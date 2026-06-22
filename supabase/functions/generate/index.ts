// generate - turns a task description, screenshot, or screen recording into a
// portable AI agent skill by calling Anthropic from a Supabase Edge Function.
// The Next.js route authenticates the user and checks quota, then delegates the
// heavy model call here, keeping the API key as a Supabase secret on the edge.

import { corsHeaders } from "../_shared/cors.ts";
import {
  type GeneratedSkill,
  renderSkillMarkdown,
  SYSTEM_PROMPT,
} from "../_shared/skill.ts";

const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY") ?? "";
const MODEL = Deno.env.get("ANTHROPIC_MODEL") ?? "claude-sonnet-4-6";

type ContentBlock = Record<string, unknown>;

async function callAnthropic(
  content: string | ContentBlock[],
  maxTokens = 4096,
): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content }],
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Anthropic API ${res.status}: ${detail}`);
  }

  const data = await res.json();
  const first = data?.content?.[0];
  return first && first.type === "text" ? first.text : "";
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (!ANTHROPIC_API_KEY) {
    return json({ error: "ANTHROPIC_API_KEY is not configured" }, 500);
  }

  try {
    const body = await req.json();
    const { type, description, screenshot, mediaType, frames, note } = body;

    let userContent: string | ContentBlock[];

    if (type === "description") {
      if (!description) return json({ error: "description is required" }, 400);
      userContent = `Generate a skill from this task description:\n\n${description}`;
    } else if (type === "screenshot") {
      if (!screenshot) return json({ error: "screenshot is required" }, 400);
      userContent = [
        {
          type: "image",
          source: {
            type: "base64",
            media_type: mediaType || "image/png",
            data: screenshot,
          },
        },
        {
          type: "text",
          text:
            "Analyze this screenshot. Identify the task, the application shown, the filter criteria or report logic visible, and generate a skill. Extract criteria VERBATIM from what you see (field names, operators, values). Be precise.",
        },
      ];
    } else if (type === "recording") {
      if (!Array.isArray(frames) || frames.length === 0) {
        return json({ error: "frames are required" }, 400);
      }
      const images = frames.slice(0, 8).map((data: string) => ({
        type: "image",
        source: {
          type: "base64",
          media_type: mediaType || "image/jpeg",
          data,
        },
      }));
      const noteLine = note && String(note).trim()
        ? `\n\nThe person also described what they are doing: "${
          String(note).trim()
        }". Use it to disambiguate the workflow, but extract concrete criteria from the frames.`
        : "";
      userContent = [
        ...images,
        {
          type: "text",
          text:
            "These frames are a screen recording of someone doing a task, in time order. Reconstruct the workflow: which app(s) they use, the filter or selection criteria visible, and each step in order. Then generate a skill. Extract criteria, field names, operators, and thresholds verbatim where you can see them." +
            noteLine,
        },
      ];
    } else {
      return json({ error: "invalid type" }, 400);
    }

    const text = await callAnthropic(userContent);
    const structured = JSON.parse(text);
    const markdown = renderSkillMarkdown(structured);
    const skill: GeneratedSkill = { ...structured, markdown };

    return json({ skill });
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
