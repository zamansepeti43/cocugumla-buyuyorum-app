import { useEffect, useState } from 'react'

const shell: React.CSSProperties = {
  position: 'fixed', inset: 0, width: '100vw', height: '100dvh', overflow: 'hidden', zIndex: 2147483000,
  background: '#8ed7c2', color: '#214d3a',
  fontFamily: 'system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
}

const leo = '/illustrations/forest/leo-quality.webp'
const forest = '/illustrations/forest/file_0000000048b481f488920a1edaf0608f.png'

type Island = { title: string; icon: string; art: string; text: string }

const islands: Island[] = [
  { title: 'Hayvanlar', icon: '🦊', art: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=900&q=88', text: 'Ormandaki sevimli hayvanlarla tanış.' },
  { title: 'Doğa', icon: '🌿', art: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=88', text: 'Ağaçları, çiçekleri ve doğayı keşfet.' },
  { title: 'Sesler', icon: '🔊', art: 'https://images.unsplash.com/photo-1473445361085-b9a07f55608b?auto=format&fit=crop&w=900&q=88', text: 'Kuşları, yağmuru ve ormanın seslerini dinle.' },
]

export function ForestWorldEntryPage() {
  const [talking, setTalking] = useState(false)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setTalking(true), 650)
    return () => window.clearTimeout(timer)
  }, [])

  if (entered) return <NatureMap onBack={() => setEntered(false)} />

  return (
    <main style={shell} aria-label="Doğa Dünyası giriş">
      <img src={forest} alt="Doğa Dünyası ormanı" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',objectPosition:'center',zIndex:0}} />
      <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(25,91,69,.04),rgba(24,69,49,.16))',zIndex:1}} />
      <div style={{position:'absolute',left:'4%',top:'5%',padding:'10px 17px',borderRadius:18,background:'rgba(102,62,32,.94)',border:'3px solid rgba(73,43,22,.95)',color:'#fff2a8',fontWeight:1000,fontSize:'clamp(15px,2vw,26px)',boxShadow:'0 7px 16px rgba(20,50,35,.22)',zIndex:4}}>🌿 DOĞA DÜNYASI</div>
      <div style={{position:'absolute',left:'50%',bottom:'1%',transform:'translateX(-50%)',height:'67%',width:'min(40vw,500px)',display:'flex',alignItems:'flex-end',justifyContent:'center',zIndex:3,animation:'leoFloat 3.2s ease-in-out infinite'}}>
        <img src={leo} alt="Leo" style={{width:'100%',height:'100%',objectFit:'contain',filter:'drop-shadow(0 18px 13px rgba(25,64,43,.28))'}} />
      </div>
      <div style={{position:'absolute',left:'50%',top:'8%',transform:'translateX(-50%)',width:'min(650px,78vw)',display:'flex',alignItems:'center',gap:14,padding:'15px 19px',borderRadius:25,background:'rgba(255,251,238,.96)',boxShadow:'0 12px 30px rgba(32,72,52,.22)',opacity:talking?1:0,transition:'opacity .4s ease',zIndex:5}}>
        <img src={leo} alt="" style={{width:66,height:66,objectFit:'contain',flex:'0 0 auto'}} />
        <div><strong style={{fontSize:'clamp(17px,2vw,26px)',color:'#67371f'}}>Leo</strong><div style={{fontSize:'clamp(12px,1.5vw,18px)',fontWeight:750,lineHeight:1.35,marginTop:3}}>Merhaba küçük kaşif! Burası Doğa Dünyası. Hayvanları, bitkileri ve doğanın güzel seslerini birlikte keşfedelim!</div></div>
      </div>
      <button type="button" onClick={() => setEntered(true)} disabled={!talking} style={{position:'absolute',right:'4%',bottom:'5%',border:0,borderRadius:20,padding:'15px 27px',background:talking?'linear-gradient(#ffd94f,#f2a72f)':'#8e9a8e',color:'#603214',fontWeight:1000,fontSize:'clamp(17px,2vw,25px)',boxShadow:talking?'0 7px 0 #bf7726':'none',cursor:talking?'pointer':'default',zIndex:6}}>İleri →</button>
      <style>{`@keyframes leoFloat{50%{transform:translateX(-50%) translateY(-8px)}}`}</style>
    </main>
  )
}

