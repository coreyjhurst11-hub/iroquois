import React, { useState, useEffect } from "react";

/**
 * Iroquois — "Demo Commercial" modal (no audio).
 * A code-built animated spot driven by kinetic typography. Plays when the
 * visitor clicks "Get my free demo". Five timed scenes:
 *   0 INTRO  · From idea to income
 *   1 BUILD  · Two operators hand-code your app & site
 *   2 LIVE   · It launches
 *   3 PROFIT · It turns into revenue
 *   4 END    · Demo first · $1,000 only if you love it
 *
 * Drop <DemoVideoModal open onClose/> into the landing page and point the CTA
 * button's onClick at setOpen(true).
 */

const PHONE_1 = { display: "(518) 817-1453", tel: "5188171453" };
const SCENE_TIMES = [0, 2400, 6700, 11000, 15200]; // ms; total ~18s
const TOTAL_MS = 18000;

/* friendly silhouette character */
function Hero({ x, y, color, pose = "idle", anim = "" }) {
  return (
    <g transform={`translate(${x} ${y})`} className={`fig ${anim}`} style={{ "--c": color }}>
      <rect x="-22" y="-26" width="44" height="74" rx="20" fill="var(--c)" />
      <circle cx="0" cy="-44" r="17" fill="var(--c)" />
      <circle cx="-6" cy="-46" r="2.4" fill="#070A12" />
      <circle cx="6" cy="-46" r="2.4" fill="#070A12" />
      <path d="M-6 -38 Q0 -33 6 -38" stroke="#070A12" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {pose === "thumbsup" && (
        <g className="arm-up">
          <rect x="14" y="-30" width="9" height="30" rx="4.5" fill="var(--c)" transform="rotate(28 18 -18)" />
          <circle cx="30" cy="-34" r="7" fill="var(--c)" />
        </g>
      )}
      {pose === "type" && (
        <>
          <rect x="-26" y="-6" width="14" height="9" rx="4.5" fill="var(--c)" transform="rotate(20 -19 -1)" />
          <rect x="12" y="-6" width="14" height="9" rx="4.5" fill="var(--c)" transform="rotate(-20 19 -1)" />
        </>
      )}
    </g>
  );
}

/* persistent background (does not remount between scenes) */
function Bg() {
  const particles = Array.from({ length: 16 });
  return (
    <svg viewBox="0 0 800 450" className="bg-svg" aria-hidden>
      <rect width="800" height="450" fill="#070A12" />
      <g opacity="0.5">
        {Array.from({ length: 13 }).map((_, i) => <line key={"v" + i} x1={i * 64} y1="0" x2={i * 64} y2="450" stroke="#16213a" strokeWidth="1" />)}
        {Array.from({ length: 8 }).map((_, i) => <line key={"h" + i} x1="0" y1={i * 64} x2="800" y2={i * 64} stroke="#16213a" strokeWidth="1" />)}
      </g>
      {particles.map((_, i) => (
        <circle key={i} className="particle" cx={30 + (i * 49) % 750} cy={420 - (i * 41) % 380} r={i % 3 === 0 ? 2.6 : 1.6}
          fill={i % 2 ? "#34E3B0" : "#7FB0FF"} style={{ animationDelay: `${(i * 0.37).toFixed(2)}s`, animationDuration: `${5 + (i % 4)}s` }} />
      ))}
    </svg>
  );
}

