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
import './worlds-reference.css'

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

const journey = [
  { label: 'Ana Sayfa', icon: Home, to: '/home' },
  { label: 'Keşif Haritası', icon: Map, to: '/worlds' },
  { label: 'Dünya', icon: Globe2, to: '/worlds/forest' },
  { label: 'Bölüm', icon: BookOpen, to: '/worlds/forest/section/1' },
  { label: 'Ders / İçerik', icon: Play, to: '/worlds/content/a001' },
  { label: 'Oyun', icon: Gamepad2, to: '/activities' },
  { label: 'Ödül', icon: Trophy, to: '/progress' },
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
      <section className="worlds-shell">
        <section className="worlds-map" aria-label="Keşif dünyaları haritası">
          <img src="/kesif-haritasi-arkaplan.png" alt="" className="worlds-map-background" draggable={false} />
          <div className="map-atmosphere" aria-hidden="true" />
          <header className="map-title">
            <div className="worlds-eyebrow"><Compass size={14} /> KEŞİF HARİTASI</div>
            <h1>Dünyaları keşfet, yeni maceralara atıl!</h1>
            <p>Öğrenirken eğlen, yıldızlarını topla ve yeni dünyaların kilidini aç.</p>
          </header>
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
        <section className="journey-panel">
          <div className="journey-heading">
            <div className="journey-title"><Map size={18} /><strong>Keşif Yolculuğun</strong></div>
            <span>Öğren → Pekiştir → Tamamla → Ödül kazan</span>
          </div>
          <div className="journey-track">
            {journey.map((step, index) => {
              const Icon = step.icon
              return <div className="journey-step-wrapper" key={step.label}><NavLink to={step.to} className="journey-step"><div className="journey-icon"><Icon size={20} /></div><span>{step.label}</span></NavLink>{index < journey.length - 1 && <div className="journey-arrow">→</div>}</div>
            })}
            <div className="journey-message"><Medal size={24} /><div><strong>Her keşif seni yeni bilgilerle buluşturur!</strong><span>Dünyaları keşfet, dersleri tamamla ve ödüllerini topla.</span></div></div>
          </div>
        </section>
      </section>
    </div>
  )
}
