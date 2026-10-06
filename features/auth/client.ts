import { passkeyClient } from "@better-auth/passkey/client"
import { polarClient } from "@polar-sh/better-auth/client"
import { adminClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

// Same-origin: Better Auth uses the current URL and /api/auth by default
export const authClient = createAuthClient({
  plugins: [adminClient(), passkeyClient(), polarClient()],
})
