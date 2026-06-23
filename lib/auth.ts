import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { db } from "./db"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY!,
      from: "no-reply@gestao-de-agendas.app",
    }),
    Credentials({
      name: "Credenciais",
      credentials: {
        username: { label: "Usuário", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const username = credentials?.username as string | undefined
        const password = credentials?.password as string | undefined
        if (!username || !password) return null

        const adminUser = process.env.ADMIN_USERNAME ?? "admin"
        const adminHash = process.env.ADMIN_PASSWORD_HASH

        if (!adminHash) return null
        if (username !== adminUser) return null

        const valid = await bcrypt.compare(password, adminHash)
        if (!valid) return null

        // Find or create admin user in DB
        const email = process.env.ADMIN_EMAIL ?? "admin@gestao-de-agendas.app"
        let user = await db.user.findUnique({ where: { email } })
        if (!user) {
          user = await db.user.create({
            data: {
              email,
              name: "Admin",
              plan: "PRO",
            },
          })
        }

        return { id: user.id, email: user.email, name: user.name }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      if (token.id) session.user.id = token.id as string
      return session
    },
  },
  events: {
    async createUser({ user }) {
      // Skip trial for admin (already set to PRO via credentials)
      if (user.email === (process.env.ADMIN_EMAIL ?? "admin@gestao-de-agendas.app")) return
      const trialEndsAt = new Date()
      trialEndsAt.setDate(trialEndsAt.getDate() + 14)
      await db.user.update({
        where: { id: user.id },
        data: { plan: "TRIAL", trialEndsAt },
      })
    },
  },
  pages: {
    signIn: "/login",
  },
})
