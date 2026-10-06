# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev              # Start dev server (localhost:3000)
bun run build            # Production build
bun run lint             # oxlint (lint:fix to auto-fix)
bun run format           # oxfmt (format:check to check)
bun run type-check       # TypeScript (after build: reads .next/types)
bun run knip             # Unused files, exports and dependencies
bun run db:generate      # Generate Drizzle migrations from schema
bun run db:migrate       # Run pending migrations
bun run db:push          # Push schema to DB (dev only)
bun run db:studio        # Drizzle Studio UI
bun run db:make-admin    # Give a user the admin role: bun run db:make-admin you@example.com
bun run auth:generate    # Regenerate features/auth/schema.ts after changing auth plugins
bun run email:dev        # Preview email templates on port 3001
```

There are no tests. Run `bun run lint`, `bun run build`, `bun run type-check` and `bun run knip` before completing work.

Next.js docs for the installed version are in `node_modules/next/dist/docs/`.

## Architecture

**Next.js 16 App Router** with React 19 and React Compiler enabled. Server components by default; use `"use client"` only when needed.

- `app/` — Marketing pages directly in `app/` (`page.tsx`, `blog/`, `pricing/`); `(auth)/sign-in`; `(app)/dashboard` and `(app)/admin` behind `requireSession()` in `(app)/layout.tsx`; metadata routes (robots, sitemap, manifest, icons, OG image, `llms.txt`)
- `features/` — Optional features, each owning its components, server code and Drizzle tables: `auth`, `billing` (Polar), `email` (Resend + react-email), `analytics` (PostHog), `monitoring` (Sentry), `waitlist`
- `blogs/` — MDX posts; each exports `metadata` and is registered in `blogs/index.ts`
- `db/` — Drizzle client (Neon serverless), shared tables, migrations
- `hooks/` — `useDynamicHeight`
- `utils/` — `classNames`, `getMetadata`, JSON-LD, `rateLimit`, `getClientIp`, animation presets
- `env.ts` — Typed env (t3-env + zod). Only `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` are required
- `proxy.ts` — Cookie-only redirect for `/dashboard` and `/admin`
- `config.ts` — Site name, URL and SEO details
- `docs/REMOVING.md` — How to remove each feature

**Auth**: Better Auth in `features/auth/server.ts` (plugins: `admin`, `passkey`, Polar when configured, `nextCookies` last). Client in `features/auth/client.ts`, session helpers in `features/auth/session.ts`. The schema is generated: run `auth:generate` then `db:generate`. `server.ts` must not import `server-only` (the CLI loads it).

**Features are env-gated**: each turns itself off when its env vars are missing. Keep feature env vars optional, add them to `env.ts` and `.env.example`, and update `docs/REMOVING.md`.

## Code Style

oxlint handles linting and oxfmt handles formatting (no ESLint/Prettier/Biome). Key rules:

- No semicolons, double quotes, ES5 trailing commas, 2-space indent, 80-char line width
- Tailwind classes sorted automatically by oxfmt (`sortTailwindcss` — recognizes `className`, `classNames(...)`, `cx(...)`, `clsx(...)`, `twMerge(...)`)
- Pre-commit hook runs `oxlint --fix` and `oxfmt` via lint-staged

See `AGENTS.md` for component patterns, import conventions and server-code patterns.

## Key Conventions

- Use `bun` as the package manager (not npm/yarn)
- Absolute imports via `@/*` path alias (e.g., `@/utils/classNames`)
- Namespace imports for React: `import * as React from "react"`
- Type-only imports: `import type { Viewport } from "next"`
- Components: `React.FC<Props>` with default export
- No UI component library: plain Tailwind markup, icons from `akar-icons`
- Mutations: server actions validated with zod, rate-limited with `rateLimit()` when public
- `trailingSlash: true`: internal links and paths end with `/`
- Styling: Tailwind v4 with `@theme` in `app/main.css`, dark mode via `dark:` (follows the OS)
- Animations: `motion` package with `BASE_TRANSITION` from `utils/animation.ts`
