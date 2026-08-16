import { BookOpen, ChartNoAxesColumnIncreasing, Home, Shapes, UserRound } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { useApp } from '../hooks/useApp'
import { calculateAge } from '../utils/age'
import { childNameInitial, formatChildName } from '../utils/childName'

const navItems = [
  { to: '/home', label: 'Ana Sayfa', shortLabel: 'Ana Sayfa', icon: Home },
  { to: '/activities', label: 'Aktiviteler', shortLabel: 'Aktiviteler', icon: Shapes },
  { to: '/english', label: 'İngilizce', shortLabel: 'İngilizce', icon: BookOpen },
  { to: '/progress', label: 'İlerleme', shortLabel: 'İlerleme', icon: ChartNoAxesColumnIncreasing },
  { to: '/profile', label: 'Profil', shortLabel: 'Profil', icon: UserRound },
]

export function AppLayout() {
  const { activeChild } = useApp()

  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink to="/home" className="brand" aria-label="Çocuğumla Büyüyorum">
          <img src="/logo.png" alt="Çocuğumla Büyüyorum logo" className="brand-logo" />
        </NavLink>
        <nav className="desktop-nav" aria-label="Ana navigasyon">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'active' : ''}>
              <Icon size={18} aria-hidden="true" />{label}
            </NavLink>
          ))}
        </nav>
        {activeChild && (
          <NavLink to="/profile" className="child-chip">
            <span>{childNameInitial(activeChild.name)}</span>
            <div><strong>{formatChildName(activeChild.name)}</strong><small>{calculateAge(activeChild.birthDate).label}</small></div>
          </NavLink>
        )}
      </header>

      <main className="main-content"><Outlet /></main>

      <nav className="bottom-nav" aria-label="Mobil navigasyon">
        {navItems.map(({ to, shortLabel, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'active' : ''}>
            <Icon size={21} aria-hidden="true" /><span>{shortLabel}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
