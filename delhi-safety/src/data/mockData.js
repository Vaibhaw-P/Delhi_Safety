// Mock dataset for local development / demo purposes.
// Replace with live Supabase queries once real Delhi Police / NCRB data is ingested
// (see src/lib/supabaseClient.js and supabase/schema.sql).

export const locations = [
  { id: 1, name: 'Connaught Place', district: 'New Delhi', lat: 28.6315, lng: 77.2167, category: 'Commercial / Tourist', safetyScore: 78, riskLevel: 'moderate', womenSafetyIndex: 71, footfall: 'Very High' },
  { id: 2, name: 'India Gate', district: 'New Delhi', lat: 28.6129, lng: 77.2295, category: 'Tourist Landmark', safetyScore: 88, riskLevel: 'low', womenSafetyIndex: 84, footfall: 'Very High' },
  { id: 3, name: 'Chandni Chowk', district: 'North Delhi', lat: 28.6506, lng: 77.2303, category: 'Market / Heritage', safetyScore: 52, riskLevel: 'high', womenSafetyIndex: 45, footfall: 'Very High' },
  { id: 4, name: 'Hauz Khas Village', district: 'South Delhi', lat: 28.5535, lng: 77.1996, category: 'Nightlife / Tourist', safetyScore: 61, riskLevel: 'moderate', womenSafetyIndex: 56, footfall: 'High' },
  { id: 5, name: 'Karol Bagh', district: 'Central Delhi', lat: 28.6519, lng: 77.1909, category: 'Market', safetyScore: 58, riskLevel: 'moderate', womenSafetyIndex: 51, footfall: 'High' },
  { id: 6, name: 'Lajpat Nagar', district: 'South Delhi', lat: 28.5677, lng: 77.2431, category: 'Market', safetyScore: 55, riskLevel: 'moderate', womenSafetyIndex: 49, footfall: 'High' },
  { id: 7, name: 'Dwarka Sector 21', district: 'West Delhi', lat: 28.5521, lng: 77.0589, category: 'Residential / Transit', safetyScore: 74, riskLevel: 'low', womenSafetyIndex: 69, footfall: 'Moderate' },
  { id: 8, name: 'Nehru Place', district: 'South Delhi', lat: 28.5494, lng: 77.2515, category: 'Commercial', safetyScore: 49, riskLevel: 'high', womenSafetyIndex: 42, footfall: 'High' },
  { id: 9, name: 'Qutub Minar', district: 'South Delhi', lat: 28.5245, lng: 77.1855, category: 'Tourist Landmark', safetyScore: 85, riskLevel: 'low', womenSafetyIndex: 80, footfall: 'High' },
  { id: 10, name: 'Lotus Temple', district: 'South East Delhi', lat: 28.5535, lng: 77.2588, category: 'Tourist Landmark', safetyScore: 90, riskLevel: 'low', womenSafetyIndex: 87, footfall: 'Moderate' },
  { id: 11, name: 'Cyber Hub, Gurgaon', district: 'Gurgaon', lat: 28.4950, lng: 77.0890, category: 'Commercial / Nightlife', safetyScore: 72, riskLevel: 'moderate', womenSafetyIndex: 66, footfall: 'Very High' },
  { id: 12, name: 'Sector 18, Noida', district: 'Noida', lat: 28.5697, lng: 77.3260, category: 'Commercial / Market', safetyScore: 69, riskLevel: 'moderate', womenSafetyIndex: 63, footfall: 'High' },
  { id: 13, name: 'Paharganj', district: 'Central Delhi', lat: 28.6448, lng: 77.2167, category: 'Budget Tourist / Transit', safetyScore: 41, riskLevel: 'high', womenSafetyIndex: 34, footfall: 'Very High' },
  { id: 14, name: 'Rajouri Garden', district: 'West Delhi', lat: 28.6492, lng: 77.1225, category: 'Market / Residential', safetyScore: 66, riskLevel: 'moderate', womenSafetyIndex: 60, footfall: 'Moderate' },
  { id: 15, name: 'Vasant Kunj', district: 'South West Delhi', lat: 28.5200, lng: 77.1590, category: 'Residential / Mall', safetyScore: 80, riskLevel: 'low', womenSafetyIndex: 76, footfall: 'Moderate' },
  { id: 16, name: 'New Delhi Railway Station', district: 'Central Delhi', lat: 28.6430, lng: 77.2200, category: 'Transit Hub', safetyScore: 38, riskLevel: 'high', womenSafetyIndex: 31, footfall: 'Very High' },
]

