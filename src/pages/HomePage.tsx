import { useApp } from '../hooks/useApp'
import './home-premium.css'
import './home-reference-fix.css'
import { Compass, Gamepad2, UsersRound, UserRound, Trophy, BookOpen, Sparkles, ArrowRight, ChevronDown } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Ana Sayfa', href: '/home', icon: Compass },
  { label: 'Keşfet', href: '/worlds', icon: Compass },
  { label: 'Oyunlar', href: '/activities', icon: Gamepad2 },
  { label: 'Ebeveyn', href: '/parent', icon: UsersRound },
  { label: 'Profil', href: '/profile', icon: UserRound },
]

// Keep homepage imagery local so the hero never renders as an empty block
// because an external URL or a renamed public asset is unavailable.
const heroImage = '/assets/home/hero.webp'
const storyImage = '/assets/home/story.webp'
const animalImage = '/assets/home/animal.webp'

export function HomePage() {
  const { activeChild } = useApp()
  if (!activeChild) return null

  const childName = String((activeChild as { name?: string }).name ?? 'AKGÜN')

  return (
    <div className="reference-home-page">
      <div className="reference-home-shell">
        <header className="reference-topbar">
          <NavLink to="/home" className="reference-brand">
            <span className="brand-mark"><i>♥</i><b>✦</b><em>●</em></span>
            <span className="brand-title">Çocuğumla <strong>Büyüyorum</strong></span>
          </NavLink>

          <nav className="reference-nav">
            {navItems.map(({ label, href, icon: Icon }) => (
              <NavLink key={label} to={href} className={({ isActive }) => `reference-nav-link ${isActive ? 'active' : ''}`}>
                <Icon size={14} strokeWidth={2.2} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          <NavLink to="/profile" className="reference-avatar" aria-label="Profil">
            <span>👩🏻</span>
          </NavLink>
        </header>

        <main className="reference-home-main">
          <section className="reference-home-hero">
            <div className="reference-hero-art" style={{ backgroundImage: `url(${heroImage})` }} />
            <div className="reference-hero-shade" />

            <div className="reference-greeting">
              <h1>Merhaba {childName} 👋</h1>
              <p>Bugün yeni şeyler öğrenmek için<br />harika bir gün!</p>
            </div>

            <div className="reference-goal-card">
              <div className="goal-icon"><Trophy size={20} /></div>
              <div>
                <strong>Günlük Hedef</strong>
                <small>Bugünkü hedefini tamamla<br />rozetini kazan!</small>
              </div>
              <div className="goal-progress"><span /></div>
              <b>3 / 5</b>
            </div>

            <NavLink to="/activities" className="reference-continue-card">
              <div className="continue-thumb" style={{ backgroundImage: `url(${animalImage})` }} />
              <div className="continue-copy">
                <strong>Devam Et</strong>
                <span>Uzayda Gezegenler</span>
                <small>Keşif Dünyası</small>
              </div>
              <span className="continue-button">Devam Et</span>
            </NavLink>

            <aside className="reference-parent-panel">
              <div className="panel-heading"><span>Ebeveyn Rehberi</span><ChevronDown size={13} /></div>
              <div className="baby-photo" style={{ backgroundImage: `url(${storyImage})` }} />
              <div className="baby-copy"><small>Bebeğiniz</small><strong>2 Aylık</strong><span>Bu dönemde neler<br />yapabilirsiniz?</span></div>
              <NavLink to="/parent" className="guide-button">Rehberi Gör</NavLink>
            </aside>

            <aside className="reference-recommend-panel">
              <div className="panel-heading"><span>Önerilen İçerik</span><ChevronDown size={13} /></div>
              <NavLink to="/worlds" className="mini-content"><span className="mini-image animal" style={{ backgroundImage: `url(${animalImage})` }} /><span><strong>Renkleri Öğreniyorum</strong><small>Oyun Dünyası</small></span></NavLink>
              <NavLink to="/worlds" className="mini-content"><span className="mini-image story" style={{ backgroundImage: `url(${storyImage})` }} /><span><strong>Hayvan Sesleri</strong><small>Doğa Dünyası</small></span></NavLink>
            </aside>
          </section>

          <nav className="reference-bottom-nav" aria-label="Ana menü">
            <NavLink to="/worlds"><Compass size={18} /><span>Keşfet</span></NavLink>
            <NavLink to="/activities"><Gamepad2 size={18} /><span>Oyunlar</span></NavLink>
            <NavLink to="/stories"><BookOpen size={18} /><span>Kitaplık</span></NavLink>
            <NavLink to="/activities"><Sparkles size={18} /><span>Etkinlikler</span></NavLink>
            <NavLink to="/profile"><Trophy size={18} /><span>Ödüller</span></NavLink>
          </nav>
        </main>

        <div className="reference-home-mobile"><ArrowRight size={14} /> Kaydırarak keşfet</div>
      </div>
    </div>
  )
}
