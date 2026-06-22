import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const [agendas, eventos] = await Promise.all([
    db.agenda.count({ where: { userId: session.user.id } }),
    db.evento.count({ where: { userId: session.user.id } }),
  ])

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border bg-card p-6">
          <p className="text-sm text-muted-foreground">Total de Agendas</p>
          <p className="mt-2 text-3xl font-bold">{agendas}</p>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <p className="text-sm text-muted-foreground">Total de Eventos</p>
          <p className="mt-2 text-3xl font-bold">{eventos}</p>
        </div>
      </div>
    </div>
  )
}
