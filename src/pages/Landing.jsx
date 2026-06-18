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
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.18 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`lp-rv ${shown ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function useCountUp(target, { duration = 1700, decimals = 0 } = {}) {
  const ref = useRef(null);
  const [v, setV] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(target); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const t0 = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - t0) / duration);
          setV(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    io.observe(el); return () => io.disconnect();
  }, [target, duration]);
  return [ref, decimals ? v.toFixed(decimals) : Math.round(v)];
}

function Stat({ prefix = "", target, suffix = "", label, decimals = 0, accent }) {
  const [ref, v] = useCountUp(target, { decimals });
  return (
    <div ref={ref} className="lp-stat">
      <div className="lp-statn" style={accent ? { color: "var(--gold)" } : undefined}>{prefix}{v}{suffix}</div>
      <div className="lp-statl">{label}</div>
    </div>
  );
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
  const [leadOpen, setLeadOpen] = useState(false);
  const openLead = () => setLeadOpen(true);

  return (
    <div className="lp">
      <style>{LANDING_CSS}</style>

      <div className="lp-bg" aria-hidden>
        <div className="lp-glow" />
        <div className="lp-grid" />
        <div className="lp-grain" />
        <svg className="lp-feather" viewBox="0 0 200 360" fill="none">
          <path d="M100 12 C150 90 148 230 112 340 L88 348 C52 230 50 90 100 12 Z" stroke="url(#lf)" strokeWidth="1.2" />
          <path d="M100 26 L94 344" stroke="#34E3B0" strokeWidth="0.9" />
          {Array.from({ length: 11 }).map((_, i) => { const y = 60 + i * 26; return <g key={i}><path d={`M98 ${y} L${140 - i * 2} ${y - 14}`} stroke="#34E3B0" strokeWidth="0.7" /><path d={`M100 ${y} L${60 + i * 2} ${y - 14}`} stroke="#34E3B0" strokeWidth="0.7" /></g>; })}
          <defs><linearGradient id="lf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#34E3B0" /><stop offset="1" stopColor="#4D7CFF" /></linearGradient></defs>
        </svg>
      </div>

      {/* nav */}
      <header className="lp-nav">
        <a className="lp-brand" href="#top"><Mark glow /><span className="lp-lock"><span>IROQUOIS</span><span className="lp-slogan">BUILD FOR THE FUTURE</span></span></a>
        <nav className="lp-links"><a href="#film">Demo</a><a href="#partner">Partnership</a><a href="#pricing">Pricing</a><Link to="/operators">Operators</Link></nav>
        <button onClick={openLead} className="btn btn-solid">Get my free demo</button>
      </header>

      {/* hero — partner framing */}
      <main className="lp-hero" id="top">
        <Reveal><div className="lp-kick">YOUR GROWTH PARTNER — NOT JUST A BUILDER</div></Reveal>
        <h1 className="lp-h1">
          <span className="lp-line"><span className="lp-up" style={{ "--d": "60ms" }}>We don’t build</span></span>
          <span className="lp-line"><span className="lp-up" style={{ "--d": "190ms" }}>and leave. <span className="lp-grad">We grow with you.</span></span></span>
        </h1>
        <Reveal delay={320}><p className="lp-sub">Custom websites from <span className="lp-gold">$300</span> — hosting and domain included. Apps, CRMs, and dashboards from <span className="lp-gold">$500</span>. We start with a working demo, free — then stay on as the team that keeps improving it as your business grows. You own everything.</p></Reveal>
        <Reveal delay={440}><div className="lp-cta"><button onClick={openLead} className="btn btn-solid btn-lg">Get my free demo</button><a href="#film" className="lp-text-link">Watch how it works ↓</a></div></Reveal>
        <a href="#statement" className="lp-scroll" aria-label="Scroll"><span /></a>
      </main>

      {/* statement — partner one-idea */}
      <section className="lp-statement" id="statement">
        <Reveal><h2 className="lp-big">Most developers build it, cash the check, and <span className="lp-grad">disappear.</span></h2></Reveal>
        <Reveal delay={150}><p className="lp-big-sub">We’re not a vendor — we’re your growth partner. We treat your business like our own and keep building as you scale.</p></Reveal>
      </section>

      {/* product reveal */}
      <section className="lp-film-sec" id="film">
        <Reveal><div className="lp-kick center">WATCH IT HAPPEN</div></Reveal>
        <Reveal delay={80}><h2 className="lp-h2 center">From idea to income.</h2></Reveal>
        <Reveal delay={140} className="lp-film-wrap"><DemoFilm /></Reveal>
      </section>

      {/* authority */}
      <section className="lp-stats-sec">
        <Reveal><div className="lp-kick center">WE’VE GROWN REAL BUSINESSES</div></Reveal>
        <div className="lp-stats">
          <Stat prefix="$" target={54} suffix="M" accent label="Annual store revenue scaled at The Home Depot" />
          <Stat target={20} suffix="%" label="Fewer delivery errors from the program we piloted" />
          <Stat prefix="$" target={60} suffix="K/mo" accent label="Solo turnaround of an independent retailer" />
        </div>
      </section>

      {/* pricing — accessible + scalable */}
      <section className="lp-package" id="pricing">
        <Reveal><div className="lp-kick center">SIMPLE PRICING · REAL PARTNERSHIP</div></Reveal>
        <Reveal delay={80}><h2 className="lp-h2 center">Start small. Scale with us.</h2></Reveal>
        <Reveal delay={140}><p className="lp-h2-sub">You see a working demo first — and only pay once you approve it. Then we stay on as your growth partner.</p></Reveal>
        <div className="lp-pkg-grid">
          <Reveal className="lp-pkg-col tier in">
            <div className="lp-tier-tag">WEBSITES</div>
            <div className="lp-tier-price">from <span className="lp-gold">$300</span></div>
            <p className="lp-tier-note">Hosting &amp; domain name included.</p>
            <ul>
              <li>Custom design — modern, fast, mobile &amp; desktop</li>
              <li><strong>Hosting + domain included</strong></li>
              <li>Live on your own web address</li>
              <li>Full ownership — it’s yours</li>
              <li>Built from a free demo first</li>
            </ul>
            <button onClick={openLead} className="btn btn-solid lp-pkg-btn">Get my free demo</button>
          </Reveal>
          <Reveal delay={100} className="lp-pkg-col tier">
            <div className="lp-tier-tag">APPS &amp; SOFTWARE</div>
            <div className="lp-tier-price"><span className="lp-gold">$500–$1,500</span></div>
            <p className="lp-tier-note">CRMs, dashboards, internal tools — scoped to you.</p>
            <ul>
              <li>Custom-coded to your exact workflow</li>
              <li>CRMs, dashboards, automation, internal tools</li>
              <li>Priced by scope — you’ll know up front</li>
              <li>You own the source code</li>
              <li>Built from a free demo first</li>
            </ul>
            <button onClick={openLead} className="btn btn-line lp-pkg-btn">Get my free demo</button>
          </Reveal>
        </div>
        <Reveal delay={160}><p className="lp-pkg-foot">And we don’t stop at launch — we keep improving and expanding it as you grow.</p></Reveal>
      </section>

      {/* partnership */}
      <section className="lp-partner" id="partner">
        <Reveal><div className="lp-kick">WHAT “PARTNER” MEANS</div></Reveal>
        <Reveal delay={60}><h2 className="lp-h2">We don’t disappear after launch.</h2></Reveal>
        <div className="lp-cards">
          {[["We stay on", "Launch is the start, not the finish. We keep refining, fixing, and adding as your business changes — you’re never left holding broken code."],
            ["We grow with you", "Begin with a $300 site, then scale into apps, dashboards, and automation when you’re ready. One team the whole way up."],
            ["Your tech team, on call", "Skip hiring a developer. You get an operator-led build team whenever you need one — that actually understands business."]].map(([t, d], i) => (
            <Reveal key={t} delay={i * 80} className="lp-card"><div className="lp-dot" /><h3>{t}</h3><p>{d}</p></Reveal>
          ))}
        </div>
      </section>

      {/* how it works */}
      <section className="lp-how" id="how">
        <Reveal><div className="lp-kick">HOW IT WORKS</div></Reveal>
        <Reveal delay={60}><h2 className="lp-h2">Three steps. You risk nothing until you’ve seen it.</h2></Reveal>
        <div className="lp-steps">
          {[["Tell us your goal", "One call. Name what you want — a website, a CRM, a dashboard, or the bottleneck eating your week.", "Free"],
            ["We build your demo", "We hand-code a working demo of your exact solution and put it in your hands. Click it, test it, judge it — at $0.", "Free"],
            ["Go live — and keep growing", "Approve it and we ship it live. Then we stay on as your partner, improving and expanding it as your business grows.", "From $300"]].map(([t, d, tag], i) => (
            <Reveal key={t} delay={i * 90} className="lp-step">
              <div className="lp-step-n">{String(i + 1).padStart(2, "0")}</div>
              <div className="lp-step-b"><div className="lp-step-h"><h3>{t}</h3><span className={`lp-tag ${tag === "Free" ? "free" : "paid"}`}>{tag}</span></div><p>{d}</p></div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* trust */}
      <section className="lp-trust">
        <Reveal><div className="lp-kick">PROOF WE SHIP</div></Reveal>
        <Reveal delay={60}><h2 className="lp-h2">We build for ourselves — not just for clients.</h2></Reveal>
        <div className="lp-cards">
          {[{ t: "Seneca", d: "Our own product, built and run in-house. We feel every bug and every win the same way you would.", href: "https://senecaoracle.com", link: "senecaoracle.com" },
            { t: "Traffic Miller Production", d: "Charlie built and runs it — real software shipped for a real operating business.", href: "https://trafficmillerproduction.com", link: "trafficmillerproduction.com" },
            { t: "Real operators", d: "A decade scaling a $37M→$54M store program, and a solo $20K→$60K/mo retail turnaround. We’ve made payroll." }].map((c, i) => (
            <Reveal key={c.t} delay={i * 80} className="lp-card">
              <div className="lp-dot" /><h3>{c.t}</h3><p>{c.d}</p>
              {c.href && <a className="lp-cardlink" href={c.href} target="_blank" rel="noreferrer">{c.link} →</a>}
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}><Link to="/operators" className="lp-link-lg">Meet the operators →</Link></Reveal>
      </section>

      {/* faq */}
      <section className="lp-faqs">
        <Reveal><div className="lp-kick">QUESTIONS</div></Reveal>
        <Reveal delay={60}><h2 className="lp-h2">Pricing, the demo, and the partnership.</h2></Reveal>
        <div className="lp-faq-list">
          <Faq q="How much does it cost?" a="Websites start at $300, with hosting and a domain name included. Custom apps and software — CRMs, dashboards, internal tools — run $500 to $1,500 depending on scope. You see a working demo first and only pay once you approve it." />
          <Faq q="Is the demo really free?" a="Yes. We build a working demo before you pay anything, and you only pay once you’ve seen, tested, and approved it. Not right? You walk away owing nothing." />
          <Faq q="Do you stick around after launch?" a="That’s the whole point. We’re a growth partner, not a one-and-done vendor — we keep refining and adding features as your business grows, and you’re never left with broken code." />
          <Faq q="Can I start small and scale up?" a="Absolutely. Many clients start with a $300 website and grow into apps, dashboards, and automation with us over time. Same team the whole way." />
          <Faq q="Do you use templates or no-code?" a="No. Everything is custom-coded — faster, lighter, and fully yours to grow. Template builders bloat, break, and box you in." />
          <Faq q="Who owns the code?" a="You do, the moment you approve and pay. No lock-in, ever." />
        </div>
      </section>

      {/* final */}
      <section className="lp-final" id="start">
        <Reveal><div className="lp-final-box">
          <h2 className="lp-big">Let’s grow your<br />business — together.</h2>
          <p className="lp-big-sub center">Start with a free demo. No card, no commitment — and a partner who’s in it for the long haul.</p>
          <div className="lp-cta center">
            <button onClick={openLead} className="btn btn-solid btn-lg">Get my free demo</button>
            <a href={`tel:${PHONE_1.tel}`} className="btn btn-line btn-lg">✆ or call {PHONE_1.display}</a>
          </div>
        </div></Reveal>
      </section>

      <footer className="lp-foot">
        <div className="lp-brand"><Mark /><span className="lp-lock"><span>IROQUOIS</span><span className="lp-slogan">BUILD FOR THE FUTURE</span></span></div>
        <div className="lp-foot-c"><a href={`tel:${PHONE_1.tel}`}>{PHONE_1.display}</a><a href={`tel:${PHONE_2.tel}`}>{PHONE_2.display}</a></div>
        <div className="lp-foot-f">Custom websites &amp; software · Demo first · Your growth partner.</div>
      </footer>

      <LeadForm open={leadOpen} onClose={() => setLeadOpen(false)} />
    </div>
  );
}

const LANDING_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');
.lp{--ink:#05070C;--ink2:#080B12;--line:rgba(255,255,255,.08);--line2:rgba(255,255,255,.16);--text:#F4F6FA;--mid:#9BA6B8;--low:#5A6577;--mint:#34E3B0;--blue:#4D7CFF;--gold:#E9B36A;position:relative;overflow:hidden;isolation:isolate;background:var(--ink);color:var(--text);font-family:'Hanken Grotesk',system-ui,sans-serif;-webkit-font-smoothing:antialiased;}
.lp *{box-sizing:border-box;} .lp a{text-decoration:none;color:inherit;}
.btn{display:inline-flex;align-items:center;gap:9px;border-radius:12px;font-weight:600;font-size:14px;cursor:pointer;border:none;white-space:nowrap;font-family:'Hanken Grotesk',sans-serif;transition:transform .18s,box-shadow .25s,border-color .2s,background .2s;}
.btn-solid{padding:12px 20px;color:#04130D;background:linear-gradient(180deg,#5BF0C3,var(--mint));box-shadow:0 8px 30px -10px rgba(52,227,176,.7),inset 0 1px 0 rgba(255,255,255,.4);}
.btn-solid:hover{transform:translateY(-1px);box-shadow:0 16px 44px -12px rgba(52,227,176,.8);}
.btn-line{padding:12px 20px;color:var(--text);border:1px solid var(--line2);background:rgba(255,255,255,.02);} .btn-line:hover{border-color:var(--mint);background:rgba(52,227,176,.06);}
.btn-lg{padding:17px 32px;font-size:16px;border-radius:14px;}

.lp-bg{position:fixed;inset:0;z-index:0;pointer-events:none;}
.lp-glow{position:absolute;top:-20vh;left:50%;transform:translateX(-50%);width:90vw;height:80vh;background:radial-gradient(ellipse at center,rgba(52,227,176,.16),rgba(77,124,255,.06) 40%,transparent 70%);filter:blur(40px);}
.lp-grid{position:absolute;inset:0;background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:70px 70px;mask-image:radial-gradient(ellipse 90% 60% at 50% 0%,#000,transparent 70%);-webkit-mask-image:radial-gradient(ellipse 90% 60% at 50% 0%,#000,transparent 70%);opacity:.35;}
.lp-grain{position:absolute;inset:0;opacity:.04;mix-blend-mode:overlay;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");}
.lp-feather{position:absolute;top:8vh;right:-4vw;width:min(34vw,460px);opacity:.10;animation:lpfloat 13s ease-in-out infinite;}
@keyframes lpfloat{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-20px) rotate(1.5deg)}}

.lp-nav{position:sticky;top:0;z-index:50;display:flex;align-items:center;justify-content:space-between;gap:24px;padding:16px clamp(20px,5vw,56px);background:rgba(5,7,12,.6);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid var(--line);}
.lp-brand{display:flex;align-items:center;gap:10px;font-family:'Bricolage Grotesque';font-weight:700;letter-spacing:.16em;font-size:15px;}
.lp-lock{display:flex;flex-direction:column;line-height:1;gap:3px;} .lp-slogan{font-family:'JetBrains Mono',monospace;font-weight:500;font-size:8px;letter-spacing:.26em;color:var(--mint);}
.lp-links{display:flex;gap:30px;font-size:14px;color:var(--mid);font-weight:500;} .lp-links a:hover{color:var(--text);}

.lp-hero{position:relative;z-index:2;min-height:calc(100svh - 70px);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px clamp(20px,5vw,56px) 80px;}
.lp-kick{font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.24em;color:var(--mint);} .lp-kick.center{text-align:center;}
.lp-h1{font-family:'Bricolage Grotesque';font-weight:800;font-size:clamp(44px,9vw,108px);line-height:.96;letter-spacing:-.04em;margin:24px 0 0;max-width:13em;}
.lp-line{display:block;overflow:hidden;}
.lp-up{display:inline-block;transform:translateY(115%);animation:lpup 1s cubic-bezier(.16,1,.3,1) forwards;animation-delay:var(--d);}
@keyframes lpup{to{transform:translateY(0)}}
.lp-grad{background:linear-gradient(100deg,var(--mint),#7FF0FF 55%,var(--blue));-webkit-background-clip:text;background-clip:text;color:transparent;}
.lp-gold{color:var(--gold);}
.lp-sub{color:var(--mid);font-size:clamp(17px,2vw,21px);line-height:1.6;max-width:36em;margin:30px auto 0;} .lp-sub strong{color:var(--text);}
.lp-cta{display:flex;flex-wrap:wrap;gap:18px;align-items:center;justify-content:center;margin:40px 0 0;} .lp-cta.center{justify-content:center;}
.lp-text-link{color:var(--mid);font-size:15px;font-weight:500;transition:color .2s;} .lp-text-link:hover{color:var(--mint);}
.lp-scroll{position:absolute;bottom:26px;left:50%;transform:translateX(-50%);width:24px;height:38px;border:1.5px solid var(--line2);border-radius:13px;display:flex;justify-content:center;padding-top:7px;}
.lp-scroll span{width:3px;height:7px;border-radius:2px;background:var(--mint);animation:lpscroll 1.7s ease-in-out infinite;}
@keyframes lpscroll{0%{opacity:0;transform:translateY(-3px)}40%{opacity:1}100%{opacity:0;transform:translateY(10px)}}

.lp-statement,.lp-final{position:relative;z-index:2;max-width:1100px;margin:0 auto;padding:clamp(90px,16vh,200px) clamp(20px,5vw,56px);text-align:center;}
.lp-big{font-family:'Bricolage Grotesque';font-weight:800;font-size:clamp(34px,6.5vw,82px);line-height:1.02;letter-spacing:-.03em;max-width:16em;margin:0 auto;}
.lp-big-sub{color:var(--mid);font-size:clamp(17px,2.1vw,24px);line-height:1.5;max-width:30em;margin:28px auto 0;} .lp-big-sub em{color:var(--text);font-style:normal;} .lp-big-sub.center{text-align:center;}

.lp-film-sec{position:relative;z-index:2;max-width:1120px;margin:0 auto;padding:clamp(40px,8vh,90px) clamp(20px,5vw,56px);}
.lp-h2{font-family:'Bricolage Grotesque';font-weight:700;letter-spacing:-.025em;font-size:clamp(28px,4.2vw,56px);line-height:1.04;margin:14px 0 0;max-width:16em;} .lp-h2.center{text-align:center;margin-left:auto;margin-right:auto;}
.lp-h2-sub{color:var(--mid);font-size:clamp(15px,1.7vw,19px);line-height:1.55;max-width:34em;margin:18px auto 0;text-align:center;}
.lp-film-wrap{margin-top:44px;}

.lp-stats-sec{position:relative;z-index:2;max-width:1120px;margin:0 auto;padding:clamp(70px,12vh,150px) clamp(20px,5vw,56px);text-align:center;}
.lp-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:48px;}
.lp-stat{padding:20px;border-left:1px solid var(--line);} .lp-stat:first-child{border-left:0;}
.lp-statn{font-family:'Bricolage Grotesque';font-weight:800;font-size:clamp(40px,7vw,84px);letter-spacing:-.03em;line-height:1;}
.lp-statl{font-size:13.5px;color:var(--mid);margin-top:14px;line-height:1.45;max-width:18em;margin-left:auto;margin-right:auto;}

.lp-package{position:relative;z-index:2;max-width:1120px;margin:0 auto;padding:clamp(60px,10vh,120px) clamp(20px,5vw,56px);text-align:center;}
.lp-pkg-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:50px;text-align:left;}
.lp-pkg-col{border:1px solid var(--line);border-radius:20px;padding:32px;} .lp-pkg-col.in{background:linear-gradient(180deg,rgba(52,227,176,.07),transparent);border-color:rgba(52,227,176,.25);}
.lp-tier-tag{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.16em;color:var(--mint);}
.lp-tier-price{font-family:'Bricolage Grotesque';font-weight:800;font-size:clamp(32px,5vw,46px);line-height:1;margin:12px 0 4px;}
.lp-tier-note{font-size:13.5px;color:var(--mid);margin:0 0 20px;}
.lp-pkg-col ul{list-style:none;margin:0;padding:0;display:grid;gap:12px;} .lp-pkg-col.tier li{font-size:14.5px;color:var(--mid);line-height:1.5;padding-left:22px;position:relative;} .lp-pkg-col.tier li:before{content:"✓";position:absolute;left:0;color:var(--mint);font-weight:700;} .lp-pkg-col strong{color:var(--text);}
.lp-pkg-btn{width:100%;justify-content:center;margin-top:24px;}
.lp-pkg-foot{color:var(--mid);font-size:15px;margin-top:30px;max-width:40em;margin-left:auto;margin-right:auto;}

.lp-partner,.lp-how,.lp-trust,.lp-faqs{position:relative;z-index:2;max-width:1120px;margin:0 auto;padding:clamp(60px,10vh,120px) clamp(20px,5vw,56px);}
.lp-steps{display:grid;gap:16px;margin-top:50px;}
.lp-step{display:flex;gap:28px;align-items:flex-start;border-top:1px solid var(--line);padding:28px 4px;}
.lp-step-n{font-family:'Bricolage Grotesque';font-weight:800;font-size:clamp(28px,4vw,46px);color:var(--mint);line-height:1;min-width:1.6em;}
.lp-step-h{display:flex;align-items:center;gap:14px;flex-wrap:wrap;} .lp-step-h h3{font-family:'Bricolage Grotesque';font-weight:700;font-size:clamp(20px,2.6vw,28px);}
.lp-tag{font-family:'JetBrains Mono';font-size:11px;padding:4px 10px;border-radius:7px;} .lp-tag.free{color:var(--mint);background:rgba(52,227,176,.1);border:1px solid rgba(52,227,176,.25);} .lp-tag.paid{color:var(--gold);background:rgba(233,179,106,.1);border:1px solid rgba(233,179,106,.3);}
.lp-step-b p{font-size:15px;color:var(--mid);line-height:1.55;margin-top:10px;max-width:40em;}

.lp-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:48px;}
.lp-card{border:1px solid var(--line);border-radius:18px;padding:28px;background:linear-gradient(180deg,rgba(20,26,40,.5),rgba(8,11,18,.35));transition:border-color .3s,transform .3s;} .lp-card:hover{border-color:var(--line2);transform:translateY(-4px);}
.lp-dot{width:9px;height:9px;border-radius:50%;background:var(--mint);box-shadow:0 0 16px var(--mint);} .lp-card h3{font-family:'Bricolage Grotesque';font-weight:700;font-size:19px;margin:16px 0 9px;} .lp-card p{font-size:14px;color:var(--mid);line-height:1.55;}
.lp-cardlink{display:inline-block;margin-top:14px;color:var(--mint);font-weight:600;font-size:13.5px;} .lp-cardlink:hover{text-decoration:underline;}
.lp-link-lg{display:inline-block;margin-top:32px;color:var(--mint);font-weight:600;font-size:16px;}

.lp-faq-list{margin-top:44px;border-top:1px solid var(--line);}
.lp-faq{border-bottom:1px solid var(--line);padding:24px 0;cursor:pointer;}
.lp-faq-q{display:flex;justify-content:space-between;align-items:center;gap:16px;font-family:'Bricolage Grotesque';font-weight:600;font-size:clamp(17px,2vw,21px);} .lp-faq-p{color:var(--mint);font-size:24px;line-height:1;}
.lp-faq-a{max-height:0;overflow:hidden;transition:max-height .35s ease,margin .35s;} .lp-faq.open .lp-faq-a{max-height:280px;margin-top:14px;} .lp-faq-a p{font-size:15px;color:var(--mid);line-height:1.6;max-width:58em;}

.lp-final-box{border:1px solid var(--line2);border-radius:28px;padding:clamp(44px,7vw,90px) clamp(28px,5vw,64px);background:radial-gradient(ellipse 90% 130% at 50% 0%,rgba(52,227,176,.14),transparent 65%),linear-gradient(180deg,rgba(20,26,40,.6),rgba(8,11,18,.5));}
.lp-final .lp-big{font-size:clamp(32px,5.6vw,68px);}

.lp-foot{position:relative;z-index:2;max-width:1120px;margin:0 auto;padding:40px clamp(20px,5vw,56px) 60px;border-top:1px solid var(--line);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:18px;}
.lp-foot .lp-brand{font-size:14px;}
.lp-foot-c{display:flex;gap:22px;font-family:'JetBrains Mono';font-size:13px;color:var(--mid);} .lp-foot-c a:hover{color:var(--mint);} .lp-foot-f{font-size:12px;color:var(--low);}

.lp-rv{opacity:0;transform:translateY(28px) scale(.985);transition:opacity .9s cubic-bezier(.2,.7,.2,1),transform .9s cubic-bezier(.2,.7,.2,1);} .lp-rv.in{opacity:1;transform:none;}

@media(max-width:920px){.lp-stats{grid-template-columns:1fr;}.lp-stat{border-left:0;border-top:1px solid var(--line);padding:28px 0;}.lp-stat:first-child{border-top:0;}.lp-pkg-grid{grid-template-columns:1fr;}.lp-cards{grid-template-columns:1fr;}.lp-links{display:none;}}
@media(max-width:600px){.lp-step{flex-direction:column;gap:10px;}.lp-foot{flex-direction:column;align-items:flex-start;}}
@media(prefers-reduced-motion:reduce){.lp-up{transform:none!important;animation:none!important;}.lp-rv{opacity:1!important;transform:none!important;}.lp-feather,.lp-scroll span{animation:none!important;}}
`;
