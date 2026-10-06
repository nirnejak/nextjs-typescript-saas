import "./env"

import createMDX from "@next/mdx"
import { withSentryConfig } from "@sentry/nextjs/config"
import type { NextConfig } from "next"

import { POSTHOG_HOSTS } from "./features/analytics/config"

const nextConfig: NextConfig = {
  reactCompiler: true,
  trailingSlash: true,
  pageExtensions: ["ts", "tsx", "mdx"],
  // A nonce-based CSP forces dynamic rendering for every page, so only
  // frame-ancestors is set here. See the Next.js CSP guide to add one
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
        ],
      },
    ]
  },
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
