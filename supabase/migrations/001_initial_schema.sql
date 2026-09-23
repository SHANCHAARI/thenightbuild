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
  'Aetherform Audio Engine',
  'aetherform-audio-engine',
  'Real-time generative spatial audio canvas for ambient producers & sound sculptors.',
  'An unconventional web-based modular sound synthesizer and spatializer engineered during our midnight workshop. Built for music tech researchers and ambient electronic musicians, Aetherform lets creators position audio nodes in 3D binaural space with zero perceptible latency.',
  array['Client Site', 'Interactive Web App'],
  array['Next.js', 'Web Audio API', 'Three.js', 'Tailwind CSS', 'TypeScript'],
  'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1600&auto=format&fit=crop',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'https://aetherform.thenightbuild.dev',
  true
),
(
  'Chronos: Distributed Kernel Visualizer',
  'chronos-kernel-visualizer',
  'Interactive visual debugger for multi-core memory barrier races & Raft consensus.',
  'A final-year CS Capstone build turned open-source benchmark. Chronos models hardware concurrency, cache coherence lines, and distributed state machines in a high-fidelity visual replay canvas that universities now use in advanced operating systems labs.',
  array['Student Project', 'CS Capstone'],
  array['Rust (Wasm)', 'React', 'Canvas API', 'TypeScript', 'Web Workers'],
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop',
  null,
  'https://chronos-kernel.thenightbuild.dev',
  true
),
(
  'Vesperal Atelier',
  'vesperal-atelier',
  'High-contrast digital archive and e-commerce artifact for a bespoke Tokyo ceramics kiln.',
  'Rejected the cookie-cutter Shopify template for a Japanese ceramic craft atelier. We engineered a sculptural, tactile digital exhibition with custom GLSL lighting passes reacting to cursor proximity, reproducing the glazes of wood-fired pottery.',
  array['Client Site'],
  array['Next.js', 'WebGL', 'Shopify Storefront API', 'Tailwind CSS'],
  'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1600&auto=format&fit=crop',
  null,
  'https://vesperal.thenightbuild.dev',
  true
),
(
  'Komorebi Neural Shader Lab',
  'komorebi-shader-lab',
  'Procedural light-refraction playground exploring dynamic raymarched caustics.',
  'An experimental concept build exploring procedural organic mathematics. Users construct GLSL fragment shaders using intuitive node graphs and render interactive lighting calculations in real-time at 60 FPS on mobile GPUs.',
  array['Concept Build', 'Creative Coding'],
  array['Three.js', 'GLSL', 'TypeScript', 'Vite', 'Framer Motion'],
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop',
  null,
  'https://komorebi.thenightbuild.dev',
  false
),
(
  'Boreal Bioacoustics Sentinel',
  'boreal-bioacoustics',
  'Edge-AI avian migration telemetry platform monitoring sub-arctic boreal ecosystems.',
  'A joint CS + Forestry senior capstone deployment. Pairs Solar LoRa edge sensors in northern Canada with a real-time spectrogram ingestion dashboard to identify rare songbird frequencies and early migratory anomalies.',
  array['Student Project', 'CS Capstone'],
  array['Next.js', 'Python FastAPI', 'WebSockets', 'Chart.js', 'Tailwind CSS'],
  'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1600&auto=format&fit=crop',
  null,
  'https://boreal-sentinel.thenightbuild.dev',
  true
);
