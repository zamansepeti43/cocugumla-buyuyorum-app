import {
  BookOpen,
  Compass,
  Gamepad2,
  Globe2,
  Home,
  Map,
  Medal,
  Play,
  Star,
  Trophy,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import './worlds-premium.css'
import './world-visuals.css'

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
  { id: 'forest', title: 'Doğa Dünyası', description: 'Hayvanlar, doğa ve sesler', emoji: '🌳', stars: '24/48', tone: 'green', buttonClass: 'world-button-forest', islands: ['Hayvanlar', 'Doğa', 'Sesler'] },
  { id: 'space', title: 'Keşif Dünyası', description: 'Uzay, deniz, bilim ve keşif', emoji: '🚀', stars: '38/76', tone: 'purple', buttonClass: 'world-button-space', islands: ['Uzay', 'Deniz', 'Bilim'] },
  { id: 'english', title: 'Dil & Hikâye Dünyası', description: 'İngilizce, konuşma ve hikâyeler', emoji: '📚', stars: '38/76', tone: 'blue', buttonClass: 'world-button-english', islands: ['İngilizce', 'Hikâyeler', 'Konuşma'] },
  { id: 'games', title: 'Oyun Dünyası', description: 'Dikkat, hafıza ve eğlenceli oyunlar', emoji: '🎮', stars: '30/60', tone: 'orange', buttonClass: 'world-button-games', islands: ['Dikkat', 'Hafıza', 'Mini Oyunlar'] },
  { id: 'math', title: 'Zihin Dünyası', description: 'Sayılar, şekiller ve mantık', emoji: '🧠', stars: '18/36', tone: 'lime', buttonClass: 'world-button-math', islands: ['Sayılar', 'Şekiller', 'Mantık'] },
]

const journey = [
  { label: 'Ana Sayfa', icon: Home, to: '/home' },
  { label: 'Keşfet', icon: Map, to: '/worlds' },
  { label: 'Dünya', icon: Globe2, to: '/worlds/forest' },
  { label: 'Bölüm', icon: BookOpen, to: '/worlds/forest/section/1' },
  { label: 'İçerik', icon: Play, to: '/worlds/content/a001' },
  { label: 'Oyun', icon: Gamepad2, to: '/activities' },
  { label: 'Ödül', icon: Trophy, to: '/progress' },
]

function WorldButton({ world }: { world: World }) {
  return (
    <NavLink to={`/worlds/${world.id}`} className={`world-button ${world.buttonClass}`} aria-label={`${world.title} aç`}>
      <div className="world-island-visual" aria-hidden="true">
        <div className="world-island-glow" />
      </div>
      <div className={`world-label world-label-${world.tone}`}>
        <div className="world-label-top">
          <span className="world-emoji" aria-hidden="true">{world.emoji}</span>
          <strong>{world.title}</strong>
        </div>
        <span className="world-stars"><Star size={12} fill="currentColor" />{world.stars}</span>
      </div>
    </NavLink>
  )
}

export function WorldsPage() {
  return (
    <div className="page worlds-page">
      <section className="worlds-shell">
        <header className="worlds-heading">
          <div>
            <div className="worlds-eyebrow"><Compass size={16} />KEŞİF HARİTASI</div>
            <h1>Dünyanı seç, keşfe başla!</h1>
            <p>Beş ana dünya. Her birinin içinde kendi görsel adaları ve öğrenme maceraları var.</p>
          </div>
          <div className="worlds-heading-stats">
            <div className="heading-stat"><Star size={18} fill="currentColor" /><strong>1.280</strong><span>Toplam yıldız</span></div>
            <div className="heading-stat"><Compass size={18} /><strong>66%</strong><span>Keşif ilerlemesi</span></div>
          </div>
        </header>

        <section className="worlds-map" aria-label="Keşif dünyaları haritası">
          <img src="/keşif-haritası-arkaplan.png" alt="" className="worlds-map-background" draggable={false} />
          <div className="map-atmosphere" aria-hidden="true" />

          <div className="map-progress-card">
            <div className="map-progress-title"><span>Keşif İlerlemen</span><Compass size={13} /></div>
            <div className="map-progress-body">
              <div className="map-progress-ring"><strong>66%</strong></div>
              <div><strong>7 / 12</strong><span>Dünya keşfedildi</span><small>⭐ 148 / 224</small></div>
            </div>
          </div>

          <div className="worlds-map-buttons">
            {worlds.map((world) => <WorldButton key={world.id} world={world} />)}
          </div>

          <NavLink to="/worlds/random" className="random-world-button" aria-label="Rastgele dünya keşfet">
            <span className="random-icon">🎲</span>
            <span className="random-copy"><strong>Beni şaşırt!</strong><small>Rastgele keşfet</small></span>
            <span className="random-arrow">›</span>
          </NavLink>
        </section>

        <section className="journey-panel">
          <div className="journey-heading">
            <div className="journey-title"><Map size={18} /><strong>Keşif Yolculuğun</strong></div>
            <span>Öğren → Pekiştir → Tamamla → Ödülünü kazan</span>
          </div>
          <div className="journey-track">
            {journey.map((step, index) => {
              const Icon = step.icon
              return (
                <div className="journey-step-wrapper" key={step.label}>
                  <NavLink to={step.to} className="journey-step"><div className="journey-icon"><Icon size={20} /></div><span>{step.label}</span></NavLink>
                  {index < journey.length - 1 && <div className="journey-arrow">→</div>}
                </div>
              )
            })}
            <div className="journey-message"><Medal size={24} /><div><strong>Her keşif yeni bir bilgi!</strong><span>Yıldızlarını topla ve yeni dünyaların kilidini aç.</span></div></div>
          </div>
        </section>
      </section>
    </div>
  )
}
