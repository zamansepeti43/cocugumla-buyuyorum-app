import { useEffect, useMemo, useState } from 'react'
import { useGameSession } from '../../hooks/useGameSession'
import { playRealSound, unlockAudio, findRealSoundByKey, type RealSoundDescriptor } from '../../utils/audio'

type AnimalCard = {
  id: string
  label: string
  emoji: string
  sound: RealSoundDescriptor
  color: string
}

const ANIMALS: AnimalCard[] = [
  { id: 'cat', label: 'Kedi', emoji: '🐱', sound: findRealSoundByKey('cat')!, color: 'sunset' },
  { id: 'dog', label: 'Köpek', emoji: '🐶', sound: findRealSoundByKey('dog')!, color: 'sky' },
  { id: 'bird', label: 'Kuş', emoji: '🐦', sound: findRealSoundByKey('bird')!, color: 'mint' },
  { id: 'cow', label: 'İnek', emoji: '🐮', sound: findRealSoundByKey('cow')!, color: 'cream' },
  { id: 'sheep', label: 'Koyun', emoji: '🐑', sound: findRealSoundByKey('sheep')!, color: 'lavender' },
  { id: 'horse', label: 'At', emoji: '🐴', sound: findRealSoundByKey('horse')!, color: 'gold' },
  { id: 'frog', label: 'Kurbağa', emoji: '🐸', sound: findRealSoundByKey('frog')!, color: 'lime' },
  { id: 'duck', label: 'Ördek', emoji: '🦆', sound: findRealSoundByKey('duck')!, color: 'aqua' },
  { id: 'chicken', label: 'Tavuk', emoji: '🐔', sound: findRealSoundByKey('chicken')!, color: 'orange' },
  { id: 'lion', label: 'Aslan', emoji: '🦁', sound: findRealSoundByKey('lion')!, color: 'peach' },
  { id: 'rabbit', label: 'Tavşan', emoji: '🐰', sound: findRealSoundByKey('rabbit')!, color: 'rose' },
  { id: 'bear', label: 'Ayı', emoji: '🐻', sound: findRealSoundByKey('bear')!, color: 'brown' },
]

type Round = { target: AnimalCard; options: AnimalCard[] }

const ROUNDS: Round[] = [
  { target: ANIMALS[0], options: [ANIMALS[0], ANIMALS[1], ANIMALS[2], ANIMALS[3]] },
  { target: ANIMALS[2], options: [ANIMALS[4], ANIMALS[2], ANIMALS[0], ANIMALS[6]] },
  { target: ANIMALS[1], options: [ANIMALS[5], ANIMALS[1], ANIMALS[7], ANIMALS[3]] },
  { target: ANIMALS[6], options: [ANIMALS[6], ANIMALS[8], ANIMALS[9], ANIMALS[10]] },
  { target: ANIMALS[11], options: [ANIMALS[11], ANIMALS[4], ANIMALS[5], ANIMALS[2]] },
]

function pickShuffled<T>(items: T[]): T[] {
  const copy = [...items]
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]]
  }
  return copy
}

