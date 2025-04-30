// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios"; // API için axios instance kullanıyoruz

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ad: "",
    soyad: "",
    tc: "",
    dogumTarihi: "",
    email: "",
    sifre: "",
    sifreTekrar: "",
  });

  const [hataMesaji, setHataMesaji] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "tc") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 11) return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.tc.length !== 11) {
      setHataMesaji("TC Kimlik Numarası 11 haneli olmalıdır.");
      return;
    }
    if (formData.sifre !== formData.sifreTekrar) {
      setHataMesaji("Şifreler uyuşmuyor.");
      return;
    }

    try {
      const { sifreTekrar, ...dataToSend } = formData;
      await axios.post("/auth/register", dataToSend);
      alert("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Kayıt başarısız. Bilgileri kontrol edin.");
    }
  };

  return (
    <div className="min-h-screen bg-green-700 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg border border-green-800">
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
          Kayıt Ol
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-green-700 font-medium mb-1">Ad</label>
            <input
              type="text"
              name="ad"
              value={formData.ad}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-green-700 rounded"
            />
          </div>

          <div>
            <label className="block text-green-700 font-medium mb-1">
              Soyad
            </label>
            <input
              type="text"
              name="soyad"
              value={formData.soyad}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-green-700 rounded"
            />
          </div>

          <div>
            <label className="block text-green-700 font-medium mb-1">
              TC Kimlik No
            </label>
            <input
              type="text"
              name="tc"
              value={formData.tc}
              onChange={handleChange}
              required
              maxLength={11}
              className="w-full px-4 py-2 border border-green-700 rounded"
            />
          </div>

          <div>
            <label className="block text-green-700 font-medium mb-1">
              Doğum Tarihi
            </label>
            <input
              type="date"
              name="dogumTarihi"
              value={formData.dogumTarihi}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-green-700 rounded"
            />
          </div>

          <div>
            <label className="block text-green-700 font-medium mb-1">
              E-posta Adresi
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-green-700 rounded"
            />
          </div>

          <div>
            <label className="block text-green-700 font-medium mb-1">
              Şifre
            </label>
            <input
              type="password"
              name="sifre"
              value={formData.sifre}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-green-700 rounded"
            />
          </div>

          <div>
            <label className="block text-green-700 font-medium mb-1">
              Şifre Tekrar
            </label>
            <input
              type="password"
              name="sifreTekrar"
              value={formData.sifreTekrar}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-green-700 rounded"
            />
          </div>

          {hataMesaji && (
            <div className="text-red-600 font-medium">{hataMesaji}</div>
          )}

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
          >
            Kaydı Tamamla
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
