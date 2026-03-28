# CLAUDE.md

## Commands

```bash
pnpm dev       # Start dev server (Turbopack)
pnpm build     # Production build
pnpm lint      # Run ESLint
pnpm subset    # Subset OPPO Sans font after adding new Chinese text
```

No test runner is configured.

## Rules

- Do not comment excessively — only comment non-obvious logic
- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4
- Static export (`output: "export"`) — no middleware, no server-side features, i18n is client-side
- Dark mode is CSS-var-only (toggled via `.dark` class on `<html>`) — do not use `dark:` Tailwind classes
- Images in `src/assets/` with static imports; `.webp` preferred; `public/` only for fonts and video
- SVGs in `src/components/icons/` are React components via `@svgr/webpack`
