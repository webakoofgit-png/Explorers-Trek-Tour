# Explorers Treks & Tours

React, TypeScript, and Vite website for Explorers Treks & Tours.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deploy on Vercel

1. In Vercel, choose **Add New → Project**.
2. Import the `webakoofgit-png/Explorers-Trek-Tour` GitHub repository.
3. Keep **Framework Preset** set to `Vite`.
4. Keep **Build Command** as `npm run build` and **Output Directory** as `dist`.
5. Select **Deploy**.

The included `vercel.json` sends every application route to `index.html`, allowing React Router URLs such as `/treks/kalsubai-peak` and `/programs/junior-explorers` to work when opened or refreshed directly.