export function AnimalFinderGame() {
  const session = useGameSession({
    totalRounds: ROUNDS.length,
    initialFeedback: 'Sesi dinle ve doğru hayvanı bul! 🎧',
    successMessage: 'Harika! Hayvan seslerinin hepsini buldun! 🌟',
  })

  const round = ROUNDS[session.round % ROUNDS.length]
  const [cards, setCards] = useState<AnimalCard[]>(() => pickShuffled(round.options))
  const [foundCard, setFoundCard] = useState<string | null>(null)
  const [wrongCard, setWrongCard] = useState<string | null>(null)
  const [usingRealSound, setUsingRealSound] = useState<boolean | null>(null)
  const [playingTarget, setPlayingTarget] = useState(false)
  const [celebrating, setCelebrating] = useState(false)

  const particles = useMemo(() => ['✨', '⭐', '🌟', '💫', '🎉'], [])

  const playAnimalSound = (animal: AnimalCard) => {
    unlockAudio()
    setPlayingTarget(true)
    void playRealSound(animal.sound).then((usedReal) => {
      setUsingRealSound(usedReal)
      window.setTimeout(() => setPlayingTarget(false), 700)
    })
  }

  useEffect(() => {
    unlockAudio()
    const timer = window.setTimeout(() => playAnimalSound(round.target), 350)
    return () => window.clearTimeout(timer)
    // round.target değişimi yeni turu başlatır.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.round])

  const selectAnimal = (animal: AnimalCard) => {
    if (session.done || foundCard) return

    if (animal.id === round.target.id) {
      setWrongCard(null)
      setFoundCard(animal.id)
      setCelebrating(true)
      const finished = session.markCorrect()

      window.setTimeout(() => setCelebrating(false), 1000)

      if (!finished) {
        window.setTimeout(() => {
          setFoundCard(null)
          const nextRound = ROUNDS[(session.round + 1) % ROUNDS.length]
          setCards(pickShuffled(nextRound.options))
          session.advanceRound()
        }, 1100)
      }
      return
    }

    setWrongCard(animal.id)
    session.markWrong()
    window.setTimeout(() => setWrongCard(null), 500)
  }

  const resetGame = () => {
    setFoundCard(null)
    setWrongCard(null)
    setCelebrating(false)
    setCards(pickShuffled(ROUNDS[0].options))
    session.reset()
  }

  return (
    <div className="interactive-playground animal-game-premium">
      <div className="animal-game-hero">
        <div className="animal-game-orb" aria-hidden="true">🌿</div>
        <div>
          <span className="animal-game-kicker">ORMAN · ETKİLEŞİMLİ</span>
          <h2>Hayvanı Bul</h2>
          <p>Sesi dinle, doğru hayvanı yakala.</p>
        </div>
        <div className={`animal-listen-orb ${playingTarget ? 'is-playing' : ''}`} aria-hidden="true">🔊</div>
      </div>

      <div className="animal-sound-cue animal-game-command">
        <button
          type="button"
          className="secondary-button game-listen-btn animal-listen-button"
          onClick={() => playAnimalSound(round.target)}
          disabled={session.done}
        >
          {playingTarget ? '🔊 Dinliyorum…' : '🔊 Sesi Tekrar Dinle'}
        </button>
        <span className="animal-round-badge">Tur {Math.min(session.completedRounds + 1, ROUNDS.length)} / {ROUNDS.length}</span>
      </div>

      <div className="animal-finder-grid animal-game-grid">
        {cards.map((animal, index) => {
          const isCorrect = foundCard === animal.id
          const isWrong = wrongCard === animal.id
          return (
            <button
              key={animal.id}
              type="button"
              className={`animal-finder-card animal-card-premium animal-card-${animal.color} ${isCorrect ? 'choice-correct' : ''} ${isWrong ? 'choice-wrong' : ''}`}
              onClick={() => selectAnimal(animal)}
              disabled={session.done || foundCard !== null}
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <span className="animal-card-glow" aria-hidden="true" />
              <span className="animal-finder-emoji" aria-hidden="true">{animal.emoji}</span>
              <strong>{animal.label}</strong>
              <span className="animal-card-tap">Dokun</span>
            </button>
          )
        })}
      </div>

      <div className={`choice-feedback ${session.tone ?? 'idle'} animal-game-feedback`}>
        <span>{session.feedback}</span>
        {usingRealSound === false && <small>Ses dosyası bulunamadı; yedek ses kullanılıyor.</small>}
      </div>

      {celebrating && (
        <div className="animal-celebration" aria-hidden="true">
          {particles.map((particle, index) => <span key={`${particle}-${index}`} style={{ animationDelay: `${index * 90}ms` }}>{particle}</span>)}
        </div>
      )}

      <div className="interactive-controls">
        <button type="button" className="secondary-button" onClick={resetGame}>↻ Yeniden Oyna</button>
      </div>
    </div>
  )
}
