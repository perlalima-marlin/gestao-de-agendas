import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { db } from "@/lib/db"

let _stripe: Stripe | null = null
function getStripe() {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-02-25.clover" as any,
    })
  }
  return _stripe
}

export async function POST(req: NextRequest) {
  const stripe = getStripe()
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get("stripe-signature")!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.userId
      if (!userId || !session.subscription) break
      const sub = await stripe.subscriptions.retrieve(session.subscription as string)
      await db.user.update({
        where: { id: userId },
        data: {
          plan: "PRO",
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: sub.id,
          stripePriceId: sub.items.data[0]?.price.id,
          stripeCurrentPeriodEnd: new Date((sub as any).current_period_end * 1000),
        },
      })
      break
    }

    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice
      const subId = (invoice as any).parent?.subscription_details?.subscription ?? (invoice as any).subscription
      if (!subId) break
      const sub = await stripe.subscriptions.retrieve(subId as string)
      await db.user.updateMany({
        where: { stripeSubscriptionId: sub.id },
        data: {
          stripeCurrentPeriodEnd: new Date((sub as any).current_period_end * 1000),
        },
      })
      break
    }

    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription
      await db.user.updateMany({
        where: { stripeSubscriptionId: sub.id },
        data: {
          stripePriceId: sub.items.data[0]?.price.id,
          stripeCurrentPeriodEnd: new Date((sub as any).current_period_end * 1000),
        },
      })
      break
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription
      await db.user.updateMany({
        where: { stripeSubscriptionId: sub.id },
        data: { plan: "FREE", stripeSubscriptionId: null, stripePriceId: null },
      })
      break
    }
  }

  return NextResponse.json({ received: true })
}
