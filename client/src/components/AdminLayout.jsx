import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4 border-r border-gray-300 shadow-md">
        <img
          src="/kou-logo.svg"
          alt="KOÜ Logo"
          className="w-16 h-16 mx-auto mb-4"
        />
        <p className="text-center font-semibold text-green-800 mb-6">
          KOCAELİ ÜNİVERSİTESİ
        </p>
        <nav className="flex flex-col gap-2">
          <Link
            to="/admin"
            className="block text-center py-2 bg-green-700 text-white rounded hover:bg-green-800"
          >
            İLAN LİSTESİ
          </Link>
          <Link
            to="/admin/ilan-ekle"
            className="block text-center py-2 bg-white text-green-800 border border-green-700 rounded hover:bg-green-50"
          >
            YENİ İLAN EKLE
          </Link>
          <Link
            to="/admin/rol-atama"
            className="block text-center py-2 bg-white text-green-800 border border-green-700 rounded hover:bg-green-50"
          >
            ROL ATAMA
          </Link>
        </nav>
      </aside>

      {/* İçerik Alanı */}
      <main className="flex-1 bg-green-700">
        <div className="flex justify-center items-center bg-green-800 text-white py-4 px-6 relative">
          <h1 className="text-xl font-bold">ADMIN PANELİ</h1>
          <button
            onClick={() => navigate("/")}
            className="absolute right-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Çıkış Yap
          </button>
        </div>

        <div className="p-6 bg-gray-100 h-full overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
