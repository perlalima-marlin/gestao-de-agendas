import type { User, Agenda, Evento } from "@prisma/client"

export type UserWithPlan = Pick<
  User,
  "id" | "name" | "email" | "image" | "plan" | "trialEndsAt" | "stripeCurrentPeriodEnd" | "stripeCustomerId"
>

export type AgendaWithEventos = Agenda & { eventos: Evento[] }
