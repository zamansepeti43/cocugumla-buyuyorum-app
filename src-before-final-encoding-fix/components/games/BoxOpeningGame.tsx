import { useState } from 'react'

export function BoxOpeningGame() {
  const [open, setOpen] = useState(false)

  const reset = () => setOpen(false)

  return (
    <div className="interactive-playground">
      <p className="interactive-note">Kutuya dokun, kapağı açmayı deneyin.</p>

      <div className="box-stage">
        <button type="button" className="box-button" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Kapağı kapat' : 'Kapağı aç'}>
          <svg viewBox="0 0 200 160" className="box-svg" aria-hidden="true">
            <defs>
              <linearGradient id="boxGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f4b93f" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>
            <rect x="30" y="70" width="140" height="70" rx="8" fill="url(#boxGrad)" stroke="#241a06" strokeWidth="3" />
            <rect x="30" y="70" width="140" height="18" rx="4" fill="#fbbf24" stroke="#241a06" strokeWidth="2.5" />
            <g transform={open ? 'translate(0 -18) rotate(-22 100 70)' : 'translate(0 0)'} style={{ transition: 'transform 0.4s ease' }}>
              <rect x="30" y="52" width="140" height="18" rx="4" fill="#f4b93f" stroke="#241a06" strokeWidth="3" />
              <rect x="30" y="52" width="140" height="6" rx="2" fill="#fbbf24" />
            </g>
            <circle cx="100" cy="105" r="14" fill="#241a06" opacity="0.35" />
            <text x="100" y="110" textAnchor="middle" fontSize="16" fill="#fff" opacity="0.9">🎁</text>
          </svg>
          <span>{open ? 'Kapağı kapatmak için tekrar dokun' : 'Kutuya dokun'}</span>
        </button>
      </div>

      <div className={`choice-feedback ${open ? 'success' : 'idle'}`}>
        {open ? 'Aferin! Kapağı açtın.' : 'Hazır olduğunda kutuya dokunabilirsin.'}
      </div>

      <div className="interactive-controls">
        <button type="button" className="secondary-button" onClick={reset}>Baştan</button>
      </div>
    </div>
  )
}
