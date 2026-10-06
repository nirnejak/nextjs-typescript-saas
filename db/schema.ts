import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core"

// Fixed-window counters for utils/rate-limit.ts
export const actionRateLimit = pgTable("action_rate_limit", {
  key: text("key").primaryKey(),
  count: integer("count").notNull(),
  windowStart: timestamp("window_start", { withTimezone: true }).notNull(),
})
