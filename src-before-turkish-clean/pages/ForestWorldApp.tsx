import { useState } from 'react'

const BG = '/illustrations/forest/file_0000000048b481f488920a1edaf0608f.png'
const LEO = '/illustrations/forest/leo-quality.webp'

const sections = [
  {
    id: 'forest-animals-intro',
    title: 'Hayvanlar',
    description: 'Ormandaki hayvanları tanı.',
    icon: '🦁',
  },
  {
    id: 'forest-nature',
    title: 'Doğa',
    description: 'Ağaçları, bitkileri ve doğayı keşfet.',
    icon: '🌳',
  },
  {
    id: 'forest-environment',
    title: 'Çevre',
    description: 'Doğamızı ve çevremizi öğren.',
    icon: '🌍',
  },
  {
    id: 'forest-animal-sounds',
    title: 'Sesler',
    description: 'Hayvanların güzel seslerini keşfet.',
    icon: '🐦',
  },
]

export function ForestWorldApp() {
  const [intro, setIntro] = useState(true)

  const openSection = (id: string) => {
    window.location.href = `/worlds/forest/section/${id}`
  }

  return (
    <main className="forest-app" aria-label="Doğa Dünyası">
      <style>{`
        .forest-app{
          position:fixed;
          inset:0;
          width:100vw;
          height:100dvh;
          overflow:hidden;
          background:#62c6d7;
          font-family:system-ui,sans-serif;
          z-index:99999;
        }

        .forest-bg{
          position:absolute;
          inset:0;
          width:100%;
          height:100%;
          object-fit:cover;
          object-position:center;
          z-index:0;
        }

        .forest-overlay{
          position:absolute;
          inset:0;
          z-index:1;
          pointer-events:none;
          background:linear-gradient(
            180deg,
            rgba(255,255,255,.04),
            transparent 42%,
            rgba(23,68,35,.12)
          );
        }

        .forest-title{
          position:absolute;
          left:4%;
          top:5%;
          z-index:10;
          padding:12px 22px;
          border-radius:18px;
          background:linear-gradient(#a86638,#704020);
          border:4px solid #58321f;
          color:#fff0a2;
          font-size:clamp(18px,2.2vw,30px);
          font-weight:900;
          box-shadow:0 8px 20px rgba(40,30,20,.25);
        }

        .forest-leo-wrap{
          position:absolute;
          left:50%;
          bottom:3%;
          z-index:6;
          width:min(30vw,430px);
          height:min(72vh,560px);
          transform:translateX(-50%);
          display:flex;
          align-items:flex-end;
          justify-content:center;
          animation:leoEnter .9s cubic-bezier(.2,.8,.2,1) both;
        }

        .forest-leo{
          width:100%;
          height:100%;
          object-fit:contain;
          object-position:center bottom;
          filter:drop-shadow(0 20px 14px rgba(31,67,31,.3));
          animation:leoBreathe 3.8s ease-in-out 1s infinite;
        }

        .leo-sparkle{
          position:absolute;
          right:4%;
          top:26%;
          font-size:clamp(18px,2vw,28px);
          opacity:0;
          animation:sparkle 2.8s ease-in-out 1.2s infinite;
          pointer-events:none;
        }

        .forest-speech{
          position:absolute;
          left:5%;
          top:22%;
          z-index:8;
          width:min(42vw,560px);
          padding:22px 26px;
          border-radius:28px;
          background:rgba(255,250,239,.96);
          border:3px solid rgba(255,255,255,.95);
          box-shadow:0 18px 40px rgba(48,49,27,.2);
          color:#3f2d22;
        }

        .forest-speech h2{
          margin:0;
          color:#63331d;
          font-size:clamp(20px,2.4vw,32px);
          font-weight:900;
        }

        .forest-speech p{
          margin:10px 0 0;
          font-size:clamp(15px,1.55vw,21px);
          line-height:1.45;
          font-weight:700;
        }

        .forest-start{
          position:absolute;
          right:5%;
          bottom:8%;
          z-index:9;
          border:0;
          border-radius:22px;
          padding:17px 30px;
          background:linear-gradient(#ffd952,#f1a62f);
          color:#713313;
          font-size:clamp(18px,2.1vw,28px);
          font-weight:900;
          box-shadow:
            0 9px 0 #c17a24,
            0 16px 30px rgba(80,54,19,.2);
          cursor:pointer;
          transition:transform .15s ease,filter .15s ease;
        }

        .forest-start:hover{
          filter:brightness(1.04);
          transform:translateY(-2px);
        }

        .forest-start:active{
          transform:translateY(5px);
        }

        /* =====================================================
           4'LÜ DOĞA DÜNYASI KEŞİF HARİTASI
           ===================================================== */

        .forest-map{background-image:linear-gradient(180deg,rgba(10,60,35,.04),rgba(10,60,35,.12)),url('/worlds/forest-map-bg.png') !important;
background-size:cover !important;
background-position:center center !important;
background-repeat:no-repeat !important;
          position:absolute;
          inset:0;
          z-index:12;
          display:flex;
          align-items:center;
          justify-content:center;
          padding:24px;
          background:rgba(14,54,35,.10);
        }

        .forest-map-panel{background:rgba(255,255,255,.08) !important;
border:1px solid rgba(255,255,255,.25) !important;
box-shadow:0 18px 50px rgba(0,40,20,.18) !important;
backdrop-filter:blur(2px) !important;
  width:min(1180px,96vw);
  padding:22px;
  border-radius:28px;
  background:rgba(255,255,255,.08);
  box-shadow:0 20px 60px rgba(20,60,35,.20);
  border:1px solid rgba(255,255,255,.28);
  backdrop-filter:blur(2px);
}

        .forest-map-header{
          text-align:center;
          margin-bottom:22px;
        }

        .forest-map-header-icon{
          font-size:clamp(34px,4vw,54px);
          line-height:1;
        }

        .forest-map-header h1{
          margin:7px 0 3px;
          color:#63331d;
          font-family:Georgia,serif;
          font-size:clamp(28px,4vw,46px);
        }

        .forest-map-header p{
          margin:0;
          color:#76513b;
          font-size:clamp(14px,1.5vw,18px);
          font-weight:700;
        }

        .forest-section-grid{
          display:grid;
          grid-template-columns:repeat(4,minmax(0,1fr));
          gap:14px;
        }

        .forest-section-card{
          position:relative;
          min-width:0;
          min-height:190px;
          padding:18px 14px;
          border:3px solid rgba(104,65,32,.32);
          border-radius:22px;
          background:linear-gradient(
            145deg,
            rgba(255,255,255,.98),
            rgba(248,239,215,.95)
          );
          box-shadow:0 9px 20px rgba(73,52,29,.14);
          cursor:pointer;
          text-align:center;
          color:#4d301e;
          transition:
            transform .18s ease,
            box-shadow .18s ease;
        }

        .forest-section-card:hover{
          transform:translateY(-5px);
          box-shadow:0 15px 28px rgba(73,52,29,.22);
        }

        .forest-section-number{
          position:absolute;
          left:11px;
          top:9px;
          width:28px;
          height:28px;
          display:grid;
          place-items:center;
          border-radius:50%;
          background:#6f4728;
          color:#fff4c9;
          font-size:12px;
          font-weight:900;
        }

        .forest-section-icon{
          display:block;
          margin-top:8px;
          font-size:clamp(46px,5vw,72px);
          line-height:1;
        }

        .forest-section-card h2{
          margin:10px 0 5px;
          color:#63331d;
          font-family:Georgia,serif;
          font-size:clamp(20px,2vw,29px);
        }

        .forest-section-card p{
          margin:0;
          color:#74543d;
          font-size:clamp(12px,1.2vw,15px);
          line-height:1.35;
          font-weight:700;
        }

        .forest-section-action{
          display:inline-block;
          margin-top:13px;
          padding:8px 13px;
          border-radius:12px;
          background:#ffd24e;
          color:#713313;
          font-size:12px;
          font-weight:900;
        }

        @keyframes leoEnter{
          0%{
            opacity:0;
            transform:translate(-50%,70px) scale(.96);
          }
          65%{
            opacity:1;
            transform:translate(-50%,-5px) scale(1.015);
          }
          100%{
            opacity:1;
            transform:translate(-50%,0) scale(1);
          }
        }

        @keyframes leoBreathe{
          0%,100%{
            transform:translateY(0) scale(1);
          }
          50%{
            transform:translateY(-5px) scale(1.008);
          }
        }

        @keyframes sparkle{
          0%,70%,100%{
            opacity:0;
            transform:scale(.7) rotate(-8deg);
          }
          80%{
            opacity:1;
            transform:scale(1.1) rotate(8deg);
          }
          90%{
            opacity:.5;
            transform:scale(.9) rotate(-2deg);
          }
        }

        @media(max-width:900px){
          .forest-section-grid{
            gap:10px;
          }

          .forest-map-panel{
            padding:20px;
          }

          .forest-section-card{
            min-height:165px;
            padding:15px 9px;
          }

          .forest-section-icon{
            font-size:42px;
          }
        }

        @media(max-width:700px){
          .forest-title{
            left:3%;
            top:4%;
            font-size:17px;
            padding:9px 14px;
            border-width:3px;
          }

          .forest-speech{
            left:4%;
            top:15%;
            width:calc(100% - 8%);
            padding:15px 17px;
            border-radius:22px;
          }

          .forest-speech h2{
            font-size:20px;
          }

          .forest-speech p{
            font-size:14px;
            margin-top:7px;
          }

          .forest-leo-wrap{
            width:58vw;
            height:56vh;
            bottom:11%;
          }

          .forest-start{
            right:4%;
            bottom:4%;
            font-size:16px;
            padding:13px 20px;
            border-radius:18px;
          }

          .forest-map{
            padding:12px;
          }

          .forest-map-panel{
            width:96vw;
            padding:14px;
            border-radius:22px;
          }

          .forest-map-header{
            margin-bottom:12px;
          }

          .forest-map-header h1{
            font-size:27px;
          }

          .forest-map-header p{
            font-size:12px;
          }

          .forest-section-grid{
            grid-template-columns:repeat(4,minmax(0,1fr));
            gap:6px;
          }

          .forest-section-card{
            min-height:135px;
            padding:12px 5px 8px;
            border-width:2px;
            border-radius:14px;
          }

          .forest-section-number{
            left:5px;
            top:5px;
            width:21px;
            height:21px;
            font-size:9px;
          }

          .forest-section-icon{
            margin-top:8px;
            font-size:30px;
          }

          .forest-section-card h2{
            margin:6px 0 3px;
            font-size:15px;
          }

          .forest-section-card p{
            display:none;
          }

          .forest-section-action{
            margin-top:6px;
            padding:5px 7px;
            border-radius:8px;
            font-size:9px;
          }
        }

        @media(max-width:430px){
          .forest-section-card{
            min-height:120px;
          }

          .forest-section-icon{
            font-size:26px;
          }

          .forest-section-card h2{
            font-size:13px;
          }

          .forest-section-action{
            font-size:8px;
            padding:4px 5px;
          }
        }
      `}</style>

      <img
        className="forest-bg"
        src={BG}
        alt="Doğa Dünyası orman arka planı"
      />

      <div className="forest-overlay" />

      <div className="forest-title">
        🌿 DOĞA DÜNYASI
      </div>

      {intro ? (
        <>
          <section className="forest-speech">
            <h2>Merhaba küçük kaşif! 🦁</h2>
            <p>
              Ben Leo. Burası Doğa Dünyası. Birlikte hayvanları,
              bitkileri ve doğanın güzel seslerini keşfedeceğiz!
            </p>
          </section>

          <div className="forest-leo-wrap" aria-label="Leo">
            <img
              className="forest-leo"
              src={LEO}
              alt="Leo, orman kaşifi"
            />
            <span className="leo-sparkle" aria-hidden="true">
              ✨
            </span>
          </div>

          <button
            className="forest-start"
            type="button"
            onClick={() => setIntro(false)}
          >
            Maceraya Başla! →
          </button>
        </>
      ) : (
        <section className="forest-map">
          <div className="forest-map-panel">
            <div className="forest-map-header">
              <div className="forest-map-header-icon">🌳 🦁</div>
              <h1>Doğa Dünyası</h1>
              <p>Bir keşif seç ve macerana başla!</p>
            </div>

            <div className="forest-section-grid">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  type="button"
                  className="forest-section-card"
                  onClick={() => openSection(section.id)}
                >
                  <span className="forest-section-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="forest-section-icon">
                    {section.icon}
                  </span>

                  <h2>{section.title}</h2>

                  <p>{section.description}</p>

                  <span className="forest-section-action">
                    Keşfet →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
