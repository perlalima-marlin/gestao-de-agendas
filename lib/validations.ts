import { z } from "zod"

export const agendaSchema = z.object({
  nome: z.string().min(1, "Nome obrigatório").max(100),
  descricao: z.string().max(500).optional(),
  cor: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Cor inválida").default("#6366f1"),
})

export const eventoSchema = z.object({
  titulo: z.string().min(1, "Título obrigatório").max(200),
  descricao: z.string().max(1000).optional(),
  inicio: z.string().datetime(),
  fim: z.string().datetime(),
  local: z.string().max(200).optional(),
  lembrete: z.number().int().min(0).max(10080).optional(),
  recorrente: z.boolean().default(false),
  agendaId: z.string().min(1, "Agenda obrigatória"),
})

export type AgendaInput = z.infer<typeof agendaSchema>
export type EventoInput = z.infer<typeof eventoSchema>
