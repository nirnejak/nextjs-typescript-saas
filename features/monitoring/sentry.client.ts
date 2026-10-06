import * as Sentry from "@sentry/nextjs"

import { env } from "@/env"

import { monitoringEnabled } from "./config"

Sentry.init({
  dsn: env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: monitoringEnabled,
  tracesSampleRate: 0.1,
})

// oxlint resolves the server build of @sentry/nextjs, which lacks this
// client-only export; the types (and the client bundle) have it
// oxlint-disable-next-line import/namespace
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
