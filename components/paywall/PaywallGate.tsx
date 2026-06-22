"use client"

import Link from "next/link"

interface PaywallGateProps {
  children: React.ReactNode
  blocked?: boolean
  message?: string
}

export function PaywallGate({ children, blocked, message }: PaywallGateProps) {
  if (!blocked) return <>{children}</>

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 p-10 text-center">
      <div className="mb-4 text-4xl">🔒</div>
      <h3 className="mb-2 text-lg font-semibold">Recurso bloqueado</h3>
      <p className="mb-6 text-sm text-muted-foreground">
        {message ?? "Faça upgrade para o plano PRO para desbloquear este recurso."}
      </p>
      <Link
        href="/settings/billing"
        className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Fazer upgrade →
      </Link>
    </div>
  )
}
