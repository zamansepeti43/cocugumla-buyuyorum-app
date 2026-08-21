import { useEffect, useRef } from 'react'
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

// Ana sayfa arka planı: public/assets/home/home-bg.png
const heroImage = '/assets/home/home-bg.png'
const babyImage = '/assets/home/baby.jpg'
const forestAnimalsImage = 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=600&q=88'

export function HomePage() {
  const { activeChild } = useApp()
  const heroRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const landscape = window.matchMedia('(pointer: coarse) and (orientation: landscape)')

    const fitLandscape = () => {
      if (!landscape.matches) {
        hero.style.zoom = ''
        hero.style.width = ''
        hero.style.height = ''
        return
      }

      // The desktop composition is 1380x610. Fit it to BOTH dimensions so
      // no card, button, or lower part of the hero gets clipped on phones.
      const scale = Math.min(window.innerWidth / 1380, window.innerHeight / 610)
      const safeScale = Math.max(0.45, Math.min(scale, 1))

      hero.style.width = '1380px'
      hero.style.height = '610px'
      hero.style.zoom = String(safeScale)
    }

    const enterFullscreenFromGesture = () => {
      if (!landscape.matches || document.fullscreenElement) return
      const root = document.documentElement
      const request = root.requestFullscreen?.({ navigationUI: 'hide' } as FullscreenOptions)
      if (request) {
        request.catch(() => {
          // Browser may require another user gesture or may not support fullscreen.
        })
      }
    }

    fitLandscape()
    window.addEventListener('resize', fitLandscape)
    window.addEventListener('orientationchange', fitLandscape)
    landscape.addEventListener('change', fitLandscape)
    hero.addEventListener('pointerdown', enterFullscreenFromGesture, { passive: true })

    return () => {
      window.removeEventListener('resize', fitLandscape)
      window.removeEventListener('orientationchange', fitLandscape)
      landscape.removeEventListener('change', fitLandscape)
      hero.removeEventListener('pointerdown', enterFullscreenFromGesture)
      hero.style.zoom = ''
    }
  }, [])

  if (!activeChild) return null

  const childName = String((activeChild as { name?: string }).name ?? 'AKGÜN')

  return (
    <div className="reference-home-page">
      <div className="reference-home-shell">
        <header className="reference-topbar">
          <NavLink to="/home" className="reference-brand">
            <img src="/logo.png" alt="Çocuğumla Büyüyorum" className="reference-brand-logo" />
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
          <section ref={heroRef} className="reference-home-hero">
            <div className="reference-hero-art" style={{ backgroundImage: `url("${heroImage}")` }} />
            <div className="reference-hero-shade" />

            <div className="reference-greeting">
              <h1>Merhaba {childName} 👋</h1>
              <p>Bugün yeni şeyler öğrenmek için<br />harika bir gün!</p>
            </div>

            <div className="reference-goal-card">
              <div className="goal-icon"><Trophy size={20} /></div>
              <div><strong>Günlük Hedef</strong><small>Bugünkü hedefini tamamla<br />rozetini kazan!</small></div>
              <div className="goal-progress"><span /></div><b>3 / 5</b>
            </div>

            <NavLink to="/worlds" className="reference-continue-card">
              <div className="continue-thumb" style={{ backgroundImage: `url("${forestAnimalsImage}")` }} />
              <div className="continue-copy"><strong>Devam Et</strong><span>Ormandaki Hayvanlar</span><small>Doğa Dünyası</small></div>
              <span className="continue-button">Devam Et</span>
            </NavLink>

            <aside className="reference-parent-panel">
              <div className="panel-heading"><span>Ebeveyn Rehberi</span><ChevronDown size={13} /></div>
              <div className="baby-photo" style={{ backgroundImage: `url("${babyImage}")` }} />
              <div className="baby-copy"><small>Bebeğiniz</small><strong>2 Aylık</strong><span>Bu dönemde neler<br />yapabilirsiniz?</span></div>
              <NavLink to="/parent" className="guide-button">Rehberi Gör</NavLink>
            </aside>

            <aside className="reference-recommend-panel">
              <div className="panel-heading"><span>Önerilen İçerik</span><ChevronDown size={13} /></div>
              <NavLink to="/worlds" className="mini-content"><span className="mini-image animal" style={{ backgroundImage: `url("${forestAnimalsImage}")` }} /><span><strong>Ormandaki Hayvanlar</strong><small>Doğa Dünyası</small></span></NavLink>
              <NavLink to="/worlds" className="mini-content"><span className="mini-image story" style={{ backgroundImage: `url("${forestAnimalsImage}")` }} /><span><strong>Hayvan Sesleri</strong><small>Doğa Dünyası</small></span></NavLink>
            </aside>

            <nav className="reference-bottom-nav" aria-label="Ana menü">
              <NavLink to="/worlds"><Compass size={18} /><span>Keşfet</span></NavLink>
              <NavLink to="/activities"><Gamepad2 size={18} /><span>Oyunlar</span></NavLink>
              <NavLink to="/stories"><BookOpen size={18} /><span>Kitaplık</span></NavLink>
              <NavLink to="/activities"><Sparkles size={18} /><span>Etkinlikler</span></NavLink>
              <NavLink to="/profile"><Trophy size={18} /><span>Ödüller</span></NavLink>
            </nav>
          </section>
        </main>

        <div className="reference-home-mobile"><ArrowRight size={14} /> Kaydırarak keşfet</div>
      </div>
    </div>
  )
}
