import { useEffect, useMemo, useState } from 'react'
import { useGameSession } from '../../hooks/useGameSession'
import { playRealSound, unlockAudio, findRealSoundByKey, type RealSoundDescriptor } from '../../utils/audio'
import './AnimalFinderGame.css'

type AnimalCard = { id: string; label: string; image: string; sound: RealSoundDescriptor; color: string }
const ASSET_BASE = 'https://raw.githubusercontent.com/Tiddybub/2d-assets/main/characters/animal-pack-remastered/PNG/Round'
const ANIMALS: AnimalCard[] = [
  { id: 'dog', label: 'Köpek', image: `${ASSET_BASE}/dog.png`, sound: findRealSoundByKey('dog')!, color: 'sky' },
  { id: 'duck', label: 'Ördek', image: `${ASSET_BASE}/duck.png`, sound: findRealSoundByKey('duck')!, color: 'aqua' },
  { id: 'cow', label: 'İnek', image: `${ASSET_BASE}/cow.png`, sound: findRealSoundByKey('cow')!, color: 'cream' },
  { id: 'frog', label: 'Kurbağa', image: `${ASSET_BASE}/frog.png`, sound: findRealSoundByKey('frog')!, color: 'lime' },
  { id: 'chicken', label: 'Tavuk', image: `${ASSET_BASE}/chicken.png`, sound: findRealSoundByKey('chicken')!, color: 'orange' },
  { id: 'bear', label: 'Ayı', image: `${ASSET_BASE}/bear.png`, sound: findRealSoundByKey('bear')!, color: 'brown' },
]
type Round = { target: AnimalCard; options: AnimalCard[] }
const ROUNDS: Round[] = [
  { target: ANIMALS[0], options: [ANIMALS[0], ANIMALS[1], ANIMALS[2], ANIMALS[3]] },
  { target: ANIMALS[2], options: [ANIMALS[4], ANIMALS[2], ANIMALS[0], ANIMALS[5]] },
  { target: ANIMALS[1], options: [ANIMALS[5], ANIMALS[1], ANIMALS[3], ANIMALS[2]] },
  { target: ANIMALS[3], options: [ANIMALS[3], ANIMALS[4], ANIMALS[0], ANIMALS[1]] },
  { target: ANIMALS[5], options: [ANIMALS[5], ANIMALS[4], ANIMALS[1], ANIMALS[2]] },
]
function pickShuffled<T>(items: T[]): T[] { const copy = [...items]; for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]] } return copy }

export function AnimalFinderGame() {
  const session = useGameSession({ totalRounds: ROUNDS.length, initialFeedback: 'Sesi dinle ve gerçek hayvanı bul! 🎧', successMessage: 'Harika! Hayvanları keşfettin! 🌟' })
  const round = ROUNDS[session.round % ROUNDS.length]
  const [cards, setCards] = useState(() => pickShuffled(round.options))
  const [foundCard, setFoundCard] = useState<string | null>(null)
  const [wrongCard, setWrongCard] = useState<string | null>(null)
  const [playingTarget, setPlayingTarget] = useState(false)
  const particles = useMemo(() => ['✨', '⭐', '🌟', '💫', '🎉'], [])
  const playAnimalSound = (animal: AnimalCard) => { unlockAudio(); setPlayingTarget(true); void playRealSound(animal.sound).finally(() => window.setTimeout(() => setPlayingTarget(false), 700)) }
  useEffect(() => { unlockAudio(); const timer = window.setTimeout(() => playAnimalSound(round.target), 350); return () => window.clearTimeout(timer) }, [session.round])
  const selectAnimal = (animal: AnimalCard) => {
    if (session.done || foundCard) return
    if (animal.id === round.target.id) {
      setWrongCard(null); setFoundCard(animal.id); const finished = session.markCorrect()
      if (!finished) window.setTimeout(() => { setFoundCard(null); setCards(pickShuffled(ROUNDS[(session.round + 1) % ROUNDS.length].options)); session.advanceRound() }, 1100)
      return
    }
    setWrongCard(animal.id); session.markWrong(); window.setTimeout(() => setWrongCard(null), 500)
  }
  const resetGame = () => { setFoundCard(null); setWrongCard(null); setCards(pickShuffled(ROUNDS[0].options)); session.reset() }
  return (
    <div className="interactive-playground animal-game-premium">
      <div className="animal-game-hero"><div className="animal-game-orb" aria-hidden="true">🌿</div><div><span className="animal-game-kicker">ORMAN · GERÇEK GÖRSELLER</span><h2>Hayvanı Bul</h2><p>Sesi dinle, doğru hayvanı keşfet.</p></div><div className={`animal-listen-orb ${playingTarget ? 'is-playing' : ''}`} aria-hidden="true">🔊</div></div>
      <div className="animal-sound-cue animal-game-command"><button type="button" className="secondary-button game-listen-btn animal-listen-button" onClick={() => playAnimalSound(round.target)} disabled={session.done}>{playingTarget ? '🔊 Dinliyorum…' : '🔊 Sesi Tekrar Dinle'}</button><span className="animal-round-badge">Tur {Math.min(session.completedRounds + 1, ROUNDS.length)} / {ROUNDS.length}</span></div>
      <div className="animal-finder-grid animal-game-grid">{cards.map((animal, index) => { const isCorrect = foundCard === animal.id; const isWrong = wrongCard === animal.id; return <button key={animal.id} type="button" className={`animal-finder-card animal-card-premium animal-card-${animal.color} ${isCorrect ? 'choice-correct' : ''} ${isWrong ? 'choice-wrong' : ''}`} onClick={() => selectAnimal(animal)} disabled={session.done || foundCard !== null} style={{ animationDelay: `${index * 70}ms` }}><span className="animal-card-glow" aria-hidden="true" /><img src={animal.image} alt={animal.label} className="animal-real-image" draggable="false" /><strong>{animal.label}</strong><span className="animal-card-tap">Dokun</span></button> })}</div>
      <div className={`choice-feedback ${session.tone ?? 'idle'} animal-game-feedback`}><span>{session.feedback}</span></div>
      {foundCard && <div className="animal-celebration" aria-hidden="true">{particles.map((particle, index) => <span key={`${particle}-${index}`} style={{ animationDelay: `${index * 90}ms` }}>{particle}</span>)}</div>}
      <div className="interactive-controls"><button type="button" className="secondary-button" onClick={resetGame}>↻ Yeniden Oyna</button></div>
    </div>
  )
}
