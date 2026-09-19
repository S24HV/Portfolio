<div align="center">

# `S24HV` — Personal Portfolio

**Cyber-terminal styled developer portfolio that builds itself from the GitHub API.**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.5-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org)
[![Sass](https://img.shields.io/badge/Sass-1.83-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com)

[![Deploy](https://github.com/S24HV/Portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/S24HV/Portfolio/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

### [→ Live demo](https://s24hv.github.io/Portfolio/)

<img src="docs/screenshots/hero-dark.png" alt="S24HV portfolio — terminal hero section in dark theme" width="100%" />

</div>

---

## What it is

A single-page portfolio with a hacker-terminal aesthetic. Instead of hardcoding a project list,
the site pulls repositories, languages and READMEs straight from the GitHub REST API — so the
content stays up to date without touching the code.

| | |
|---|---|
| **Boot sequence** | Multilingual `INITIALIZING ACCESS…` splash before the app fades in |
| **Terminal hero** | Typewriter output of `whoami`, `status --check`, `hobbies --list` |
| **Dark / light theme** | Redux Toolkit slice persisted to `localStorage` |
| **Tech stack** | Language bars computed live from the languages of every public repo |
| **Projects gate** | Cards unlock behind `$ ./access_repositories.sh`, with inline README rendering |
| **Roadmap** | Timeline from frontend development towards cybersecurity |

---

## Screenshots

<table>
  <tr>
    <td width="50%"><img src="docs/screenshots/hero-dark.png" alt="Hero and About sections in dark theme" /></td>
    <td width="50%"><img src="docs/screenshots/hero-light.png" alt="Hero and About sections in light theme" /></td>
  </tr>
  <tr>
    <td align="center"><b>Dark theme</b></td>
    <td align="center"><b>Light theme</b></td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/techstack.png" alt="Tech stack bars generated from GitHub language statistics" /></td>
    <td><img src="docs/screenshots/projects.png" alt="Project cards loaded from the GitHub API" /></td>
  </tr>
  <tr>
    <td align="center"><b>Tech stack — generated from GitHub</b></td>
    <td align="center"><b>Projects — loaded on demand</b></td>
  </tr>
</table>

<p align="center">
  <img src="docs/screenshots/roadmap.png" alt="Roadmap timeline from frontend development to cybersecurity" width="85%" />
</p>

---

## Tech stack

| Layer | Choice |
|---|---|
| UI | React 18 + TypeScript 5.6 |
| Build | Vite 6 |
| State | Redux Toolkit + React Redux (theme slice) |
| Styling | SCSS, CSS variables, Orbitron / Rajdhani / JetBrains Mono |
| Data | axios → GitHub REST API |
| Markdown | react-markdown + remark-gfm |
| Deploy | GitHub Actions → GitHub Pages (`gh-pages` script as fallback) |

---

## Quick start

```bash
git clone https://github.com/S24HV/Portfolio.git
cd Portfolio
npm install
npm run dev
```

The dev server starts at **http://localhost:5173/Portfolio/** (the `/Portfolio/` base comes from
`vite.config.ts` and matches the GitHub Pages path).

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Type-check (`tsc -b`) and build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint over the whole project |
| `npm run deploy` | Manual publish of `dist/` to GitHub Pages |

### Optional: GitHub token

Unauthenticated GitHub API calls are limited to 60 requests/hour, and the site makes several per
repository. To avoid rate limiting during development, create a `.env.local` with a read-only
token:

```bash
VITE_GITHUB_TOKEN=ghp_your_read_only_token
```

Without it everything still works — you may just hit `403` responses after a few reloads.

---

## Project structure

```text
src/
├── assets/                 # avatar and SVG icons (github, mail, tg, sun, moon)
├── components/             # one .tsx + one .scss per section
│   ├── BootScreen.tsx      # access-granted splash
│   ├── Header.tsx          # logo + theme toggle
│   ├── Hero.tsx            # typewriter terminal
│   ├── About.tsx           # bio and contacts
│   ├── TechStack.tsx       # language bars from the GitHub API
│   ├── Projects.tsx        # repo cards + README viewer
│   ├── Roadmap.tsx         # learning timeline
│   └── BottomBar.tsx       # floating contact bar
├── services/github.ts      # repos, languages, README, OG preview helpers
├── store/                  # Redux store + theme slice (localStorage persisted)
├── App.tsx                 # section composition and projects gate
└── global.styles.scss      # theme variables, grid background, animations
```

---

## Deployment

Every push to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
Node 20 → `npm ci` → `npm run build` → upload `dist/` → publish to GitHub Pages.
Nothing else to configure beyond enabling Pages with the *GitHub Actions* source.

---

## Contact

<p align="left">
  <a href="mailto:amirsuhov@gmail.com"><img src="https://img.shields.io/badge/Email-amirsuhov@gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white" alt="Email" /></a>
  <a href="https://t.me/S_24_HV"><img src="https://img.shields.io/badge/Telegram-@S__24__HV-26A5E4?style=flat-square&logo=telegram&logoColor=white" alt="Telegram" /></a>
  <a href="https://github.com/S24HV"><img src="https://img.shields.io/badge/GitHub-S24HV-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub" /></a>
</p>

Licensed under the [MIT License](LICENSE) — feel free to fork it as a base for your own portfolio.
