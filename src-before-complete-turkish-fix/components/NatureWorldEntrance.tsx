import { Link } from 'react-router-dom'

export function NatureWorldEntrance() {
  return (
    <section className="nature-entrance" aria-label="Doğa Dünyası">
      <style>{`
        .nature-entrance{position:relative;overflow:hidden;border-radius:32px;min-height:590px;background:linear-gradient(180deg,#54c8f4 0%,#b8edcf 52%,#72c66d 100%);box-shadow:0 28px 70px rgba(30,75,48,.18);isolation:isolate}
        .nature-entrance:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 78% 17%,rgba(255,255,210,.9) 0 3%,transparent 3.5%),linear-gradient(180deg,rgba(255,255,255,.12),transparent 48%);z-index:-2}
        .nature-mountains{position:absolute;left:-5%;right:-5%;bottom:29%;height:42%;background:linear-gradient(145deg,#6cae83,#3e8265);clip-path:polygon(0 62%,13% 33%,25% 58%,39% 14%,52% 55%,66% 25%,80% 59%,91% 31%,100% 57%,100% 100%,0 100%);opacity:.78;z-index:-2}
        .nature-hill{position:absolute;left:-10%;right:-10%;bottom:-8%;height:43%;background:linear-gradient(180deg,#8bd66f,#4d9c58);border-radius:50% 50% 0 0/35% 35% 0 0;z-index:-1}
        .nature-tree{position:absolute;bottom:17%;width:115px;height:300px;border-radius:58px 58px 20px 20px;background:linear-gradient(90deg,#704326,#9b5b2d);box-shadow:0 0 0 34px #2d8a51,0 -36px 0 50px #42a85a;opacity:.95}
        .nature-tree.left{left:-35px;transform:rotate(-5deg)} .nature-tree.right{right:-35px;transform:rotate(5deg)}
        .nature-water{position:absolute;right:0;bottom:0;width:48%;height:39%;background:linear-gradient(180deg,#58d9e9,#1ca9d0);clip-path:polygon(20% 0,100% 8%,100% 100%,0 100%,0 50%);opacity:.92}
        .nature-water:after{content:"";position:absolute;left:30%;top:8%;width:28%;height:52%;background:linear-gradient(180deg,#f4ffff,#8de9ef);border-radius:45%;filter:blur(2px)}
        .nature-bridge{position:absolute;right:7%;bottom:18%;width:38%;height:25px;border-radius:20px;background:#a86d3a;box-shadow:0 12px 0 -4px #734728,0 -17px 0 -6px #704527;transform:rotate(1deg)}
        .nature-sun{position:absolute;right:12%;top:7%;width:82px;height:82px;border-radius:50%;background:#ffd75d;box-shadow:0 0 0 15px rgba(255,215,93,.15),0 10px 35px rgba(244,174,64,.3);animation:natureSun 4s ease-in-out infinite}
        .nature-leaf{position:absolute;width:18px;height:36px;border-radius:100% 0 100% 0;background:#65b957;animation:natureLeaf 5s ease-in-out infinite}
        .nature-leaf.l1{left:35%;top:20%}.nature-leaf.l2{left:58%;top:12%;animation-delay:-2s}.nature-leaf.l3{right:26%;top:34%;animation-delay:-3.2s}
        .nature-entrance-content{position:relative;z-index:4;display:flex;align-items:center;justify-content:space-between;gap:20px;min-height:590px;padding:48px 46px 38px}
        .nature-copy{max-width:360px;color:#fff;text-shadow:0 3px 14px rgba(26,67,44,.28)}
        .nature-kicker{display:inline-block;padding:8px 14px;border-radius:999px;background:rgba(19,83,49,.72);font-size:12px;font-weight:900;letter-spacing:.1em}
        .nature-copy h1{margin:15px 0 10px;font-size:clamp(38px,6vw,64px);line-height:.95;letter-spacing:-.04em}
        .nature-copy p{margin:0 0 22px;font-size:18px;font-weight:700;line-height:1.45;color:rgba(255,255,255,.92)}
        .nature-speech{position:relative;background:#fffaf0;color:#5c321f;padding:18px 22px;border-radius:24px;box-shadow:0 14px 35px rgba(42,72,39,.18);font-weight:800;font-size:17px;margin-bottom:20px}
        .nature-speech:after{content:"";position:absolute;left:32px;bottom:-14px;border:14px solid transparent;border-top-color:#fffaf0;border-bottom:0}
        .nature-speech strong{color:#ef8b2d;font-size:24px}
        .nature-play{display:inline-flex;align-items:center;gap:12px;padding:15px 23px;border-radius:18px;background:linear-gradient(180deg,#ffd84e,#f4a92f);color:#713313;text-decoration:none;font-weight:1000;font-size:18px;box-shadow:0 9px 0 #c47b24,0 16px 30px rgba(80,54,19,.2);transition:transform .18s}
        .nature-play:hover{transform:translateY(-3px)} .nature-play span{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:#ef6332;color:#fff}
        .nature-leo{position:relative;width:min(45%,430px);align-self:flex-end;filter:drop-shadow(0 20px 15px rgba(33,73,38,.25));animation:leoWelcome 3.8s ease-in-out infinite}
        .nature-leo img{display:block;width:100%;height:auto}
        .nature-tools{position:absolute;right:24px;top:50%;display:flex;flex-direction:column;gap:12px;z-index:6}
        .nature-tool{width:72px;height:72px;border:0;border-radius:22px;background:rgba(255,255,255,.92);box-shadow:0 10px 25px rgba(39,74,43,.18);display:grid;place-items:center;text-align:center;color:#2c5c3a;font-weight:900;font-size:11px}
        .nature-tool span{font-size:27px;display:block;margin-bottom:2px}
        .nature-title-sign{position:absolute;left:26px;top:34%;padding:14px 20px;border-radius:16px;background:linear-gradient(#b8753d,#7d4a2c);border:5px solid #5b371f;color:#fff3a1;font-size:24px;font-weight:1000;box-shadow:0 10px 20px rgba(42,61,35,.22);transform:rotate(-2deg)}
        @keyframes natureSun{50%{transform:scale(1.06)}} @keyframes natureLeaf{50%{transform:translate(15px,22px) rotate(45deg)}} @keyframes leoWelcome{0%,100%{transform:translateY(0) rotate(-.4deg)}50%{transform:translateY(-9px) rotate(.4deg)}}
        @media(max-width:760px){.nature-entrance{min-height:650px}.nature-entrance-content{min-height:650px;padding:30px 22px 24px;align-items:flex-end}.nature-copy{max-width:55%;margin-bottom:10px}.nature-copy h1{font-size:42px}.nature-copy p{font-size:14px}.nature-speech{font-size:13px;padding:14px}.nature-speech strong{font-size:19px}.nature-leo{width:55%;margin-right:-18px}.nature-title-sign{top:24%;font-size:18px;padding:10px 14px}.nature-tools{right:12px;top:18%;gap:8px}.nature-tool{width:58px;height:58px;border-radius:17px}.nature-tool span{font-size:22px}.nature-play{font-size:14px;padding:12px 16px}}
        @media(max-width:500px){.nature-copy{max-width:62%}.nature-leo{width:52%;margin-right:-25px}.nature-tools{top:15%;}.nature-tool{width:50px;height:50px;font-size:9px}.nature-tool span{font-size:19px}.nature-title-sign{left:14px}.nature-entrance-content{padding-left:16px;padding-right:10px}}
      `}</style>

      <div className="nature-mountains" />
      <div className="nature-hill" />
      <div className="nature-tree left" />
      <div className="nature-tree right" />
      <div className="nature-water" />
      <div className="nature-bridge" />
      <div className="nature-sun" />
      <span className="nature-leaf l1" /><span className="nature-leaf l2" /><span className="nature-leaf l3" />

      <div className="nature-title-sign">🌿 Doğa Dünyası</div>

      <div className="nature-entrance-content">
        <div className="nature-copy">
          <span className="nature-kicker">DOĞA DÜNYASI</span>
          <h1>Merhaba küçük kaşif!</h1>
          <div className="nature-speech">Ben <strong>Leo!</strong><br />Bugün birlikte ormanın harikalarını keşfedeceğiz. Hazır mısın? 🐾</div>
          <Link className="nature-play" to="/worlds/forest"><span>▶</span> Macera Başlasın!</Link>
        </div>

        <div className="nature-leo"><img src="/illustrations/forest/leo-lion.svg" alt="Leo, orman kaşifi" /></div>
      </div>

      <div className="nature-tools" aria-label="Doğa Dünyası seçenekleri">
        <div className="nature-tool"><span>🦋</span>Hayvanlar</div>
        <div className="nature-tool"><span>🔊</span>Sesler</div>
        <div className="nature-tool"><span>🌱</span>Bitkiler</div>
      </div>
    </section>
  )
}
