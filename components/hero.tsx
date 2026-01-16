"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Link2, Sparkles } from "lucide-react"

export function Hero({
  onGenerate,
}: {
  onGenerate: (url: string) => void
}) {
  const [url, setUrl] = useState("")
  const [error, setError] = useState("")

  const handleClick = () => {
    if (!url || !url.trim()) {
      setError("Pegá una URL de YouTube válida")
      return
    }

    setError("")
    onGenerate(url)
  }

  return (
    <section className="pt-4 pb-2 px-4 text-center">
      {/* HERO IMAGE */}
      <div className="flex justify-center mb-6">
        <img
          src="/hero-image.png"
          alt="Vista previa del carrusel"
          className="w-full max-w-lg md:max-w-xl rounded-2xl shadow-xl"
        />
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium mb-6">
        <Sparkles className="w-3 h-3 text-zinc-500" />
        <span>Powered by GPT-4o</span>
      </div>

      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 max-w-2xl mx-auto">
        Convierte videos de YouTube en{" "}
        <span className="text-zinc-500">
          Carruseles de LinkedIn
        </span>
      </h1>

      <p className="text-zinc-500 text-lg mb-10 max-w-xl mx-auto">
        Pega el link de cualquier video y deja que
        nuestra IA cree un carrusel optimizado para
        tu audiencia en segundos.
      </p>

      {/* INPUT */}
      <div className="max-w-2xl mx-auto relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-zinc-200 to-zinc-100 rounded-2xl blur opacity-25" />

        <div className="relative flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-2xl border border-zinc-200 shadow-xl">
          <div className="flex-1 relative flex items-center">
            <Link2 className="absolute left-4 w-5 h-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Pega la URL de YouTube aquí..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-transparent outline-hidden text-lg"
            />
          </div>

          <Button
            size="lg"
            onClick={handleClick}
            className="bg-black text-white hover:bg-zinc-800 rounded-xl px-8 py-7 text-lg font-semibold"
          >
            Generar Carrusel con IA
          </Button>
        </div>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-500">
          {error}
        </p>
      )}
    </section>
  )
}
