import { NavLink } from 'react-router-dom'
import { ShieldHalf, LayoutGrid, Map, Database, BrainCircuit, Info } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: null, end: true },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { to: '/heatmap', label: 'Crime Heatmap', icon: Map },
  { to: '/admin', label: 'Admin Panel', icon: Database },
  { to: '/model-performance', label: 'Model Performance', icon: BrainCircuit },
  { to: '/about', label: 'About', icon: Info },
]

function HomeIcon(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 9l9-7 9 7" />
      <path d="M9 22V12h6v10" />
      <path d="M3 9v11a1 1 0 0 0 1 1h5" />
      <path d="M21 9v11a1 1 0 0 1-1 1h-5" />
    </svg>
  )
}

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <ShieldHalf size={26} color="#3b9eff" strokeWidth={2} />
        <div className="brand-text">
          <span className="brand-title">DELHI SAFETY</span>
          <span className="brand-sub">RISK INTELLIGENCE</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            {Icon ? <Icon size={17} /> : <HomeIcon />}
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        Module v0.1 · Mock data mode
        <br />
        © {new Date().getFullYear()} Delhi Safety
      </div>
    </aside>
  )
}
