-- Velqora Agency — Phase 2A Contact Inquiries Schema
-- Run this SQL in the Supabase Dashboard -> SQL Editor.
-- Inquiries are reviewed through the authenticated Supabase Dashboard (Table Editor);
-- there is no public admin page or public read/edit/delete API.

create extension if not exists pgcrypto;

create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 1 and 120),
  email text not null check (char_length(trim(email)) between 3 and 254),
  service_interest text not null check (char_length(trim(service_interest)) between 1 and 120),
  message text not null check (char_length(trim(message)) between 1 and 4000),
  privacy_consent boolean not null check (privacy_consent = true),
  created_at timestamptz not null default now()
);

-- Enable Row-Level Security (RLS).
-- No public SELECT, INSERT, UPDATE, or DELETE policies are created.
-- Inserts are performed exclusively by the server-side Next.js API route
-- using the server-only SUPABASE_SERVICE_ROLE_KEY.
alter table public.contact_inquiries enable row level security;

-- Allow only the server-side service_role to insert inquiries.
-- Public (anon / authenticated) roles remain blocked from reading, inserting, updating, or deleting.
grant usage on schema public to service_role;
grant insert on table public.contact_inquiries to service_role;
