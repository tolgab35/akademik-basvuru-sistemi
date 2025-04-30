import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Belgeler = () => {
  const { basvuruId } = useParams();
  const [belgeler, setBelgeler] = useState([]);

  useEffect(() => {
    const storedBasvurular = JSON.parse(localStorage.getItem('basvurular')) || [];
    const basvuru = storedBasvurular.find((b) => b.id === Number(basvuruId));

    if (basvuru && basvuru.belgeler) {
      setBelgeler(basvuru.belgeler);
    }
  }, [basvuruId]);

  const handlePuanDegistir = (index, value) => {
    const yeniBelgeler = [...belgeler];
    yeniBelgeler[index].puan = Number(value);
    setBelgeler(yeniBelgeler);
  };

  const handleKatsayiDegistir = (index, value) => {
    const yeniBelgeler = [...belgeler];
    yeniBelgeler[index].katsayi = Number(value);
    setBelgeler(yeniBelgeler);
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Başvuru Belgeleri</h2>

      <div className="space-y-4">
        {belgeler.length === 0 ? (
          <p>Bu başvuruya ait belge bulunmamaktadır.</p>
        ) : (
          belgeler.map((belge, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded border border-green-300">
              <p><strong>Belge Adı:</strong> {belge.belgeAdi}</p>
              {belge.aciklama && (
                <p><strong>Açıklama:</strong> {belge.aciklama}</p>
              )}
              {belge.dosyaUrl && (
                <p><a href={belge.dosyaUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Belgeyi Görüntüle</a></p>
              )}

              <div className="flex gap-4 mt-3">
                <div className="flex-1">
                  <label className="block text-green-700 font-semibold mb-1">Puan</label>
                  <input
                    type="number"
                    value={belge.puan || ''}
                    onChange={(e) => handlePuanDegistir(index, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Puan gir"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-green-700 font-semibold mb-1">Katsayı</label>
                  <input
                    type="number"
                    value={belge.katsayi || ''}
                    onChange={(e) => handleKatsayiDegistir(index, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Katsayı gir"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Belgeler;
