"use client"

import { signOut, useSession } from "next-auth/react"

export function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="fixed top-0 inset-x-0 h-14 border-b bg-white flex items-center justify-between px-6 z-50">
      <span className="font-bold">
        CarouselAI
      </span>

      {session ? (
        <div className="flex items-center gap-4">
          <span className="text-sm text-zinc-500">
            {session.user?.email}
          </span>
          <button
            onClick={() => signOut()}
            className="text-sm font-medium"
          >
            Salir
          </button>
        </div>
      ) : (
        <a
          href="/login"
          className="text-sm font-medium"
        >
          Login
        </a>
      )}
    </nav>
  )
}
