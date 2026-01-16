"use client"

import { GripVertical } from "lucide-react"

export function DragHandle({
  listeners,
  attributes,
}: {
  listeners?: any
  attributes?: any
}) {
  return (
    <button
      type="button"
      aria-label="Arrastrar slide"
      className="cursor-grab active:cursor-grabbing text-zinc-400 hover:text-zinc-700"
      {...attributes}
      {...listeners}
    >
      <GripVertical className="w-5 h-5" />
    </button>
  )
}
