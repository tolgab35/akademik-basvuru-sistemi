import React, { useEffect, useState } from 'react';

const Raporlar = () => {
  const [basvurular, setBasvurular] = useState([]);
  const [toplamPuan, setToplamPuan] = useState(0);

  useEffect(() => {
    const storedBasvurular = JSON.parse(localStorage.getItem('basvurular')) || [];
    setBasvurular(storedBasvurular);

    const toplam = storedBasvurular.reduce((acc, basvuru) => acc + (basvuru.toplamPuan || 0), 0);
    setToplamPuan(toplam);
  }, []);

  const toplamBasvuru = basvurular.length;
  const ortalamaPuan = toplamBasvuru > 0 ? (toplamPuan / toplamBasvuru).toFixed(2) : 0;

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Başvuru Raporları</h2>

      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded border border-green-300">
          <p><strong>Toplam Başvuru Sayısı:</strong> {toplamBasvuru}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded border border-green-300">
          <p><strong>Başvuruların Ortalama Puanı:</strong> {ortalamaPuan}</p>
        </div>

        {/* İstersen burada başka raporlar da ekleyebiliriz (Geçerli Başvuru Sayısı gibi) */}
      </div>
    </div>
  );
};

export default Raporlar;
