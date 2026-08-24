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
