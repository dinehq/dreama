# CLAUDE.md

@AGENTS.md

## Commands

```bash
pnpm dev       # Start dev server (Turbopack)
pnpm build     # Production build
pnpm start     # Start production server
pnpm lint      # Run ESLint
pnpm subset    # Subset OPPO Sans font to glyphs used in source
```

No test runner is configured.

## Architecture

Next.js 16 App Router + React 19 + TypeScript + Tailwind CSS v4. Chinese-language marketing site for Dreama (造梦次元), an AI creative platform.

```
src/
├── app/
│   ├── globals.css     # Design tokens (@theme), dark mode CSS vars only
│   ├── layout.tsx      # Root layout — wraps all pages with Nav + Footer
│   ├── (zh)/page.tsx   # Chinese homepage
│   └── en/page.tsx     # English homepage
├── assets/             # All static assets (images, fonts, video)
│   ├── fonts/          # OPPO Sans, OwnersText — referenced via relative url() in CSS
│   ├── features/       # Feature card images (.webp) and illustrations (.svg)
│   ├── carousel/       # AI showcase carousel images
│   ├── creators/       # Creator avatar images
│   └── logos/          # Logo images, text-logo SVGs, avatar video
├── components/
│   ├── layout/         # Nav.tsx, Footer.tsx
│   ├── sections/       # One file per homepage section
│   ├── ui/             # Shared primitives (Button, FeatureCard)
│   └── icons/          # SVG icons as React components via @svgr/webpack
├── hooks/              # Custom React hooks
└── i18n/               # zh.ts, en.ts — translation dictionaries
```

## Key Conventions

**Routing:** App Router only. New routes go under `src/app/`.

**Styling:** Tailwind CSS v4 with design tokens as CSS custom properties in `globals.css`. Dark mode is CSS-var-only — do not use `dark:` Tailwind classes.

**Assets:** Images and SVGs live in `src/assets/` with static imports (content hashing, blur placeholders). `public/` is only for files loaded by the browser via URL — fonts (CSS `url()`) and video. Prefer `.webp` over `.jpg`/`.png` — compress with `cwebp` when adding new raster images.

**SVG Icons:** `.svg` files are transformed to React components via `@svgr/webpack` (configured in turbopack rules). Import and render inline:

```tsx
import ChevronLeftIcon from "@/components/icons/chevron-left.svg";
<ChevronLeftIcon width={24} height={24} className="text-brand" />;
```

SVGs in `src/assets/` also become components — FeatureCard handles both `StaticImageData` and SVG components as `image.src`.

**Path alias:** `@/*` maps to `./src/*`.

**Static export:** `output: "export"` in next.config — no middleware, no server-side features. i18n is client-side.

**Font subsetting:** `pnpm subset` scans source files for used glyphs and produces `OPPOSans.subset.woff2`. Run after adding new Chinese text.
