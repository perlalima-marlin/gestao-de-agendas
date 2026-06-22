import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { agendaSchema } from "@/lib/validations"
import { PLAN_LIMITS, hasAccess } from "@/lib/subscription"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const agendas = await db.agenda.findMany({
    where: { userId: session.user.id },
    include: { _count: { select: { eventos: true } } },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(agendas)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const user = await db.user.findUnique({ where: { id: session.user.id } })
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

  if (!hasAccess(user)) return NextResponse.json({ error: "Subscription required" }, { status: 402 })

  const limit = PLAN_LIMITS[user.plan].agendas
  if (limit !== Infinity) {
    const count = await db.agenda.count({ where: { userId: user.id } })
    if (count >= limit) return NextResponse.json({ error: "Limite atingido" }, { status: 402 })
  }

  const body = await req.json()
  const parsed = agendaSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const agenda = await db.agenda.create({
    data: { ...parsed.data, userId: user.id },
  })

  return NextResponse.json(agenda, { status: 201 })
}
