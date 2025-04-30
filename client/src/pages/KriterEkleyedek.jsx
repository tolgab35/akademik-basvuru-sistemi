import React, { useState } from 'react';

const kriterBasliklari = [
  "Makaleler",
  "Bilimsel Toplantı Faaliyetleri",
  "Kitaplar",
  "Atıflar",
  "Eğitim Öğretim Faaliyetleri",
  "Tez Yöneticiliği",
  "Patentler",
  "Araştırma Projeleri",
  "Editörlük, Yayın Kurulu Üyeliği ve Hakemlik",
  "Ödüller",
  "İdari Görevler ve Üniversiteye Katkı",
  "Güzel Sanatlar Faaliyetleri"
];

const makaleAltKriterleri = [
  "SCI-E, SSCI veya AHCI kapsamındaki dergilerde yayımlanmış makale (Q1 olarak taranan dergide)",
  "SCI-E, SSCI veya AHCI kapsamındaki dergilerde yayımlanmış makale (Q2 olarak taranan dergide)",
  "SCI-E, SSCI veya AHCI kapsamındaki dergilerde yayımlanmış makale (Q3 olarak taranan dergide)",
  "SCI-E, SSCI veya AHCI kapsamındaki dergilerde yayımlanmış makale (Q4 olarak taranan dergide)",
  "ESCI tarafından taranan dergilerde yayımlanmış makale",
  "Scopus tarafından taranan dergilerde yayımlanmış makale",
  "Uluslararası diğer indekslerde taranan dergilerde yayımlanmış makale",
  "ULAKBİM TR Dizin tarafından taranan ulusal hakemli dergilerde yayımlanmış makale",
  "8. madde dışındaki ulusal hakemli dergilerde yayımlanmış makale"
];

const KriterEkle = () => {
  const [acikOlan, setAcikOlan] = useState(null);

  const toggleAccordion = (index) => {
    setAcikOlan(acikOlan === index ? null : index);
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Kriter Ekle</h2>

      <div className="space-y-4">
        {kriterBasliklari.map((baslik, index) => (
          <div key={index} className="border border-green-400 rounded">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center px-4 py-3 bg-green-100 hover:bg-green-200 transition font-semibold text-green-800"
            >
              {baslik}
              <span>{acikOlan === index ? '−' : '+'}</span>
            </button>
            {acikOlan === index && (
              <div className="p-4 bg-green-50">
                {baslik === "Makaleler" ? (
                  <div className="space-y-2">
                    {makaleAltKriterleri.map((kriter, i) => (
                      <label key={i} className="block text-sm text-gray-700">
                        <input type="checkbox" className="mr-2" />
                        {kriter}
                      </label>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">Buraya tablo 3'ten gelen alt kriterler yerleştirilecek...</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KriterEkle;
