import type { User } from "@prisma/client"

export const PLAN_LIMITS = {
  FREE: { agendas: 1, eventos: 10 },
  TRIAL: { agendas: Infinity, eventos: Infinity },
  PRO: { agendas: Infinity, eventos: Infinity },
}

export function isTrialActive(user: Pick<User, "plan" | "trialEndsAt">): boolean {
  return user.plan === "TRIAL" && !!user.trialEndsAt && user.trialEndsAt > new Date()
}

export function isSubscribed(user: Pick<User, "plan" | "stripeCurrentPeriodEnd">): boolean {
  return user.plan === "PRO" && !!user.stripeCurrentPeriodEnd && user.stripeCurrentPeriodEnd > new Date()
}

export function hasAccess(user: Pick<User, "plan" | "trialEndsAt" | "stripeCurrentPeriodEnd">): boolean {
  return isTrialActive(user) || isSubscribed(user)
}

export function daysLeftInTrial(user: Pick<User, "plan" | "trialEndsAt">): number {
  if (!isTrialActive(user) || !user.trialEndsAt) return 0
  const diff = user.trialEndsAt.getTime() - Date.now()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}
