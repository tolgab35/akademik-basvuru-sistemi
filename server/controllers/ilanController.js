// server/controllers/ilanController.js
import Ilan from "../models/Ilan.js";

// İlan oluştur
export const createIlan = async (req, res) => {
  try {
    const yeniIlan = new Ilan(req.body);
    await yeniIlan.save();
    res.status(201).json({ message: "İlan başarıyla oluşturuldu." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "İlan eklenemedi.", error: err.message });
  }
};

// İlanları getir
export const getIlanlar = async (req, res) => {
  try {
    const ilanlar = await Ilan.find().sort({ createdAt: -1 });
    res.status(200).json(ilanlar);
  } catch (err) {
    res.status(500).json({ message: "İlanlar alınamadı." });
  }
};

// İlan güncelle
export const updateIlan = async (req, res) => {
  try {
    const { id } = req.params;
    await Ilan.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: "İlan güncellendi." });
  } catch (err) {
    res.status(500).json({ message: "İlan güncellenemedi." });
  }
};

// İlan sil
export const deleteIlan = async (req, res) => {
  try {
    const { id } = req.params;
    await Ilan.findByIdAndDelete(id);
    res.status(200).json({ message: "İlan silindi." });
  } catch (err) {
    res.status(500).json({ message: "İlan silinemedi." });
  }
};
