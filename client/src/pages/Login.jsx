// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios"; // API için axios instance kullanıyoruz

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ tc: "", sifre: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("rol", res.data.rol);

      if (res.data.rol === "aday") navigate("/aday");
      else if (res.data.rol === "admin") navigate("/admin");
      else if (res.data.rol === "yonetici") navigate("/yonetici/ilanlar");
      else if (res.data.rol === "juri") navigate("/juri/basvurularim");
    } catch (err) {
      console.error(err);
      alert("Giriş başarısız. Bilgileri kontrol edin.");
    }
  };

  return (
    <div className="min-h-screen bg-green-700 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-xl border border-green-800 flex flex-col items-center gap-6">
        {/* Logo + Başlık */}
        <div className="flex items-center justify-center gap-4">
          <img
            src="/kou-logo.svg"
            alt="KOÜ Logo"
            className="w-16 h-16 object-contain"
          />
          <h1 className="text-green-800 text-xl md:text-2xl font-bold text-center">
            AKADEMİK PERSONEL BAŞVURU SİSTEMİ
          </h1>
        </div>

        {/* Giriş Formu */}
        <form className="w-full" onSubmit={handleLogin}>
          <label className="block text-sm font-medium text-green-700 mb-1">
            TC KİMLİK NO
          </label>
          <input
            type="text"
            name="tc"
            value={formData.tc}
            onChange={handleChange}
            required
            className="w-full mb-4 px-4 py-2 border border-green-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <label className="block text-sm font-medium text-green-700 mb-1">
            ŞİFRE
          </label>
          <input
            type="password"
            name="sifre"
            value={formData.sifre}
            onChange={handleChange}
            required
            className="w-full mb-6 px-4 py-2 border border-green-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <div className="flex flex-wrap justify-between gap-2">
            <button
              type="submit"
              className="w-[48%] bg-green-700 text-white py-2 rounded hover:bg-green-800"
            >
              GİRİŞ YAP
            </button>

            <button
              type="button"
              onClick={() => navigate("/register")}
              className="w-[48%] bg-white border border-green-700 text-green-700 py-2 rounded hover:bg-green-50"
            >
              KAYIT OL
            </button>

            <button
              type="button"
              className="w-[48%] bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
            >
              E-DEVLET İLE GİRİŞ
            </button>

            <button
              type="button"
              className="w-[48%] bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
            >
              ŞİFREMİ UNUTTUM
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
