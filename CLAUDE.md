# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev              # Start dev server (localhost:3000)
bun run build            # Production build
bun run lint             # Biome linter
bun run lint:fix         # Biome linter with auto-fix
bun run format           # Biome formatter
bun run type-check       # TypeScript type checking
bun run db:generate      # Generate Drizzle migrations from schema
bun run db:migrate       # Run pending migrations
bun run db:push          # Push schema to DB (dev only)
bun run db:studio        # Drizzle Studio UI
```

Run `bun run lint`, `bun run type-check`, and `bun run build` before completing work.

## Architecture

**Next.js 16 App Router** with React 19 and React Compiler enabled. Server components by default; use `"use client"` directive only when needed.

- `app/` — Pages, layouts, API routes, and `main.css` (Tailwind v4 global styles + custom animations)
- `components/atoms/` — Atomic UI components using CVA (class-variance-authority) for variants
- `hooks/` — Custom React hooks (useModal, useClickOutside, useDynamicHeight, useTheme)
- `utils/` — Auth setup, metadata generation, schema.org, classNames helper, animation presets
- `db/` — Drizzle ORM schema and migrations (Neon PostgreSQL via `@neondatabase/serverless`)
- `config.ts` — Site-wide SEO/metadata configuration

**Auth**: Better Auth with OAuth providers (Google, Apple, Twitter). Server instance in `utils/auth.ts`, client in `utils/auth-client.ts`. Auth API handled by catch-all route at `app/api/auth/[...all]/route.ts`.

**Database**: Drizzle ORM with Neon serverless PostgreSQL. Schema in `db/schema.ts` (user, session, account, verification, waitlist tables). Config in `drizzle.config.ts`.

**Content**: MDX support via `@next/mdx`. Custom components in `mdx-components.tsx` with Shiki syntax highlighting. Blog posts as `.mdx` files under `app/blog/`.

## Code Style

Biome handles both linting and formatting (no ESLint/Prettier). Key rules:
- No semicolons, double quotes, ES5 trailing commas, 2-space indent
- Tailwind classes must be sorted (`useSortedClasses` rule)
- Pre-commit hook runs `biome check --fix` via lint-staged

See `AGENTS.md` for detailed component patterns, import conventions, naming rules, and database patterns.

## Key Conventions

- Use `bun` as the package manager (not npm/yarn)
- Absolute imports via `@/*` path alias (e.g., `@/utils/classNames`)
- Namespace imports for React: `import * as React from "react"`
- Type-only imports: `import type { Viewport } from "next"`
- Components: `React.FC<Props>` with default export, props interface extending HTML attributes
- Styling: Tailwind v4 with `@theme` directives in `app/main.css`, dark mode via `dark:` prefix
- Animations: Framer Motion (`motion` package) with `BASE_TRANSITION` preset from `utils/animation.ts`
