-- Skill008 - semantic search over public skills with pgvector.
-- Embeddings are produced by the `embed` Edge Function (built-in gte-small,
-- 384 dimensions) so search stays inside Supabase end to end.

create extension if not exists vector schema extensions;

alter table public.skills
  add column if not exists embedding extensions.vector(384);

-- Cosine-distance HNSW index for fast nearest-neighbour search.
create index if not exists skills_embedding_idx
  on public.skills
  using hnsw (embedding extensions.vector_cosine_ops);

-- Nearest public skills to a query embedding. Runs with the caller's rights,
-- so RLS keeps private skills out of results; the explicit visibility filter
-- is belt-and-suspenders.
create or replace function public.match_skills(
  query_embedding extensions.vector(384),
  match_count integer default 12,
  similarity_threshold double precision default 0.3
)
returns table (
  id uuid,
  title text,
  vertical text,
  goal text,
  similarity double precision
)
language sql
stable
set search_path = public, extensions
as $$
  select
    s.id,
    s.title,
    s.vertical,
    coalesce(s.structured_json->>'goal', '') as goal,
    1 - (s.embedding <=> query_embedding) as similarity
  from public.skills s
  where s.embedding is not null
    and (s.visibility in ('public', 'unlisted') or s.is_starter = true)
    and 1 - (s.embedding <=> query_embedding) > similarity_threshold
  order by s.embedding <=> query_embedding
  limit match_count;
$$;

grant execute on function public.match_skills(extensions.vector, integer, double precision)
  to anon, authenticated;
