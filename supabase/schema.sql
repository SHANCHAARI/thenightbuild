-- =============================================================================
-- Nightbuild Studio — Supabase schema
-- Run this in Supabase Dashboard → SQL Editor → New query → paste → Run.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- agent_messages: persists Night Agent chat history per browser session.
-- The chat widget (src/components/FloatingAgent.tsx) saves every message here
-- and restores it on reload, so chats survive refreshes and device switches
-- (as long as the same session id is present in localStorage).
-- -----------------------------------------------------------------------------
create table if not exists public.agent_messages (
  id         uuid primary key default gen_random_uuid(),
  session_id text  not null,
  sender     text  not null check (sender in ('user', 'agent')),
  text       text  not null,
  created_at timestamptz not null default now()
);

create index if not exists agent_messages_session_idx
  on public.agent_messages (session_id, created_at);

-- -----------------------------------------------------------------------------
-- Row Level Security
-- The widget uses the public anon key (no login), so policies are intentionally
-- open: chat content is a public support transcript, not private data.
-- NOTE: anyone with the anon key can read transcripts. Don't paste secrets
-- (passwords, OTPs, card numbers) into the chat.
-- -----------------------------------------------------------------------------
alter table public.agent_messages enable row level security;

drop policy if exists "anon can insert agent messages" on public.agent_messages;
create policy "anon can insert agent messages"
  on public.agent_messages for insert
  to anon
  with check (true);

drop policy if exists "anon can read agent messages" on public.agent_messages;
create policy "anon can read agent messages"
  on public.agent_messages for select
  to anon
  using (true);

-- -----------------------------------------------------------------------------
-- leads: already used by src/components/ContactForm.tsx via submitLead()
-- (src/lib/supabase.ts). Create it here too so the contact form works
-- the moment the Supabase keys are added.
-- -----------------------------------------------------------------------------
create table if not exists public.leads (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  email        text not null,
  project_type text not null,
  message      text not null,
  created_at   timestamptz not null default now()
);

alter table public.leads enable row level security;

drop policy if exists "anon can submit leads" on public.leads;
create policy "anon can submit leads"
  on public.leads for insert
  to anon
  with check (true);

-- No public read policy on leads — inquiries stay private (dashboard/SQL only).
