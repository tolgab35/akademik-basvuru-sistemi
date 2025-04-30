import MainLayout from "./components/MainLayout";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdayDashboard from "./pages/AdayDashboard";
import AdayBasvurularim from "./pages/AdayBasvurularim";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import YeniIlanEkle from "./pages/YeniIlanEkle";
import YoneticiLayout from "./components/YoneticiLayout";
import YoneticiIlanlar from "./pages/YoneticiIlanlar";
import KriterEkle from "./pages/KriterEkleyedek";
import JuriLayout from "./components/JuriLayout";
import JuriBasvurularim from "./pages/JuriBasvurularim";
import JuriDegerlendirmeGecmisim from "./pages/JuriDegerlendirmeGecmisim";
import JuriDegerlendirmeFormu from "./pages/JuriDegerlendirmeFormu";
import YoneticiBasvurular from "./pages/YoneticiBasvurular";
import Belgeler from "./pages/Belgeler";
import Faaliyetler from "./pages/Faaliyetler";
import TemelAlanlar from "./pages/TemelAlanlar";
import KadroTipleri from "./pages/KadroTipleri";
import Adaylar from "./pages/Adaylar";
import Raporlar from "./pages/Raporlar";
import YoneticiKriterEkle from "./pages/YoneticiKriterEkle";
import AdayBasvuruFormu from "./pages/AdayBasvuruFormu";
import RolAtama from "./pages/RolAtama";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Giriş ve Kayıt sayfaları layout'suz */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* MainLayout içinde gösterilecek sayfalar */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["aday"]}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/aday" element={<AdayDashboard />} />
          <Route path="/aday/basvurularim" element={<AdayBasvurularim />} />
          <Route path="/aday/basvuru/:id" element={<AdayBasvuruFormu />} />
        </Route>

        <Route
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/ilan-ekle" element={<YeniIlanEkle />} />
          <Route path="/admin/rol-atama" element={<RolAtama />} />
        </Route>

        <Route
          element={
            <ProtectedRoute allowedRoles={["yonetici"]}>
              <YoneticiLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/yonetici/ilanlar" element={<YoneticiIlanlar />} />
          <Route path="/yonetici/kriter-ekle/:id" element={<KriterEkle />} />
          <Route path="/yonetici/basvurular" element={<YoneticiBasvurular />} />
          <Route path="/yonetici/belgeler/:basvuruId" element={<Belgeler />} />
          <Route path="/yonetici/faaliyetler" element={<Faaliyetler />} />
          <Route path="/yonetici/temel-alanlar" element={<TemelAlanlar />} />
          <Route path="/yonetici/kadro-tipleri" element={<KadroTipleri />} />
          <Route path="/yonetici/adaylar" element={<Adaylar />} />
          <Route path="/yonetici/raporlar" element={<Raporlar />} />
          <Route
            path="/yonetici/kriter-ekle"
            element={<YoneticiKriterEkle />}
          />
        </Route>

        {/* Jüri Paneli */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["juri"]}>
              <JuriLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/juri/basvurularim" element={<JuriBasvurularim />} />
          <Route
            path="/juri/degerlendirme-gecmisim"
            element={<JuriDegerlendirmeGecmisim />}
          />
          <Route
            path="/juri/degerlendir/:id"
            element={<JuriDegerlendirmeFormu />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
