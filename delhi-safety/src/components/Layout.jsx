import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import Sidebar from './Sidebar.jsx'

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <div className="app-shell">
      <div className="mobile-topbar">
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>
        <span className="mobile-topbar-title">DELHI SAFETY</span>
      </div>

      {mobileOpen && <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)} />}

      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <main className="main-content">{children}</main>
    </div>
  )
}