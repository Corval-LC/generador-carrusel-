"use client"

type Slide = {
  id: string
  title: string
  content: string
}

export function IdeasSelector({
  slides,
  selected,
  onChange,
  onNext,
}: {
  slides: Slide[]
  selected: Slide[]
  onChange: (slides: Slide[]) => void
  onNext: () => void
}) {
  const toggleSlide = (slide: Slide) => {
    const exists = selected.find((s) => s.id === slide.id)

    if (exists) {
      onChange(selected.filter((s) => s.id !== slide.id))
    } else {
      onChange([...selected, slide])
    }
  }

  return (
    <div className="mt-12 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-2">
        Ideas clave detectadas
      </h2>

      <p className="text-zinc-500 mb-6">
        Elegí qué ideas querés usar en el carrusel final
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {slides.map((slide, index) => {
          const active = selected.some(
            (s) => s.id === slide.id
          )

          return (
            <div
              key={slide.id}
              onClick={() => toggleSlide(slide)}
              className={`cursor-pointer rounded-2xl border p-5 transition
                ${
                  active
                    ? "border-black bg-zinc-50"
                    : "border-zinc-200 hover:bg-zinc-50"
                }
              `}
            >
              <span className="text-xs text-zinc-400">
                Idea {index + 1}
              </span>

              <h3 className="font-semibold mt-1">
                {slide.title}
              </h3>

              <p className="text-sm text-zinc-600 mt-2">
                {slide.content}
              </p>
            </div>
          )
        })}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onNext}
          disabled={selected.length === 0}
          className="rounded-xl bg-black px-6 py-3 text-white font-semibold disabled:opacity-40"
        >
          Siguiente →
        </button>
      </div>
    </div>
  )
}
