import type { Metadata } from "next"
import { notFound } from "next/navigation"
import type * as React from "react"

import { blogs, getBlog } from "@/blogs"
import { getMetadata } from "@/utils/metadata"

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return blogs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = getBlog((await params).slug)
  if (blog === undefined) return {}
  return getMetadata({
    path: `/blog/${blog.slug}/`,
    title: blog.title,
    description: blog.description,
    image: blog.cover.src,
  })
}

const BlogPage: React.FC<Props> = async ({ params }) => {
  const blog = getBlog((await params).slug)
  if (blog === undefined) notFound()
  return <blog.Content />
}

export default BlogPage
