import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

import { env } from "@/env"

export const db = drizzle({ client: neon(env.DATABASE_URL) })
