// src/components/ZorunluFaaliyetler.jsx
import React, { useMemo } from "react";
import kriterSetleri from "../utils/kriter_setleri_gercek_45.json";
import faaliyetler from "../utils/tablo3_faaliyetler.json";

const ZorunluFaaliyetler = ({ birim, unvan }) => {
  const zorunluListesi = useMemo(() => {
    // 1. kriter setinden birim + unvan eşleşmesini bul
    const eslesen = kriterSetleri.find(
      (k) => k.birim === birim && k.unvan === unvan
    );

    if (!eslesen) return [];

    // 2. Zorunlu kriter kodlarına karşılık gelen faaliyet açıklamalarını bul
    const kodlar = eslesen.zorunluKriterler || [];

    return faaliyetler.filter((f) => kodlar.includes(f.kod));
  }, [birim, unvan]);

  if (zorunluListesi.length === 0) {
    return (
      <p className="text-gray-500 italic">
        Bu birim ve unvan için tanımlı zorunlu faaliyet bulunamadı.
      </p>
    );
  }

  return (
    <div className="mt-4 space-y-2">
      <h3 className="text-lg font-bold text-green-700">Zorunlu Faaliyetler</h3>
      <ul className="list-disc list-inside space-y-1">
        {zorunluListesi.map((faaliyet) => (
          <li key={faaliyet.kod}>
            <span className="font-semibold">{faaliyet.kod}</span>:{" "}
            {faaliyet.aciklama}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ZorunluFaaliyetler;
