import { BlockType } from "./Editor";
import DraggableBlock from "./DraggableBlock";

type Props = {
  blocks: BlockType[];
  updateBlock: (id: string, updates: Partial<BlockType>) => void;
};

export default function Canvas({ blocks, updateBlock }: Props) {
  return (
    <div
      className="relative bg-white shadow-lg"
      style={{ width: 800, height: 600 }}
    >
      {blocks.map((block) => (
        <DraggableBlock
          key={block.id}
          block={block}
          updateBlock={updateBlock}
        />
      ))}
    </div>
  );
}
