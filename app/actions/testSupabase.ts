"use server";

import { supabase } from "@/lib/supabase";

export async function testSupabase() {
  const { error } = await supabase.from("carousels").insert({
    original_text: "Hola Supabase",
    extracted_text: "Conexión OK",
  });

  if (error) {
    console.error(error);
    throw new Error("Error insertando en Supabase");
  }

  return { ok: true };
}
