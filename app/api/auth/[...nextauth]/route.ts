import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // MOCK USER (después DB real)
        if (
          credentials.email === "test@test.com" &&
          credentials.password === "123456"
        ) {
          return {
            id: "1",
            email: credentials.email,
            name: "Usuario Demo",
          }
        }

        return null
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
})

export { handler as GET, handler as POST }
