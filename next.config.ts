import createMDX from "@next/mdx"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactCompiler: true,
  trailingSlash: true,
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    // TypeScript 7 (native Go compiler) doesn't expose the compiler API that
    // Next.js uses for type checking, so run the `tsc` CLI instead.
    useTypeScriptCli: true,
  },
}

const withMDX = createMDX({
  options: {},
})

export default withMDX(nextConfig)
