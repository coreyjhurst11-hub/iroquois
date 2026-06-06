import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Mark from "../Mark.jsx";
import LeadForm from "../components/LeadForm.jsx";

/**
 * Iroquois — Operators (About) Page
 * Standalone page. Same design system as the landing page.
 */

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
  return <div ref={ref} className={`rv ${shown ? "rv-in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function Operator({ initials, name, title, line, from, to, unit, lead, bullets, reverse }) {
  return (
    <div className={`op ${reverse ? "op-rev" : ""}`}>
      <Reveal className="op-card">
        <div className="op-avatar">{initials}<span className="op-ring" /></div>
        <div className="op-stat">
          <span className="op-from">{from}</span>
          <svg width="26" height="14" viewBox="0 0 26 14" fill="none" aria-hidden><path d="M1 7h20m0 0-5-5m5 5-5 5" stroke="var(--mint)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span className="op-to">{to}</span>
        </div>
        <div className="op-unit">{unit}</div>
      </Reveal>
      <Reveal delay={120} className="op-body">
        <span className="kicker">{title}</span>
        <h2 className="op-name">{name}</h2>
        <div className="op-line">{line}</div>
        <p className="op-lead">{lead}</p>
        <ul className="op-bullets">
          {bullets.map((b, i) => <li key={i}><span className="tick">▸</span>{b}</li>)}
        </ul>
      </Reveal>
    </div>
  );
}

export default function IroquoisOperators() {
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
    <div className="iq-root" ref={rootRef} onMouseMove={onMove}>
      <style>{CSS}</style>
      <div className="bg" aria-hidden>
        <div className="blob blob-a" /><div className="blob blob-b" /><div className="grid-lines" /><div className="grain" /><div className="vignette" />
      </div>

      <header className="nav">
        <a className="brand" href="/">
          <span className="mark" aria-hidden><Mark /></span>
          <span className="wm-lock"><span className="wordmark">IROQUOIS</span><span className="op-slogan">BUILD FOR THE FUTURE</span></span>
        </a>
        <nav className="nav-links"><Link to="/">Home</Link><a href="/#how">How it works</a><a href="/#price">Pricing</a><span className="active">Operators</span></nav>
        <div className="nav-cta"><a href={`tel:${PHONE_1.tel}`} className="btn btn-ghost">{PHONE_1.display}</a><button onClick={() => setLeadOpen(true)} className="btn btn-solid">Get my free demo</button></div>
      </header>

      {/* HERO */}
      <section className="ophero">
        <Reveal><div className="eyebrow"><span className="pulse" /> The people behind the code</div></Reveal>
        <Reveal delay={120}><h1 className="headline">Built by operators,<br /><span className="grad">not freelancers</span>.</h1></Reveal>
        <Reveal delay={220}>
          <p className="sub">
            Most developers have never run a business. We have. Between us we’ve scaled a
            multi-million-dollar store program, turned around an independent retailer solo,
            made payroll, set prices, and dealt with the vendors. When we build software to
            streamline your operations, we already understand the operation.
          </p>
        </Reveal>
        <Reveal delay={320}>
          <div className="hero-stats">
            <div className="hs"><span className="hs-n gold">$54M</span><span className="hs-l">Store program scaled</span></div>
            <div className="hs"><span className="hs-n gold">$60K/mo</span><span className="hs-l">Solo retail turnaround</span></div>
            <div className="hs"><span className="hs-n">2</span><span className="hs-l">Operating LLCs founded</span></div>
            <div className="hs"><span className="hs-n">10+</span><span className="hs-l">Years on the floor</span></div>
          </div>
        </Reveal>
      </section>

      {/* OPERATORS */}
      <section className="band">
        <Operator
          initials="CH" title="FOUNDER & OPERATOR" name="Corey J. Hurst"
          line="10+ years · The Home Depot · Specialty Asst. Store Manager"
          from="$37M" to="$54M" unit="ANNUAL STORE REVENUE · PRO PROGRAM PILOT"
          lead="Corey spent a decade turning operating discipline into measurable results at one of the largest retailers in the country — then started building the software he always wished he’d had."
          bullets={[
            "Piloted the Unified Pro Program (UPP) — adopted regionally and reduced delivery errors by 20%",
            "Youngest recipient in Home Depot history of the Regional Vice President’s Award (age 19)",
            "One of 5 nationally invited back by corporate for continuing UPP consulting",
            "Pioneered the Customer Experience Manager role — adopted across 10+ regional stores",
            "10+ Homer Awards · oversaw 100+ employees as Specialty Asst. Store Manager",
          ]}
        />
        <Operator reverse
          initials="CW" title="PARTNER & 2ND-IN-COMMAND" name="Charles Ware III"
          line="Independent Retail Operator · Multi-industry founder"
          from="$20K" to="$60K" unit="MONTHLY REVENUE · 6 MONTHS · SINGLE STORE"
          lead="Charles is the owner-operator who’s actually done it the hard way — tripling a store’s monthly revenue alone, on the floor, while founding companies across multiple industries."
          bullets={[
            "Sole-operator turnaround of an independent liquor store — acting as consulting operator on the floor",
            "Founder of two operating LLCs across retail, distribution, and creative production",
            "Multi-industry pattern recognition: indie retail, music production, distribution, and digital",
            "Owner-operator mindset — has made payroll, set prices, and dealt with vendors directly",
          ]}
        />
      </section>

      {/* WHY IT MATTERS */}
      <section className="band">
        <Reveal><span className="kicker">WHY IT MATTERS TO YOU</span></Reveal>
        <Reveal delay={60}><h2 className="h2">Skin in the game — not an anonymous freelancer.</h2></Reveal>
        <div className="cards-3">
          {[
            ["We build for ourselves", "Seneca is our own product — we live with every bug and every win exactly like you would. We don’t ship things we wouldn’t run our own business on."],
            ["We build for our community", "We lead and build tools for our local Chess Club. When you build software for people you’ll see across the board next week, you build it to last."],
            ["We speak operations", "Spreadsheets, payroll, margin, delivery errors, vendors — that’s our native language. We translate your real workflow into software, not the other way around."],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 80} className="card"><div className="trust-dot" /><h3>{t}</h3><p>{d}</p></Reveal>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="cta-final">
        <Reveal>
          <div className="cta-box">
            <span className="kicker">LET’S BUILD</span>
            <h2 className="h2">Tell us what’s slowing your business down.</h2>
            <p>We’ll build you a working demo — free. You only pay our flat $1,000 fee if you approve it. We build any software, for any business, large or small.</p>
            <div className="cta-row center">
              <button onClick={() => setLeadOpen(true)} className="btn btn-solid btn-lg">Get my free demo</button>
              <a href={`tel:${PHONE_1.tel}`} className="btn btn-line btn-lg">✆ or call {PHONE_1.display}</a>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="footer">
        <div className="brand"><span className="wm-lock"><span className="wordmark">IROQUOIS</span><span className="op-slogan">BUILD FOR THE FUTURE</span></span></div>
        <div className="foot-contact"><a href={`tel:${PHONE_1.tel}`}>{PHONE_1.display}</a><a href={`tel:${PHONE_2.tel}`}>{PHONE_2.display}</a></div>
        <div className="foot-fine">Operators who build. Demo first · You own it.</div>
      </footer>

      <LeadForm open={leadOpen} onClose={() => setLeadOpen(false)} />
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
.iq-root{--ink:#06080F;--surface:#10141F;--line:rgba(255,255,255,.08);--line-2:rgba(255,255,255,.14);--text:#EEF1F6;--text-mid:#9BA6B8;--text-low:#5A6577;--mint:#34E3B0;--blue:#4D7CFF;--gold:#E9B36A;--mx:0;--my:0;position:relative;overflow:hidden;isolation:isolate;background:var(--ink);color:var(--text);font-family:'Hanken Grotesk',system-ui,sans-serif;-webkit-font-smoothing:antialiased;}
.iq-root *{box-sizing:border-box;} .iq-root a{text-decoration:none;color:inherit;}
.bg{position:absolute;inset:0;z-index:0;pointer-events:none;}
.blob{position:fixed;border-radius:50%;filter:blur(90px);opacity:.5;}
.blob-a{width:42vw;height:42vw;top:-12vw;right:-8vw;background:radial-gradient(circle at 30% 30%,var(--mint),transparent 62%);transform:translate3d(calc(var(--mx)*-24px),calc(var(--my)*-24px),0);}
.blob-b{width:40vw;height:40vw;bottom:-14vw;left:-10vw;background:radial-gradient(circle at 60% 40%,var(--blue),transparent 60%);opacity:.34;transform:translate3d(calc(var(--mx)*20px),calc(var(--my)*20px),0);}
.grid-lines{position:fixed;inset:0;background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(ellipse 90% 50% at 50% 0%,#000,transparent 75%);-webkit-mask-image:radial-gradient(ellipse 90% 50% at 50% 0%,#000,transparent 75%);opacity:.4;}
.grain{position:fixed;inset:0;opacity:.045;mix-blend-mode:overlay;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");}
.vignette{position:fixed;inset:0;background:radial-gradient(ellipse 120% 70% at 50% -10%,transparent 45%,var(--ink) 95%);}

.nav{position:relative;z-index:3;display:flex;align-items:center;justify-content:space-between;gap:24px;max-width:1180px;margin:0 auto;padding:24px clamp(20px,4vw,44px);}
.brand{display:flex;align-items:center;gap:11px;}.mark{display:grid;place-items:center;}
.wordmark{font-family:'Bricolage Grotesque';font-weight:700;letter-spacing:.16em;font-size:16px;}
.wm-lock{display:flex;flex-direction:column;line-height:1;gap:3px;}
.op-slogan{font-family:'JetBrains Mono',monospace;font-weight:500;font-size:8.5px;letter-spacing:.26em;color:var(--mint);}
.nav-links{display:flex;gap:28px;font-size:14px;color:var(--text-mid);font-weight:500;} .nav-links a:hover,.nav-links .active{color:var(--text);} .nav-links .active{color:var(--mint);}
.nav-cta{display:flex;align-items:center;gap:10px;}
.btn{display:inline-flex;align-items:center;gap:9px;border-radius:11px;font-weight:600;font-size:14px;cursor:pointer;transition:transform .18s,box-shadow .25s,background .2s,border-color .2s;white-space:nowrap;}
.btn-ghost{padding:9px 14px;color:var(--text-mid);font-family:'JetBrains Mono';font-size:13px;} .btn-ghost:hover{color:var(--text);}
.btn-solid{padding:11px 18px;color:#04130D;background:linear-gradient(180deg,#5BF0C3,var(--mint));box-shadow:0 6px 24px -8px rgba(52,227,176,.6);} .btn-solid:hover{transform:translateY(-1px);}
.btn-line{padding:11px 18px;color:var(--text);border:1px solid var(--line-2);background:rgba(255,255,255,.02);} .btn-line:hover{border-color:var(--mint);background:rgba(52,227,176,.06);}
.btn-lg{padding:15px 26px;font-size:15px;border-radius:13px;}

.ophero{position:relative;z-index:2;max-width:900px;margin:0 auto;padding:clamp(40px,7vw,90px) clamp(20px,4vw,44px) 0;text-align:center;}
.eyebrow{display:inline-flex;align-items:center;gap:9px;font-size:13px;font-weight:600;color:var(--text-mid);border:1px solid var(--line);border-radius:100px;padding:7px 14px;background:rgba(255,255,255,.02);}
.pulse{width:7px;height:7px;border-radius:50%;background:var(--mint);box-shadow:0 0 0 0 rgba(52,227,176,.6);animation:pulse 2.4s infinite;}
@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(52,227,176,.5)}70%{box-shadow:0 0 0 8px rgba(52,227,176,0)}100%{box-shadow:0 0 0 0 rgba(52,227,176,0)}}
.headline{font-family:'Bricolage Grotesque';font-weight:700;font-size:clamp(38px,6vw,68px);line-height:1.02;letter-spacing:-.02em;margin:22px 0 0;}
.grad{background:linear-gradient(100deg,var(--mint),#7FF0FF 60%,var(--blue));-webkit-background-clip:text;background-clip:text;color:transparent;}
.gold{color:var(--gold);}
.sub{color:var(--text-mid);font-size:clamp(16px,1.6vw,18.5px);line-height:1.62;max-width:40em;margin:24px auto 0;}
.hero-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin:46px auto 0;max-width:760px;}
.hs{border:1px solid var(--line);border-radius:14px;padding:18px 10px;background:linear-gradient(180deg,rgba(21,27,41,.5),transparent);}
.hs-n{display:block;font-family:'Bricolage Grotesque';font-weight:700;font-size:clamp(20px,2.6vw,28px);} .hs-l{display:block;font-size:11.5px;color:var(--text-low);margin-top:6px;}

.band{position:relative;z-index:2;max-width:1180px;margin:clamp(70px,9vw,120px) auto 0;padding:0 clamp(20px,4vw,44px);}
.kicker{font-family:'JetBrains Mono';font-size:11.5px;letter-spacing:.16em;color:var(--mint);}
.h2{font-family:'Bricolage Grotesque';font-weight:700;letter-spacing:-.02em;font-size:clamp(25px,3.4vw,40px);margin:12px 0 0;line-height:1.06;}

.op{display:grid;grid-template-columns:.8fr 1.2fr;gap:clamp(28px,5vw,60px);align-items:center;margin-bottom:clamp(56px,8vw,100px);}
.op-rev .op-card{order:2;} .op-rev .op-body{order:1;}
.op-card{position:relative;border:1px solid var(--line-2);border-radius:22px;padding:36px 28px;text-align:center;background:linear-gradient(180deg,rgba(21,27,41,.7),rgba(10,14,24,.7));box-shadow:0 40px 90px -40px rgba(0,0,0,.8),inset 0 1px 0 rgba(255,255,255,.06);}
.op-avatar{position:relative;width:88px;height:88px;border-radius:22px;margin:0 auto 22px;display:grid;place-items:center;font-family:'Bricolage Grotesque';font-weight:700;font-size:30px;color:var(--mint);background:rgba(52,227,176,.1);border:1px solid rgba(52,227,176,.3);}
.op-ring{position:absolute;inset:-7px;border-radius:26px;border:1px solid rgba(52,227,176,.2);}
.op-stat{display:flex;align-items:baseline;justify-content:center;gap:12px;}
.op-from{font-family:'Bricolage Grotesque';font-weight:600;font-size:26px;color:var(--text-low);} .op-to{font-family:'Bricolage Grotesque';font-weight:700;font-size:40px;color:var(--gold);}
.op-unit{font-family:'JetBrains Mono';font-size:10.5px;letter-spacing:.1em;color:var(--text-mid);margin-top:12px;}
.op-name{font-family:'Bricolage Grotesque';font-weight:700;font-size:clamp(28px,3.6vw,40px);margin:10px 0 0;letter-spacing:-.02em;}
.op-line{font-size:14px;color:var(--mint);margin-top:8px;font-family:'JetBrains Mono';}
.op-lead{font-size:16px;color:var(--text);line-height:1.6;margin:20px 0 22px;}
.op-bullets{list-style:none;margin:0;padding:0;display:grid;gap:12px;} .op-bullets li{display:flex;gap:10px;font-size:14.5px;color:var(--text-mid);line-height:1.5;} .tick{color:var(--mint);flex-shrink:0;}

.cards-3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:38px;}
.card{border:1px solid var(--line);border-radius:16px;padding:24px;background:linear-gradient(180deg,rgba(21,27,41,.5),rgba(10,14,24,.35));transition:border-color .3s,transform .3s;} .card:hover{border-color:var(--line-2);transform:translateY(-3px);}
.trust-dot{width:9px;height:9px;border-radius:50%;background:var(--mint);box-shadow:0 0 14px var(--mint);margin-bottom:14px;} .card h3{font-family:'Bricolage Grotesque';font-size:18px;margin-bottom:9px;} .card p{font-size:13.5px;color:var(--text-mid);line-height:1.55;}

.cta-final{position:relative;z-index:2;max-width:1180px;margin:clamp(70px,9vw,120px) auto 0;padding:0 clamp(20px,4vw,44px);}
.cta-box{border:1px solid var(--line-2);border-radius:24px;padding:clamp(36px,5vw,64px);text-align:center;background:radial-gradient(ellipse 80% 120% at 50% 0%,rgba(52,227,176,.1),transparent 70%),linear-gradient(180deg,rgba(21,27,41,.7),rgba(10,14,24,.6));}
.cta-box .h2{max-width:18em;margin:12px auto 0;} .cta-box p{color:var(--text-mid);font-size:16px;line-height:1.6;margin:18px auto 0;max-width:44em;}
.cta-row{display:flex;flex-wrap:wrap;gap:14px;margin-top:30px;} .cta-row.center{justify-content:center;}

.footer{position:relative;z-index:2;max-width:1180px;margin:60px auto 0;padding:30px clamp(20px,4vw,44px);border-top:1px solid var(--line);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;}
.foot-contact{display:flex;gap:20px;font-family:'JetBrains Mono';font-size:13px;color:var(--text-mid);} .foot-contact a:hover{color:var(--mint);} .foot-fine{font-size:12px;color:var(--text-low);}

.rv{opacity:0;transform:translateY(20px);transition:opacity .7s cubic-bezier(.2,.6,.2,1),transform .7s cubic-bezier(.2,.6,.2,1);} .rv-in{opacity:1;transform:none;}

@media(max-width:900px){.op{grid-template-columns:1fr;}.op-rev .op-card{order:1;}.op-rev .op-body{order:2;}.hero-stats{grid-template-columns:1fr 1fr;}.cards-3{grid-template-columns:1fr;}.nav-links{display:none;}}
@media(max-width:640px){.nav-cta .btn-ghost{display:none;}}
@media(prefers-reduced-motion:reduce){.rv{opacity:1!important;transform:none!important;}.pulse{animation:none;}}
`;
