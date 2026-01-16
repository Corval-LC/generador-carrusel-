"use client"

import { useRef } from "react"
import * as htmlToImage from "html-to-image"

import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core"

import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable"

import { SortableSlide } from "./SortableSlide"

type Slide = {
  id: string
  title: string
  content: string
}

type Theme = {
  backgroundColor: string
  textColor: string
  fontSize: number
}

export function SlidesPreview({
  slides,
  theme,
  onChange,
}: {
  slides: Slide[]
  theme: Theme
  onChange: (slides: Slide[]) => void
}) {
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])

  const updateSlide = (
    index: number,
    field: "title" | "content",
    value: string
  ) => {
    const updated = [...slides]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = slides.findIndex(
      (s) => s.id === active.id
    )
    const newIndex = slides.findIndex(
      (s) => s.id === over.id
    )

    onChange(arrayMove(slides, oldIndex, newIndex))
  }

  const exportImages = async () => {
    for (let i = 0; i < slideRefs.current.length; i++) {
      const node = slideRefs.current[i]
      if (!node) continue

      const dataUrl = await htmlToImage.toPng(node, {
        pixelRatio: 2,
        backgroundColor: theme.backgroundColor,
        skipFonts: true,
        style: {
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          font:
            "16px system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        },
      })

      const link = document.createElement("a")
      link.download = `slide-${i + 1}.png`
      link.href = dataUrl
      link.click()
    }
  }

  return (
    <>
      {/* EXPORT */}
      <div className="flex justify-end max-w-4xl mx-auto mb-4">
        <button
          onClick={exportImages}
          className="rounded-xl bg-black px-6 py-3 text-white font-semibold"
        >
          Exportar imágenes
        </button>
      </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={slides.map((s) => s.id)}
          strategy={rectSortingStrategy}
        >
          <div className="mt-10 max-w-4xl mx-auto grid gap-6 sm:grid-cols-2">
            {slides.map((slide, index) => (
              <SortableSlide key={slide.id} id={slide.id}>
                <div
                  ref={(el) => {
                    slideRefs.current[index] = el
                  }}
                  style={{
                    backgroundColor: theme.backgroundColor,
                    color: theme.textColor,
                    fontSize: theme.fontSize,
                    fontFamily: "Inter, system-ui, sans-serif",
                  }}
                  className="cursor-grab rounded-2xl border border-zinc-200 p-6 shadow-sm transition active:cursor-grabbing"
                >
                  <span className="text-xs opacity-60">
                    Slide {index + 1}
                  </span>

                  {/* EDICIÓN INLINE */}
                  <input
                    value={slide.title}
                    onChange={(e) =>
                      updateSlide(index, "title", e.target.value)
                    }
                    className="mt-3 w-full bg-transparent font-bold outline-none"
                  />

                  <textarea
                    value={slide.content}
                    onChange={(e) =>
                      updateSlide(index, "content", e.target.value)
                    }
                    rows={4}
                    className="mt-2 w-full bg-transparent resize-none outline-none"
                  />
                </div>
              </SortableSlide>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </>
  )
}
