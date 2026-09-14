# ⚡ S24HV Personal Portfolio

<p align="center">
  <img src="https://shields.io" alt="React 19" />
  <img src="https://shields.io" alt="TypeScript 5" />
  <img src="https://shields.io" alt="Vite 6" />
  <img src="https://shields.io" alt="Tailwind CSS" />
</p>

**S24HV Portfolio** is a high-performance, advanced developer portfolio website. Built with a focus on minimalist layout design, interactive user experiences, and smooth transitions to effectively showcase production-ready applications like the [S24HV Store](https://github.com).

🔗 **[View Live Demo](https://github.io)**

---

## ✨ Features

- 🌗 **Smart Dark Mode:** Seamless system or manual toggling between dark and light themes with state persistence via `localStorage`.
- 📊 **Interactive Skill Matrix:** Dynamic filtering system for the tech stack categories (Frontend, Backend, Tools) in real-time.
- 📱 **Pixel-Perfect Responsiveness:** Fully optimized layout for mobile devices, tablets, laptops, and ultra-wide desktop monitors.
- 🚀 **Blazing Fast Performance:** Powered by Vite 6 and clean utility-first styles yielding a 100/100 Google Lighthouse score.
- 📬 **Validated Contact Form:** Fully functional client-side contact section utilizing clean TypeScript types for form validation.

---

## 🛠️ Tech Stack

- **Core Framework:** React 19 (Hooks, Context, State Management)
- **Language:** TypeScript 5 (Strict type-safety for reliable component rendering)
- **Build Tool:** Vite 6 (Lightning-fast Hot Module Replacement)
- **Styling:** Tailwind CSS (Utility-first framework with custom keyframe entrance animations)
- **Icons:** Lucide React (Lightweight aesthetic vector icons)

---

## 📂 Project Structure

```text
src/
├── assets/          # Static media files, logos, and screenshots
├── components/      # Reusable atomic UI components (Card, Button, Input)
├── App.tsx          # Main entry layout, custom dark mode logic, and sections
├── main.tsx         # React application DOM mounting point
└── index.css        # Global CSS styles and Tailwind structural directives
```

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com
cd Portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```
The application will open locally at: `http://localhost:5173`

### 4. Production Commands
```bash
npm run build   # Type-check and compile optimized static production build
npm run preview # Preview the compiled production build locally
npm run lint    # Run ESLint to enforce code quality and styling standards
```

---

## 🤖 Automated Deployment (CI/CD)

This repository comes pre-configured with **GitHub Actions**. Pushing any commit to the `main` branch automatically triggers a background runner to compile your application and instantly publish the updates to **GitHub Pages**.

Alternatively, if you prefer manual CLI deployments, install the helper package:
```bash
npm install gh-pages --save-dev
```
Then append this deployment shortcut to your `package.json` file: `"deploy": "gh-pages -d dist"`.

---

## 📄 License

This project is licensed under the terms of the **MIT License**. Feel free to use this as a foundational template for creating your own personalized portfolio site!


