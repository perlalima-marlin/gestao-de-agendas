import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidade - Gestão de Agendas",
  description: "Entenda como coletamos, usamos, compartilhamos e protegemos seus dados pessoais na plataforma Gestão de Agendas.",
}

export default function PrivacyPage() {
  const sections = [
    { id: "introducao", label: "1. Introdução" },
    { id: "dados-coletados", label: "2. Dados Coletados" },
    { id: "uso-dados", label: "3. Uso dos Dados" },
    { id: "compartilhamento", label: "4. Compartilhamento" },
    { id: "seguranca", label: "5. Segurança" },
    { id: "direitos-lgpd", label: "6. Seus Direitos (LGPD)" },
    { id: "retencao", label: "7. Retenção de Dados" },
    { id: "alteracoes", label: "8. Alterações" },
    { id: "contato", label: "9. Contato" },
  ]

  return (
    <div className="min-h-screen bg-neutral-50/50 text-neutral-800 antialiased selection:bg-[#00897B]/20 selection:text-[#00897B]">
      {/* Nav */}
      <nav className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl font-bold text-neutral-900 group-hover:text-[#00897B] transition-colors">
              📋 Gestão de Agendas
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="text-sm font-medium text-neutral-600 hover:text-[#00897B] transition-colors"
            >
              Voltar ao início
            </Link>
            <Link 
              href="/login" 
              className="rounded-lg bg-[#00897B] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#00796B] transition-colors"
            >
              Entrar
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="relative overflow-hidden border-b border-neutral-200 bg-white py-16 text-center">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        <div className="mx-auto max-w-3xl px-6">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#00897B]/10 px-3 py-1 text-xs font-semibold text-[#00897B]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00897B]" />
            Transparência e Confiança
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
            Política de Privacidade
          </h1>
          <p className="mt-4 text-lg text-neutral-600">
            Sua privacidade e a segurança dos seus dados são prioridade para nós. Saiba como cuidamos das suas informações.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-neutral-500">
            <span>Última atualização:</span>
            <time className="font-medium text-neutral-700">23 de Junho de 2026</time>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-10 lg:flex-row">
          
          {/* Sticky Sidebar Navigation (Desktop) */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-28 flex flex-col gap-2 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
              <p className="px-2 text-xs font-bold uppercase tracking-wider text-neutral-400">
                Tópicos
              </p>
              <nav className="flex flex-col gap-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50 hover:text-[#00897B] transition-colors"
                  >
                    {section.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Policy Text Content */}
          <article className="flex-1 space-y-12 rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm sm:p-12">
            
            {/* Introdução */}
            <section id="introducao" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
                1. Introdução
              </h2>
              <div className="h-1 w-12 rounded-full bg-[#00897B]" />
              <p className="leading-relaxed text-neutral-600">
                Bem-vindo ao **Gestão de Agendas** (uma plataforma health Commerce). Estamos comprometidos em proteger a privacidade dos seus dados pessoais. Esta Política de Privacidade explica como coletamos, usamos, compartilhamos e protegemos suas informações quando você utiliza nosso aplicativo.
              </p>
              <p className="leading-relaxed text-neutral-600">
                Ao acessar ou utilizar a nossa plataforma, você concorda com as práticas descritas nesta política. Se você não concordar com os termos aqui apresentados, recomendamos que não utilize a plataforma.
              </p>
            </section>

            {/* Dados Coletados */}
            <section id="dados-coletados" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
                2. Dados Coletados
              </h2>
              <div className="h-1 w-12 rounded-full bg-[#00897B]" />
              <p className="leading-relaxed text-neutral-600">
                Nós coletamos apenas as informações estritamente necessárias para a operação da plataforma e prestação de nossos serviços:
              </p>
              <ul className="space-y-3 text-neutral-600">
                <li className="flex items-start gap-2.5">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00897B]/10 text-[#00897B] text-xs font-bold">✓</span>
                  <div>
                    <strong>Informações de Autenticação:</strong> Nome completo, endereço de e-mail e foto do perfil obtidos através do login social com o Google ou Magic Link.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00897B]/10 text-[#00897B] text-xs font-bold">✓</span>
                  <div>
                    <strong>Dados de Agendamento:</strong> Títulos de compromissos, datas, horários, descrições e localizações associados às agendas que você cria na plataforma.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00897B]/10 text-[#00897B] text-xs font-bold">✓</span>
                  <div>
                    <strong>Dados de Cobrança e Assinatura:</strong> Informações de plano e status de assinatura. Ressaltamos que o processamento do pagamento é feito de forma segura e direta pelo <strong>Stripe</strong>. Nós não armazenamos nem temos acesso aos dados completos do seu cartão de crédito.
                  </div>
                </li>
              </ul>
            </section>

            {/* Uso dos Dados */}
            <section id="uso-dados" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
                3. Uso dos Dados
              </h2>
              <div className="h-1 w-12 rounded-full bg-[#00897B]" />
              <p className="leading-relaxed text-neutral-600">
                Utilizamos as informações que coletamos para as seguintes finalidades:
              </p>
              <ul className="space-y-3 text-neutral-600">
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00897B]" />
                  <span>Prover, operar e manter todas as funcionalidades do aplicativo de gestão de agendas.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00897B]" />
                  <span>Enviar notificações e lembretes de eventos para os e-mails configurados.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00897B]" />
                  <span>Verificar e processar transações financeiras referentes aos planos e assinaturas da plataforma.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00897B]" />
                  <span>Enviar comunicados importantes sobre atualizações do sistema, termos de uso ou incidentes de segurança.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00897B]" />
                  <span>Personalizar a experiência de uso e otimizar o desempenho do aplicativo.</span>
                </li>
              </ul>
            </section>

            {/* Compartilhamento */}
            <section id="compartilhamento" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
                4. Compartilhamento de Informações
              </h2>
              <div className="h-1 w-12 rounded-full bg-[#00897B]" />
              <p className="leading-relaxed text-neutral-600">
                Nós **não vendemos, alugamos, transferimos ou comercializamos** seus dados pessoais a terceiros. Seus dados são compartilhados estritamente com os seguintes sub-processadores para viabilizar o funcionamento técnico da plataforma:
              </p>
              <div className="grid gap-4 mt-4 sm:grid-cols-2">
                <div className="rounded-xl border border-neutral-100 bg-neutral-50/50 p-4">
                  <p className="font-semibold text-neutral-900">Neon PostgreSQL</p>
                  <p className="text-xs text-neutral-500 mt-1">Armazenamento seguro do banco de dados.</p>
                </div>
                <div className="rounded-xl border border-neutral-100 bg-neutral-50/50 p-4">
                  <p className="font-semibold text-neutral-900">Stripe</p>
                  <p className="text-xs text-neutral-500 mt-1">Processamento e gestão segura de pagamentos.</p>
                </div>
                <div className="rounded-xl border border-neutral-100 bg-neutral-50/50 p-4">
                  <p className="font-semibold text-neutral-900">Resend</p>
                  <p className="text-xs text-neutral-500 mt-1">Envio de e-mails transacionais e Magic Links.</p>
                </div>
                <div className="rounded-xl border border-neutral-100 bg-neutral-50/50 p-4">
                  <p className="font-semibold text-neutral-900">Vercel</p>
                  <p className="text-xs text-neutral-500 mt-1">Hospedagem e infraestrutura de servidores cloud.</p>
                </div>
              </div>
            </section>

            {/* Segurança */}
            <section id="seguranca" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
                5. Segurança dos Dados
              </h2>
              <div className="h-1 w-12 rounded-full bg-[#00897B]" />
              <p className="leading-relaxed text-neutral-600">
                Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra perda, roubo, uso indevido e acesso não autorizado. As comunicações entre o seu navegador e a plataforma são totalmente criptografadas através de protocolos de segurança **HTTPS (SSL/TLS)**.
              </p>
              <p className="leading-relaxed text-neutral-600">
                Embora façamos o máximo para proteger suas informações, lembramos que nenhum método de transmissão pela Internet ou armazenamento eletrônico é 100% seguro.
              </p>
            </section>

            {/* Seus Direitos (LGPD) */}
            <section id="direitos-lgpd" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
                6. Seus Direitos (LGPD)
              </h2>
              <div className="h-1 w-12 rounded-full bg-[#00897B]" />
              <p className="leading-relaxed text-neutral-600">
                Como titular de dados pessoais no Brasil, a **Lei Geral de Proteção de Dados (LGPD)** assegura a você os seguintes direitos:
              </p>
              
              <div className="rounded-xl border border-[#00897B]/20 bg-[#00897B]/5 p-6 space-y-3">
                <p className="font-semibold text-neutral-900 flex items-center gap-2">
                  <span className="text-lg">🔒</span> Seus Direitos Garantidos:
                </p>
                <ul className="grid gap-2 text-sm text-neutral-700 sm:grid-cols-2">
                  <li className="flex items-center gap-2">
                    <span className="text-[#00897B] font-bold">•</span> Confirmação e acesso aos dados
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#00897B] font-bold">•</span> Correção de dados incorretos
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#00897B] font-bold">•</span> Exclusão de dados da plataforma
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#00897B] font-bold">•</span> Portabilidade para outro serviço
                  </li>
                  <li className="flex items-center gap-2 col-span-full">
                    <span className="text-[#00897B] font-bold">•</span> Revogação do consentimento para tratamento
                  </li>
                </ul>
                <p className="text-xs text-neutral-500 pt-2 border-t border-[#00897B]/10">
                  Para exercer qualquer um destes direitos, basta nos enviar um e-mail com a sua solicitação. Responderemos com brevidade.
                </p>
              </div>
            </section>

            {/* Retenção de Dados */}
            <section id="retencao" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
                7. Retenção de Dados
              </h2>
              <div className="h-1 w-12 rounded-full bg-[#00897B]" />
              <p className="leading-relaxed text-neutral-600">
                Mantemos seus dados em nossa plataforma ativa apenas pelo tempo em que a sua conta estiver ativa ou conforme necessário para prestar os serviços contratados. 
              </p>
              <p className="leading-relaxed text-neutral-600">
                Se você decidir excluir sua conta, as informações cadastrais e dados de agendamentos serão excluídos definitivamente de nossos servidores dentro do prazo de **30 dias**, exceto quando a manutenção for estritamente necessária para o cumprimento de obrigações fiscais, jurídicas ou regulatórias.
              </p>
            </section>

            {/* Alterações */}
            <section id="alteracoes" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
                8. Alterações nesta Política
              </h2>
              <div className="h-1 w-12 rounded-full bg-[#00897B]" />
              <p className="leading-relaxed text-neutral-600">
                Podemos atualizar nossa Política de Privacidade a qualquer momento para refletir mudanças em nossos serviços ou em exigências legais. Quando isso ocorrer, atualizaremos a data de "Última atualização" no início deste documento. Recomendamos que você revise esta página regularmente para se manter informado.
              </p>
            </section>

            {/* Contato */}
            <section id="contato" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
                9. Contato
              </h2>
              <div className="h-1 w-12 rounded-full bg-[#00897B]" />
              <p className="leading-relaxed text-neutral-600">
                Se tiver dúvidas ou sugestões sobre como tratamos seus dados pessoais, você pode entrar em contato diretamente com o nosso Encarregado de Proteção de Dados (DPO):
              </p>
              <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-neutral-950">Encarregado de Proteção de Dados (DPO)</p>
                  <p className="text-sm text-neutral-600 mt-1">Dúvidas, reclamações ou requisições de direitos.</p>
                </div>
                <a
                  href="mailto:suporte@healthcommerce.com.br"
                  className="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors shadow-sm self-start sm:self-center"
                >
                  suporte@healthcommerce.com.br
                </a>
              </div>
            </section>

          </article>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white px-6 py-8 mt-12 text-center text-sm text-neutral-500">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <span>
            © {new Date().getFullYear()} Gestão de Agendas. Todos os direitos reservados.
          </span>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-neutral-900 transition-colors">
              Página Inicial
            </Link>
            <span className="text-neutral-300">|</span>
            <Link href="/privacy" className="font-semibold text-neutral-900 hover:text-neutral-900 transition-colors">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
