import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core"

export const waitlist = pgTable("waitlist", (w) => ({
  id: w.serial("id").primaryKey(),
  email: w.varchar("email", { length: 255 }).notNull(),
  createdAt: w.timestamp("created_at").defaultNow(),
}))

// Fixed-window counters for utils/rate-limit.ts
export const actionRateLimit = pgTable("action_rate_limit", {
  key: text("key").primaryKey(),
  count: integer("count").notNull(),
  windowStart: timestamp("window_start", { withTimezone: true }).notNull(),
})
