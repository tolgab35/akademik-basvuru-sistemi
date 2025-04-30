import React, { useEffect, useState } from 'react';

const Adaylar = () => {
  const [adaylar, setAdaylar] = useState([]);

  useEffect(() => {
    const storedAdaylar = JSON.parse(localStorage.getItem('adaylar')) || [];
    setAdaylar(storedAdaylar);
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Adaylar</h2>

      <div className="space-y-4">
        {adaylar.length === 0 ? (
          <p>Henüz sistemde kayıtlı aday bulunmamaktadır.</p>
        ) : (
          adaylar.map((aday, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded border border-green-300">
              <p><strong>Ad Soyad:</strong> {aday.ad} {aday.soyad}</p>
              <p><strong>TC Kimlik No:</strong> {aday.tc}</p>
              <p><strong>Email:</strong> {aday.email}</p>
              {aday.rol && (
                <p><strong>Rol:</strong> {aday.rol}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Adaylar;
