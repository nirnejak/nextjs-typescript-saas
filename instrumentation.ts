import * as Sentry from "@sentry/nextjs"

export async function register(): Promise<void> {
  await import("@/features/monitoring/sentry.server")
}

export const onRequestError = Sentry.captureRequestError
