import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const RolAtama = () => {
  const [kullanicilar, setKullanicilar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/auth/kullanicilar");
        setKullanicilar(res.data);
      } catch (err) {
        console.error("Kullanıcılar yüklenemedi", err);
        alert("Kullanıcı listesi alınamadı.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRolDegistir = async (id, yeniRol) => {
    try {
      await axios.put(`/auth/kullanici/${id}/rol`, { rol: yeniRol });
      setKullanicilar((prev) =>
        prev.map((k) => (k._id === id ? { ...k, rol: yeniRol } : k))
      );
      alert("Rol başarıyla güncellendi.");
    } catch (err) {
      console.error("Rol güncelleme hatası:", err);
      alert("Rol güncellenemedi.");
    }
  };

  if (loading) return <div className="p-4">Yükleniyor...</div>;

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold text-green-800 mb-6">
        Kullanıcı Rolleri
      </h2>

      {kullanicilar.length === 0 ? (
        <p>Kayıtlı kullanıcı bulunamadı.</p>
      ) : (
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-green-700 text-white">
              <th className="p-2 border">Ad</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Rol</th>
              <th className="p-2 border">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {kullanicilar.map((k) => (
              <tr key={k._id} className="border">
                <td className="p-2 border">{k.ad}</td>
                <td className="p-2 border">{k.email}</td>
                <td className="p-2 border">{k.rol}</td>
                <td className="p-2 border">
                  <select
                    value={k.rol}
                    onChange={(e) => handleRolDegistir(k._id, e.target.value)}
                    className="border rounded p-1"
                  >
                    <option value="aday">Aday</option>
                    <option value="yonetici">Yönetici</option>
                    <option value="juri">Jüri</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RolAtama;
