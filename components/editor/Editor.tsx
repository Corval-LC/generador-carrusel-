"use client";

import { useEffect, useState } from "react";
import { CanvasPreview } from "./CanvasPreview";
import { DesignSidebar } from "./DesignSidebar";
import { ThumbnailsStrip } from "./ThumbnailsStrip";
import { createCarousel } from "@/app/actions/createCarousel";
import type { Slide, Block } from "@/lib/editor-types";
import { useAuth } from "@/hooks/useAuth";

export function Editor({
  videoUrl,
  slides: initialSlides,
}: {
  videoUrl: string;
  slides: any[];
}) {
  const { isPro } = useAuth();

  const [slides, setSlides] = useState<Slide[]>([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [selectedBlockId, setSelectedBlockId] =
    useState<string | null>(null);

  const [bgColor, setBgColor] = useState("#ffffff");
  const [showBorders, setShowBorders] = useState(true);
  const [showNumbers, setShowNumbers] = useState(true);

  /* NORMALIZAR SLIDES */
  useEffect(() => {
    const normalized: Slide[] = initialSlides.map((s, index) => ({
      id: s.id ?? `slide-${index}`,
      blocks: [
        {
          id: `title-${index}`,
          type: "title",
          text: s.title ?? `Slide ${index + 1}`,
          x: 180,
          y: 160,
          width: 320,
        },
        {
          id: `text-${index}`,
          type: "text",
          text: s.content ?? "",
          x: 180,
          y: 260,
          width: 360,
        },
      ],
    }));

    setSlides(normalized);
  }, [initialSlides]);

  /* AUTOSAVE */
  useEffect(() => {
    if (videoUrl && slides.length > 0) {
      createCarousel({ videoUrl, slides });
    }
  }, [slides, videoUrl]);

  const updateBlock = (id: string, data: Partial<Block>) => {
    setSlides((prev) =>
      prev.map((slide, i) =>
        i !== activeSlideIndex
          ? slide
          : {
              ...slide,
              blocks: slide.blocks.map((b) =>
                b.id === id ? { ...b, ...data } : b
              ),
            }
      )
    );
  };

  const activeSlide = slides[activeSlideIndex];
  if (!activeSlide) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
      <div className="lg:col-span-7">
        <CanvasPreview
          slide={activeSlide}
          bgColor={bgColor}
          showBorders={showBorders}
          showNumbers={showNumbers}
          selectedBlockId={selectedBlockId}
          onSelectBlock={setSelectedBlockId}
          onUpdateBlock={updateBlock}
        />
      </div>

      <div className="lg:col-span-3">
        <DesignSidebar
          bgColor={bgColor}
          setBgColor={setBgColor}
          showBorders={showBorders}
          setShowBorders={setShowBorders}
          showNumbers={showNumbers}
          setShowNumbers={setShowNumbers}
          isPro={isPro}
        />
      </div>

      <ThumbnailsStrip
        slides={slides}
        activeIndex={activeSlideIndex}
        onSelect={(i) => {
          setActiveSlideIndex(i);
          setSelectedBlockId(null);
        }}
      />
    </div>
  );
}
