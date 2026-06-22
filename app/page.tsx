import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="flex items-center justify-between border-b px-6 py-4">
        <span className="text-xl font-bold">📋 Gestão de Agendas</span>
        <Link href="/login" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Entrar
        </Link>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight">
          Organize suas agendas<br />com facilidade
        </h1>
        <p className="mb-10 text-xl text-muted-foreground">
          Gerencie múltiplas agendas, crie eventos, configure lembretes e nunca mais perca um compromisso.
        </p>
        <Link href="/login" className="inline-flex items-center rounded-md bg-primary px-8 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90">
          Começar grátis — 14 dias de trial →
        </Link>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="mb-12 text-center text-3xl font-bold">Tudo que você precisa</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: "📅", title: "Múltiplas Agendas", desc: "Crie agendas separadas para trabalho, pessoal e projetos." },
            { icon: "🗓️", title: "Eventos Detalhados", desc: "Adicione local, descrição e duração para cada compromisso." },
            { icon: "⏰", title: "Lembretes", desc: "Receba alertas por email antes de cada evento." },
            { icon: "🎨", title: "Cores Personalizadas", desc: "Identifique agendas rapidamente com cores únicas." },
            { icon: "🔒", title: "Seus dados, sua privacidade", desc: "Login seguro com Google ou Magic Link." },
            { icon: "📱", title: "Acesso em qualquer lugar", desc: "Interface responsiva para desktop e mobile." },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border bg-card p-6">
              <div className="mb-3 text-3xl">{f.icon}</div>
              <h3 className="mb-2 font-semibold">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-muted/40 py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-12 text-3xl font-bold">Preço simples e transparente</h2>
          <div className="mx-auto max-w-sm rounded-xl border bg-card p-8 shadow-sm">
            <p className="mb-2 text-lg font-semibold">PRO</p>
            <p className="mb-6 text-4xl font-extrabold">R$ 49<span className="text-base font-normal text-muted-foreground">/mês</span></p>
            <ul className="mb-8 space-y-3 text-left text-sm">
              {["Agendas ilimitadas", "Eventos ilimitados", "Lembretes por email", "Trial grátis de 14 dias", "Suporte prioritário"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> {item}
                </li>
              ))}
            </ul>
            <Link href="/login" className="block w-full rounded-md bg-primary py-2.5 text-center text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Começar trial grátis
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Gestão de Agendas. Todos os direitos reservados.
      </footer>
    </div>
  )
}
