import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { isSubscribed, isTrialActive, daysLeftInTrial } from "@/lib/subscription"

export default async function BillingPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const user = await db.user.findUnique({ where: { id: session.user.id } })
  if (!user) redirect("/login")

  const subscribed = isSubscribed(user)
  const onTrial = isTrialActive(user)
  const days = daysLeftInTrial(user)

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">Assinatura</h1>

      <div className="rounded-xl border bg-card p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-lg">
              {subscribed ? "Plano PRO" : onTrial ? "Trial gratuito" : "Plano gratuito"}
            </p>
            {onTrial && <p className="text-sm text-muted-foreground">{days} dias restantes no trial</p>}
            {subscribed && user.stripeCurrentPeriodEnd && (
              <p className="text-sm text-muted-foreground">
                Renova em {user.stripeCurrentPeriodEnd.toLocaleDateString("pt-BR")}
              </p>
            )}
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${subscribed ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
            {subscribed ? "Ativo" : onTrial ? "Trial" : "Gratuito"}
          </span>
        </div>
      </div>

      {!subscribed && (
        <div className="rounded-xl border bg-card p-6">
          <h2 className="mb-2 text-lg font-semibold">Plano PRO</h2>
          <p className="mb-1 text-3xl font-bold">R$ 49<span className="text-base font-normal text-muted-foreground">/mês</span></p>
          <ul className="mb-6 mt-4 space-y-2 text-sm text-muted-foreground">
            <li>✅ Agendas ilimitadas</li>
            <li>✅ Eventos ilimitados</li>
            <li>✅ Lembretes por email</li>
            <li>✅ Suporte prioritário</li>
          </ul>
          <form action="/api/checkout" method="POST">
            <button
              type="submit"
              className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Assinar agora
            </button>
          </form>
        </div>
      )}

      {subscribed && (
        <form action="/api/portal" method="POST">
          <button
            type="submit"
            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Gerenciar assinatura no Stripe
          </button>
        </form>
      )}
    </div>
  )
}
