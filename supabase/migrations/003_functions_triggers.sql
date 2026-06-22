-- Skill008 - quota and maintenance logic, enforced in Postgres.
-- Moves the free-skill quota out of the application layer and into the
-- database so the rule holds no matter which client writes a skill.

-- ============================================================================
-- updated_at maintenance
-- ============================================================================
create extension if not exists moddatetime schema extensions;

drop trigger if exists skills_set_updated_at on public.skills;
create trigger skills_set_updated_at
  before update on public.skills
  for each row
  execute function extensions.moddatetime(updated_at);

-- ============================================================================
-- Free-skill quota
-- Work email = 5 free skills, personal email = 3. Each purchase adds one.
-- ============================================================================
create or replace function public.free_skill_quota(p_owner uuid)
returns integer
language sql
stable
security definer
set search_path = public, auth
as $$
  select case
    when coalesce(
      (select email from auth.users where id = p_owner)
        ~* '@(gmail|yahoo|hotmail|outlook|aol|icloud|protonmail|mail)\.',
      true
    )
    then 3   -- personal or unknown
    else 5   -- work
  end;
$$;

-- Read-only status the app calls before spending Anthropic tokens.
-- Always scoped to the caller (auth.uid()); cannot probe other users.
create or replace function public.skill_quota_status()
returns table (used integer, quota integer, can_create boolean)
language sql
stable
security definer
set search_path = public, auth
as $$
  with me as (select auth.uid() as uid),
  u as (
    select count(*)::int as used
    from public.skills, me
    where owner_id = me.uid and is_starter = false
  ),
  q as (
    select (
      public.free_skill_quota((select uid from me))
      + coalesce((select count(*) from public.purchases, me where owner_id = me.uid), 0)
    )::int as quota
  )
  select u.used, q.quota, u.used < q.quota
  from u, q;
$$;

-- Hard stop at the database layer.
create or replace function public.enforce_skill_quota()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_used  integer;
  v_quota integer;
begin
  if new.is_starter then
    return new;  -- seeded starter packs bypass the quota
  end if;

  select count(*) into v_used
  from public.skills
  where owner_id = new.owner_id and is_starter = false;

  v_quota := public.free_skill_quota(new.owner_id)
    + coalesce((select count(*) from public.purchases where owner_id = new.owner_id), 0);

  if v_used >= v_quota then
    raise exception 'skill_quota_exceeded: % of % free skills used', v_used, v_quota
      using errcode = 'P0001';
  end if;

  return new;
end;
$$;

drop trigger if exists skills_enforce_quota on public.skills;
create trigger skills_enforce_quota
  before insert on public.skills
  for each row
  execute function public.enforce_skill_quota();

grant execute on function public.skill_quota_status() to authenticated;
