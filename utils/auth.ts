import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"

import { db } from "@/db"
import * as schema from "@/db/schema"
import { env } from "@/env"

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, { provider: "pg", schema }),
  emailAndPassword: {
    enabled: false,
  },
  socialProviders: {
    google: {
      clientId: env.AUTH_GOOGLE_ID ?? "",
      clientSecret: env.AUTH_GOOGLE_SECRET ?? "",
    },
    apple: {
      clientId: env.AUTH_APPLE_ID ?? "",
      clientSecret: env.AUTH_APPLE_SECRET ?? "",
    },
    twitter: {
      clientId: env.AUTH_TWITTER_ID ?? "",
      clientSecret: env.AUTH_TWITTER_SECRET ?? "",
    },
  },
})
