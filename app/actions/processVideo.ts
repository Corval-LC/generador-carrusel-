"use server";

import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const execAsync = promisify(exec);

export async function processVideo(videoUrl: string) {
  // 🔥 ID ÚNICO POR VIDEO
  const jobId = crypto.randomUUID();

  const tmpBaseDir = path.join(process.cwd(), "tmp");
  const jobDir = path.join(tmpBaseDir, jobId);

  try {
    console.log("🎬 Procesando video:", videoUrl);
    console.log("🧠 Job ID:", jobId);

    // Crear directorios
    if (!fs.existsSync(tmpBaseDir)) {
      fs.mkdirSync(tmpBaseDir);
    }

    fs.mkdirSync(jobDir);

    const audioPath = path.join(jobDir, "audio.mp3");

    // 1️⃣ Descargar audio
    await execAsync(
      `yt-dlp -f bestaudio -x --audio-format mp3 -o "${audioPath}" ${videoUrl}`
    );

    // 2️⃣ Transcribir con Whisper
    await execAsync(
      `whisper "${audioPath}" --language Spanish --model small --output_format txt --output_dir "${jobDir}"`
    );

    // 3️⃣ Leer SOLO el txt de este job
    const textFile = fs
      .readdirSync(jobDir)
      .find((f) => f.endsWith(".txt"));

    if (!textFile) {
      throw new Error("No se generó la transcripción");
    }

    const text = fs.readFileSync(
      path.join(jobDir, textFile),
      "utf-8"
    );

    console.log("✅ Transcripción generada");

    return {
      text,
    };
  } catch (error) {
    console.error("❌ Error procesando video:", error);
    throw error;
  } finally {
    // 🧹 LIMPIEZA (MUY IMPORTANTE)
    if (fs.existsSync(jobDir)) {
      fs.rmSync(jobDir, { recursive: true, force: true });
    }
  }
}
