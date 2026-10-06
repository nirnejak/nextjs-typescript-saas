import { passkey } from "@better-auth/passkey"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { admin } from "better-auth/plugins"

import config from "@/config"
import { db } from "@/db"
import { env } from "@/env"

import { socialProviders } from "./providers"
import * as schema from "./schema"

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, { provider: "pg", schema }),
  socialProviders,
  // Apple posts back from its own origin
  trustedOrigins: ["https://appleid.apple.com"],
  rateLimit: { enabled: true, storage: "database" },
  plugins: [
    admin(),
    passkey({
      rpID: new URL(env.BETTER_AUTH_URL).hostname,
      rpName: config.appName,
      origin: env.BETTER_AUTH_URL,
    }),
    // Must stay last so cookies set inside server actions persist
    nextCookies(),
  ],
})
