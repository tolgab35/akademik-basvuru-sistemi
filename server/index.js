import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

// Route dosyalarını import et
import authRoutes from "./routes/authRoutes.js";
import ilanRoutes from "./routes/ilanRoutes.js";
import basvuruRoutes from "./routes/basvuruRoutes.js";
import juriRoutes from "./routes/juriRoutes.js";

dotenv.config(); // .env dosyasını yükle

const app = express();

// Middleware'ler
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Dosya yükleme klasörü

// API route'ları
app.use("/api/auth", authRoutes);
app.use("/api/ilan", ilanRoutes);
app.use("/api/basvuru", basvuruRoutes);
app.use("/api/juri", juriRoutes);

// Sunucuyu başlat
const PORT = process.env.PORT || 8000;
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT} portunda çalışıyor.`);
});
