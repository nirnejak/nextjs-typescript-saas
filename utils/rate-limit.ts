import "server-only"

import { sql } from "drizzle-orm"

import { db } from "@/db"
import { actionRateLimit } from "@/db/schema"

interface Options {
  limit: number
  windowMs: number
}

// Fixed-window limiter in Postgres, one atomic upsert per call. Use it in
// server actions and route handlers; auth routes use Better Auth's own limiter
export const rateLimit = async (
  key: string,
  { limit, windowMs }: Options
): Promise<{ allowed: boolean; remaining: number }> => {
  const now = new Date()
  const windowCutoff = new Date(now.getTime() - windowMs).toISOString()
  const isExpired = sql`${actionRateLimit.windowStart} < ${windowCutoff}::timestamptz`

  const [row] = await db
    .insert(actionRateLimit)
    .values({ key, count: 1, windowStart: now })
    .onConflictDoUpdate({
      target: actionRateLimit.key,
      set: {
        count: sql`case when ${isExpired} then 1 else ${actionRateLimit.count} + 1 end`,
        windowStart: sql`case when ${isExpired} then ${now.toISOString()}::timestamptz else ${actionRateLimit.windowStart} end`,
      },
    })
    .returning({ count: actionRateLimit.count })

  return {
    allowed: row.count <= limit,
    remaining: Math.max(0, limit - row.count),
  }
}
