# Dreama Website

Official website for Dreama (造梦次元), built with Next.js 16 and Tailwind CSS v4.

## Tech Stack

- **Framework**: Next.js 16 (App Router + Turbopack)
- **Styles**: Tailwind CSS v4
- **Language**: TypeScript
- **Package manager**: pnpm

## Commands

```bash
pnpm dev       # Subset font, then start dev server (Turbopack)
pnpm build     # Subset font, then production build
pnpm subset    # Regenerate OPPOSans.subset.woff2 manually
pnpm start     # Start production server
pnpm lint      # Run ESLint
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
pnpm build
```

## Font

OPPO Sans 4.0 SC is used for all text. The full font (~6 MB) is subsetted down to only the characters used in the source files (~40 KB) at build time via `scripts/subset-font.ts`, using [`subset-font`](https://www.npmjs.com/package/subset-font) (HarfBuzz WASM). The generated `OPPOSans.subset.woff2` is gitignored.
