"use client";

import { useState } from "react";

import { Hero } from "@/components/hero";
import { LoadingScreen } from "@/components/loading/LoadingScreen";
import { IdeasScreen } from "@/components/ideas/IdeasScreen";
import  Editor  from "@/components/editor/Editor";

import { processVideo } from "@/app/actions/processVideo";
import { textToIdeas, Slide } from "@/lib/textToIdeas";

/* ───────────────────────────────────────────── */

type Step = "home" | "loading" | "ideas" | "editor";

/* ───────────────────────────────────────────── */

export function Wizard() {
  const [step, setStep] = useState<Step>("home");

  const [videoUrl, setVideoUrl] = useState("");
  const [slides, setSlides] = useState<Slide[]>([]);
  const [rawText, setRawText] = useState("");

  const startGeneration = async (url: string) => {
    // 🔥 RESET TOTAL DEL ESTADO (CLAVE)
    setStep("loading");
    setVideoUrl("");
    setSlides([]);
    setRawText("");

    try {
      // seteo del nuevo video
      setVideoUrl(url);

      const result = await processVideo(url);

      setRawText(result.text);

      const generatedSlides = textToIdeas(result.text);
      setSlides(generatedSlides);

      setStep("ideas");
    } catch (error) {
      console.error("❌ Error procesando video:", error);
      setStep("home");
    }
  };

  const handleSlidesContinue = (selected: Slide[]) => {
    setSlides(selected);
    setStep("editor");
  };

  /* ───────────────────────────────────────────── */

  if (step === "loading") {
    return <LoadingScreen />;
  }

  if (step === "ideas") {
    return (
      <>
        <div className="max-w-3xl mx-auto my-6 p-4 border rounded-lg bg-zinc-50">
          <h3 className="font-semibold mb-2">
            Texto procesado (debug)
          </h3>
          <pre className="text-sm whitespace-pre-wrap text-zinc-700">
            {rawText}
          </pre>
        </div>

        <IdeasScreen
          ideas={slides}
          onContinue={handleSlidesContinue}
        />
      </>
    );
  }

  if (step === "editor") {
    return (
      <Editor
        videoUrl={videoUrl}
        slides={slides}
      />
    );
  }

  return <Hero onGenerate={startGeneration} />;
}
