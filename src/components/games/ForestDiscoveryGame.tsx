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
    const introTimer = window.setTimeout(() => setAction('idle'), 1500)
    const loopTimer = window.setInterval(() => setAction((value) => value === 'idle' ? 'bounce' : 'idle'), 4200)
    return () => {
      window.clearTimeout(introTimer)
      window.clearInterval(loopTimer)
    }
  }, [])

  const discover = (item: Character) => {
    setSelected(item.id)
    setAction('bounce')
    setStars((value) => value + 1)
    setMessage(`Harika keşif! ${item.name}: ${item.fact}`)
  }

  return (
    <div className="forest-discovery">
      <div className="forest-scene" style={{ ['--character-color' as string]: character.color }}>
        <div className="forest-layer forest-back" />
        <div className="forest-layer forest-mid" />
        <div className="forest-sun-art" />
        <div className="forest-cloud-art cloud-one" />
        <div className="forest-cloud-art cloud-two" />
        <div className="forest-hill hill-one" />
        <div className="forest-hill hill-two" />
        <div className="forest-flower-bed" />

        <div className={`forest-main-character ${action === 'intro' ? 'is-entering' : ''} ${action === 'bounce' ? 'is-bouncing' : ''} ${action === 'walk' ? 'is-walking' : ''}`}>
          <img src={character.image} alt={character.name} />
          <div className="character-glow" />
        </div>

        <div className="forest-story-card">
          <div className="story-avatar"><img src="/illustrations/forest/leo-lion.svg" alt="Leo" /></div>
          <div><strong>Leo</strong><p>{action === 'intro' ? 'Merhaba küçük kaşif! 👋' : action === 'bounce' ? 'Vay! Bunu birlikte keşfettik!' : 'Sence ormanda başka neler var?'}</p></div>
        </div>

        <button className="forest-hotspot hotspot-flower" onClick={() => { setAction('bounce'); setMessage('Çiçeklerin arasında minik bir kelebek saklanıyor! 🦋'); setStars((value) => value + 1) }} aria-label="Çiçeği keşfet">✦</button>
        <button className="forest-hotspot hotspot-tree" onClick={() => { setAction('bounce'); setMessage('Ağacın dallarında kuşların sesini duyabiliyor musun?'); setStars((value) => value + 1) }} aria-label="Ağacı keşfet">●</button>
      </div>

      <div className="forest-header">
        <div><span className="forest-kicker">DOĞA DÜNYASI · HİKÂYELİ KEŞİF</span><h2>Leo ile Orman Macerası</h2><p>Leo seni karşılıyor; dokun, keşfet ve küçük kaşifin hikâyesine devam et.</p></div>
        <div className="forest-stars">⭐ {stars}</div>
      </div>

      <div className="forest-message" aria-live="polite"><span className="forest-message-icon">💬</span><span>{message}</span></div>

      <div className="forest-character-options">
        {characters.map((item) => (
          <button key={item.id} type="button" className={selected === item.id ? 'selected' : ''} onClick={() => discover(item)}>
            <img src={item.image} alt="" /><span>{item.name}</span>
          </button>
        ))}
      </div>

      <div className="forest-actions">
        <button type="button" className="forest-primary" onClick={() => { setAction('walk'); setMessage(`${character.name} seni ormanın derinliklerine götürüyor!`); setStars((value) => value + 1) }}>🌿 Maceraya Devam Et</button>
        <button type="button" className="forest-secondary" onClick={() => { setAction('bounce'); setMessage(`${character.name} çok mutlu! Birlikte zıplayalım!`); setStars((value) => value + 1) }}>✨ Tepki Ver</button>
      </div>
    </div>
  )
}
