"use server";

import { supabase } from "@/lib/supabase";

export async function createCarousel({
  videoUrl,
  ideas,
  slides,
}: {
  videoUrl: string;
  ideas: any[];
  slides: any[];
}) {
  console.log("🔥 createCarousel ejecutada");

  const { error } = await supabase
    .from("carousels")
    .insert({
      original_text: videoUrl,
      extracted_text: JSON.stringify({
        ideas,
        slides,
      }),
    });

  if (error) {
    console.error("SUPABASE ERROR:", error);
    throw new Error("Error insertando carrusel");
  }

  return { ok: true };
}
