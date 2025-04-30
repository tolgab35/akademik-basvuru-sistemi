import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";

const temelAlanlarVeBirimler = {
  "Sağlık Bilimleri, Fen Bilimleri ve Matematik, Mühendislik, Ziraat, Orman ve Su Ürünleri Temel Alanı":
    [
      "Sağlık Bilimleri",
      "Fen Bilimleri ve Matematik",
      "Mühendislik",
      "Ziraat",
      "Orman ve Su Ürünleri",
    ],
  "Eğitim Bilimleri, Filoloji, Mimarlık, Planlama ve Tasarım, Sosyal, Beşeri ve İdari Bilimler ile Spor Bilimleri Temel Alanı":
    [
      "Eğitim Bilimleri",
      "Filoloji",
      "Mimarlık",
      "Planlama ve Tasarım",
      "Sosyal",
      "Beşeri ve İdari Bilimler ile Spor Bilimleri",
    ],
  "Hukuk, İlahiyat Temel Alanı": ["Hukuk", "İlahiyat"],
  "Güzel Sanatlar (Konservatuvar dahil) Temel Alanı": [
    "Güzel Sanatlar (Konservatuvar dahil)",
  ],
};

const YeniIlanEkle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const duzenlenenIlan = location.state?.ilan || null;

  const [formData, setFormData] = useState({
    temelAlan: "",
    birim: "",
    unvan: "",
    aciklama: "",
    baslangic: "",
    bitis: "",
  });

  const [birimler, setBirimler] = useState([]);

  useEffect(() => {
    if (duzenlenenIlan) {
      setFormData({
        temelAlan: duzenlenenIlan.temelAlan || "",
        birim: duzenlenenIlan.birim || "",
        unvan: duzenlenenIlan.unvan || "",
        aciklama: duzenlenenIlan.aciklama || "",
        baslangic: duzenlenenIlan.baslangic?.substring(0, 10) || "",
        bitis: duzenlenenIlan.bitis?.substring(0, 10) || "",
        id: duzenlenenIlan._id,
      });
      if (duzenlenenIlan.temelAlan) {
        setBirimler(temelAlanlarVeBirimler[duzenlenenIlan.temelAlan]);
      }
    }
  }, [duzenlenenIlan]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "temelAlan") {
      setBirimler(temelAlanlarVeBirimler[value] || []);
      setFormData((prev) => ({ ...prev, temelAlan: value, birim: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (duzenlenenIlan) {
        // İlan güncelleme
        await axios.put(`/ilan/${formData.id}`, formData);
        alert("İlan başarıyla güncellendi!");
      } else {
        // Yeni ilan oluşturma
        await axios.post("/ilan", formData);
        alert("İlan başarıyla oluşturuldu!");
      }

      navigate("/admin");
    } catch (error) {
      console.error("İlan işlemi başarısız:", error);
      alert("İlan kaydedilirken bir hata oluştu.");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-green-800 mb-6">
        {duzenlenenIlan ? "İlanı Düzenle" : "Yeni İlan Ekle"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="temelAlan"
          value={formData.temelAlan}
          onChange={handleChange}
          className="w-full border border-green-700 rounded p-2"
          required
        >
          <option value="">Temel Alan Seçin</option>
          {Object.keys(temelAlanlarVeBirimler).map((alan) => (
            <option key={alan} value={alan}>
              {alan}
            </option>
          ))}
        </select>

        <select
          name="birim"
          value={formData.birim}
          onChange={handleChange}
          className="w-full border border-green-700 rounded p-2"
          required
          disabled={!formData.temelAlan}
        >
          <option value="">Birim Seçin</option>
          {birimler.map((birim) => (
            <option key={birim} value={birim}>
              {birim}
            </option>
          ))}
        </select>

        <select
          name="unvan"
          value={formData.unvan}
          onChange={handleChange}
          className="w-full border border-green-700 rounded p-2"
          required
        >
          <option value="">Ünvan Seçin</option>
          <option value="Dr. Öğr. Üyesi">Dr. Öğr. Üyesi</option>
          <option value="Doçent">Doçent</option>
          <option value="Profesör">Profesör</option>
        </select>

        <textarea
          name="aciklama"
          placeholder="Ek Açıklama (İsteğe bağlı)"
          value={formData.aciklama}
          onChange={handleChange}
          className="w-full border border-green-700 rounded p-2"
          rows={4}
        />

        <div className="flex gap-4">
          <input
            type="date"
            name="baslangic"
            value={formData.baslangic}
            onChange={handleChange}
            className="flex-1 border border-green-700 rounded p-2"
            required
          />
          <input
            type="date"
            name="bitis"
            value={formData.bitis}
            onChange={handleChange}
            className="flex-1 border border-green-700 rounded p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800"
        >
          {duzenlenenIlan ? "Güncelle" : "Kaydet"}
        </button>
      </form>
    </div>
  );
};

export default YeniIlanEkle;
