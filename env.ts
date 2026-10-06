import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

// Core vars are required. Every feature's vars are optional: a feature turns
// itself off when they're missing (see features/*/config.ts)
export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(32),
    BETTER_AUTH_URL: z.url(),

    AUTH_GOOGLE_ID: z.string().optional(),
    AUTH_GOOGLE_SECRET: z.string().optional(),
    AUTH_APPLE_ID: z.string().optional(),
    AUTH_APPLE_SECRET: z.string().optional(),
    AUTH_TWITTER_ID: z.string().optional(),
    AUTH_TWITTER_SECRET: z.string().optional(),

    RESEND_API_KEY: z.string().optional(),
    EMAIL_FROM: z.string().optional(),

    POLAR_ACCESS_TOKEN: z.string().optional(),
    POLAR_WEBHOOK_SECRET: z.string().optional(),
    POLAR_PRODUCT_ID_PRO: z.string().optional(),
    POLAR_SERVER: z.enum(["sandbox", "production"]).default("sandbox"),

    SENTRY_AUTH_TOKEN: z.string().optional(),
    SENTRY_ORG: z.string().optional(),
    SENTRY_PROJECT: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
    NEXT_PUBLIC_SENTRY_DSN: z.url().optional(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },
  emptyStringAsUndefined: true,
})
