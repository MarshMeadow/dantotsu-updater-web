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
  <a href="#-how-it-works">How it works</a> •
  <a href="#-windows-macos-linux--ios">Other platforms</a> •
  <a href="#-staying-safe">Safety</a> •
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
- 🔁 **Multi-source archive** — the release archive automatically falls back across mirrors and proxies if a source fails.
- ⭐ **Live repo & community stats** — GitHub star counts on repo cards and a live Discord member count.
- 🤝 **Contributors page** — live contributor lists for Dantotsu, the updater, and this website, plus a maintainers highlight.
- 🔄 **Obtainium guide** — a dedicated step-by-step page for auto-updating Dantotsu straight from GitHub releases, with a one-tap add link.
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

## ⚙️ How It Works

1. **Fetches the latest release.** When you load the page, your browser calls the GitHub API for the `itsmechinmoy/dantotsu-updater` repository and pulls the newest release tag, date, assets, and notes.
2. **Validates everything.** The site checks that release and download URLs come from trusted GitHub domains. It strips control characters and ignores any malformed data.
3. **Shows safe download links.** APKs are not hosted or modified here. The download buttons link directly to GitHub's file servers, so you get the exact file published by the updater repo.
4. **Live fork information.** The “Maintained community forks” section asks GitHub for each fork’s latest push date, so you can see which projects are still active.
5. **Archive fallbacks.** The archive page tries the GitHub API first, then CORS proxies and mirror repositories, and reports which source served the data.
6. **Built for privacy.** No tracking, analytics, ads, or API keys. The verification gate stores a simple token in your browser for 7 days, and your theme choice is saved locally.

---

## 💻 Windows, macOS, Linux & iOS

Dantotsu is **Android-only** — there is no official Windows, macOS, Linux, or iOS version, and iOS cannot install Android APK files. The community options are:

- 🖥️ **[Dartotsu](https://github.com/aayush2622/Dartotsu/releases)** — a community Flutter rewrite of Dantotsu with native builds for Windows, macOS, iOS, and Linux. The closest option to running Dantotsu off Android.
- 🪟 **[BlueStacks](https://www.bluestacks.com)** / **[LDPlayer](https://www.ldplayer.net)** — Android emulators for Windows (BlueStacks also supports macOS) that can run the Dantotsu APK.
- 🐧 **[Waydroid](https://waydro.id)** — runs a full Android system in a container on Linux, so you can install the Dantotsu APK natively on Wayland desktops.
- 🍏 **[AltStore](https://altstore.io)** / **[SideStore](https://sidestore.io)** — sideloading tools for installing the Dartotsu iOS `.ipa` on iPhone or iPad, since it is not on the App Store.

> **Note:** Windows Subsystem for Android was discontinued by Microsoft in March 2025 and is no longer available. Emulators and sideloading tools are third-party software — only download them from their official sites.

---

## 🛡️ Staying Safe

- **Only download from sources you trust.** Stick to official or well-known community repositories and double-check URLs.
- **Scan files before installing.** Upload APKs to [VirusTotal](https://www.virustotal.com) to scan with dozens of antivirus engines, or scan with your installed antivirus.
- **Keep your device updated.** Install Android security updates. Only enable “Install unknown apps” for apps and browsers you actually use.
- **Use strong, unique passwords.** Do not reuse passwords. Use a password manager and enable two-factor authentication.
- **Be careful with extensions.** Only install third-party extensions from sources you trust.

### How to scan an APK with an antivirus

1. Download the APK to a folder you can find, such as your **Downloads** folder.
2. Go to [virustotal.com](https://www.virustotal.com) and upload the APK.
3. Wait for the scan to finish and review the results from all engines.
4. If many antivirus engines flag the file, or the results look suspicious, **delete it** and do not install.
5. On Windows, you can also right-click the file and choose **“Scan with Windows Defender”** or **“Scan with …”** if you have another antivirus installed.

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
│   ├── api/             # GitHub release/fork/contributor fetching, Discord stats & validation
│   ├── components/      # Reusable UI components (Layout, Gate, ThemeToggle, Seo, Loading)
│   ├── constants/       # Links and legal text
│   ├── hooks/           # Shared data hooks (repo meta, Discord stats)
│   ├── pages/           # Home, Community, Resources, Contributors, Obtainium, Archive, Extensions, Dmca, Privacy, Terms, NotFound
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
