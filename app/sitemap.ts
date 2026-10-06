import type { MetadataRoute } from "next"

import { blogs } from "@/blogs"
import config from "@/config"

const { baseUrl } = config

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${baseUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/blog/`, changeFrequency: "weekly", priority: 0.8 },
    ...blogs.map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}/`,
      lastModified: blog.publishedOn,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]
}
