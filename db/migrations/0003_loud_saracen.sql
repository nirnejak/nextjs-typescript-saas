ALTER TABLE "waitlist" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "waitlist" ADD CONSTRAINT "waitlist_email_unique" UNIQUE("email");