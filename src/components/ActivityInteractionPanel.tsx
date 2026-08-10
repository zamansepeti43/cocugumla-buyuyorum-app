import { Pause, Play, RotateCcw, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Activity } from '../types/models'

function resolveInteraction(activity: Activity): 'contrast-track' | 'balloon-track' | 'touch-and-see' | 'sorting-game' | null {
  if (activity.interactionId) return activity.interactionId

  // 8 aylık grupta mevcut aktivitelere minimal ve doğrudan etkileşim bağları.
  if (activity.id === 'baby-7-9-09') return 'contrast-track'
  if (activity.id === 'baby-7-9-10') return 'balloon-track'
  if (activity.id === 'baby-7-9-14') return 'touch-and-see'
  if (activity.id === 'baby-7-9-12') return 'sorting-game'

  if (activity.activityType === 'visual') return 'contrast-track'
  if (activity.activityType === 'game') return 'balloon-track'
  if (activity.activityType === 'sorting') return 'sorting-game'
  return null
}

function ContrastTrack() {
  const [running, setRunning] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right'>('right')

  const style = useMemo(
    () => ({
      animationPlayState: running ? 'running' : 'paused',
      animationDirection: direction === 'right' ? 'normal' : 'reverse',
    }),
    [direction, running],
  )

  return (
    <div className="interactive-playground">
      <p className="interactive-note">Yüksek kontrastlı şekli çocuğunuza ekrandan yavaşça takip ettirin.</p>
      <div className="visual-stage contrast-stage">
        <div className="contrast-shape" style={style} aria-label="Hareketli kontrast şekli" />
      </div>
      <div className="interactive-controls">
        <button type="button" className="primary-button" onClick={() => setRunning((value) => !value)}>
          {running ? <Pause size={18} /> : <Play size={18} />}
          {running ? 'Durdur' : 'Başlat'}
        </button>
        <button type="button" className="secondary-button" onClick={() => setDirection((value) => (value === 'right' ? 'left' : 'right'))}>
          <RotateCcw size={18} /> Yön Değiştir
        </button>
      </div>
    </div>
  )
}

function BalloonTrack() {
  const [running, setRunning] = useState(false)

  return (
    <div className="interactive-playground">
      <p className="interactive-note">Balonu gözle takip etme oyunu. Hareketi başlatıp durdurabilirsiniz.</p>
      <div className="visual-stage game-stage">
        <div className={`balloon ${running ? 'running' : ''}`} aria-label="Hareketli balon" />
      </div>
      <div className="interactive-controls">
        <button type="button" className="primary-button" onClick={() => setRunning((value) => !value)}>
          {running ? <Pause size={18} /> : <Play size={18} />}
          {running ? 'Durdur' : 'Başlat'}
        </button>
      </div>
    </div>
  )
}

function TouchAndSee() {
  const [shape, setShape] = useState<'circle' | 'square' | 'triangle'>('circle')
  const [colorIndex, setColorIndex] = useState(0)
  const colors = ['#1f2937', '#0f766e', '#b45309']

  const nextShape = () => {
    setShape((current) => {
      if (current === 'circle') return 'square'
      if (current === 'square') return 'triangle'
      return 'circle'
    })
    setColorIndex((current) => (current + 1) % colors.length)
  }

  return (
    <div className="interactive-playground">
      <p className="interactive-note">Dokununca şekil değişir. Ebeveyn çocuğun dikkatini yönlendirebilir.</p>
      <button type="button" className="touch-stage" onClick={nextShape}>
        <span className={`touch-shape ${shape}`} style={{ background: colors[colorIndex] }} />
        <span>Dokun ve değiştir</span>
      </button>
      <div className="interactive-controls">
        <button type="button" className="secondary-button" onClick={nextShape}>
          <Sparkles size={18} /> Şekli Değiştir
        </button>
      </div>
    </div>
  )
}

function SortingGame() {
  const roundPatterns = [
    { title: 'İlk tur', target: [0, 1, 2], labels: ['Yıldız', 'Bulut', 'Gökkuşağı'] },
    { title: 'İkinci tur', target: [2, 0, 1], labels: ['Yıldız', 'Bulut', 'Gökkuşağı'] },
    { title: 'Üçüncü tur', target: [1, 2, 0], labels: ['Yıldız', 'Bulut', 'Gökkuşağı'] },
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
      setFeedback('Harika! Bu turu tamamladın.')
      setFeedbackTone('success')
      setIsComplete(nextCompletedRounds >= 3)
    } else {
      setFeedback('Bu sıra doğru değil. Tekrar dene.')
      setFeedbackTone('error')
      setSelectedOrder([])
    }
  }

  return (
    <div className="interactive-playground">
      <p className="interactive-note">Nesnelere dokunarak doğru sırayı oluştur. Her turda üç adım var.</p>
      <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', marginBottom: '0.9rem' }}>
        {currentPattern.labels.map((label, index) => {
          const isActive = selectedOrder.includes(index)
          return (
            <button
              key={label}
              type="button"
              onClick={() => handleSelect(index)}
              style={{
                minHeight: '86px',
                borderRadius: '16px',
                border: isActive ? '2px solid #0f766e' : '2px solid #d1d5db',
                background: isActive ? '#ccfbf1' : '#ffffff',
                fontSize: '1rem',
                fontWeight: 600,
                padding: '0.8rem 0.5rem',
                boxShadow: '0 4px 10px rgba(15, 23, 42, 0.08)',
              }}
            >
              <div style={{ fontSize: '1.35rem', marginBottom: '0.35rem' }}>
                {index === 0 ? '⭐' : index === 1 ? '☁️' : '🌈'}
              </div>
              <div>{label}</div>
            </button>
          )
        })}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', marginBottom: '0.75rem' }}>
        <button type="button" className="secondary-button" onClick={resetRound}>Sıfırla</button>
        {!isComplete && feedbackTone === 'success' && (
          <button type="button" className="primary-button" onClick={goToNextRound}>Sonraki tur</button>
        )}
      </div>
      <div style={{ minHeight: '2.5rem', fontWeight: 600, color: feedbackTone === 'error' ? '#b91c1c' : '#0f766e' }}>
        {feedback ?? `Seçilen sıra: ${selectedOrder.map((item) => currentPattern.labels[item]).join(' → ') || 'Henüz yok'}`}
      </div>
      <div style={{ marginTop: '0.5rem', fontSize: '0.95rem', color: '#334155' }}>
        {isComplete ? 'Harika! Üç turu da tamamladın. Oyun bitti.' : `Tur ${Math.min(completedRounds + 1, 3)} / 3`}
      </div>
    </div>
  )
}

export function ActivityInteractionPanel({ activity }: { activity: Activity }) {
  const interaction = resolveInteraction(activity)
  if (!interaction) return null

  return (
    <section className="interaction-card">
      <span className="kicker">ETKİLEŞİMLİ AKTİVİTE</span>
      <h2>Ekran Üzerinde Uygula</h2>
      {interaction === 'contrast-track' && <ContrastTrack />}
      {interaction === 'balloon-track' && <BalloonTrack />}
      {interaction === 'touch-and-see' && <TouchAndSee />}
      {interaction === 'sorting-game' && <SortingGame />}
    </section>
  )
}
