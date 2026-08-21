import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts'
import { BrainCircuit, Target, Crosshair, Layers } from 'lucide-react'
import { modelMetrics, modelComparison, featureImportance } from '../data/mockData.js'
import CountUp from '../components/CountUp.jsx'

const tooltipStyle = {
  background: '#10151f',
  border: '1px solid #1e2632',
  borderRadius: 8,
  fontSize: 12,
  color: '#eef1f6',
}

export default function ModelPerformance() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Model Performance</h1>
          <p className="page-subtitle">Evaluation metrics for the current risk prediction model</p>
        </div>
      </div>

      <div className="grid grid-4" style={{ marginBottom: 20 }}>
        <div className="metric-pill anim-in">
          <span className="m-label"><Target size={12} style={{ marginRight: 4 }} />Accuracy</span>
          <span className="m-value"><CountUp value={modelMetrics.accuracy} decimals={1} suffix="%" /></span>
        </div>
        <div className="metric-pill anim-in d1">
          <span className="m-label"><Crosshair size={12} style={{ marginRight: 4 }} />Precision</span>
          <span className="m-value"><CountUp value={modelMetrics.precision} decimals={1} suffix="%" /></span>
        </div>
        <div className="metric-pill anim-in d2">
          <span className="m-label">Recall</span>
          <span className="m-value"><CountUp value={modelMetrics.recall} decimals={1} suffix="%" /></span>
        </div>
        <div className="metric-pill anim-in d3">
          <span className="m-label">F1 Score</span>
          <span className="m-value"><CountUp value={modelMetrics.f1Score} decimals={1} suffix="%" /></span>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="panel anim-in d2">
          <h3 className="panel-title"><BrainCircuit size={16} /> Model Comparison</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={modelComparison} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2632" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} stroke="#5b6577" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="model" stroke="#5b6577" fontSize={11} width={140} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(59,158,255,0.06)' }} />
              <Bar dataKey="accuracy" fill="#3b9eff" radius={[0, 4, 4, 0]} animationDuration={900} animationEasing="ease-out" />
            </BarChart>
          </ResponsiveContainer>
          <p style={{ fontSize: 12, color: '#5b6577', marginTop: 8 }}>
            XGBoost is currently selected as the production model based on highest validation accuracy.
          </p>
        </div>

        <div className="panel anim-in d3">
          <h3 className="panel-title"><Layers size={16} /> Feature Importance</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={featureImportance} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2632" horizontal={false} />
              <XAxis type="number" stroke="#5b6577" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="feature" stroke="#5b6577" fontSize={10.5} width={160} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(47,212,128,0.06)' }} />
              <Bar dataKey="importance" fill="#2fd480" radius={[0, 4, 4, 0]} animationDuration={900} animationEasing="ease-out" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="panel anim-in d4" style={{ marginTop: 20 }}>
        <h3 className="panel-title">AUC-ROC</h3>
        <div style={{ fontSize: 32, fontWeight: 700, color: '#3b9eff' }}>
          <CountUp value={modelMetrics.aucRoc} decimals={2} />
        </div>
        <p style={{ fontSize: 12.5, color: '#8b95a7', marginTop: 6 }}>
          Area under the ROC curve for the binary high-risk / not-high-risk classification task,
          evaluated on a held-out validation split of the incident dataset.
        </p>
      </div>
    </div>
  )
}
