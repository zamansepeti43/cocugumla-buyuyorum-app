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
      <header className="topbar" style={{ background: 'transparent', backgroundColor: 'transparent', backdropFilter: 'none', WebkitBackdropFilter: 'none', boxShadow: 'none' }}>
        <NavLink to="/home" className="brand" aria-label="Çocuğumla Büyüyorum">
          <img src="/logo.png" alt="Çocuğumla Büyüyorum logo" className="brand-logo" />
        </NavLink>

        <nav className="desktop-nav" aria-label="Ana navigasyon">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'active' : ''}>
              <Icon size={18} aria-hidden="true" />
              <span className="nav-label">{label}</span>
            </NavLink>
          ))}
        </nav>

        {activeChild && (
          <>
            <NavLink to="/profile" className="child-chip" aria-hidden="true">
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

      <style>{`
        /* Canonical discovery navigation — labels are visible on EVERY screen. */
        html body #root .app-shell .topbar,
        html body #root .app-shell-worlds .topbar {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          width: 100% !important;
          height: 76px !important;
          min-height: 76px !important;
          padding: 0 22px !important;
          display: grid !important;
          grid-template-columns: auto minmax(0, 1fr) auto !important;
          align-items: center !important;
          background: transparent !important;
          background-color: transparent !important;
          background-image: none !important;
          border: 0 !important;
          box-shadow: none !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          z-index: 99999 !important;
        }

        html body #root .app-shell .topbar .brand,
        html body #root .app-shell-worlds .topbar .brand {
          display: flex !important;
          align-items: center !important;
        }

        html body #root .app-shell .topbar .brand-logo,
        html body #root .app-shell-worlds .topbar .brand-logo {
          display: block !important;
          width: auto !important;
          max-width: 120px !important;
          height: 40px !important;
          object-fit: contain !important;
        }

        html body #root .app-shell .topbar .desktop-nav,
        html body #root .app-shell-worlds .topbar .desktop-nav {
          display: flex !important;
          justify-self: center !important;
          align-items: center !important;
          justify-content: center !important;
          width: 100% !important;
          max-width: 560px !important;
          height: 48px !important;
          margin: 0 auto !important;
          padding: 2px !important;
          gap: 2px !important;
          background: transparent !important;
          border: 0 !important;
          box-shadow: none !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }

        /* WORDS, not icon-only buttons. */
        html body #root .app-shell .topbar .desktop-nav a,
        html body #root .app-shell-worlds .topbar .desktop-nav a {
          display: inline-flex !important;
          flex: 0 1 auto !important;
          min-width: max-content !important;
          min-height: 40px !important;
          height: 40px !important;
          padding: 0 13px !important;
          margin: 0 !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 7px !important;
          color: rgba(255,255,255,.92) !important;
          background: transparent !important;
          border: 1px solid transparent !important;
          border-radius: 9px !important;
          box-shadow: none !important;
          font-size: 13px !important;
          line-height: 1 !important;
          font-weight: 800 !important;
          white-space: nowrap !important;
          text-indent: 0 !important;
          visibility: visible !important;
          opacity: 1 !important;
        }

        /* Explicit label element defeats every old font-size:0 / display:none rule. */
        html body #root .app-shell .topbar .desktop-nav a .nav-label,
        html body #root .app-shell-worlds .topbar .desktop-nav a .nav-label {
          display: inline !important;
          visibility: visible !important;
          opacity: 1 !important;
          width: auto !important;
          height: auto !important;
          max-width: none !important;
          overflow: visible !important;
          clip: auto !important;
          clip-path: none !important;
          position: static !important;
          margin: 0 !important;
          padding: 0 !important;
          font-size: 13px !important;
          line-height: 1 !important;
          font-weight: 800 !important;
          color: inherit !important;
          white-space: nowrap !important;
          text-indent: 0 !important;
          transform: none !important;
        }

        html body #root .app-shell .topbar .desktop-nav a svg,
        html body #root .app-shell-worlds .topbar .desktop-nav a svg {
          display: block !important;
          width: 18px !important;
          height: 18px !important;
          flex: 0 0 auto !important;
          visibility: visible !important;
          opacity: 1 !important;
        }

        html body #root .app-shell .topbar .desktop-nav a.active,
        html body #root .app-shell-worlds .topbar .desktop-nav a.active {
          color: #ffd45a !important;
          background: rgba(255,212,90,.10) !important;
          border-color: rgba(255,212,90,.32) !important;
          box-shadow: none !important;
        }

        /* Keep the transparent top surface and do not touch lower panels. */
        html body #root .app-shell .topbar,
        html body #root .app-shell-worlds .topbar {
          background: transparent !important;
          background-color: transparent !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          box-shadow: none !important;
        }

        html body #root .app-shell .topbar .child-chip,
        html body #root .app-shell-worlds .topbar .child-chip {
          display: none !important;
        }

        html body #root .app-shell .topbar .parent-access,
        html body #root .app-shell-worlds .topbar .parent-access {
          display: inline-flex !important;
          justify-self: end !important;
          align-items: center !important;
          justify-content: center !important;
          width: 36px !important;
          height: 36px !important;
          margin: 0 !important;
          padding: 0 !important;
          color: rgba(255,255,255,.92) !important;
          background: transparent !important;
          border: 0 !important;
          box-shadow: none !important;
        }

        html body #root .app-shell .topbar .parent-access svg,
        html body #root .app-shell-worlds .topbar .parent-access svg {
          width: 22px !important;
          height: 22px !important;
        }

        @media (max-width: 900px) {
          html body #root .app-shell .topbar,
          html body #root .app-shell-worlds .topbar {
            height: 58px !important;
            min-height: 58px !important;
            padding: 4px 8px !important;
            gap: 4px !important;
          }

          html body #root .app-shell .topbar .brand-logo,
          html body #root .app-shell-worlds .topbar .brand-logo {
            max-width: 92px !important;
            height: 32px !important;
          }

          html body #root .app-shell .topbar .desktop-nav,
          html body #root .app-shell-worlds .topbar .desktop-nav {
            max-width: 500px !important;
            height: 44px !important;
            gap: 1px !important;
          }

          html body #root .app-shell .topbar .desktop-nav a,
          html body #root .app-shell-worlds .topbar .desktop-nav a {
            flex: 1 1 0 !important;
            min-width: 0 !important;
            min-height: 36px !important;
            height: 36px !important;
            padding: 0 2px !important;
            gap: 3px !important;
            font-size: clamp(8px, 2.1vw, 11px) !important;
          }

          html body #root .app-shell .topbar .desktop-nav a .nav-label,
          html body #root .app-shell-worlds .topbar .desktop-nav a .nav-label {
            display: inline !important;
            font-size: clamp(8px, 2.1vw, 11px) !important;
          }

          html body #root .app-shell .topbar .desktop-nav a svg,
          html body #root .app-shell-worlds .topbar .desktop-nav a svg {
            width: 15px !important;
            height: 15px !important;
          }
        }

        @media (max-width: 900px) and (orientation: landscape) {
          html body #root .app-shell .topbar,
          html body #root .app-shell-worlds .topbar {
            height: 54px !important;
            min-height: 54px !important;
          }

          html body #root .app-shell .topbar .desktop-nav a,
          html body #root .app-shell-worlds .topbar .desktop-nav a {
            min-height: 32px !important;
            height: 32px !important;
            padding: 0 1px !important;
            gap: 2px !important;
            font-size: clamp(7px, 1.65vw, 10px) !important;
          }

          html body #root .app-shell .topbar .desktop-nav a .nav-label,
          html body #root .app-shell-worlds .topbar .desktop-nav a .nav-label {
            display: inline !important;
            font-size: clamp(7px, 1.65vw, 10px) !important;
          }

          html body #root .app-shell .topbar .desktop-nav a svg,
          html body #root .app-shell-worlds .topbar .desktop-nav a svg {
            width: 14px !important;
            height: 14px !important;
          }
        }
      `}</style>
    </div>
  )
}
