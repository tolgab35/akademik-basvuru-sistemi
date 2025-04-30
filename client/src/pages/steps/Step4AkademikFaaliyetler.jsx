import React, { useState, useEffect } from 'react';

const Step4AkademikFaaliyetler = ({ formData, setFormData }) => {
  const [activeSection, setActiveSection] = useState(null);
  const [makaleForm, setMakaleForm] = useState({
    faaliyetKodu: "",
    makaleAdi: "",
    dergiAdi: "",
    yayinYili: "",
    dergiTuru: "",
    baslicaYazar: false,
    belge: null,
  });
  const [ilanKriterleri, setIlanKriterleri] = useState({});
  const [seciliFaaliyetler, setSeciliFaaliyetler] = useState([]);

  useEffect(() => {
    // Aktif İlanı LocalStorage'dan al
    const aktifIlan = JSON.parse(localStorage.getItem('aktifIlan'));
    if (aktifIlan) {
      setIlanKriterleri(aktifIlan.kriterler || {});
      setSeciliFaaliyetler(aktifIlan.seciliFaaliyetler || []);
    }
  }, []);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleMakaleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setMakaleForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };

  const handleMakaleEkle = () => {
    if (!makaleForm.faaliyetKodu) {
      alert("Lütfen faaliyet kodu seçiniz!");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      makaleler: [...prev.makaleler, makaleForm],
    }));

    setMakaleForm({
      faaliyetKodu: "",
      makaleAdi: "",
      dergiAdi: "",
      yayinYili: "",
      dergiTuru: "",
      baslicaYazar: false,
      belge: null,
    });

    alert("Makale başarıyla eklendi!");
  };

  return (
    <div className="space-y-8">

      {/* İlan Bilgileri ve Zorunlu Faaliyetler */}
      <div className="p-6 bg-white border border-green-300 rounded">
        <h3 className="text-2xl font-semibold text-green-700 mb-4">İlan Zorunlu Faaliyetler</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(ilanKriterleri).map(([key, value]) => (
            <div key={key}>
              <span className="font-bold">{key}:</span> {value}
            </div>
          ))}
        </div>
      </div>

      {/* A - Makaleler Accordion */}
      <div className="border border-green-300 rounded">
        <button
          type="button"
          className="w-full text-left p-4 font-bold bg-green-100 hover:bg-green-200"
          onClick={() => toggleSection('makaleler')}
        >
          A. Makaleler
        </button>

        {activeSection === 'makaleler' && (
          <div className="p-6 space-y-4 bg-white">

            {/* Makale Ekleme Formu */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Faaliyet Kodu Seçimi */}
              <div>
                <label className="block font-semibold mb-1">Faaliyet Kodu</label>
                <select
                  name="faaliyetKodu"
                  value={makaleForm.faaliyetKodu}
                  onChange={handleMakaleChange}
                  className="w-full border rounded p-2"
                >
                  <option value="">Seçiniz</option>
                  {seciliFaaliyetler.map((kod) => (
                    <option key={kod} value={kod}>
                      {kod}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Makale Adı</label>
                <input
                  type="text"
                  name="makaleAdi"
                  value={makaleForm.makaleAdi}
                  onChange={handleMakaleChange}
                  className="w-full border rounded p-2"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Dergi Adı</label>
                <input
                  type="text"
                  name="dergiAdi"
                  value={makaleForm.dergiAdi}
                  onChange={handleMakaleChange}
                  className="w-full border rounded p-2"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Yayın Yılı</label>
                <input
                  type="number"
                  name="yayinYili"
                  value={makaleForm.yayinYili}
                  onChange={handleMakaleChange}
                  className="w-full border rounded p-2"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Dergi Türü</label>
                <select
                  name="dergiTuru"
                  value={makaleForm.dergiTuru}
                  onChange={handleMakaleChange}
                  className="w-full border rounded p-2"
                >
                  <option value="">Seçiniz</option>
                  <option value="Q1">Q1</option>
                  <option value="Q2">Q2</option>
                  <option value="Q3">Q3</option>
                  <option value="Q4">Q4</option>
                  <option value="ESCI">ESCI</option>
                  <option value="Scopus">Scopus</option>
                  <option value="Diğer">Diğer</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="baslicaYazar"
                  checked={makaleForm.baslicaYazar}
                  onChange={handleMakaleChange}
                  className="h-5 w-5"
                />
                <label className="font-semibold">Başlıca Yazarım</label>
              </div>

              <div>
                <label className="block font-semibold mb-1">Makale Belgesi (PDF)</label>
                <input
                  type="file"
                  name="belge"
                  accept="application/pdf"
                  onChange={handleMakaleChange}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={handleMakaleEkle}
                className="bg-green-700 text-white py-2 px-6 rounded hover:bg-green-800"
              >
                Makale Ekle
              </button>
            </div>

          </div>
        )}
      </div>

    </div>
  );
};

export default Step4AkademikFaaliyetler;
