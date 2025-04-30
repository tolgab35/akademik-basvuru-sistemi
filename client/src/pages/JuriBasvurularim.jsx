import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const JuriBasvurularim = () => {
  const navigate = useNavigate();
  const [basvurular, setBasvurular] = useState([]);

  useEffect(() => {
    const dummyBasvurular = [
      {
        id: 1,
        adayAdi: "Ahmet Yılmaz",
        birim: "Mühendislik Fakültesi",
        bolum: "Bilgisayar Mühendisliği",
        unvan: "Doktor Öğretim Üyesi",
        ilanNo: "2024-05",
        basvuruTarihi: "25/04/2025",
      },
      {
        id: 2,
        adayAdi: "Ayşe Demir",
        birim: "Fen-Edebiyat Fakültesi",
        bolum: "Matematik",
        unvan: "Doçent",
        ilanNo: "2024-06",
        basvuruTarihi: "20/04/2025",
      },
    ];
    setBasvurular(dummyBasvurular);
  }, []);

  const handleDegerlendir = (basvuru) => {
    console.log(`Değerlendirme sayfasına yönlendiriliyor: ${basvuru.adayAdi}`);
    navigate(`/juri/degerlendir/${basvuru.id}`, { state: { basvuru } });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-green-800 mb-6">Başvurularım</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {basvurular.map((basvuru) => (
          <div
            key={basvuru.id}
            className="bg-white p-6 rounded shadow-md border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-green-700 mb-2">
              {basvuru.adayAdi}
            </h2>
            <p>
              <strong>Birim:</strong> {basvuru.birim}
            </p>
            <p>
              <strong>Bölüm:</strong> {basvuru.bolum}
            </p>
            <p>
              <strong>Unvan:</strong> {basvuru.unvan}
            </p>
            <p>
              <strong>İlan No:</strong> {basvuru.ilanNo}
            </p>
            <p>
              <strong>Başvuru Tarihi:</strong> {basvuru.basvuruTarihi}
            </p>

            <div className="mt-4 text-center">
              <button
                onClick={() => handleDegerlendir(basvuru)}
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
              >
                Değerlendir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JuriBasvurularim;
