"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, Type, Palette, Layout, Settings2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function Editor() {
  const [bgColor, setBgColor] = useState("#ffffff")
  const [textColor, setTextColor] = useState("#000000")
  const [showBorders, setShowBorders] = useState(true)
  const [showNumbers, setShowNumbers] = useState(true)

  const slides = [
    {
      id: 1,
      title: "El Futuro de la IA",
      content: "Cómo los modelos de lenguaje están transformando la productividad empresarial en 2024.",
    },
    {
      id: 2,
      title: "Automatización",
      content: "No se trata de reemplazar humanos, sino de potenciar sus habilidades creativas.",
    },
    {
      id: 3,
      title: "Casos de Uso",
      content: "Desde redacción de correos hasta análisis de datos complejos en segundos.",
    },
    {
      id: 4,
      title: "Próximos Pasos",
      content: "Empieza hoy mismo a integrar flujos de trabajo inteligentes en tu equipo.",
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">
      {/* Vista Previa */}
      <div className="lg:col-span-7 bg-zinc-50 rounded-3xl border border-zinc-200/60 p-8 md:p-12 min-h-[600px] flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              style={{ backgroundColor: bgColor, color: textColor }}
              className={cn(
                "aspect-square p-8 rounded-2xl flex flex-col justify-between shadow-sm transition-all duration-300",
                showBorders ? "border border-zinc-200" : "border-none",
              )}
            >
              <div>
                <h3 className="text-xl font-bold mb-4">{slide.title}</h3>
                <p className="text-sm opacity-80 leading-relaxed">{slide.content}</p>
              </div>
              {showNumbers && (
                <div className="text-xs font-mono opacity-50">
                  Slide {index + 1}/{slides.length}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Panel de Control */}
      <aside className="lg:col-span-3 sticky top-24 space-y-6">
        <Card className="p-6 border-zinc-200/60 shadow-sm rounded-2xl">
          <div className="flex items-center gap-2 mb-6">
            <Settings2 className="w-4 h-4 text-zinc-500" />
            <h2 className="font-bold text-lg">Personalización</h2>
          </div>

          <div className="space-y-6">
            {/* Colores */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Palette className="w-4 h-4" />
                  <span>Fondo</span>
                </div>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-none bg-transparent"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Palette className="w-4 h-4" />
                  <span>Texto</span>
                </div>
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-none bg-transparent"
                />
              </div>
            </div>

            <hr className="border-zinc-100" />

            {/* Tipografía y Tema */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-wider">
                  <Type className="w-3 h-3" /> Tipografía
                </Label>
                <Select defaultValue="sans">
                  <SelectTrigger className="w-full bg-zinc-50/50 border-zinc-200 rounded-xl h-11">
                    <SelectValue placeholder="Seleccionar fuente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sans">Geist Sans</SelectItem>
                    <SelectItem value="serif">Merriweather</SelectItem>
                    <SelectItem value="mono">Geist Mono</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-wider">
                  <Layout className="w-3 h-3" /> Tema
                </Label>
                <Select defaultValue="minimal">
                  <SelectTrigger className="w-full bg-zinc-50/50 border-zinc-200 rounded-xl h-11">
                    <SelectValue placeholder="Seleccionar tema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minimal">Minimalista</SelectItem>
                    <SelectItem value="bold">Negrita</SelectItem>
                    <SelectItem value="gradient">Gradiente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <hr className="border-zinc-100" />

            {/* Toggles */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium cursor-pointer" htmlFor="borders">
                  Mostrar Bordes
                </Label>
                <Switch id="borders" checked={showBorders} onCheckedChange={setShowBorders} />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium cursor-pointer" htmlFor="numbers">
                  Mostrar Numeración
                </Label>
                <Switch id="numbers" checked={showNumbers} onCheckedChange={setShowNumbers} />
              </div>
            </div>
          </div>

          <Button className="w-full mt-10 bg-black text-white hover:bg-zinc-800 rounded-xl h-14 font-bold text-lg flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-zinc-200">
            <Download className="w-5 h-5" />
            Descargar PDF
          </Button>
        </Card>

        <p className="text-center text-[10px] text-zinc-400 uppercase tracking-widest px-4">
          Optimizado para LinkedIn Carousel (1080x1080)
        </p>
      </aside>
    </div>
  )
}
