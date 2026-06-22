import type { SupabaseClient } from "@supabase/supabase-js";

export interface QuotaStatus {
  used: number;
  quota: number;
  can_create: boolean;
}

const PERSONAL_EMAIL =
  /@(gmail|yahoo|hotmail|outlook|aol|icloud|protonmail|mail)\./i;

export function freeQuotaForEmail(email: string | undefined): number {
  return email && !PERSONAL_EMAIL.test(email) ? 5 : 3;
}

// Quota now lives in Postgres (skill_quota_status RPC). We still keep an
// app-side fallback so the site behaves correctly during the window between a
// frontend deploy and the database migration being applied.
export async function getQuotaStatus(
  supabase: SupabaseClient,
  userId: string,
  email: string | undefined,
): Promise<QuotaStatus> {
  const { data, error } = await supabase.rpc("skill_quota_status").single();
  if (!error && data) {
    return data as QuotaStatus;
  }

  const { count } = await supabase
    .from("skills")
    .select("*", { count: "exact", head: true })
    .eq("owner_id", userId)
    .eq("is_starter", false);

  const quota = freeQuotaForEmail(email);
  const used = count ?? 0;
  return { used, quota, can_create: used < quota };
}

export function isQuotaError(message: string | undefined): boolean {
  return !!message && message.includes("skill_quota_exceeded");
}
