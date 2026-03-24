# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Cyberpunk-themed portfolio website** built as a "living manifesto" of frontend development skills. It is hosted on GitHub Pages using Next.js static export.

**Current Status:** Phase 1-7 complete. Ready for Phase 8 (CI/CD Pipeline).
**See Also:** [PROJECT_STATUS.md](PROJECT_STATUS.md) for detailed progress.

## Tech Stack

- **Framework:** Next.js 16.2.1 (App Router) with `output: 'export'` for static GitHub Pages
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 with CSS-first `@theme` directive + Tailwind Merge + CLSX
- **Component Architecture:** CVA (Class Variance Authority) + Radix UI primitives
- **Animation:** Framer Motion 12.x (page transitions, micro-interactions)
- **State Management:** Zustand 5.x (command palette state)
- **Forms:** React Hook Form + Zod + @hookform/resolvers (installed in Phase 5)
- **Theming:** next-themes with CSS variables (class strategy)
- **Command Menu:** cmdk 1.x (⌘K command palette)
- **Code Quality:** Biome (linting + formatting, replaces ESLint/Prettier)
- **Git Hooks:** Husky + lint-staged

## Current Directory Structure

```
src/
├── app/
│   ├── globals.css              # Design tokens + utilities + app shell CSS
│   ├── layout.tsx               # Root layout with fonts + ThemeProvider + AppShell
│   ├── template.tsx             # Page transitions with Framer Motion
│   ├── page.tsx                # Hero landing with boot animation (/)
│   ├── design-system/
│   │   └── page.tsx            # Full component showcase (/design-system)
│   ├── architecture/
│   │   └── page.tsx            # Tech stack manifesto (/architecture)
│   ├── engineering/
│   │   └── page.tsx            # Forms showcase with RHF + Zod (/engineering)
│   ├── projects/
│   │   └── page.tsx            # Portfolio grid with filtering (/projects)
│   └── lab/
│       └── page.tsx            # Experimental sandbox (/lab)
├── components/
│   ├── ui/                     # Design system components
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   ├── card.tsx
│   │   ├── cursor.tsx           # Blinking cursor with typing sync (Phase 6)
│   │   ├── dialog.tsx
│   │   ├── form.tsx            # React Hook Form components
│   │   ├── input.tsx
│   │   ├── parallax-background.tsx # Scroll parallax background (Phase 6)
│   │   ├── reveal.tsx           # Staggered spring animations (Phase 6)
│   │   ├── tabs.tsx
│   │   ├── theme-provider.tsx
│   │   └── typing-header.tsx    # Typing command header (Phase 6)
│   ├── layout/                 # App shell + Phase 5 components
│   │   ├── app-shell.tsx       # Main layout wrapper
│   │   ├── sidebar.tsx          # IDE-style file tree navigation
│   │   ├── header.tsx           # Glassmorphic header with breadcrumbs
│   │   ├── command-palette.tsx # ⌘K command menu
│   │   ├── boot-animation.tsx  # Terminal boot sequence (Phase 5)
│   │   ├── hero.tsx            # Hero section with animations (Phase 5)
│   │   └── magnetic-button.tsx # Cursor-tracking CTA button (Phase 5)
│   └── lab/                     # Phase 6 lab components
│       ├── cybernetic-canvas.tsx       # R3F 3D wireframe (Phase 6)
│       ├── cybernetic-canvas-wrapper.tsx # Dynamic import wrapper
│       ├── dnd-provider.tsx            # @dnd-kit context (Phase 6)
│       └── draggable-widgets.tsx       # Sortable server widgets (Phase 6)
├── lib/
│   └── utils.ts                # cn() helper
├── hooks/
│   ├── use-clock.ts            # Real-time clock hook
│   ├── use-cyber-typer.ts       # Realistic typing simulation (Phase 6)
│   ├── use-scroll-parallax.ts   # Scroll parallax hook (Phase 6)
│   └── use-typewriter.ts        # Terminal typewriter effect (Phase 5)
├── store/
│   ├── use-command-store.ts    # Zustand store for command palette
│   ├── use-boot-store.ts       # Zustand store for boot state (Phase 5)
│   └── use-widget-store.ts     # Widget store with localStorage persistence (Phase 6)
└── data/
    └── projects.ts              # Typed project data (Phase 5)
```

## Available Commands

