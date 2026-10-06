import { env } from "@/env"

const all = {
  google: {
    clientId: env.AUTH_GOOGLE_ID,
    clientSecret: env.AUTH_GOOGLE_SECRET,
  },
  apple: { clientId: env.AUTH_APPLE_ID, clientSecret: env.AUTH_APPLE_SECRET },
  twitter: {
    clientId: env.AUTH_TWITTER_ID,
    clientSecret: env.AUTH_TWITTER_SECRET,
  },
}

export type Provider = keyof typeof all

// A provider is enabled only when both its id and secret are set
export const socialProviders = Object.fromEntries(
  Object.entries(all).filter(
    ([, { clientId, clientSecret }]) =>
      clientId !== undefined && clientSecret !== undefined
  )
) as Partial<Record<Provider, { clientId: string; clientSecret: string }>>

export const enabledProviders = Object.keys(socialProviders) as Provider[]
