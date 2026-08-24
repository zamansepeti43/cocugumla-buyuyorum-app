import { useEffect, useMemo, useState } from 'react'
import { useGameSession } from '../../hooks/useGameSession'

const PAIR_EMOJIS = ['🐶', '🐱', '🐰', '🦊']

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

export function MemoryGridGame() {
  const session = useGameSession({
    totalRounds: 1,
    initialFeedback: 'Kartlara dokun ve aynı hayvan çiftlerini bul.',
    successMessage: 'Harika! Bütün çiftleri buldun.',
  })

  const cards = useMemo(() => {
    const pairs = PAIR_EMOJIS.flatMap((emoji) => [{ emoji, id: `${emoji}-a` }, { emoji, id: `${emoji}-b` }])
    return shuffle(pairs).map((card, index) => ({ ...card, cardIndex: index }))
  }, [])

  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [firstIndex, setFirstIndex] = useState<number | null>(null)

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
      <p className="interactive-note">Kartlara dokun, aynı hayvan çiftlerini bularak hepsini eşleştir.</p>
      <div className="memory-grid">
        {cards.map((card) => (
          <button
            key={card.id}
            type="button"
            className={`memory-card ${isFlipped(card.cardIndex) ? 'memory-revealed' : ''}`}
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
      <p className="choice-progress">Eşleşen: {matched.length / 2} / {cards.length / 2}</p>
    </div>
  )
}