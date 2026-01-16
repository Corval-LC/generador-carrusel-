"use client";

import { motion } from "framer-motion";
import type { Block } from "@/lib/editor-types";
import { useState } from "react";

export function BlockView({
  block,
  selected,
  onSelect,
  onUpdate,
}: {
  block: Block;
  selected: boolean;
  onSelect: () => void;
  onUpdate: (data: Partial<Block>) => void;
}) {
  const [editing, setEditing] = useState(false);

  return (
    <motion.div
      drag
      dragMomentum={false}
      onPointerDown={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onDragEnd={(_, info) => {
        onUpdate({
          x: block.x + info.offset.x,
          y: block.y + info.offset.y,
        });
      }}
      className={`absolute cursor-move ${
        selected ? "ring-2 ring-blue-500" : ""
      }`}
      style={{
        left: block.x,
        top: block.y,
        width: block.width,
      }}
    >
      {/* CONTENIDO */}
      {editing ? (
        block.type === "title" ? (
          <input
            autoFocus
            value={block.text}
            onChange={(e) =>
              onUpdate({ text: e.target.value })
            }
            onBlur={() => setEditing(false)}
            className="w-full bg-transparent outline-none text-2xl font-bold"
          />
        ) : (
          <textarea
            autoFocus
            value={block.text}
            onChange={(e) =>
              onUpdate({ text: e.target.value })
            }
            onBlur={() => setEditing(false)}
            className="w-full bg-transparent outline-none resize-none"
          />
        )
      ) : (
        <div
          onDoubleClick={() => setEditing(true)}
          className={`select-none ${
            block.type === "title"
              ? "text-2xl font-bold"
              : "text-base"
          }`}
        >
          {block.text}
        </div>
      )}
    </motion.div>
  );
}
