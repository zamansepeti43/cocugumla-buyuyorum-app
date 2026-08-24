import { useState } from 'react'
import { useGameSession } from '../../hooks/useGameSession'

type Step = { id: string; label: string; emoji: string }

const MISSIONS: Array<{ goal: string; steps: Step[] }> = [
  {
    goal: 'Havuç çorbası yapımı',
    steps: [
      { id: 'wash', label: 'Havucu yıka', emoji: '🥕' },
      { id: 'cut', label: 'Havucu doğra', emoji: '🔪' },
      { id: 'cook', label: 'Tencerede pişir', emoji: '🍲' },
    ],
  },
  {
    goal: 'Köpeği gezdirmek',
    steps: [
      { id: 'leash', label: 'Tasmayı tak', emoji: '🦮' },
      { id: 'walk', label: 'Yürüyüşe çık', emoji: '🚶' },
      { id: 'water', label: 'Su ver', emoji: '💧' },
    ],
  },
  {
    goal: 'Oda temizliği',
    steps: [
      { id: 'toys', label: 'Oyuncakları topla', emoji: '🧸' },
      { id: 'sweep', label: 'Süpür', emoji: '🧹' },
      { id: 'bed', label: 'Yatağı düzelt', emoji: '🛏️' },
    ],
  },
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

export function StrategyPlanGame() {
  const session = useGameSession({
    totalRounds: 3,
    initialFeedback: 'Adımları doğru sıraya koymak için sırayla dokun.',
    successMessage: 'Harika! Planı doğru sıraladın.',
  })

  const mission = MISSIONS[session.round % MISSIONS.length]
  const [shuffledSteps, setShuffledSteps] = useState<Step[]>(() => shuffle(mission.steps))
  const [planned, setPlanned] = useState<Step[]>([])

  const pickStep = (stepId: string) => {
    if (session.done) return

    const expectedIndex = planned.length
    const expectedStep = mission.steps[expectedIndex]

    if (stepId === expectedStep.id) {
      const chosen = shuffledSteps.find((step) => step.id === stepId)
      if (!chosen) return
      const nextPlanned = [...planned, chosen]
      setPlanned(nextPlanned)
      setShuffledSteps((current) => current.filter((step) => step.id !== stepId))

      if (nextPlanned.length === mission.steps.length) {
        session.markCorrect()
      }
      return
    }

    session.markWrong()
  }

  const resetGame = () => {
    setShuffledSteps(shuffle(mission.steps))
    setPlanned([])
    session.reset()
  }

  return (
    <div className="interactive-playground">
      <p className="interactive-note">Amaç: {mission.goal}. Karışık adımları doğru sıraya koy.</p>

      <div className="plan-slots">
        {mission.steps.map((step, index) => (
          <div key={step.id} className={`plan-slot ${planned[index] ? 'plan-filled' : ''}`}>
            <span className="plan-index">{index + 1}.</span>
            <span className="plan-emoji">{planned[index]?.emoji ?? '❓'}</span>
            <span className="plan-label">{planned[index]?.label ?? 'Boş'}</span>
          </div>
        ))}
      </div>

      <div className="plan-options">
        {shuffledSteps.map((step) => (
          <button
            key={step.id}
            type="button"
            className="plan-step"
            onClick={() => pickStep(step.id)}
            disabled={session.done}
          >
            <span>{step.emoji}</span>
            <strong>{step.label}</strong>
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