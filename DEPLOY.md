# Know Your Hydration — Deployment Guide
**Target URL:** `https://hydration.wellversed.in`  
**Stack:** GitHub Pages (hosting) + Cloudflare (DNS + SSL)  
**Same setup as:** Clinical Dashboard at `atulyadav405-beep.github.io/hydration-reference/`  
**Estimated setup time:** 10–15 minutes  

---

## What this is
A fully static site (HTML + CSS + JS). No backend, no database, no server.  
**No Cloudflare Worker needed** — unlike the Clinical Dashboard, this site has no AI backend.  
Completely separate from the Clinical Dashboard — different repo, different URL.

---

## Step 1 — Create the GitHub repo (5 minutes)

1. Go to **github.com** → Log in as `atulyadav405-beep` (or whichever account owns the Clinical Dashboard)
2. Click **New repository**
3. Name it: `know-your-hydration` (or `hydration-site`)
4. Set to **Public** — required for free GitHub Pages
5. **Do not** initialise with README
6. Click **Create repository**

---

## Step 2 — Upload the files (2 minutes)

**Option A — Via GitHub web UI (no Git required):**
1. Open the new repo → click **"uploading an existing file"**
2. Drag the entire contents of this folder (all files + css/ + js/ folders)
3. Commit message: `Initial deploy — Know Your Hydration`
4. Click **Commit changes**

**Option B — Via Git CLI:**
```bash
cd "Consumer facing dashboard"
git init
git add .
git commit -m "Initial deploy — Know Your Hydration"
git remote add origin https://github.com/atulyadav405-beep/know-your-hydration.git
git push -u origin main
```

---

## Step 3 — Enable GitHub Pages (2 minutes)

1. In the repo → **Settings** → **Pages** (left sidebar)
2. Source: **Deploy from a branch**
3. Branch: `main` / folder: `/ (root)`
4. Click **Save**
5. GitHub will show: `Your site is live at https://atulyadav405-beep.github.io/know-your-hydration/`

Test this URL first before touching DNS.

---

## Step 4 — Add CNAME file for custom domain (1 minute)

Create a file called `CNAME` (no extension) in the repo root with exactly this content:
```
hydration.wellversed.in
```

Commit it. GitHub Pages will now expect requests at `hydration.wellversed.in`.

> 💡 You can do this via GitHub web UI: New file → name it `CNAME` → paste the domain → commit.

---

## Step 5 — Add DNS record in Cloudflare (2 minutes)

Log into **Cloudflare** → select the `wellversed.in` zone → **DNS** → **Add record**:

| Type  | Name         | Content                                      | Proxy    |
|-------|--------------|----------------------------------------------|----------|
| CNAME | `hydration`  | `atulyadav405-beep.github.io`                | ✅ Proxied |

> ⚠️ Keep **Proxy status ON** (orange cloud) — this gives you Cloudflare's SSL, performance, and DDoS protection automatically.

---

## Step 6 — Set custom domain in GitHub Pages (1 minute)

1. Repo → **Settings** → **Pages**
2. Under **Custom domain** → type: `hydration.wellversed.in`
3. Click **Save**
4. Wait 2–5 minutes → GitHub will verify and show a green ✅

**Enforce HTTPS:** Once verified, tick **"Enforce HTTPS"** in the same section.

---

## Step 7 — Link from the Shopify site

Once `https://hydration.wellversed.in` is live, link from the Shopify site wherever appropriate:

```
Home page / nav:     https://hydration.wellversed.in
Product page:        https://hydration.wellversed.in/quiz.html
Blog / Education:    https://hydration.wellversed.in/symptoms.html
Research claims:     https://hydration.wellversed.in/library.html
```

No Shopify theme code changes needed — just hyperlinks.

---

## Updating the site later

Any content or design change:
1. Edit the relevant files locally
2. Push to the `main` branch on GitHub
3. GitHub Pages auto-deploys in ~30 seconds

---

## File structure (do not rename or move)

```
/
├── index.html          ← Home page
├── symptoms.html       ← The Problems page
├── quiz.html           ← Find My Hydration quiz
├── library.html        ← Research Library
├── CNAME               ← hydration.wellversed.in (add in Step 4)
├── DEPLOY.md           ← This file
├── css/
│   └── style.css
└── js/
    ├── data.js
    └── chat.js
```

---

## Key difference from Clinical Dashboard

| | Clinical Dashboard | Know Your Hydration |
|---|---|---|
| Repo | `atulyadav405-beep/hydration-reference` | `atulyadav405-beep/know-your-hydration` |
| URL | `atulyadav405-beep.github.io/hydration-reference` | `hydration.wellversed.in` |
| Cloudflare Worker | ✅ Yes (AI chat backend) | ❌ Not needed |
| DNS record | Not on wellversed.in | CNAME on wellversed.in |
| Deployment | GitHub Pages | GitHub Pages |

---

## What NOT to do

- ❌ Do not embed in a Shopify iframe — breaks mobile layout
- ❌ Do not host directly on Shopify — theme system conflicts with plain HTML
- ❌ Do not turn off Cloudflare proxy (orange cloud) — you'll lose SSL

