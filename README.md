# Lê Hoàng Anh — UI/UX Portfolio (`lehoanganh.id.vn`)

Production web application converted from Figma (`5Qnob5bMFrPr1ytJgH05ts`), built collaboratively with **Antigravity**, **Claude CLI**, and **Codex CLI**, and configured for **Cloudflare Workers Static Assets**.

## Stack
- **Frontend**: Vite 6 + React 19 + TypeScript + Tailwind CSS v4 + `motion/react` + `react-router` v7
- **SEO & Prerendering**: Static SSR prerendering (`scripts/prerender.mjs`) across all 13 routes + custom `404.html`, JSON-LD structured data, Open Graph tags, `sitemap.xml`, and `robots.txt`
- **Edge Runtime**: Cloudflare Workers (`src/worker.ts` + `wrangler.jsonc`) with custom domains `lehoanganh.id.vn` and `www.lehoanganh.id.vn` (`www` -> `308` canonical apex redirect, legacy `/work/*` redirects, zero Worker invocations on `/assets/*`)

## Commands
```powershell
npm run dev       # Local development server
npm test          # Run Vitest suite (interactive widgets, SSR hydration, Worker routing)
npm run build     # Build client + SSR bundle + prerender all 13 HTML routes
npm run deploy    # Build & deploy to Cloudflare (lehoanganh.id.vn)
```

## One-Step Production Deploy (`lehoanganh.id.vn`)
```powershell
.\deploy-cloudflare.ps1
```
