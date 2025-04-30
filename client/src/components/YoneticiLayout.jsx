import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const YoneticiLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4 border-r border-gray-300 shadow-md overflow-y-auto">
        <img src="/kou-logo.svg" alt="KOÜ Logo" className="w-16 h-16 mx-auto mb-4" />
        <p className="text-center font-semibold text-green-800 mb-6">KOCAELİ ÜNİVERSİTESİ</p>

        <nav className="flex flex-col gap-2">
          <Link to="/yonetici/ilanlar" className="block text-center py-2 bg-green-700 text-white rounded hover:bg-green-800">İlanlar</Link>
          <Link to="/yonetici/basvurular" className="block text-center py-2 bg-green-700 text-white rounded hover:bg-green-800">Başvurular</Link>
          <Link to="/yonetici/faaliyetler" className="block text-center py-2 bg-green-700 text-white rounded hover:bg-green-800">Faaliyetler</Link>
          <Link to="/yonetici/temel-alanlar" className="block text-center py-2 bg-green-700 text-white rounded hover:bg-green-800">Temel Alanlar</Link>
          <Link to="/yonetici/kadro-tipleri" className="block text-center py-2 bg-green-700 text-white rounded hover:bg-green-800">Kadro Tipleri</Link>
          <Link to="/yonetici/adaylar" className="block text-center py-2 bg-green-700 text-white rounded hover:bg-green-800">Adaylar</Link>
          <Link to="/yonetici/raporlar" className="block text-center py-2 bg-green-700 text-white rounded hover:bg-green-800">Raporlar</Link>
        </nav>
      </aside>

      {/* İçerik */}
      <main className="flex-1 bg-green-700">
        {/* Üst Header */}
        <div className="flex justify-center items-center bg-green-800 text-white py-4 px-6 relative">
          <h1 className="text-xl font-bold">YÖNETİCİ PANELİ</h1>
          <button
            onClick={() => navigate("/")}
            className="absolute right-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Çıkış
          </button>
        </div>

        {/* Sayfa İçeriği */}
        <div className="p-6 bg-gray-100 h-full overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default YoneticiLayout;
