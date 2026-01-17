"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { Hero } from "@/components/hero";
import { LoadingScreen } from "@/components/loading/LoadingScreen";
import { IdeasScreen } from "@/components/ideas/IdeasScreen";
import Editor from "@/components/editor/Editor";
import TemplateGallery from "@/components/templates/TemplateGallery";

import { processVideo } from "@/app/actions/processVideo";
import { textToIdeas, Slide } from "@/lib/textToIdeas";
import { Template } from "@/lib/templates";

/* ───────────────────────────────────────────── */

type Step = "home" | "loading" | "ideas" | "templates" | "editor";

/* ───────────────────────────────────────────── */

export function Wizard() {
  const { data: session } = useSession();
  const [step, setStep] = useState<Step>("home");

  const [videoUrl, setVideoUrl] = useState("");
  const [slides, setSlides] = useState<Slide[]>([]);
  const [rawText, setRawText] = useState("");
  const [userPlan, setUserPlan] = useState<'free' | 'premium'>('free');

  const startGeneration = async (url: string) => {
    setStep("loading");
    setVideoUrl("");
    setSlides([]);
    setRawText("");

    try {
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

  const applyTemplate = (template: Template) => {
    const slidesWithTemplate = slides.map((slide, index) => {
      const templateSlide = template.slides[0];
      
      return {
        ...slide,
        elements: [
          ...templateSlide.elements.map(el => ({
            ...el,
            content: index === 0 ? slide.title : slide.content,
            id: `${el.type}-${Date.now()}-${Math.random()}`
          }))
        ],
        bgColor: templateSlide.bgColor
      };
    });

    setSlides(slidesWithTemplate);
    setStep("editor");
  };

  const skipTemplates = () => {
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
          <h3 className="font-semibold mb-2">Texto procesado (debug)</h3>
          <pre className="text-sm whitespace-pre-wrap text-zinc-700">
            {rawText}
          </pre>
        </div>

        <IdeasScreen ideas={slides} onContinue={handleSlidesContinue} />
      </>
    );
  }

  if (step === "templates") {
    return (
      <TemplateGallery
        userPlan={userPlan}
        onSelectTemplate={applyTemplate}
        onSkip={skipTemplates}
      />
    );
  }

  if (step === "editor") {
    return <Editor videoUrl={videoUrl} slides={slides} />;
  }

  return <Hero onGenerate={startGeneration} />;
}