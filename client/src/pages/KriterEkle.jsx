import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const KriterEkle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mevcutIlan = location.state?.ilan || null;

  const [birim, setBirim] = useState('');
  const [bolum, setBolum] = useState('');
  const [kadroTipi, setKadroTipi] = useState('');
  const [baslangic, setBaslangic] = useState('');
  const [bitis, setBitis] = useState('');

  useEffect(() => {
    if (mevcutIlan) {
      setBirim(mevcutIlan.birim);
      setBolum(mevcutIlan.bolum);
      setKadroTipi(mevcutIlan.kadroTipi);
      setBaslangic(mevcutIlan.baslangic);
      setBitis(mevcutIlan.bitis);
    }
  }, [mevcutIlan]);

  const handleKaydet = () => {
    if (!birim || !bolum || !kadroTipi || !baslangic || !bitis) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    const yeniIlan = {
      id: mevcutIlan ? mevcutIlan.id : Date.now(), // düzenleme mi yeni mi
      birim,
      bolum,
      kadroTipi,
      baslangic,
      bitis,
    };

    let ilanlar = JSON.parse(localStorage.getItem('ilanlar')) || [];

    if (mevcutIlan) {
      // Mevcut ilanı güncelle
      ilanlar = ilanlar.map((ilan) => (ilan.id === mevcutIlan.id ? yeniIlan : ilan));
    } else {
      // Yeni ilan ekle
      ilanlar.push(yeniIlan);
    }

    localStorage.setItem('ilanlar', JSON.stringify(ilanlar));
    alert("İlan başarıyla kaydedildi!");
    navigate('/yonetici/ilanlar');
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold text-green-800 mb-6">{mevcutIlan ? "İlan Düzenle" : "Yeni İlan Ekle"}</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-green-700 font-semibold mb-1">Birim</label>
          <input
            type="text"
            value={birim}
            onChange={(e) => setBirim(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Örn: Mühendislik Fakültesi"
          />
        </div>

        <div>
          <label className="block text-green-700 font-semibold mb-1">Bölüm</label>
          <input
            type="text"
            value={bolum}
            onChange={(e) => setBolum(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Örn: Bilgisayar Mühendisliği"
          />
        </div>

        <div>
          <label className="block text-green-700 font-semibold mb-1">Kadro Tipi</label>
          <input
            type="text"
            value={kadroTipi}
            onChange={(e) => setKadroTipi(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Örn: Doçent, Dr. Öğr. Üyesi"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-green-700 font-semibold mb-1">Başlangıç Tarihi</label>
            <input
              type="date"
              value={baslangic}
              onChange={(e) => setBaslangic(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex-1">
            <label className="block text-green-700 font-semibold mb-1">Bitiş Tarihi</label>
            <input
              type="date"
              value={bitis}
              onChange={(e) => setBitis(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={handleKaydet}
          className="bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800"
        >
          Kaydet
        </button>
      </div>
    </div>
  );
};

export default KriterEkle;
