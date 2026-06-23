import { signIn } from "@/lib/auth"
import { redirect } from "next/navigation"

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>
}) {
  return <LoginPageClient searchParams={searchParams} />
}

async function LoginPageClient({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm rounded-2xl border bg-white p-8 shadow-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#00897B]">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
              <path d="M8 20c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="16" cy="12" r="3" fill="white" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-800">Gestão de Agendas</h1>
          <p className="mt-1 text-sm text-gray-500">Faça login para continuar</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            {error === "CredentialsSignin"
              ? "Usuário ou senha inválidos."
              : "Erro ao fazer login. Tente novamente."}
          </div>
        )}

        {/* Admin credentials form */}
        <form
          action={async (formData: FormData) => {
            "use server"
            const result = await signIn("credentials", {
              username: formData.get("username"),
              password: formData.get("password"),
              redirect: false,
            })
            if ((result as any)?.error) {
              redirect(`/login?error=${(result as any).error}`)
            }
            redirect("/dashboard")
          }}
          className="flex flex-col gap-3"
        >
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Usuário
            </label>
            <input
              name="username"
              type="text"
              placeholder="admin"
              required
              autoComplete="username"
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-300 focus:border-[#00897B] focus:outline-none focus:ring-2 focus:ring-[#00897B]/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Senha
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-300 focus:border-[#00897B] focus:outline-none focus:ring-2 focus:ring-[#00897B]/20"
            />
          </div>
          <button
            type="submit"
            className="mt-1 w-full rounded-lg bg-[#00897B] py-2.5 text-sm font-semibold text-white hover:bg-[#00796B] transition-colors"
          >
            Entrar
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-100" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-xs text-gray-400">ou continue com</span>
          </div>
        </div>

        {/* Google */}
        <form
          action={async () => {
            "use server"
            await signIn("google", { redirectTo: "/dashboard" })
          }}
        >
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Entrar com Google
          </button>
        </form>

        {/* Magic link */}
        <form
          action={async (formData: FormData) => {
            "use server"
            await signIn("resend", {
              email: formData.get("email") as string,
              redirectTo: "/dashboard",
            })
          }}
          className="mt-3 flex flex-col gap-2"
        >
          <input
            name="email"
            type="email"
            placeholder="seu@email.com"
            required
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-300 focus:border-[#00897B] focus:outline-none focus:ring-2 focus:ring-[#00897B]/20"
          />
          <button
            type="submit"
            className="w-full rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Entrar com Magic Link
          </button>
        </form>
      </div>
    </div>
  )
}
