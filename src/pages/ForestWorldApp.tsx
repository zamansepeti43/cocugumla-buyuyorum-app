import { useState } from 'react'

type CSS = React.CSSProperties

const scene: CSS = {
  position: 'fixed',
  inset: 0,
  width: '100vw',
  height: '100dvh',
  overflow: 'hidden',
  background: 'linear-gradient(180deg,#54cbe5 0%,#9cddd0 47%,#78bf70 100%)',
  color: '#3b2a20',
  fontFamily: 'system-ui,sans-serif',
  zIndex: 99999,
}

const keyframes = `
@keyframes leoEnter{0%{opacity:0;transform:translate(-50%,35px) scale(.92)}100%{opacity:1;transform:translate(-50%,0) scale(1)}}
@keyframes leoFloat{0%,100%{transform:translate(-50%,0) rotate(-.4deg)}50%{transform:translate(-50%,-8px) rotate(.4deg)}}
@keyframes cloudMove{50%{transform:translateX(22px)}}
@keyframes leafFloat{0%,100%{transform:translate(0,0) rotate(0)}50%{transform:translate(10px,8px) rotate(10deg)}}
@keyframes waterShine{50%{opacity:.75;transform:translateX(12px)}}
@keyframes sunPulse{50%{transform:scale(1.06)}}
@media(max-width:700px){
 .forest-title{left:4%!important;top:4%!important;font-size:17px!important}
 .forest-intro-card{left:4%!important;top:13%!important;width:92vw!important;padding:15px 18px!important}
 .forest-intro-card h2{font-size:20px!important}
 .forest-intro-card p{font-size:15px!important}
 .forest-leo{width:270px!important;height:330px!important;bottom:12%!important}
 .forest-start{right:5%!important;bottom:4%!important;width:58vw!important;font-size:17px!important}
 .forest-tree-left{width:150px!important;height:290px!important}
 .forest-tree-right{width:135px!important;height:270px!important}
}
`

