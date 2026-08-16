import { Pause, Play } from 'lucide-react'
import { useEffect, useState } from 'react'

export function MotionTrackGame() {
  const [running, setRunning] = useState(true)
  const [position, setPosition] = useState(10)
  const [direction, setDirection] = useState(1)
  const [hits, setHits] = useState(0)
  const [feedback, setFeedback] = useState('Hareketli şekil merkeze gelince dokun.')

  useEffect(() => {
    if (!running || hits >= 3) return

    const timer = window.setInterval(() => {
      setPosition((value) => {
        const next = value + direction * 4
        if (next >= 90) {
          setDirection(-1)
          return 90
        }
        if (next <= 10) {
          setDirection(1)
          return 10
        }
        return next
      })
    }, 140)

    return () => window.clearInterval(timer)
  }, [direction, hits, running])

  const handleCatch = () => {
    if (hits >= 3) return
    if (position >= 40 && position <= 60) {
      const next = hits + 1
      setHits(next)
      setFeedback(next >= 3 ? 'Başarılı! 3 tur tamamlandı.' : 'Doğru an! Bir tur daha.')
      return
    }

    setFeedback('Biraz erken/geç oldu. Tekrar deneyin.')
  }

  return (
    <div className="interactive-playground">
      <p className="interactive-note">Şekli takip edin ve orta alandayken yakalayın.</p>
      <div className="motion-lane">
        <div className="motion-target-zone" />
        <button
          type="button"
          className="motion-shape"
          style={{ left: `${position}%` }}
          onClick={handleCatch}
          aria-label="Hareketli şekli yakala"
        >
          🟠
        </button>
      </div>
      <div className="choice-feedback idle">{feedback}</div>
      <div className="interactive-controls">
        <button type="button" className="primary-button" onClick={() => setRunning((value) => !value)}>
          {running ? <Pause size={18} /> : <Play size={18} />}
          {running ? 'Durdur' : 'Başlat'}
        </button>
      </div>
      <p className="choice-progress">Tur {Math.min(hits + 1, 3)} / 3</p>
    </div>
  )
}