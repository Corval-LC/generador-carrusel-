export type BlockType = "title" | "text";

export type Block = {
  id: string;
  type: BlockType;
  text: string;
  x: number;
  y: number;
  width: number;
  color?: string;
};

export type Slide = {
  id: string;
  blocks: Block[];
};
