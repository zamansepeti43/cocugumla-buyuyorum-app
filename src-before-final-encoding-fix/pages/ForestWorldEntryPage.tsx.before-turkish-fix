import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const forest = '/illustrations/forest/file_0000000048b481f488920a1edaf0608f.png'
const leo = '/illustrations/forest/leo-quality.webp'

const shell = {
  position: 'fixed' as const,
  inset: 0,
  width: '100vw',
  height: '100dvh',
  overflow: 'hidden' as const,
  background: '#bfe8d8',
  fontFamily: 'system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
}

export function ForestWorldEntryPage() {
  const navigate = useNavigate()
  const [talking, setTalking] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setTalking(true), 500)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <main style={shell} aria-label="DoÄŸa DÃ¼nyasÄ± giriÅŸ">
      <img
        src={forest}
        alt="DoÄŸa DÃ¼nyasÄ± ormanÄ±"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', zIndex: 0 }}
      />

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(255,255,255,.02),rgba(16,63,43,.12))', zIndex: 1, pointerEvents: 'none' }} />

      <div style={{ position: 'absolute', left: '4%', top: '5%', padding: '10px 18px', borderRadius: 18, background: 'rgba(102,62,32,.95)', border: '3px solid rgba(73,43,22,.95)', color: '#fff2a8', fontWeight: 900, fontSize: 'clamp(15px,2vw,27px)', boxShadow: '0 7px 16px rgba(20,50,35,.25)', zIndex: 6 }}>
        ğŸŒ¿ DOÄA DÃœNYASI
      </div>

      {/* The exact quality Leo asset is used here. No SVG/CSS-drawn replacement. */}
      <div style={{ position: 'absolute', left: '50%', bottom: '-1%', transform: 'translateX(-50%)', width: 'min(34vw,430px)', height: '72%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 4, animation: 'leoFloat 3.2s ease-in-out infinite', pointerEvents: 'none' }}>
        <img src={leo} alt="Leo" style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center bottom', filter: 'drop-shadow(0 18px 13px rgba(25,64,43,.30))' }} />
      </div>

      <div style={{ position: 'absolute', left: '5%', top: '17%', width: 'min(650px,48vw)', padding: '19px 24px', borderRadius: 28, background: 'rgba(255,251,238,.94)', border: '3px solid rgba(255,255,255,.9)', boxShadow: '0 12px 30px rgba(32,72,52,.22)', opacity: talking ? 1 : 0, transform: talking ? 'translateY(0)' : 'translateY(8px)', transition: 'opacity .4s ease,transform .4s ease', zIndex: 5 }}>
        <strong style={{ display: 'block', fontSize: 'clamp(18px,2.1vw,28px)', color: '#67371f', marginBottom: 7 }}>Merhaba kÃ¼Ã§Ã¼k kaÅŸif! ğŸ¦</strong>
        <div style={{ fontSize: 'clamp(13px,1.55vw,19px)', fontWeight: 750, lineHeight: 1.45, color: '#302c27' }}>
          Ben Leo. BurasÄ± DoÄŸa DÃ¼nyasÄ±. Birlikte hayvanlarÄ±, bitkileri ve doÄŸanÄ±n gÃ¼zel seslerini keÅŸfedeceÄŸiz!
        </div>
      </div>

      <button
        type="button"
        onClick={() => navigate('/worlds/forest/map')}
        disabled={!talking}
        style={{ position: 'absolute', right: '4%', bottom: '5%', border: 0, borderRadius: 22, padding: '16px 30px', background: talking ? 'linear-gradient(#ffd94f,#f2a72f)' : '#8e9a8e', color: '#603214', fontWeight: 1000, fontSize: 'clamp(17px,2vw,26px)', boxShadow: talking ? '0 7px 0 #bf7726' : 'none', cursor: talking ? 'pointer' : 'default', zIndex: 7 }}>
        Maceraya BaÅŸla! â†’
      </button>

      <style>{`
        @keyframes leoFloat { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-7px); } }
        @media (max-width: 760px) {
          .forest-entry-leo { width: 48%; height: 58%; }
        }
      `}</style>
    </main>
  )
}

