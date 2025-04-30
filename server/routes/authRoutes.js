// routes/authRoutes.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Kullanıcı kaydı
router.post("/register", async (req, res) => {
  const { ad, soyad, tc, email, sifre, rol } = req.body;
  const hashedPassword = await bcrypt.hash(sifre, 10);
  const user = new User({ ad, soyad, tc, email, sifre: hashedPassword, rol });
  await user.save();
  res.json({ msg: "Kayıt başarılı" });
});

// Kullanıcı girişi
router.post("/login", async (req, res) => {
  const { tc, sifre } = req.body;
  const user = await User.findOne({ tc });
  if (!user) return res.status(404).json({ msg: "Kullanıcı bulunamadı" });

  const isMatch = await bcrypt.compare(sifre, user.sifre);
  if (!isMatch) return res.status(401).json({ msg: "Şifre hatalı" });

  const token = jwt.sign(
    { id: user._id, rol: user.rol },
    process.env.JWT_SECRET
  );
  res.json({ token, rol: user.rol, id: user._id });
});

// Tüm kullanıcıları getir
router.get("/kullanicilar", async (req, res) => {
  try {
    const users = await User.find().select("-sifre");
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Kullanıcılar getirilirken hata oluştu",
        error: err.message,
      });
  }
});

// Kullanıcı rolünü güncelle
router.put("/kullanici/:id/rol", async (req, res) => {
  try {
    const { rol } = req.body;
    const guncellenen = await User.findByIdAndUpdate(
      req.params.id,
      { rol },
      { new: true }
    );
    res.status(200).json(guncellenen);
  } catch (err) {
    res.status(500).json({ message: "Rol güncellenemedi", error: err.message });
  }
});

export default router;
