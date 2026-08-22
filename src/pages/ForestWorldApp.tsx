import { useState } from 'react'

type CSS = React.CSSProperties
const BG = 'data:image/webp;base64,REPLACED_BG'
const LEO = 'data:image/webp;base64,REPLACED_LEO'

const scene: CSS = { position:'fixed', inset:0, width:'100vw', height:'100dvh', overflow:'hidden', backgroundImage:`url(${BG})`, backgroundSize:'cover', backgroundPosition:'center', color:'#3b2a20', fontFamily:'system-ui,sans-serif', zIndex:99999 }
const keyframes = `
@keyframes leoIn{0%{opacity:0;transform:translate(-50%,35px) scale(.94)}100%{opacity:1;transform:translate(-50%,0) scale(1)}}
@keyframes breathe{0%,100%{transform:translate(-50%,0) scale(1)}50%{transform:translate(-50%,-5px) scale(1.012)}}
@keyframes cloud{50%{transform:translateX(18px)}}
@media(max-width:700px){
 .forest-title{left:4%!important;top:4%!important;font-size:17px!important;padding:9px 14px!important}
 .forest-intro-card{left:4%!important;top:14%!important;width:92vw!important;max-width:none!important;padding:15px 18px!important}
 .forest-intro-card h2{font-size:20px!important}
 .forest-intro-card p{font-size:15px!important;line-height:1.35!important}
 .forest-leo{width:210px!important;height:285px!important;bottom:16%!important}
 .forest-start{right:5%!important;bottom:4%!important;width:58vw!important;font-size:17px!important;padding:14px 15px!important}
}
`
export function ForestWorldApp(){
 const [intro,setIntro]=useState(true)
 return <main style={scene} aria-label="Doğa Dünyası"><style>{keyframes}</style>
   <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(255,255,255,.04),rgba(33,87,35,.16))'}} />
   <div className="forest-title" style={{position:'absolute',left:'4%',top:'5%',padding:'11px 18px',borderRadius:18,background:'linear-gradient(#9c5e31,#673a20)',border:'4px solid #54301c',color:'#fff0a2',fontSize:'clamp(16px,2vw,28px)',fontWeight:900,boxShadow:'0 7px 18px rgba(45,30,15,.25)',zIndex:8}}>🌿 DOĞA DÜNYASI</div>
   <div style={{position:'absolute',left:'8%',top:'18%',width:'17vw',minWidth:90,height:30,borderRadius:30,background:'rgba(255,255,255,.58)',animation:'cloud 10s ease-in-out infinite'}} />
   <div style={{position:'absolute',right:'11%',top:'30%',width:'13vw',minWidth:80,height:26,borderRadius:30,background:'rgba(255,255,255,.5)',animation:'cloud 12s ease-in-out infinite reverse'}} />
   {intro ? <>
    <div className="forest-leo" style={{position:'absolute',left:'50%',bottom:'7%',width:'min(34vw,430px)',height:'min(68vh,540px)',transform:'translateX(-50%)',zIndex:3,animation:'leoIn 1s ease-out both, breathe 4s ease-in-out 1.1s infinite'}}><img src={LEO} alt="Leo" style={{width:'100%',height:'100%',objectFit:'contain',filter:'drop-shadow(0 18px 10px rgba(45,55,25,.3))'}} /></div>
    <section className="forest-intro-card" style={{position:'absolute',left:'5%',top:'23%',width:'min(42vw,520px)',padding:'20px 24px',borderRadius:28,background:'rgba(255,249,234,.94)',border:'3px solid rgba(255,255,255,.9)',boxShadow:'0 16px 35px rgba(55,45,25,.22)',zIndex:6}}><h2 style={{margin:0,color:'#63331d',fontSize:'clamp(19px,2.2vw,30px)',fontWeight:900}}>Merhaba küçük kaşif! 🦁</h2><p style={{margin:'9px 0 0',fontSize:'clamp(14px,1.45vw,20px)',lineHeight:1.45,fontWeight:700}}>Ben Leo. Burası Doğa Dünyası. Birlikte hayvanları, bitkileri ve doğanın güzel seslerini keşfedeceğiz!</p></section>
    <button className="forest-start" type="button" onClick={()=>setIntro(false)} style={{position:'absolute',right:'5%',bottom:'7%',border:0,borderRadius:22,padding:'16px 28px',background:'linear-gradient(#ffd952,#f1a62f)',color:'#713313',fontSize:'clamp(17px,2vw,27px)',fontWeight:900,boxShadow:'0 8px 0 #c17a24,0 15px 28px rgba(70,45,15,.25)',zIndex:8,cursor:'pointer'}}>Maceraya Başla! →</button>
   </> : <div style={{position:'absolute',inset:0,zIndex:5,background:'rgba(244,249,231,.12)'}}><div style={{position:'absolute',left:'50%',top:'15%',transform:'translateX(-50%)',textAlign:'center',color:'#285738'}}><strong style={{fontSize:'clamp(22px,3vw,40px)'}}>Keşif Haritası</strong><div>Bir adaya dokun ve keşfet!</div></div><div style={{position:'absolute',left:'7%',right:'7%',top:'34%',bottom:'12%',display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'clamp(12px,3vw,35px)',alignItems:'center'}}>{[['🦊','Hayvanlar'],['🌿','Doğa'],['🔊','Sesler']].map(([icon,title])=><button key={title} type="button" style={{height:'min(30vh,240px)',border:0,borderRadius:32,background:'rgba(255,255,255,.88)',boxShadow:'0 15px 30px rgba(43,75,45,.2)',fontSize:'clamp(18px,2.4vw,32px)',fontWeight:900,color:'#285b3a'}}><div style={{fontSize:'clamp(40px,6vw,76px)'}}>{icon}</div>{title}<div style={{fontSize:14,marginTop:7}}>Keşfet →</div></button>)}</div><button type="button" onClick={()=>setIntro(true)} style={{position:'absolute',left:'4%',bottom:'5%',border:0,borderRadius:15,padding:'10px 15px',fontWeight:900}}>← Leo'ya dön</button></div>}
 </main>
}
