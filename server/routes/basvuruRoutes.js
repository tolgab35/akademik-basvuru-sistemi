// server/routes/basvuruRoutes.js
import express from "express";
import {
  createBasvuru,
  getAdayBasvurular,
  getTumBasvurular,
  getBasvuruById,
  deleteBasvuru,
} from "../controllers/basvuruController.js";
import { verifyToken } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js"; // multer ayarın

const router = express.Router();

// 📤 Aday başvuru yapar (çoklu belge yükler)
router.post("/", verifyToken, upload.array("belgeler"), createBasvuru);

// 📥 Aday sadece kendi başvurularını görür
router.get("/aday", verifyToken, getAdayBasvurular);

// 📊 Yönetici tüm başvuruları görür
router.get("/tum", verifyToken, getTumBasvurular);

// 🔍 Belirli başvuru
router.get("/:id", verifyToken, getBasvuruById);

// ❌ Başvuru silme
router.delete("/:id", verifyToken, deleteBasvuru);

export default router;
