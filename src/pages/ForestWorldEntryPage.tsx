import { useEffect, useState } from 'react'

const shell: React.CSSProperties = {
  position: 'fixed', inset: 0, width: '100vw', height: '100dvh', overflow: 'hidden', zIndex: 2147483000,
  background: 'linear-gradient(180deg,#64d8ef 0%,#c9f1d5 54%,#70bd68 100%)', color: '#234b32',
  fontFamily: 'system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
}

export function ForestWorldEntryPage() {
  const [talking, setTalking] = useState(false)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setTalking(true), 900)
    return () => window.clearTimeout(timer)
  }, [])

  if (entered) return <NatureMap onBack={() => setEntered(false)} />

  return (
    <main style={shell} aria-label="Doğa Dünyası giriş">
      <div style={{position:'absolute',inset:0,background:'radial-gradient(circle at 82% 15%,#ffd75c 0 42px,transparent 44px),radial-gradient(ellipse at 8% 66%,#68ad69 0 18%,transparent 18.5%),radial-gradient(ellipse at 94% 63%,#68ad69 0 22%,transparent 22.5%)'}} />
      <div style={{position:'absolute',left:'7%',top:'10%',width:150,height:42,borderRadius:40,background:'rgba(255,255,255,.75)'}} />
      <div style={{position:'absolute',right:'8%',top:'23%',width:125,height:36,borderRadius:40,background:'rgba(255,255,255,.7)'}} />
      <div style={{position:'absolute',left:'-8%',right:'-8%',bottom:'-25%',height:'55%',borderRadius:'55% 55% 0 0',background:'#8fd078'}} />
      <div style={{position:'absolute',left:'4%',top:'6%',padding:'11px 17px',borderRadius:16,background:'#85502f',border:'3px solid #613a22',color:'#fff1a5',fontWeight:900,fontSize:'clamp(15px,2vw,26px)',boxShadow:'0 8px 18px rgba(45,65,40,.22)'}}>🌿 DOĞA DÜNYASI</div>
      <div style={{position:'absolute',left:'50%',bottom:'3%',transform:'translateX(-50%)',height:'70%',width:'min(42vw,520px)',display:'flex',alignItems:'flex-end',justifyContent:'center',animation:'leoFloat 3s ease-in-out infinite'}}>
        <img src="/illustrations/forest/leo-lion.svg" alt="Leo" style={{width:'100%',height:'100%',objectFit:'contain',filter:'drop-shadow(0 20px 12px rgba(40,75,42,.28))'}} />
      </div>
      <div style={{position:'absolute',left:'50%',top:'20%',transform:'translateX(-50%)',width:'min(620px,72vw)',display:'flex',alignItems:'center',gap:14,padding:'16px 20px',borderRadius:26,background:'rgba(255,250,237,.96)',boxShadow:'0 14px 35px rgba(45,75,42,.2)',opacity:talking?1:0,transition:'opacity .4s ease'}}>
        <img src="/illustrations/forest/leo-lion.svg" alt="" style={{width:62,height:62,objectFit:'contain',borderRadius:18,background:'#ffe8c8',flex:'0 0 auto'}} />
        <div><strong style={{fontSize:'clamp(17px,2vw,26px)',color:'#6b341d'}}>Leo</strong><div style={{fontSize:'clamp(12px,1.5vw,18px)',fontWeight:700,lineHeight:1.35,marginTop:4}}>Merhaba küçük kaşif! Burası Doğa Dünyası. Birlikte hayvanları, bitkileri ve doğanın güzel seslerini keşfedeceğiz!</div></div>
      </div>
      <button type="button" onClick={() => setEntered(true)} disabled={!talking} style={{position:'absolute',right:'4%',bottom:'6%',border:0,borderRadius:20,padding:'15px 27px',background:talking?'linear-gradient(#ffd84e,#f3a62e)':'#9b9b87',color:'#663214',fontWeight:1000,fontSize:'clamp(17px,2vw,25px)',boxShadow:talking?'0 7px 0 #c27825':'none',cursor:talking?'pointer':'default'}}>İleri →</button>
      <style>{`@keyframes leoFloat{50%{transform:translateX(-50%) translateY(-7px)}}`}</style>
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
    <div style={{position:'absolute',left:'50%',top:'18%',transform:'translateX(-50%)',width:'clamp(100px,15vw,190px)',height:22,borderRadius:30,background:'rgba(88,172,96,.65)'}} />
    <div style={{position:'absolute',left:'-8%',bottom:'-20%',width:'58%',height:'52%',borderRadius:'50%',background:'#8fd078'}} />
    <div style={{position:'absolute',right:'-8%',bottom:'-20%',width:'58%',height:'52%',borderRadius:'50%',background:'#70bd6b'}} />
    <div style={{position:'absolute',left:'50%',bottom:'2%',transform:'translateX(-50%)',width:110,height:135,zIndex:3}}><img src="/illustrations/forest/leo-lion.svg" alt="Leo" style={{width:'100%',height:'100%',objectFit:'contain'}} /></div>
    <div style={{position:'absolute',left:'4%',right:'4%',top:'19%',bottom:'13%',display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'clamp(8px,2vw,25px)',alignItems:'center',zIndex:2}}>
      {islands.map(([title,icon,art])=><button key={title} style={{height:'min(34vh,250px)',border:'4px solid rgba(255,255,255,.85)',borderRadius:38,backgroundImage:`linear-gradient(rgba(20,70,38,.05),rgba(20,70,38,.62)),url(${art})`,backgroundSize:'cover',backgroundPosition:'center',color:'#fff',textShadow:'0 2px 6px #173a24',fontWeight:1000,fontSize:'clamp(18px,2.5vw,32px)',boxShadow:'0 15px 30px rgba(38,76,40,.24)'}}>{icon}<br/>{title}<small style={{display:'block',fontSize:12,marginTop:7}}>KEŞFET →</small></button>)}
    </div>
    <div style={{position:'absolute',left:'50%',bottom:'3%',transform:'translateX(-50%)',background:'rgba(255,252,239,.94)',borderRadius:999,padding:'9px 16px',fontWeight:900,fontSize:12,zIndex:5}}>Leo ile bir adaya dokun ve keşfe başla! 🐾</div>
  </main>
}
