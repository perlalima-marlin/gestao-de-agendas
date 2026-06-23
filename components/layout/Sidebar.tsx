"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const LOCAIS = [
  { id: "unidade-centro", label: "Unidade Centro", ativo: true },
  { id: "unidade-norte", label: "Unidade Norte", ativo: true },
  { id: "viva-melhor", label: "Viva Melhor", ativo: true },
]

function IconUsuarios() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
function IconMedicos() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}
function IconEntrevistas() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}
function IconRelatorios() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  )
}
function IconGestao() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  )
}
function IconIndicadores() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  )
}
function IconConfig() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
    </svg>
  )
}
function IconAgenda() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}
function IconChevron({ open }: { open: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      className={`transition-transform ${open ? "rotate-180" : ""}`}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const [gestaoOpen, setGestaoOpen] = useState(true)

  const isIndicadores = (localId: string) =>
    pathname === `/dashboard/indicadores/${localId}`
  const isVerAgenda = (localId: string) =>
    pathname === `/dashboard/agendas/${localId}`

  return (
    <aside className="flex h-screen w-64 flex-col bg-[#00897B] text-white shrink-0 overflow-y-auto">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="white" fillOpacity="0.15" />
            <path d="M8 20c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="16" cy="12" r="3" fill="white" />
          </svg>
          <div>
            <div className="text-xs font-semibold leading-tight opacity-90">health</div>
            <div className="text-xs font-semibold leading-tight opacity-90">Commerce</div>
          </div>
        </div>
      </div>

      {/* App title */}
      <div className="px-5 py-4 border-b border-white/10">
        <p className="text-sm font-bold text-white">Agendamento h-Commerce</p>
      </div>

      {/* Nav */}
      <nav className="flex flex-col px-3 py-3 gap-0.5">
        <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/50 mb-1">
          Menu de Navegação
        </p>

        {[
          { href: "/dashboard/usuarios", label: "Usuários", Icon: IconUsuarios },
          { href: "/dashboard/medicos", label: "Médicos", Icon: IconMedicos },
          { href: "/dashboard/entrevistas", label: "Entrevistas", Icon: IconEntrevistas },
          { href: "/dashboard/relatorios", label: "Relatórios", Icon: IconRelatorios },
        ].map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
              ${pathname.startsWith(href) ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"}`}
          >
            <Icon />
            <span>{label}</span>
          </Link>
        ))}

        {/* Gestão de Agendas — expandable */}
        <button
          onClick={() => setGestaoOpen(!gestaoOpen)}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full text-left transition-colors
            ${pathname.startsWith("/dashboard/indicadores") || pathname.startsWith("/dashboard/agendas")
              ? "bg-white/20 text-white"
              : "text-white/80 hover:bg-white/10 hover:text-white"}`}
        >
          <IconGestao />
          <span className="flex-1">Gestão de Agendas</span>
          <IconChevron open={gestaoOpen} />
        </button>

        {gestaoOpen && (
          <div className="ml-3 mt-0.5 flex flex-col gap-0.5">
            {LOCAIS.map((local) => (
              <div key={local.id}>
                {/* Location name */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white/70">
                  <span className="text-[8px]">◉</span>
                  <span>{local.label}</span>
                </div>

                {/* Sub-items */}
                <div className="ml-3 flex flex-col gap-0.5">
                  <Link
                    href={`/dashboard/agendas/${local.id}/config`}
                    className="flex items-center gap-2 px-2 py-1.5 rounded text-[12px] text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <IconConfig />
                    Gerenciar configuração
                  </Link>
                  <Link
                    href={`/dashboard/agendas/${local.id}`}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded text-[12px] transition-colors
                      ${isVerAgenda(local.id) ? "bg-white/20 text-white" : "text-white/60 hover:text-white hover:bg-white/10"}`}
                  >
                    <IconAgenda />
                    Ver agenda
                  </Link>
                  <Link
                    href={`/dashboard/indicadores/${local.id}`}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded text-[12px] transition-colors
                      ${isIndicadores(local.id) ? "bg-[#26A69A] text-white font-semibold" : "text-white/60 hover:text-white hover:bg-white/10"}`}
                  >
                    <IconIndicadores />
                    Indicadores
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </nav>
    </aside>
  )
}
