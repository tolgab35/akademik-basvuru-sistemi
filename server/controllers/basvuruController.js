// server/controllers/basvuruController.js
import Basvuru from "../models/Basvuru.js";

// 📌 Aday başvuru oluşturur
export const createBasvuru = async (req, res) => {
  try {
    const { formData, ilanId } = req.body;

    const yeniBasvuru = new Basvuru({
      adayId: req.user.id,
      ilanId,
      formData: JSON.parse(formData),
      belgeler: req.files?.map((file) => file.filename) || [],
      durum: "İnceleniyor",
      toplamPuan: 0,
    });

    await yeniBasvuru.save();
    res.status(201).json({ message: "Başvuru başarıyla oluşturuldu." });
  } catch (error) {
    console.error("Başvuru oluşturulamadı:", error);
    res
      .status(500)
      .json({ message: "Başvuru oluşturulamadı.", error: error.message });
  }
};

// 📌 Aday kendi başvurularını görür
export const getAdayBasvurular = async (req, res) => {
  try {
    const basvurular = await Basvuru.find({ adayId: req.user.id }).populate(
      "ilanId"
    );
    res.status(200).json(basvurular);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Başvurular getirilemedi.", error: error.message });
  }
};

// 📌 Yönetici tüm başvuruları görür
export const getTumBasvurular = async (req, res) => {
  try {
    const basvurular = await Basvuru.find()
      .populate("ilanId")
      .populate("adayId");
    res.status(200).json(basvurular);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Tüm başvurular getirilemedi.", error: error.message });
  }
};

// 📌 Belirli başvuru detaylarını getir
export const getBasvuruById = async (req, res) => {
  try {
    const basvuru = await Basvuru.findById(req.params.id)
      .populate("ilanId")
      .populate("adayId");
    if (!basvuru)
      return res.status(404).json({ message: "Başvuru bulunamadı." });
    res.status(200).json(basvuru);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Başvuru getirilemedi.", error: error.message });
  }
};

// 📌 Başvuru sil (opsiyonel)
export const deleteBasvuru = async (req, res) => {
  try {
    const basvuru = await Basvuru.findByIdAndDelete(req.params.id);
    if (!basvuru)
      return res.status(404).json({ message: "Başvuru bulunamadı." });
    res.status(200).json({ message: "Başvuru silindi." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Başvuru silinemedi.", error: error.message });
  }
};
