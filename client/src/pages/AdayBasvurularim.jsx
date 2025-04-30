import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const AdayBasvurularim = () => {
  const [basvurular, setBasvurular] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBasvurular = async () => {
      try {
        const res = await axios.get("/basvuru/aday");
        setBasvurular(res.data);
      } catch (err) {
        console.error(err);
        alert("Başvurular yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };

    fetchBasvurular();
  }, []);

  if (loading) return <div className="text-center mt-10">Yükleniyor...</div>;

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Başvurularım</h2>

      {basvurular.length === 0 ? (
        <p>Henüz bir başvuru yapmadınız.</p>
      ) : (
        <div className="space-y-4">
          {basvurular.map((basvuru) => {
            const ilan = basvuru.ilanId || {};
            return (
              <div
                key={basvuru._id}
                className="bg-gray-100 p-4 rounded border border-green-300"
              >
                <p>
                  <strong>Temel Alan:</strong> {ilan.temelAlan || "Bilinmiyor"}
                </p>
                <p>
                  <strong>Birim:</strong> {ilan.birim || "Bilinmiyor"}
                </p>
                <p>
                  <strong>Unvan:</strong> {ilan.unvan || "Bilinmiyor"}
                </p>
                <p>
                  <strong>Durum:</strong> {basvuru.durum}
                </p>
                <p>
                  <strong>Toplam Puan:</strong>{" "}
                  {basvuru.toplamPuan || "Hesaplanmadı"}
                </p>
                <p>
                  <strong>Başvuru Tarihi:</strong>{" "}
                  {new Date(basvuru.createdAt).toLocaleDateString()}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdayBasvurularim;
