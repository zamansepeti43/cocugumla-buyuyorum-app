import { useState } from 'react'

type CSS = React.CSSProperties
const scene: CSS = { position:'fixed', inset:0, width:'100vw', height:'100dvh', overflow:'hidden', background:'linear-gradient(180deg,#52cbe7 0%,#bdebd4 48%,#75bf68 100%)', color:'#3b2a20', fontFamily:'system-ui,sans-serif', zIndex:99999 }
const keyframes = `@keyframes leoIn{0%{opacity:0;transform:translate(-50%,35px) scale(.94)}100%{opacity:1;transform:translate(-50%,0) scale(1)}}@keyframes breathe{0%,100%{transform:translate(-50%,0)}50%{transform:translate(-50%,-5px)}}@keyframes cloud{50%{transform:translateX(18px)}}@media(max-width:700px){.forest-title{left:4%!important;top:4%!important;font-size:17px!important}.forest-intro-card{left:4%!important;top:14%!important;width:92vw!important;padding:15px 18px!important}.forest-intro-card h2{font-size:20px!important}.forest-intro-card p{font-size:15px!important}.forest-leo{width:210px!important;height:285px!important;bottom:16%!important}.forest-start{right:5%!important;bottom:4%!important;width:58vw!important;font-size:17px!important}}`

export function ForestWorldApp(){
 const [intro,setIntro]=useState(true)
 return <main style={scene} aria-label="Doğa Dünyası"><style>{keyframes}</style>
  <div style={{position:'absolute',inset:0,background:'radial-gradient(circle at 50% 8%,rgba(255,255,255,.34),transparent 32%)'}}/>
  <div style={{position:'absolute',left:'-8%',top:'-8%',width:'36%',height:'44%',background:'#287c45',borderRadius:'0 0 55% 45%'}}/>
  <div style={{position:'absolute',right:'-8%',top:'-8%',width:'34%',height:'44%',background:'#32894a',borderRadius:'0 0 45% 55%'}}/>
  <div style={{position:'absolute',right:'10%',top:'8%',width:'clamp(60px,9vw,105px)',height:'clamp(60px,9vw,105px)',borderRadius:'50%',background:'#ffd45b',boxShadow:'0 0 0 18px rgba(255,212,91,.16)'}}/>
  <div style={{position:'absolute',left:'8%',top:'17%',width:120,height:30,borderRadius:30,background:'rgba(255,255,255,.62)',animation:'cloud 10s ease-in-out infinite'}}/>
  <div style={{position:'absolute',right:'13%',top:'29%',width:105,height:27,borderRadius:30,background:'rgba(255,255,255,.56)',animation:'cloud 12s ease-in-out infinite reverse'}}/>
  <div style={{position:'absolute',left:'-12%',bottom:'-18%',width:'65%',height:'60%',borderRadius:'50%',background:'#92d477'}}/><div style={{position:'absolute',right:'-12%',bottom:'-20%',width:'65%',height:'62%',borderRadius:'50%',background:'#72be68'}}/>
  <div className="forest-title" style={{position:'absolute',left:'4%',top:'5%',padding:'11px 18px',borderRadius:18,background:'linear-gradient(#9c5e31,#673a20)',border:'4px solid #54301c',color:'#fff0a2',fontSize:'clamp(16px,2vw,28px)',fontWeight:900,zIndex:8}}>🌿 DOĞA DÜNYASI</div>
  {intro ? <>
   <div className="forest-leo" style={{position:'absolute',left:'50%',bottom:'7%',width:'min(34vw,430px)',height:'min(68vh,540px)',transform:'translateX(-50%)',zIndex:3,animation:'leoIn 1s ease-out both,breathe 4s ease-in-out 1.1s infinite'}}><img src="/illustrations/forest/leo-quality.webp" alt="Leo" style={{width:'100%',height:'100%',objectFit:'contain',filter:'drop-shadow(0 18px 10px rgba(45,55,25,.3))'}}/></div>
   <section className="forest-intro-card" style={{position:'absolute',left:'5%',top:'23%',width:'min(42vw,520px)',padding:'20px 24px',borderRadius:28,background:'rgba(255,249,234,.94)',border:'3px solid rgba(255,255,255,.9)',boxShadow:'0 16px 35px rgba(55,45,25,.22)',zIndex:6}}><h2 style={{margin:0,color:'#63331d',fontSize:'clamp(19px,2.2vw,30px)',fontWeight:900}}>Merhaba küçük kaşif! 🦁</h2><p style={{margin:'9px 0 0',fontSize:'clamp(14px,1.45vw,20px)',lineHeight:1.45,fontWeight:700}}>Ben Leo. Burası Doğa Dünyası. Birlikte hayvanları, bitkileri ve doğanın güzel seslerini keşfedeceğiz!</p></section>
   <button className="forest-start" type="button" onClick={()=>setIntro(false)} style={{position:'absolute',right:'5%',bottom:'7%',border:0,borderRadius:22,padding:'16px 28px',background:'linear-gradient(#ffd952,#f1a62f)',color:'#713313',fontSize:'clamp(17px,2vw,27px)',fontWeight:900,boxShadow:'0 8px 0 #c17a24',zIndex:8}}>Maceraya Başla! →</button>
  </> : <div style={{position:'absolute',inset:0,zIndex:5,display:'grid',placeItems:'center'}}><div style={{padding:30,borderRadius:30,background:'rgba(255,255,255,.9)',textAlign:'center'}}><h1>Keşif Haritası</h1><p>Bir adaya dokun ve keşfet!</p><button onClick={()=>setIntro(true)}>← Leo'ya dön</button></div></div>}
 </main>
}