function SceneBuild() {
  const blocks = [
    { x: 300, y: 100, w: 50, h: 12, d: 0.05 }, { x: 300, y: 122, w: 90, h: 12, d: 0.18 },
    { x: 300, y: 144, w: 70, h: 12, d: 0.31 }, { x: 470, y: 105, w: 60, h: 40, d: 0.12 },
    { x: 540, y: 105, w: 60, h: 40, d: 0.25 }, { x: 470, y: 152, w: 130, h: 14, d: 0.4 },
  ];
  const code = [38, 64, 50, 72, 44];
  return (
    <svg viewBox="0 0 800 450" className="scene-svg">
      <g transform="translate(70 96)">
        <rect width="150" height="172" rx="12" fill="#0d1424" stroke="#1f2c45" />
        <circle cx="16" cy="16" r="3.5" fill="#ff6b6b" /><circle cx="28" cy="16" r="3.5" fill="#ffd166" /><circle cx="40" cy="16" r="3.5" fill="#34E3B0" />
        {code.map((w, i) => <rect key={i} className="cd" x="16" y={38 + i * 24} width={w} height="8" rx="4" fill={i % 2 ? "#34E3B0" : "#3a4660"} style={{ animationDelay: `${0.1 + i * 0.12}s` }} />)}
      </g>
      <g transform="translate(280 78)">
        <rect width="280" height="190" rx="14" fill="#0d1424" stroke="#26334d" />
        <rect width="280" height="30" rx="14" fill="#121b30" />
        <circle cx="18" cy="15" r="4" fill="#34E3B0" /><rect x="40" y="10" width="150" height="10" rx="5" fill="#1f2c45" />
      </g>
      {blocks.map((b, i) => <rect key={i} className="asm" x={b.x} y={b.y} width={b.w} height={b.h} rx="5" fill={i % 2 ? "#7FB0FF" : "#34E3B0"} style={{ animationDelay: `${b.d}s` }} />)}
      <g transform="translate(610 96)">
        <rect width="84" height="160" rx="16" fill="#0d1424" stroke="#26334d" />
        <rect className="asm" x="10" y="14" width="64" height="100" rx="6" fill="#152138" style={{ animationDelay: "0.45s" }} />
        <rect className="asm" x="22" y="128" width="40" height="8" rx="4" fill="#34E3B0" style={{ animationDelay: "0.58s" }} />
      </g>
      <Hero x={360} y={368} color="#34E3B0" pose="type" anim="bob" />
      <Hero x={470} y={368} color="#7FB0FF" pose="type" anim="bob" />
    </svg>
  );
}

function SceneLive() {
  return (
    <svg viewBox="0 0 800 450" className="scene-svg">
      <g transform="translate(160 70)" className="liveglow">
        <rect width="300" height="200" rx="14" fill="#0e1626" stroke="#34E3B0" strokeOpacity="0.45" />
        <rect width="300" height="30" rx="14" fill="#121b30" /><circle cx="18" cy="15" r="4" fill="#34E3B0" />
        <rect x="20" y="48" width="120" height="14" rx="7" fill="#34E3B0" />
        <rect x="20" y="74" width="200" height="9" rx="4.5" fill="#2a3a59" /><rect x="20" y="90" width="170" height="9" rx="4.5" fill="#2a3a59" />
        <rect x="20" y="118" width="90" height="34" rx="8" fill="#7FB0FF" /><rect x="124" y="118" width="90" height="34" rx="8" fill="#1f2c45" />
        <rect x="20" y="166" width="260" height="9" rx="4.5" fill="#1f2c45" />
      </g>
      <g transform="translate(500 84)" className="liveglow">
        <rect width="96" height="180" rx="18" fill="#0e1626" stroke="#7FB0FF" strokeOpacity="0.45" />
        <rect x="12" y="16" width="72" height="40" rx="8" fill="#7FB0FF" /><rect x="12" y="64" width="50" height="8" rx="4" fill="#34E3B0" />
        <rect x="12" y="80" width="72" height="7" rx="3.5" fill="#2a3a59" /><rect x="12" y="94" width="60" height="7" rx="3.5" fill="#2a3a59" />
        <rect x="12" y="120" width="72" height="28" rx="8" fill="#152138" />
      </g>
      <g className="cur"><path d="M0 0 L0 22 L6 16 L11 26 L15 24 L10 14 L18 14 Z" fill="#fff" /></g>
      <g className="pill" transform="translate(400 50)">
        <rect x="-56" y="-19" width="112" height="38" rx="19" fill="#0e1626" stroke="#34E3B0" />
        <circle cx="-33" cy="0" r="6" fill="#34E3B0" className="dot" />
        <text x="8" y="6" textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontSize="16" fontWeight="700" fill="#34E3B0">LIVE</text>
      </g>
    </svg>
  );
}

