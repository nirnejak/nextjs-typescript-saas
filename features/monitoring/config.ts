import { env } from "@/env"

// Works with Sentry and self-hosted GlitchTip (same SDK, different DSN)
export const monitoringEnabled = env.NEXT_PUBLIC_SENTRY_DSN !== undefined
