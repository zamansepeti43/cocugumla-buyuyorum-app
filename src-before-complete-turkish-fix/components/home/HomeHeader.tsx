import { NavLink } from 'react-router-dom'
import { useApp } from '../../hooks/useApp'
import { calculateAge } from '../../utils/age'
import { childNameInitial, formatChildName } from '../../utils/childName'
import { BookOpen, Compass, Home, Shapes, UserRound, Shield } from 'lucide-react'

const navItems = [
  { to: '/home', label: 'Ana Sayfa', shortLabel: 'Ana Sayfa', icon: Home },
  { to: '/worlds', label: 'Keşfet', shortLabel: 'Keşfet', icon: Compass },
  { to: '/activities', label: 'Oyunlar', shortLabel: 'Oyunlar', icon: Shapes },
  { to: '/english', label: 'İngilizce', shortLabel: 'İngilizce', icon: BookOpen },
  { to: '/stories', label: 'Hikâyeler', shortLabel: 'Hikâyeler', icon: Shapes }, // Using Shapes as placeholder
  { to: '/profile', label: 'Profil', shortLabel: 'Profil', icon: UserRound },
]

export function HomeHeader() {
  const { activeChild } = useApp()

  return (
    <header className="home-page-header">
      <div className="header-content">
        {/* Sol: Logo ve yazı */}
        <div className="header-logo-section">
          <NavLink to="/home" className="header-logo-link" aria-label="Çocuğumla Büyüyorum">
            <img src="/logo.png" alt="Çocuğumla Büyüyorum logo" className="header-logo" />
          </NavLink>
          <div className="header-logo-text">
            Çocuğun büyüme yolculuğu + Ebeveyn rehberliği
          </div>
        </div>

        {/* Orta: Navigasyon */}
        <nav className="header-nav" aria-label="Ana navigasyon">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => isActive ? 'header-nav-link active' : 'header-nav-link'}
              aria-label={label}
            >
              <Icon size={20} aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Sağ: Çocuk profili ve Ebeveyn butonu */}
        <div className="header-actions">
          {activeChild ? (
            <div className="header-child-profile">
              <div className="header-child-avatar">
                {childNameInitial(activeChild.name)}
              </div>
              <div className="header-child-info">
                <div className="header-child-name">{formatChildName(activeChild.name)}</div>
                <div className="header-child-age">{calculateAge(activeChild.birthDate).label}</div>
              </div>
            </div>
          ) : null}
          <NavLink to="/parent" className="header-parent-button" title="Ebeveyn Paneli">
            <Shield size={20} />
          </NavLink>
        </div>
      </div>
    </header>
  )
}