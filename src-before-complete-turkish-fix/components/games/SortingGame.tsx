import { useState } from 'react'

export function SortingGame() {
  const roundPatterns = [
    { target: [0, 1, 2], labels: ['Yildiz', 'Bulut', 'Gokkusagi'] },
    { target: [2, 0, 1], labels: ['Yildiz', 'Bulut', 'Gokkusagi'] },
    { target: [1, 2, 0], labels: ['Yildiz', 'Bulut', 'Gokkusagi'] },
  ]

  const [round, setRound] = useState(0)
  const [selectedOrder, setSelectedOrder] = useState<number[]>([])
  const [feedback, setFeedback] = useState<string | null>(null)
  const [feedbackTone, setFeedbackTone] = useState<'success' | 'error' | null>(null)
  const [completedRounds, setCompletedRounds] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const currentPattern = roundPatterns[round]
  const isRoundComplete = selectedOrder.length === currentPattern.target.length

  const resetRound = () => {
    setSelectedOrder([])
    setFeedback(null)
    setFeedbackTone(null)
  }

  const goToNextRound = () => {
    setRound((value) => (value + 1) % roundPatterns.length)
    setSelectedOrder([])
    setFeedback(null)
    setFeedbackTone(null)
  }

  const handleSelect = (value: number) => {
    if (isComplete || isRoundComplete) return

    const nextSelection = [...selectedOrder, value]
    setSelectedOrder(nextSelection)

    if (nextSelection.length < currentPattern.target.length) {
      setFeedback(null)
      setFeedbackTone(null)
      return
    }

    const isCorrect = nextSelection.every((item, index) => item === currentPattern.target[index])

    if (isCorrect) {
      const nextCompletedRounds = completedRounds + 1
      setCompletedRounds(nextCompletedRounds)
      setFeedback('Harika! Bu tur dogru.')
      setFeedbackTone('success')
      setIsComplete(nextCompletedRounds >= 3)
    } else {
      setFeedback('Bu sira yanlis. Tekrar dene.')
      setFeedbackTone('error')
      setSelectedOrder([])
    }
  }

  return (
    <div className="interactive-playground">
      <p className="interactive-note">Nesnelere dokunarak dogru sirayi olustur. Her turda uc adim var.</p>
      <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', marginBottom: '0.9rem' }}>
        {currentPattern.labels.map((label, index) => {
          const isActive = selectedOrder.includes(index)
          return (
            <button
              key={label}
              type="button"
              onClick={() => handleSelect(index)}
              style={{
                minHeight: '88px',
                borderRadius: '16px',
                border: isActive ? '2px solid #0f766e' : '2px solid #d1d5db',
                background: isActive ? '#ccfbf1' : '#ffffff',
                fontSize: '1rem',
                fontWeight: 600,
                padding: '0.8rem 0.5rem',
                boxShadow: '0 4px 10px rgba(15, 23, 42, 0.08)',
              }}
            >
              <div style={{ fontSize: '1.3rem', marginBottom: '0.35rem' }}>
                {index === 0 ? '⭐' : index === 1 ? '☁️' : '🌈'}
              </div>
              <div>{label}</div>
            </button>
          )
        })}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', marginBottom: '0.75rem' }}>
        <button type="button" className="secondary-button" onClick={resetRound}>Sifirla</button>
        {!isComplete && feedbackTone === 'success' && (
          <button type="button" className="primary-button" onClick={goToNextRound}>Sonraki tur</button>
        )}
      </div>
      <div style={{ minHeight: '2.5rem', fontWeight: 600, color: feedbackTone === 'error' ? '#b91c1c' : '#0f766e' }}>
        {feedback ?? `Secilen sira: ${selectedOrder.map((item) => currentPattern.labels[item]).join(' > ') || 'Henuz yok'}`}
      </div>
      <div style={{ marginTop: '0.5rem', fontSize: '0.95rem', color: '#334155' }}>
        {isComplete ? 'Basari! Uc turu tamamladin.' : `Tur ${Math.min(completedRounds + 1, 3)} / 3`}
      </div>
    </div>
  )
}