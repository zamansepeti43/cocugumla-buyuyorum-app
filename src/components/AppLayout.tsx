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
  { to: '/worlds', label: 'Keşfet', shortLabel: 'Keşfet', icon: Compass },
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
      <header
        className="topbar"
        style={{
          background: 'transparent',
          backgroundColor: 'transparent',
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          boxShadow: 'none',
        }}
      >
        <NavLink to="/home" className="brand" aria-label="Çocuğumla Büyüyorum">
          <img src="/logo.png" alt="Çocuğumla Büyüyorum logo" className="brand-logo" />
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

      {/* Final cascade: WorldsPage has an older inline icon-only rule. This is deliberately
          rendered after <Outlet /> so the shared navigation is identical on every page. */}
      <style>{`
        html body #root .app-shell-worlds .topbar .desktop-nav a {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          flex: 0 1 auto !important;
          min-width: max-content !important;
          min-height: 42px !important;
          height: 42px !important;
          padding: 0 14px !important;
          gap: 7px !important;
          font-size: 13px !important;
          line-height: 1 !important;
          font-weight: 800 !important;
          white-space: nowrap !important;
          color: rgba(255,255,255,.92) !important;
          background: transparent !important;
          border: 1px solid transparent !important;
          border-radius: 10px !important;
          box-shadow: none !important;
        }

        html body #root .app-shell-worlds .topbar .desktop-nav a svg {
          display: block !important;
          width: 18px !important;
          height: 18px !important;
          flex: 0 0 auto !important;
          visibility: visible !important;
          opacity: 1 !important;
        }

        html body #root .app-shell-worlds .topbar .desktop-nav a.active {
          color: #ffd45a !important;
          background: rgba(255,196,64,.09) !important;
          border-color: rgba(255,205,80,.30) !important;
        }

        @media (max-width: 900px) {
          html body #root .app-shell-worlds .topbar .desktop-nav a {
            flex: 1 1 0 !important;
            min-width: 0 !important;
            min-height: 40px !important;
            height: 40px !important;
            padding: 0 4px !important;
            gap: 4px !important;
            font-size: clamp(8px, 2.2vw, 11px) !important;
          }

          html body #root .app-shell-worlds .topbar .desktop-nav a svg {
            width: 16px !important;
            height: 16px !important;
          }
        }

        @media (max-width: 900px) and (orientation: landscape) {
          html body #root .app-shell-worlds .topbar .desktop-nav a {
            min-height: 34px !important;
            height: 34px !important;
            padding: 0 2px !important;
            gap: 3px !important;
            font-size: clamp(7px, 1.7vw, 10px) !important;
          }
        }
      `}</style>
    </div>
  )
}