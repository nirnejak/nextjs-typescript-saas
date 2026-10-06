import { posthog } from "posthog-js"

import { env } from "@/env"

import { POSTHOG_HOSTS } from "./config"

export const initAnalytics = (): void => {
  const key = env.NEXT_PUBLIC_POSTHOG_KEY
  // Analytics stays off until NEXT_PUBLIC_POSTHOG_KEY is set
  if (key === undefined) return

  posthog.init(key, {
    // Proxied through next.config.ts rewrites so ad blockers don't drop it
    api_host: "/ingest",
    ui_host: POSTHOG_HOSTS.ui,
    // Includes pageview capture on client-side navigation
    defaults: "2026-08-30",
  })
}
