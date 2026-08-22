import { useState } from 'react'

const BG = '/illustrations/forest/file_0000000048b481f488920a1edaf0608f.png'
const LEO = '/illustrations/forest/leo-quality.webp'

export function ForestWorldApp() {
  const [intro, setIntro] = useState(true)

  return (
    <main className="forest-app" aria-label="Doğa Dünyası">
      <style>{`
        .forest-app{position:fixed;inset:0;width:100vw;height:100dvh;overflow:hidden;background:#0d3d25;font-family:system-ui,sans-serif;z-index:99999}
        .forest-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;z-index:0}
        .forest-shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(17,62,38,.06),transparent 45%,rgba(17,62,38,.04));z-index:1;pointer-events:none}
        .forest-title{position:absolute;left:4%;top:5%;z-index:10;padding:12px 22px;border-radius:18px;background:linear-gradient(#9c5e31,#673a20);border:4px solid #54301c;color:#fff0a2;font-size:clamp(18px,2.2vw,30px);font-weight:900;box-shadow:0 8px 20px rgba(40,30,20,.25)}
        .forest-leo-wrap{position:absolute;left:50%;bottom:2%;z-index:6;width:min(34vw,470px);height:min(82vh,610px);transform:translateX(-50%);display:flex;align-items:flex-end;justify-content:center;animation:leoIn .7s ease-out both,leoFloat 4s ease-in-out .7s infinite}
        .forest-leo{width:100%;height:100%;object-fit:contain;object-position:center bottom;filter:drop-shadow(0 22px 16px rgba(24,50,25,.35))}
        .forest-speech{position:absolute;left:5%;top:22%;z-index:8;width:min(42vw,560px);padding:22px 26px;border-radius:28px;background:rgba(255,250,239,.96);border:3px solid rgba(255,255,255,.95);box-shadow:0 18px 40px rgba(48,49,27,.2);color:#3f2d22}
        .forest-speech h2{margin:0;color:#63331d;font-size:clamp(20px,2.4vw,32px);font-weight:900}
        .forest-speech p{margin:10px 0 0;font-size:clamp(15px,1.55vw,21px);line-height:1.45;font-weight:700}
        .forest-start{position:absolute;right:5%;bottom:8%;z-index:9;border:0;border-radius:22px;padding:17px 30px;background:linear-gradient(#ffd952,#f1a62f);color:#713313;font-size:clamp(18px,2.1vw,28px);font-weight:900;box-shadow:0 9px 0 #c17a24,0 16px 30px rgba(80,54,19,.2);cursor:pointer}
        .forest-map{position:absolute;inset:0;z-index:12;display:grid;place-items:center;background:rgba(14,54,35,.12)}
        .forest-map-card{padding:28px 34px;border-radius:28px;background:rgba(255,250,239,.96);text-align:center;box-shadow:0 20px 55px rgba(28,62,35,.25)}
        @keyframes leoIn{from{opacity:0;transform:translate(-50%,35px) scale(.94)}to{opacity:1;transform:translate(-50%,0) scale(1)}}
        @keyframes leoFloat{0%,100%{transform:translate(-50%,0)}50%{transform:translate(-50%,-8px)}}
        @media(max-width:700px){
          .forest-title{left:3%;top:4%;font-size:17px;padding:9px 14px;border-width:3px}
          .forest-speech{left:4%;top:17%;width:calc(100% - 8%);padding:15px 17px;border-radius:22px}
          .forest-speech h2{font-size:20px}.forest-speech p{font-size:14px;margin-top:7px}
          .forest-leo-wrap{width:58vw;height:58vh;bottom:9%}
          .forest-start{right:4%;bottom:4%;font-size:16px;padding:13px 20px;border-radius:18px}
        }
      `}</style>

      <img className="forest-bg" src={BG} alt="Doğa Dünyası orman arka planı" />
      <div className="forest-shade" />
      <div className="forest-title">🌿 DOĞA DÜNYASI</div>

      {intro ? (
        <>
          <section className="forest-speech">
            <h2>Merhaba küçük kaşif! 🦁</h2>
            <p>Ben Leo. Burası Doğa Dünyası. Birlikte hayvanları, bitkileri ve doğanın güzel seslerini keşfedeceğiz!</p>
          </section>

          <div className="forest-leo-wrap">
            <img className="forest-leo" src={LEO} alt="Leo, orman kaşifi" />
          </div>

          <button className="forest-start" type="button" onClick={() => setIntro(false)}>
            Maceraya Başla! →
          </button>
        </>
      ) : (
        <div className="forest-map">
          <div className="forest-map-card">
            <div style={{fontSize:48}}>🌳🦁</div>
            <h1 style={{margin:'8px 0',color:'#63331d'}}>Keşif Haritası</h1>
            <p style={{margin:'0 0 18px'}}>Bir dünyaya dokun ve keşfet!</p>
            <button className="forest-start" style={{position:'static'}} onClick={() => setIntro(true)}>← Leo'ya dön</button>
          </div>
        </div>
      )}
    </main>
  )
}