function NatureMap({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState<Island | null>(null)

  return <main style={{...shell,background:'linear-gradient(180deg,#69d8ec 0%,#54c7e3 48%,#38b6d5 100%)'}} aria-label="Doğa Dünyası haritası">
    <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 20% 18%,rgba(255,255,255,.45) 0 3%,transparent 3.5%),radial-gradient(ellipse at 78% 26%,rgba(255,255,255,.32) 0 4%,transparent 4.5%),repeating-linear-gradient(175deg,transparent 0 34px,rgba(255,255,255,.09) 35px 37px)',zIndex:0}} />
    <header style={{position:'absolute',left:0,right:0,top:0,height:74,display:'grid',gridTemplateColumns:'auto 1fr auto',alignItems:'center',padding:'0 3%',zIndex:8}}>
      <button onClick={onBack} style={{border:0,borderRadius:14,padding:'9px 13px',background:'rgba(255,255,255,.9)',fontWeight:900,cursor:'pointer'}}>← Geri</button>
      <div style={{textAlign:'center',color:'#174e63'}}><div style={{fontSize:12,fontWeight:1000,letterSpacing:2}}>🌿 DOĞA DÜNYASI</div><strong style={{fontSize:'clamp(18px,2.4vw,30px)'}}>Keşfetmeye hazır mısın?</strong></div>
      <div style={{padding:'8px 13px',borderRadius:999,background:'#fff1ae',fontWeight:1000}}>⭐ 0</div>
    </header>

    <div style={{position:'absolute',left:'50%',top:'12%',transform:'translateX(-50%)',padding:'8px 16px',borderRadius:999,background:'rgba(255,255,255,.82)',color:'#235b67',fontWeight:900,fontSize:'clamp(12px,1.4vw,16px)',zIndex:5}}>🌊 Büyük mavi denizde üç keşif adası</div>

    <div style={{position:'absolute',left:'5%',right:'5%',top:'20%',bottom:'15%',display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:'clamp(12px,3vw,32px)',alignItems:'center',zIndex:3}}>
      {islands.map((island,index)=><button key={island.title} type="button" onClick={() => setSelected(island)} style={{position:'relative',height:'min(38vh,290px)',border:0,borderRadius:index===1?'46% 54% 48% 52%':'52% 48% 54% 46%',padding:0,overflow:'hidden',background:'#76bf69',boxShadow:'0 16px 30px rgba(24,91,109,.25),inset 0 0 0 5px rgba(255,255,255,.78)',cursor:'pointer',transform:`rotate(${index===0?-2:index===2:1}deg)`}}>
        <img src={island.art} alt="" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}} />
        <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(22,72,55,.02) 35%,rgba(17,63,47,.72) 100%)'}} />
        <div style={{position:'absolute',left:'8%',right:'8%',bottom:'10%',color:'#fff',textAlign:'left',textShadow:'0 2px 7px rgba(0,0,0,.5)'}}><div style={{fontSize:'clamp(28px,4vw,48px)'}}>{island.icon}</div><strong style={{fontSize:'clamp(20px,2.8vw,34px)',fontWeight:1000}}>{island.title}</strong><small style={{display:'block',fontSize:12,fontWeight:900,marginTop:4}}>KEŞFET →</small></div>
      </button>)}
    </div>

    <div style={{position:'absolute',left:'50%',bottom:'3%',transform:'translateX(-50%)',background:'rgba(255,252,239,.94)',borderRadius:999,padding:'9px 16px',fontWeight:900,fontSize:12,zIndex:6}}>Leo ile bir adaya dokun ve keşfe başla! 🐾</div>

    {selected && <div role="dialog" aria-modal="true" style={{position:'absolute',inset:0,display:'grid',placeItems:'center',background:'rgba(18,68,82,.28)',backdropFilter:'blur(4px)',zIndex:10,padding:20}} onClick={() => setSelected(null)}>
      <div onClick={event => event.stopPropagation()} style={{width:'min(440px,92vw)',borderRadius:28,background:'#fffaf0',padding:24,boxShadow:'0 25px 70px rgba(12,59,74,.35)',textAlign:'center'}}>
        <div style={{fontSize:52}}>{selected.icon}</div><h2 style={{margin:'8px 0',color:'#315c45'}}>{selected.title}</h2><p style={{margin:'0 0 18px',fontWeight:700,color:'#476557'}}>{selected.text}</p>
        <button type="button" onClick={() => setSelected(null)} style={{border:0,borderRadius:16,padding:'12px 22px',background:'linear-gradient(#ffd94f,#f2a72f)',color:'#603214',fontWeight:1000,cursor:'pointer'}}>Başlayalım! 🌟</button>
      </div>
    </div>}
  </main>
}
