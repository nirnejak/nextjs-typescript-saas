import { blogs } from "@/blogs"

const orderedSlugs = ["first-blog"]

export const allBlogs = orderedSlugs.map((slug) => ({
  slug,
  title: blogs[slug].title,
  publishedOn: blogs[slug].publishedOn,
}))
