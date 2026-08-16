import { Maximize2, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

export function GameShell({ title, children }: { title: string; children: ReactNode }) {
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