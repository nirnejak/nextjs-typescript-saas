import { checkout, polar, portal, webhooks } from "@polar-sh/better-auth"
import { createPolarCore } from "@polar-sh/sdk/2026-10"

import { env } from "@/env"

const createBillingPlugins = () => {
  const accessToken = env.POLAR_ACCESS_TOKEN
  const productId = env.POLAR_PRODUCT_ID_PRO
  // Same condition as billingEnabled in ./config, narrowed for TypeScript
  if (accessToken === undefined || productId === undefined) return []

  const client = createPolarCore({
    accessToken,
    // Tokens and products are separate per environment
    environment: env.POLAR_SERVER,
  })

  return [
    polar({
      client,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [{ productId, slug: "pro" }],
          successUrl: "/dashboard/?checkout_id={CHECKOUT_ID}",
          authenticatedUsersOnly: true,
        }),
        portal(),
        // Set the webhook URL in Polar to /api/auth/polar/webhooks/
        // (with the trailing slash, see trailingSlash in next.config.ts)
        ...(env.POLAR_WEBHOOK_SECRET !== undefined
          ? [
              webhooks({
                secret: env.POLAR_WEBHOOK_SECRET,
                onCustomerStateChanged: async (payload) => {
                  console.info("[billing] customer state changed", payload.type)
                },
              }),
            ]
          : []),
      ],
    }),
  ]
}

export const billingPlugins = createBillingPlugins()
