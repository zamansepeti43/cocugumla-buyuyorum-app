import {
  Compass,
  Home,
  Shapes,
  Shield,
  UserRound,
} from 'lucide-react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useApp } from '../hooks/useApp'
import { calculateAge } from '../utils/age'
import { childNameInitial, formatChildName } from '../utils/childName'
import '../mobile-layout-fix.css'

const navItems = [
  { to: '/home', label: 'Ana Sayfa', shortLabel: 'Ana Sayfa', icon: Home },
  { to: '/worlds', label: 'KeÅŸfet', shortLabel: 'KeÅŸfet', icon: Compass },
  { to: '/activities', label: 'Oyunlar', shortLabel: 'Oyunlar', icon: Shapes },
  { to: '/parent', label: 'Ebeveyn', shortLabel: 'Ebeveyn', icon: Shield },
  { to: '/profile', label: 'Profil', shortLabel: 'Profil', icon: UserRound },
]

export function AppLayout() {
  const { activeChild } = useApp()
  const location = useLocation()
  const isWorldsPage = location.pathname.startsWith('/worlds')
  const isWorldDetailPage = /^\/worlds\/(space|english|games|math)\/?$/.test(location.pathname)

  return (
    <div className={`app-shell ${isWorldsPage ? 'app-shell-worlds' : ''} ${isWorldDetailPage ? 'app-shell-world-detail' : ''}`}>
      <header className="topbar">
        <NavLink to="/home" className="brand" aria-label="Ã‡ocuÄŸumla BÃ¼yÃ¼yorum">
          <img src="/logo.png" alt="Ã‡ocuÄŸumla BÃ¼yÃ¼yorum logo" className="brand-logo" />
        </NavLink>

        <nav className="desktop-nav" aria-label="Ana navigasyon">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'active' : ''}>
              <Icon size={18} aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>

        {activeChild && (
          <>
            <NavLink to="/profile" className="child-chip">
              <span>{childNameInitial(activeChild.name)}</span>
              <div>
                <strong>{formatChildName(activeChild.name)}</strong>
                <small>{calculateAge(activeChild.birthDate).label}</small>
              </div>
            </NavLink>
            <NavLink to="/parent" className="parent-access" title="Ebeveyn Paneli" aria-label="Ebeveyn Paneli">
              <Shield size={20} />
            </NavLink>
          </>
        )}
      </header>

      <main className={`main-content ${isWorldsPage ? 'worlds-main-content' : ''} ${isWorldDetailPage ? 'world-detail-main-content' : ''}`}>
        <Outlet />
      </main>

      <nav className="bottom-nav" aria-label="Mobil navigasyon">
        {navItems.map(({ to, shortLabel, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'active' : ''}>
            <Icon size={21} aria-hidden="true" />
            <span>{shortLabel}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
