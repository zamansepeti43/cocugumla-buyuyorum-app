import { Maximize2, Pause, Play, RotateCcw, Sparkles, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactElement } from 'react'
import type { Activity } from '../types/models'
import type { ActivityInteractionId } from '../types/models'

type FeedbackTone = 'success' | 'error' | null

type ChoiceRound = {
  prompt: string
  options: Array<{
    id: string
    label: string
    emoji: string
    color?: string
  }>
  correctId: string
}

function resolveInteraction(activity: Activity): ActivityInteractionId | null {
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

function GameShell({ title, children }: { title: string; children: React.ReactNode }) {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const [overlayOpen, setOverlayOpen] = useState(false)

  useEffect(() => {
    const handleChange = () => {
      const isActive = document.fullscreenElement === hostRef.current
      if (!isActive && document.fullscreenElement) return
      if (!isActive && overlayOpen) {
        setOverlayOpen(false)
      }
    }

    document.addEventListener('fullscreenchange', handleChange)
    return () => document.removeEventListener('fullscreenchange', handleChange)
  }, [overlayOpen])

  const openFullscreen = async () => {
    setOverlayOpen(true)
    if (!hostRef.current?.requestFullscreen) return

    try {
      await hostRef.current.requestFullscreen()
    } catch {
      // Fallback overlay keeps the game usable when Fullscreen API is blocked.
    }
  }

  const closeFullscreen = async () => {
    if (document.fullscreenElement === hostRef.current && document.exitFullscreen) {
      await document.exitFullscreen()
    }
    setOverlayOpen(false)
  }

  return (
    <section ref={hostRef} className={`game-shell ${overlayOpen ? 'overlay-open' : ''}`}>
      <div className="game-shell-header">
        <h3>{title}</h3>
        {!overlayOpen && (
          <button type="button" className="primary-button game-shell-expand" onClick={openFullscreen}>
            <Maximize2 size={17} /> Tam Ekran Oyna
          </button>
        )}
        {overlayOpen && (
          <button type="button" className="secondary-button game-shell-close" onClick={closeFullscreen}>
            <X size={17} /> Kapat
          </button>
        )}
      </div>
      <div className="game-shell-content">{children}</div>
    </section>
  )
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

function ChoiceGame({
  note,
  rounds,
  successMessage,
}: {
  note: string
  rounds: ChoiceRound[]
  successMessage: string
}) {
  const [roundIndex, setRoundIndex] = useState(0)
  const [completedRounds, setCompletedRounds] = useState(0)
  const [feedback, setFeedback] = useState('Hedefi seçin.')
  const [tone, setTone] = useState<FeedbackTone>(null)
  const [done, setDone] = useState(false)

  const currentRound = rounds[roundIndex]

  const selectOption = (optionId: string) => {
    if (done) return

    if (optionId === currentRound.correctId) {
      const nextCount = completedRounds + 1
      setCompletedRounds(nextCount)
      setTone('success')
      if (nextCount >= 3) {
        setDone(true)
        setFeedback(successMessage)
        return
      }

      setFeedback('Doğru! Sonraki tur hazır.')
      setRoundIndex((value) => (value + 1) % rounds.length)
      return
    }

    setTone('error')
    setFeedback('Yanlış seçim. Tekrar deneyin.')
  }

  const resetGame = () => {
    setRoundIndex(0)
    setCompletedRounds(0)
    setFeedback('Hedefi seçin.')
    setTone(null)
    setDone(false)
  }

  return (
    <div className="interactive-playground">
      <p className="interactive-note">{note}</p>
      <div className="choice-prompt">{currentRound.prompt}</div>
      <div className="choice-grid">
        {currentRound.options.map((option) => (
          <button
            key={option.id}
            type="button"
            className="choice-card"
            style={{ backgroundColor: option.color ?? '#ffffff' }}
            onClick={() => selectOption(option.id)}
          >
            <span>{option.emoji}</span>
            <strong>{option.label}</strong>
          </button>
        ))}
      </div>
      <div className={`choice-feedback ${tone ?? 'idle'}`}>{feedback}</div>
      <div className="interactive-controls">
        <button type="button" className="secondary-button" onClick={resetGame}>Sıfırla</button>
      </div>
      <p className="choice-progress">Tur {Math.min(completedRounds + 1, 3)} / 3</p>
    </div>
  )
}

function SortingGame() {
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

function ColorMatchGame() {
  return (
    <ChoiceGame
      note="Hedef rengi bulup dokunun."
      successMessage="Harika! 3 turu tamamladınız."
      rounds={[
        {
          prompt: 'Kırmızı rengi bul.',
          correctId: 'red',
          options: [
            { id: 'red', label: 'Kırmızı', emoji: '🔴', color: '#fecaca' },
            { id: 'blue', label: 'Mavi', emoji: '🔵', color: '#bfdbfe' },
            { id: 'green', label: 'Yeşil', emoji: '🟢', color: '#bbf7d0' },
          ],
        },
        {
          prompt: 'Sarı rengi bul.',
          correctId: 'yellow',
          options: [
            { id: 'purple', label: 'Mor', emoji: '🟣', color: '#ddd6fe' },
            { id: 'yellow', label: 'Sarı', emoji: '🟡', color: '#fef08a' },
            { id: 'orange', label: 'Turuncu', emoji: '🟠', color: '#fed7aa' },
          ],
        },
        {
          prompt: 'Yeşil rengi bul.',
          correctId: 'green',
          options: [
            { id: 'pink', label: 'Pembe', emoji: '🩷', color: '#fbcfe8' },
            { id: 'green', label: 'Yeşil', emoji: '🟢', color: '#86efac' },
            { id: 'gray', label: 'Gri', emoji: '⚪', color: '#e5e7eb' },
          ],
        },
      ]}
    />
  )
}

function MissingShapeGame() {
  return (
    <ChoiceGame
      note="Görünen şekli aklında tut ve kaybolunca doğru olanı seç."
      successMessage="Süper! Kaybolan şekilleri doğru buldunuz."
      rounds={[
        {
          prompt: 'Kaybolan şekil: Üçgen',
          correctId: 'triangle',
          options: [
            { id: 'circle', label: 'Daire', emoji: '⚪' },
            { id: 'triangle', label: 'Üçgen', emoji: '🔺' },
            { id: 'square', label: 'Kare', emoji: '🟦' },
          ],
        },
        {
          prompt: 'Kaybolan şekil: Kare',
          correctId: 'square',
          options: [
            { id: 'square', label: 'Kare', emoji: '🟦' },
            { id: 'star', label: 'Yıldız', emoji: '⭐' },
            { id: 'circle', label: 'Daire', emoji: '⚪' },
          ],
        },
        {
          prompt: 'Kaybolan şekil: Daire',
          correctId: 'circle',
          options: [
            { id: 'heart', label: 'Kalp', emoji: '❤️' },
            { id: 'triangle', label: 'Üçgen', emoji: '🔺' },
            { id: 'circle', label: 'Daire', emoji: '⚪' },
          ],
        },
      ]}
    />
  )
}

function AnimalFinderGame() {
  return (
    <ChoiceGame
      note="Hedef hayvanı seçmek için kartlara dokun."
      successMessage="Harika! Hayvan kartlarını doğru seçtiniz."
      rounds={[
        {
          prompt: 'Kediyi bul.',
          correctId: 'cat',
          options: [
            { id: 'cat', label: 'Kedi', emoji: '🐈' },
            { id: 'dog', label: 'Köpek', emoji: '🐕' },
            { id: 'bird', label: 'Kuş', emoji: '🐦' },
          ],
        },
        {
          prompt: 'Kuşu bul.',
          correctId: 'bird',
          options: [
            { id: 'fish', label: 'Balık', emoji: '🐟' },
            { id: 'bird', label: 'Kuş', emoji: '🐦' },
            { id: 'cat', label: 'Kedi', emoji: '🐈' },
          ],
        },
        {
          prompt: 'Köpeği bul.',
          correctId: 'dog',
          options: [
            { id: 'rabbit', label: 'Tavşan', emoji: '🐇' },
            { id: 'dog', label: 'Köpek', emoji: '🐕' },
            { id: 'frog', label: 'Kurbağa', emoji: '🐸' },
          ],
        },
      ]}
    />
  )
}

function SizePickerGame() {
  return (
    <ChoiceGame
      note="Yönergeye göre büyük veya küçük nesneyi seç."
      successMessage="3 tur tamamlandı! Büyük-küçük oyunu bitti."
      rounds={[
        {
          prompt: 'Büyük olanı seç.',
          correctId: 'big-ball',
          options: [
            { id: 'big-ball', label: 'Büyük Top', emoji: '⚽' },
            { id: 'small-ball', label: 'Küçük Top', emoji: '🏀' },
            { id: 'tiny-ball', label: 'Mini Top', emoji: '🎾' },
          ],
        },
        {
          prompt: 'Küçük olanı seç.',
          correctId: 'small-car',
          options: [
            { id: 'big-car', label: 'Büyük Araba', emoji: '🚚' },
            { id: 'small-car', label: 'Küçük Araba', emoji: '🚗' },
            { id: 'medium-car', label: 'Orta Araba', emoji: '🚙' },
          ],
        },
        {
          prompt: 'Yine büyük olanı seç.',
          correctId: 'big-star',
          options: [
            { id: 'small-star', label: 'Küçük Yıldız', emoji: '✨' },
            { id: 'big-star', label: 'Büyük Yıldız', emoji: '⭐' },
            { id: 'moon', label: 'Ay', emoji: '🌙' },
          ],
        },
      ]}
    />
  )
}

function TwinMatchGame() {
  return (
    <ChoiceGame
      note="Üstte söylenen örneğin aynısını seç."
      successMessage="Süper! Aynı kartları buldunuz."
      rounds={[
        {
          prompt: 'Örnek: Mavi balık. Aynısını seç.',
          correctId: 'blue-fish',
          options: [
            { id: 'blue-fish', label: 'Mavi Balık', emoji: '🐟' },
            { id: 'red-fish', label: 'Kırmızı Balık', emoji: '🐠' },
            { id: 'yellow-fish', label: 'Sarı Balık', emoji: '🐡' },
          ],
        },
        {
          prompt: 'Örnek: Yeşil yaprak. Aynısını seç.',
          correctId: 'green-leaf',
          options: [
            { id: 'green-leaf', label: 'Yeşil Yaprak', emoji: '🍃' },
            { id: 'red-leaf', label: 'Kırmızı Yaprak', emoji: '🍁' },
            { id: 'flower', label: 'Çiçek', emoji: '🌸' },
          ],
        },
        {
          prompt: 'Örnek: Kırmızı top. Aynısını seç.',
          correctId: 'red-ball',
          options: [
            { id: 'blue-ball', label: 'Mavi Top', emoji: '🔵' },
            { id: 'red-ball', label: 'Kırmızı Top', emoji: '🔴' },
            { id: 'green-ball', label: 'Yeşil Top', emoji: '🟢' },
          ],
        },
      ]}
    />
  )
}

function SoundObjectGame() {
  return (
    <ChoiceGame
      note="Ses simgesine dokunup hedef nesneyi seç."
      successMessage="Harika! Sesli nesne oyununu tamamladınız."
      rounds={[
        {
          prompt: '🔊 "Miyav" sesine uygun nesneyi bul.',
          correctId: 'cat',
          options: [
            { id: 'cat', label: 'Kedi', emoji: '🐈' },
            { id: 'drum', label: 'Davul', emoji: '🥁' },
            { id: 'car', label: 'Araba', emoji: '🚗' },
          ],
        },
        {
          prompt: '🔊 "Vınn" sesine uygun nesneyi bul.',
          correctId: 'car',
          options: [
            { id: 'bird', label: 'Kuş', emoji: '🐦' },
            { id: 'car', label: 'Araba', emoji: '🚗' },
            { id: 'bell', label: 'Çan', emoji: '🔔' },
          ],
        },
        {
          prompt: '🔊 "Cik cik" sesine uygun nesneyi bul.',
          correctId: 'bird',
          options: [
            { id: 'bird', label: 'Kuş', emoji: '🐦' },
            { id: 'frog', label: 'Kurbağa', emoji: '🐸' },
            { id: 'clock', label: 'Saat', emoji: '⏰' },
          ],
        },
      ]}
    />
  )
}

function MotionTrackGame() {
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

function MovingShapeGame() {
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

const gameTitles: Record<ActivityInteractionId, string> = {
  'contrast-track': 'Kontrast Takibi',
  'balloon-track': 'Balonu Takip Et',
  'touch-and-see': 'Dokun ve Gör',
  'sorting-game': 'Dokun ve Sırala',
  'color-match-mini': 'Doğru Rengi Bul',
  'missing-shape': 'Kaybolan Şekli Bul',
  'animal-finder': 'Hayvanı Bul',
  'motion-track': 'Hareketli Şekli Takip Et',
  'size-picker': 'Büyük-Küçük Seç',
  'twin-match': 'Aynısını Bul',
  'sound-object': 'Sesli Nesneyi Bul',
  'moving-shape': 'Hareket Edeni Yakala',
}

const gameRenderers: Record<ActivityInteractionId, () => ReactElement> = {
  'contrast-track': ContrastTrack,
  'balloon-track': BalloonTrack,
  'touch-and-see': TouchAndSee,
  'sorting-game': SortingGame,
  'color-match-mini': ColorMatchGame,
  'missing-shape': MissingShapeGame,
  'animal-finder': AnimalFinderGame,
  'motion-track': MotionTrackGame,
  'size-picker': SizePickerGame,
  'twin-match': TwinMatchGame,
  'sound-object': SoundObjectGame,
  'moving-shape': MovingShapeGame,
}

export function ActivityInteractionPanel({ activity }: { activity: Activity }) {
  const interaction = resolveInteraction(activity)
  if (!interaction) return null

  const SelectedGame = gameRenderers[interaction]

  return (
    <section className="interaction-card">
      <span className="kicker">ETKİLEŞİMLİ AKTİVİTE</span>
      <h2>Ekran Üzerinde Uygula</h2>
      <GameShell title={gameTitles[interaction]}>
        <SelectedGame />
      </GameShell>
    </section>
  )
}
