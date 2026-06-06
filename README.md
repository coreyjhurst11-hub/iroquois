# Iroquois — Custom Software Site

Marketing site for the $1,000 demo-first offer, with a working lead-capture form
that **emails Corey and texts the 518 line** on every request.

- `/` — landing (hero → inline demo film → package → process → FAQ → CTA)
- `/operators` — Corey Hurst & Charles Ware III
- Every "Get my free demo" button opens a lead form posting to `/api/lead`.
- Slogan: "Build for the future." Logo: high-tech feather (`src/Mark.jsx`).

Vite + React + React Router on the front end; a small Express server (`server.js`)
serves the build and handles leads.

## When someone submits the form, the server:
1. **Emails coreyjhurst11@gmail.com** via FormSubmit (subject: "🔔 New free-demo
   request — NAME is interested!").
2. **Texts 5188171453** via TextBelt ("NAME is interested. 📞/✉️ …").
3. Logs the lead (Railway → Deployments → Logs) and appends to `data/leads.ndjson`.
4. Optionally forwards to `LEAD_WEBHOOK_URL` (Zapier/Make/Slack/CRM).

### ⚠️ Two one-time setup notes
- **Email:** the FIRST submission triggers a FormSubmit activation email to
  coreyjhurst11@gmail.com. Open it once and click **Activate** — then all future
  leads arrive automatically. (The Gmail app notification on the 518 phone doubles
  as an instant alert.)
- **SMS:** the default uses TextBelt's free key = **1 text/day** (enough to test).
  For real volume, buy a key at textbelt.com (~$3 / 100 texts) and set
  `TEXTBELT_KEY` in Railway Variables.

## Environment variables (Railway → Variables) — all optional
| Variable | Default | Purpose |
|---|---|---|
| `TEXTBELT_KEY` | `textbelt` (free, 1/day) | Paid key for unlimited SMS |
| `LEAD_EMAIL` | coreyjhurst11@gmail.com | Where lead emails go |
| `ALERT_PHONE` | 5188171453 | Where the SMS alert goes |
| `LEAD_WEBHOOK_URL` | — | Extra forward (Zapier/Slack/CRM) |
| `ADMIN_KEY` | — | View leads at `/api/leads?key=...` |

## Run locally
```bash
npm install
npm run build && npm start     # full app at http://localhost:3000
```

## 🚀 Go live on GitHub + Railway
```bash
# 1) from inside the unzipped 'iroquois' folder:
git init
git add -A
git commit -m "Iroquois site: demo-first landing + lead capture"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/iroquois.git   # create this empty repo on github.com first
git push -u origin main
```
Then on Railway:
1. New Project → **Deploy from GitHub repo** → pick `iroquois`.
   (Auto build `npm run build`, auto start `npm start`, binds to `$PORT`.)
2. Settings → Networking → **Generate Domain** for a temporary live URL.
3. (Optional) Variables → add `TEXTBELT_KEY` for unlimited texts.
4. Submit a test lead → click the FormSubmit activation email once → you're live.

## Edit quick-reference
- Phone/email targets: top of `server.js` (or env vars above).
- Logo: `src/Mark.jsx` · Demo film: `src/components/DemoFilm.jsx`
- Form fields/copy: `src/components/LeadForm.jsx`
- Add a "Book a call" button: set `CALENDLY_URL` in `LeadForm.jsx`.
