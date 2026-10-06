import { eq } from "drizzle-orm"

import { db } from "@/db"
import { user } from "@/features/auth/schema"

// Usage: bun run db:make-admin you@example.com
const email = process.argv[2]
if (email === undefined) {
  console.error("Usage: bun run db:make-admin <email>")
  process.exit(1)
}

const updated = await db
  .update(user)
  .set({ role: "admin" })
  .where(eq(user.email, email.toLowerCase()))
  .returning({ id: user.id })

if (updated.length === 0) {
  console.error(`No user with email ${email}. Sign in once first.`)
  process.exit(1)
}
console.log(`${email} is now an admin`)
