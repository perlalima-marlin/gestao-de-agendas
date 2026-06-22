import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { createCheckoutSession } from "@/lib/stripe"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const user = await db.user.findUnique({ where: { id: session.user.id } })
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

  const checkoutSession = await createCheckoutSession({
    userId: user.id,
    email: user.email!,
    priceId: process.env.STRIPE_PRICE_ID_PRO!,
    customerId: user.stripeCustomerId,
  })

  return NextResponse.json({ url: checkoutSession.url })
}
