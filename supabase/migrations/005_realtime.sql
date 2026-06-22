-- Skill008 - stream newly published public skills to the gallery in realtime.
-- Realtime honours RLS, so anonymous gallery subscribers only ever receive
-- rows the "Public skills are readable by anyone" policy already exposes.

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'skills'
  ) then
    alter publication supabase_realtime add table public.skills;
  end if;
end $$;
