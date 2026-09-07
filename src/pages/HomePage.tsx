import { useEffect, useMemo, useRef } from 'react'
import { useApp } from '../hooks/useApp'
import { useProgress } from '../hooks/useProgress'
import { allActivities } from '../data/allActivities'
import { categoryMeta } from '../data/activities'
import { calculateAge } from '../utils/age'
import { formatChildName } from '../utils/childName'
import { generateDailyProgram } from '../utils/dailyProgramEngine'
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
  const { activeChild, data } = useApp()
  const { progressRecords } = useProgress()
  const heroRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const landscape = window.matchMedia('(pointer: coarse) and (orientation: landscape)')

    const enterFullscreenFromGesture = () => {
      if (!landscape.matches || document.fullscreenElement) return
      const root = document.documentElement
      const request = root.requestFullscreen?.({ navigationUI: 'hide' } as FullscreenOptions)
      if (request) request.catch(() => undefined)
    }

    const resetInlineSizing = () => {
      hero.style.zoom = ''
      hero.style.width = ''
      hero.style.height = ''
    }

    resetInlineSizing()
    window.addEventListener('resize', resetInlineSizing)
    window.addEventListener('orientationchange', resetInlineSizing)
    landscape.addEventListener('change', resetInlineSizing)
    hero.addEventListener('pointerdown', enterFullscreenFromGesture, { passive: true })

    return () => {
      window.removeEventListener('resize', resetInlineSizing)
      window.removeEventListener('orientationchange', resetInlineSizing)
      landscape.removeEventListener('change', resetInlineSizing)
      hero.removeEventListener('pointerdown', enterFullscreenFromGesture)
      resetInlineSizing()
    }
  }, [])

  const childName = activeChild ? formatChildName(activeChild.name) : ''
  const age = activeChild ? calculateAge(activeChild.birthDate) : null
  const completedIds = useMemo(
    () => new Set(
      activeChild
        ? data.completions
            .filter((item) => item.childId === activeChild.id)
            .map((item) => item.activityId)
        : [],
    ),
    [activeChild, data.completions],
  )
  const dailyProgram = useMemo(
    () => generateDailyProgram({
      childBirthDate: activeChild?.birthDate ?? '',
      today: new Date(),
      completedActivityIds: Array.from(completedIds),
    }),
    [activeChild?.birthDate, completedIds],
  )

  const developmentActivity = dailyProgram.activities[0] ?? allActivities[0]
  const gameActivity = dailyProgram.activities[1] ?? allActivities[1] ?? allActivities[0]
  const totalCompleted = progressRecords.filter((record) => record.completed).length
  const devCategory = categoryMeta[developmentActivity.category]
  const gameCategory = categoryMeta[gameActivity.category]

  if (!activeChild || !age) return null

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
              <p>{age.label} yaşında, bugün birlikte yeni şeyler öğrenmeye hazırız.</p>
            </div>

            <div className="reference-goal-card">
              <div className="goal-icon"><Trophy size={20} /></div>
              <div><strong>Günlük Hedef</strong><small>{totalCompleted} keşif tamamlandı</small></div>
              <div className="goal-progress"><span style={{ width: `${Math.min(100, (totalCompleted / 5) * 100)}%` }} /></div><b>{Math.min(totalCompleted, 5)} / 5</b>
            </div>

            <NavLink to={`/activities/${developmentActivity.id}`} className="reference-continue-card">
              <div className="continue-thumb" style={{ backgroundImage: `url("${forestAnimalsImage}")` }} />
              <div className="continue-copy"><strong>Bugünün etkinliği</strong><span>{developmentActivity.title}</span><small>{devCategory.label}</small></div>
              <span className="continue-button">Aç</span>
            </NavLink>

            <aside className="reference-parent-panel">
              <div className="panel-heading"><span>Ebeveyn Rehberi</span><ChevronDown size={13} /></div>
              <div className="baby-photo" style={{ backgroundImage: `url("${babyImage}")` }} />
              <div className="baby-copy"><small>{childName}</small><strong>{age.label}</strong><span>{age.ageGroup} için önerilen oyunlar</span></div>
              <NavLink to="/parent" className="guide-button">Rehberi Gör</NavLink>
            </aside>

            <aside className="reference-recommend-panel">
              <div className="panel-heading"><span>Günlük öneriler</span><ChevronDown size={13} /></div>
              <NavLink to={`/activities/${developmentActivity.id}`} className="mini-content"><span className="mini-image animal" style={{ backgroundImage: `url("${forestAnimalsImage}")` }} /><span><strong>{developmentActivity.title}</strong><small>{devCategory.label}</small></span></NavLink>
              <NavLink to={`/activities/${gameActivity.id}`} className="mini-content"><span className="mini-image story" style={{ backgroundImage: `url("${forestAnimalsImage}")` }} /><span><strong>{gameActivity.title}</strong><small>{gameCategory.label}</small></span></NavLink>
            </aside>

            <nav className="reference-bottom-nav" aria-label="Ana menü">
              <NavLink to="/worlds"><Compass size={18} /><span>Keşfet</span></NavLink>
              <NavLink to="/activities"><Gamepad2 size={18} /><span>Oyunlar</span></NavLink>
              <NavLink to="/parent"><BookOpen size={18} /><span>Rehber</span></NavLink>
              <NavLink to="/activities"><Sparkles size={18} /><span>Etkinlikler</span></NavLink>
              <NavLink to="/profile"><Trophy size={18} /><span>İlerleme</span></NavLink>
            </nav>
          </section>
        </main>

        <div className="reference-home-mobile"><ArrowRight size={14} /> İlerlemeni takip et</div>
      </div>
    </div>
  )
}
