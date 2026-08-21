import Sidebar from './Sidebar.jsx'

export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">{children}</main>
    </div>
  )
}
