import "./env"

import createMDX from "@next/mdx"
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

export default withMDX(nextConfig)
