// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [ilanlar, setIlanlar] = useState([]);

  useEffect(() => {
    const fetchIlanlar = async () => {
      try {
        const res = await axios.get("/ilan");
        console.log("Gelen İlanlar:", res.data); // ✅ Debug için
        if (Array.isArray(res.data)) {
          setIlanlar(res.data);
        } else {
          setIlanlar([]); // API yanlış dönerse bile frontend çökmesin
        }
      } catch (err) {
        console.error("İlanlar çekilemedi:", err);
        setIlanlar([]);
        alert("İlanlar yüklenemedi.");
      }
    };

    fetchIlanlar();
  }, []);

  const handleSil = async (id) => {
    if (!window.confirm("Bu ilanı silmek istediğinize emin misiniz?")) return;
    try {
      await axios.delete(`/ilan/${id}`);
      setIlanlar((prev) => prev.filter((ilan) => ilan._id !== id));
      alert("İlan başarıyla silindi.");
    } catch (err) {
      console.error("İlan silinemedi:", err);
      alert("İlan silinemedi.");
    }
  };

  const handleDuzenle = (ilan) => {
    navigate("/admin/ilan-ekle", { state: { ilan } });
  };

  const handleGonder = (ilan) => {
    console.log("Form yöneticilere gönderildi:", ilan);
    alert("Form başarıyla yöneticilere gönderildi!");
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-800">İlanlar</h2>
        <Link to="/admin/ilan-ekle">
          <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">
            Yeni İlan Ekle
          </button>
        </Link>
      </div>

      <div className="space-y-4">
        {Array.isArray(ilanlar) && ilanlar.length > 0 ? (
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
              {ilan.aciklama && (
                <p>
                  <strong>Açıklama:</strong> {ilan.aciklama}
                </p>
              )}
              <p>
                <strong>Tarih:</strong> {ilan.baslangic} - {ilan.bitis}
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleDuzenle(ilan)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleSil(ilan._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Sil
                </button>
                <button
                  onClick={() => handleGonder(ilan)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Gönder
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Henüz ilan bulunmamaktadır.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