function SceneProfit() {
  const bars = [
    { x: 372, h: 34, d: 0 }, { x: 410, h: 58, d: 0.1 }, { x: 448, h: 46, d: 0.2 },
    { x: 486, h: 86, d: 0.3 }, { x: 524, h: 104, d: 0.4 }, { x: 562, h: 138, d: 0.5 },
  ];
  return (
    <svg viewBox="0 0 800 450" className="scene-svg">
      <Hero x={120} y={326} color="#34E3B0" pose="thumbsup" anim="cheer" />
      <Hero x={208} y={336} color="#7FB0FF" pose="thumbsup" anim="cheer" />
      <line x1="350" y1="316" x2="600" y2="316" stroke="#26334d" strokeWidth="2" />
      {bars.map((b, i) => <rect key={i} className="bar" x={b.x} y={316 - b.h} width="24" height={b.h} rx="4" fill="#34E3B0" style={{ animationDelay: `${b.d}s` }} />)}
      <path className="trend" d="M384,282 L422,258 L460,270 L498,230 L536,212 L574,178" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle className="tdot" cx="574" cy="178" r="5" fill="#fff" />
      <Hero x={700} y={356} color="#E9B36A" anim="bob" />
      {[[660, 250, 0], [702, 222, 0.5], [742, 250, 1.0], [690, 282, 1.5]].map(([cx, cy, d], i) => (
        <g key={i} className="coin" style={{ animationDelay: `${d}s` }} transform={`translate(${cx} ${cy})`}>
          <circle r="13" fill="#E9B36A" /><text y="5" textAnchor="middle" fontFamily="'JetBrains Mono'" fontSize="14" fontWeight="700" fill="#3a2a0a">$</text>
        </g>
      ))}
    </svg>
  );
}

