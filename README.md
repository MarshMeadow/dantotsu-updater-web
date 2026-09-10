# 🌟 Dantotsu Updater Website

<p align="center">
  <img src="public/icon-192.svg" alt="Dantotsu Updater logo" width="96">
</p>

<p align="center">
  <strong>A modern, responsive website for downloading the latest Dantotsu release.</strong>
</p>

<p align="center">
  <a href="https://dantotsu-app-updater-qps8xc1ip-meadows-projects-000c43b8.vercel.app/" target="_blank" rel="noopener noreferrer">🚀 Vercel Demo</a> •
  <a href="https://marshmeadow.github.io/dantotsu-updater-web/" target="_blank" rel="noopener noreferrer">🌐 GitHub Pages Demo</a>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-deployment">Deployment</a> •
  <a href="#-license">License</a>
</p>

---

## ✨ Features

- ⚡ **React 18 + Vite + TypeScript** — fast, modern, type-safe.
- 🌙 **Light & dark theme** — automatic system detection plus a manual toggle.
- 📱 **Fully responsive** — looks great on desktop, tablet, and mobile.
- 🔒 **Human verification gate** — one-time simple puzzle on first visit.
- 🍴 **Maintained forks list** — live "last updated" times from GitHub.
- 🚀 **SEO + Open Graph + PWA manifest** — ready to share anywhere.
- 🛡️ **Security headers & safe links** — CSP, `noopener noreferrer`, and URL allow-lists.
- 📄 **DMCA / Legal page** — required legal and takedown information.

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/itsmechinmoy/dantotsu-updater-web.git
cd dantotsu-updater-web

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🛠️ Build

```bash
npm run build
npm run preview
```

The production output is written to the `dist/` directory.

---

## 🌐 Deployment

The project is configured to work with **relative asset paths**, making it easy to deploy on **GitHub Pages**, **Netlify**, **Vercel**, **Cloudflare Pages**, or any static host.

### GitHub Pages

1. Run `npm run build`.
2. Deploy the contents of the `dist/` folder to your `gh-pages` branch or use a GitHub Action.
3. The site uses `HashRouter`, so client-side routes work without extra redirects.

### Netlify

1. Run `npm run build`.
2. Drag and drop the `dist/` folder onto Netlify, or connect this repo with these settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. `public/_redirects` is already included for SPA routing.

### Vercel

1. Import the repo on Vercel.
2. Use these settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
3. `vercel.json` is included to serve `index.html` for all routes and to set basic security headers.

### Before you publish

- Update the domain in `public/robots.txt` and `public/sitemap.xml`.
- Replace `https://dantotsu-updater.example` with your real URL.

---

## 📂 Project Structure

```
├── public/              # Static assets (favicon, manifest, robots, sitemap)
├── src/
│   ├── api/             # GitHub release/fork fetching & validation
│   ├── components/      # Reusable UI components (Layout, Gate, ThemeToggle, Seo, Loading)
│   ├── constants/       # Links and legal text
│   ├── pages/           # Home, Dmca, NotFound
│   ├── App.tsx          # Router, lazy loading, and verification gate
│   └── main.tsx         # Entry point with Helmet & HashRouter
├── index.html           # Root HTML with security headers and noscript fallback
├── package.json
├── tsconfig*.json
└── vite.config.ts
```

---

## 📜 License

This is an independent community project. It is **not affiliated** with Dantotsu, its developers, or any fork. See the [DMCA / Legal page](public/sitemap.xml) and the in-app disclaimer for full legal text.

---

<p align="center">
  Made with 💙 for the Dantotsu community.
</p>
