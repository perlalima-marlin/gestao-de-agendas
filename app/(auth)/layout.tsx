import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { Sidebar } from "@/components/layout/Sidebar"
import { TrialBanner } from "@/components/layout/TrialBanner"
import { isTrialActive, daysLeftInTrial } from "@/lib/subscription"

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const user = await db.user.findUnique({ where: { id: session.user.id } })
  if (!user) redirect("/login")

  const showTrialBanner = isTrialActive(user)
  const days = daysLeftInTrial(user)

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-auto">
        {showTrialBanner && <TrialBanner daysLeft={days} />}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
