import { useEffect, useState } from 'react'
import { useGameSession } from '../../hooks/useGameSession'
import { playRealSound, unlockAudio, findRealSoundByKey, type RealSoundDescriptor } from '../../utils/audio'

type CueOption = { id: string; label: string; emoji: string; sound: RealSoundDescriptor }

const ANIMALS: CueOption[] = [
  { id: 'cat', label: 'Kedi', emoji: '🐈', sound: findRealSoundByKey('cat')! },
  { id: 'dog', label: 'Köpek', emoji: '🐕', sound: findRealSoundByKey('dog')! },
  { id: 'bird', label: 'Kuş', emoji: '🐦', sound: findRealSoundByKey('bird')! },
  { id: 'cow', label: 'İnek', emoji: '🐄', sound: findRealSoundByKey('cow')! },
  { id: 'frog', label: 'Kurbağa', emoji: '🐸', sound: findRealSoundByKey('frog')! },
  { id: 'duck', label: 'Ördek', emoji: '🦆', sound: findRealSoundByKey('duck')! },
]

const VEHICLES: CueOption[] = [
  { id: 'car', label: 'Araba', emoji: '🚗', sound: findRealSoundByKey('car')! },
  { id: 'train', label: 'Tren', emoji: '🚂', sound: findRealSoundByKey('train')! },
  { id: 'ambulance', label: 'Ambulans', emoji: '🚑', sound: findRealSoundByKey('ambulance')! },
  { id: 'firetruck', label: 'İtfaiye', emoji: '🚒', sound: findRealSoundByKey('firetruck')! },
]

type CueRound = { target: CueOption; options: CueOption[] }

const ROUNDS: CueRound[] = [
  { target: ANIMALS[0], options: [ANIMALS[0], ANIMALS[1], ANIMALS[2]] },
  { target: VEHICLES[2], options: [VEHICLES[0], VEHICLES[1], VEHICLES[2]] },
  { target: ANIMALS[2], options: [ANIMALS[5], ANIMALS[2], ANIMALS[4]] },
]

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = copy[i]
    copy[i] = copy[j]
    copy[j] = tmp
  }
  return copy
}

export function SoundCueGame() {
  const session = useGameSession({
    totalRounds: ROUNDS.length,
    initialFeedback: 'Sesi dinle ve doğru kartı seç.',
    successMessage: 'Süper! Sesleri doğru eşleştirdin.',
  })

  const round = ROUNDS[session.round % ROUNDS.length]
  const [cards, setCards] = useState<CueOption[]>(() => shuffle(round.options))
  const [foundId, setFoundId] = useState<string | null>(null)

  const playCue = () => {
    unlockAudio()
    void playRealSound(round.target.sound)
  }

  useEffect(() => {
    unlockAudio()
    const timer = window.setTimeout(playCue, 250)
    return () => window.clearTimeout(timer)
    // round.target sabittir; tur değiştiğinde bir kez çalışır.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.round])

  const selectOption = (optionId: string) => {
    if (session.done || foundId) return

    if (optionId === round.target.id) {
      setFoundId(optionId)
      const finished = session.markCorrect()
      if (!finished) {
        window.setTimeout(() => {
          setFoundId(null)
          setCards(shuffle(ROUNDS[(session.round + 1) % ROUNDS.length].options))
          session.advanceRound()
        }, 750)
      }
      return
    }

    session.markWrong()
  }

  const resetGame = () => {
    setFoundId(null)
    setCards(shuffle(ROUNDS[0].options))
    session.reset()
  }

  return (
    <div className="interactive-playground">
      <p className="interactive-note">Sesi dinle, sesin ait olduğu hayvana ya da araca dokun.</p>

      <div className="game-cue-row">
        <button type="button" className="secondary-button game-listen-btn" onClick={playCue} disabled={session.done}>
          🔊 Sesi Dinle
        </button>
      </div>

      <div className={`choice-grid big-cards ${round.target.sound.kind === 'vehicle' ? 'sound-cue-vehicle' : ''}`}>
        {cards.map((option) => {
          const isCorrect = foundId === option.id
          return (
            <button
              key={option.id}
              type="button"
              className={`choice-card ${isCorrect ? 'choice-correct' : ''}`}
              onClick={() => selectOption(option.id)}
              disabled={session.done || foundId !== null}
            >
              <span>{option.emoji}</span>
              <strong>{option.label}</strong>
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