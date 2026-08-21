import { useNavigate } from 'react-router-dom'
import { MapPin, ShieldCheck, ShieldAlert, Gauge } from 'lucide-react'
import StatCard from '../components/StatCard.jsx'
import { summaryStats, safestLocations, highestRiskLocations } from '../data/mockData.js'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div>
      <div className="hero">
        <svg className="hero-decor" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" stroke="#3b9eff" strokeOpacity="0.15" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="60" stroke="#3b9eff" strokeOpacity="0.22" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="30" stroke="#3b9eff" strokeOpacity="0.3" strokeWidth="1.5" />
        </svg>

        <h1 className="anim-in">
          Delhi Tourism Safety <span className="accent">&amp;</span> Risk Prediction
        </h1>
        <p className="anim-in d1">
          Advanced AI-powered intelligence platform analyzing crime patterns to predict
          risk levels across Delhi's tourist destinations and districts — built with a
          focus on women's safety and public site security.
        </p>
        <div className="hero-actions anim-in d2">
          <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
            Launch Dashboard
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/heatmap')}>
            View Heatmap
          </button>
        </div>
      </div>

      <div className="grid grid-4" style={{ marginBottom: 28 }}>
        <StatCard label="Total Locations" value={summaryStats.totalLocations} icon={MapPin} delayClass="d1" />
        <StatCard label="Avg Safety Score" value={summaryStats.avgSafetyScore} suffix="/100" icon={Gauge} tone="success" delayClass="d2" />
        <StatCard label="High Risk Areas" value={summaryStats.highRiskAreas} icon={ShieldAlert} tone="danger" delayClass="d3" />
        <StatCard label="Model Accuracy" value={summaryStats.modelAccuracy} decimals={1} suffix="%" icon={ShieldCheck} delayClass="d4" />
      </div>

      <div className="grid grid-2">
        <div className="panel anim-in d3">
          <h3 className="panel-title">
            <ShieldCheck size={17} color="#2fd480" /> Safest Locations
          </h3>
          {safestLocations.map((loc, i) => (
            <div
              key={loc.id}
              className="location-row anim-in"
              style={{ animationDelay: `${0.05 * i + 0.15}s` }}
              onClick={() => navigate('/heatmap')}
            >
              <div>
                <div className="loc-name">{loc.name}</div>
                <div className="loc-district">{loc.district}</div>
              </div>
              <div className="loc-score" style={{ color: '#2fd480' }}>{loc.safetyScore}</div>
            </div>
          ))}
        </div>

        <div className="panel anim-in d4">
          <h3 className="panel-title">
            <ShieldAlert size={17} color="#ef4a5c" /> Highest Risk Locations
          </h3>
          {highestRiskLocations.map((loc, i) => (
            <div
              key={loc.id}
              className="location-row anim-in"
              style={{ animationDelay: `${0.05 * i + 0.2}s` }}
              onClick={() => navigate('/heatmap')}
            >
              <div>
                <div className="loc-name">{loc.name}</div>
                <div className="loc-district">{loc.district}</div>
              </div>
              <div className="loc-score" style={{ color: '#ef4a5c' }}>{loc.safetyScore}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
