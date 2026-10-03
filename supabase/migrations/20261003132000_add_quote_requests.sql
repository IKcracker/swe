create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  quote_number text not null unique,
  full_name text not null,
  company_name text,
  email text not null,
  phone text not null,
  origin text not null,
  destination text not null,
  service_type text not null,
  package_count integer not null default 1 check (package_count > 0),
  weight_kg numeric(10,2) check (weight_kg is null or weight_kg >= 0),
  dimensions text,
  preferred_collection_date date,
  notes text,
  status text not null default 'NEW'
    check (status in ('NEW','REVIEWING','QUOTED','WON','LOST')),
  quoted_amount numeric(12,2) check (quoted_amount is null or quoted_amount >= 0),
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists quote_requests_status_created_idx
  on public.quote_requests (status, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists quote_requests_set_updated_at
on public.quote_requests;

create trigger quote_requests_set_updated_at
before update on public.quote_requests
for each row execute function public.set_updated_at();

alter table public.quote_requests enable row level security;

grant usage on schema public to service_role;
grant select, insert, update, delete
on public.quote_requests
to service_role;
