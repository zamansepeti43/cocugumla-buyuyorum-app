import { useEffect, useState } from 'react'

const shell: React.CSSProperties = {
  position: 'fixed', inset: 0, width: '100vw', height: '100dvh', overflow: 'hidden', zIndex: 2147483000,
  background: '#8ed7c2', color: '#214d3a',
  fontFamily: 'system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
}

const leo = '/illustrations/forest/leo-quality.webp'
const forest = '/illustrations/forest/file_0000000048b481f488920a1edaf0608f.png'

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
  const islands = [
    ['Hayvanlar','🦊','https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=900&q=88'],
    ['Doğa','🌿','https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=88'],
    ['Sesler','🔊','https://images.unsplash.com/photo-1473445361085-b9a07f55608b?auto=format&fit=crop&w=900&q=88'],
  ]
  return <main style={shell} aria-label="Doğa Dünyası haritası">
    <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,#69d7ec 0%,#d1f1d7 55%,#78c66e 100%)'}} />
    <header style={{position:'absolute',left:0,right:0,top:0,height:74,display:'grid',gridTemplateColumns:'auto 1fr auto',alignItems:'center',padding:'0 3%',zIndex:4}}>
      <button onClick={onBack} style={{border:0,borderRadius:14,padding:'9px 13px',background:'rgba(255,255,255,.85)',fontWeight:900}}>← Geri</button>
      <div style={{textAlign:'center'}}><div style={{fontSize:12,fontWeight:1000,letterSpacing:2}}>🌿 DOĞA DÜNYASI</div><strong style={{fontSize:'clamp(18px,2.4vw,30px)'}}>Keşfetmeye hazır mısın?</strong></div>
      <div style={{padding:'8px 13px',borderRadius:999,background:'#fff1ae',fontWeight:1000}}>⭐ 0</div>
    </header>
    <div style={{position:'absolute',left:'-8%',bottom:'-20%',width:'58%',height:'52%',borderRadius:'50%',background:'#8fd078'}} />
    <div style={{position:'absolute',right:'-8%',bottom:'-20%',width:'58%',height:'52%',borderRadius:'50%',background:'#70bd6b'}} />
    <div style={{position:'absolute',left:'50%',bottom:'2%',transform:'translateX(-50%)',width:110,height:135,zIndex:3}}><img src={leo} alt="Leo" style={{width:'100%',height:'100%',objectFit:'contain'}} /></div>
    <div style={{position:'absolute',left:'4%',right:'4%',top:'19%',bottom:'13%',display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'clamp(8px,2vw,25px)',alignItems:'center',zIndex:2}}>
      {islands.map(([title,icon,art])=><button key={title} style={{height:'min(34vh,250px)',border:'4px solid rgba(255,255,255,.85)',borderRadius:38,backgroundImage:`linear-gradient(rgba(20,70,38,.05),rgba(20,70,38,.62)),url(${art})`,backgroundSize:'cover',backgroundPosition:'center',color:'#fff',textShadow:'0 2px 6px #173a24',fontWeight:1000,fontSize:'clamp(18px,2.5vw,32px)',boxShadow:'0 15px 30px rgba(38,76,40,.24)'}}>{icon}<br/>{title}<small style={{display:'block',fontSize:12,marginTop:7}}>KEŞFET →</small></button>)}
    </div>
    <div style={{position:'absolute',left:'50%',bottom:'3%',transform:'translateX(-50%)',background:'rgba(255,252,239,.94)',borderRadius:999,padding:'9px 16px',fontWeight:900,fontSize:12,zIndex:5}}>Leo ile bir adaya dokun ve keşfe başla! 🐾</div>
  </main>
}
