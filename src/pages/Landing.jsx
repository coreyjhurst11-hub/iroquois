import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Mark from "../Mark.jsx";
import DemoFilm from "../components/DemoFilm.jsx";
import LeadForm from "../components/LeadForm.jsx";

const PHONE_1 = { display: "(518) 817-1453", tel: "5188171453" };
const PHONE_2 = { display: "(678) 572-2944", tel: "6785722944" };

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`lp-rv ${shown ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function Faq({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`lp-faq ${open ? "open" : ""}`} onClick={() => setOpen((o) => !o)}>
      <div className="lp-faq-q"><span>{q}</span><span className="lp-faq-p">{open ? "–" : "+"}</span></div>
      <div className="lp-faq-a"><p>{a}</p></div>
    </div>
  );
}

export default function IroquoisLanding() {
  const rootRef = useRef(null);
  const [leadOpen, setLeadOpen] = useState(false);
  const frame = useRef(0);
  const onMove = (e) => {
    const r = rootRef.current; if (!r) return;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const b = r.getBoundingClientRect();
      r.style.setProperty("--mx", ((e.clientX - b.left) / b.width - 0.5).toFixed(3));
      r.style.setProperty("--my", ((e.clientY - b.top) / b.height - 0.5).toFixed(3));
    });
  };

  return (
    <div className="lp" ref={rootRef} onMouseMove={onMove}>
      <style>{LANDING_CSS}</style>

      <div className="lp-bg" aria-hidden>
        <div className="lp-blob a" /><div className="lp-blob b" />
        <div className="lp-grid" /><div className="lp-grain" /><div className="lp-vig" />
        <svg className="lp-feather" viewBox="0 0 200 360" fill="none" aria-hidden>
          <path d="M100 12 C150 90 148 230 112 340 L88 348 C52 230 50 90 100 12 Z" stroke="url(#lf)" strokeWidth="1.4" />
          <path d="M100 26 L94 344" stroke="#34E3B0" strokeWidth="1" />
          {Array.from({ length: 11 }).map((_, i) => {
            const y = 60 + i * 26;
            return <g key={i}><path d={`M98 ${y} L${140 - i * 2} ${y - 14}`} stroke="#34E3B0" strokeWidth="0.8" /><path d={`M100 ${y} L${60 + i * 2} ${y - 14}`} stroke="#34E3B0" strokeWidth="0.8" /></g>;
          })}
          <defs><linearGradient id="lf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#34E3B0" /><stop offset="1" stopColor="#4D7CFF" /></linearGradient></defs>
        </svg>
      </div>

      <div className="lp-ticker"><div className="lp-track">
        {Array.from({ length: 2 }).map((_, k) => (
          <span key={k}>BUILD FOR THE FUTURE — CUSTOM SOFTWARE — DEMO FIRST — YOU OWN THE CODE — BUILT BY OPERATORS — ANY BUSINESS, LARGE OR SMALL — </span>
        ))}
      </div></div>

      <header className="lp-nav">
        <a className="lp-brand" href="#top"><Mark glow /><span className="lp-lock"><span>IROQUOIS</span><span className="lp-slogan">BUILD FOR THE FUTURE</span></span></a>
        <nav className="lp-links">
          <a href="#film">Demo</a><a href="#package">Package</a><a href="#how">Process</a><Link to="/operators">Operators</Link>
        </nav>
        <div className="lp-navcta">
          <a href={`tel:${PHONE_1.tel}`} className="btn btn-ghost">{PHONE_1.display}</a>
          <button onClick={() => setLeadOpen(true)} className="btn btn-solid">Get my free demo</button>
        </div>
      </header>

      <main className="lp-hero" id="top">
        <span className="lp-brk tl" /><span className="lp-brk br" />
        <div className="lp-eyebrow lp-load" style={{ "--d": "0ms" }}><span className="dot" /> Built by operators, not theorists</div>
        <h1 className="lp-h1">
          <span className="lp-mask"><span className="lp-up" style={{ "--d": "80ms" }}>See it work first.</span></span>
          <span className="lp-mask"><span className="lp-up" style={{ "--d": "200ms" }}>Pay <span className="lp-grad">$1,000 only if it does.</span></span></span>
        </h1>
        <p className="lp-sub lp-load" style={{ "--d": "360ms" }}>
          Tell us the bottleneck eating your week. We hand-code a working demo of your
          custom app or website — <strong>free</strong>. Test it, break it, approve it.
          Only then do you pay our flat <span className="lp-gold">$1,000 Get&nbsp;Started</span> fee
          to go live. No retainers. No low-code bloat. No risk.
        </p>
        <div className="lp-cta lp-load" style={{ "--d": "480ms" }}>
          <button onClick={() => setLeadOpen(true)} className="btn btn-solid btn-lg">Get my free demo
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8h11m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <a href="#film" className="btn btn-line btn-lg"><span className="tri">▾</span> Watch how it works</a>
        </div>
        <div className="lp-proof lp-load" style={{ "--d": "600ms" }}>
          <span className="lp-plabel">NO CARD · NO COMMITMENT · YOU OWN THE CODE</span>
          <div className="lp-logos"><span>WEB APPS</span><i /><span>INTERNAL TOOLS</span><i /><span>BOOKING & CRM</span><i /><span>DASHBOARDS</span></div>
        </div>
      </main>

      <section className="lp-film-sec" id="film">
        <Reveal><div className="lp-sechead"><span className="lp-kick">SEE IT WORK · 0:18</span><h2 className="lp-h2">Watch your idea become software — then income.</h2></div></Reveal>
        <Reveal delay={80} className="lp-film-wrap"><DemoFilm /></Reveal>
      </section>

      <section className="lp-pkg" id="package">
        <Reveal><span className="lp-kick">THE PACKAGE</span></Reveal>
        <Reveal delay={60}><h2 className="lp-h2">One honest price. A scope that stays the price.</h2></Reveal>
        <div className="lp-pkg-grid">
          <Reveal className="lp-price">
            <div className="lp-price-tag">GET STARTED</div>
            <div className="lp-price-n"><span className="lp-gold">$1,000</span><span className="lp-price-f">flat · after you approve the demo</span></div>
            <ul className="lp-price-list">
              <li><span className="ok">✓</span> Working demo built <strong>first</strong>, free</li>
              <li><span className="ok">✓</span> Hand-coded — no templates, no no-code</li>
              <li><span className="ok">✓</span> Up to 5 pages + 1 core feature</li>
              <li><span className="ok">✓</span> Custom responsive UI/UX</li>
              <li><span className="ok">✓</span> Deployed live + you own the code</li>
            </ul>
            <button onClick={() => setLeadOpen(true)} className="btn btn-solid lp-price-btn">Start with a free demo</button>
            <div className="lp-price-foot">Pay $0 until the demo is approved.</div>
          </Reveal>
          <Reveal delay={100} className="lp-scope">
            <div className="lp-scope-col in">
              <h3><span className="ok">✓</span> Included in Starter</h3>
              <ul>
                <li>A custom-coded web app or website for one clear job</li>
                <li>Up to <strong>5 pages</strong> / screens</li>
                <li><strong>1 main feature</strong> (booking, intake, dashboard, CRM view…)</li>
                <li>Custom, responsive UI/UX — phone &amp; desktop</li>
                <li>Deployed live · full source code, <strong>you own it</strong></li>
              </ul>
            </div>
            <div className="lp-scope-col out">
              <h3><span className="plus">+</span> Add-ons (quoted separately)</h3>
              <ul>
                <li>Extra pages, features, or user roles</li>
                <li>Payments, logins, third-party integrations</li>
                <li>Ongoing support &amp; maintenance</li>
                <li>Larger multi-feature platforms (next phase)</li>
              </ul>
              <div className="lp-scope-note">The demo is the bridge: it proves the small build works — and shows what a bigger build could do.</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="lp-how" id="how">
        <Reveal><span className="lp-kick">HOW IT WORKS</span></Reveal>
        <Reveal delay={60}><h2 className="lp-h2">Three steps. You risk nothing until step three.</h2></Reveal>
        <div className="lp-steps">
          {[["Tell us your goal", "One quick call. Tell us the bottleneck you want gone — the manual process, the spreadsheet chaos, the thing eating your week.", "Free"],
            ["We build your custom demo", "We hand-code a working demo of your exact solution and put it in your hands. Click it, test it on real scenarios — at $0.", "Free"],
            ["Approve and go live", "Love it? Pay the flat $1,000 and we ship your production build. Don’t love it? Walk away owing nothing.", "$1,000"]].map(([t, d, tag], i) => (
            <Reveal key={t} delay={i * 90} className="lp-step">
              <div className="lp-step-n">{i + 1}</div>
              <div><div className="lp-step-h"><h3>{t}</h3><span className={`lp-tag ${tag === "$1,000" ? "paid" : "free"}`}>{tag}</span></div><p>{d}</p></div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="lp-pain" id="why">
        <Reveal><span className="lp-kick">WHY CUSTOM</span></Reveal>
        <Reveal delay={60}><h2 className="lp-h2">Off-the-shelf software wasn’t built for <span className="lp-grad">your</span> business.</h2></Reveal>
        <div className="lp-cards">
          {[["Paying for 60% fit", "You’re paying monthly for a tool that does most of what you need — and you work around the rest forever."],
            ["Spreadsheet duct-tape", "Your real ‘system’ is five spreadsheets, a group chat, and your memory. It breaks the day you’re out."],
            ["Your business in their box", "Generic SaaS makes you change how you operate. Custom flips it: the software fits how you already win."],
            ["No middle option", "Freelancers ghost. Agencies quote $25k+. There’s never been an affordable, low-risk path to real custom software — until now."]].map(([t, d], i) => (
            <Reveal key={t} delay={i * 70} className="lp-card"><div className="lp-card-n">0{i + 1}</div><h3>{t}</h3><p>{d}</p></Reveal>
          ))}
        </div>
      </section>

      <section className="lp-trust">
        <Reveal><span className="lp-kick">WHY TRUST US</span></Reveal>
        <Reveal delay={60}><h2 className="lp-h2">Operators with skin in the game — not anonymous freelancers.</h2></Reveal>
        <div className="lp-cards three">
          {[{ t: "Seneca", d: "We build and run our own software. Seneca is our own product — we feel every bug and win the same way you would.", href: "https://senecaoracle.com", link: "senecaoracle.com" },
            { t: "Traffic Miller Production", d: "Charlie built and runs Traffic Miller Production — real software shipped for a real operating business.", href: "https://trafficmillerproduction.com", link: "trafficmillerproduction.com" },
            { t: "Real operators", d: "10+ years scaling a $37M→$54M store program at The Home Depot, and a solo $20K→$60K/mo retail turnaround. We’ve made payroll." }].map((c, i) => (
            <Reveal key={c.t} delay={i * 70} className="lp-card">
              <div className="lp-dot" /><h3>{c.t}</h3><p>{c.d}</p>
              {c.href && <a className="lp-cardlink" href={c.href} target="_blank" rel="noreferrer">{c.link} →</a>}
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}><Link to="/operators" className="lp-link">Meet the operators →</Link></Reveal>
      </section>

      <section className="lp-faqs">
        <Reveal><span className="lp-kick">FAQ</span></Reveal>
        <Reveal delay={60}><h2 className="lp-h2">The $1,000 fee, the demo, and the fine print.</h2></Reveal>
        <div className="lp-faq-list">
          <Faq q="Is the demo really free?" a="Yes. We build a working demo of your requested app or website before you pay anything. You test it on real scenarios and only pay the $1,000 fee once you’ve approved it. Not right? You walk away owing nothing." />
          <Faq q="What’s included in the $1,000 Starter?" a="A hand-coded web app or website built around one clear job: up to 5 pages/screens, 1 main feature, custom responsive UI/UX, deployed live — and you own the source code. We define the scope with you up front so the price stays the price." />
          <Faq q="What counts as an add-on?" a="Anything beyond the Starter scope — extra features, logins, payments, integrations, additional pages, or a larger multi-feature platform. We quote those separately and transparently." />
          <Faq q="How does the demo process work?" a="Step 1: a short call to scope your goal. Step 2: we hand-code a focused, working demo for you to click through. Step 3: approve it, pay the flat $1,000, and we ship the production build." />
          <Faq q="How fast is turnaround?" a="Most Starter demos land in days, not months — we keep the scope tight and hand-code efficiently. You’ll get a clear timeline on the scoping call." />
          <Faq q="Do you use low-code or templates?" a="No. Everything is custom-coded. Template builders are quick to start but bloat, break, and box you in. Hand-coded software is faster, lighter, and fully yours." />
          <Faq q="Who owns the finished code?" a="You do. Once the Starter fee is paid, the source code is yours — no lock-in." />
        </div>
      </section>

      <section className="lp-final" id="start">
        <Reveal><div className="lp-final-box">
          <span className="lp-kick">LET’S BUILD</span>
          <h2 className="lp-h2">Tell us your goal. Get a free demo. Decide later.</h2>
          <p>No card. No commitment. You only pay $1,000 if you love what we build — and you own the code either way.</p>
          <div className="lp-cta center">
            <button onClick={() => setLeadOpen(true)} className="btn btn-solid btn-lg">Get my free demo</button>
            <a href={`tel:${PHONE_1.tel}`} className="btn btn-line btn-lg">✆ or call {PHONE_1.display}</a>
          </div>
          <div className="lp-final-foot">We build any software, for any business — large or small.</div>
        </div></Reveal>
      </section>

      <footer className="lp-foot">
        <div className="lp-brand"><Mark /><span className="lp-lock"><span>IROQUOIS</span><span className="lp-slogan">BUILD FOR THE FUTURE</span></span></div>
        <div className="lp-foot-c"><a href={`tel:${PHONE_1.tel}`}>{PHONE_1.display}</a><a href={`tel:${PHONE_2.tel}`}>{PHONE_2.display}</a></div>
        <div className="lp-foot-f">Custom-coded software · Demo first · You own it.</div>
      </footer>

      <LeadForm open={leadOpen} onClose={() => setLeadOpen(false)} />
    </div>
  );
}

const LANDING_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');
.lp{--ink:#06080F;--line:rgba(255,255,255,.08);--line2:rgba(255,255,255,.14);--text:#EEF1F6;--mid:#9BA6B8;--low:#5A6577;--mint:#34E3B0;--blue:#4D7CFF;--gold:#E9B36A;--mx:0;--my:0;position:relative;overflow:hidden;isolation:isolate;background:var(--ink);color:var(--text);font-family:'Hanken Grotesk',system-ui,sans-serif;-webkit-font-smoothing:antialiased;}
.lp *{box-sizing:border-box;} .lp a{text-decoration:none;color:inherit;}
.btn{display:inline-flex;align-items:center;gap:9px;border-radius:11px;font-weight:600;font-size:14px;cursor:pointer;border:none;white-space:nowrap;font-family:'Hanken Grotesk',sans-serif;transition:transform .18s,box-shadow .25s,border-color .2s,background .2s;text-decoration:none;}
.btn-ghost{padding:9px 14px;color:var(--mid);font-family:'JetBrains Mono';font-size:13px;} .btn-ghost:hover{color:var(--text);}
.btn-solid{padding:11px 18px;color:#04130D;background:linear-gradient(180deg,#5BF0C3,var(--mint));box-shadow:0 6px 24px -8px rgba(52,227,176,.6),inset 0 1px 0 rgba(255,255,255,.4);} .btn-solid:hover{transform:translateY(-1px);box-shadow:0 12px 34px -8px rgba(52,227,176,.7);}
.btn-line{padding:11px 18px;color:var(--text);border:1px solid var(--line2);background:rgba(255,255,255,.02);} .btn-line:hover{border-color:var(--mint);background:rgba(52,227,176,.06);}
.btn-lg{padding:15px 26px;font-size:15px;border-radius:13px;} .tri{color:var(--mint);font-size:12px;}

.lp-bg{position:absolute;inset:0;z-index:0;pointer-events:none;}
.lp-blob{position:fixed;border-radius:50%;filter:blur(95px);opacity:.5;}
.lp-blob.a{width:44vw;height:44vw;top:-12vw;right:-6vw;background:radial-gradient(circle at 30% 30%,var(--mint),transparent 62%);transform:translate3d(calc(var(--mx)*-24px),calc(var(--my)*-24px),0);}
.lp-blob.b{width:42vw;height:42vw;bottom:-16vw;left:-12vw;background:radial-gradient(circle at 60% 40%,var(--blue),transparent 60%);opacity:.32;transform:translate3d(calc(var(--mx)*20px),calc(var(--my)*20px),0);}
.lp-grid{position:fixed;inset:0;background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:62px 62px;mask-image:radial-gradient(ellipse 95% 55% at 50% 0%,#000,transparent 75%);-webkit-mask-image:radial-gradient(ellipse 95% 55% at 50% 0%,#000,transparent 75%);opacity:.4;}
.lp-grain{position:fixed;inset:0;opacity:.045;mix-blend-mode:overlay;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");}
.lp-vig{position:fixed;inset:0;background:radial-gradient(ellipse 120% 70% at 50% -10%,transparent 45%,var(--ink) 95%);}
.lp-feather{position:absolute;top:40px;right:-30px;width:min(38vw,540px);opacity:.13;animation:lpfloat 12s ease-in-out infinite;transform-origin:top center;}
@keyframes lpfloat{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-18px) rotate(1.5deg)}}

.lp-ticker{position:relative;z-index:3;border-bottom:1px solid var(--line);overflow:hidden;background:rgba(255,255,255,.015);}
.lp-track{display:inline-flex;white-space:nowrap;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.22em;color:var(--low);padding:8px 0;animation:ticker 28s linear infinite;}
@keyframes ticker{to{transform:translateX(-50%)}}

.lp-nav{position:relative;z-index:3;display:flex;align-items:center;justify-content:space-between;gap:24px;max-width:1180px;margin:0 auto;padding:22px clamp(20px,4vw,44px);}
.lp-brand{display:flex;align-items:center;gap:10px;font-family:'Bricolage Grotesque';font-weight:700;letter-spacing:.16em;font-size:16px;}
.lp-lock{display:flex;flex-direction:column;line-height:1;gap:3px;}
.lp-slogan{font-family:'JetBrains Mono',monospace;font-weight:500;font-size:8.5px;letter-spacing:.26em;color:var(--mint);}
.lp-links{display:flex;gap:28px;font-size:14px;color:var(--mid);font-weight:500;} .lp-links a:hover{color:var(--text);}
.lp-navcta{display:flex;align-items:center;gap:10px;}

.lp-hero{position:relative;z-index:2;max-width:980px;margin:0 auto;padding:clamp(40px,7vw,96px) clamp(20px,4vw,44px) 0;}
.lp-brk{position:absolute;width:26px;height:26px;border:2px solid rgba(52,227,176,.5);}
.lp-brk.tl{top:clamp(28px,5vw,70px);left:clamp(8px,3vw,30px);border-right:0;border-bottom:0;}
.lp-brk.br{bottom:-10px;right:clamp(8px,3vw,30px);border-left:0;border-top:0;}
.lp-eyebrow{display:inline-flex;align-items:center;gap:9px;font-size:13px;font-weight:600;color:var(--mid);border:1px solid var(--line);border-radius:100px;padding:7px 14px;background:rgba(255,255,255,.02);}
.lp-eyebrow .dot{width:7px;height:7px;border-radius:50%;background:var(--mint);box-shadow:0 0 0 0 rgba(52,227,176,.6);animation:pulse 2.4s infinite;}
@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(52,227,176,.5)}70%{box-shadow:0 0 0 8px rgba(52,227,176,0)}100%{box-shadow:0 0 0 0 rgba(52,227,176,0)}}
.lp-h1{font-family:'Bricolage Grotesque';font-weight:800;font-size:clamp(38px,6.4vw,80px);line-height:1.0;letter-spacing:-.03em;margin:22px 0 0;}
.lp-mask{display:block;overflow:hidden;}
.lp-up{display:inline-block;transform:translateY(114%);animation:lpup .95s cubic-bezier(.16,1,.3,1) forwards;animation-delay:var(--d);}
@keyframes lpup{to{transform:translateY(0)}}
.lp-grad{background:linear-gradient(100deg,var(--mint),#7FF0FF 55%,var(--blue));-webkit-background-clip:text;background-clip:text;color:transparent;}
.lp-gold{color:var(--gold);}
.lp-sub{color:var(--mid);font-size:clamp(16px,1.6vw,19px);line-height:1.62;max-width:38em;margin:24px 0 0;} .lp-sub strong{color:var(--text);}
.lp-cta{display:flex;flex-wrap:wrap;gap:14px;margin:32px 0 0;} .lp-cta.center{justify-content:center;}
.lp-proof{margin:38px 0 0;} .lp-plabel{display:block;font-size:11px;letter-spacing:.14em;color:var(--low);font-family:'JetBrains Mono';margin-bottom:11px;}
.lp-logos{display:flex;align-items:center;gap:14px;flex-wrap:wrap;font-family:'JetBrains Mono';font-size:12px;color:var(--mid);letter-spacing:.04em;} .lp-logos i{width:1px;height:12px;background:var(--line2);}
.lp-load{opacity:0;transform:translateY(12px);animation:lpload .7s ease forwards;animation-delay:var(--d);}
@keyframes lpload{to{opacity:1;transform:none}}

.lp-film-sec{position:relative;z-index:2;max-width:1080px;margin:clamp(60px,8vw,110px) auto 0;padding:0 clamp(20px,4vw,44px);}
.lp-sechead{margin-bottom:30px;} .lp-film-wrap{position:relative;}
.lp-kick{font-family:'JetBrains Mono',monospace;font-size:11.5px;letter-spacing:.18em;color:var(--mint);}
.lp-h2{font-family:'Bricolage Grotesque';font-weight:700;letter-spacing:-.02em;font-size:clamp(25px,3.4vw,42px);margin:12px 0 0;line-height:1.06;max-width:18em;}

.lp-pkg,.lp-how,.lp-pain,.lp-trust,.lp-faqs{position:relative;z-index:2;max-width:1180px;margin:clamp(70px,9vw,120px) auto 0;padding:0 clamp(20px,4vw,44px);}
.lp-pkg-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:18px;margin-top:36px;}
.lp-price{border:1px solid var(--line2);border-radius:20px;padding:28px;background:linear-gradient(180deg,rgba(21,27,41,.85),rgba(10,14,24,.85));box-shadow:0 30px 70px -34px rgba(0,0,0,.8);}
.lp-price-tag{font-family:'JetBrains Mono';font-size:11px;letter-spacing:.12em;color:var(--mint);}
.lp-price-n{display:flex;align-items:baseline;gap:10px;margin:12px 0 18px;} .lp-price-n>span:first-child{font-family:'Bricolage Grotesque';font-weight:800;font-size:46px;line-height:1;} .lp-price-f{font-size:12px;color:var(--mid);}
.lp-price-list{list-style:none;margin:0 0 22px;padding:0;display:grid;gap:11px;} .lp-price-list li{display:flex;gap:10px;font-size:14px;color:var(--mid);} .lp-price-list strong{color:var(--text);} .ok{color:var(--mint);} .plus{color:var(--gold);}
.lp-price-btn{width:100%;justify-content:center;} .lp-price-foot{text-align:center;font-size:12px;color:var(--low);margin-top:12px;}
.lp-scope{display:grid;grid-template-rows:1fr 1fr;gap:14px;}
.lp-scope-col{border:1px solid var(--line);border-radius:16px;padding:22px;} .lp-scope-col.in{background:linear-gradient(180deg,rgba(52,227,176,.06),transparent);border-color:rgba(52,227,176,.2);}
.lp-scope-col h3{font-family:'Bricolage Grotesque';font-size:16px;display:flex;align-items:center;gap:9px;margin-bottom:14px;} .lp-scope-col.out h3{color:var(--mid);}
.lp-scope-col ul{list-style:none;margin:0;padding:0;display:grid;gap:9px;} .lp-scope-col li{font-size:13.5px;color:var(--mid);line-height:1.45;padding-left:16px;position:relative;} .lp-scope-col li:before{content:"–";position:absolute;left:0;color:var(--low);} .lp-scope-col strong{color:var(--text);}
.lp-scope-note{margin-top:14px;padding-top:12px;border-top:1px solid var(--line);font-size:12.5px;color:var(--low);font-style:italic;}

.lp-steps{display:grid;gap:14px;margin-top:36px;}
.lp-step{display:flex;gap:20px;border:1px solid var(--line);border-radius:16px;padding:22px 24px;background:linear-gradient(180deg,rgba(21,27,41,.5),rgba(10,14,24,.35));transition:border-color .3s;} .lp-step:hover{border-color:var(--line2);}
.lp-step-n{font-family:'Bricolage Grotesque';font-weight:800;font-size:32px;color:var(--mint);line-height:1;min-width:34px;}
.lp-step-h{display:flex;align-items:center;gap:12px;flex-wrap:wrap;} .lp-step-h h3{font-family:'Bricolage Grotesque';font-size:19px;}
.lp-tag{font-family:'JetBrains Mono';font-size:11px;padding:4px 9px;border-radius:7px;} .lp-tag.free{color:var(--mint);background:rgba(52,227,176,.1);border:1px solid rgba(52,227,176,.25);} .lp-tag.paid{color:var(--gold);background:rgba(233,179,106,.1);border:1px solid rgba(233,179,106,.3);}
.lp-step p{font-size:14px;color:var(--mid);line-height:1.55;margin-top:8px;}

.lp-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:36px;} .lp-cards.three{grid-template-columns:repeat(3,1fr);}
.lp-card{border:1px solid var(--line);border-radius:16px;padding:22px;background:linear-gradient(180deg,rgba(21,27,41,.5),rgba(10,14,24,.35));transition:border-color .3s,transform .3s;} .lp-card:hover{border-color:var(--line2);transform:translateY(-3px);}
.lp-card-n{font-family:'JetBrains Mono';font-size:12px;color:var(--mint);} .lp-card h3{font-family:'Bricolage Grotesque';font-size:17px;margin:12px 0 8px;} .lp-card p{font-size:13.5px;color:var(--mid);line-height:1.5;}
.lp-dot{width:9px;height:9px;border-radius:50%;background:var(--mint);box-shadow:0 0 14px var(--mint);}
.lp-cardlink{display:inline-block;margin-top:12px;color:var(--mint);font-weight:600;font-size:13px;}
.lp-cardlink:hover{text-decoration:underline;}
.lp-link{display:inline-block;margin-top:24px;color:var(--mint);font-weight:600;font-size:14px;}

.lp-faq-list{margin-top:36px;border-top:1px solid var(--line);}
.lp-faq{border-bottom:1px solid var(--line);padding:20px 0;cursor:pointer;}
.lp-faq-q{display:flex;justify-content:space-between;align-items:center;gap:16px;font-family:'Bricolage Grotesque';font-size:17px;font-weight:600;} .lp-faq-p{color:var(--mint);font-size:22px;line-height:1;}
.lp-faq-a{max-height:0;overflow:hidden;transition:max-height .35s ease,margin .35s;} .lp-faq.open .lp-faq-a{max-height:240px;margin-top:12px;} .lp-faq-a p{font-size:14.5px;color:var(--mid);line-height:1.6;max-width:60em;}

.lp-final{position:relative;z-index:2;max-width:1180px;margin:clamp(80px,10vw,130px) auto 0;padding:0 clamp(20px,4vw,44px);}
.lp-final-box{border:1px solid var(--line2);border-radius:24px;padding:clamp(36px,5vw,64px);text-align:center;background:radial-gradient(ellipse 80% 120% at 50% 0%,rgba(52,227,176,.12),transparent 70%),linear-gradient(180deg,rgba(21,27,41,.7),rgba(10,14,24,.6));}
.lp-final-box .lp-h2{margin:12px auto 0;max-width:18em;} .lp-final-box p{color:var(--mid);font-size:16px;line-height:1.6;margin:18px auto 0;max-width:44em;} .lp-final-foot{margin-top:22px;font-family:'JetBrains Mono';font-size:12px;letter-spacing:.06em;color:var(--low);}

.lp-foot{position:relative;z-index:2;max-width:1180px;margin:60px auto 0;padding:30px clamp(20px,4vw,44px);border-top:1px solid var(--line);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;}
.lp-foot .lp-brand{font-family:'Bricolage Grotesque';font-weight:700;letter-spacing:.16em;font-size:15px;display:flex;align-items:center;gap:9px;}
.lp-foot-c{display:flex;gap:20px;font-family:'JetBrains Mono';font-size:13px;color:var(--mid);} .lp-foot-c a:hover{color:var(--mint);} .lp-foot-f{font-size:12px;color:var(--low);}

.lp-rv{opacity:0;transform:translateY(20px);transition:opacity .7s cubic-bezier(.2,.6,.2,1),transform .7s cubic-bezier(.2,.6,.2,1);} .lp-rv.in{opacity:1;transform:none;}

@media(max-width:960px){.lp-pkg-grid{grid-template-columns:1fr;}.lp-cards{grid-template-columns:1fr 1fr;}.lp-cards.three{grid-template-columns:1fr;}.lp-links{display:none;}.lp-feather{opacity:.08;}}
@media(max-width:640px){.lp-cards{grid-template-columns:1fr;}.lp-navcta .btn-ghost{display:none;}.lp-step{flex-direction:column;gap:12px;}}
@media(prefers-reduced-motion:reduce){.lp-up{transform:none!important;animation:none!important;}.lp-load,.lp-rv{opacity:1!important;transform:none!important;animation:none!important;}.lp-feather,.lp-track,.lp-eyebrow .dot{animation:none!important;}}
`;
