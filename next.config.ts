import "./env"

import createMDX from "@next/mdx"
import { withSentryConfig } from "@sentry/nextjs/config"
import type { NextConfig } from "next"

import { POSTHOG_HOSTS } from "./features/analytics/config"

const nextConfig: NextConfig = {
  reactCompiler: true,
  trailingSlash: true,
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "mdx"],
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: `${POSTHOG_HOSTS.assets}/static/:path*`,
      },
      {
        source: "/ingest/:path*",
        destination: `${POSTHOG_HOSTS.api}/:path*`,
      },
    ]
  },
  experimental: {
    // TypeScript 7 (native Go compiler) doesn't expose the compiler API that
    // Next.js uses for type checking, so run the `tsc` CLI instead.
    useTypeScriptCli: true,
  },
}

// Plugins are referenced by name: Turbopack needs serializable options
const withMDX = createMDX({
  options: {
    rehypePlugins: [["@shikijs/rehype", { theme: "plastic" }]],
  },
})

export default withSentryConfig(withMDX(nextConfig), {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: process.env.CI === undefined,
  // Upload source maps only when a token is configured
  sourcemaps: { disable: process.env.SENTRY_AUTH_TOKEN === undefined },
})
