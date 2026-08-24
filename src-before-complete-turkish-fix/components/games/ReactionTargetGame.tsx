import { useEffect, useRef, useState } from 'react'
import { useGameSession } from '../../hooks/useGameSession'

const PLAY_AREA = 6

function randomIndex(max: number): number {
  return Math.floor(Math.random() * max)
}

function randomDelay(): number {
  return 600 + Math.random() * 900
}

export function ReactionTargetGame() {
  const session = useGameSession({
    totalRounds: 5,
    initialFeedback: 'Hedef ışıldayınca hemen dokun.',
    successMessage: 'Harika! Çok hızlı bir refleksin var.',
  })

  const [targetCell, setTargetCell] = useState(() => randomIndex(PLAY_AREA))
  const [visible, setVisible] = useState(false)
  const [hitCount, setHitCount] = useState(0)
  const timerIdRef = useRef<number | null>(null)

  useEffect(() => {
    const id = window.setTimeout(() => setVisible(true), randomDelay())
    timerIdRef.current = id
    return () => {
      if (timerIdRef.current !== null) window.clearTimeout(timerIdRef.current)
      window.clearTimeout(id)
    }
  }, [])

  const handleTap = (index: number) => {
    if (session.done || !visible) return

    if (index === targetCell) {
      if (timerIdRef.current !== null) window.clearTimeout(timerIdRef.current)
      setVisible(false)
      const next = hitCount + 1
      setHitCount(next)
      session.markCorrect()

      if (next >= 5) return

      setTargetCell(randomIndex(PLAY_AREA))
      const id = window.setTimeout(() => setVisible(true), randomDelay())
      timerIdRef.current = id
      return
    }

    session.markWrong()
  }

  const resetGame = () => {
    if (timerIdRef.current !== null) window.clearTimeout(timerIdRef.current)
    setTargetCell(randomIndex(PLAY_AREA))
    setVisible(false)
    setHitCount(0)
    session.reset()
    const id = window.setTimeout(() => setVisible(true), randomDelay())
    timerIdRef.current = id
  }

  return (
    <div className="interactive-playground">
      <p className="interactive-note">Yeşil hedef göründüğü anda üzerine dokun. 5 hedef vur.</p>
      <div className="reaction-grid">
        {Array.from({ length: PLAY_AREA }, (_, index) => (
          <button
            key={index}
            type="button"
            className={`reaction-cell ${visible && index === targetCell ? 'reaction-active' : ''}`}
            onClick={() => handleTap(index)}
            disabled={session.done}
          >
            <span>{visible && index === targetCell ? '🎯' : '•'}</span>
          </button>
        ))}
      </div>
      <div className={`choice-feedback ${session.tone ?? 'idle'}`}>{session.feedback}</div>
      <div className="interactive-controls">
        <button type="button" className="secondary-button" onClick={resetGame}>Sıfırla</button>
      </div>
      <p className="choice-progress">Vuruş: {hitCount} / 5</p>
    </div>
  )
}