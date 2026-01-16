import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  return NextResponse.json({
    slides: [
      {
        slide: 1,
        title: "Idea principal",
        content: "Resumen del video",
      },
      {
        slide: 2,
        title: "Desarrollo",
        content: "Puntos clave del contenido",
      },
      {
        slide: 3,
        title: "Cierre",
        content: "Llamado a la acción",
      },
    ],
    input: body,
  })
}
