import { NextResponse } from "next/server"

import { db } from "@/lib/db"
import { waitlist } from "@/app/api/schema"

export async function GET() {
  try {
    const allWaitlist = await db.select().from(waitlist)
    return NextResponse.json(allWaitlist, { status: 200 })
  } catch (error) {
    console.error("Error fetching waitlist:", error)
    return NextResponse.json(
      { error: "Failed to fetch waitlist" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    await db.insert(waitlist).values({ email })

    return NextResponse.json({ message: "Joined waitlist!" }, { status: 200 })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json(
      {
        message: "Something went wrong!",
        error: "Failed to process request",
      },
      { status: 400 }
    )
  }
}
