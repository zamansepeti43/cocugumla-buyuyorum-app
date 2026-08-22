import { useState } from 'react'

type CSS = React.CSSProperties
const scene: CSS = { position:'fixed', inset:0, width:'100vw', height:'100dvh', overflow:'hidden', background:'linear-gradient(180deg,#79dff2 0%,#d9f5dc 54%,#79c96d 100%)', color:'#284c35', fontFamily:'system-ui,sans-serif', zIndex:99999 }

export function ForestWorldApp() {
  const [intro, setIntro] = useState(true)
  return <main style={scene} aria-label="Doğa Dünyası">
    <div style={{position:'absolute',inset:0,overflow:'hidden'}}>
      <div style={{position:'absolute',right:'10%',top:'7%',width:'clamp(58px,9vw,105px)',height:'clamp(58px,9vw,105px)',borderRadius:'50%',background:'#ffd45b',boxShadow:'0 0 0 18px rgba(255,212,91,.18)'}} />
      <div style={{position:'absolute',left:'7%',top:'13%',width:'18vw',height:'5vh',minWidth:100,minHeight:24,borderRadius:50,background:'rgba(255,255,255,.78)'}} />
      <div style={{position:'absolute',right:'8%',top:'25%',width:'15vw',height:'4vh',minWidth:90,minHeight:20,borderRadius:50,background:'rgba(255,255,255,.72)'}} />
      <div style={{position:'absolute',left:'-10%',bottom:'-16%',width:'62%',height:'58%',borderRadius:'50%',background:'#91d47b'}} />
      <div style={{position:'absolute',right:'-10%',bottom:'-18%',width:'64%',height:'60%',borderRadius:'50%',background:'#6fbc68'}} />
      <div style={{position:'absolute',left:0,right:0,bottom:0,height:'22%',background:'linear-gradient(180deg,transparent,#62ad60)'}} />
      <div style={{position:'absolute',left:'4%',top:'7%',padding:'12px 20px',borderRadius:18,background:'#8b542f',border:'4px solid #653b22',color:'#fff0a2',fontSize:'clamp(15px,2.1vw,28px)',fontWeight:900}}>🌿 DOĞA DÜNYASI</div>
      {intro ? <>
        <div style={{position:'absolute',left:'50%',bottom:'8%',transform:'translateX(-50%)',width:'min(34vw,420px)',height:'min(64vh,500px)'}}><img src="/illustrations/forest/leo-lion.svg" alt="Leo" style={{width:'100%',height:'100%',objectFit:'contain',filter:'drop-shadow(0 18px 10px rgba(42,75,40,.28))'}} /></div>
        <section style={{position:'absolute',left:'5%',top:'25%',width:'min(42vw,540px)',padding:'22px 26px',borderRadius:28,background:'rgba(255,250,237,.95)',boxShadow:'0 18px 40px rgba(40,70,40,.2)',border:'3px solid rgba(255,255,255,.85)'}}><div style={{fontSize:'clamp(18px,2.2vw,30px)',fontWeight:900,color:'#6a341c'}}>Merhaba küçük kaşif! 🦁</div><p style={{fontSize:'clamp(14px,1.5vw,20px)',lineHeight:1.45,fontWeight:700,margin:'8px 0 0'}}>Ben Leo. Burası Doğa Dünyası. Birlikte hayvanları, bitkileri ve doğanın güzel seslerini keşfedeceğiz!</p></section>
        <button type="button" onClick={()=>setIntro(false)} style={{position:'absolute',right:'5%',bottom:'8%',border:0,borderRadius:22,padding:'16px 28px',background:'linear-gradient(#ffd951,#f2a52f)',color:'#713313',fontSize:'clamp(17px,2vw,26px)',fontWeight:900,boxShadow:'0 8px 0 #c37a25'}}>Maceraya Başla! →</button>
      </> : <>
        <div style={{position:'absolute',left:'50%',top:'16%',transform:'translateX(-50%)',textAlign:'center'}}><div style={{fontSize:'clamp(20px,3vw,40px)',fontWeight:900,color:'#245b38'}}>Keşif Haritası</div><div style={{fontSize:'clamp(12px,1.4vw,18px)',fontWeight:700}}>Bir adaya dokun ve keşfet!</div></div>
        <div style={{position:'absolute',left:'7%',right:'7%',top:'34%',bottom:'12%',display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'clamp(12px,3vw,35px)',alignItems:'center'}}>{[['🦊','Hayvanlar'],['🌿','Doğa'],['🔊','Sesler']].map(([icon,title])=><button key={title} type="button" style={{height:'min(32vh,250px)',border:0,borderRadius:38,background:'rgba(255,255,255,.82)',boxShadow:'0 18px 35px rgba(43,85,50,.2)',fontSize:'clamp(18px,2.5vw,34px)',fontWeight:900,color:'#285b3a'}}><div style={{fontSize:'clamp(40px,6vw,80px)'}}>{icon}</div>{title}<div style={{fontSize:'clamp(11px,1.2vw,16px)',marginTop:7}}>Keşfet →</div></button>)}</div>
        <button type="button" onClick={()=>setIntro(true)} style={{position:'absolute',left:'4%',bottom:'5%',border:0,borderRadius:16,padding:'10px 16px',background:'rgba(255,255,255,.85)',color:'#3c6448',fontWeight:900}}>← Leo'ya dön</button>
      </>}
    </div>
  </main>
}