export function ForestWorldApp(){
  const [intro,setIntro] = useState(true)

  return (
    <main style={scene} aria-label="Doğa Dünyası">
      <style>{keyframes}</style>

      {/* SKY / SOFT LIGHT */}
      <div style={{position:'absolute',inset:0,background:'radial-gradient(circle at 50% 9%,rgba(255,255,255,.38),transparent 34%),linear-gradient(180deg,rgba(255,255,255,.08),transparent 55%)'}} />

      {/* DISTANT FOREST */}
      <div style={{position:'absolute',left:'-8%',right:'-8%',bottom:'25%',height:'34%',background:'#69ad75',clipPath:'polygon(0 66%,8% 45%,16% 60%,25% 28%,34% 56%,43% 18%,53% 58%,62% 31%,71% 60%,80% 24%,90% 55%,100% 35%,100% 100%,0 100%)',opacity:.82}} />
      <div style={{position:'absolute',left:'-8%',bottom:'-12%',width:'70%',height:'53%',borderRadius:'55% 55% 0 0',background:'linear-gradient(180deg,#9bd67a,#6eb663)'}} />
      <div style={{position:'absolute',right:'-12%',bottom:'-15%',width:'70%',height:'57%',borderRadius:'55% 55% 0 0',background:'linear-gradient(180deg,#7fc96e,#58a95c)'}} />

      {/* WATER */}
      <div style={{position:'absolute',right:'-5%',bottom:'0',width:'40%',height:'31%',background:'linear-gradient(180deg,#69d7df,#31aecb)',clipPath:'polygon(18% 0,100% 12%,100% 100%,0 100%,0 48%)',opacity:.95}} />
      <div style={{position:'absolute',right:'12%',bottom:'20%',width:'18%',height:8,borderRadius:99,background:'rgba(255,255,255,.55)',animation:'waterShine 3s ease-in-out infinite'}} />
      <div style={{position:'absolute',right:'5%',bottom:'14%',width:'12%',height:6,borderRadius:99,background:'rgba(255,255,255,.42)',animation:'waterShine 4s ease-in-out 1s infinite'}} />

      {/* SUN */}
      <div style={{position:'absolute',right:'11%',top:'7%',width:'clamp(65px,9vw,105px)',height:'clamp(65px,9vw,105px)',borderRadius:'50%',background:'#ffd55d',boxShadow:'0 0 0 18px rgba(255,213,93,.16),0 12px 30px rgba(231,173,62,.22)',animation:'sunPulse 4s ease-in-out infinite'}} />

      {/* CLOUDS */}
      <div style={{position:'absolute',left:'8%',top:'17%',width:125,height:31,borderRadius:40,background:'rgba(255,255,255,.62)',animation:'cloudMove 10s ease-in-out infinite'}} />
      <div style={{position:'absolute',left:'13%',top:'14%',width:58,height:25,borderRadius:40,background:'rgba(255,255,255,.48)'}} />
      <div style={{position:'absolute',right:'16%',top:'29%',width:110,height:28,borderRadius:40,background:'rgba(255,255,255,.54)',animation:'cloudMove 12s ease-in-out infinite reverse'}} />

      {/* FOREST TREES */}
      <div className="forest-tree-left" style={{position:'absolute',left:'-3%',bottom:'11%',width:180,height:330,borderRadius:'90px 90px 30px 30px',background:'linear-gradient(90deg,#704324,#9c5b2f)',boxShadow:'0 0 0 48px #277f49,0 -45px 0 62px #369656,0 -115px 0 40px #42a45b',opacity:.96}} />
      <div className="forest-tree-right" style={{position:'absolute',right:'-3%',bottom:'10%',width:165,height:310,borderRadius:'85px 85px 30px 30px',background:'linear-gradient(90deg,#704324,#9c5b2f)',boxShadow:'0 0 0 46px #287f49,0 -42px 0 60px #369757,0 -112px 0 38px #43a55c',opacity:.96}} />

      {/* SMALL FLOATING LEAVES */}
      <span style={{position:'absolute',left:'30%',top:'18%',width:18,height:34,borderRadius:'100% 0 100% 0',background:'#65b957',animation:'leafFloat 5s ease-in-out infinite'}} />
      <span style={{position:'absolute',left:'56%',top:'11%',width:16,height:30,borderRadius:'0 100% 0 100%',background:'#4eaa52',animation:'leafFloat 6s ease-in-out -2s infinite'}} />
      <span style={{position:'absolute',right:'25%',top:'34%',width:15,height:29,borderRadius:'100% 0 100% 0',background:'#70bf59',animation:'leafFloat 5.5s ease-in-out -3s infinite'}} />

      {/* WORLD SIGN */}
      <div className="forest-title" style={{position:'absolute',left:'4%',top:'5%',padding:'11px 18px',borderRadius:18,background:'linear-gradient(#9c5e31,#673a20)',border:'4px solid #54301c',color:'#fff0a2',fontSize:'clamp(16px,2vw,28px)',fontWeight:900,zIndex:8,boxShadow:'0 8px 20px rgba(58,43,24,.18)'}}>🌿 DOĞA DÜNYASI</div>

      {intro ? <>
        {/* LEO: foreground character, separate from the background */}
        <div className="forest-leo" style={{position:'absolute',left:'50%',bottom:'5%',width:'min(31vw,390px)',height:'min(67vh,525px)',transform:'translateX(-50%)',zIndex:5,animation:'leoEnter 1s ease-out both,leoFloat 4s ease-in-out 1.1s infinite'}}>
          <img src="/illustrations/forest/leo-quality.webp" alt="Leo" style={{width:'100%',height:'100%',objectFit:'contain',filter:'drop-shadow(0 22px 13px rgba(45,55,25,.28))'}} />
        </div>

        {/* LEO SPEECH */}
        <section className="forest-intro-card" style={{position:'absolute',left:'5%',top:'23%',width:'min(43vw,530px)',padding:'20px 24px',borderRadius:28,background:'rgba(255,249,234,.95)',border:'3px solid rgba(255,255,255,.92)',boxShadow:'0 16px 35px rgba(55,45,25,.22)',zIndex:7}}>
          <h2 style={{margin:0,color:'#63331d',fontSize:'clamp(19px,2.2vw,30px)',fontWeight:900}}>Merhaba küçük kaşif! 🦁</h2>
          <p style={{margin:'9px 0 0',fontSize:'clamp(14px,1.45vw,20px)',lineHeight:1.45,fontWeight:700}}>Ben Leo. Burası Doğa Dünyası. Birlikte hayvanları, bitkileri ve doğanın güzel seslerini keşfedeceğiz!</p>
        </section>

        {/* START BUTTON */}
        <button className="forest-start" type="button" onClick={()=>setIntro(false)} style={{position:'absolute',right:'5%',bottom:'7%',border:0,borderRadius:22,padding:'16px 28px',background:'linear-gradient(#ffd952,#f1a62f)',color:'#713313',fontSize:'clamp(17px,2vw,27px)',fontWeight:900,boxShadow:'0 8px 0 #c17a24,0 16px 30px rgba(80,54,19,.2)',zIndex:8,cursor:'pointer'}}>Maceraya Başla! →</button>
      </> : (
        <div style={{position:'absolute',inset:0,zIndex:10,display:'grid',placeItems:'center',background:'rgba(38,93,56,.12)'}}>
          <div style={{padding:'30px 34px',borderRadius:30,background:'rgba(255,255,255,.94)',textAlign:'center',boxShadow:'0 20px 50px rgba(35,67,39,.2)'}}>
            <div style={{fontSize:48}}>🌳🦁</div>
            <h1 style={{margin:'8px 0',color:'#63331d'}}>Keşif Haritası</h1>
            <p style={{margin:'0 0 18px'}}>Bir dünyaya dokun ve keşfet!</p>
            <button onClick={()=>setIntro(true)} style={{border:0,borderRadius:16,padding:'12px 20px',background:'#f4b437',color:'#63331d',fontWeight:900,cursor:'pointer'}}>← Leo'ya dön</button>
          </div>
        </div>
      )}
    </main>
  )
}
