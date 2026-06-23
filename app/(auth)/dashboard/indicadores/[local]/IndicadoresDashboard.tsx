"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// ── mock data ──────────────────────────────────────────────────────────────────
const CHART_DATA = [
  { dia: "1", capacidade: 35, ocupadas: 25 },
  { dia: "2", capacidade: 35, ocupadas: 25 },
  { dia: "3", capacidade: 37, ocupadas: 21 },
  { dia: "4", capacidade: 38, ocupadas: 20 },
  { dia: "5", capacidade: 40, ocupadas: 18 },
  { dia: "8", capacidade: 42, ocupadas: 19 },
  { dia: "9", capacidade: 39, ocupadas: 27 },
  { dia: "10", capacidade: 42, ocupadas: 29 },
  { dia: "11", capacidade: 46, ocupadas: 42 },
  { dia: "12", capacidade: 40, ocupadas: 30 },
  { dia: "15", capacidade: 44, ocupadas: 24 },
  { dia: "16", capacidade: 44, ocupadas: 34 },
  { dia: "17", capacidade: 45, ocupadas: 35 },
  { dia: "18", capacidade: 39, ocupadas: 23 },
  { dia: "19", capacidade: 38, ocupadas: 20 },
  { dia: "22", capacidade: 44, ocupadas: 35 },
  { dia: "23", capacidade: 36, ocupadas: 33 },
  { dia: "24", capacidade: 41, ocupadas: 23 },
  { dia: "25", capacidade: 38, ocupadas: 26 },
  { dia: "26", capacidade: 35, ocupadas: 18 },
  { dia: "29", capacidade: 36, ocupadas: 20 },
  { dia: "30", capacidade: 49, ocupadas: 38 },
]

const RANKING = [
  { nome: "Unidade Centro", pct: 83, color: "#EF5350" },
  { nome: "Unidade Norte", pct: 68, color: "#FF9800" },
  { nome: "Viva Melhor", pct: 34, color: "#4CAF50" },
]

type DiaCalendario = {
  dia: number
  ocupadas: number
  capacidade: number
}

const CALENDARIO: DiaCalendario[] = [
  { dia: 1, ocupadas: 25, capacidade: 35 },
  { dia: 2, ocupadas: 25, capacidade: 35 },
  { dia: 3, ocupadas: 21, capacidade: 37 },
  { dia: 4, ocupadas: 20, capacidade: 38 },
  { dia: 5, ocupadas: 18, capacidade: 40 },
  { dia: 8, ocupadas: 19, capacidade: 42 },
  { dia: 9, ocupadas: 27, capacidade: 39 },
  { dia: 10, ocupadas: 29, capacidade: 42 },
  { dia: 11, ocupadas: 42, capacidade: 46 },
  { dia: 12, ocupadas: 30, capacidade: 40 },
  { dia: 15, ocupadas: 24, capacidade: 44 },
  { dia: 16, ocupadas: 34, capacidade: 44 },
  { dia: 17, ocupadas: 35, capacidade: 45 },
  { dia: 18, ocupadas: 23, capacidade: 39 },
  { dia: 22, ocupadas: 35, capacidade: 44 },
  { dia: 23, ocupadas: 33, capacidade: 36 },
  { dia: 24, ocupadas: 23, capacidade: 41 },
  { dia: 25, ocupadas: 26, capacidade: 38 },
  { dia: 29, ocupadas: 20, capacidade: 36 },
  { dia: 30, ocupadas: 38, capacidade: 49 },
]

const HORARIOS = [
  { hora: "08:00 às 10:00", capacidade: 5, ocupadas: 5, status: "Lotado" },
  { hora: "10:00 às 12:00", capacidade: 5, ocupadas: 3, status: "Disponível" },
  { hora: "13:00 às 15:00", capacidade: 6, ocupadas: 6, status: "Lotado" },
  { hora: "15:00 às 17:00", capacidade: 6, ocupadas: 2, status: "Disponível" },
  { hora: "17:00 às 19:00", capacidade: 4, ocupadas: 0, status: "Bloqueado" },
]

