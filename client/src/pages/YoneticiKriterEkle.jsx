import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import kriterSetleri from "../utils/kriter_setleri_gercek_45.json";
import faaliyetlerData from "../utils/tablo3_faaliyetler.json";

const YoneticiKriterEkle = () => {
  const location = useLocation();
  const ilan = location.state?.ilan || {};

  const [zorunluluklar, setZorunluluklar] = useState({});
  const [seciliFaaliyetler, setSeciliFaaliyetler] = useState([]);
  const [accordionOpen, setAccordionOpen] = useState({});

  const normalize = (str) =>
    str?.toLocaleLowerCase("tr-TR").replace(/\s+/g, " ").trim();

  useEffect(() => {
    if (ilan.temelAlan && ilan.birim && ilan.unvan) {
      const eslesenKriterSeti = kriterSetleri.find(
        (k) =>
          normalize(k.temel_alan) === normalize(ilan.temelAlan) &&
          normalize(k.birim).includes(normalize(ilan.birim)) &&
          normalize(k.unvan) === normalize(ilan.unvan)
      );

      if (eslesenKriterSeti) {
        setZorunluluklar(eslesenKriterSeti.kriterler || {});
      } else {
        console.warn("Eşleşen kriter seti bulunamadı.");
      }
    }
  }, [ilan]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setZorunluluklar((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (kod) => {
    setSeciliFaaliyetler((prev) =>
      prev.includes(kod) ? prev.filter((item) => item !== kod) : [...prev, kod]
    );
  };

  const handleAccordionToggle = (kategori) => {
    setAccordionOpen((prev) => ({
      ...prev,
      [kategori]: !prev[kategori],
    }));
  };

  const handleSave = () => {
    const mevcutIlanlar = JSON.parse(localStorage.getItem("ilanlar")) || [];
    const guncelIlanlar = mevcutIlanlar.map((i) =>
      i.id === ilan.id
        ? {
            ...i,
            kriterler: zorunluluklar,
            seciliFaaliyetler: seciliFaaliyetler,
            durum: "Aktif",
          }
        : i
    );

    localStorage.setItem("ilanlar", JSON.stringify(guncelIlanlar));

    const aktifIlan = guncelIlanlar.find((i) => i.id === ilan.id);
    if (aktifIlan) {
      localStorage.setItem("aktifIlan", JSON.stringify(aktifIlan));
    }

    alert("Kriterler başarıyla kaydedildi!");
    window.history.back();
  };

  const faaliyetlerByKategori = faaliyetlerData.reduce((gruplar, faaliyet) => {
    const kategori = faaliyet.faaliyet_kodu.charAt(0);
    if (!gruplar[kategori]) gruplar[kategori] = [];
    gruplar[kategori].push(faaliyet);
    return gruplar;
  }, {});

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-green-800 mb-4">
          İlan Bilgileri
        </h2>
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
          <strong>Başvuru Tarihleri:</strong> {ilan.baslangic} - {ilan.bitis}
        </p>
        {ilan.aciklama && (
          <div className="bg-yellow-100 text-yellow-800 p-3 rounded mt-4">
            <strong>Açıklama:</strong> {ilan.aciklama}
          </div>
        )}
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-bold text-green-800 mb-4">
          Tablo 1 - Zorunlu Faaliyetler
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(zorunluluklar).map(([key, value]) => (
            <div key={key}>
              <label className="block mb-1 font-semibold">{key}</label>
              <input
                type="number"
                name={key}
                value={value}
                onChange={handleChange}
                className="w-full border border-green-700 rounded p-2"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-bold text-green-800 mb-4">
          Tablo 3 - Faaliyetler
        </h2>
        {Object.entries(faaliyetlerByKategori).map(
          ([kategori, faaliyetler]) => (
            <div key={kategori} className="mb-4 border rounded overflow-hidden">
              <button
                onClick={() => handleAccordionToggle(kategori)}
                className="w-full bg-green-700 text-white py-3 px-4 flex justify-between items-center"
              >
                <span>{kategori} Grubu Faaliyetler</span>
                <span>{accordionOpen[kategori] ? "-" : "+"}</span>
              </button>
              {accordionOpen[kategori] && (
                <div className="bg-white p-4 space-y-2">
                  {faaliyetler.map((faaliyet) => (
                    <div key={faaliyet._id} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id={faaliyet.faaliyet_kodu}
                        checked={seciliFaaliyetler.includes(
                          faaliyet.faaliyet_kodu
                        )}
                        onChange={() =>
                          handleCheckboxChange(faaliyet.faaliyet_kodu)
                        }
                        className="h-4 w-4"
                      />
                      <label
                        htmlFor={faaliyet.faaliyet_kodu}
                        className="text-gray-800"
                      >
                        <strong>{faaliyet.faaliyet_kodu}</strong> -{" "}
                        {faaliyet.faaliyet_adi} ({faaliyet.baz_puan} Puan)
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-green-700 text-white py-2 px-6 rounded hover:bg-green-800"
        >
          Kriterleri Kaydet
        </button>
      </div>
    </div>
  );
};

export default YoneticiKriterEkle;
