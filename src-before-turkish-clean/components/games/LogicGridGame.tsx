import { useState } from 'react'
import { useGameSession } from '../../hooks/useGameSession'

type LogicCell = { id: string; emoji: string; label: string }

const ROUNDS: Array<{ targetId: string; cells: LogicCell[] }> = [
  {
    targetId: 'lion',
    cells: [
      { id: 'lion', emoji: '🦁', label: 'Aslan' },
      { id: 'fish', emoji: '🐟', label: 'Balık' },
      { id: 'cow', emoji: '🐄', label: 'İnek' },
    ],
  },
  {
    targetId: 'orange',
    cells: [
      { id: 'apple', emoji: '🍎', label: 'Elma' },
      { id: 'orange', emoji: '🍊', label: 'Portakal' },
      { id: 'banana', emoji: '🍌', label: 'Muz' },
    ],
  },
  {
    targetId: 'truck',
    cells: [
      { id: 'car', emoji: '🚗', label: 'Araba' },
      { id: 'truck', emoji: '🚚', label: 'Kamyon' },
      { id: 'bike', emoji: '🚲', label: 'Bisiklet' },
    ],
  },
]

export function LogicGridGame() {
  const session = useGameSession({
    totalRounds: 3,
    initialFeedback: 'Söylenen canlıyı/nesneyi ızgarada bul.',
    successMessage: 'Harika! Mantık ızgarasını tamamladın.',
  })

  const [shuffledCells, setShuffledCells] = useState<LogicCell[]>(() => shuffle(ROUNDS[0].cells))

  const round = ROUNDS[session.round % ROUNDS.length]

  const pickCell = (cellId: string) => {
    if (session.done) return

    if (cellId === round.targetId) {
      const finished = session.markCorrect()
      if (!finished) {
        session.advanceRound()
        setShuffledCells(shuffle(ROUNDS[(session.round + 1) % ROUNDS.length].cells))
      }
      return
    }

    session.markWrong()
  }

  const resetGame = () => {
    setShuffledCells(shuffle(ROUNDS[0].cells))
    session.reset()
  }

  return (
    <div className="interactive-playground">
      <p className="interactive-note">Izgara içinde aranan öğeyi bul ve dokun.</p>
      <div className="logic-grid">
        {shuffledCells.map((cell) => (
          <button
            key={cell.id}
            type="button"
            className="logic-cell"
            onClick={() => pickCell(cell.id)}
            disabled={session.done}
          >
            <span>{cell.emoji}</span>
            <strong>{cell.label}</strong>
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