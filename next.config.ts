import type { NextConfig } from "next"
import createMDX from "@next/mdx"

const nextConfig: NextConfig = {
  reactCompiler: true,
  trailingSlash: true,
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
}

const withMDX = createMDX({
  options: {},
})

export default withMDX(nextConfig)
