import React, { useEffect, useState } from 'react';

const TemelAlanlar = () => {
  const [alanlar, setAlanlar] = useState([]);

  useEffect(() => {
    const storedAlanlar = JSON.parse(localStorage.getItem('temelAlanlar')) || [];
    setAlanlar(storedAlanlar);
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Temel Alanlar ve Birimler</h2>

      <div className="space-y-4">
        {alanlar.length === 0 ? (
          <p>Henüz tanımlı temel alan bulunmamaktadır.</p>
        ) : (
          alanlar.map((alan, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded border border-green-300">
              <h3 className="text-lg font-semibold text-green-700 mb-2">{alan.temelAlanAdi}</h3>

              <div className="ml-4">
                <h4 className="font-semibold text-green-600 mb-2">Birimler:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {alan.birimler && alan.birimler.length > 0 ? (
                    alan.birimler.map((birim, idx) => (
                      <li key={idx}>{birim}</li>
                    ))
                  ) : (
                    <li>Birim bulunamadı.</li>
                  )}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TemelAlanlar;
