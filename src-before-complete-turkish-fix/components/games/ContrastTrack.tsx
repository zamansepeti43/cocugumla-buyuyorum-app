import { Pause, Play, RotateCcw } from 'lucide-react'
import { useMemo, useState } from 'react'

export function ContrastTrack() {
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