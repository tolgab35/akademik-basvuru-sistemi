import express from "express";
const router = express.Router();

// Geçici test route'u
router.get("/", (req, res) => {
  res.send("Jüri API aktif.");
});

export default router;
