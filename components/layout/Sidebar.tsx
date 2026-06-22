"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/dashboard/agendas", label: "Minhas Agendas", icon: "📅" },
  { href: "/dashboard/eventos", label: "Eventos", icon: "🗓️" },
  { href: "/settings/billing", label: "Assinatura", icon: "💳" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-60 flex-col border-r bg-background p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-primary">📋 Gestão de Agendas</h1>
      </div>
      <nav className="flex flex-col gap-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
              pathname === link.href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
