import { useMemo, useState } from 'react'
import { Search, Download, Clock } from 'lucide-react'
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar,
} from 'recharts'
import {
  crimeTrends, districtRisk, crimeCategories, recentSearches, locations,
} from '../data/mockData.js'
import CountUp from '../components/CountUp.jsx'

const tooltipStyle = {
  background: '#10151f',
  border: '1px solid #1e2632',
  borderRadius: 8,
  fontSize: 12,
  color: '#eef1f6',
}

export default function Dashboard() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)

  const matches = useMemo(() => {
    if (!query.trim()) return []
    return locations.filter((l) => l.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
  }, [query])

  function handleAnalyze() {
    const found = locations.find((l) => l.name.toLowerCase() === query.toLowerCase()) || matches[0]
    setResult(found || null)
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">AI Prediction Dashboard</h1>
          <p className="page-subtitle">Physical &amp; Cyber threat intelligence for Delhi NCR</p>
        </div>
        <button className="btn btn-secondary" onClick={() => window.print()}>
          <Download size={16} /> Export PDF
        </button>
      </div>

      <div className="search-bar" style={{ position: 'relative' }}>
        <Search size={17} color="#5b6577" />
        <input
          placeholder="Search location in Delhi NCR (e.g. Connaught Place, India Gate, DLF Cyber Hub)"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setResult(null) }}
          onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
        />
        <button className="btn btn-primary" onClick={handleAnalyze}>Analyze</button>

        {matches.length > 0 && !result && (
          <div className="search-results-enter" style={{
            position: 'absolute', top: '110%', left: 0, right: 0, zIndex: 20,
            background: '#10151f', border: '1px solid #1e2632', borderRadius: 8, overflow: 'hidden',
          }}>
            {matches.map((m, i) => (
              <div
                key={m.id}
                className="anim-in"
                style={{ padding: '10px 14px', cursor: 'pointer', fontSize: 13.5, animationDelay: `${i * 0.03}s` }}
                onMouseDown={() => { setQuery(m.name); setResult(m) }}
              >
                {m.name} <span style={{ color: '#5b6577' }}>· {m.district}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {result && (
        <div className="panel msg-enter" style={{ marginBottom: 24 }}>
          <h3 className="panel-title">{result.name}</h3>
          <div className="grid grid-4">
            <div className="metric-pill">
              <span className="m-label">Safety Score</span>
              <span className="m-value"><CountUp value={result.safetyScore} suffix="/100" /></span>
            </div>
            <div className="metric-pill">
              <span className="m-label">Women Safety Index</span>
              <span className="m-value"><CountUp value={result.womenSafetyIndex} suffix="/100" /></span>
            </div>
            <div className="metric-pill">
              <span className="m-label">Risk Level</span>
              <span className="m-value" style={{ textTransform: 'capitalize' }}>{result.riskLevel}</span>
            </div>
            <div className="metric-pill">
              <span className="m-label">Footfall</span>
              <span className="m-value">{result.footfall}</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-2" style={{ marginBottom: 20 }}>
        <div className="panel anim-in d1">
          <h3 className="panel-title">Crime Trends Over Time</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={crimeTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2632" vertical={false} />
              <XAxis dataKey="month" stroke="#5b6577" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#5b6577" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="incidents" stroke="#3b9eff" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="panel anim-in d2">
          <h3 className="panel-title">District Risk Comparison</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={districtRisk} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2632" horizontal={false} />
              <XAxis type="number" stroke="#5b6577" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="district" stroke="#5b6577" fontSize={11} width={90} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="riskScore" fill="#ef4a5c" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="panel anim-in d3">
          <h3 className="panel-title">Crime Categories</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={crimeCategories} margin={{ left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2632" vertical={false} />
              <XAxis dataKey="category" stroke="#5b6577" fontSize={10} tickLine={false} axisLine={false} interval={0} angle={-20} textAnchor="end" height={70} />
              <YAxis stroke="#5b6577" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" fill="#3b9eff" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="panel anim-in d4">
          <h3 className="panel-title">
            <Clock size={16} /> Recent Searches
          </h3>
          {recentSearches.length === 0 ? (
            <div className="empty-state">No recent searches</div>
          ) : (
            recentSearches.map((s, i) => (
              <div key={s.id} className="location-row anim-in" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="loc-name">{s.query}</div>
                <div className="loc-district">{new Date(s.timestamp).toLocaleString()}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
