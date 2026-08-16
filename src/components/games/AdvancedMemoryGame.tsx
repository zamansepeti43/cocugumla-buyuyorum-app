import { useEffect, useMemo, useState } from 'react'
import { useGameSession } from '../../hooks/useGameSession'

const ADVANCED_EMOJIS = ['🍎', '🍌', '🍇', '🍓', '🍊']

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

export function AdvancedMemoryGame() {
  const session = useGameSession({
    totalRounds: 1,
    initialFeedback: 'Kartlara dokun ve çiftleri aynı anda hatırla.',
    successMessage: 'Harika! İleri hafıza oyununu tamamladın.',
  })

  const cards = useMemo(() => {
    const pairs = ADVANCED_EMOJIS.flatMap((emoji) => Array.from({ length: 2 }, (_, index) => ({ id: `${emoji}-${index}`, emoji })))
    return shuffle(pairs).map((card, index) => ({ ...card, cardIndex: index }))
  }, [])

  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [firstIndex, setFirstIndex] = useState<number | null>(null)
  const [moveCount, setMoveCount] = useState(0)

  useEffect(() => {
    if (matched.length === cards.length) {
      session.markCorrect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matched.length, cards.length])

  const resetGame = () => {
    setFlipped([])
    setMatched([])
    setFirstIndex(null)
    setMoveCount(0)
    session.reset()
  }

  const handleFlip = (cardIndex: number) => {
    if (session.done || flipped.includes(cardIndex) || matched.includes(cardIndex)) return

    if (firstIndex === null) {
      setFirstIndex(cardIndex)
      setFlipped([cardIndex])
      return
    }

    const first = cards[firstIndex]
    const second = cards[cardIndex]
    setFlipped([firstIndex, cardIndex])
    setMoveCount((count) => count + 1)

    if (first.emoji === second.emoji) {
      window.setTimeout(() => {
        setMatched((current) => [...current, firstIndex, cardIndex])
        setFlipped([])
        setFirstIndex(null)
      }, 350)
      return
    }

    window.setTimeout(() => {
      setFlipped([])
      setFirstIndex(null)
    }, 700)
  }

  const isFlipped = (cardIndex: number) => flipped.includes(cardIndex) || matched.includes(cardIndex)

  return (
    <div className="interactive-playground">
      <p className="interactive-note">Çiftleri en az hamleyle bul. Dikkatini ve hafızanı kullan.</p>
      <div className="memory-grid advanced-grid">
        {cards.map((card) => (
          <button
            key={card.id}
            type="button"
            className={`memory-card advanced-card ${isFlipped(card.cardIndex) ? 'memory-revealed' : ''}`}
            onClick={() => handleFlip(card.cardIndex)}
            aria-label={isFlipped(card.cardIndex) ? card.emoji : 'Kapalı kart'}
          >
            <span>{isFlipped(card.cardIndex) ? card.emoji : '❔'}</span>
          </button>
        ))}
      </div>
      <div className={`choice-feedback ${session.tone ?? 'idle'}`}>{session.feedback}</div>
      <div className="interactive-controls">
        <button type="button" className="secondary-button" onClick={resetGame}>Sıfırla</button>
      </div>
      <p className="choice-progress">Hamle: {moveCount} · Eşleşen: {matched.length / 2} / {cards.length / 2}</p>
    </div>
  )
}