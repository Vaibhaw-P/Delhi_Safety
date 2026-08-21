import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import CrimeHeatmap from './pages/CrimeHeatmap.jsx'
import AdminPanel from './pages/AdminPanel.jsx'
import ModelPerformance from './pages/ModelPerformance.jsx'
import About from './pages/About.jsx'

export default function App() {
  const location = useLocation()

  return (
    <Layout>
      {/* key={pathname} forces a remount on route change, replaying the
          .page-transition fade/slide-up animation defined in index.css */}
      <div key={location.pathname} className="page-transition">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/heatmap" element={<CrimeHeatmap />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/model-performance" element={<ModelPerformance />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Layout>
  )
}
