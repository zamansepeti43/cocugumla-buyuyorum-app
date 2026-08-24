import { Sparkles } from 'lucide-react'
import { useState } from 'react'

export function TouchAndSee() {
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