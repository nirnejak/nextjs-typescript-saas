import { blogs } from "@/blogs"
import config from "@/config"

export const dynamic = "force-static"

// https://llmstxt.org
export function GET(): Response {
  const lines = [
    `# ${config.appName}`,
    "",
    `> ${config.appDescription}`,
    "",
    "## Blog",
    "",
    ...blogs.map(
      (blog) =>
        `- [${blog.title}](${config.baseUrl}/blog/${blog.slug}/): ${blog.description}`
    ),
  ]
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
