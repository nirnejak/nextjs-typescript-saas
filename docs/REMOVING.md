# Removing features

Every optional feature lives in its own folder and turns itself off when its
env vars are missing, so leaving one unconfigured is always safe. To remove one
completely, follow its section below. Remove features in the order listed when
one depends on another (Billing before Auth, Auth and Waitlist before Database).

After each removal, run:

```bash
bun run lint && bun run type-check && bun run build && bun run knip
```

## Billing (Polar)

- Delete: `features/billing/`, `app/pricing/`
- Remove dependencies: `bun remove @polar-sh/better-auth @polar-sh/sdk`
- Env: drop `POLAR_*` from `env.ts` and `.env.example`
- Wiring:
  - `billingPlugins` import and spread in `features/auth/server.ts`
  - `polarClient()` in `features/auth/client.ts`
  - `ManageBillingButton` and `billingEnabled` in `app/(app)/dashboard/page.tsx`
  - the `/pricing/` entry in `app/sitemap.ts`

## Email (Resend + react-email)

- Delete: `features/email/`
- Remove dependencies: `bun remove resend @react-email/components react-email @react-email/ui`
- Env: drop `RESEND_API_KEY` and `EMAIL_FROM` from `env.ts` and `.env.example`
- Wiring:
  - `databaseHooks` and the email imports in `features/auth/server.ts`
  - the `sendEmail` block and email imports in `features/waitlist/actions.ts`
  - the `email:dev` script and `knip.json` template entry

## Analytics (PostHog)

- Delete: `features/analytics/`
- Remove dependencies: `bun remove posthog-js`
- Env: drop `NEXT_PUBLIC_POSTHOG_KEY` from `env.ts` and `.env.example`
- Wiring:
  - `initAnalytics` import and call in `instrumentation-client.ts`
  - `rewrites()` and the `POSTHOG_HOSTS` import in `next.config.ts`

## Monitoring (Sentry / GlitchTip)

- Delete: `features/monitoring/`, `instrumentation.ts`, `app/global-error.tsx`
- Remove dependencies: `bun remove @sentry/nextjs`
- Env: drop `NEXT_PUBLIC_SENTRY_DSN` and `SENTRY_*` from `env.ts` and `.env.example`
- Wiring:
  - `withSentryConfig` in `next.config.ts` (export `withMDX(nextConfig)` directly)
  - the `onRouterTransitionStart` export in `instrumentation-client.ts`

## Waitlist

- Delete: `features/waitlist/`
- Wiring: `<WaitlistForm />` and its import in `app/page.tsx`
- Then `bun run db:generate` to create the migration that drops the table

## Blog (MDX)

- Delete: `app/blog/`, `blogs/`, `mdx-components.tsx`
- Remove dependencies: `bun remove @next/mdx @mdx-js/loader @mdx-js/react @types/mdx @shikijs/rehype @tailwindcss/typography`
- Wiring:
  - `withMDX` and `pageExtensions` in `next.config.ts`
  - `"types": ["mdx"]` in `tsconfig.json`
  - blog entries in `app/sitemap.ts` and `app/llms.txt/route.ts`
  - `@plugin "@tailwindcss/typography"` in `app/main.css`

## Auth (Better Auth, admin, passkeys)

Remove Billing first.

- Delete: `features/auth/`, `app/(auth)/`, `app/(app)/`, `app/api/auth/`, `proxy.ts`, `scripts/make-admin.ts`
- Remove dependencies: `bun remove better-auth @better-auth/passkey auth`
- Env: drop `BETTER_AUTH_*` and `AUTH_*` from `env.ts` and `.env.example`
- Wiring:
  - the `auth:generate` and `db:make-admin` scripts
  - `/dashboard/` and `/admin/` in `app/robots.ts`
- Then `bun run db:generate` to drop the auth tables

## Database (Drizzle + Neon)

Remove Auth and Waitlist first.

- Delete: `db/`, `drizzle.config.ts`, `utils/rate-limit.ts`, `utils/request.ts`
- Remove dependencies: `bun remove drizzle-orm drizzle-kit @neondatabase/serverless`
- Env: drop `DATABASE_URL` from `env.ts` and `.env.example`
- Wiring: the `db:*` scripts in `package.json`
