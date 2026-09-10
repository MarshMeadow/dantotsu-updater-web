# Dantotsu Updater Website

A simple, responsive React + Vite + TypeScript website for downloading the latest version of Dantotsu from the community updater repository.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Build

```bash
npm run build
npm run preview
```

The production output is written to `dist/`.

## Project structure

- `src/api/release.ts` — fetches and validates the latest GitHub release.
- `src/components/` — shared layout and footer.
- `src/pages/Home.tsx` — homepage with download cards and release notes.
- `src/pages/Dmca.tsx` — DMCA / legal page.
- `src/constants/` — links and legal text.
