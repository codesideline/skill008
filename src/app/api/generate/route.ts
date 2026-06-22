import { createClient } from "@/lib/supabase/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  generateSkillFromDescription,
  generateSkillFromScreenshot,
  generateSkillFromFrames,
  type GeneratedSkill,
} from "@/lib/generate";
import { getQuotaStatus, freeQuotaForEmail } from "@/lib/quota";
import { scanForSecrets } from "@/lib/secret-scan";
import { NextResponse } from "next/server";

type GenerateBody = {
  type?: string;
  description?: string;
  screenshot?: string;
  mediaType?: string;
  frames?: string[];
  note?: string;
};

// Preferred path: run the model on a Supabase Edge Function (API key stays a
// Supabase secret). Returns null on any failure so the caller can fall back.
async function generateViaEdge(
  supabase: SupabaseClient,
  body: GenerateBody,
): Promise<GeneratedSkill | null> {
  try {
    const { data, error } = await supabase.functions.invoke("generate", {
      body,
    });
    if (error || !data?.skill) return null;
    return data.skill as GeneratedSkill;
  } catch {
    return null;
  }
}

// Fallback path: generate inside the Next.js runtime (original behaviour).
async function generateLocally(body: GenerateBody): Promise<GeneratedSkill> {
  const { type, description, screenshot, mediaType, frames, note } = body;
  if (type === "description") {
    return generateSkillFromDescription(description!);
  }
  if (type === "screenshot") {
    return generateSkillFromScreenshot(
      screenshot!,
      (mediaType as "image/png") || "image/png",
    );
  }
  if (type === "recording") {
    return generateSkillFromFrames(
      frames!,
      (mediaType as "image/jpeg") || "image/jpeg",
      typeof note === "string" ? note : undefined,
    );
  }
  throw new Error("Invalid type");
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Quota is computed in Postgres (skill_quota_status), with an app-side
  // fallback. Checked here so we never spend Anthropic tokens over quota.
  const quota = await getQuotaStatus(supabase, user.id, user.email);
  if (!quota.can_create) {
    const isWorkEmail = freeQuotaForEmail(user.email) === 5;
    return NextResponse.json(
      {
        error: "Free skill limit reached",
        limit: quota.quota,
        message: isWorkEmail
          ? `You've used all ${quota.quota} free skills. Purchase additional skills for $7 each.`
          : `You've used all ${quota.quota} free skills. Sign up with a work email for more, or purchase for $7 each.`,
      },
      { status: 403 },
    );
  }

  const body: GenerateBody = await request.json();
  const { type, description, screenshot, frames } = body;

  if (
    !type ||
    (type === "description" && !description) ||
    (type === "screenshot" && !screenshot) ||
    (type === "recording" && (!Array.isArray(frames) || frames.length === 0))
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  try {
    const generated =
      (await generateViaEdge(supabase, body)) ?? (await generateLocally(body));

    // Secret scan the output
    const scan = scanForSecrets(generated.markdown);
    if (!scan.passed) {
      return NextResponse.json(
        {
          error: "Secret detected in generated output. Generation blocked.",
          findings: scan.findings,
        },
        { status: 422 },
      );
    }

    return NextResponse.json({
      skill: generated,
      criteria_confirmation: generated.criteria,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Generation failed";
    console.error("Generation error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
