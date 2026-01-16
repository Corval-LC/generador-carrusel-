import { useRef, useState } from "react";
import { BlockType } from "./Editor";

type Props = {
  block: BlockType;
  updateBlock: (id: string, updates: Partial<BlockType>) => void;
};

const SNAP_SIZE = 10;

export default function DraggableBlock({ block, updateBlock }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const snap = (value: number) =>
    Math.round(value / SNAP_SIZE) * SNAP_SIZE;

  const onMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDragging(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const startLeft = block.x;
    const startTop = block.y;

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      updateBlock(block.id, {
        x: snap(startLeft + dx),
        y: snap(startTop + dy),
      });
    };

    const onMouseUp = () => {
      setDragging(false);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      style={{
        position: "absolute",
        left: block.x,
        top: block.y,
        width: block.width,
        height: block.height,
      }}
      className={`border ${
        dragging ? "border-blue-500" : "border-gray-300"
      } cursor-move bg-white flex items-center justify-center select-none`}
    >
      {block.type === "text" ? (
        <span>{block.content}</span>
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          IMG
        </div>
      )}
    </div>
  );
}
