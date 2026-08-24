import { useState } from 'react'

export function MovingShapeGame() {
  const [step, setStep] = useState(0)
  const [feedback, setFeedback] = useState('Şekli izleyin ve hedef alana geldiğinde dokunun.')
  const pattern = ['⬅️', '⬆️', '➡️']

  const onTap = () => {
    const next = step + 1
    setStep(next)
    if (next >= 3) {
      setFeedback('Harika! 3 tur tamamlandı.')
    } else {
      setFeedback('Doğru! Sıradaki yönü yakalayın.')
    }
  }

  const reset = () => {
    setStep(0)
    setFeedback('Şekli izleyin ve hedef alana geldiğinde dokunun.')
  }

  return (
    <div className="interactive-playground">
      <p className="interactive-note">Hareket yönüne dikkat et ve şekle dokun.</p>
      <button type="button" className="moving-shape-target" onClick={onTap} disabled={step >= 3}>
        <span>{pattern[Math.min(step, 2)]}</span>
        <strong>Dokun ve yakala</strong>
      </button>
      <div className="choice-feedback idle">{feedback}</div>
      <div className="interactive-controls">
        <button type="button" className="secondary-button" onClick={reset}>Sıfırla</button>
      </div>
      <p className="choice-progress">Tur {Math.min(step + 1, 3)} / 3</p>
    </div>
  )
}