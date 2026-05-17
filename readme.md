# 🚗 Vikram Singh — 3D Portfolio

<div align="center">

![Portfolio Preview](/static/social/share-image.png)

**A fully interactive 3D portfolio built with Three.js & WebGPU**

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://vikramsingh.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-babamosie333-black?style=for-the-badge&logo=github)](https://github.com/babamosie333)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Vikram_Singh-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/vikram14052006/)

</div>

---

## 👋 About

This is my personal portfolio website — a fully interactive 3D open world game where you drive a car to explore my projects, experience, and more. Built on top of the incredible [Gaming Portfolio](https://github.com/babamosie333/drivefolio) by [Bruno Simon](https://github.com/babamosie333), heavily customized with my own data, projects, and personal touches.

---

## ✨ Features

- 🚗 **Drive a car** around a 3D open world map
- 🌦️ **Dynamic weather** — rain, snow, wind, lightning, fog
- 🕐 **Day / Night cycle** with ambient sounds
- 🏆 **40+ achievements** to unlock with car paint rewards
- 🎳 **Bowling mini-game** with physics
- 🏎️ **Racing circuit** with timer and leaderboard
- 💬 **Whispers** — leave messages for other visitors
- 🗺️ **Interactive map** with teleportation
- 🎵 **Music playlist** with 3D positional audio
- 📱 **Mobile support** with touch controls
- ⚡ **WebGPU renderer** (falls back to WebGL)

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| 3D Rendering | [Three.js](https://threejs.org/) + WebGPU |
| Physics | [Rapier](https://rapier.rs/) |
| Audio | [Howler.js](https://howlerjs.com/) |
| Animations | [GSAP](https://gsap.com/) |
| Build Tool | [Vite](https://vitejs.dev/) |
| 3D Models | Blender + glTF/GLB |
| Textures | KTX2 Compressed |
| Touch Controls | [Nipple.js](https://yoannmoi.net/nipplejs/) |
| Fonts | Amatic SC, Nunito (Google Fonts) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm
- [KTX-Software](https://github.com/KhronosGroup/KTX-Software/releases) (for texture compression)

### Installation

```bash
# Clone the repository
git clone https://github.com/babamosie333/drivefolio.git
cd drivefolio

# Install dependencies
npm install --force
```

### Environment Setup

```bash
# Copy environment file
cp .env.example .env
```

Edit `.env`:
```env
VITE_GAME_PUBLIC=true
VITE_COMPRESSED=true
VITE_MUSIC=1
VITE_LOG=1
VITE_WHISPERS_COUNT=30
VITE_SERVER_URL=          # Leave empty if no server
```

### Development

```bash
# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Compress Assets

```bash
# Compress textures and models (requires KTX-Software)
npm run compress
```

### Production Build

```bash
npm run build
```

Output goes to `dist/` folder.

---

## 📁 Project Structure

```
folio-2025/
├── sources/
│   ├── Game/
│   │   ├── World/
│   │   │   └── Areas/          # Game areas (Landing, Projects, Career...)
│   │   ├── Player/             # Car physics & controls
│   │   ├── Audio/              # Sound system
│   │   └── Materials/          # Three.js materials
│   └── data/
│       ├── social.js           # Your social links
│       ├── projects.js         # Your projects
│       ├── lab.js              # Your experiments
│       └── consoleLog.js       # Browser console easter egg
├── static/
│   ├── areas/                  # 3D area models
│   ├── career/                 # Career timeline textures
│   ├── projects/images/        # Project screenshots
│   └── sounds/                 # Audio files
└── scripts/
    └── compress.js             # Asset compression script
```

---

## 🌐 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Build and deploy
npm run build
vercel --prod
```

Or connect your GitHub repo directly at [vercel.com](https://vercel.com).

**Vercel Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install --force`

### Deploy to Netlify

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

---

## 🎮 Controls

| Action | Keyboard | Gamepad | Touch |
|--------|----------|---------|-------|
| Drive | WASD / Arrow Keys | Left Stick | Virtual Joystick |
| Boost | Shift | R2 | Double tap |
| Brake | Space | L2 | — |
| Honk | H | Triangle | — |
| Map | M | Select | Map button |
| Interact | E | Cross | Interact button |

---

## 🗺️ Areas

| Area | Description |
|------|-------------|
| 🏠 Landing | Starting area with map kiosk and controls |
| 💼 Projects | My portfolio projects with screenshots |
| 🧪 Lab | Creative experiments and side projects |
| 📅 Career | Interactive work history timeline |
| 🔗 Social | Social media links |
| 🎳 Bowling | Fully playable bowling mini-game |
| 🏎️ Circuit | Racing track with online leaderboard |
| 🍪 Cookie | Accept cookie consent as a game mechanic |
| 💀 Altar | Sacrifice yourself for a death counter |
| 🏆 Achievements | Track all your progress |
| 💬 Whispers | Leave messages for other visitors |

---

## 🔧 Customization

### Change Personal Data

Edit these files with your own information:

```
sources/data/social.js      → Social media links
sources/data/projects.js    → Your projects
sources/data/lab.js         → Your experiments
sources/data/consoleLog.js  → Browser console message
```

### Change Career Start Year

In `sources/Game/World/Areas/CareerArea.js`:
```js
this.year.start = 2020  // ← Your career start year
```

### Add Project Screenshots

1. Add PNG files to `static/projects/images/`
2. Run `npm run compress`

---

## 🎨 Credits

| Credit | Link |
|--------|------|
| Original Portfolio | [Bruno Simon](https://bruno-simon.com) — [folio-2025](https://github.com/brunosimon/folio-2025) |
| Three.js | [mrdoob](https://github.com/mrdoob) |
| Physics | [Rapier](https://rapier.rs/) by Dimforge |
| Music | [Kounine](https://linktr.ee/Kounine) (CC0 License) |
| Fonts | [Google Fonts](https://fonts.google.com/) |

---

## 📄 License

This project is based on [folio-2025](https://github.com/brunosimon/folio-2025) by Bruno Simon, released under the **MIT License**.

My customizations and personal data are also under MIT License — feel free to use this as inspiration for your own portfolio!

---

## 📬 Contact

**Vikram Singh**

| Platform | Link |
|----------|------|
| 📧 Email | [vikramsingh14052006@gmail.com](mailto:vikramsingh14052006@gmail.com) |
| 🐦 X / Twitter | [@SinghVikra70305](https://x.com/SinghVikra70305) |
| 💼 LinkedIn | [vikram14052006](https://www.linkedin.com/in/vikram14052006/) |
| 🐙 GitHub | [babamosie333](https://github.com/babamosie333) |
| 📺 YouTube | [@DevBabaMosie](https://www.youtube.com/@DevBabaMosie) |
| 🎮 Twitch | [babamosie333](https://www.twitch.tv/babamosie333) |
| 🦋 Bluesky | [babamosie.bsky.social](https://bsky.app/profile/babamosie.bsky.social) |

---

<div align="center">

Made with ❤️ by **Vikram Singh**

⭐ Star this repo if you like it!

</div># drivefolio
