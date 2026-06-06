const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(express.json({ limit: "32kb" }));

const dist = path.join(__dirname, "dist");
const DATA_DIR = path.join(__dirname, "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.ndjson");
try { fs.mkdirSync(DATA_DIR, { recursive: true }); } catch (e) {}

// Where alerts go (override in Railway Variables if these ever change)
const LEAD_EMAIL = process.env.LEAD_EMAIL || "coreyjhurst11@gmail.com";
const ALERT_PHONE = process.env.ALERT_PHONE || "5188171453";
const TEXTBELT_KEY = process.env.TEXTBELT_KEY || "textbelt"; // free key = 1 text/day; buy a key for production

function postJSON(url, body, ms = 8000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  return fetch(url, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(body), signal: ctrl.signal })
    .then(async (r) => ({ ok: r.ok, status: r.status, body: await r.text().catch(() => "") }))
    .finally(() => clearTimeout(t));
}

app.post("/api/lead", async (req, res) => {
  const b = req.body || {};
  if (b.company_url) return res.json({ ok: true }); // honeypot

  const clip = (v, n) => (v || "").toString().trim().slice(0, n);
  const name = clip(b.name, 120);
  const email = clip(b.email, 160);
  const phone = clip(b.phone, 40);
  const business = clip(b.business, 160);
  const message = clip(b.message, 2000);

  if (!name || (!email && !phone)) {
    return res.status(400).json({ ok: false, error: "Please include your name and a phone or email." });
  }

  const lead = {
    name, email, phone, business, message,
    at: new Date().toISOString(),
    ip: (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").toString().split(",")[0],
  };

  // local backup + log (visible in Railway logs)
  try { fs.appendFileSync(LEADS_FILE, JSON.stringify(lead) + "\n"); } catch (e) { console.error("file write failed:", e.message); }
  console.log("NEW LEAD:", JSON.stringify(lead));

  const contact = [phone && `📞 ${phone}`, email && `✉️ ${email}`].filter(Boolean).join("  ");
  const jobs = [];

  // 1) EMAIL → coreyjhurst11@gmail.com (FormSubmit; no API key, one-time activation)
  jobs.push(postJSON(`https://formsubmit.co/ajax/${encodeURIComponent(LEAD_EMAIL)}`, {
    _subject: `🔔 New free-demo request — ${name} is interested!`,
    _template: "table",
    _captcha: "false",
    Name: name,
    Business: business || "—",
    Phone: phone || "—",
    Email: email || "—",
    "What they want built": message || "—",
    Received: lead.at,
  }).then((r) => console.log("email →", LEAD_EMAIL, r.status, r.body.slice(0, 120)))
    .catch((e) => console.error("email failed:", e.message)));

  // 2) SMS ALERT → 5188171453 (TextBelt)
  const sms = `New free-demo request — ${name} is interested. ${contact}${business ? ` (${business})` : ""}. — Iroquois`;
  jobs.push(postJSON("https://textbelt.com/text", { phone: ALERT_PHONE, message: sms.slice(0, 300), key: TEXTBELT_KEY })
    .then((r) => console.log("sms →", ALERT_PHONE, r.status, r.body.slice(0, 160)))
    .catch((e) => console.error("sms failed:", e.message)));

  // 3) optional extra webhook (Zapier/Make/Slack/CRM)
  if (process.env.LEAD_WEBHOOK_URL) {
    jobs.push(postJSON(process.env.LEAD_WEBHOOK_URL, lead).catch((e) => console.error("webhook failed:", e.message)));
  }

  await Promise.allSettled(jobs);
  res.json({ ok: true });
});

// View captured leads:  /api/leads?key=YOUR_ADMIN_KEY
app.get("/api/leads", (req, res) => {
  const key = process.env.ADMIN_KEY;
  if (!key || req.query.key !== key) return res.status(401).json({ ok: false, error: "unauthorized" });
  try { res.type("text/plain").send(fs.readFileSync(LEADS_FILE, "utf8")); } catch (e) { res.type("text/plain").send(""); }
});

app.use(express.static(dist, { maxAge: "1h" }));
app.get("*", (_req, res) => res.sendFile(path.join(dist, "index.html")));

const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => console.log(`Iroquois site running on port ${port} — alerts to ${LEAD_EMAIL} & ${ALERT_PHONE}`));
