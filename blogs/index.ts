import type * as React from "react"

import FirstBlog, { metadata as firstBlog } from "./first-blog/content.mdx"
import type { BlogMetadata } from "./types"

export interface Blog extends BlogMetadata {
  slug: string
  Content: React.ComponentType
}

// Add new posts here
const entries: Blog[] = [
  { slug: "first-blog", ...firstBlog, Content: FirstBlog },
]

export const blogs = entries.toSorted((a, b) =>
  b.publishedOn.localeCompare(a.publishedOn)
)

export const getBlog = (slug: string): Blog | undefined =>
  blogs.find((blog) => blog.slug === slug)
