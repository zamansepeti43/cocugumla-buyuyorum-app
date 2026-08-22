import { useEffect, useState } from 'react'

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
  const [talking, setTalking] = useState(false)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setTalking(true), 500)
    return () => window.clearTimeout(timer)
  }, [])

  if (entered) return <NatureMap onBack={() => setEntered(false)} />

  return (
    <main style={shell} aria-label="Doğa Dünyası giriş">
      <img
        src={forest}
        alt="Doğa Dünyası ormanı"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', zIndex: 0 }}
      />

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(255,255,255,.02),rgba(16,63,43,.12))', zIndex: 1, pointerEvents: 'none' }} />

      <div style={{ position: 'absolute', left: '4%', top: '5%', padding: '10px 18px', borderRadius: 18, background: 'rgba(102,62,32,.95)', border: '3px solid rgba(73,43,22,.95)', color: '#fff2a8', fontWeight: 900, fontSize: 'clamp(15px,2vw,27px)', boxShadow: '0 7px 16px rgba(20,50,35,.25)', zIndex: 6 }}>
        🌿 DOĞA DÜNYASI
      </div>

      {/* The exact quality Leo asset is used here. No SVG/CSS-drawn replacement. */}
      <div style={{ position: 'absolute', left: '50%', bottom: '-1%', transform: 'translateX(-50%)', width: 'min(34vw,430px)', height: '72%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 4, animation: 'leoFloat 3.2s ease-in-out infinite', pointerEvents: 'none' }}>
        <img src={leo} alt="Leo" style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center bottom', filter: 'drop-shadow(0 18px 13px rgba(25,64,43,.30))' }} />
      </div>

      <div style={{ position: 'absolute', left: '5%', top: '17%', width: 'min(650px,48vw)', padding: '19px 24px', borderRadius: 28, background: 'rgba(255,251,238,.94)', border: '3px solid rgba(255,255,255,.9)', boxShadow: '0 12px 30px rgba(32,72,52,.22)', opacity: talking ? 1 : 0, transform: talking ? 'translateY(0)' : 'translateY(8px)', transition: 'opacity .4s ease,transform .4s ease', zIndex: 5 }}>
        <strong style={{ display: 'block', fontSize: 'clamp(18px,2.1vw,28px)', color: '#67371f', marginBottom: 7 }}>Merhaba küçük kaşif! 🦁</strong>
        <div style={{ fontSize: 'clamp(13px,1.55vw,19px)', fontWeight: 750, lineHeight: 1.45, color: '#302c27' }}>
          Ben Leo. Burası Doğa Dünyası. Birlikte hayvanları, bitkileri ve doğanın güzel seslerini keşfedeceğiz!
        </div>
      </div>

      <button
        type="button"
        onClick={() => setEntered(true)}
        disabled={!talking}
        style={{ position: 'absolute', right: '4%', bottom: '5%', border: 0, borderRadius: 22, padding: '16px 30px', background: talking ? 'linear-gradient(#ffd94f,#f2a72f)' : '#8e9a8e', color: '#603214', fontWeight: 1000, fontSize: 'clamp(17px,2vw,26px)', boxShadow: talking ? '0 7px 0 #bf7726' : 'none', cursor: talking ? 'pointer' : 'default', zIndex: 7 }}>
        Maceraya Başla! →
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

function NatureMap({ onBack }: { onBack: () => void }) {
  const islands = [
    { title: 'Hayvanlar', icon: '🦊', text: 'Ormandaki sevimli hayvanlarla tanış.' },
    { title: 'Doğa', icon: '🌿', text: 'Ağaçları, çiçekleri ve doğayı keşfet.' },
    { title: 'Sesler', icon: '🔊', text: 'Kuşları ve ormanın güzel seslerini dinle.' },
  ]
  const [selected, setSelected] = useState<(typeof islands)[number] | null>(null)

  return (
    <main style={{ ...shell, background: 'linear-gradient(180deg,#69d8ec,#38b6d5)' }} aria-label="Doğa Dünyası haritası">
      <header style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 74, display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', padding: '0 3%', zIndex: 8 }}>
        <button onClick={onBack} style={{ border: 0, borderRadius: 14, padding: '9px 13px', background: 'rgba(255,255,255,.9)', fontWeight: 900 }}>← Geri</button>
        <div style={{ textAlign: 'center', color: '#174e63' }}><div style={{ fontSize: 12, fontWeight: 1000, letterSpacing: 2 }}>🌿 DOĞA DÜNYASI</div><strong style={{ fontSize: 'clamp(18px,2.4vw,30px)' }}>Keşfetmeye hazır mısın?</strong></div>
        <div style={{ padding: '8px 13px', borderRadius: 999, background: '#fff1ae', fontWeight: 1000 }}>⭐ 0</div>
      </header>

      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 18%,rgba(255,255,255,.35),transparent 18%),radial-gradient(ellipse at 80% 25%,rgba(255,255,255,.28),transparent 20%)' }} />
      <div style={{ position: 'absolute', left: '5%', right: '5%', top: '20%', bottom: '15%', display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 'clamp(12px,3vw,32px)', alignItems: 'center', zIndex: 3 }}>
        {islands.map((island, index) => (
          <button key={island.title} type="button" onClick={() => setSelected(island)} style={{ height: 'min(38vh,290px)', border: 0, borderRadius: '48%', padding: 0, background: index === 1 ? '#78c96d' : '#6dbb67', boxShadow: '0 16px 30px rgba(24,91,109,.25),inset 0 0 0 5px rgba(255,255,255,.78)', cursor: 'pointer', transform: `rotate(${index === 0 ? -2 : index === 2 ? 2 : 0}deg)`, color: '#fff' }}>
            <div style={{ padding: 22, textShadow: '0 2px 7px rgba(0,0,0,.4)' }}><div style={{ fontSize: 'clamp(32px,5vw,56px)' }}>{island.icon}</div><strong style={{ fontSize: 'clamp(20px,2.8vw,34px)' }}>{island.title}</strong><div style={{ fontSize: 12, fontWeight: 900, marginTop: 5 }}>KEŞFET →</div></div>
          </button>
        ))}
      </div>

      {selected && <div role="dialog" aria-modal="true" onClick={() => setSelected(null)} style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'rgba(18,68,82,.28)', backdropFilter: 'blur(4px)', zIndex: 10, padding: 20 }}>
        <div onClick={e => e.stopPropagation()} style={{ width: 'min(440px,92vw)', borderRadius: 28, background: '#fffaf0', padding: 24, boxShadow: '0 25px 70px rgba(12,59,74,.35)', textAlign: 'center' }}>
          <div style={{ fontSize: 52 }}>{selected.icon}</div><h2 style={{ margin: '8px 0', color: '#315c45' }}>{selected.title}</h2><p style={{ margin: '0 0 18px', fontWeight: 700, color: '#476557' }}>{selected.text}</p><button type="button" onClick={() => setSelected(null)} style={{ border: 0, borderRadius: 16, padding: '12px 22px', background: 'linear-gradient(#ffd94f,#f2a72f)', color: '#603214', fontWeight: 1000 }}>Başlayalım! 🌟</button>
        </div>
      </div>}
    </main>
  )
}
