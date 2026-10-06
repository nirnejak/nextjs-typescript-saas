// No imports here: next.config.ts loads this file for the /ingest rewrites

// US cloud. EU: eu.i.posthog.com / eu-assets.i.posthog.com / eu.posthog.com
// Self-hosted: point all three at your instance
export const POSTHOG_HOSTS = {
  api: "https://us.i.posthog.com",
  assets: "https://us-assets.i.posthog.com",
  ui: "https://us.posthog.com",
}
