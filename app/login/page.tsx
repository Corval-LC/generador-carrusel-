"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    setError("")

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (res?.error) {
      setError("Credenciales inválidas")
      setLoading(false)
      return
    }

    // ✅ login OK → volvemos al home
    router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-sm border border-zinc-200 rounded-2xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-4">
          Iniciar sesión
        </h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 border px-3 py-2 rounded-lg"
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 border px-3 py-2 rounded-lg"
        />

        {error && (
          <p className="text-sm text-red-500 mb-2">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-lg font-semibold"
        >
          {loading ? "Entrando…" : "Entrar"}
        </button>

        <p className="text-xs text-zinc-400 mt-4 text-center">
          test@test.com · 123456
        </p>
      </div>
    </div>
  )
}
