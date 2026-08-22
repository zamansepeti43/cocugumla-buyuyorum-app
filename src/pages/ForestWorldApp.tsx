import { useState } from 'react'

const BG = '/illustrations/forest/file_0000000048b481f488920a1edaf0608f.png'
const LEO = '/illustrations/forest/leo-quality.webp'

export function ForestWorldApp() {
  const [intro, setIntro] = useState(true)

  return (
    <main className="forest-app" aria-label="Doğa Dünyası">
      <style>{`
        .forest-app{position:fixed;inset:0;width:100vw;height:100dvh;overflow:hidden;background:#62c6d7;font-family:system-ui,sans-serif;z-index:99999}
        .forest-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;z-index:0}
        .forest-overlay{position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(180deg,rgba(255,255,255,.04),transparent 42%,rgba(23,68,35,.08))}
        .forest-title{position:absolute;left:4%;top:5%;z-index:10;padding:12px 22px;border-radius:18px;background:linear-gradient(#a86638,#704020);border:4px solid #58321f;color:#fff0a2;font-size:clamp(18px,2.2vw,30px);font-weight:900;box-shadow:0 8px 20px rgba(40,30,20,.25)}
        .forest-leo-wrap{position:absolute;left:50%;bottom:3%;z-index:6;width:min(30vw,430px);height:min(72vh,560px);transform:translateX(-50%);display:flex;align-items:flex-end;justify-content:center;animation:leoEnter .9s cubic-bezier(.2,.8,.2,1) both}
        .forest-leo{width:100%;height:100%;object-fit:contain;object-position:center bottom;filter:drop-shadow(0 20px 14px rgba(31,67,31,.3));animation:leoBreathe 3.8s ease-in-out 1s infinite}
        .leo-sparkle{position:absolute;right:4%;top:26%;font-size:clamp(18px,2vw,28px);opacity:0;animation:sparkle 2.8s ease-in-out 1.2s infinite;pointer-events:none}
        .forest-speech{position:absolute;left:5%;top:22%;z-index:8;width:min(42vw,560px);padding:22px 26px;border-radius:28px;background:rgba(255,250,239,.96);border:3px solid rgba(255,255,255,.95);box-shadow:0 18px 40px rgba(48,49,27,.2);color:#3f2d22}
        .forest-speech h2{margin:0;color:#63331d;font-size:clamp(20px,2.4vw,32px);font-weight:900}
        .forest-speech p{margin:10px 0 0;font-size:clamp(15px,1.55vw,21px);line-height:1.45;font-weight:700}
        .forest-start{position:absolute;right:5%;bottom:8%;z-index:9;border:0;border-radius:22px;padding:17px 30px;background:linear-gradient(#ffd952,#f1a62f);color:#713313;font-size:clamp(18px,2.1vw,28px);font-weight:900;box-shadow:0 9px 0 #c17a24,0 16px 30px rgba(80,54,19,.2);cursor:pointer;transition:transform .15s ease,filter .15s ease}
        .forest-start:hover{filter:brightness(1.04);transform:translateY(-2px)}
        .forest-start:active{transform:translateY(5px)}
        .forest-map{position:absolute;inset:0;z-index:12;display:grid;place-items:center;background:rgba(14,54,35,.12)}
        .forest-map-card{padding:28px 34px;border-radius:28px;background:rgba(255,250,239,.96);text-align:center;box-shadow:0 20px 55px rgba(28,62,35,.25)}
        .forest-next{border:0;border-radius:18px;padding:13px 20px;background:#ffd24e;color:#713313;font-weight:900;cursor:pointer}
        @keyframes leoEnter{0%{opacity:0;transform:translate(-50%,70px) scale(.96)}65%{opacity:1;transform:translate(-50%,-5px) scale(1.015)}100%{opacity:1;transform:translate(-50%,0) scale(1)}}
        @keyframes leoBreathe{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-5px) scale(1.008)}}
        @keyframes sparkle{0%,70%,100%{opacity:0;transform:scale(.7) rotate(-8deg)}80%{opacity:1;transform:scale(1.1) rotate(8deg)}90%{opacity:.5;transform:scale(.9) rotate(-2deg)}}
        @media(max-width:700px){
          .forest-title{left:3%;top:4%;font-size:17px;padding:9px 14px;border-width:3px}
          .forest-speech{left:4%;top:15%;width:calc(100% - 8%);padding:15px 17px;border-radius:22px}
          .forest-speech h2{font-size:20px}.forest-speech p{font-size:14px;margin-top:7px}
          .forest-leo-wrap{width:58vw;height:56vh;bottom:11%}
          .forest-start{right:4%;bottom:4%;font-size:16px;padding:13px 20px;border-radius:18px}
          .leo-sparkle{right:2%;top:25%}
        }
      `}</style>

      <img className="forest-bg" src={BG} alt="Doğa Dünyası orman arka planı" />
      <div className="forest-overlay" />
      <div className="forest-title">🌿 DOĞA DÜNYASI</div>

      {intro ? (
        <>
          <section className="forest-speech">
            <h2>Merhaba küçük kaşif! 🦁</h2>
            <p>Ben Leo. Burası Doğa Dünyası. Birlikte hayvanları, bitkileri ve doğanın güzel seslerini keşfedeceğiz!</p>
          </section>

          <div className="forest-leo-wrap" aria-label="Leo">
            <img className="forest-leo" src={LEO} alt="Leo, orman kaşifi" />
            <span className="leo-sparkle" aria-hidden="true">✨</span>
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
            <button className="forest-next" type="button" onClick={() => setIntro(true)}>← Leo'ya dön</button>
          </div>
        </div>
      )}
    </main>
  )
}
