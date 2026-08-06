-- HG Care — job application store
-- ---------------------------------------------------------------------------
-- Run this once in your Supabase project:  Dashboard → SQL Editor → paste → Run.
-- It creates the `applications` table (private), plus a ready-made
-- `language_counts` report so you can see how many applicants speak each
-- language without writing any SQL — just open it in the Table Editor.
-- ---------------------------------------------------------------------------

create extension if not exists "pgcrypto";

create table if not exists public.applications (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),

  -- A few columns pulled out for easy scanning / filtering / reporting…
  first_name      text,
  surname         text,
  email           text,
  mobile          text,
  availability    text,
  areas           text[] default '{}',
  shift_hours     text[] default '{}',
  languages       text[] default '{}',
  right_to_work   text,
  driving_licence text,

  -- …and the complete submission (every field) kept here as a backup.
  data            jsonb not null
);

create index if not exists applications_created_at_idx on public.applications (created_at desc);
create index if not exists applications_languages_idx  on public.applications using gin (languages);

-- Lock the table down. With RLS on and no policies, the public/anon API can
-- read nothing. The server uses the SERVICE ROLE key, which bypasses RLS, so
-- application inserts from the website still work.
alter table public.applications enable row level security;

-- Zero-SQL language report. `security_invoker = on` means it respects the
-- table's RLS, so it's only visible to you in the dashboard, never to the
-- public API. Open it in the Table Editor to see the counts.
create or replace view public.language_counts
  with (security_invoker = on) as
select lang as language, count(*)::int as speakers
from public.applications, unnest(languages) as lang
group by lang
order by speakers desc, language;

-- ---------------------------------------------------------------------------
-- Editable settings (e.g. who receives application emails). Managed from the
-- admin area. Private like everything else — only the server (service role)
-- can read/write it.
-- ---------------------------------------------------------------------------
create table if not exists public.app_settings (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.app_settings enable row level security;
