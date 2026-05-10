# Kallitexnon - Art Workshop Booking Platform

A modern web application for managing art workshops with a comprehensive booking system and admin panel. Built with React, TypeScript, and deployed to Cloudflare Workers.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## 🎨 Overview

Kallitexnon is a full-stack art workshop management platform featuring:

- **Workshop Management** — Browse and manage art workshops
- **Booking System** — Users can book available workshops
- **Admin Panel** — Manage workshops, bookings, and announcements
- **Announcements** — Post updates and news about workshops
- **Contact Page** — Get in touch functionality
- **Responsive Design** — Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [TanStack Router](https://tanstack.com/router/latest) (file-based routing)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest) (server state)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Runtime**: [Cloudflare Workers](https://workers.cloudflare.com/) (server-side rendering)
- **Server Build**: [@cloudflare/vite-plugin](https://developers.cloudflare.com/workers/frameworks/framework-guides/vite/)
- **Code Quality**: [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- **Package Manager**: [Bun](https://bun.sh/) or npm/yarn

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v18 or higher
- **Package Manager**: Bun, npm, or yarn
- **Git** for version control

For Cloudflare Workers deployment:
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (v3+)
- Cloudflare account with Workers enabled

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd kallitexnon
```

### 2. Install Dependencies

Using Bun (recommended):
```bash
bun install
```

Or using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

### 3. Run Development Server

```bash
bun dev
# or
npm run dev
```

The app will start at **http://localhost:5173** (or the next available port if 5173 is in use).

**Expected output:**
```
VITE v... dev server running at:

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

Hot Module Replacement (HMR) is enabled — changes to your code will reflect instantly in the browser.

### 4. Build for Production

```bash
bun run build
# or
npm run build
```

Output is generated in the `dist/` directory ready for deployment.

**Development build** (for debugging):
```bash
bun run build:dev
# or
npm run build:dev
```

## 📁 Project Structure

```
kallitexnon/
├── src/
│   ├── routes/              # TanStack Router file-based routes
│   │   ├── __root.tsx       # Root layout wrapper
│   │   ├── index.tsx        # Home page
│   │   ├── about.tsx        # About page
│   │   ├── contact.tsx      # Contact page
│   │   ├── workshops.tsx    # Workshops listing
│   │   ├── booking.tsx      # Booking page
│   │   ├── admin.tsx        # Admin root layout
│   │   ├── admin.index.tsx  # Admin dashboard
│   │   └── admin.announcements.tsx  # Manage announcements
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui component library
│   │   ├── site-header.tsx # Header component
│   │   └── site-footer.tsx # Footer component
│   ├── hooks/              # Custom React hooks
│   │   └── use-mobile.tsx  # Mobile detection hook
│   ├── lib/                # Utilities and logic
│   │   ├── admin-auth.ts   # Admin authentication
│   │   ├── error-capture.ts # Error handling
│   │   ├── error-page.ts   # Error page utilities
│   │   ├── use-store.ts    # State management store
│   │   ├── utils.ts        # Utility functions
│   │   └── workshops-store.ts # Workshops data store
│   ├── assets/             # Static assets (images, fonts, etc.)
│   ├── server.ts           # Server-side rendering entry point
│   ├── start.ts            # Application bootstrap
│   ├── router.tsx          # Router configuration
│   ├── routeTree.gen.ts    # Auto-generated route tree
│   └── styles.css          # Global styles
├── public/                 # Static public files (if needed)
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── wrangler.jsonc          # Cloudflare Workers configuration
├── tsconfig.json           # TypeScript configuration
├── eslint.config.js        # ESLint rules
├── .prettierrc              # Prettier formatting rules
├── components.json         # shadcn/ui component manifest
└── README.md              # This file
```

### Key Directories

**`src/routes/`** — File-based routing using TanStack Router. Each `.tsx` file becomes a route automatically.

**`src/components/ui/`** — Pre-built UI components from shadcn/ui (buttons, cards, modals, forms, etc.). These are production-ready and highly customizable.

**`src/lib/`** — Business logic, utilities, authentication, and stores for state management.

**`src/server.ts`** — Server-side rendering entry point for Cloudflare Workers. Handles SSR and API requests.

## 💻 Development

### Available Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| **dev** | `npm run dev` | Start development server with HMR |
| **build** | `npm run build` | Build for production |
| **build:dev** | `npm run build:dev` | Build with dev mode (better debugging) |
| **preview** | `npm run preview` | Preview production build locally |
| **lint** | `npm run lint` | Run ESLint to check code quality |
| **format** | `npm run format` | Format code with Prettier |

### Code Quality

**Run ESLint** to check for code issues:
```bash
bun run lint
```

**Format Code** with Prettier:
```bash
bun run format
```

Or use your IDE's format-on-save feature (recommended).

### Development Tips

1. **Hot Reload** — Changes to React components, styles, and routes update instantly without full page refresh.

2. **Path Aliases** — Use `@/` prefix to import from `src/` directory:
   ```tsx
   import { Button } from "@/components/ui/button";
   import { useStore } from "@/lib/use-store";
   ```

3. **TypeScript** — Strict mode is enabled. The compiler will catch type errors before runtime.

4. **Browser DevTools** — React DevTools browser extension recommended for inspecting components and hooks.

5. **Network Requests** — TanStack Query manages server state. Use React Query DevTools for debugging queries.

## 🚀 Deployment

### Cloudflare Workers Deployment

#### Prerequisites

1. Install Wrangler CLI:
   ```bash
   npm install -g wrangler
   # or
   bun install -g wrangler
   ```

2. Authenticate with Cloudflare:
   ```bash
   wrangler login
   ```
   This opens a browser window to authorize your Cloudflare account.

#### Build & Deploy

1. **Build the Project**:
   ```bash
   bun run build
   # or
   npm run build
   ```

2. **Deploy to Cloudflare Workers**:
   ```bash
   wrangler deploy
   ```

   Wrangler will:
   - Read configuration from `wrangler.jsonc`
   - Upload the built files to Cloudflare Workers
   - Provide a URL to access your deployed app

3. **Verify Deployment**:
   ```bash
   wrangler tail
   ```
   View real-time logs from your deployed worker.

#### Configuration

The `wrangler.jsonc` file contains:

```jsonc
{
  "name": "tanstack-start-app",           // Worker script name
  "main": "src/server.ts",                 // Entry point
  "compatibility_date": "2025-09-24",      // Cloudflare API version
  "compatibility_flags": ["nodejs_compat"] // Node.js compatibility layer
}
```

**Edit this file to:**
- Change the worker name
- Add environment variables (for production secrets)
- Configure routes and custom domains

#### Environment Variables

For production secrets (API keys, database URLs, etc.):

1. Add to `wrangler.jsonc`:
   ```jsonc
   [env.production]
   vars = { PUBLIC_API_URL = "https://api.example.com" }
   ```

2. Or use Wrangler's secret management:
   ```bash
   wrangler secret put API_KEY
   ```

3. Access in your app via `process.env` or import from `@cloudflare/workers-types`.

### Local Preview Before Deployment

```bash
bun run preview
# or
npm run preview
```

This simulates the Cloudflare Workers environment locally on your machine.

## 🐛 Troubleshooting

### Port 5173 Already in Use

If you get "port already in use" error when running `npm run dev`:

```bash
# Kill the process using port 5173 (macOS/Linux)
lsof -ti:5173 | xargs kill

# Or start dev on a different port
VITE_PORT=3000 npm run dev
```

### Dependencies Not Installed

Clear cache and reinstall:

```bash
rm -rf node_modules bun.lock
bun install
```

### TypeScript Errors

The app uses strict TypeScript mode. Common issues:

- Missing type annotations on function parameters
- Using `any` without explicit need
- Accessing undefined properties

Run type-checking:
```bash
bun run lint
```

### Build Fails with "Module not found"

Ensure all imports use correct paths:

```tsx
// ✅ Correct
import { Button } from "@/components/ui/button";

// ❌ Incorrect (wrong relative path)
import { Button } from "../ui/button";
```

### Wrangler Deploy Fails

1. Verify you're logged in:
   ```bash
   wrangler whoami
   ```

2. Check `wrangler.jsonc` syntax (it's JSON with comments):
   ```bash
   wrangler publish --dry-run
   ```

3. Ensure `dist/` folder exists:
   ```bash
   bun run build
   ```

## 📚 Documentation & Resources

- [TanStack Router Docs](https://tanstack.com/router/latest)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Vite Docs](https://vitejs.dev/guide/)

## 🤝 Contributing

When contributing to this project:

1. **Code Style** — Format with Prettier before committing:
   ```bash
   bun run format
   ```

2. **Linting** — Fix linting errors:
   ```bash
   bun run lint
   ```

3. **Branch Naming** — Use descriptive names: `feature/workshop-filters`, `fix/booking-bug`

4. **Commit Messages** — Be clear: `Add workshop filtering` vs. `Fix stuff`

5. **Testing** — Verify your changes work locally before pushing:
   ```bash
   bun run build && bun run preview
   ```

## 📝 License

[Add your license here]

---

**Happy coding! 🚀**

If you encounter any issues, check the Troubleshooting section or refer to the official documentation links above.
