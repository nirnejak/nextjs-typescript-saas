// Adds the named `metadata` export each post defines to @types/mdx's module
declare module "*.mdx" {
  export const metadata: import("@/blogs/types").BlogMetadata
}
