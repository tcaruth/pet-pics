# 🐾 FORBIN FEET

[![Svelte v5](https://img.shields.io/badge/Svelte-v5-ff3e00?logo=svelte)](https://svelte.dev)
[![Sanity](https://img.shields.io/badge/CMS-Sanity-f03e2f?logo=sanity)](https://sanity.io)
[![Bun](https://img.shields.io/badge/Runtime-Bun-fbf0df?logo=bun&logoColor=black)](https://bun.sh)
[![Vite](https://img.shields.io/badge/Build-Vite-646cff?logo=vite)](https://vitejs.dev)

> **"Touch the beans, love the paws."**  
> A premium pet photo gallery and upvoting platform. Parody for the Forbin Dev Group.

---

## ✨ Features

- 🖼️ **Premium Pet Galleries**: High-quality photo galleries powered by Sanity CMS.
- 🫘 **Touch Beans**: A custom upvoting system where every individual photo can be liked.
- 🏆 **Top Beans Leaderboard**: Real-time rankings of the most loved pet photos across the platform.
- 🌓 **Dynamic Themes**: Seamless Dark/Light mode toggle with system preference detection.
- 🌫️ **Glassmorphic UI**: Modern, premium design with smooth transitions and curated palettes.
- 🚀 **View Transitions**: Fluid image transitions for a native-app feel using modern CSS.

## 🛠️ Tech Stack

- **Frontend**: [SvelteKit 5](https://svelte.dev) (Runes-powered)
- **CMS**: [Sanity.io](https://sanity.io) (Structured content)
- **Styling**: Vanilla CSS (Custom design system)
- **Runtime & PM**: [Bun](https://bun.sh) (Preferred)
- **Build Tool**: [Vite](https://vitejs.dev)

## 🚀 Getting Started

### 1. Clone the project
```bash
git clone https://github.com/tcaruth/pet-pics.git
cd pet-pics
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory and add your Sanity credentials:

```bash
PUBLIC_SANITY_PROJECT_ID=your_project_id
PUBLIC_SANITY_DATASET=your_dataset
SANITY_WRITE_TOKEN=your_write_token # Used for incrementing upvotes
```

### 3. Install Dependencies
We prefer using [Bun](https://bun.sh) for faster dependency management and execution.

```bash
bun install
```

### 4. Start Development
```bash
bun dev
# or
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

## 🗄️ Project Structure

- `/src/routes` - SvelteKit pages and API endpoints.
- `/src/lib` - Shared components and Sanity client configuration.
- `/forbinfeet` - Sanity Studio schema and configuration.
- `/static` - Static assets and icons.

## 🤝 Contributing

This is a parody project for the **Forbin Dev Group**. Feel free to explore the code and suggest improvements to the "bean-touching" experience!

---

Built with ❤️ and a lot of pet love.
