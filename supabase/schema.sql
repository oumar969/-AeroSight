create extension if not exists pgcrypto;

create table if not exists public.inspection_requests (
  id uuid primary key default gen_random_uuid(),
  turbine_count integer not null check (turbine_count > 0 and turbine_count <= 100000),
  location text not null check (char_length(location) between 2 and 300),
  services text[] not null default '{}',
  contact_name text not null check (char_length(contact_name) between 2 and 150),
  contact_email text not null check (char_length(contact_email) between 3 and 320),
  locale text not null check (locale in ('da', 'en')),
  status text not null default 'new' check (status in ('new', 'contacted', 'quote_sent', 'closed')),
  privacy_version text not null,
  consent_at timestamptz not null,
  notification_sent_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.inspection_requests enable row level security;

create index if not exists inspection_requests_created_at_idx
  on public.inspection_requests (created_at desc);

comment on table public.inspection_requests is
  'AeroSight inspection enquiries. Access is server-side only through the service role.';
