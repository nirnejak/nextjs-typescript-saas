import * as Sentry from "@sentry/nextjs"

import { env } from "@/env"

import { monitoringEnabled } from "./config"

Sentry.init({
  dsn: env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: monitoringEnabled,
  tracesSampleRate: 0.1,
})
