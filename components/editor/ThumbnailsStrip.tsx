"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { cn } from "@/lib/utils"
import { GripVertical } from "lucide-react"

type Slide = {
  id: number
  title: string
}

function SortableThumbnail({
  id,
  title,
  active,
  onClick,
}: {
  id: number
  title: string
  active: boolean
  onClick: () => void
}) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer select-none",
        active
          ? "border-black bg-zinc-100"
          : "border-zinc-200 bg-white"
      )}
      onClick={onClick}
    >
      <button
        className="cursor-grab active:cursor-grabbing text-zinc-400"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-4 h-4" />
      </button>

      <span className="text-xs truncate max-w-[120px]">
        {title}
      </span>
    </div>
  )
}

export function ThumbnailsStrip({
  slides,
  activeIndex,
  onSelect,
}: {
  slides: Slide[]
  activeIndex: number
  onSelect: (index: number) => void
}) {
  return (
    <div className="mt-8 px-6 pb-6 flex gap-3 overflow-x-auto">
      {slides.map((slide, index) => (
        <SortableThumbnail
          key={slide.id}
          id={slide.id}
          title={slide.title}
          active={index === activeIndex}
          onClick={() => onSelect(index)}
        />
      ))}
    </div>
  )
}
