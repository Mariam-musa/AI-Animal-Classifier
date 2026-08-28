# AI Animal Classifier — Frontend

A polished React + Vite interface for the existing MobileNetV2 cat/dog
classifier. This app is UI-only: it does not contain or modify any of the
model training/inference code.

## Run it

```bash
npm install
npm run dev
```

Open the printed local URL (typically http://localhost:5173).

By default the app runs in **mock mode** (`VITE_USE_MOCK=true` in `.env`), so
you can see the full UI and interaction flow — including a realistic delay,
loading state, and a generated result — without a backend running.

## Connecting the real backend

1. Start the Python API (see `../backend/app.py`, or wire the same contract
   into your existing project).
2. In `.env`, set:
   ```
   VITE_API_BASE_URL=http://localhost:5000
   VITE_USE_MOCK=false
   ```
3. Restart `npm run dev`.

## Project structure

```
src/
  components/
    Header.jsx / .css
    Hero.jsx / .css
    ClassifierCard.jsx / .css   — dropzone, preview, analyze button
    ResultsPanel.jsx / .css     — prediction, confidence ring, description
    ConfidenceRing.jsx / .css   — SVG confidence indicator
  lib/
    classify.js                — API client (real + mock)
  App.jsx / .css                — page layout
  index.css                     — design tokens (color, type, spacing)
```
