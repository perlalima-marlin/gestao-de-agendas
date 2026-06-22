import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function AgendasPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const agendas = await db.agenda.findMany({
    where: { userId: session.user.id },
    include: { _count: { select: { eventos: true } } },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Minhas Agendas</h1>
        <Link
          href="/dashboard/agendas/nova"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          + Nova Agenda
        </Link>
      </div>

      {agendas.length === 0 ? (
        <div className="rounded-xl border border-dashed p-12 text-center text-muted-foreground">
          <p className="text-lg">Nenhuma agenda ainda.</p>
          <p className="mt-1 text-sm">Crie sua primeira agenda para começar.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agendas.map((agenda) => (
            <div key={agenda.id} className="rounded-xl border bg-card p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="h-4 w-4 rounded-full" style={{ backgroundColor: agenda.cor }} />
                <h3 className="font-semibold">{agenda.nome}</h3>
              </div>
              {agenda.descricao && (
                <p className="mb-3 text-sm text-muted-foreground">{agenda.descricao}</p>
              )}
              <p className="text-xs text-muted-foreground">{agenda._count.eventos} eventos</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
