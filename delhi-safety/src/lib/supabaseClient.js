import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const forceMock = import.meta.env.VITE_USE_MOCK_DATA === 'true'

export const isSupabaseConfigured = Boolean(url && anonKey) && !forceMock

// If Supabase env vars aren't set (e.g. local demo, or you haven't wired up
// your ERP's database yet), the app silently keeps using src/data/mockData.js.
// Once you create a Supabase project and run supabase/schema.sql, set
// VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY in .env and set
// VITE_USE_MOCK_DATA=false to switch the app to live data.
export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null

// --- Data access layer -----------------------------------------------------
// Every page imports from here rather than calling mockData / supabase
// directly, so swapping mock -> live data later doesn't touch page code.

import * as mock from '../data/mockData.js'

export async function fetchLocations() {
  if (!isSupabaseConfigured) return mock.locations
  const { data, error } = await supabase.from('locations').select('*, risk_scores(*)')
  if (error) throw error
  return data
}

export async function fetchSummaryStats() {
  if (!isSupabaseConfigured) return mock.summaryStats
  // In production this would likely call a Postgres function / view
  // (e.g. `select * from summary_stats_view`) rather than aggregating client-side.
  const { data, error } = await supabase.from('summary_stats_view').select('*').single()
  if (error) throw error
  return data
}

export async function fetchCrimeTrends() {
  if (!isSupabaseConfigured) return mock.crimeTrends
  const { data, error } = await supabase.from('crime_trends_monthly').select('*')
  if (error) throw error
  return data
}

export async function fetchDistrictRisk() {
  if (!isSupabaseConfigured) return mock.districtRisk
  const { data, error } = await supabase.from('district_risk_view').select('*')
  if (error) throw error
  return data
}

export async function fetchRetrainingHistory() {
  if (!isSupabaseConfigured) return mock.retrainingHistory
  const { data, error } = await supabase
    .from('model_runs')
    .select('*')
    .order('date', { ascending: false })
  if (error) throw error
  return data
}

export async function uploadDataset(file) {
  if (!isSupabaseConfigured) {
    // Local/demo mode: just simulate success.
    return { success: true, mock: true, filename: file.name }
  }
  const path = `uploads/${Date.now()}_${file.name}`
  const { error } = await supabase.storage.from('crime-datasets').upload(path, file)
  if (error) throw error
  return { success: true, path }
}

export async function triggerRetrainingPipeline() {
  if (!isSupabaseConfigured) {
    // Local/demo mode: no backend job runner wired up yet.
    return { success: true, mock: true }
  }
  // In production, wire this to a Supabase Edge Function that kicks off
  // the model retraining job and writes a row into `model_runs`.
  const { data, error } = await supabase.functions.invoke('trigger-retraining')
  if (error) throw error
  return data
}
