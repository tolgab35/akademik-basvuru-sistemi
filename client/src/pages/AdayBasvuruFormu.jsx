// src/pages/AdayBasvuruFormu.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";

import Step1KisiselBilgiler from "../pages/steps/Step1KisiselBilgiler";
import Step2EgitimBilgileri from "../pages/steps/Step2EgitimBilgileri";
import Step3YabanciDil from "../pages/steps/Step3YabanciDil";
import Step8OnayVeGonder from "../pages/steps/Step8OnayVeGonder"; // 4. adım sadece gönderme olacak

const AdayBasvuruFormu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    adSoyad: "",
    tcKimlikNo: "",
    telefon: "",
    email: "",
    dogumTarihi: "",
    akademikKadro: "",
    lisansUniversite: "",
    lisansFakulte: "",
    lisansMezuniyetYili: "",
    lisansDiploma: null,
    yuksekLisansUniversite: "",
    yuksekLisansDiploma: null,
    doktoraUniversite: "",
    doktoraDiploma: null,
    yabanciDilTuru: "",
    yabanciDilPuani: "",
    yabanciDilBelgesi: null,
    belgeler: [],
    onaylandiMi: false,
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    try {
      const form = new FormData();
      form.append("ilanId", id);

      // Belgeleri doğrudan ekleyelim
      if (formData.lisansDiploma)
        form.append("belgeler", formData.lisansDiploma);
      if (formData.yuksekLisansDiploma)
        form.append("belgeler", formData.yuksekLisansDiploma);
      if (formData.doktoraDiploma)
        form.append("belgeler", formData.doktoraDiploma);
      if (formData.yabanciDilBelgesi)
        form.append("belgeler", formData.yabanciDilBelgesi);

      // Tüm form verisini JSON olarak gönder
      form.append("formData", JSON.stringify(formData));

      await axios.post("/basvuru", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Başvuru başarıyla tamamlandı!");
      navigate("/aday/basvurularim");
    } catch (error) {
      console.error(error);
      alert("Başvuru gönderilemedi. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md mt-6">
      <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">
        Başvuru Formu ({step}/4)
      </h2>

      <div className="mb-8">
        {step === 1 && (
          <Step1KisiselBilgiler formData={formData} setFormData={setFormData} />
        )}
        {step === 2 && (
          <Step2EgitimBilgileri formData={formData} setFormData={setFormData} />
        )}
        {step === 3 && (
          <Step3YabanciDil formData={formData} setFormData={setFormData} />
        )}
        {step === 4 && (
          <Step8OnayVeGonder formData={formData} setFormData={setFormData} />
        )}
      </div>

      <div className="flex justify-between">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            Geri
          </button>
        )}
        {step < 4 ? (
          <button
            onClick={nextStep}
            className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 ml-auto"
          >
            İleri
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 ml-auto"
          >
            Başvuruyu Tamamla
          </button>
        )}
      </div>
    </div>
  );
};

export default AdayBasvuruFormu;
