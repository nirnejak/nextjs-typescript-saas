import { createAuthClient } from "better-auth/react"

// Same-origin: Better Auth uses the current URL and /api/auth by default
export const authClient = createAuthClient()
