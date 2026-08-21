import { useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import { locations, riskLevelColor } from '../data/mockData.js'

const DELHI_CENTER = [28.6139, 77.209]

function FlyTo({ position }) {
  const map = useMap()
  if (position) map.flyTo(position, 14, { duration: 0.8 })
  return null
}

export default function CrimeHeatmap() {
  const [selected, setSelected] = useState(null)

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Crime Heatmap</h1>
          <p className="page-subtitle">Spatial distribution of risk across Delhi tourist areas and districts</p>
        </div>
      </div>

      <div className="map-layout">
        <div style={{ position: 'relative' }} className="map-container anim-in">
          <MapContainer center={DELHI_CENTER} zoom={11} style={{ height: '100%', width: '100%', background: '#0a0e16' }}>
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            {locations.map((loc) => (
              <CircleMarker
                key={loc.id}
                center={[loc.lat, loc.lng]}
                radius={selected?.id === loc.id ? 12 : 8}
                pathOptions={{
                  color: riskLevelColor(loc.riskLevel),
                  fillColor: riskLevelColor(loc.riskLevel),
                  fillOpacity: 0.75,
                  weight: 2,
                  className: loc.riskLevel === 'high' ? 'pulse-marker' : '',
                }}
                eventHandlers={{ click: () => setSelected(loc) }}
              >
                <Popup>
                  <strong>{loc.name}</strong>
                  <br />
                  {loc.district}
                  <br />
                  Safety score: {loc.safetyScore}/100
                  <br />
                  Risk: {loc.riskLevel}
                </Popup>
              </CircleMarker>
            ))}
            {selected && <FlyTo position={[selected.lat, selected.lng]} />}
          </MapContainer>

          <div className="legend-box">
            <div className="legend-title">Risk Levels</div>
            <div className="legend-row"><span className="legend-dot" style={{ background: '#2fd480' }} /> Low Risk</div>
            <div className="legend-row"><span className="legend-dot" style={{ background: '#f5a623' }} /> Moderate Risk</div>
            <div className="legend-row"><span className="legend-dot" style={{ background: '#ef4a5c' }} /> High Risk</div>
          </div>
        </div>

        <div className="panel anim-in d1">
          <h3 className="panel-title">Locations Directory</h3>
          <p style={{ fontSize: 12, color: '#5b6577', marginTop: -8, marginBottom: 14 }}>
            Select a location on map or from list
          </p>
          <div style={{ maxHeight: 560, overflowY: 'auto' }}>
            {locations.map((loc, i) => (
              <div
                key={loc.id}
                className="location-row anim-in"
                style={{
                  borderColor: selected?.id === loc.id ? '#2a3444' : 'transparent',
                  animationDelay: `${Math.min(i, 8) * 0.04}s`,
                }}
                onClick={() => setSelected(loc)}
              >
                <div>
                  <div className="loc-name">{loc.name}</div>
                  <div className="loc-district">{loc.district}</div>
                </div>
                <span className={`badge badge-${loc.riskLevel}`}>{loc.riskLevel}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