function renderScene(scene) {
  if (scene === 0) {
    return (
      <>
        <div className="overlay">
          <div className="ov ov-center">
            <div className="idx">IROQUOIS · CUSTOM SOFTWARE</div>
            <div className="mask"><span className="big">FROM IDEA</span></div>
            <div className="mask"><span className="big" style={{ animationDelay: ".12s" }}>TO <span className="hl">INCOME.</span></span></div>
            <div className="subline">We build it. You watch it work. Then you decide.</div>
          </div>
        </div>
      </>
    );
  }
  if (scene === 1) {
    return (
      <>
        <SceneBuild />
        <div className="overlay">
          <div className="ov ov-bl">
            <div className="idx">01 / 04 — BUILD</div>
            <div className="mask"><span className="big">BUILD</span></div>
            <div className="code-type">&gt; iroquois build your-app</div>
            <div className="subline">Hand-coded by two operators. No templates. No no-code bloat.</div>
          </div>
        </div>
      </>
    );
  }
  if (scene === 2) {
    return (
      <>
        <SceneLive />
        <div className="overlay">
          <div className="ov ov-bl">
            <div className="idx">02 / 04 — LAUNCH</div>
            <div className="mask"><span className="big">GO LIVE</span></div>
            <div className="subline">Tested, approved, and shipped straight to your domain.</div>
          </div>
        </div>
      </>
    );
  }
  if (scene === 3) {
    return (
      <>
        <SceneProfit />
        <div className="overlay">
          <div className="ov ov-bl">
            <div className="idx">03 / 04 — PROFIT</div>
            <div className="mask"><span className="big">PROFIT</span></div>
            <div className="numrow">
              <span className="n" style={{ animationDelay: ".5s" }}>$1K</span><span className="arr">→</span>
              <span className="n" style={{ animationDelay: ".7s" }}>$20K</span><span className="arr">→</span>
              <span className="n" style={{ animationDelay: ".9s" }}>$60K</span>
            </div>
            <div className="subline">Your software goes to work — and pays you back.</div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="overlay">
        <div className="ov ov-center end">
          <div className="hexmark mask">
            <svg width="48" height="48" viewBox="0 0 28 28" fill="none">
              <defs><linearGradient id="fthrEnd" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#34E3B0" /><stop offset="1" stopColor="#4D7CFF" /></linearGradient></defs>
              <path d="M14 3 C20 9 19.5 18 15 25.5 L12.5 26 C8.5 18 8 9 14 3 Z" fill="url(#fthrEnd)" fillOpacity="0.16" stroke="url(#fthrEnd)" strokeWidth="1.3" strokeLinejoin="round" />
              <path d="M14 4.5 L13 25" stroke="#34E3B0" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M13.6 8 L18 6.4 M13.4 12 L18.6 11 M13.2 16 L18 16.4 M13 20 L16.8 21.2" stroke="#34E3B0" strokeWidth="0.9" strokeLinecap="round" />
              <path d="M13.4 8 L9.4 6.4 M13.6 12 L8.6 11 M13.8 16 L9 16.4 M13.2 20 L9.6 21.2" stroke="#34E3B0" strokeWidth="0.9" strokeLinecap="round" />
              <circle cx="14" cy="4" r="1.7" fill="#34E3B0" /><circle cx="18" cy="6.4" r="1" fill="#4D7CFF" /><circle cx="8.6" cy="11" r="1" fill="#4D7CFF" />
            </svg>
          </div>
          <div className="mask"><span className="big">DEMO FIRST.</span></div>
          <div className="subline big-sub">Pay <b className="hl">$1,000</b> only if you love it.</div>
          <div className="endrow"><span className="wm">IROQUOIS</span><span className="sep">·</span><span>{PHONE_1.display}</span></div>
          <a className="btn btn-solid endcta" href="#book">Book my free demo</a>
          <div className="endpop film-slogan" style={{ animationDelay: "1.05s" }}>BUILD FOR THE FUTURE</div>
        </div>
      </div>
    </>
  );
}

function DemoFilm() {
  const [playId, setPlayId] = useState(0);
  const [scene, setScene] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setStarted(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    setScene(0);
    const timers = SCENE_TIMES.slice(1).map((t, i) => setTimeout(() => setScene(i + 1), t));
    return () => timers.forEach(clearTimeout);
  }, [started, playId]);

  const replay = () => { setStarted(true); setPlayId((p) => p + 1); };
  const labels = ["INTRO", "01 \u00b7 BUILD", "02 \u00b7 GO LIVE", "03 \u00b7 PROFIT", "FIN"];

  return (
    <div className="film" ref={ref}>
      <style>{FILM_CSS}</style>
      <style>{FRAME_CSS}</style>
      <div className="film-bar">
        <span className="film-tt"><span className="recdot" /> HOW IT WORKS</span>
        <span className="film-tt mono">{labels[scene]} \u00b7 0:18</span>
      </div>
      <div className="film-screen">
        <div className="film-stage">
          <Bg />
          {started && <div className="scene" key={playId + "-" + scene}>{renderScene(scene)}</div>}
          <div className="filmgrad" />
          {started && <div className="progress" key={"p-" + playId}><i style={{ animationDuration: TOTAL_MS + "ms" }} /></div>}
          {!started && <div className="film-poster"><span className="film-play">\u25b6</span><span>scroll into view to play</span></div>}
        </div>
        <span className="brk tl" /><span className="brk tr" /><span className="brk bl" /><span className="brk br" />
      </div>
      <div className="film-foot">
        <button className="lnk" onClick={replay}>\u21bb Replay</button>
        <span className="film-cap">0:18 \u2014 from idea, to live, to income.</span>
      </div>
    </div>
  );
}

export default DemoFilm;

