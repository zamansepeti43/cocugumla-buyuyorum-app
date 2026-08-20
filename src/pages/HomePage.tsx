import { useApp } from '../hooks/useApp'
import './home-premium.css'
import './world-visuals.css'
import {
  Home,
  Compass,
  Gamepad2,
  BookOpen,
  UserRound,
  Sparkles,
  Flame,
  Star,
  Globe2,
  MessageCircle,
  MoonStar,
  Search,
  Palette,
  Calculator,
  Baby,
  GraduationCap,
  ArrowRight,
  Map,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Ana Sayfa', href: '/home', icon: Home },
  { label: 'Keşfet', href: '/worlds', icon: Compass },
  { label: 'Oyunlar', href: '/activities', icon: Gamepad2 },
  { label: 'İngilizce', href: '/english', icon: BookOpen },
  { label: 'Hikâyeler', href: '/stories', icon: BookOpen },
  { label: 'Profil', href: '/profile', icon: UserRound },
]

const categories = [
  { label: 'Oyunlar', href: '/activities', icon: Gamepad2, tone: 'violet' },
  { label: 'İngilizce', href: '/english', icon: BookOpen, tone: 'blue' },
  { label: 'Matematik', href: '/activities?category=matematik', icon: Calculator, tone: 'yellow' },
  { label: 'Konuşma', href: '/activities?category=konusma', icon: MessageCircle, tone: 'cyan' },
  { label: 'Hikâyeler', href: '/stories', icon: BookOpen, tone: 'lilac' },
  { label: 'Masallar', href: '/stories?type=masal', icon: MoonStar, tone: 'gold' },
  { label: 'Keşif', href: '/worlds', icon: Search, tone: 'green' },
  { label: 'Sanat', href: '/activities?category=sanat', icon: Palette, tone: 'pink' },
]

function Illustration({ type }: { type: 'child' | 'lion' | 'tiger' | 'bear' | 'elephant' }) {
  const data = {
    child: ['👦', 'illustration-child'],
    lion: ['🦁', 'illustration-lion'],
    tiger: ['🐯', 'illustration-tiger'],
    bear: ['🐻', 'illustration-bear'],
    elephant: ['🐘', 'illustration-elephant'],
  } as const
  const [emoji, className] = data[type]
  return (
    <div className={`premium-illustration ${className}`} aria-hidden="true">
      <span>{emoji}</span>
      <i />
      <b />
    </div>
  )
}

