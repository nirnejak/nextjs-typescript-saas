<h1 align="center">
  Next.js TypeScript SaaS Starter
</h1>

<p align="center">
  A full-featured Next.js starter for SaaS products, where every feature is easy to remove
</p>

---

## Features

- Next.js 16 App Router, React 19 with React Compiler, TypeScript 7
- Tailwind CSS v4, Motion, Akar Icons. No component library, design is yours
- Better Auth: Google, Apple and X sign-in, passkeys, admin role with user management
- Drizzle ORM with Neon serverless Postgres
- Polar billing: checkout, customer portal, webhooks
- Email with react-email templates, sent through Resend
- PostHog analytics, proxied through `/ingest`
- Sentry error monitoring (also works with self-hosted GlitchTip)
- Waitlist form with validation and Postgres-backed rate limiting
- MDX blog with build-time Shiki highlighting
- SEO: metadata, generated icons and Open Graph image, sitemap, robots, manifest, JSON-LD, `llms.txt`
- Typed env validation, security headers, `proxy.ts` route protection
- oxlint, oxfmt, Knip, Husky + lint-staged, GitHub Actions CI, Dependabot

Optional features turn themselves off until their env vars are set, so a fresh clone runs with only the three core variables.

## Getting Started

1. Clone and install:

   ```bash
   git clone https://github.com/nirnejak/nextjs-typescript-saas.git my-app
   cd my-app
   bun install
   ```

2. Copy `.env.example` to `.env` and fill in `DATABASE_URL`, `BETTER_AUTH_SECRET` (`openssl rand -base64 32`) and `BETTER_AUTH_URL`. To sign in, also set at least one OAuth provider (`AUTH_GOOGLE_*`, `AUTH_APPLE_*` or `AUTH_TWITTER_*`); passkeys are added after the first sign-in.

3. Create the tables and start the dev server:

   ```bash
   bun run db:migrate
   bun run dev
   ```

4. Sign in once, then make yourself an admin:

   ```bash
   bun run db:make-admin you@example.com
   ```

Update `config.ts` with your site's name, URL and author details.

## Environment Variables

| Variable                                            | Required | Feature                                                           |
| --------------------------------------------------- | -------- | ----------------------------------------------------------------- |
| `DATABASE_URL`                                      | Yes      | Database                                                          |
| `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`             | Yes      | Auth (`BETTER_AUTH_URL` defaults to the deployment URL on Vercel) |
| `AUTH_GOOGLE_*`, `AUTH_APPLE_*`, `AUTH_TWITTER_*`   | No       | Each sign-in provider, enabled when both are set                  |
| `RESEND_API_KEY`, `EMAIL_FROM`                      | No       | Email (logged to the console when unset)                          |
| `POLAR_ACCESS_TOKEN`, `POLAR_PRODUCT_ID_PRO`        | No       | Billing                                                           |
| `POLAR_WEBHOOK_SECRET`                              | No       | Billing webhooks                                                  |
| `POLAR_SERVER`                                      | No       | `sandbox` (default) or `production`                               |
| `NEXT_PUBLIC_POSTHOG_KEY`                           | No       | Analytics                                                         |
| `NEXT_PUBLIC_SENTRY_DSN`                            | No       | Monitoring                                                        |
| `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT` | No       | Source map upload                                                 |

The app uses `trailingSlash: true`, so set the Polar webhook URL to `https://your-domain/api/auth/polar/webhooks/` (with the trailing slash).

## Scripts

| Script                  | Description                                            |
| ----------------------- | ------------------------------------------------------ |
| `bun run dev`           | Start the dev server                                   |
| `bun run build`         | Production build                                       |
| `bun run start`         | Start the production server                            |
| `bun run lint`          | Lint with oxlint (`lint:fix` to auto-fix)              |
| `bun run format`        | Format with oxfmt (`format:check` to check)            |
| `bun run type-check`    | TypeScript type checking                               |
| `bun run knip`          | Find unused files, exports and dependencies            |
| `bun run db:generate`   | Generate a migration from schema changes               |
| `bun run db:migrate`    | Apply pending migrations                               |
| `bun run db:push`       | Push the schema directly (development only)            |
| `bun run db:studio`     | Open Drizzle Studio                                    |
| `bun run db:make-admin` | Give a user the admin role                             |
| `bun run auth:generate` | Regenerate the auth schema after changing auth plugins |
| `bun run email:dev`     | Preview email templates on port 3001                   |

## Project Structure

```
app/
  page.tsx  blog/  pricing/       Marketing pages, directly in app/
  (auth)/sign-in/                 Sign-in page
  (app)/dashboard/  (app)/admin/  Signed-in pages (layout requires a session)
  api/auth/[...all]/              Better Auth (also serves Polar webhooks)
  robots.ts  sitemap.ts  manifest.ts  icon.tsx  opengraph-image.tsx  llms.txt/
features/
  auth/  billing/  email/  analytics/  monitoring/  waitlist/
blogs/                            MDX posts
db/                               Drizzle client, shared tables, migrations
hooks/  utils/  scripts/
env.ts                            Typed env validation
proxy.ts                          Redirects signed-out users away from /dashboard and /admin
config.ts                         Site name, URL and SEO details
```

Each `features/<name>/` folder owns its components, server code and database tables.

## Removing Features

See [docs/REMOVING.md](docs/REMOVING.md) for a checklist per feature.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [Jitendra Nirnejak](https://github.com/nirnejak)
