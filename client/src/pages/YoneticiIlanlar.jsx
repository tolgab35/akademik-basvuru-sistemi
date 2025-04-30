// src/pages/YoneticiIlanlar.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const YoneticiIlanlar = () => {
  const navigate = useNavigate();
  const [ilanlar, setIlanlar] = useState([]);

  // Sayfa açılırken API'dan ilanları çek
  useEffect(() => {
    const fetchIlanlar = async () => {
      try {
        const res = await axios.get("/ilan");
        setIlanlar(res.data);
      } catch (err) {
        console.error(err);
        alert("İlanlar yüklenemedi.");
      }
    };

    fetchIlanlar();
  }, []);

  // İlanı API'dan sil
  const handleSil = async (id) => {
    if (window.confirm("Bu ilanı silmek istediğinize emin misiniz?")) {
      try {
        await axios.delete(`/ilan/${id}`);
        setIlanlar((prev) => prev.filter((ilan) => ilan._id !== id));
        alert("İlan başarıyla silindi.");
      } catch (err) {
        console.error(err);
        alert("İlan silinemedi.");
      }
    }
  };

  // Kriter ekleme sayfasına git
  const handleKriterEkle = (ilan) => {
    navigate("/yonetici/kriter-ekle", { state: { ilan } });
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-800">Yönetici İlanlar</h2>
      </div>

      <div className="space-y-4">
        {ilanlar.length === 0 ? (
          <p>Henüz bir ilan eklenmemiş.</p>
        ) : (
          ilanlar.map((ilan) => (
            <div
              key={ilan._id}
              className="bg-gray-100 p-4 rounded border border-green-300"
            >
              <p>
                <strong>Temel Alan:</strong> {ilan.temelAlan}
              </p>
              <p>
                <strong>Birim:</strong> {ilan.birim}
              </p>
              <p>
                <strong>Unvan:</strong> {ilan.unvan}
              </p>
              <p>
                <strong>Başvuru Tarihleri:</strong> {ilan.baslangic} -{" "}
                {ilan.bitis}
              </p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleKriterEkle(ilan)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Kriter Ekle / Detaylar
                </button>

                <button
                  onClick={() => handleSil(ilan._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Sil
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default YoneticiIlanlar;
