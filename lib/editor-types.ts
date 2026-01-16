export type BlockType = "title" | "text";

export type Block = {
  id: string;
  type: BlockType;
  text: string;
  x: number;
  y: number;
  width: number;
};

export type Slide = {
  id: string;
  blocks: Block[];
};
