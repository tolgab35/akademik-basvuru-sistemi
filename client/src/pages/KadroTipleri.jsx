import React, { useEffect, useState } from 'react';

const KadroTipleri = () => {
  const [kadroTipleri, setKadroTipleri] = useState([]);

  useEffect(() => {
    const storedTipler = JSON.parse(localStorage.getItem('kadroTipleri')) || [];
    setKadroTipleri(storedTipler);
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Kadro Tipleri</h2>

      <div className="space-y-4">
        {kadroTipleri.length === 0 ? (
          <p>Henüz tanımlı kadro tipi bulunmamaktadır.</p>
        ) : (
          kadroTipleri.map((tip, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded border border-green-300">
              <h3 className="text-lg font-semibold text-green-700">{tip.kadroAdi}</h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default KadroTipleri;
