import { createCarousel } from "@/app/actions/createCarousel";

type Props = {
  videoUrl: string;
  ideas: any[];
  slides: any[];
};

export async function CreateCarouselBridge({
  videoUrl,
  ideas,
  slides,
}: Props) {
  await createCarousel({ videoUrl, ideas, slides });
  return null;
}
