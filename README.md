# AgriVision

**AgriVision** is an advanced agricultural resilience platform designed for modern farmers.

## Features
- **Offline Disease Detection**: Uses a local Vision-Language Model (Moondream) and a local Large Language Model (Phi-3.5) to detect plant diseases completely offline.
- **Smart Advisory**: Chat with an AI agronomist that understands your farm's context and history.
- **Real-time Dashboards**: Monitor crop health, weather patterns, and soil conditions.
- **Multi-lingual Support**: Accessible to farmers in multiple regional languages.

## Tech Stack
- Next.js 14
- TailwindCSS
- Prisma (SQLite)
- Local AI Inference (Ollama, Moondream, Phi-3.5)

## Getting Started
```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```
