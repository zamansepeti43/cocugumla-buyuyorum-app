import {
  ArrowLeft,
  Compass,
  Star,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import './worlds-clean.css'
import './world-visuals.css'
import './worlds-reference.css'
import './worlds-mobile-fix.css'
import './worlds-fullscreen.css'

type World = {
  id: string
  title: string
  description: string
  emoji: string
  stars: string
  tone: string
  buttonClass: string
  islands: string[]
}

const worlds: World[] = [
  { id: 'forest', title: 'Doğa Dünyası', description: 'Hayvanlar, doğa ve sesler', emoji: '🌳', stars: '24/48', tone: 'green', buttonClass: 'world-button-forest', islands: ['Hayvanlar', 'Doğa', 'Çevre', 'Sesler'] },
  { id: 'space', title: 'Keşif Dünyası', description: 'Uzay, deniz, bilim ve keşif', emoji: '🚀', stars: '20/40', tone: 'purple', buttonClass: 'world-button-space', islands: ['Uzay', 'Deniz', 'Bilim', 'Keşif'] },
  { id: 'english', title: 'Dil & Hikâye Dünyası', description: 'İngilizce, konuşma ve hikâyeler', emoji: '📚', stars: '18/36', tone: 'blue', buttonClass: 'world-button-english', islands: ['İngilizce', 'Hikâyeler', 'Konuşma', 'Masallar'] },
  { id: 'games', title: 'Oyun Dünyası', description: 'Dikkat, hafıza ve eğlenceli oyunlar', emoji: '🎮', stars: '30/60', tone: 'orange', buttonClass: 'world-button-games', islands: ['Dikkat', 'Hafıza', 'Eşleştirme', 'Mini Oyunlar'] },
  { id: 'math', title: 'Zihin Dünyası', description: 'Sayılar, şekiller ve mantık', emoji: '🧠', stars: '18/36', tone: 'blue', buttonClass: 'world-button-math', islands: ['Matematik', 'Şekiller', 'Mantık', 'Problem Çözme'] },
]

function WorldButton({ world }: { world: World }) {
  return (
    <NavLink to={`/worlds/${world.id}`} className={`world-button ${world.buttonClass}`} aria-label={`${world.title} aç`}>
      <div className="world-island-visual" aria-hidden="true"><div className="world-island-glow" /></div>
      <div className={`world-label world-label-${world.tone}`}>
        <div className="world-label-top"><span className="world-emoji" aria-hidden="true">{world.emoji}</span><strong>{world.title}</strong></div>
        <div className="world-subislands">{world.islands.map((island) => <span key={island}>{island}</span>)}</div>
        <span className="world-stars"><Star size={12} fill="currentColor" />{world.stars}</span>
      </div>
    </NavLink>
  )
}

export function WorldsPage() {
  return (
    <div className="page worlds-page">
      <style>{`
        /* Worlds-only viewport lock. This is intentionally scoped so no other page changes. */
        html body #root .app-shell-worlds,
        html body #root .app-shell-worlds .main-content,
        html body #root .app-shell-worlds .worlds-main-content,
        html body #root .app-shell-worlds .worlds-page,
        html body #root .app-shell-worlds .worlds-shell,
        html body #root .app-shell-worlds .worlds-map {
          width: 100vw !important;
          max-width: none !important;
          min-width: 0 !important;
          margin: 0 !important;
          box-sizing: border-box !important;
          overflow: hidden !important;
        }

        html body #root .app-shell-worlds {
          position: fixed !important;
          inset: 0 !important;
          height: 100dvh !important;
          min-height: 0 !important;
          max-height: 100dvh !important;
          display: block !important;
          background: transparent !important;
          overflow: hidden !important;
        }

        html body #root .app-shell-worlds .main-content,
        html body #root .app-shell-worlds .worlds-main-content,
        html body #root .app-shell-worlds .worlds-page {
          height: 100dvh !important;
          min-height: 0 !important;
          max-height: 100dvh !important;
          padding: 0 !important;
          background: transparent !important;
          position: relative !important;
        }

        html body #root .app-shell-worlds .worlds-shell,
        html body #root .app-shell-worlds .worlds-map {
          height: 100dvh !important;
          min-height: 0 !important;
          max-height: 100dvh !important;
        }

        /* No translucent/blurred strip at the top: the map is directly visible behind nav. */
        html body #root .app-shell-worlds .topbar,
        html body #root .app-shell-worlds .topbar::before,
        html body #root .app-shell-worlds .topbar::after {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          width: 100vw !important;
          height: 64px !important;
          min-height: 64px !important;
          max-height: 64px !important;
          background: transparent !important;
          background-color: transparent !important;
          background-image: none !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          filter: none !important;
          box-shadow: none !important;
          border: 0 !important;
          border-bottom: 0 !important;
          display: grid !important;
          z-index: 99999 !important;
          visibility: visible !important;
          opacity: 1 !important;
        }

        html body #root .app-shell-worlds .topbar::before,
        html body #root .app-shell-worlds .topbar::after {
          content: none !important;
          display: none !important;
        }

        html body #root .app-shell-worlds .topbar .desktop-nav {
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
          width: 100% !important;
          min-width: 0 !important;
          max-width: 460px !important;
          height: 48px !important;
          padding: 2px !important;
          margin: 0 auto !important;
          gap: 1px !important;
          background: transparent !important;
          border: 0 !important;
          box-shadow: none !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }

        html body #root .app-shell-worlds .topbar .desktop-nav a {
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
          flex: 1 1 0 !important;
          min-width: 0 !important;
          min-height: 40px !important;
          height: 40px !important;
          padding: 0 5px !important;
          margin: 0 !important;
          justify-content: center !important;
          align-items: center !important;
          gap: 0 !important;
          background: transparent !important;
          border: 0 !important;
          box-shadow: none !important;
          color: rgba(255,255,255,.9) !important;
          font-size: 0 !important;
          line-height: 1 !important;
          white-space: nowrap !important;
        }

        html body #root .app-shell-worlds .topbar .desktop-nav a svg {
          display: block !important;
          visibility: visible !important;
          width: 20px !important;
          height: 20px !important;
          flex: 0 0 auto !important;
          opacity: 1 !important;
        }

        html body #root .app-shell-worlds .topbar .desktop-nav a.active {
          color: #ffd45a !important;
          background: rgba(255,212,90,.10) !important;
          border: 1px solid rgba(255,212,90,.32) !important;
          border-radius: 9px !important;
          box-shadow: none !important;
        }

        html body #root .app-shell-worlds .topbar .brand,
        html body #root .app-shell-worlds .topbar .brand-logo,
        html body #root .app-shell-worlds .topbar .child-chip,
        html body #root .app-shell-worlds .topbar .parent-access {
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          filter: none !important;
        }

        html body #root .app-shell-worlds .topbar .brand-logo {
          max-width: 120px !important;
          height: 40px !important;
        }

        /* Remove every map-wide atmosphere/gradient layer; only the real map remains. */
        html body #root .app-shell-worlds .map-atmosphere,
        html body #root .app-shell-worlds .worlds-map::before,
        html body #root .app-shell-worlds .worlds-map::after {
          display: none !important;
          content: none !important;
          background: transparent !important;
          background-image: none !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          filter: none !important;
          box-shadow: none !important;
        }

        html body #root .app-shell-worlds .worlds-map-background {
          position: absolute !important;
          inset: 0 !important;
          width: 100% !important;
          height: 100% !important;
          max-width: none !important;
          object-fit: cover !important;
          object-position: center center !important;
          z-index: 0 !important;
        }

        html body #root .app-shell-worlds .worlds-map-buttons {
          position: absolute !important;
          inset: 0 !important;
          overflow: hidden !important;
          z-index: 10 !important;
        }

        html body #root .app-shell-worlds .map-progress-card {
          position: absolute !important;
          left: 16px !important;
          right: auto !important;
          top: auto !important;
          bottom: 16px !important;
          transform: scale(.86) !important;
          transform-origin: left bottom !important;
          z-index: 100 !important;
        }

        html body #root .app-shell-worlds .random-world-button {
          position: absolute !important;
          left: auto !important;
          right: 16px !important;
          top: auto !important;
          bottom: 16px !important;
          transform: scale(.86) !important;
          transform-origin: right bottom !important;
          z-index: 100 !important;
        }

        html body #root .app-shell-worlds .worlds-back {
          z-index: 100001 !important;
          position: fixed !important;
          top: 68px !important;
          left: 8px !important;
          transform: scale(.82) !important;
          transform-origin: left top !important;
        }

        /* Bottom edge stays completely transparent; no hidden/blurred bottom bar. */
        html body #root .app-shell-worlds .bottom-nav {
          display: none !important;
          background: transparent !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          box-shadow: none !important;
          border: 0 !important;
        }

        @media (min-width: 901px) {
          html body #root .app-shell-worlds .topbar {
            height: 76px !important;
            min-height: 76px !important;
            max-height: 76px !important;
            padding: 0 22px !important;
          }
          html body #root .app-shell-worlds .topbar .desktop-nav a {
            font-size: 12px !important;
            padding: 0 12px !important;
            gap: 6px !important;
          }
          html body #root .app-shell-worlds .topbar .desktop-nav a svg {
            width: 15px !important;
            height: 15px !important;
          }
          html body #root .app-shell-worlds .worlds-map .world-button {
            transform: translate(-50%, -50%) scale(.86) !important;
          }
        }

        @media (max-width: 900px) {
          html body #root .app-shell-worlds .topbar {
            grid-template-columns: auto minmax(0, 1fr) auto !important;
            gap: 5px !important;
            padding: 4px 8px !important;
          }
          html body #root .app-shell-worlds .topbar .child-chip {
            display: none !important;
          }
          html body #root .app-shell-worlds .topbar .parent-access {
            display: inline-flex !important;
            justify-content: center !important;
            align-items: center !important;
            width: 32px !important;
            height: 32px !important;
            margin: 0 !important;
          }
          html body #root .app-shell-worlds .topbar .parent-access svg {
            width: 18px !important;
            height: 18px !important;
          }
          html body #root .app-shell-worlds .worlds-map .world-button {
            transform: translate(-50%, -50%) scale(.72) !important;
          }
          html body #root .app-shell-worlds .worlds-back {
            top: 66px !important;
          }
        }

        @media (max-width: 900px) and (orientation: landscape) {
          html body #root .app-shell-worlds .topbar {
            height: 54px !important;
            min-height: 54px !important;
            max-height: 54px !important;
          }
          html body #root .app-shell-worlds .topbar .brand-logo {
            max-width: 88px !important;
            height: 30px !important;
          }
          html body #root .app-shell-worlds .topbar .desktop-nav {
            max-width: 390px !important;
            height: 42px !important;
          }
          html body #root .app-shell-worlds .topbar .desktop-nav a {
            min-height: 34px !important;
            height: 34px !important;
          }
          html body #root .app-shell-worlds .topbar .desktop-nav a svg {
            display: block !important;
            width: 18px !important;
            height: 18px !important;
          }
          html body #root .app-shell-worlds .worlds-map .world-button {
            transform: translate(-50%, -50%) scale(.60) !important;
          }
          html body #root .app-shell-worlds .map-progress-card {
            left: 8px !important;
            bottom: 6px !important;
            transform: scale(.62) !important;
          }
          html body #root .app-shell-worlds .random-world-button {
            right: 8px !important;
            bottom: 6px !important;
            transform: scale(.62) !important;
          }
          html body #root .app-shell-worlds .worlds-back {
            top: 58px !important;
            transform: scale(.68) !important;
          }
        }

        @media (max-width: 900px) and (orientation: portrait) {
          html body #root .app-shell-worlds .topbar {
            height: 58px !important;
            min-height: 58px !important;
            max-height: 58px !important;
          }
          html body #root .app-shell-worlds .topbar .brand-logo {
            max-width: 96px !important;
            height: 32px !important;
          }
          html body #root .app-shell-worlds .topbar .desktop-nav {
            max-width: 350px !important;
            height: 44px !important;
          }
          html body #root .app-shell-worlds .topbar .desktop-nav a svg {
            display: block !important;
            width: 19px !important;
            height: 19px !important;
          }
          html body #root .app-shell-worlds .worlds-map .world-button {
            transform: translate(-50%, -50%) scale(.68) !important;
          }
          html body #root .app-shell-worlds .map-progress-card {
            left: 8px !important;
            bottom: 8px !important;
            transform: scale(.72) !important;
          }
          html body #root .app-shell-worlds .random-world-button {
            right: 8px !important;
            bottom: 8px !important;
            transform: scale(.72) !important;
          }
        }

        @media (max-width: 900px) and (orientation: landscape) and (max-height: 430px) {
          html body #root .app-shell-worlds .topbar {
            height: 48px !important;
            min-height: 48px !important;
            max-height: 48px !important;
          }
          html body #root .app-shell-worlds .topbar .desktop-nav {
            height: 38px !important;
          }
          html body #root .app-shell-worlds .topbar .desktop-nav a {
            min-height: 32px !important;
            height: 32px !important;
          }
          html body #root .app-shell-worlds .topbar .desktop-nav a svg {
            width: 16px !important;
            height: 16px !important;
          }
          html body #root .app-shell-worlds .worlds-map .world-button {
            transform: translate(-50%, -50%) scale(.52) !important;
          }
          html body #root .app-shell-worlds .map-progress-card,
          html body #root .app-shell-worlds .random-world-button {
            transform: scale(.55) !important;
            bottom: 4px !important;
          }
        }
      `}</style>
      <section className="worlds-shell">
        <button className="worlds-back" onClick={() => window.history.back()} aria-label="Geri dön"><ArrowLeft size={20} /></button>
        <section className="worlds-map" aria-label="Keşif dünyaları haritası">
          <img src="/kesif-haritasi-arkaplan.png" alt="Keşif Dünyası - beş dünya haritası" className="worlds-map-background" draggable={false} />
          <div className="map-atmosphere" aria-hidden="true" />
          <div className="map-progress-card">
            <div className="map-progress-title"><span>İlerlemen</span><Compass size={13} /></div>
            <div className="map-progress-ring"><strong>66%</strong></div>
            <strong className="map-progress-total">148 / 224 <Star size={11} fill="currentColor" /></strong>
          </div>
          <div className="worlds-map-buttons">{worlds.map((world) => <WorldButton key={world.id} world={world} />)}</div>
          <NavLink to="/worlds/random" className="random-world-button" aria-label="Rastgele dünya keşfet">
            <span className="random-icon">✦</span>
            <span className="random-copy"><strong>Rastgele Keşfet</strong><small>Beni şaşırt!</small></span>
            <span className="random-arrow">›</span>
          </NavLink>
        </section>
      </section>
    </div>
  )
}
