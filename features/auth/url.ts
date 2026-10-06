import { env } from "@/env"

const vercelUrl = (): string | undefined => {
  const host =
    env.VERCEL_ENV === "production"
      ? env.VERCEL_PROJECT_PRODUCTION_URL
      : env.VERCEL_URL
  return host !== undefined ? `https://${host}` : undefined
}

// BETTER_AUTH_URL wins; on Vercel the deployment URL is used, so previews
// work without extra config
export const authUrl =
  env.BETTER_AUTH_URL ?? vercelUrl() ?? "http://localhost:3000"
