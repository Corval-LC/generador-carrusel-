export type Slide = {
  id: number;
  title: string;
  content: string;
};

export function textToIdeas(text: string): Slide[] {
  if (!text) return [];

  const paragraphs = text
    .split("\n")
    .map(p => p.trim())
    .filter(p => p.length > 0);

  return paragraphs.slice(0, 6).map((p, index) => ({
    id: index + 1,
    title: `Slide ${index + 1}`,
    content: p,
  }));
}