const TABELA = [
  { data: "11/06/2026", local: "Unidade Centro", capacidade: 16, ocupadas: 14, disponiveis: 2, taxa: 88 },
  { data: "11/06/2026", local: "Unidade Norte", capacidade: 18, ocupadas: 12, disponiveis: 6, taxa: 67 },
  { data: "11/06/2026", local: "Viva Melhor", capacidade: 13, ocupadas: 5, disponiveis: 8, taxa: 38 },
  { data: "12/06/2026", local: "Unidade Centro", capacidade: 16, ocupadas: 15, disponiveis: 1, taxa: 94 },
  { data: "12/06/2026", local: "Unidade Norte", capacidade: 18, ocupadas: 11, disponiveis: 7, taxa: 61 },
  { data: "12/06/2026", local: "Viva Melhor", capacidade: 13, ocupadas: 4, disponiveis: 9, taxa: 31 },
]

// ── helpers ────────────────────────────────────────────────────────────────────
function pct(ocupadas: number, capacidade: number) {
  if (capacidade === 0) return 0
  return Math.round((ocupadas / capacidade) * 100)
}

function corCelula(p: number) {
  if (p >= 90) return "bg-red-100 border-red-200"
  if (p >= 70) return "bg-amber-50 border-amber-200"
  return "bg-emerald-50 border-emerald-200"
}

function corTexto(p: number) {
  if (p >= 90) return "text-red-600"
  if (p >= 70) return "text-amber-600"
  return "text-emerald-600"
}

function statusBadge(status: string) {
  if (status === "Lotado") return "bg-red-100 text-red-600"
  if (status === "Disponível") return "bg-emerald-100 text-emerald-700"
  return "bg-gray-100 text-gray-500"
}

function barColor(status: string) {
  if (status === "Lotado") return "bg-red-400"
  if (status === "Disponível") return "bg-emerald-400"
  return "bg-gray-300"
}

// ── Calendar grid helpers (June 2026 starts Monday) ──────────────────────────
const DIAS_SEMANA = ["Seg", "Ter", "Qua", "Qui", "Sex"]

function buildCalendarGrid() {
  // June 2026: 1st is Monday (weekday index 0 in our Mon-Fri grid)
  const grid: (DiaCalendario | null)[][] = []
  let week: (DiaCalendario | null)[] = []
  const diasMap = Object.fromEntries(CALENDARIO.map((d) => [d.dia, d]))

  for (let day = 1; day <= 30; day++) {
    const dow = new Date(2026, 5, day).getDay() // 0=Sun,1=Mon,...
    if (dow === 0 || dow === 6) continue // skip weekends
    const col = dow - 1 // 0=Mon … 4=Fri
    if (col === 0 && week.length > 0) {
      grid.push(week)
      week = []
    }
    // pad if needed
    while (week.length < col) week.push(null)
    week.push(diasMap[day] ?? { dia: day, ocupadas: 0, capacidade: 0 })
  }
  if (week.length) grid.push(week)
  return grid
}

