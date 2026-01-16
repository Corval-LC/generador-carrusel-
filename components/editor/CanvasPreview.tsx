"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import type { Slide, Block } from "@/lib/editor-types";
import { cn } from "@/lib/utils";

export function CanvasPreview({
  slide,
  bgColor,
  showBorders,
  showNumbers,
  selectedBlockId,
  onSelectBlock,
  onUpdateBlock,
}: {
  slide: Slide;
  bgColor: string;
  showBorders: boolean;
  showNumbers: boolean;
  selectedBlockId: string | null;
  onSelectBlock: (id: string | null) => void;
  onUpdateBlock: (id: string, data: Partial<Block>) => void;
}) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="flex justify-center">
      {/* CANVAS REAL 1080x1080 escalado */}
      <div
        ref={canvasRef}
        className={cn(
          "relative rounded-2xl bg-white overflow-hidden",
          showBorders && "border"
        )}
        style={{
          width: 1080,
          height: 1080,
          backgroundColor: bgColor,
          transform: "scale(0.5)",
          transformOrigin: "top center",
        }}
        onMouseDown={() => {
          setEditingId(null);
          onSelectBlock(null);
        }}
      >
        {/* GUIAS */}
        <div className="absolute inset-x-0 top-1/2 h-px bg-red-500/40 pointer-events-none" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-red-500/40 pointer-events-none" />

        {slide.blocks.map((block, index) => {
          const selected = block.id === selectedBlockId;
          const editing = block.id === editingId;

          return (
            <motion.div
              key={block.id}
              drag={!editing}
              dragMomentum={false}
              dragConstraints={canvasRef}
              onMouseDown={(e) => {
                e.stopPropagation();
                onSelectBlock(block.id);
              }}
              onDragEnd={(_, info) => {
                onUpdateBlock(block.id, {
                  x: block.x + info.offset.x,
                  y: block.y + info.offset.y,
                });
              }}
              className={cn(
                "absolute",
                selected && "ring-2 ring-blue-500",
                !editing && "cursor-move"
              )}
              style={{
                left: block.x,
                top: block.y,
                width: block.width,
              }}
            >
              {block.type === "title" ? (
                <input
                  value={block.text}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    setEditingId(block.id);
                  }}
                  onBlur={() => setEditingId(null)}
                  onChange={(e) =>
                    onUpdateBlock(block.id, { text: e.target.value })
                  }
                  className={cn(
                    "w-full bg-transparent text-4xl font-bold outline-none",
                    editing
                      ? "pointer-events-auto cursor-text"
                      : "pointer-events-none"
                  )}
                />
              ) : (
                <textarea
                  value={block.text}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    setEditingId(block.id);
                  }}
                  onBlur={() => setEditingId(null)}
                  onChange={(e) =>
                    onUpdateBlock(block.id, { text: e.target.value })
                  }
                  className={cn(
                    "w-full bg-transparent resize-none outline-none text-xl",
                    editing
                      ? "pointer-events-auto cursor-text"
                      : "pointer-events-none"
                  )}
                />
              )}

              {showNumbers && (
                <div className="absolute -top-6 left-0 text-xs text-zinc-400">
                  {index + 1}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
