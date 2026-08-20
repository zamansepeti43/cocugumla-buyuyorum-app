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
  {
    label: 'Ana Sayfa',
    icon: Home,
    to: '/home',
    locked: false,
  },
  {
    label: 'Keşif Haritası',
    icon: Map,
    to: '/worlds',
    locked: false,
  },
  {
    label: 'Dünya',
    icon: Globe2,
    to: '/worlds/forest',
    locked: false,
  },
  {
    label: 'Bölüm',
    icon: BookOpen,
    to: '/worlds/forest/section/1',
    locked: false,
  },
  {
    label: 'Ders / İçerik',
    icon: Play,
    to: '/worlds/content/a001',
    locked: false,
  },
  {
    label: 'Oyun',
    icon: Gamepad2,
    to: '/activities',
    locked: false,
  },
  {
    label: 'Ödül',
    icon: Trophy,
    to: '/progress',
    locked: false,
  },
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

        {/* =====================================================
            SAYFA BAŞLIĞI
           ===================================================== */}

        <header className="worlds-heading">
          <div>
            <div className="worlds-eyebrow">
              <Compass size={18} />
              KEŞİF HARİTASI
            </div>

            <h1>Dünyaları keşfet, yeni maceralara atıl!</h1>

            <p>
              Öğrenirken eğlen, yıldızlarını topla ve yeni dünyaların
              kilidini aç.
            </p>
          </div>

          <div className="worlds-heading-stats">
            <div>
              <Star size={20} fill="currentColor" />

              <strong>1280</strong>

              <span>Toplam Yıldız</span>
            </div>

            <div>
              <Sparkles size={20} />

              <strong>66%</strong>

              <span>Keşif İlerlemesi</span>
            </div>
          </div>
        </header>

        {/* =====================================================
            ANA HARİTA
           ===================================================== */}

        <section className="worlds-map">

          {/* TEMİZ REFERANS GÖRSELİ */}
          <img
            src="/keşif-haritası-arkaplan.png"
            alt=""
            className="worlds-map-background"
            draggable={false}
          />

          {/* =================================================
              SADECE BUTONLARIN BULUNDUĞU ALAN
             ================================================= */}

          <div className="worlds-map-buttons">

            {worlds.map((world) => (
              <WorldButton
                key={world.id}
                world={world}
              />
            ))}

          </div>

          {/* =================================================
              SAĞ PANEL
             ================================================= */}

          <aside className="worlds-side-panel">

            {/* İLERLEME */}

            <div className="progress-panel">

              <div className="panel-heading">
                <span>Keşif İlerlemen</span>
                <Sparkles size={17} />
              </div>

              <div className="progress-ring">
                <div>
                  <strong>66%</strong>
                </div>
              </div>

              <strong className="progress-text">
                7/12 Dünya keşfedildi
              </strong>

              <div className="progress-stars">
                <Star size={19} fill="currentColor" />
                <strong>148 / 224</strong>
              </div>

            </div>

            {/* İPUÇLARI */}

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

              <div className="tips-character">
                🧸
              </div>

            </div>

            {/* RASTGELE */}

            <NavLink
              to="/worlds/random"
              className="random-world-button"
            >
              <div className="random-icon">
                🎲
              </div>

              <div>
                <strong>Rastgele Keşfet</strong>
                <span>Beni şaşırt!</span>
              </div>

              <span className="random-arrow">
                ›
              </span>
            </NavLink>

          </aside>

        </section>

        {/* =====================================================
            KEŞİF YOLCULUĞU
           ===================================================== */}

        <section className="journey-panel">

          <div className="journey-title">
            <Map size={19} />
            <strong>Keşif Yolculuğun</strong>
          </div>

          <div className="journey-track">

            {journey.map((step, index) => {
              const Icon = step.icon

              return (
                <div
                  className="journey-step-wrapper"
                  key={step.label}
                >

                  <NavLink
                    to={step.to}
                    className={`journey-step ${
                      step.locked
                        ? 'journey-step-locked'
                        : ''
                    }`}
                  >

                    <div className="journey-icon">

                      <Icon size={22} />

                      {step.locked && (
                        <span className="journey-lock">
                          <Lock size={10} />
                        </span>
                      )}

                    </div>

                    <span>
                      {step.label}
                    </span>

                  </NavLink>

                  {index < journey.length - 1 && (
                    <div className="journey-arrow">
                      →
                    </div>
                  )}

                </div>
              )
            })}

          </div>

          <div className="journey-message">

            <Medal size={31} />

            <div>
              <strong>
                Her keşif seni yeni bilgilerle buluşturur!
              </strong>

              <span>
                Dünyaları keşfet, dersleri tamamla ve
                ödüllerini topla.
              </span>
            </div>

          </div>

        </section>

        {/* =====================================================
            ALT HIZLI MENÜ
           ===================================================== */}

        <nav className="worlds-footer-actions">

          <NavLink to="/home">
            <Home size={16} />
            Ana Sayfa
          </NavLink>

          <NavLink to="/activities">
            <Gamepad2 size={16} />
            Oyunlar
          </NavLink>

          <NavLink to="/english">
            <BookOpen size={16} />
            İngilizce
          </NavLink>

          <NavLink to="/progress">
            <Trophy size={16} />
            İlerlemem
          </NavLink>

        </nav>

      </section>
    </div>
  )
}