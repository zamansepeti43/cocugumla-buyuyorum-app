import { useState } from 'react'
import { ForestDiscoveryGame } from '../components/games/ForestDiscoveryGame'
import './nature-world-screen.css'

/**
 * Completely isolated entry point for Doğa Dünyası.
 * This page deliberately does not import WorldDetailPage, useWorlds,
 * progress state, the app shell, or ProtectedRoute.
 */
export function ForestWorldEntryPage() {
  const [entered, setEntered] = useState(false)

  if (!entered) {
    return (
      <div className="nature-world-route">
        <ForestDiscoveryGame onNext={() => setEntered(true)} />
      </div>
    )
  }

  return (
    <main className="nature-world-screen" aria-label="Doğa Dünyası">
      <div className="nature-map-header">
        <button type="button" className="nature-map-back" onClick={() => setEntered(false)}>← Geri</button>
        <div><span>🌿 DOĞA DÜNYASI</span><h1>Keşfetmeye hazır mısın?</h1></div>
        <div className="nature-map-stars">⭐ 0</div>
      </div>
      <div className="nature-map-scene">
        <div className="nature-map-cloud cloud-a" /><div className="nature-map-cloud cloud-b" />
        <div className="nature-map-sun" />
        <div className="nature-map-hill hill-a" /><div className="nature-map-hill hill-b" />
        <div className="nature-map-river" />
        <div className="nature-map-path path-one" /><div className="nature-map-path path-two" />
        <div className="nature-map-character"><img src="/illustrations/forest/leo-lion.svg" alt="Leo" /></div>
        <div className="nature-map-islands">
          {[
            ['Hayvanlar','🦊','https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=900&q=88'],
            ['Doğa','🌿','https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=88'],
            ['Sesler','🔊','https://images.unsplash.com/photo-1473445361085-b9a07f55608b?auto=format&fit=crop&w=900&q=88'],
          ].map(([title, icon, art], index) => (
            <button key={title} type="button" className={`nature-map-island island-${index + 1}`} style={{ backgroundImage: `linear-gradient(180deg,rgba(255,255,255,.08),rgba(20,65,37,.58)),url(${art})` }}>
              <span className="island-icon">{icon}</span><strong>{title}</strong><small>Keşfet →</small>
            </button>
          ))}
        </div>
      </div>
      <div className="nature-map-tip">Leo ile birlikte bir adaya dokun ve keşfe başla! 🐾</div>
    </main>
  )
}
