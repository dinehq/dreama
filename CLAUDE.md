# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

All commands use **pnpm** as the package manager.

```bash
pnpm dev       # Start dev server (Turbopack)
pnpm build     # Production build
pnpm start     # Start production server
pnpm lint      # Run ESLint
```

No test runner is configured.

## Architecture

Next.js 16 App Router + React 19 + TypeScript + Tailwind CSS v4. Chinese-language marketing site for Dreama (造梦次元), an AI creative platform.

```
src/
├── app/
│   ├── globals.css     # Design tokens (@theme), dark mode CSS vars only
│   ├── layout.tsx      # Root layout — wraps all pages with Nav + Footer
│   └── page.tsx        # Homepage — composes 5 section components
└── components/
    ├── layout/         # Nav.tsx, Footer.tsx
    ├── sections/       # One file per homepage section
    ├── ui/             # Shared primitives (Button, FeatureCard)
    └── icons/          # SVG icons loaded as React components via @svgr/webpack
```

**Routing:** App Router only — no Pages Router. New routes go under `src/app/`.

**Styling:** Tailwind CSS v4 with design tokens defined as CSS custom properties in `globals.css`. Dark mode is CSS-var-only — do not use `dark:` Tailwind classes.

**SVG Icons:** Import `.svg` files directly as React components:

```tsx
import ChevronLeftIcon from "@/components/icons/chevron-left.svg";
<ChevronLeftIcon width={24} height={24} className="text-brand" />;
```

**Path alias:** `@/*` → `./src/*`

**Slow navigation fix:** If fixing slow client-side navigations, export `unstable_instant` from the route. Read `node_modules/next/dist/docs/01-app/02-guides/instant-navigation.mdx` first.