export function HomePage() {
  const { activeChild } = useApp()
  if (!activeChild) return null

  const childName = String((activeChild as { name?: string }).name ?? 'Ahmet')

  return (
    <div className="page home-page premium-home-page">
      <div className="premium-home">
        <header className="premium-header">
          <NavLink to="/home" className="premium-brand" aria-label="Çocuğumla Büyüyorum ana sayfa">
            <span className="brand-heart">♥</span>
            <span className="brand-copy"><strong>ÇOCUĞUMLA <b>BÜYÜYORUM</b></strong><small>Çocuğun büyüme yolculuğu + Ebeveyn rehberliği</small></span>
          </NavLink>

          <nav className="premium-nav" aria-label="Ana navigasyon">
            {navItems.map(({ label, href, icon: Icon }) => (
              <NavLink key={label} to={href} className={({ isActive }) => isActive ? 'active' : ''}><Icon size={18} strokeWidth={2.3} /><span>{label}</span></NavLink>
            ))}
          </nav>

          <NavLink to="/parent" className="premium-parent-button" aria-label="Ebeveyn"><span className="parent-emoji">👨‍👩‍👦</span><span>Ebeveyn</span></NavLink>
        </header>

        <main>
          <section className="premium-hero">
            <div className="hero-stars" aria-hidden="true">✦ · ✧ · ✦</div>
            <div className="hero-child"><Illustration type="child" /></div>
            <div className="hero-copy">
              <span className="hero-badge"><span>1</span> 1. ANA EKRAN</span>
              <h1>Merhaba {childName}! <span>👋</span></h1>
              <p>Bugün harika şeyler<br />öğrenmeye hazır mısın?</p>
              <div className="hero-stats"><div><Star fill="currentColor" /><strong>1280</strong><small>Toplam Yıldız</small></div><div><Flame fill="currentColor" /><strong>5</strong><small>Günlük Seri</small></div></div>
            </div>
            <div className="hero-lion"><Illustration type="lion" /></div>
            <NavLink to="/parent" className="hero-parent-tile" aria-label="Ebeveyn"><span>👨‍👩‍👦</span><strong>Ebeveyn</strong></NavLink>
          </section>

          <section className="premium-feature-grid" aria-label="Bugünün içerikleri">
            <NavLink to="/worlds" className="premium-card discovery" aria-label="Bugünün Keşfi">
              <span className="card-kicker"><Sparkles size={18} fill="currentColor" /> BUGÜNÜN KEŞFİ</span><span className="new-pill">Yeni!</span>
              <div className="card-copy"><h2>Ormandaki<br />Hayvanları Keşfediyoruz!</h2><p>Hayvanları tanı, seslerini dinle<br />ve eğlenceli oyunlar oyna.</p></div>
              <Illustration type="tiger" /><span className="premium-cta pink">Keşfetmeye Başla <ArrowRight size={17} /></span>
            </NavLink>

            <NavLink to="/stories" className="premium-card story" aria-label="Bugünün Hikâyesi">
              <span className="card-kicker"><BookOpen size={18} fill="currentColor" /> BUGÜNÜN HİKÂYESİ</span>
              <div className="card-copy"><h2>Minik Ayı’nın<br />Büyük Macerası</h2><p>Minik Ayı yeni bir arkadaşa<br />yardım ediyor. Senin de güzel<br />bir maceran olsun!</p></div>
              <div className="story-moon">☾</div><Illustration type="bear" /><span className="premium-cta blue">Hikâyeyi Başlat <ArrowRight size={17} /></span>
            </NavLink>

            <NavLink to="/activities" className="premium-card continue" aria-label="Kaldığın Yerden Devam Et">
              <span className="card-kicker"><Gamepad2 size={18} /> KALDIĞIN YERDEN DEVAM ET</span>
              <div className="card-copy"><h2>Hayvan Sesleri Oyunu</h2><p>Kaldığın yerden devam et</p></div>
              <div className="progress-line"><span /></div><b className="progress-value">%70</b><Illustration type="elephant" /><span className="premium-cta purple">Devam Et <ArrowRight size={17} /></span>
            </NavLink>
          </section>

          <NavLink to="/worlds" className="premium-world-banner" aria-label="Dünyayı Keşfet"><span className="world-icon"><Globe2 size={30} /></span><span><strong>DÜNYAYI KEŞFET</strong><small>Yeni dünyalar, yeni maceralar seni bekliyor!</small></span><ArrowRight size={34} /></NavLink>

          <section className="premium-bottom" aria-label="Yaş ve kategori seçenekleri">
            <div className="age-panel-premium">
              <NavLink to="/worlds?age=0-2" aria-label="0–2 Yaş"><span><Baby /></span><strong>0–2 YAŞ</strong><small>Birlikte Büyüyoruz</small></NavLink>
              <NavLink to="/worlds?age=3-plus" aria-label="3+ Yaş"><span><GraduationCap /></span><strong>3+ YAŞ</strong><small>Keşfet & Öğren</small></NavLink>
            </div>
            <div className="category-panel-premium">{categories.map(({ label, href, icon: Icon, tone }) => <NavLink key={label} to={href} className={`category-item ${tone}`} aria-label={label}><span><Icon size={29} strokeWidth={2.25} /></span><small>{label}</small></NavLink>)}</div>
          </section>

          <div className="premium-mobile-scroll-hint"><Map size={15} /> Daha fazlası için yana kaydır</div>
        </main>
      </div>
    </div>
  )
}
