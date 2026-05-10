# Kallitexnon - Art Workshop Booking Platform

A modern web application for managing art workshops with a comprehensive booking system and admin panel. Built with React, TypeScript, and Node.js.

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
- **Runtime**: [Node.js](https://nodejs.org/) (server-side rendering)
- **Server Framework**: [TanStack Start](https://tanstack.com/start/latest)
- **Code Quality**: [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- **Package Manager**: [Bun](https://bun.sh/) or npm/yarn

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v18 or higher
- **Package Manager**: Bun, npm, or yarn
- **Git** for version control

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

**`src/server.ts`** — Server-side rendering entry point for Node.js. Handles SSR and API requests.

## 💻 Development

### Available Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| **dev** | `npm run dev` | Start development server with HMR |
| **build** | `npm run build` | Build for production |
| **start** | `npm start` | Start production server |
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

### Node.js Server Deployment

#### Build the Project

```bash
bun run build
# or
npm run build
```

This generates optimized production files in the `dist/` directory.

#### Running the Production Server

```bash
bun start
# or
npm start
```

The server will start on `http://localhost:3000` (or the port specified by the `PORT` environment variable).

#### Environment Variables

For production deployment, you can configure the following:

```bash
# Set the port (default: 3000)
PORT=8080 npm start

# Set Node environment
NODE_ENV=production npm start
```

#### Deployment Platforms

You can deploy this Node.js app to various platforms:

**Heroku:**
```bash
heroku create your-app-name
git push heroku main
```

**Railway/Render/Fly.io:**
1. Build: `npm run build`
2. Start command: `npm start`
3. Set `NODE_ENV=production` in environment variables

**VPS/Self-hosted:**
```bash
# Install PM2 for process management
npm install -g pm2

# Build
npm run build

# Start with PM2
pm2 start "npm start" --name kallitexnon
pm2 save
pm2 startup
```

#### Local Testing

Test the production build locally:

```bash
bun run build
bun start
```

Visit `http://localhost:3000` to verify everything works.

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

## 📚 Documentation & Resources

- [TanStack Router Docs](https://tanstack.com/router/latest)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [TanStack Start Docs](https://tanstack.com/start/latest)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Vite Docs](https://vitejs.dev/guide/)
- [Node.js Docs](https://nodejs.org/docs/)

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
