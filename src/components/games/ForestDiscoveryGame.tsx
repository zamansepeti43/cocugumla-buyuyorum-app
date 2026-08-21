import { useEffect, useState } from 'react'
import { AnimatedSprite, duckFrames } from './AnimatedSprite'
import './ForestDiscoveryGame.css'

const animals = [
  { id: 'duck', name: 'Ördek', emoji: '🦆', fact: 'Ördekler yüzebilir ve suyu çok sever.' },
  { id: 'dog', name: 'Köpek', emoji: '🐶', fact: 'Köpeklerin çok güçlü bir koku alma duyusu vardır.' },
  { id: 'cow', name: 'İnek', emoji: '🐮', fact: 'İnekler otçuldur ve çoğunlukla ot yer.' },
  { id: 'cat', name: 'Kedi', emoji: '🐱', fact: 'Kediler bıyıklarını çevrelerini hissetmek için kullanır.' },
]

export function ForestDiscoveryGame() {
  const [selected, setSelected] = useState('duck')
  const [mode, setMode] = useState<'idle' | 'walk' | 'jump'>('idle')
  const [message, setMessage] = useState('Merhaba küçük kaşif! Ormanda bir hayvan keşfedelim.')
  const [stars, setStars] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setMode((current) => current === 'idle' ? 'walk' : 'idle')
    }, 5000)
    return () => window.clearInterval(timer)
  }, [])

  const chooseAnimal = (id: string) => {
    const animal = animals.find((item) => item.id === id)!
    setSelected(id)
    setMode(id === 'duck' ? 'jump' : 'idle')
    setStars((value) => value + 1)
    setMessage(id === 'duck'
      ? 'Harika! Ördeği buldun. Ona dokununca zıplıyor! 🦆'
      : `${animal.name} hakkında yeni bir şey öğrendin! ${animal.fact}`)
  }

  return (
    <div className="forest-discovery">
      <div className="forest-scene">
        <div className="forest-sky-glow" />
        <div className="forest-cloud cloud-one">☁️</div>
        <div className="forest-cloud cloud-two">☁️</div>
        <div className="forest-sun">☀️</div>
        <div className="forest-hill hill-back" />
        <div className="forest-hill hill-front" />
        <div className="forest-tree tree-left">🌳</div>
        <div className="forest-tree tree-right">🌳</div>
        <div className="forest-flower flower-one">🌼</div>
        <div className="forest-flower flower-two">🌷</div>
        <div className="forest-bush">🌿</div>

        <div
          className={`forest-character ${mode === 'walk' ? 'character-walking' : ''} ${mode === 'jump' ? 'character-jumping' : ''}`}
          onClick={() => {
            setMode('jump')
            setStars((value) => value + 1)
            setMessage('Vak vak! Ördek seni fark etti! 🦆')
          }}
          role="button"
          tabIndex={0}
          aria-label="Animasyonlu ördeğe dokun"
          onKeyDown={(event) => event.key === 'Enter' && setMode('jump')}
        >
          <AnimatedSprite
            frames={duckFrames(mode)}
            fps={mode === 'jump' ? 8 : 10}
            width={190}
            height={190}
            alt="Animasyonlu ördek"
          />
          <span className="forest-character-shadow" />
        </div>

        <div className="forest-guide">
          <div className="forest-guide-avatar">🧒</div>
          <div>
            <strong>Minik Kaşif</strong>
            <span>Ördeğe dokun!</span>
          </div>
        </div>

        <div className="forest-sparkles" aria-hidden="true">✦ ✧ ✦</div>
      </div>

      <div className="forest-header">
        <div>
          <span className="forest-kicker">🌿 ORMAN DÜNYASI · ANİMASYONLU KEŞİF</span>
          <h2>Ormanda Hayvanları Keşfet</h2>
          <p>Dokun, hareketini izle ve yeni bir şey öğren.</p>
        </div>
        <div className="forest-stars">⭐ {stars}</div>
      </div>

      <div className="forest-message" aria-live="polite">
        <span className="forest-message-icon">💬</span>
        <span>{message}</span>
      </div>

      <div className="forest-animal-options">
        {animals.map((animal) => (
          <button
            key={animal.id}
            type="button"
            className={selected === animal.id ? 'selected' : ''}
            onClick={() => chooseAnimal(animal.id)}
          >
            <span>{animal.emoji}</span>
            <strong>{animal.name}</strong>
          </button>
        ))}
      </div>

      <div className="forest-actions">
        <button type="button" className="forest-primary" onClick={() => {
          setMode('walk')
          setMessage('Ördek ormanda yürüyor. Bakalım nereye gidecek? 👀')
        }}>🚶 Yürüt</button>
        <button type="button" className="forest-secondary" onClick={() => {
          setMode('jump')
          setStars((value) => value + 1)
          setMessage('Zıpla ördek! 🎉')
        }}>🦆 Zıplat</button>
      </div>
    </div>
  )
}
