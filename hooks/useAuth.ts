import { useSession } from "next-auth/react"

export function useAuth() {
  const { data: session, status } = useSession()

  const isLogged = !!session

  return {
    user: session?.user ?? null,
    isLogged,
    loading: status === "loading",

    // 🟢 POR AHORA:
    // usuario logueado = PRO
    isPro: isLogged,
  }
}
