// src/pages/JuriDegerlendirmeFormu.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "../api/axios"; // API bağlantısı

const JuriDegerlendirmeFormu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const basvuru = location.state?.basvuru;

  const [puanlar, setPuanlar] = useState({});
  const [openId, setOpenId] = useState(null);

  if (!basvuru) {
    return (
      <div className="text-center mt-10 text-red-600">
        Başvuru bilgisi bulunamadı.
      </div>
    );
  }

  const kriterler = [
    { id: 1, ad: "A. Eğitim Bilgileri" },
    { id: 2, ad: "B. Akademik Unvanlar" },
    { id: 3, ad: "C. Yönetim Deneyimi" },
    { id: 4, ad: "D. Bilimsel Yayınlar" },
    { id: 5, ad: "E. Araştırma Projeleri" },
    { id: 6, ad: "F. Bilimsel Toplantılar" },
    { id: 7, ad: "G. Eğitim-Öğretim Faaliyetleri" },
    { id: 8, ad: "H. Sanatsal Faaliyetler" },
    { id: 9, ad: "I. Alana Katkılar" },
    { id: 10, ad: "J. Patent ve Buluşlar" },
    { id: 11, ad: "K. Uluslararası Deneyimler" },
    { id: 12, ad: "L. Diğer Faaliyetler" },
  ];

  const handlePuanDegistir = (id, value) => {
    setPuanlar((prev) => ({ ...prev, [id]: Number(value) }));
  };

  const toplamPuan = Object.values(puanlar).reduce(
    (acc, val) => acc + (val || 0),
    0
  );

  const handleFormGonder = async () => {
    try {
      const degerlendirmeVerisi = {
        basvuruId: basvuru._id, // Buraya dikkat! Artık backend'de başvuru ID kullanılacak
        kriterPuanlari: puanlar,
        toplamPuan,
        tarih: new Date().toLocaleDateString(),
      };

      await axios.post("/juri", degerlendirmeVerisi);
      alert("Değerlendirme başarıyla gönderildi!");
      navigate("/juri/degerlendirme-gecmisim");
    } catch (error) {
      console.error(error);
      alert("Değerlendirme gönderilemedi!");
    }
  };

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const handlePdfOlustur = async () => {
    const element = document.getElementById("pdf-alani");
    if (!element) {
      console.error("PDF oluşturulacak alan bulunamadı!");
      return;
    }

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${basvuru.adayAdi?.replace(" ", "_")}_Degerlendirme.pdf`);
  };

  return (
    <div>
      {/* PDF Alınacak Alan */}
      <div id="pdf-alani" className="p-4">
        <h1 className="text-2xl font-bold text-green-800 mb-6">
          Değerlendirme Formu
        </h1>

        {/* Aday Bilgileri */}
        <div className="bg-white p-4 rounded shadow-md border border-gray-200 mb-8">
          <p>
            <strong>Aday Adı:</strong> {basvuru.adayAdi}
          </p>
          <p>
            <strong>Birim:</strong> {basvuru.birim}
          </p>
          <p>
            <strong>Bölüm:</strong> {basvuru.bolum}
          </p>
          <p>
            <strong>Unvan:</strong> {basvuru.unvan}
          </p>
        </div>

        {/* Accordion Kriterler */}
        <div className="space-y-4">
          {kriterler.map((kriter) => (
            <div key={kriter.id} className="border border-green-300 rounded">
              <button
                onClick={() => toggleAccordion(kriter.id)}
                className="w-full text-left p-4 bg-green-100 hover:bg-green-200 rounded-t"
              >
                <span className="font-semibold">{kriter.ad}</span>
              </button>

              {openId === kriter.id && (
                <div className="p-4 bg-gray-100 rounded-b">
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Puan giriniz"
                    value={puanlar[kriter.id] || ""}
                    onChange={(e) =>
                      handlePuanDegistir(kriter.id, e.target.value)
                    }
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Toplam Puan */}
        <div className="mt-8 text-center text-lg font-bold text-green-800">
          Toplam Puan: {toplamPuan}
        </div>
      </div>

      {/* Butonlar */}
      <div className="text-center mt-6 flex justify-center gap-6">
        <button
          onClick={handleFormGonder}
          className="bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800"
        >
          Değerlendirmeyi Gönder
        </button>
        <button
          onClick={handlePdfOlustur}
          className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-800"
        >
          PDF Olarak İndir
        </button>
      </div>
    </div>
  );
};

export default JuriDegerlendirmeFormu;
