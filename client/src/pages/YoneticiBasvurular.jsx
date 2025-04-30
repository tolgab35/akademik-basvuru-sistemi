import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const YoneticiBasvurular = () => {
  const navigate = useNavigate();
  const [basvurular, setBasvurular] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBasvurular = async () => {
      try {
        const res = await axios.get("/basvuru/tum");
        setBasvurular(res.data);
      } catch (err) {
        console.error("Başvurular getirilemedi:", err);
        alert("Başvurular yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };

    fetchBasvurular();
  }, []);

  const handleDetay = (id) => {
    navigate(`/yonetici/belgeler/${id}`);
  };

  if (loading) return <div className="text-center mt-10">Yükleniyor...</div>;

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Tüm Başvurular</h2>

      {basvurular.length === 0 ? (
        <p>Henüz yapılmış başvuru bulunmamaktadır.</p>
      ) : (
        <div className="space-y-4">
          {basvurular.map((basvuru) => {
            const aday = basvuru.adayId || {};
            const ilan = basvuru.ilanId || {};

            return (
              <div
                key={basvuru._id}
                className="bg-gray-100 p-4 rounded border border-green-300"
              >
                <p>
                  <strong>Aday:</strong>{" "}
                  {aday.ad && aday.soyad
                    ? `${aday.ad} ${aday.soyad}`
                    : "Bilinmiyor"}
                </p>
                <p>
                  <strong>Temel Alan:</strong> {ilan.temelAlan || "-"}
                </p>
                <p>
                  <strong>Birim:</strong> {ilan.birim || "-"}
                </p>
                <p>
                  <strong>Ünvan:</strong> {ilan.unvan || "-"}
                </p>
                <p>
                  <strong>Durum:</strong> {basvuru.durum}
                </p>
                <p>
                  <strong>Tarih:</strong>{" "}
                  {new Date(basvuru.createdAt).toLocaleDateString()}
                </p>

                <div className="mt-4 text-center">
                  <button
                    onClick={() => handleDetay(basvuru._id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Başvuruyu İncele
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default YoneticiBasvurular;
