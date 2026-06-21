import { createClient } from "@/lib/supabase/server";
import {
  generateSkillFromDescription,
  generateSkillFromScreenshot,
  generateSkillFromFrames,
} from "@/lib/generate";
import { scanForSecrets } from "@/lib/secret-scan";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check rate limit (simple DB-based counter)
  const { count } = await supabase
    .from("skills")
    .select("*", { count: "exact", head: true })
    .eq("owner_id", user.id);

  // Determine quota based on email type
  const isWorkEmail = !user.email?.match(
    /@(gmail|yahoo|hotmail|outlook|aol|icloud|protonmail|mail)\./i
  );
  const maxFreeSkills = isWorkEmail ? 5 : 3;

  if ((count ?? 0) >= maxFreeSkills) {
    return NextResponse.json(
      {
        error: "Free skill limit reached",
        limit: maxFreeSkills,
        message: isWorkEmail
          ? "You've used all 5 free skills. Purchase additional skills for $7 each."
          : "You've used all 3 free skills. Sign up with a work email for 5, or purchase for $7 each.",
      },
      { status: 403 }
    );
  }

  const body = await request.json();
  const { type, description, screenshot, mediaType, frames, note } = body;

  if (
    !type ||
    (type === "description" && !description) ||
    (type === "screenshot" && !screenshot) ||
    (type === "recording" && (!Array.isArray(frames) || frames.length === 0))
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    let generated;

    if (type === "description") {
      generated = await generateSkillFromDescription(description);
    } else if (type === "screenshot") {
      generated = await generateSkillFromScreenshot(
        screenshot,
        mediaType || "image/png"
      );
    } else if (type === "recording") {
      generated = await generateSkillFromFrames(
        frames,
        mediaType || "image/jpeg",
        typeof note === "string" ? note : undefined
      );
    } else {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    // Secret scan the output
    const scan = scanForSecrets(generated.markdown);
    if (!scan.passed) {
      return NextResponse.json(
        {
          error: "Secret detected in generated output. Generation blocked.",
          findings: scan.findings,
        },
        { status: 422 }
      );
    }

    // Return the generated skill for confirmation (don't save yet)
    return NextResponse.json({
      skill: generated,
      criteria_confirmation: generated.criteria,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Generation failed";
    console.error("Generation error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
