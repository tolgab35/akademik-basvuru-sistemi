// server/routes/ilanRoutes.js
import express from "express";
import {
  createIlan,
  getIlanlar,
  updateIlan,
  deleteIlan,
} from "../controllers/ilanController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// Yeni ilan ekle
router.post("/", verifyToken, createIlan);

// Tüm ilanları getir
router.get("/", verifyToken, getIlanlar);

// Belirli ilanı güncelle
router.put("/:id", verifyToken, updateIlan);

// Belirli ilanı sil
router.delete("/:id", verifyToken, deleteIlan);

export default router;
