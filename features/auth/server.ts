import { passkey } from "@better-auth/passkey"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { admin } from "better-auth/plugins"

import config from "@/config"
import { db } from "@/db"
import { env } from "@/env"
import { billingPlugins } from "@/features/billing/plugin"
import { sendEmail } from "@/features/email/send"
import WelcomeEmail from "@/features/email/templates/WelcomeEmail"

import { socialProviders } from "./providers"
import { authUrl } from "./url"
import * as schema from "./schema"

export const auth = betterAuth({
  baseURL: authUrl,
  secret: env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, { provider: "pg", schema }),
  socialProviders,
  // Apple posts back from its own origin
  trustedOrigins: ["https://appleid.apple.com"],
  rateLimit: { enabled: true, storage: "database" },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await sendEmail({
            to: user.email,
            subject: `Welcome to ${config.appName}`,
            // Called as a function so this file stays .ts (no JSX)
            react: WelcomeEmail({ name: user.name }),
          })
        },
      },
    },
  },
  plugins: [
    admin(),
    passkey({
      rpID: new URL(authUrl).hostname,
      rpName: config.appName,
      origin: authUrl,
    }),
    ...billingPlugins,
    // Must stay last so cookies set inside server actions persist
    nextCookies(),
  ],
})
