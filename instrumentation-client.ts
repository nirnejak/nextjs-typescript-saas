import { initAnalytics } from "@/features/analytics/posthog"

export { onRouterTransitionStart } from "@/features/monitoring/sentry.client"

initAnalytics()
