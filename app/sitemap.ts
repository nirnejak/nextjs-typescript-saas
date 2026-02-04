import { MetadataRoute } from "next"

import config from "@/config"

import { blogs } from "@/app/blog/data"

const { baseUrl } = config

export const dynamic = "force-dynamic"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    {
      url: baseUrl + `/`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: baseUrl + `/contact/`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ]

  const blogRoutes = blogs.map((blog) => ({
    url: baseUrl + `/blog/${blog.slug}/`,
    lastModified: new Date(blog.publishedOn),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...blogRoutes]
}
