-- Skill008 - store downloadable SKILL.md bundles in Storage.
-- Raw screenshots and recordings are never stored (privacy stance); only the
-- generated, secret-scanned markdown the user already sees on screen.
-- Objects are keyed as {owner_id}/{skill_id}.md and access is owner-scoped.

insert into storage.buckets (id, name, public)
values ('skill-exports', 'skill-exports', false)
on conflict (id) do nothing;

create policy "Owners read their own skill exports"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'skill-exports'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "Owners write their own skill exports"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'skill-exports'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "Owners update their own skill exports"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'skill-exports'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  )
  with check (
    bucket_id = 'skill-exports'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "Owners delete their own skill exports"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'skill-exports'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
