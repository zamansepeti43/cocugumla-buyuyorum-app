import { useEffect, useState } from 'react'
import './ForestDiscoveryGame.css'

type Character = { id: string; name: string; image: string; fact: string; color: string }

const characters: Character[] = [
  { id: 'leo', name: 'Leo', image: '/illustrations/forest/leo-lion.svg', fact: 'Ben Leo! Ormanda iz sürmeyi, hayvanları dinlemeyi ve yeni şeyler keşfetmeyi çok severim.', color: '#f2a746' },
  { id: 'luna', name: 'Luna', image: '/illustrations/forest/rabbit.svg', fact: 'Tavşanların uzun kulakları sesleri uzaktan duymalarına yardım eder.', color: '#e6a1d1' },
  { id: 'milo', name: 'Milo', image: '/illustrations/forest/bear.svg', fact: 'Ayılar güçlü koku alma duyularıyla yiyecekleri uzaktan bulabilir.', color: '#b9784f' },
]

export function ForestDiscoveryGame() {
  const [selected, setSelected] = useState('leo')
  const [action, setAction] = useState<'intro' | 'idle' | 'bounce' | 'walk'>('intro')
  const [message, setMessage] = useState('Merhaba küçük kaşif! Ben Leo. Hazırsan orman maceramız başlıyor!')
  const [stars, setStars] = useState(0)
  const character = characters.find((item) => item.id === selected) ?? characters[0]

  useEffect(() => {
    const introTimer = window.setTimeout(() => setAction('idle'), 1800)
    const loopTimer = window.setInterval(() => setAction((value) => value === 'idle' ? 'bounce' : 'idle'), 4800)
    return () => { window.clearTimeout(introTimer); window.clearInterval(loopTimer) }
  }, [])

  const discover = (item: Character) => {
    setSelected(item.id)
    setAction('bounce')
    setStars((value) => value + 1)
    setMessage(`Harika keşif! ${item.name}: ${item.fact}`)
  }

  return (
    <main className="forest-discovery landscape-world">
      <div className="forest-scene" style={{ ['--character-color' as string]: character.color }}>
        <div className="forest-illustrated-sky" />
        <div className="forest-layer forest-back" />
        <div className="forest-layer forest-mid" />
        <div className="forest-sun-art" />
        <div className="forest-cloud-art cloud-one" />
        <div className="forest-cloud-art cloud-two" />
        <div className="forest-hill hill-one" />
        <div className="forest-hill hill-two" />
        <div className="forest-waterfall" />
        <div className="forest-bridge-art" />
        <div className="forest-tree-art tree-left" />
        <div className="forest-tree-art tree-right" />
        <div className="forest-flower-bed" />
        <div className="forest-butterfly butterfly-one">🦋</div>
        <div className="forest-butterfly butterfly-two">🦋</div>
        <div className="forest-bird bird-one">🐦</div>
        <div className="forest-bunny bunny-one">🐰</div>
        <div className="forest-frog frog-one">🐸</div>

        <div className={`forest-main-character ${action === 'intro' ? 'is-entering' : ''} ${action === 'bounce' ? 'is-bouncing' : ''} ${action === 'walk' ? 'is-walking' : ''}`}>
          <img src={character.image} alt={character.name} />
          <div className="character-glow" />
        </div>

        <div className="forest-world-sign">🌿 DOĞA DÜNYASI</div>

        <div className="forest-welcome-card">
          <div className="story-avatar"><img src="/illustrations/forest/leo-lion.svg" alt="Leo" /></div>
          <div><strong>Merhaba küçük kaşif!</strong><p>Ben <b>Leo</b>. Bugün birlikte ormanın harikalarını keşfedeceğiz.</p></div>
        </div>

        <button className="forest-main-play" type="button" onClick={() => { setAction('walk'); setMessage('Leo seni ormanın derinliklerine götürüyor!'); setStars((value) => value + 1) }}><span>▶</span> Macera Başlasın!</button>

        <div className="forest-side-tools" aria-label="Doğa keşif alanları">
          <button type="button" onClick={() => { setAction('bounce'); setMessage('Hayvanların izlerini bulalım! 🐾'); setStars((value) => value + 1) }}><span>🦊</span>Hayvanlar</button>
          <button type="button" onClick={() => { setAction('bounce'); setMessage('Dinle! Ormanda ne güzel sesler var. 🔊'); setStars((value) => value + 1) }}><span>🔊</span>Sesler</button>
          <button type="button" onClick={() => { setAction('bounce'); setMessage('Bitkileri ve çiçekleri keşfedelim! 🌱'); setStars((value) => value + 1) }}><span>🌱</span>Bitkiler</button>
        </div>

        <button className="forest-hotspot hotspot-flower" onClick={() => { setAction('bounce'); setMessage('Çiçeklerin arasında minik bir kelebek saklanıyor! 🦋'); setStars((value) => value + 1) }} aria-label="Çiçeği keşfet">✦</button>
        <button className="forest-hotspot hotspot-tree" onClick={() => { setAction('bounce'); setMessage('Ağacın dallarında kuşların sesini duyabiliyor musun?'); setStars((value) => value + 1) }} aria-label="Ağacı keşfet">●</button>

        <div className="forest-message-overlay" aria-live="polite"><span>💬</span>{message}</div>
        <div className="forest-stars-overlay">⭐ {stars}</div>

        <div className="forest-character-options landscape-options">
          {characters.map((item) => (
            <button key={item.id} type="button" className={selected === item.id ? 'selected' : ''} onClick={() => discover(item)}>
              <img src={item.image} alt="" /><span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}