// ── component ─────────────────────────────────────────────────────────────────
export function IndicadoresDashboard({
  localId,
  nomeLocal,
}: {
  localId: string
  nomeLocal: string
}) {
  const [diaSelecionado, setDiaSelecionado] = useState<DiaCalendario | null>(null)
  const [periodo, setPeriodo] = useState("Junho 2026")
  const [localFiltro, setLocalFiltro] = useState(nomeLocal)

  const capacidadeTotal = 1200
  const ocupacao = 870
  const disponiveis = 330
  const taxaOcupacao = 73

  const grid = buildCalendarGrid()

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b px-6 py-3 flex items-center gap-2 text-sm">
        <Link
          href="/dashboard"
          className="text-[#00897B] hover:underline flex items-center gap-1 font-medium"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Voltar para Gestão de Agendas
        </Link>
      </div>

      <div className="flex flex-1">
        {/* Main content */}
        <div className="flex-1 px-6 py-5 overflow-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-3 font-medium uppercase tracking-wide">
            <Link href="/dashboard" className="hover:text-[#00897B] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/dashboard" className="hover:text-[#00897B] transition-colors">Gestão de Agendas</Link>
            <span>/</span>
            <span className="text-gray-500">{nomeLocal}</span>
            <span>/</span>
            <span className="text-[#00897B]">Indicadores</span>
          </nav>

          {/* Title */}
          <h1 className="text-xl font-bold text-gray-800 mb-1">
            Gestão de Disponibilidade de{" "}
            <span className="font-extrabold">Agendas</span> — {nomeLocal}
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            Acompanhe a capacidade, ocupação e disponibilidade das agendas por local de entrevista.
          </p>

          {/* Info banner */}
          <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-5 text-sm text-blue-700">
            <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p>
              Acompanhe a ocupação das agendas por local de entrevista. Utilize os filtros e indicadores para
              identificar padrões e oportunidades de otimização operacional.
            </p>
          </div>

          {/* Filtros */}
          <div className="bg-white rounded-xl border p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00897B" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Filtros Globais</span>
            </div>
            <div className="flex flex-wrap gap-3 items-end">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Período</label>
                <select
                  value={periodo}
                  onChange={(e) => setPeriodo(e.target.value)}
                  className="rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00897B]"
                >
                  <option>Junho 2026</option>
                  <option>Julho 2026</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Local de Entrevista</label>
                <select
                  value={localFiltro}
                  onChange={(e) => setLocalFiltro(e.target.value)}
                  className="rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00897B]"
                >
                  <option>Unidade Centro</option>
                  <option>Unidade Norte</option>
                  <option>Viva Melhor</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Entrevistador (Opcional)</label>
                <select className="rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00897B]">
                  <option>Todos os entrevistadores</option>
                </select>
              </div>
              <button className="rounded-md bg-[#00897B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#00796B] transition-colors">
                APLICAR FILTROS
              </button>
              <button className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
                LIMPAR FILTROS
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <div className="bg-white rounded-xl border p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Capacidade Total</p>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00897B" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-800">{capacidadeTotal.toLocaleString("pt-BR")}</p>
              <p className="text-xs text-gray-400 mt-1">Vagas disponibilizadas</p>
            </div>

            <div className="bg-white rounded-xl border p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Ocupação</p>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00897B" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-[#00897B]">{ocupacao}</p>
              <p className="text-xs text-gray-400 mt-1">Vagas ocupadas</p>
            </div>

            <div className="bg-white rounded-xl border p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Disponibilidade</p>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00897B" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-800">{disponiveis}</p>
              <p className="text-xs text-gray-400 mt-1">Vagas disponíveis</p>
            </div>

            <div className="bg-white rounded-xl border p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-amber-500 uppercase tracking-wide">Taxa de Ocupação</p>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-amber-500">{taxaOcupacao}%</p>
              <p className="text-xs text-gray-400 mt-1">Das vagas ocupadas</p>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mb-4 text-xs font-medium text-gray-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              Baixa ocupação (&lt;70%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
              Média ocupação (70–90%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
              Alta ocupação (&gt;90%)
            </span>
          </div>

          {/* Chart + Ranking row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            {/* Bar chart */}
            <div className="lg:col-span-2 bg-white rounded-xl border p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold text-gray-700">Capacidade × Ocupação por Período</h3>
                <button className="text-gray-300 hover:text-gray-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-gray-400 mb-3">Junho 2026 · Todos os locais</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={CHART_DATA} barSize={8} barGap={2}>
                  <XAxis dataKey="dia" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} width={28} />
                  <Tooltip
                    contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E5E7EB" }}
                    cursor={{ fill: "#F3F4F6" }}
                  />
                  <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="capacidade" name="Capacidade" fill="#B2DFDB" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="ocupadas" name="Ocupadas" fill="#00897B" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Ranking */}
            <div className="bg-white rounded-xl border p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-700">Ranking de Locais</h3>
                <button className="text-gray-300 hover:text-gray-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {RANKING.map((item, i) => (
                  <div key={item.nome}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600 font-medium">{item.nome}</span>
                      <span className="text-sm font-bold" style={{ color: item.color }}>
                        {item.pct}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                      />
                    </div>
                    {i < RANKING.length - 1 && (
                      <p className="text-[10px] text-gray-400 mt-1">
                        {item.pct >= 70 ? "Alta ocupação" : "Baixa ocupação"}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-white rounded-xl border p-4 mb-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-semibold text-gray-700">Calendário de Ocupação — Junho 2026</h3>
              <button className="text-gray-300 hover:text-gray-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-400 mb-4">Clique em um dia para ver o detalhamento operacional</p>

            {/* Day headers */}
            <div className="grid grid-cols-5 gap-2 mb-2">
              {DIAS_SEMANA.map((d) => (
                <div key={d} className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar rows */}
            {grid.map((week, wi) => (
              <div key={wi} className="grid grid-cols-5 gap-2 mb-2">
                {Array.from({ length: 5 }).map((_, col) => {
                  const cell = week[col] ?? null
                  if (!cell) return <div key={col} />
                  const p = pct(cell.ocupadas, cell.capacidade)
                  return (
                    <button
                      key={col}
                      onClick={() => setDiaSelecionado(cell)}
                      className={`rounded-lg border p-2 text-center cursor-pointer hover:opacity-80 transition-opacity ${corCelula(p)}
                        ${diaSelecionado?.dia === cell.dia ? "ring-2 ring-[#00897B] ring-offset-1" : ""}`}
                    >
                      <div className={`text-sm font-bold ${corTexto(p)}`}>{cell.dia}</div>
                      <div className="text-[10px] text-gray-500 mt-0.5">
                        {cell.ocupadas}/{cell.capacidade}
                      </div>
                      <div className={`text-[10px] font-semibold ${corTexto(p)}`}>{p}%</div>
                    </button>
                  )
                })}
              </div>
            ))}
          </div>

          {/* Summary table */}
          <div className="bg-white rounded-xl border p-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-semibold text-gray-700">Resumo por Data e Local</h3>
              <button className="text-xs text-[#00897B] hover:underline flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Exportar Excel
              </button>
            </div>
            <p className="text-xs text-gray-400 mb-4">12 registros exibidos</p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    {["DATA", "LOCAL", "CAPACIDADE", "OCUPADAS", "DISPONÍVEIS", "TAXA"].map((h) => (
                      <th key={h} className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wide pb-2 pr-4">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TABELA.map((row, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-2.5 pr-4 text-gray-600">{row.data}</td>
                      <td className="py-2.5 pr-4 text-gray-800 font-medium">{row.local}</td>
                      <td className="py-2.5 pr-4 text-gray-600">{row.capacidade}</td>
                      <td className="py-2.5 pr-4 text-gray-600">{row.ocupadas}</td>
                      <td className="py-2.5 pr-4 text-gray-600">{row.disponiveis}</td>
                      <td className="py-2.5 pr-4">
                        <span className={`font-semibold ${
                          row.taxa >= 90 ? "text-red-600" : row.taxa >= 70 ? "text-amber-600" : "text-emerald-600"
                        }`}>
                          {row.taxa}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right panel — Agenda do Dia */}
        {diaSelecionado && (
          <div className="w-72 shrink-0 bg-white border-l flex flex-col">
            {/* Header */}
            <div className="bg-[#00897B] text-white px-4 py-4 flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest opacity-80 mb-1">Agenda do Dia</p>
                <p className="text-2xl font-bold">
                  {String(diaSelecionado.dia).padStart(2, "0")}/06/2026
                </p>
              </div>
              <button
                onClick={() => setDiaSelecionado(null)}
                className="text-white/70 hover:text-white transition-colors mt-1"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* KPI mini */}
            <div className="grid grid-cols-2 gap-3 p-4 border-b">
              <div>
                <p className="text-xs text-gray-400 mb-1">Capacidade total</p>
                <p className="text-2xl font-bold text-gray-800">{diaSelecionado.capacidade}</p>
              </div>
              <div className="bg-teal-50 rounded-lg p-2">
                <p className="text-xs text-gray-400 mb-1">Ocupadas</p>
                <p className="text-2xl font-bold text-[#00897B]">{diaSelecionado.ocupadas}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Disponíveis</p>
                <p className="text-2xl font-bold text-gray-800">
                  {diaSelecionado.capacidade - diaSelecionado.ocupadas}
                </p>
              </div>
              <div className="bg-amber-50 rounded-lg p-2">
                <p className="text-xs text-amber-600 mb-1">Taxa de ocupação</p>
                <p className="text-2xl font-bold text-amber-500">
                  {pct(diaSelecionado.ocupadas, diaSelecionado.capacidade)}%
                </p>
              </div>
            </div>

            {/* Time slots */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Horários do Dia</p>
              <div className="flex flex-col gap-3">
                {HORARIOS.map((h) => {
                  const p2 = pct(h.ocupadas, h.capacidade)
                  return (
                    <div key={h.hora} className="rounded-lg border p-3">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00897B" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                          </svg>
                          {h.hora}
                        </div>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusBadge(h.status)}`}>
                          {h.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 mb-2">
                        Capacidade: {h.capacidade} · Ocupadas: {h.ocupadas} · Disponíveis: {h.capacidade - h.ocupadas}
                      </p>
                      <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${barColor(h.status)}`}
                          style={{ width: `${p2}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
