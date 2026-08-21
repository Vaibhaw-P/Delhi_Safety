-- ============================================================================
-- Delhi Safety Risk Intelligence — Supabase schema
-- Run this in Supabase SQL Editor (or `supabase db push`) on a fresh project.
-- ============================================================================

create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------------------------
-- locations: tourist sites, markets, transit hubs, etc. being monitored
-- ---------------------------------------------------------------------------
create table if not exists locations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  district text not null,
  category text,                 -- e.g. 'Tourist Landmark', 'Market', 'Transit Hub'
  latitude double precision not null,
  longitude double precision not null,
  footfall_level text,           -- 'Low' | 'Moderate' | 'High' | 'Very High'
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- crime_incidents: raw/ingested incident records (from CSV upload or API)
-- ---------------------------------------------------------------------------
create table if not exists crime_incidents (
  id uuid primary key default uuid_generate_v4(),
  location_id uuid references locations(id) on delete set null,
  category text not null,        -- 'Theft', 'Harassment', 'Assault', 'Cyber Fraud', ...
  severity smallint check (severity between 1 and 5),
  victim_gender text,            -- optional, used for women-safety-specific analytics
  incident_date date not null,
  incident_time time,
  source text,                   -- 'Delhi Police Open Data', 'Manual Upload', ...
  reported boolean default true,
  created_at timestamptz not null default now()
);

create index if not exists idx_incidents_location on crime_incidents(location_id);
create index if not exists idx_incidents_date on crime_incidents(incident_date);

-- ---------------------------------------------------------------------------
-- risk_scores: latest computed risk/safety scores per location
-- (one row per location; history is kept in risk_score_history)
-- ---------------------------------------------------------------------------
create table if not exists risk_scores (
  location_id uuid primary key references locations(id) on delete cascade,
  safety_score numeric(5,2) not null,      -- 0-100, higher = safer
  women_safety_index numeric(5,2),         -- 0-100, higher = safer for women
  risk_level text not null check (risk_level in ('low', 'moderate', 'high')),
  computed_at timestamptz not null default now()
);

create table if not exists risk_score_history (
  id uuid primary key default uuid_generate_v4(),
  location_id uuid references locations(id) on delete cascade,
  safety_score numeric(5,2) not null,
  women_safety_index numeric(5,2),
  risk_level text not null,
  computed_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- model_runs: retraining pipeline history (Admin Panel)
-- ---------------------------------------------------------------------------
create table if not exists model_runs (
  id uuid primary key default uuid_generate_v4(),
  date date not null default current_date,
  status text not null check (status in ('success', 'failed', 'running')),
  best_model text,
  accuracy numeric(5,2),
  precision_score numeric(5,2),
  recall_score numeric(5,2),
  f1_score numeric(5,2),
  duration_seconds integer,
  notes text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- search_queries: for "Recent Searches" widget / usage analytics
-- ---------------------------------------------------------------------------
create table if not exists search_queries (
  id uuid primary key default uuid_generate_v4(),
  query text not null,
  user_id uuid,              -- link to ERP's own auth.users / staff table
  searched_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Views used by the frontend data-access layer (src/lib/supabaseClient.js)
-- ---------------------------------------------------------------------------
create or replace view district_risk_view as
select
  l.district,
  round(avg(rs.safety_score), 1) as avg_safety_score,
  round(100 - avg(rs.safety_score), 1) as risk_score
from locations l
join risk_scores rs on rs.location_id = l.id
group by l.district;

create or replace view crime_trends_monthly as
select
  to_char(date_trunc('month', incident_date), 'Mon') as month,
  date_trunc('month', incident_date) as month_start,
  count(*) as incidents
from crime_incidents
group by 1, 2
order by 2;

create or replace view summary_stats_view as
select
  (select count(*) from locations) as total_locations,
  (select round(avg(safety_score), 0) from risk_scores) as avg_safety_score,
  (select count(*) from risk_scores where risk_level = 'high') as high_risk_areas,
  (select round(accuracy, 1) from model_runs where status = 'success' order by date desc limit 1) as model_accuracy;

-- ---------------------------------------------------------------------------
-- Row Level Security — enable and open read access for the anon key.
-- Tighten these policies once you wire this into your ERP's auth model
-- (e.g. restrict writes to an 'admin' role, restrict incident PII, etc).
-- ---------------------------------------------------------------------------
alter table locations enable row level security;
alter table crime_incidents enable row level security;
alter table risk_scores enable row level security;
alter table risk_score_history enable row level security;
alter table model_runs enable row level security;
alter table search_queries enable row level security;

create policy "Public read access" on locations for select using (true);
create policy "Public read access" on crime_incidents for select using (true);
create policy "Public read access" on risk_scores for select using (true);
create policy "Public read access" on risk_score_history for select using (true);
create policy "Public read access" on model_runs for select using (true);
create policy "Public read access" on search_queries for select using (true);

-- Writes restricted to authenticated service role by default (no insert
-- policy for anon). Add scoped policies here once ERP roles are defined, e.g:
-- create policy "Admins can insert" on crime_incidents for insert
--   to authenticated using (auth.jwt() ->> 'role' = 'admin');
