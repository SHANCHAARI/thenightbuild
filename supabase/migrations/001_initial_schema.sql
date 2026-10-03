-- ==============================================================================
-- Nightbuild Studio Database Schema
-- Migration: 001_initial_schema.sql
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. PROJECTS TABLE
-- ------------------------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  hook text not null,
  description text not null,
  tags text[] not null default '{}',
  tech_stack text[] not null default '{}',
  thumbnail_url text,
  video_embed_url text,
  live_url text,
  featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS) on projects
alter table public.projects enable row level security;

-- Policy: Anyone can read published projects
create policy "Allow public read access on projects"
  on public.projects
  for select
  using (true);

-- Policy: Only authenticated users (admins) can modify projects
create policy "Allow authenticated admin writes on projects"
  on public.projects
  for all
  to authenticated
  using (true)
  with check (true);

-- ------------------------------------------------------------------------------
-- 2. LEADS TABLE (Contact Inquiries)
-- ------------------------------------------------------------------------------
create table if not exists public.leads (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  project_type text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS) on leads
alter table public.leads enable row level security;

-- Policy: Anyone can submit an inquiry lead (public insert-only)
create policy "Allow public insert-only on leads"
  on public.leads
  for insert
  with check (true);

-- Policy: Only authenticated users (studio leads) can view or manage leads
create policy "Allow authenticated admins to read leads"
  on public.leads
  for select
  to authenticated
  using (true);

-- ------------------------------------------------------------------------------
-- SEED DATA (Flagship studio projects and capstone builds)
-- ------------------------------------------------------------------------------
insert into public.projects (title, slug, hook, description, tags, tech_stack, thumbnail_url, video_embed_url, live_url, featured)
values 
(
  'upGrade',
  'upgrade',
  'A ritual laboratory for human momentum — offline-first habit engine & focus tracking instrument with Dexie reactive storage, streak forgiveness, and tactile analytics.',
  'Conceived, designed, and coded by Nightbuild Studio, upGrade is an architectural instrument for daily life that replaces the predatory dopamine traps of conventional habit trackers with calm mathematical momentum. Built with an offline-first reactive Dexie (IndexedDB) architecture, zero-blue spectrometry (warm tactile linen by day, abyssal obsidian #050505 by night), rolling 28-day exponential decay scoring, procedural Web Audio acoustics, and seamless 1-click Supabase cloud backup.',
  array['Client Site', 'Concept Build'],
  array['React 19', 'TypeScript', 'Dexie.js (IndexedDB)', 'Tailwind CSS v4', 'Framer Motion', 'Supabase', 'Web Audio API', 'Vitest'],
  '/projects/upgrade/hero-dashboard.png',
  null,
  'https://upgrade-zeta.vercel.app/',
  true
);

