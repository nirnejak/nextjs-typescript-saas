import { env } from "@/env"

export const billingEnabled =
  env.POLAR_ACCESS_TOKEN !== undefined && env.POLAR_PRODUCT_ID_PRO !== undefined
