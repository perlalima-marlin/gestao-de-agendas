import Link from "next/link"

const LOCAIS = [
  {
    id: "unidade-centro",
    nome: "Unidade Centro",
    ativo: true,
    capacidade: 42,
    ocupacao: 38,
  },
  {
    id: "unidade-norte",
    nome: "Unidade Norte",
    ativo: true,
    capacidade: 36,
    ocupacao: 21,
  },
  {
    id: "viva-melhor",
    nome: "Viva Melhor",
    ativo: false,
    capacidade: 0,
    ocupacao: 0,
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestão de Agendas</h1>
          <p className="text-sm text-gray-500 mt-1">
            Gerencie e monitore as agendas por local de entrevista
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-md bg-[#00897B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#00796B] transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          CRIAR NOVO LOCAL
        </button>
      </div>

      {/* Location cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LOCAIS.map((local) => (
          <div
            key={local.id}
            className={`rounded-xl border bg-white p-5 shadow-sm ${!local.ativo ? "opacity-60" : ""}`}
          >
            {/* Card header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-800">{local.nome}</h3>
              </div>
              {!local.ativo && (
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">
                  Desativado
                </span>
              )}
              {local.ativo && (
                <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-[#00897B]">
                  Ativo
                </span>
              )}
            </div>

            {/* Stats */}
            {local.ativo && (
              <div className="flex gap-4 mb-4 text-sm">
                <div>
                  <p className="text-gray-400 text-xs">Capacidade</p>
                  <p className="font-semibold text-gray-700">{local.capacidade}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Ocupação</p>
                  <p className="font-semibold text-gray-700">{local.ocupacao}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Taxa</p>
                  <p className="font-semibold text-gray-700">
                    {local.capacidade > 0
                      ? `${Math.round((local.ocupacao / local.capacidade) * 100)}%`
                      : "—"}
                  </p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button className="w-full rounded-md border border-[#00897B] px-3 py-1.5 text-xs font-semibold text-[#00897B] hover:bg-teal-50 transition-colors">
                GERENCIAR CONFIGURAÇÃO
              </button>
              {local.ativo && (
                <>
                  <Link
                    href={`/dashboard/agendas/${local.id}`}
                    className="block text-center w-full rounded-md bg-[#00897B] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#00796B] transition-colors"
                  >
                    VER AGENDA
                  </Link>
                  <Link
                    href={`/dashboard/indicadores/${local.id}`}
                    className="flex items-center justify-center gap-1.5 w-full rounded-md border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
                      <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                    INDICADORES
                  </Link>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
