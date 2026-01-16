import { useState } from "react";
import Canvas from "./Canvas";

export type BlockType = {
  id: string;
  type: "text" | "image";
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
};

export default function Editor() {
  const [blocks, setBlocks] = useState<BlockType[]>([
    {
      id: "1",
      type: "text",
      x: 50,
      y: 50,
      width: 200,
      height: 80,
      content: "Texto editable",
    },
    {
      id: "2",
      type: "image",
      x: 300,
      y: 120,
      width: 180,
      height: 180,
    },
  ]);

  const updateBlock = (id: string, updates: Partial<BlockType>) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Canvas blocks={blocks} updateBlock={updateBlock} />
    </div>
  );
}
