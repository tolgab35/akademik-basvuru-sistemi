// src/pages/YoneticiBasvuruDetay.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

const YoneticiBasvuruDetay = () => {
  const { id } = useParams();
  const [basvuru, setBasvuru] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBasvuru = async () => {
      try {
        const res = await axios.get(`/basvuru/${id}`);
        setBasvuru(res.data);
      } catch (err) {
        console.error("Detay yüklenemedi:", err);
        alert("Başvuru detayı getirilemedi.");
      } finally {
        setLoading(false);
      }
    };

    fetchBasvuru();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Yükleniyor...</div>;
  if (!basvuru)
    return <div className="text-center text-red-600">Başvuru bulunamadı.</div>;

  const { formData, belgeler, ilanId, adayId, durum, createdAt } = basvuru;

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-green-800 mb-4">Başvuru Detayı</h2>

      <div className="space-y-2 mb-6">
        <p>
          <strong>Aday:</strong>{" "}
          {adayId?.ad && adayId?.soyad
            ? `${adayId.ad} ${adayId.soyad}`
            : "Bilinmiyor"}
        </p>
        <p>
          <strong>Temel Alan:</strong> {ilanId?.temelAlan || "-"}
        </p>
        <p>
          <strong>Birim:</strong> {ilanId?.birim || "-"}
        </p>
        <p>
          <strong>Ünvan:</strong> {ilanId?.unvan || "-"}
        </p>
        <p>
          <strong>Durum:</strong> {durum}
        </p>
        <p>
          <strong>Tarih:</strong> {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>

      <hr className="my-4" />

      <div className="space-y-1 mb-6">
        <h3 className="text-lg font-semibold text-green-700 mb-2">
          Yüklenen Belgeler
        </h3>
        {belgeler && belgeler.length > 0 ? (
          <ul className="list-disc pl-6">
            {belgeler.map((file, i) => (
              <li key={i}>
                <a
                  href={`http://localhost:8000/uploads/${file}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {file}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Belge yüklenmemiş.</p>
        )}
      </div>

      <hr className="my-4" />

      <div>
        <h3 className="text-lg font-semibold text-green-700 mb-2">
          Aday Bilgileri
        </h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>
            <strong>Ad Soyad:</strong> {formData.adSoyad}
          </li>
          <li>
            <strong>TC:</strong> {formData.tcKimlikNo}
          </li>
          <li>
            <strong>Email:</strong> {formData.email}
          </li>
          <li>
            <strong>Telefon:</strong> {formData.telefon}
          </li>
          <li>
            <strong>Doğum Tarihi:</strong> {formData.dogumTarihi}
          </li>
          <li>
            <strong>Akademik Kadro:</strong> {formData.akademikKadro}
          </li>
          <li>
            <strong>Lisans Mezuniyet:</strong> {formData.lisansUniversite},{" "}
            {formData.lisansMezuniyetYili}
          </li>
          <li>
            <strong>Yabancı Dil:</strong> {formData.yabanciDilTuru} -{" "}
            {formData.yabanciDilPuani}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default YoneticiBasvuruDetay;
