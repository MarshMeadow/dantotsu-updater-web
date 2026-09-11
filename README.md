# 🌟 Dantotsu App Updater Website

<p align="center">
  <img src="public/icon-192.svg" alt="Dantotsu Updater logo" width="96">
</p>

<p align="center">
  <strong>A modern, responsive website for downloading the latest Dantotsu release.</strong>
</p>

<p align="center">
  <a href="https://dantotsu-app-updater.vercel.app/" target="_blank" rel="noopener noreferrer">🚀 Vercel Demo</a> •
  <a href="https://marshmeadow.github.io/dantotsu-updater-web/" target="_blank" rel="noopener noreferrer">🌐 GitHub Pages Demo</a>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-what-is-dantotsu">About</a> •
  <a href="#-social-links">Socials</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-deployment">Deployment</a> •
  <a href="#-disclaimer--dmca">Disclaimer / DMCA</a>
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

## ❓ What is Dantotsu?

**Dantotsu** is an open-source Android app for tracking and organizing anime and manga. The name means “the best of the best” in Japanese, and the app is built around a clean, modern UI with smooth animations.

What you can do with Dantotsu:

- 📚 Track anime and manga lists, progress, and ratings.
- 🔎 Browse trending, popular, and currently airing titles.
- 🔔 Get release notifications and countdowns for upcoming episodes.
- 🎨 Customize the interface to your taste.
- 🧩 Use extensions to integrate with the services you prefer.

> **Important:** Dantotsu is a **tracking and management tool**. It does not host, stream, upload, or distribute any anime, manga, or other copyrighted media. Any streaming or reading functionality depends on third-party extensions and services that you choose to use.

---

## 🔗 Social Links

- 🌐 **Official Website:** [dantotsu.app](https://dantotsu.app/)
- 💬 **Official Discord:** [discord.gg/FpwpYPJAy9](https://discord.gg/FpwpYPJAy9)
- ✈️ **Official Telegram:** [t.me/+gzBCQExtLQo1YTNh](https://t.me/+gzBCQExtLQo1YTNh)
- ✈️ **Updater Telegram:** [t.me/dantotsu_updater](https://t.me/dantotsu_updater)
- 🐙 **Official GitHub:** [github.com/rebelonion/Dantotsu](https://github.com/rebelonion/Dantotsu)
- 🛠️ **Updater Repository:** [github.com/itsmechinmoy/dantotsu-updater](https://github.com/itsmechinmoy/dantotsu-updater)
- 🌿 **Source Repository:** [git.rebelonion.dev/rebelonion/Dantotsu/src/branch/dev](https://git.rebelonion.dev/rebelonion/Dantotsu/src/branch/dev)

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

## ⚖️ Disclaimer / DMCA

This is an **independent community project** and is not affiliated with, endorsed by, sponsored by, or officially connected to Dantotsu, any Dantotsu fork, its developers, maintainers, contributors, or related projects.

This website does **not** host, upload, modify, repackage, or distribute anime, manga, streaming content, or other copyrighted media. It only provides informational links to publicly available software sources. All trademarks and copyrights belong to their respective owners.

Users download and use any linked software **at their own risk**.

For DMCA / legal information and takedown instructions, see the in-app DMCA page:

- [Vercel DMCA page](https://dantotsu-app-updater.vercel.app/#/dmca)
- [GitHub Pages DMCA page](https://marshmeadow.github.io/dantotsu-updater-web/#/dmca)

---

<p align="center">
  Made with 💙 for the Dantotsu community.
</p>
