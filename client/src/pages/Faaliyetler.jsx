import React, { useEffect, useState } from "react";

const Faaliyetler = () => {
  const [faaliyetler, setFaaliyetler] = useState([]);

  useEffect(() => {
    const storedFaaliyetler =
      JSON.parse(localStorage.getItem("faaliyetler")) || [];
    setFaaliyetler(storedFaaliyetler);
  }, []);

  const handlePuanDegistir = (index, value) => {
    const yeniFaaliyetler = [...faaliyetler];
    yeniFaaliyetler[index].bazPuan = Number(value);
    setFaaliyetler(yeniFaaliyetler);
    localStorage.setItem("faaliyetler", JSON.stringify(yeniFaaliyetler));
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Faaliyetler</h2>

      <div className="space-y-4">
        {faaliyetler.length === 0 ? (
          <p>Henüz faaliyet kodu tanımlanmamış.</p>
        ) : (
          faaliyetler.map((faaliyet, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded border border-green-300"
            >
              <p>
                <strong>Faaliyet Kodu:</strong> {faaliyet.kod}
              </p>
              <p>
                <strong>Faaliyet Adı:</strong> {faaliyet.ad}
              </p>

              <div className="mt-3">
                <label className="block text-green-700 font-semibold mb-1">
                  Baz Puan
                </label>
                <input
                  type="number"
                  value={faaliyet.bazPuan || ""}
                  onChange={(e) => handlePuanDegistir(index, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Baz puan gir"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Faaliyetler;
