"use client"

import Link from "next/link"

interface TrialBannerProps {
  daysLeft: number
}

export function TrialBanner({ daysLeft }: TrialBannerProps) {
  return (
    <div className="flex items-center justify-between bg-amber-50 px-4 py-2 text-sm text-amber-800 border-b border-amber-200">
      <span>
        ⏳ Seu trial expira em <strong>{daysLeft} dias</strong>.
      </span>
      <Link href="/settings/billing" className="ml-4 font-semibold underline hover:text-amber-900">
        Fazer upgrade
      </Link>
    </div>
  )
}
