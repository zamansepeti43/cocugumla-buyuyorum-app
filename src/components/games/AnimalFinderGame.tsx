import { useEffect, useState } from 'react'
import { useGameSession } from '../../hooks/useGameSession'
import { playRealSound, unlockAudio, findRealSoundByKey, type RealSoundDescriptor } from '../../utils/audio'

type AnimalCard = {
  id: string
  label: string
  emoji: string
  sound: RealSoundDescriptor
}

const ANIMALS: AnimalCard[] = [
  { id: 'cat', label: 'Kedi', emoji: '🐈', sound: findRealSoundByKey('cat')! },
  { id: 'dog', label: 'Köpek', emoji: '🐕', sound: findRealSoundByKey('dog')! },
  { id: 'bird', label: 'Kuş', emoji: '🐦', sound: findRealSoundByKey('bird')! },
  { id: 'cow', label: 'İnek', emoji: '🐄', sound: findRealSoundByKey('cow')! },
  { id: 'sheep', label: 'Koyun', emoji: '🐑', sound: findRealSoundByKey('sheep')! },
  { id: 'horse', label: 'At', emoji: '🐴', sound: findRealSoundByKey('horse')! },
  { id: 'frog', label: 'Kurbağa', emoji: '🐸', sound: findRealSoundByKey('frog')! },
  { id: 'duck', label: 'Ördek', emoji: '🦆', sound: findRealSoundByKey('duck')! },
  { id: 'chicken', label: 'Tavuk', emoji: '🐔', sound: findRealSoundByKey('chicken')! },
  { id: 'lion', label: 'Aslan', emoji: '🦁', sound: findRealSoundByKey('lion')! },
  { id: 'rabbit', label: 'Tavşan', emoji: '🐇', sound: findRealSoundByKey('rabbit')! },
  { id: 'bear', label: 'Ayı', emoji: '🐻', sound: findRealSoundByKey('bear')! },
]

type Round = { target: AnimalCard; options: AnimalCard[] }

const ROUNDS: Round[] = [
  { target: ANIMALS[0], options: [ANIMALS[0], ANIMALS[1], ANIMALS[2], ANIMALS[3]] },
  { target: ANIMALS[2], options: [ANIMALS[4], ANIMALS[2], ANIMALS[0], ANIMALS[6]] },
  { target: ANIMALS[1], options: [ANIMALS[5], ANIMALS[1], ANIMALS[7], ANIMALS[3]] },
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
    initialFeedback: 'Hangi hayvanın sesini duydun? Büyük kartlardan birine dokun.',
    successMessage: 'Harika! Bütün hayvan seslerini doğru buldun.',
  })

  const round = ROUNDS[session.round % ROUNDS.length]
  const [cards, setCards] = useState<AnimalCard[]>(() => pickShuffled(round.options))
  const [foundCard, setFoundCard] = useState<string | null>(null)
  const [usingRealSound, setUsingRealSound] = useState<boolean | null>(null)

  const playAnimalSound = (animal: AnimalCard) => {
    unlockAudio()
    void playRealSound(animal.sound).then((usedReal) => {
      setUsingRealSound(usedReal)
    })
  }

  useEffect(() => {
    unlockAudio()
    const timer = window.setTimeout(() => {
      playAnimalSound(round.target)
    }, 250)
    return () => window.clearTimeout(timer)
    // round.target sabittir; etkinlik kurulumunda bir kez çalışır.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.round])

  const selectAnimal = (animal: AnimalCard) => {
    if (session.done || foundCard) return

    if (animal.id === round.target.id) {
      setFoundCard(animal.id)
      const finished = session.markCorrect()
      if (!finished) {
        window.setTimeout(() => {
          setFoundCard(null)
          setCards(pickShuffled(ROUNDS[(session.round + 1) % ROUNDS.length].options))
          session.advanceRound()
        }, 850)
      }
      return
    }

    session.markWrong()
  }

  const resetGame = () => {
    setFoundCard(null)
    setCards(pickShuffled(ROUNDS[0].options))
    session.reset()
  }

  return (
    <div className="interactive-playground">
      <p className="interactive-note">Sesli hayvan oyunu: sesi dinle, o hayvanın büyük kartına dokun.</p>

      <div className="animal-sound-cue">
        <button
          type="button"
          className="secondary-button game-listen-btn"
          onClick={() => playAnimalSound(round.target)}
          disabled={session.done}
        >
          🔊 Sesi Tekrar Dinle
        </button>
        {usingRealSound === false && (
          <span className="animal-sound-fallback">Gerçek ses dosyası bulunamadı, örnek ses çalınıyor.</span>
        )}
      </div>

      <div className="animal-finder-grid">
        {cards.map((animal) => {
          const isCorrect = foundCard === animal.id
          return (
            <button
              key={animal.id}
              type="button"
              className={`animal-finder-card ${isCorrect ? 'choice-correct' : ''}`}
              onClick={() => selectAnimal(animal)}
              disabled={session.done || foundCard !== null}
            >
              <span className="animal-finder-emoji" aria-hidden="true">{animal.emoji}</span>
              <strong>{animal.label}</strong>
            </button>
          )
        })}
      </div>

      <div className={`choice-feedback ${session.tone ?? 'idle'}`}>{session.feedback}</div>
      <div className="interactive-controls">
        <button type="button" className="secondary-button" onClick={resetGame}>Sıfırla</button>
      </div>
      <p className="choice-progress">Tur {Math.min(session.completedRounds + 1, ROUNDS.length)} / {ROUNDS.length}</p>
    </div>
  )
}