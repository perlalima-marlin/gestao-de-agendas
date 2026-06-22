import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { createCustomerPortalSession } from "@/lib/stripe"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const user = await db.user.findUnique({ where: { id: session.user.id } })
  if (!user?.stripeCustomerId) return NextResponse.json({ error: "No subscription" }, { status: 400 })

  const portalSession = await createCustomerPortalSession(user.stripeCustomerId)
  return NextResponse.json({ url: portalSession.url })
}
