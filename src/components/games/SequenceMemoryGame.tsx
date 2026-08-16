import { useEffect, useRef, useState } from 'react'
import { useGameSession } from '../../hooks/useGameSession'

const COLORS = ['🔴', '🔵', '🟢', '🟡']

function getSequence(length: number): number[] {
  return Array.from({ length }, () => Math.floor(Math.random() * COLORS.length))
}

export function SequenceMemoryGame() {
  const session = useGameSession({
    totalRounds: 3,
    initialFeedback: 'Renk sırasını izle ve aynı sırayla tekrar et.',
    successMessage: 'Harika! Bütün sıraları doğru tekrarladın.',
  })

  const sequenceLengths = [3, 4, 5]
  const [sequence, setSequence] = useState<number[]>(() => getSequence(sequenceLengths[0]))
  const [currentStep, setCurrentStep] = useState(0)
  const [showColor, setShowColor] = useState<number | null>(null)
  const [playerTurn, setPlayerTurn] = useState(false)
  const timersRef = useRef<number[]>([])

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer))
      timersRef.current = []
    }
  }, [])

  const playSequence = () => {
    setPlayerTurn(false)
    setCurrentStep(0)
    timersRef.current.forEach((timer) => window.clearTimeout(timer))
    timersRef.current = []

    sequence.forEach((colorIndex, index) => {
      const showTimer = window.setTimeout(() => {
        setShowColor(colorIndex)
        const hideTimer = window.setTimeout(() => setShowColor(null), 500)
        timersRef.current.push(hideTimer)
      }, 650 * (index + 1))
      timersRef.current.push(showTimer)
    })

    const turnTimer = window.setTimeout(() => {
      setPlayerTurn(true)
      setShowColor(null)
    }, 650 * sequence.length + 200)
    timersRef.current.push(turnTimer)
  }

  useEffect(() => {
    const initialTimer = window.setTimeout(() => playSequence(), 30)
    return () => {
      window.clearTimeout(initialTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.round])

  const handleColor = (colorIndex: number) => {
    if (session.done || !playerTurn) return

    if (colorIndex === sequence[currentStep]) {
      const next = currentStep + 1
      setCurrentStep(next)
      if (next >= sequence.length) {
        const finished = session.markCorrect()
        if (!finished) {
          session.advanceRound()
          setSequence(getSequence(sequenceLengths[(session.round + 1) % sequenceLengths.length]))
        }
      }
      return
    }

    session.markWrong()
    playSequence()
  }

  const resetGame = () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer))
    timersRef.current = []
    setSequence(getSequence(sequenceLengths[0]))
    setCurrentStep(0)
    setPlayerTurn(false)
    setShowColor(null)
    session.reset()
  }

  return (
    <div className="interactive-playground">
      <p className="interactive-note">Yanıp sönen renklerin sırasını izle ve aynı sırayla dokun.</p>
      <div className="sequence-pad">
        {COLORS.map((color, index) => (
          <button
            key={color}
            type="button"
            className={`sequence-btn ${showColor === index ? 'sequence-lit' : ''}`}
            onClick={() => handleColor(index)}
            disabled={session.done || !playerTurn}
          >
            <span>{color}</span>
          </button>
        ))}
      </div>
      <div className={`choice-feedback ${session.tone ?? 'idle'}`}>{session.feedback}</div>
      <div className="interactive-controls">
        <button type="button" className="primary-button" onClick={playSequence} disabled={session.done || playerTurn}>Sırayı Göster</button>
        <button type="button" className="secondary-button" onClick={resetGame}>Sıfırla</button>
      </div>
      <p className="choice-progress">Tur {Math.min(session.completedRounds + 1, 3)} / 3</p>
    </div>
  )
}