import type { StaticImageData } from "next/image"
import type * as React from "react"

import b0Content from "./first-blog/content.mdx"
import b0Cover from "./first-blog/cover.png"

export interface BlogEntry {
  title: string
  description: string
  publishedOn: string
  cover: StaticImageData
  Content: React.ComponentType
}

export const blogs: Record<string, BlogEntry> = {
  "first-blog": {
    title: "First Blog",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
    publishedOn: "4 Feb 2025",
    cover: b0Cover,
    Content: b0Content,
  },
}

export const blogSlugs = Object.keys(blogs)
