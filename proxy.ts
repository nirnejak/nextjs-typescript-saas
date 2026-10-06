import { getSessionCookie } from "better-auth/cookies"
import { type NextRequest, NextResponse } from "next/server"

// Optimistic check: only looks for the cookie. Pages still verify the session
// with requireSession() / requireAdmin()
export function proxy(request: NextRequest): NextResponse {
  if (getSessionCookie(request) === null) {
    return NextResponse.redirect(new URL("/sign-in/", request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
}
