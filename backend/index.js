import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// ============================
// asegurar carpetas
// ============================
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
if (!fs.existsSync("subtitles")) fs.mkdirSync("subtitles");

// ============================
// configuración de Multer
// ============================
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ============================
// subir video
// ============================
app.post("/upload-video", upload.single("video"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No se subió ningún video" });
  }

  res.json({
    message: "Video subido correctamente",
    videoId: req.file.filename,
  });
});

// ============================
// generar subtítulos (mock)
// ============================
app.post("/generate-subtitles", (req, res) => {
  const { videoId } = req.body;

  if (!videoId) {
    return res.status(400).json({ error: "Falta videoId" });
  }

  const subtitles = [
    { start: 0.0, end: 2.5, text: "Hola, este es un test real" },
    { start: 2.6, end: 5.0, text: "Estamos probando subtítulos" },
    { start: 5.1, end: 8.0, text: "Todo el flujo funciona" },
  ];

  fs.writeFileSync(
    `subtitles/${videoId}.json`,
    JSON.stringify(subtitles, null, 2)
  );

  res.json({
    message: "Subtítulos generados",
    subtitles,
  });
});

// ============================
// obtener subtítulos por video
// ============================
app.get("/subtitles/:videoId", (req, res) => {
  const videoId = req.params.videoId;
  const filePath = `subtitles/${videoId}.json`;

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Subtítulos no encontrados" });
  }

  const data = fs.readFileSync(filePath, "utf-8");
  res.json(JSON.parse(data));
});

// ============================
// servir videos
// ============================
app.use("/videos", express.static("uploads"));

// ============================
// levantar servidor
// ============================
app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
