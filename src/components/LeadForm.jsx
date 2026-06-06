import React, { useState, useEffect } from "react";

// Optional: paste a Calendly (or other) booking link to also offer "book a call".
const CALENDLY_URL = "";
// Preview builds flip this to true so the form simulates success without a server.
let LEAD_DEMO = false;

export default function LeadForm({ open, onClose }) {
  const [f, setF] = useState({ name: "", business: "", phone: "", email: "", message: "", company_url: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!open) return;
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, onClose]);

  useEffect(() => { if (open) { setStatus("idle"); setErr(""); } }, [open]);

  if (!open) return null;
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  const submit = async () => {
    if (!f.name.trim() || (!f.phone.trim() && !f.email.trim())) {
      setErr("Add your name and a phone or email so we can reach you.");
      return;
    }
    setErr(""); setStatus("sending");
    if (LEAD_DEMO) { setTimeout(() => setStatus("done"), 700); return; }
    try {
      const r = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.ok) setStatus("done");
      else { setStatus("error"); setErr(j.error || "Something went wrong — please call us at (518) 817-1453."); }
    } catch (e) {
      setStatus("error"); setErr("Network error — please call us at (518) 817-1453.");
    }
  };

  return (
    <div className="lf-overlay" onClick={onClose}>
      <style>{LEAD_CSS}</style>
      <div className="lf-modal" onClick={(e) => e.stopPropagation()}>
        <button className="lf-x" onClick={onClose} aria-label="Close">✕</button>
        {status !== "done" ? (
          <>
            <div className="lf-kick">FREE DEMO REQUEST</div>
            <h3 className="lf-h">Tell us what you want built.</h3>
            <p className="lf-sub">We’ll reply within one business day to set up your free, no-commitment demo.</p>
            <div className="lf-grid">
              <label className="lf-field"><span>Name *</span><input value={f.name} onChange={set("name")} placeholder="Your name" /></label>
              <label className="lf-field"><span>Business</span><input value={f.business} onChange={set("business")} placeholder="Business name" /></label>
              <label className="lf-field"><span>Phone</span><input value={f.phone} onChange={set("phone")} placeholder="(555) 555-5555" inputMode="tel" /></label>
              <label className="lf-field"><span>Email</span><input value={f.email} onChange={set("email")} placeholder="you@business.com" inputMode="email" /></label>
              <label className="lf-field full"><span>What do you want built?</span><textarea value={f.message} onChange={set("message")} rows={3} placeholder="The bottleneck, app, or website you have in mind…" /></label>
              <input className="lf-hp" tabIndex={-1} autoComplete="off" value={f.company_url} onChange={set("company_url")} aria-hidden />
            </div>
            {err && <div className="lf-err">{err}</div>}
            <button className="lf-submit" onClick={submit} disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Request my free demo"}
            </button>
            <div className="lf-alt">
              or call <a href="tel:5188171453">(518) 817-1453</a>
              {CALENDLY_URL ? <> · <a href={CALENDLY_URL} target="_blank" rel="noreferrer">book a call →</a></> : null}
            </div>
            <div className="lf-fine">No card · no commitment · you only pay $1,000 if you approve the demo.</div>
          </>
        ) : (
          <div className="lf-done">
            <div className="lf-check">✓</div>
            <h3 className="lf-h">Request received.</h3>
            <p className="lf-sub">Thanks{f.name ? `, ${f.name.trim().split(" ")[0]}` : ""}. We’ll reach out within one business day to set up your free demo.</p>
            <button className="lf-submit" onClick={onClose}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

const LEAD_CSS = `
.lf-overlay{position:fixed;inset:0;z-index:10000;display:grid;place-items:center;padding:20px;background:rgba(4,6,12,.8);backdrop-filter:blur(10px);animation:lffade .25s ease;font-family:'Hanken Grotesk',system-ui,sans-serif;}
@keyframes lffade{from{opacity:0}to{opacity:1}}
.lf-modal{position:relative;width:min(540px,100%);background:linear-gradient(180deg,#0e1320,#0a0e18);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:clamp(24px,4vw,38px);box-shadow:0 50px 120px -30px rgba(0,0,0,.9),0 0 70px -30px rgba(52,227,176,.4);animation:lfrise .35s cubic-bezier(.2,.7,.2,1);color:#EEF1F6;}
@keyframes lfrise{from{opacity:0;transform:translateY(18px) scale(.98)}to{opacity:1;transform:none}}
.lf-x{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.06);border:none;color:#9BA6B8;width:30px;height:30px;border-radius:9px;cursor:pointer;font-size:14px;}
.lf-x:hover{color:#fff;background:rgba(255,255,255,.12);}
.lf-kick{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.16em;color:#34E3B0;}
.lf-h{font-family:'Bricolage Grotesque',sans-serif;font-weight:700;letter-spacing:-.02em;font-size:clamp(21px,3vw,27px);margin:10px 0 0;}
.lf-sub{color:#9BA6B8;font-size:14px;line-height:1.5;margin:8px 0 0;}
.lf-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:22px 0 0;}
.lf-field{display:flex;flex-direction:column;gap:6px;font-size:12px;color:#9BA6B8;}
.lf-field.full{grid-column:1 / -1;}
.lf-field span{font-weight:600;letter-spacing:.02em;}
.lf-field input,.lf-field textarea{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:11px 13px;color:#EEF1F6;font-size:14px;font-family:inherit;outline:none;transition:border-color .2s,background .2s;resize:vertical;}
.lf-field input::placeholder,.lf-field textarea::placeholder{color:#5A6577;}
.lf-field input:focus,.lf-field textarea:focus{border-color:#34E3B0;background:rgba(52,227,176,.05);}
.lf-hp{position:absolute;left:-9999px;width:1px;height:1px;opacity:0;}
.lf-err{margin-top:14px;font-size:13px;color:#ff8d8d;background:rgba(255,90,90,.08);border:1px solid rgba(255,90,90,.25);border-radius:10px;padding:10px 12px;}
.lf-submit{width:100%;margin-top:18px;padding:14px 20px;border:none;border-radius:12px;cursor:pointer;font-family:'Hanken Grotesk',sans-serif;font-weight:600;font-size:15px;color:#04130D;background:linear-gradient(180deg,#5BF0C3,#34E3B0);box-shadow:0 8px 28px -10px rgba(52,227,176,.7);transition:transform .18s,box-shadow .25s,opacity .2s;}
.lf-submit:hover{transform:translateY(-1px);} .lf-submit:disabled{opacity:.6;cursor:default;transform:none;}
.lf-alt{text-align:center;margin-top:14px;font-size:13px;color:#9BA6B8;font-family:'JetBrains Mono',monospace;} .lf-alt a{color:#34E3B0;text-decoration:none;}
.lf-fine{text-align:center;margin-top:14px;font-size:11.5px;color:#5A6577;}
.lf-done{text-align:center;padding:14px 0;}
.lf-check{width:54px;height:54px;margin:0 auto 14px;border-radius:50%;display:grid;place-items:center;font-size:26px;color:#34E3B0;background:rgba(52,227,176,.12);border:1px solid rgba(52,227,176,.4);}
@media(max-width:520px){.lf-grid{grid-template-columns:1fr;}}
`;
