import { useState } from 'react'
import { useGameSession } from '../../hooks/useGameSession'

const TARGETS = [
  { targetId: 'star', prompt: 'Yıldızı bul.', targetEmoji: '⭐', distractorEmoji: '🌟' },
  { targetId: 'blue', prompt: 'Mavi daireyi bul.', targetEmoji: '🔵', distractorEmoji: '🔴' },
  { targetId: 'heart', prompt: 'Kalbi bul.', targetEmoji: '❤️', distractorEmoji: '💙' },
]

const GRID_SIZE = 9

function randomIndex(max: number): number {
  return Math.floor(Math.random() * max)
}

export function AttentionSpotGame() {
  const session = useGameSession({
    totalRounds: 3,
    initialFeedback: 'Karışık görseller arasında hedefi bul.',
    successMessage: 'Süper! Hedefleri hızlıca buldun.',
  })

  const round = TARGETS[session.round % TARGETS.length]
  const [targetIndex, setTargetIndex] = useState(() => randomIndex(GRID_SIZE))

  const pickCell = (index: number) => {
    if (session.done) return

    if (index === targetIndex) {
      const finished = session.markCorrect()
      if (!finished) {
        session.advanceRound()
        setTargetIndex(randomIndex(GRID_SIZE))
      }
      return
    }

    session.markWrong()
  }

  const resetGame = () => {
    setTargetIndex(randomIndex(GRID_SIZE))
    session.reset()
  }

  return (
    <div className="interactive-playground">
      <p className="interactive-note">{round.prompt} Diğerlerinden farklı olanı bul.</p>
      <div className="attention-grid">
        {Array.from({ length: GRID_SIZE }, (_, index) => (
          <button
            key={index}
            type="button"
            className="attention-cell"
            onClick={() => pickCell(index)}
            disabled={session.done}
          >
            <span>{index === targetIndex ? round.targetEmoji : round.distractorEmoji}</span>
          </button>
        ))}
      </div>
      <div className={`choice-feedback ${session.tone ?? 'idle'}`}>{session.feedback}</div>
      <div className="interactive-controls">
        <button type="button" className="secondary-button" onClick={resetGame}>Sıfırla</button>
      </div>
      <p className="choice-progress">Tur {Math.min(session.completedRounds + 1, 3)} / 3</p>
    </div>
  )
}