```bash
# Development
pnpm dev                  # Start dev server (http://localhost:3000)

# Build & Deploy
pnpm build               # Static export to /out directory

# Code Quality
pnpm check               # Biome lint + format check
pnpm format              # Biome format write
pnpm lint                # Biome lint
pnpm tsc --noEmit        # TypeScript check
```

## Component Library

All components are in `src/components/ui/` and use CVA + Radix UI:

- **Button** - 6 variants (primary, outline, secondary, accent, ghost, link), 4 sizes, loading state
- **Badge** - 7 variants (default, primary, accent, success, warning, error, outline), 3 sizes
- **Input** - 3 states (default, error, success)
- **Card** - Variants (default, glow, elevated), padding options, sub-components
- **Dialog** - Radix UI, 3 content variants, 3 overlay variants, 5 sizes
- **Tabs** - Radix UI, 3 style variants (default, pills, underline), 3 sizes

See `/design-system` for interactive showcase.

## App Shell Components (Phase 4)

Located in `src/components/layout/`:

- **AppShell** - Main wrapper with animated grid background, CRT grain overlay, CSS Grid layout
- **Sidebar** - IDE-style file tree with collapsible folders, active route glow, Framer Motion animations
- **Header** - Glassmorphic header with breadcrumbs, system status, clock, theme toggle, ⌘K trigger
- **CommandPalette** - Global ⌘K menu with navigation, actions, and Easter eggs (matrix, sudo rm -rf /)

## Theme System

Two visual identities:
- **Dark Mode ("Neon Grid"):** Deep space black (#050505), Electric Cyan (#00f0ff), Matrix Green (#00ff41)
- **Light Mode ("Corpo E-Ink"):** Paper-white, stark black text, vibrant blue/magenta accents

Theme is toggled via `next-themes` using the `class` strategy.

### Cyberpunk Utilities (in globals.css)

- **Neon Glows:** `shadow-neon-cyan`, `shadow-neon-green`, `shadow-neon-primary`
- **Text Glows:** `text-glow-cyan`, `text-glow-green`, `text-gradient-cyber`
- **Border Glow:** `border-glow-cyan`, `border-glow-green`
- **Backgrounds:** `bg-scanlines`, `bg-grid`
- **Glass:** `glass`, `glass-strong`
- **Animations:** `animate-pulse-neon`, `animate-flicker`
- **Fluid Typography:** `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-body`, `text-small`, `text-code`

### App Shell CSS

- **`.app-background`** - Animated cyber-grid with scrolling grid lines
- **`.crt-grain`** - Fixed film grain overlay with mix-blend-mode
- **`.app-shell`** - CSS Grid with sidebar (260px) + header (56px) + main
- **`.app-sidebar`** - Sticky sidebar with glassmorphic surface
- **`.app-header`** - Sticky header with backdrop blur
- **`.app-main`** - Main content area with padding

## Important Configuration Notes

- `next.config.ts` has `output: 'export'` and `images: { unoptimized: true }`
- TypeScript strict mode includes `noUncheckedIndexedAccess`, `noUnusedLocals`, `noUnusedParameters`
- Biome is the sole linter/formatter (ESLint/Prettier replaced)
- Git hooks enforce: `biome format --write` → `biome lint` → `tsc --noEmit`

## Planned Routes (All Implemented)

- `/` - Hero landing page with boot animation
- `/design-system` - Component showcase
- `/architecture` - Tech stack manifesto
- `/engineering` - Forms showcase with RHF + Zod
- `/projects` - Portfolio grid with filtering
- `/lab` - Experimental playground (Phase 6)

## Phase 6: Visual Virtuosity ✅

**Completed:**

1. **Advanced Framer Motion** - `Reveal`, `RevealGroup`, `RevealItem` components with spring physics and staggered animations; scroll-linked parallax backgrounds
2. **Terminal Simulator** - `useCyberTyper` hook with randomized delays and typo simulation; `Cursor` component with typing sync
3. **Lab Route** (`/lab`) - Experimental sandbox with 4 widgets (3D WebGL, Drag-and-Drop, Animations, Terminal)
4. **React Three Fiber** - Wireframe torus with mouse tracking raycasting, theme-synced colors
5. **@dnd-kit Integration** - Sortable server status widgets with Zustand + localStorage persistence

## Next Steps (Phase 7)

1. Lighthouse 100 performance scores
2. WCAG accessibility audit
3. GitHub Actions CI/CD pipeline
4. GitHub Pages deployment

Read `PROJECT_STATUS.md` for detailed progress and notes.
