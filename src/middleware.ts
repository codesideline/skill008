import { updateSession } from "@/lib/supabase/middleware";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Skip Supabase session refresh if keys are not configured
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "your-anon-key-here" ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.startsWith("eyJ")
  ) {
    // Let the request pass through without auth
    const { NextResponse } = await import("next/server");
    return NextResponse.next();
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
