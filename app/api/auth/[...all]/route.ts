import { toNextJsHandler } from "better-auth/next-js"

import { auth } from "@/features/auth/server"

const handler = toNextJsHandler(auth)

// trailingSlash: true redirects /api/auth/x to /api/auth/x/, but Better Auth
// only matches paths without the trailing slash, so strip it here
const stripTrailingSlash =
  (next: (request: Request) => Promise<Response>) =>
  (request: Request): Promise<Response> => {
    const url = new URL(request.url)
    if (!url.pathname.endsWith("/")) return next(request)
    url.pathname = url.pathname.slice(0, -1)
    return next(
      new Request(url, {
        method: request.method,
        headers: request.headers,
        body: request.body,
        // Required by Node when forwarding a streamed body
        duplex: "half",
      } as RequestInit)
    )
  }

export const GET = stripTrailingSlash(handler.GET)
export const POST = stripTrailingSlash(handler.POST)
