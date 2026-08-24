import { useMemo, useState } from 'react'
import { useGameSession } from '../../hooks/useGameSession'

const CANDIES = ['🍬', '🍭', '🧁', '🍩']

type CandyCell = { id: string; emoji: string }

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

function buildGrid(): CandyCell[] {
  const pairs = CANDIES.flatMap((emoji) => Array.from({ length: 2 }, (_, index) => ({ id: `${emoji}-${index}`, emoji })))
  return shuffle(pairs)
}

export function CandyMatchGame() {
  const session = useGameSession({
    totalRounds: 3,
    initialFeedback: 'Aynı şekerleri eşleştirerek çiftleri bul.',
    successMessage: 'Harika! Bütün şeker çiftlerini buldun.',
  })

  const [cells, setCells] = useState<CandyCell[]>(() => buildGrid())
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [firstIndex, setFirstIndex] = useState<number | null>(null)
  const [roundKey, setRoundKey] = useState(0)

  const currentRound = useMemo(() => roundKey % 3, [roundKey])

  const handleFlip = (index: number) => {
    if (session.done || flipped.includes(index) || matched.includes(index)) return

    if (firstIndex === null) {
      setFirstIndex(index)
      setFlipped([index])
      return
    }

    const first = cells[firstIndex]
    const second = cells[index]
    setFlipped([firstIndex, index])

    if (first.emoji === second.emoji) {
      window.setTimeout(() => {
        setMatched((current) => [...current, firstIndex, index])
        setFlipped([])
        setFirstIndex(null)

        const newMatched = [...matched, firstIndex, index]
        if (newMatched.length === cells.length) {
          const finished = session.markCorrect()
          if (!finished) {
            session.advanceRound()
            setCells(buildGrid())
            setMatched([])
            setRoundKey((key) => key + 1)
          }
        }
      }, 350)
      return
    }

    window.setTimeout(() => {
      setFlipped([])
      setFirstIndex(null)
    }, 700)
  }

  const resetGame = () => {
    setCells(buildGrid())
    setFlipped([])
    setMatched([])
    setFirstIndex(null)
    setRoundKey(0)
    session.reset()
  }

  const isFlipped = (index: number) => flipped.includes(index) || matched.includes(index)

  return (
    <div className="interactive-playground">
      <p className="interactive-note">Şeker kartlarına dokun, aynı çiftleri bularak hepsini eşleştir.</p>
      <div className="memory-grid candy-grid">
        {cells.map((cell, index) => (
          <button
            key={cell.id}
            type="button"
            className={`memory-card candy-card ${isFlipped(index) ? 'memory-revealed' : ''}`}
            onClick={() => handleFlip(index)}
            aria-label={isFlipped(index) ? cell.emoji : 'Kapalı şeker kartı'}
          >
            <span>{isFlipped(index) ? cell.emoji : '🎀'}</span>
          </button>
        ))}
      </div>
      <div className={`choice-feedback ${session.tone ?? 'idle'}`}>{session.feedback}</div>
      <div className="interactive-controls">
        <button type="button" className="secondary-button" onClick={resetGame}>Sıfırla</button>
      </div>
      <p className="choice-progress">Tur {currentRound + 1} / 3</p>
    </div>
  )
}