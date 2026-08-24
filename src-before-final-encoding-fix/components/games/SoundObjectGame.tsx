import { useState } from 'react'
import { useGameSession } from '../../hooks/useGameSession'
import { speakSequence, unlockAudio } from '../../utils/audio'

type LetterRound = {
  letter: string
  letterSound: string
  exampleWord: string
  options: Array<{ id: string; label: string; emoji: string }>
  correctId: string
}

const ROUNDS: LetterRound[] = [
  {
    letter: 'A',
    letterSound: 'A',
    exampleWord: 'Armut',
    options: [
      { id: 'armut', label: 'Armut', emoji: '🍐' },
      { id: 'elma', label: 'Elma', emoji: '🍎' },
      { id: 'muz', label: 'Muz', emoji: '🍌' },
    ],
    correctId: 'armut',
  },
  {
    letter: 'E',
    letterSound: 'E',
    exampleWord: 'Elma',
    options: [
      { id: 'armut', label: 'Armut', emoji: '🍐' },
      { id: 'elma', label: 'Elma', emoji: '🍎' },
      { id: 'kiraz', label: 'Kiraz', emoji: '🍒' },
    ],
    correctId: 'elma',
  },
  {
    letter: 'M',
    letterSound: 'M',
    exampleWord: 'Muz',
    options: [
      { id: 'muz', label: 'Muz', emoji: '🍌' },
      { id: 'limon', label: 'Limon', emoji: '🍋' },
      { id: 'portakal', label: 'Portakal', emoji: '🍊' },
    ],
    correctId: 'muz',
  },
]

export function SoundObjectGame() {
  const session = useGameSession({
    totalRounds: ROUNDS.length,
    initialFeedback: 'Sesi dinle ve o harfle başlayan görseli seç.',
    successMessage: 'Harika! Harf seslerini doğru eşleştirdin.',
  })

  const round = ROUNDS[session.round % ROUNDS.length]
  const [found, setFound] = useState(false)

  const listenSound = () => {
    unlockAudio()
    // Önce harfin Türkçe telaffuzu (A → "A"), ardından örnek kelime.
    speakSequence([
      { text: round.letterSound, lang: 'tr-TR', rate: 0.7 },
      { text: round.exampleWord, lang: 'tr-TR', rate: 0.92 },
    ])
  }

  const selectOption = (optionId: string) => {
    if (session.done || found) return

    if (optionId === round.correctId) {
      setFound(true)
      const finished = session.markCorrect()
      if (!finished) {
        window.setTimeout(() => {
          setFound(false)
          session.advanceRound()
        }, 700)
      }
      return
    }

    session.markWrong()
  }

  const resetGame = () => {
    setFound(false)
    session.reset()
  }

  return (
    <div className="interactive-playground">
      <p className="interactive-note">Harf sesini dinle, o harfle başlayan büyük görsele dokun.</p>

      <div className="letter-stage">
        <div className="letter-badge" aria-hidden="true">{round.letter}</div>
        <div className="letter-example">{round.exampleWord}</div>
        <button type="button" className="primary-button letter-listen-btn" onClick={listenSound}>
          🔊 Sesi Dinle
        </button>
      </div>

      <div className="letter-options">
        {round.options.map((option) => {
          const isCorrect = found && option.id === round.correctId
          return (
            <button
              key={option.id}
              type="button"
              className={`letter-option ${isCorrect ? 'choice-correct' : ''}`}
              onClick={() => selectOption(option.id)}
              disabled={session.done || found}
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