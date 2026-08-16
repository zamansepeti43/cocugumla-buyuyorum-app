import { Pause, Play } from 'lucide-react'
import { useState } from 'react'

export function BalloonTrack() {
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