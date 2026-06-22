import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { eventoSchema } from "@/lib/validations"
import { PLAN_LIMITS, hasAccess } from "@/lib/subscription"

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const agendaId = searchParams.get("agendaId")

  const eventos = await db.evento.findMany({
    where: { userId: session.user.id, ...(agendaId ? { agendaId } : {}) },
    orderBy: { inicio: "asc" },
  })

  return NextResponse.json(eventos)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const user = await db.user.findUnique({ where: { id: session.user.id } })
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })
  if (!hasAccess(user)) return NextResponse.json({ error: "Subscription required" }, { status: 402 })

  const limit = PLAN_LIMITS[user.plan].eventos
  if (limit !== Infinity) {
    const count = await db.evento.count({ where: { userId: user.id } })
    if (count >= limit) return NextResponse.json({ error: "Limite atingido" }, { status: 402 })
  }

  const body = await req.json()
  const parsed = eventoSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const agenda = await db.agenda.findFirst({ where: { id: parsed.data.agendaId, userId: user.id } })
  if (!agenda) return NextResponse.json({ error: "Agenda não encontrada" }, { status: 404 })

  const evento = await db.evento.create({
    data: {
      ...parsed.data,
      inicio: new Date(parsed.data.inicio),
      fim: new Date(parsed.data.fim),
      userId: user.id,
    },
  })

  return NextResponse.json(evento, { status: 201 })
}
