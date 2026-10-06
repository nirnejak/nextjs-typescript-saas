-- Dedupe case-insensitively before adding the unique constraint: the old
-- /api/waitlist route stored emails as typed, without deduping
DELETE FROM "waitlist" a USING "waitlist" b WHERE a."id" > b."id" AND lower(a."email") = lower(b."email");--> statement-breakpoint
UPDATE "waitlist" SET "email" = lower("email");--> statement-breakpoint
ALTER TABLE "waitlist" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "waitlist" ADD CONSTRAINT "waitlist_email_unique" UNIQUE("email");
