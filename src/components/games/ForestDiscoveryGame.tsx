import { useEffect, useState } from 'react'
import { AnimatedSprite, duckFrames } from './AnimatedSprite'
import './ForestDiscoveryGame.css'

const guideBase = '/animations/kenney/toon/female-adventurer/character_femaleAdventurer_'
const guideFrames = { idle: [`${guideBase}idle.png`], talk: [`${guideBase}talk.png`], cheer: [`${guideBase}cheer0.png`, `${guideBase}cheer1.png`], walk: Array.from({ length: 8 }, (_, i) => `${guideBase}walk${i}.png`) }
const animals = [
  { id: 'duck', name: 'Ördek', emoji: '🦆', fact: 'Ördekler yüzebilir ve suyu çok sever.' },
  { id: 'dog', name: 'Köpek', emoji: '🐶', fact: 'Köpeklerin çok güçlü bir koku alma duyusu vardır.' },
  { id: 'cow', name: 'İnek', emoji: '🐮', fact: 'İnekler otçuldur ve çoğunlukla ot yer.' },
  { id: 'cat', name: 'Kedi', emoji: '🐱', fact: 'Kediler bıyıklarını çevrelerini hissetmek için kullanır.' },
]

function ToonGuide({ mode }: { mode: keyof typeof guideFrames }) {
  const frames = guideFrames[mode]
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (frames.length === 1) { setFrame(0); return }
    const timer = window.setInterval(() => setFrame((v) => (v + 1) % frames.length), mode === 'walk' ? 95 : 220)
    return () => window.clearInterval(timer)
  }, [frames.length, mode])
  return <img src={frames[frame]} className="forest-guide-character" alt="Minik Kaşif" />
}

export function ForestDiscoveryGame() {
  const [selected, setSelected] = useState('duck')
  const [mode, setMode] = useState<'idle' | 'walk' | 'jump'>('idle')
  const [guideMode, setGuideMode] = useState<keyof typeof guideFrames>('talk')
  const [message, setMessage] = useState('Merhaba küçük kaşif! Ormanda bir hayvan keşfedelim.')
  const [stars, setStars] = useState(0)
  useEffect(() => {
    const timer = window.setInterval(() => { setMode((v) => v === 'idle' ? 'walk' : 'idle'); setGuideMode((v) => v === 'talk' ? 'idle' : 'talk') }, 5000)
    return () => window.clearInterval(timer)
  }, [])
  const chooseAnimal = (id: string) => {
    const animal = animals.find((item) => item.id === id)!
    setSelected(id); setMode(id === 'duck' ? 'jump' : 'idle'); setGuideMode('cheer'); setStars((v) => v + 1)
    setMessage(id === 'duck' ? 'Harika! Ördeği buldun. Ona dokununca zıplıyor! 🦆' : `${animal.name} hakkında yeni bir şey öğrendin! ${animal.fact}`)
  }
  return <div className="forest-discovery">
    <div className="forest-scene">
      <div className="forest-background-art" aria-hidden="true" /><div className="forest-sky-glow" />
      <div className="forest-cloud cloud-one" /><div className="forest-cloud cloud-two" /><div className="forest-sun" />
      <div className="forest-tree tree-left" /><div className="forest-tree tree-right" /><div className="forest-flower flower-one" /><div className="forest-flower flower-two" /><div className="forest-bush" />
      <div className={`forest-character ${mode === 'walk' ? 'character-walking' : ''} ${mode === 'jump' ? 'character-jumping' : ''}`} onClick={() => { setMode('jump'); setGuideMode('cheer'); setStars((v) => v + 1); setMessage('Vak vak! Ördek seni fark etti! 🦆') }} role="button" tabIndex={0} aria-label="Animasyonlu ördeğe dokun">
        <AnimatedSprite frames={duckFrames(mode)} fps={mode === 'jump' ? 8 : 10} width={190} height={190} alt="Animasyonlu ördek" /><span className="forest-character-shadow" />
      </div>
      <div className="forest-guide-panel"><div className="forest-guide-bubble"><strong>Minik Kaşif</strong><span>{guideMode === 'cheer' ? 'Harika keşfettin!' : 'Hadi birlikte keşfedelim!'}</span></div><div className="forest-guide-character-wrap"><ToonGuide mode={guideMode} /></div></div>
      <div className="forest-sparkles" aria-hidden="true">✦ ✧ ✦</div>
    </div>
    <div className="forest-header"><div><span className="forest-kicker">🌿 ORMAN DÜNYASI · ANİMASYONLU KEŞİF</span><h2>Ormanda Hayvanları Keşfet</h2><p>Dokun, hareketini izle ve yeni bir şey öğren.</p></div><div className="forest-stars">⭐ {stars}</div></div>
    <div className="forest-message" aria-live="polite"><span className="forest-message-icon">💬</span><span>{message}</span></div>
    <div className="forest-animal-options">{animals.map((animal) => <button key={animal.id} type="button" className={selected === animal.id ? 'selected' : ''} onClick={() => chooseAnimal(animal.id)}><span>{animal.emoji}</span><strong>{animal.name}</strong></button>)}</div>
    <div className="forest-actions"><button type="button" className="forest-primary" onClick={() => { setMode('walk'); setGuideMode('walk'); setMessage('Ördek ormanda yürüyor. Minik Kaşif de onu takip ediyor! 👀') }}>🚶 Keşfe Çık</button><button type="button" className="forest-secondary" onClick={() => { setMode('jump'); setGuideMode('cheer'); setStars((v) => v + 1); setMessage('Zıpla ördek! 🎉') }}>🦆 Zıplat</button></div>
  </div>
}
