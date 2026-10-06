import { defineConfig } from "drizzle-kit"

// `bun run` loads .env, so no dotenv needed
export default defineConfig({
  schema: ["./db/schema.ts", "./features/*/schema.ts"],
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL ?? "" },
})
