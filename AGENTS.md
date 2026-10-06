# AGENTS.md

Guidelines and commands for coding agents working in this Next.js TypeScript SaaS starter.

Next.js docs for the installed version are in `node_modules/next/dist/docs/`. Read them before using unfamiliar Next.js APIs.

## Commands

- `bun run dev` - Start the dev server (http://localhost:3000)
- `bun run build` - Production build
- `bun run start` - Start the production server
- `bun run lint` / `bun run lint:fix` - oxlint
- `bun run format` / `bun run format:check` - oxfmt
- `bun run type-check` - TypeScript (run after `build`, it reads Next's generated `.next/types`)
- `bun run knip` - Unused files, exports and dependencies
- `bun run db:generate` - Generate a migration from schema changes
- `bun run db:migrate` - Apply pending migrations
- `bun run db:push` - Push the schema directly (development only)
- `bun run db:studio` - Drizzle Studio
- `bun run db:make-admin <email>` - Give a user the admin role
- `bun run auth:generate` - Regenerate `features/auth/schema.ts` from the Better Auth config
- `bun run email:dev` - Preview email templates on port 3001

There are no tests. Before completing work, run:

```bash
bun run lint && bun run format:check && bun run build && bun run type-check && bun run knip
```

## Project Structure

```
app/                       Routes
  page.tsx blog/ pricing/  Marketing pages live directly in app/ (no route group)
  (auth)/sign-in/          Sign-in page
  (app)/                   Signed-in pages; (app)/layout.tsx calls requireSession()
  api/auth/[...all]/       Better Auth handler (also Polar webhooks)
  robots.ts sitemap.ts manifest.ts icon.tsx apple-icon.tsx opengraph-image.tsx llms.txt/
features/                  Optional features, one folder each
  auth/                    server.ts (auth instance), client.ts, session.ts, providers.ts, schema.ts
  billing/                 Polar plugin, CheckoutButton, ManageBillingButton
  email/                   sendEmail(), react-email templates
  analytics/               PostHog init and hosts
  monitoring/              Sentry init
  waitlist/                Table, server action, form
blogs/                     MDX posts; each exports `metadata`, registered in blogs/index.ts
db/                        Drizzle client, shared tables (rate limit), migrations
hooks/                     useDynamicHeight
utils/                     classNames, metadata, schema (JSON-LD), rate-limit, request, animation
scripts/                   make-admin.ts
docs/REMOVING.md           How to remove each feature
env.ts                     Typed env (t3-env + zod)
proxy.ts                   Optimistic redirect for /dashboard and /admin
config.ts                  Site name, URL and SEO details
```

## Feature Conventions

- Each optional feature lives in `features/<name>/` and owns its components, server code and Drizzle tables (`features/<name>/schema.ts`, picked up by `drizzle.config.ts`).
- A feature turns itself off when its env vars are missing (`billingEnabled`, `emailEnabled`, `monitoringEnabled`, or a key check). Never make a feature's env var required in `env.ts`.
- Add new env vars to `env.ts` and `.env.example` together. Client vars need the `NEXT_PUBLIC_` prefix and an entry in `experimental__runtimeEnv`.
- When adding or removing a feature, update `docs/REMOVING.md`.

## Auth

- Better Auth with the `admin`, `passkey` and `nextCookies` plugins (keep `nextCookies()` last), plus Polar when billing is configured.
- The auth schema is generated. After changing plugins, run `bun run auth:generate`, then `bun run db:generate`.
- `features/auth/server.ts` must not import `server-only` (directly or through its imports), because the Better Auth CLI loads it.
- `proxy.ts` only checks that a session cookie exists. Pages and server actions must verify with `requireSession()` or `requireAdmin()` from `features/auth/session.ts`.
- Social providers are enabled only when both their id and secret are set (`features/auth/providers.ts`).

## Code Style

oxlint handles linting and oxfmt handles formatting (no ESLint, Prettier or Biome).

- No semicolons, double quotes, ES5 trailing commas, 2-space indent, 80-char line width
- Tailwind classes are sorted by oxfmt (`className`, `classNames(...)`, `cx(...)`, `clsx(...)`, `twMerge(...)`)
- Pre-commit hook runs `oxlint --fix` and `oxfmt` via lint-staged

### Imports

```typescript
import * as motion from "motion/react-client"
import type * as React from "react"

import config from "@/config"
import classNames from "@/utils/classNames"
```

- `import * as React from "react"`, or `import type * as React` when only types are used
- Type-only imports: `import type { Metadata } from "next"`
- Absolute imports with `@/`; relative only within a feature folder
- Group imports: external packages, then `@/` modules, then relative

### Components

```typescript
interface Props {
  title: string
}

const Card: React.FC<Props> = ({ title }) => {
  return <h2 className="text-lg font-semibold">{title}</h2>
}

export default Card
```

- Server components by default; `"use client"` only when needed
- `React.FC<Props>` with a default export
- No UI component library: plain Tailwind markup, icons from `akar-icons`
- Use `classNames()` for conditional classes

### Naming

- Components: PascalCase files and names
- Hooks: `use` prefix, camelCase
- Constants: UPPER_SNAKE_CASE
- Database tables and columns: snake_case

### Data and Server Code

- Mutations are server actions validated with zod, returning a state object for `useActionState` (see `features/waitlist/actions.ts`)
- Rate-limit public actions with `rateLimit()` from `utils/rate-limit.ts`
- Use `console.error` for failures and return a generic message; never expose internal errors
- `sendEmail()` never throws; it logs to the console when email isn't configured

## SEO

- Site-wide metadata defaults are in `app/layout.tsx`; pages call `getMetadata()` from `utils/metadata.ts` with a plain title (the layout adds `| App Name`)
- Pages are under `trailingSlash: true`, so links and paths end with `/`
- Add new public pages to `app/sitemap.ts`

## Styling

- Tailwind CSS v4 with `@theme` in `app/main.css`
- Dark mode follows the OS via `dark:` variants
- Animations: `motion` with `BASE_TRANSITION` from `utils/animation.ts`

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
