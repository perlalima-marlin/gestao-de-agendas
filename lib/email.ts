import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendWelcomeEmail(email: string, name: string) {
  return resend.emails.send({
    from: "Gestão de Agendas <no-reply@gestao-de-agendas.app>",
    to: email,
    subject: "Bem-vindo ao Gestão de Agendas!",
    html: `<h1>Olá, ${name}!</h1><p>Seu trial de 14 dias começou. Aproveite!</p>`,
  })
}
