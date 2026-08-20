import {
  BookOpen,
  Compass,
  Gamepad2,
  Globe2,
  Home,
  Lock,
  Map,
  Medal,
  Play,
  Sparkles,
  Star,
  Trophy,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import './worlds-premium.css'
import './worlds-refinement.css'

type World = {
  id: string
  title: string
  subtitle: string
  emoji: string
  stars: string
  tone: string
  buttonClass: string
}

const worlds: World[] = [
  {
    id: 'forest',
    title: 'Orman Dünyası',
    subtitle: 'Hayvanlar ve doğa',
    emoji: '🦌',
    stars: '24/48',
    tone: 'green',
    buttonClass: 'world-button-forest',
  },
  {
    id: 'space',
    title: 'Uzay Dünyası',
    subtitle: 'Gezegenler ve uzay',
    emoji: '🚀',
    stars: '18/36',
    tone: 'purple',
    buttonClass: 'world-button-space',
  },
  {
    id: 'sea',
    title: 'Deniz Dünyası',
    subtitle: 'Deniz canlılarını keşfet',
    emoji: '🐋',
    stars: '20/40',
    tone: 'blue',
    buttonClass: 'world-button-sea',
  },
  {
    id: 'english',
    title: 'English World',
    subtitle: 'Learn English',
    emoji: '🇬🇧',
    stars: '16/32',
    tone: 'navy',
    buttonClass: 'world-button-english',
  },
  {
    id: 'stories',
    title: 'Hikâye Dünyası',
    subtitle: 'Hikâyeler ve kitaplar',
    emoji: '📖',
    stars: '22/44',
    tone: 'pink',
    buttonClass: 'world-button-stories',
  },
  {
    id: 'games',
    title: 'Oyunlar Dünyası',
    subtitle: 'Eğlenceli oyunlar',
    emoji: '🎮',
    stars: '30/60',
    tone: 'orange',
    buttonClass: 'world-button-games',
  },
  {
    id: 'math',
    title: 'Matematik Dünyası',
    subtitle: 'Sayılar ve şekiller',
    emoji: '🔢',
    stars: '18/36',
    tone: 'lime',
    buttonClass: 'world-button-math',
  },
]

const journey = [
  { label: 'Ana Sayfa', icon: Home, to: '/home', locked: false },
  { label: 'Keşif Haritası', icon: Map, to: '/worlds', locked: false },
  { label: 'Dünya', icon: Globe2, to: '/worlds/forest', locked: false },
  { label: 'Bölüm', icon: BookOpen, to: '/worlds/forest/section/1', locked: false },
  { label: 'Ders / İçerik', icon: Play, to: '/worlds/content/a001', locked: false },
  { label: 'Oyun', icon: Gamepad2, to: '/activities', locked: false },
  { label: 'Ödül', icon: Trophy, to: '/progress', locked: false },
]

function WorldButton({ world }: { world: World }) {
  return (
    <NavLink
      to={`/worlds/${world.id}`}
      className={`world-button ${world.buttonClass}`}
      aria-label={`${world.title} aç`}
    >
      <div className={`world-button-art world-button-art-${world.tone}`}>
        <span>{world.emoji}</span>
      </div>
      <div className={`world-label world-label-${world.tone}`}>
        <strong>{world.title}</strong>
        <span>
          <Star size={15} fill="currentColor" />
          {world.stars}
        </span>
      </div>
    </NavLink>
  )
}

export function WorldsPage() {
  return (
    <div className="page worlds-page">
      <section className="worlds-shell">
        <header
          className="worlds-heading"
          style={{
            alignItems: 'center',
            padding: '20px 24px',
            marginBottom: '18px',
            borderRadius: '22px',
            boxSizing: 'border-box',
            background: 'linear-gradient(135deg, rgba(27,38,82,.98) 0%, rgba(18,23,52,.98) 58%, rgba(39,28,72,.98) 100%)',
            border: '1px solid rgba(135,153,255,.22)',
            boxShadow: '0 18px 40px rgba(0,0,0,.24), inset 0 1px 0 rgba(255,255,255,.08)',
          }}
        >
          <div style={{ flex: '1 1 auto' }}>
            <div className="worlds-eyebrow">
              <Compass size={17} />
              KEŞİF HARİTASI
            </div>
            <h1 style={{ fontSize: 'clamp(27px, 3vw, 38px)' }}>
              Dünyaları keşfet, yeni maceralara atıl!
            </h1>
            <p style={{ marginTop: '8px', maxWidth: '620px' }}>
              Öğrenirken eğlen, yıldızlarını topla ve yeni dünyaların kilidini aç.
            </p>
          </div>

          <div
            className="worlds-heading-stats"
            style={{
              display: 'flex',
              alignItems: 'stretch',
              gap: '10px',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                minWidth: '112px',
                padding: '12px 14px',
                display: 'grid',
                gridTemplateColumns: '22px 1fr',
                gridTemplateRows: 'auto auto',
                columnGap: '7px',
                borderRadius: '15px',
                background: 'rgba(255,255,255,.07)',
                border: '1px solid rgba(255,255,255,.13)',
                boxShadow: 'none',
                color: '#fff',
              }}
            >
              <Star size={19} fill="currentColor" style={{ gridRow: '1 / span 2', alignSelf: 'center', color: '#f5c43b' }} />
              <strong style={{ color: '#fff', fontSize: '16px' }}>1.280</strong>
              <span style={{ color: 'rgba(235,241,255,.58)', fontSize: '9px' }}>Toplam Yıldız</span>
            </div>

            <div
              style={{
                minWidth: '112px',
                padding: '12px 14px',
                display: 'grid',
                gridTemplateColumns: '22px 1fr',
                gridTemplateRows: 'auto auto',
                columnGap: '7px',
                borderRadius: '15px',
                background: 'rgba(255,255,255,.07)',
                border: '1px solid rgba(255,255,255,.13)',
                boxShadow: 'none',
                color: '#fff',
              }}
            >
              <Sparkles size={19} style={{ gridRow: '1 / span 2', alignSelf: 'center', color: '#a88cff' }} />
              <strong style={{ color: '#fff', fontSize: '16px' }}>66%</strong>
              <span style={{ color: 'rgba(235,241,255,.58)', fontSize: '9px' }}>Keşif İlerlemesi</span>
            </div>
          </div>
        </header>

        <section className="worlds-map">
          <img
            src="/keşif-haritası-arkaplan.png"
            alt=""
            className="worlds-map-background"
            draggable={false}
          />

          <div className="worlds-map-buttons">
            {worlds.map((world) => (
              <WorldButton key={world.id} world={world} />
            ))}
          </div>

          <aside className="worlds-side-panel">
            <div className="progress-panel">
              <div className="panel-heading">
                <span>Keşif İlerlemen</span>
                <Sparkles size={17} />
              </div>
              <div className="progress-ring">
                <div><strong>66%</strong></div>
              </div>
              <strong className="progress-text">7/12 Dünya keşfedildi</strong>
              <div className="progress-stars">
                <Star size={19} fill="currentColor" />
                <strong>148 / 224</strong>
              </div>
            </div>

            <div className="tips-panel">
              <div className="panel-heading">
                <span>💡 Keşfetme İpuçları</span>
              </div>
              <ul>
                <li>Yeni dünyalar keşfet</li>
                <li>Oyunlar oyna</li>
                <li>Yıldız kazan</li>
                <li>Ödüllerini topla</li>
                <li>Öğrenirken eğlen!</li>
              </ul>
              <div className="tips-character">🧸</div>
            </div>

            <NavLink to="/worlds/random" className="random-world-button">
              <div className="random-icon">🎲</div>
              <div>
                <strong>Rastgele Keşfet</strong>
                <span>Beni şaşırt!</span>
              </div>
              <span className="random-arrow">›</span>
            </NavLink>
          </aside>
        </section>

        <section className="journey-panel">
          <div className="journey-title">
            <Map size={19} />
            <strong>Keşif Yolculuğun</strong>
          </div>
          <div className="journey-track">
            {journey.map((step, index) => {
              const Icon = step.icon
              return (
                <div className="journey-step-wrapper" key={step.label}>
                  <NavLink
                    to={step.to}
                    className={`journey-step ${step.locked ? 'journey-step-locked' : ''}`}
                  >
                    <div className="journey-icon">
                      <Icon size={22} />
                      {step.locked && (
                        <span className="journey-lock"><Lock size={10} /></span>
                      )}
                    </div>
                    <span>{step.label}</span>
                  </NavLink>
                  {index < journey.length - 1 && <div className="journey-arrow">→</div>}
                </div>
              )
            })}
          </div>
          <div className="journey-message">
            <Medal size={31} />
            <div>
              <strong>Her keşif seni yeni bilgilerle buluşturur!</strong>
              <span>Dünyaları keşfet, dersleri tamamla ve ödüllerini topla.</span>
            </div>
          </div>
        </section>

        <nav className="worlds-footer-actions">
          <NavLink to="/home"><Home size={16} />Ana Sayfa</NavLink>
          <NavLink to="/activities"><Gamepad2 size={16} />Oyunlar</NavLink>
          <NavLink to="/english"><BookOpen size={16} />İngilizce</NavLink>
          <NavLink to="/progress"><Trophy size={16} />İlerlemem</NavLink>
        </nav>
      </section>
    </div>
  )
}
