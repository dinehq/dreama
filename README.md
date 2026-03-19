# Dreama Website

Official website for Dreama (造梦次元), built with Next.js 16 and Tailwind CSS v4.

## Tech Stack

- **Framework**: Next.js 16 (App Router + Turbopack)
- **Styles**: Tailwind CSS v4
- **Language**: TypeScript
- **Package manager**: Bun

## Getting Started

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the result.

## Project Structure

```
src/
├── app/
│   ├── globals.css   # Tailwind @theme design tokens
│   ├── layout.tsx
│   └── page.tsx
└── components/
    ├── layout/       # Nav, Footer
    ├── sections/     # Page sections
    ├── ui/           # Shared UI primitives
    └── icons/        # SVG icons + LogoIcon
```

## Icon System

Drop any `.svg` file into `src/components/icons/` and import it directly as a React component:

```tsx
import ChevronLeftIcon from "@/components/icons/chevron-left.svg";

<ChevronLeftIcon width={24} height={24} className="text-brand" />
```

Powered by `@svgr/webpack` via Turbopack loader rules (`next.config.ts`). Types declared in `src/svg.d.ts`. For complex icons, use `_template.tsx` as a starting point.

## Build

```bash
bun run build
```

## TODO

- **OPPO Sans 4.0 SC**: add font files to `public/fonts/` and declare `@font-face` in `globals.css`
- **`HeroSection`**: replace placeholder with full-bleed hero image / video
- **`AIShowcaseSection`**: replace placeholder with one screenshot or video per tab (3 total)
- **`TestimonialSection`**: replace placeholder with three user portraits (overlapping circles layout)
