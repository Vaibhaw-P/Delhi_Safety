# Delhi Safety — Risk Intelligence Module

An AI-driven crime risk prediction module for Delhi NCR: heatmap, prediction
dashboard, admin panel (dataset upload + retraining), model performance
tracking, and an About page laying out the platform's stance on women's
safety, tourist safety, and public site security.

Built as a standalone React module so it can be embedded/iframed or ported
into a larger ERP shell later.

## Stack

- **Frontend:** React 18 + Vite, React Router, Recharts (charts), React-Leaflet (map)
- **Backend/DB:** Supabase (Postgres + Storage + Edge Functions) — falls back
  to local mock data automatically if not configured
- **Deployment:** Netlify (frontend) — see `netlify.toml`

## 1. Local setup

```bash
npm install
cp .env.example .env
npm run dev
```

The app runs at `http://localhost:5173`. With no `.env` values set (or
`VITE_USE_MOCK_DATA=true`), it runs entirely on the mock dataset in
`src/data/mockData.js` — no backend required. This is the fastest way to
demo it or plug it into the ERP shell for layout/integration testing.

## 2. Connecting Supabase (real data)

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL Editor, run `supabase/schema.sql` — this creates the
   `locations`, `crime_incidents`, `risk_scores`, `model_runs`, and
   `search_queries` tables, plus the views the frontend reads from
   (`district_risk_view`, `crime_trends_monthly`, `summary_stats_view`).
3. Copy your Project URL and anon public key from
   **Project Settings → API** into `.env`:
   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=xxxx
   VITE_USE_MOCK_DATA=false
   ```
4. Seed `locations` and `crime_incidents` with real (or your own mock) rows,
   then populate `risk_scores` — either manually at first, or from a model
   training script/notebook that writes scores back into Supabase.
5. Restart `npm run dev`. All data-fetching goes through
   `src/lib/supabaseClient.js`, so pages don't need to change.

**CSV upload (Admin Panel):** currently uploads go to Supabase Storage
bucket `crime-datasets` (create this bucket in Supabase Storage). Parsing
the CSV into `crime_incidents` rows and triggering retraining is left as a
Supabase Edge Function stub (`triggerRetrainingPipeline` in
`supabaseClient.js`) — wire this up to whatever training pipeline
(Python/XGBoost, etc.) you use.

## 3. Deploying to Netlify

```bash
npm run build      # outputs to /dist
```

Then either:
- Push this repo to GitHub and connect it in Netlify (**Build command:**
  `npm run build`, **Publish directory:** `dist` — already set in
  `netlify.toml`), or
- Drag-and-drop the `dist/` folder into Netlify's manual deploy.

Add your `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` as environment
variables in **Netlify → Site settings → Environment variables** so the
production build talks to your live Supabase project.

## 4. Embedding into the ERP

Two common integration paths:
- **Iframe embed:** deploy this as its own Netlify site and iframe the URL
  into the ERP's module frame. Simplest, fully decoupled.
- **Component import:** since it's plain React, `src/pages/*` and
  `src/components/*` can be copied into an existing React-based ERP
  frontend and mounted under its own router path — just bring
  `src/data`, `src/lib`, and the relevant CSS along.

## Project structure

```
src/
  components/     Sidebar, Layout, StatCard
  pages/          Home, Dashboard, CrimeHeatmap, AdminPanel, ModelPerformance, About
  data/           mockData.js — swap-in/out mock dataset
  lib/            supabaseClient.js — data access layer (mock ⇄ live switch)
supabase/
  schema.sql      Full Postgres schema, views, and RLS policies
```

## Notes on the current mock data

`src/data/mockData.js` contains 16 illustrative Delhi NCR locations with
made-up but plausible safety scores, a Women Safety Index per location,
monthly incident trends, district comparisons, and a model retraining
history. Replace this file's exports (or point `supabaseClient.js` at real
tables) once you have actual Delhi Police / NCRB data — no other file needs
to change since every page reads through the data-access functions in
`supabaseClient.js`.