/* ===================================================================== */
const SHARED_BTN = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&family=Hanken+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@500;700&display=swap');
.btn{display:inline-flex;align-items:center;gap:9px;border-radius:11px;font-weight:600;font-size:14px;cursor:pointer;border:none;transition:transform .18s,box-shadow .25s,border-color .2s,background .2s;white-space:nowrap;font-family:'Hanken Grotesk',sans-serif;text-decoration:none;}
.btn-solid{padding:12px 20px;color:#04130D;background:linear-gradient(180deg,#5BF0C3,#34E3B0);box-shadow:0 6px 24px -8px rgba(52,227,176,.6);}
.btn-solid:hover{transform:translateY(-1px);box-shadow:0 12px 34px -8px rgba(52,227,176,.7);}
.btn-line{padding:12px 20px;color:#EEF1F6;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.03);font-family:'JetBrains Mono',monospace;font-size:13px;}
.btn-line:hover{border-color:#34E3B0;}
.btn-lg{padding:15px 26px;font-size:16px;border-radius:13px;}
`;

const FILM_CSS = SHARED_BTN + `
.overlay-bg{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;padding:20px;background:rgba(4,6,12,.8);backdrop-filter:blur(10px);animation:ofade .25s ease;}
@keyframes ofade{from{opacity:0}to{opacity:1}}
.modal{width:min(920px,100%);background:#0A0E18;border:1px solid rgba(255,255,255,.12);border-radius:20px;overflow:hidden;box-shadow:0 50px 120px -30px rgba(0,0,0,.9);animation:mrise .35s cubic-bezier(.2,.7,.2,1);}
@keyframes mrise{from{opacity:0;transform:translateY(20px) scale(.98)}to{opacity:1;transform:none}}
.m-head{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-bottom:1px solid rgba(255,255,255,.08);}
.m-title{display:flex;align-items:center;gap:9px;font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.12em;color:#9BA6B8;}
.rec{width:9px;height:9px;border-radius:50%;background:#ff5c5c;box-shadow:0 0 10px #ff5c5c;animation:blink 1.4s infinite;}
@keyframes blink{50%{opacity:.3}}
.m-close{background:rgba(255,255,255,.06);border:none;color:#9BA6B8;width:30px;height:30px;border-radius:9px;cursor:pointer;font-size:14px;}
.m-close:hover{color:#fff;background:rgba(255,255,255,.12);}

.film-stage{position:relative;width:100%;aspect-ratio:16/9;background:#070A12;overflow:hidden;container-type:size;}
.bg-svg,.scene-svg{position:absolute;inset:0;width:100%;height:100%;display:block;}
.bg-svg{z-index:0;}
.scene{position:absolute;inset:0;z-index:1;animation:sceneIn .55s cubic-bezier(.16,1,.3,1) both;}
@keyframes sceneIn{from{opacity:0;transform:scale(1.04)}to{opacity:1;transform:none}}
.scene-svg{z-index:1;}
.overlay{position:absolute;inset:0;z-index:2;pointer-events:none;}
.ov{position:absolute;display:flex;flex-direction:column;gap:.45em;}
.ov-bl{left:clamp(16px,4cqw,52px);bottom:clamp(16px,6cqh,54px);}
.ov-center{inset:0;align-items:center;justify-content:center;text-align:center;gap:.4em;}

.idx{font-family:'JetBrains Mono',monospace;font-size:clamp(10px,1.7cqw,13px);letter-spacing:.2em;color:#34E3B0;opacity:0;animation:fadeUp .6s ease .05s forwards;}
.mask{overflow:hidden;display:block;line-height:.98;}
.mask .big{display:inline-block;transform:translateY(116%);animation:rise .9s cubic-bezier(.16,1,.3,1) .08s both;}
.big{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:clamp(34px,11cqw,98px);letter-spacing:-.03em;color:#EEF1F6;}
.hl{color:#34E3B0;}
.end .hl{color:#E9B36A;}
@keyframes rise{to{transform:translateY(0)}}
.subline{font-family:'Hanken Grotesk',sans-serif;font-size:clamp(12.5px,2.3cqw,20px);color:#9BA6B8;max-width:30em;opacity:0;transform:translateY(10px);animation:fadeUp .7s ease .5s forwards;}
.big-sub{font-size:clamp(14px,2.8cqw,24px);color:#EEF1F6;}
@keyframes fadeUp{to{opacity:1;transform:none}}

.code-type{font-family:'JetBrains Mono',monospace;font-size:clamp(11px,2cqw,16px);color:#34E3B0;white-space:nowrap;overflow:hidden;border-right:2px solid #34E3B0;width:0;animation:type 1.4s steps(25,end) .3s forwards,caret .7s step-end infinite;}
@keyframes type{to{width:25ch}}
@keyframes caret{50%{border-color:transparent}}

.numrow{display:flex;gap:.35em;align-items:baseline;font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:clamp(20px,6cqw,52px);color:#E9B36A;margin:.05em 0;}
.numrow .arr{color:#5A6577;font-weight:600;}
.numrow .n{opacity:0;transform:translateY(14px) scale(.6);animation:pop .55s cubic-bezier(.2,1.1,.3,1) forwards;}
@keyframes pop{to{opacity:1;transform:none}}

.endrow{display:flex;align-items:center;gap:.6em;font-family:'JetBrains Mono',monospace;font-size:clamp(11px,2cqw,15px);color:#9BA6B8;letter-spacing:.06em;margin-top:.3em;opacity:0;animation:fadeUp .6s ease .7s forwards;}
.endrow .wm{font-family:'Bricolage Grotesque';font-weight:700;letter-spacing:.16em;color:#EEF1F6;}
.endrow .sep{color:#34E3B0;}
.endcta{pointer-events:auto;margin-top:.6em;opacity:0;animation:fadeUp .6s ease .9s forwards;}
.hexmark{opacity:0;animation:fadeUp .6s ease 0s forwards;}
.hexmark svg{display:block;margin:0 auto;}

.filmgrad{position:absolute;inset:0;z-index:3;pointer-events:none;background:linear-gradient(#070A12 0%,transparent 9%,transparent 88%,rgba(7,10,18,.9) 100%);}
.progress{position:absolute;left:0;right:0;bottom:0;height:3px;background:rgba(255,255,255,.08);z-index:4;}
.progress i{display:block;height:100%;transform-origin:left;transform:scaleX(0);background:linear-gradient(90deg,#34E3B0,#7FB0FF);animation:fill linear forwards;}
@keyframes fill{to{transform:scaleX(1)}}

/* scene illustration motion */
.particle{animation:float 6s ease-in-out infinite;opacity:.5;}
@keyframes float{0%,100%{transform:translateY(0);opacity:.2}50%{transform:translateY(-16px);opacity:.7}}
.fig{transform-box:fill-box;}
.bob{animation:bob 3.2s ease-in-out infinite;}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
.cheer{animation:cheer 1.3s ease-in-out infinite;}
@keyframes cheer{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
.arm-up{transform-box:fill-box;transform-origin:left bottom;animation:wave 1.1s ease-in-out infinite;}
@keyframes wave{0%,100%{transform:rotate(0)}50%{transform:rotate(-12deg)}}
.asm{transform-box:fill-box;transform-origin:center;opacity:0;animation:asm .6s cubic-bezier(.2,.85,.25,1) both;}
@keyframes asm{from{opacity:0;transform:translateY(18px) scale(.6)}to{opacity:1;transform:none}}
.cd{opacity:0;animation:cdin .5s ease both;}
@keyframes cdin{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:none}}
.liveglow{filter:drop-shadow(0 0 10px rgba(52,227,176,.25));}
.pill{transform-box:fill-box;transform-origin:center;opacity:0;animation:pillpop .55s cubic-bezier(.2,1.2,.3,1) .25s both;}
@keyframes pillpop{from{opacity:0;transform:scale(.4)}to{opacity:1;transform:scale(1)}}
.dot{animation:blink 1.3s ease-in-out infinite;}
.cur{animation:cur 2.4s ease-in-out .4s infinite;}
@keyframes cur{0%{transform:translate(330px,150px)}18%{transform:translate(300px,172px)}28%{transform:translate(300px,180px)}38%{transform:translate(300px,172px)}58%{transform:translate(330px,150px)}100%{transform:translate(330px,150px)}}
.bar{transform-box:fill-box;transform-origin:bottom;transform:scaleY(0);animation:grow .8s cubic-bezier(.2,.85,.25,1) .1s both;}
@keyframes grow{to{transform:scaleY(1)}}
.trend{stroke-dasharray:520;stroke-dashoffset:520;animation:draw 1.1s ease-out .35s forwards;filter:drop-shadow(0 0 5px rgba(255,255,255,.5));}
@keyframes draw{to{stroke-dashoffset:0}}
.tdot{opacity:0;animation:tfade .4s ease 1.3s forwards;filter:drop-shadow(0 0 6px #fff);}
@keyframes tfade{to{opacity:1}}
.coin{animation:coin 2.8s ease-in-out infinite;}
@keyframes coin{0%{opacity:0;transform:translateY(10px)}25%{opacity:1}100%{opacity:0;transform:translateY(-36px)}}

.m-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 18px;flex-wrap:wrap;}
.lnk{background:none;border:none;color:#9BA6B8;cursor:pointer;font-size:13px;font-family:'JetBrains Mono',monospace;}
.lnk:hover{color:#34E3B0;}
.m-cta{display:flex;gap:10px;flex-wrap:wrap;}

@media (prefers-reduced-motion: reduce){
  .scene{animation:none!important;}
  .mask .big{transform:none!important;animation:none!important;}
  .idx,.subline,.endrow,.endcta,.hexmark,.cd,.asm{opacity:1!important;transform:none!important;animation:none!important;}
  .code-type{width:25ch!important;animation:caret .7s step-end infinite!important;}
  .numrow .n{opacity:1!important;transform:none!important;animation:none!important;}
  .bar{transform:scaleY(1)!important;animation:none!important;}
  .trend{stroke-dashoffset:0!important;animation:none!important;}
  .tdot,.pill{opacity:1!important;animation:none!important;}
  .particle,.bob,.cheer,.arm-up,.coin,.cur,.dot{animation:none!important;}
  .progress i{transform:scaleX(1)!important;animation:none!important;}
}
`;

const HARNESS_CSS = SHARED_BTN + `
.harness{position:relative;min-height:540px;display:grid;place-items:center;background:#06080F;overflow:hidden;font-family:'Hanken Grotesk',sans-serif;padding:40px;}
.harness-bg{position:absolute;inset:0;background:radial-gradient(40vw 40vw at 80% 10%,rgba(52,227,176,.18),transparent 60%),radial-gradient(40vw 40vw at 10% 90%,rgba(77,124,255,.14),transparent 60%);}
.harness-inner{position:relative;text-align:center;color:#EEF1F6;}
.kicker{font-family:'JetBrains Mono',monospace;font-size:11.5px;letter-spacing:.16em;color:#34E3B0;}
.harness h1{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:clamp(30px,5vw,48px);letter-spacing:-.02em;margin:12px 0 0;}
.harness p{color:#9BA6B8;margin:14px 0 30px;font-size:16px;}
`;


const FRAME_CSS = `
.film{position:relative;width:100%;}
.film-bar{display:flex;justify-content:space-between;align-items:center;padding:0 6px 10px;font-family:'JetBrains Mono',monospace;font-size:11.5px;letter-spacing:.14em;color:#9BA6B8;}
.film-tt{display:flex;align-items:center;gap:8px;} .film-tt.mono{color:#5A6577;}
.recdot{width:8px;height:8px;border-radius:50%;background:#34E3B0;box-shadow:0 0 10px #34E3B0;animation:recblink 1.6s infinite;}
@keyframes recblink{50%{opacity:.3}}
.film-screen{position:relative;border-radius:20px;padding:11px;border:1px solid rgba(52,227,176,.28);background:linear-gradient(180deg,rgba(52,227,176,.08),rgba(77,124,255,.05));}
.film-stage{border-radius:12px;box-shadow:0 36px 90px -34px rgba(0,0,0,.9),0 0 70px -22px rgba(52,227,176,.28);}
.film-poster{position:absolute;inset:0;z-index:6;display:flex;flex-direction:column;gap:10px;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.12em;color:#9BA6B8;background:rgba(7,10,18,.35);}
.film-play{font-size:30px;color:#34E3B0;}
.brk{position:absolute;width:18px;height:18px;border:2px solid rgba(52,227,176,.85);pointer-events:none;}
.brk.tl{top:3px;left:3px;border-right:0;border-bottom:0;border-top-left-radius:9px;}
.brk.tr{top:3px;right:3px;border-left:0;border-bottom:0;border-top-right-radius:9px;}
.brk.bl{bottom:3px;left:3px;border-right:0;border-top:0;border-bottom-left-radius:9px;}
.brk.br{bottom:3px;right:3px;border-left:0;border-top:0;border-bottom-right-radius:9px;}
.film-foot{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:11px 6px 0;flex-wrap:wrap;}
.film-cap{font-size:12px;color:#5A6577;}
.film-slogan{font-family:'JetBrains Mono',monospace;font-size:clamp(9px,1.7cqw,12px);letter-spacing:.32em;color:#34E3B0;margin-top:.5em;}
`;
