import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { Sidebar } from "@/components/layout/Sidebar"
import { TrialBanner } from "@/components/layout/TrialBanner"
import { isTrialActive, daysLeftInTrial } from "@/lib/subscription"

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  // Auth desativada temporariamente
  const session = await auth()
  const user = session?.user?.id
    ? await db.user.findUnique({ where: { id: session.user.id } })
    : null

  const showTrialBanner = user ? isTrialActive(user) : false
  const days = user ? daysLeftInTrial(user) : 0

  return (
    <div className="relative h-screen overflow-hidden">
      <Sidebar />
      <div className="h-full overflow-auto">
        {showTrialBanner && <TrialBanner daysLeft={days} />}
        <main>{children}</main>
      </div>
    </div>
  )
}