export const safestLocations = [...locations].sort((a, b) => b.safetyScore - a.safetyScore).slice(0, 5)
export const highestRiskLocations = [...locations].sort((a, b) => a.safetyScore - b.safetyScore).slice(0, 5)

export const summaryStats = {
  totalLocations: locations.length,
  avgSafetyScore: Math.round(locations.reduce((s, l) => s + l.safetyScore, 0) / locations.length),
  highRiskAreas: locations.filter((l) => l.riskLevel === 'high').length,
  modelAccuracy: 91.4,
}

// Monthly incident counts (mock, aggregate across all tracked locations)
export const crimeTrends = [
  { month: 'Jan', incidents: 612 },
  { month: 'Feb', incidents: 588 },
  { month: 'Mar', incidents: 645 },
  { month: 'Apr', incidents: 701 },
  { month: 'May', incidents: 733 },
  { month: 'Jun', incidents: 690 },
  { month: 'Jul', incidents: 758 },
  { month: 'Aug', incidents: 810 },
  { month: 'Sep', incidents: 772 },
  { month: 'Oct', incidents: 695 },
  { month: 'Nov', incidents: 660 },
  { month: 'Dec', incidents: 720 },
]

export const districtRisk = [
  { district: 'Central Delhi', riskScore: 68 },
  { district: 'North Delhi', riskScore: 61 },
  { district: 'South Delhi', riskScore: 42 },
  { district: 'West Delhi', riskScore: 38 },
  { district: 'East Delhi', riskScore: 55 },
  { district: 'Gurgaon', riskScore: 34 },
  { district: 'Noida', riskScore: 36 },
]

export const crimeCategories = [
  { category: 'Theft / Chain Snatching', count: 284 },
  { category: 'Eve-teasing / Harassment', count: 231 },
  { category: 'Vehicle Theft', count: 176 },
  { category: 'Cyber Fraud', count: 152 },
  { category: 'Assault', count: 98 },
  { category: 'Molestation', count: 74 },
  { category: 'Other', count: 61 },
]

export const recentSearches = [
  { id: 1, query: 'Connaught Place', timestamp: '2026-08-19T18:22:00Z' },
  { id: 2, query: 'Chandni Chowk', timestamp: '2026-08-19T14:05:00Z' },
  { id: 3, query: 'Cyber Hub, Gurgaon', timestamp: '2026-08-18T09:41:00Z' },
]

// Retraining / model pipeline history for Admin Panel
export const retrainingHistory = [
  { id: 1, date: '2026-08-15', status: 'success', bestModel: 'XGBoost', accuracy: 91.4, duration: '4m 12s' },
  { id: 2, date: '2026-08-01', status: 'success', bestModel: 'Random Forest', accuracy: 89.7, duration: '3m 48s' },
  { id: 3, date: '2026-07-18', status: 'failed', bestModel: '—', accuracy: null, duration: '0m 52s' },
  { id: 4, date: '2026-07-01', status: 'success', bestModel: 'XGBoost', accuracy: 88.9, duration: '4m 05s' },
]

export const datasetStats = {
  totalRecords: 18420,
  dateRange: 'Jan 2023 – Aug 2026',
  lastUpload: '2026-08-15',
  sources: ['Delhi Police Open Data', 'NCRB District Reports (mock)', 'Manual Admin Uploads'],
}

// Model performance detail
export const modelMetrics = {
  accuracy: 91.4,
  precision: 89.2,
  recall: 87.6,
  f1Score: 88.4,
  aucRoc: 0.94,
}

export const modelComparison = [
  { model: 'XGBoost', accuracy: 91.4 },
  { model: 'Random Forest', accuracy: 89.7 },
  { model: 'Logistic Regression', accuracy: 79.3 },
  { model: 'Neural Network (MLP)', accuracy: 87.1 },
  { model: 'SVM', accuracy: 81.6 },
]

export const featureImportance = [
  { feature: 'Time of day', importance: 0.24 },
  { feature: 'Historical incident density', importance: 0.21 },
  { feature: 'Footfall / crowd density', importance: 0.17 },
  { feature: 'Lighting infrastructure', importance: 0.13 },
  { feature: 'Distance to police post', importance: 0.11 },
  { feature: 'Day of week', importance: 0.08 },
  { feature: 'Public transit proximity', importance: 0.06 },
]

export function riskLevelColor(level) {
  if (level === 'low') return '#2fd480'
  if (level === 'moderate') return '#f5a623'
  return '#ef4a5c'
}
