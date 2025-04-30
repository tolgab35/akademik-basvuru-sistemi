// src/pages/AdayDashboard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const AdayDashboard = () => {
  const [ilanlar, setIlanlar] = useState([]);

  useEffect(() => {
    const fetchIlanlar = async () => {
      try {
        const res = await axios.get("/ilan");
        console.log("Gelen ilanlar:", res.data);
        setIlanlar(res.data);
      } catch (err) {
        console.error("İlanlar yüklenemedi:", err);
        setIlanlar([]);
      }
    };

    fetchIlanlar();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-2xl font-bold text-green-800 mb-6 text-center">
        İLANLAR
      </h1>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4 text-green-700">
          Açık Akademik İlanlar
        </h2>

        {ilanlar.length === 0 ? (
          <p className="text-gray-500">Şu anda açık ilan bulunmamaktadır.</p>
        ) : (
          <div className="grid gap-4">
            {ilanlar.map((ilan) => (
              <div
                key={ilan._id}
                className="border border-green-300 rounded-lg p-4 bg-green-50"
              >
                <p>
                  <strong>Temel Alan:</strong> {ilan.temelAlan}
                </p>
                <p>
                  <strong>Birim:</strong> {ilan.birim}
                </p>
                <p>
                  <strong>Unvan:</strong> {ilan.unvan}
                </p>
                <p>
                  <strong>Başvuru Tarihleri:</strong>{" "}
                  {new Date(ilan.baslangic).toLocaleDateString()} -{" "}
                  {new Date(ilan.bitis).toLocaleDateString()}
                </p>

                <Link to={`/aday/basvuru/${ilan._id}`}>
                  <button className="mt-3 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">
                    Başvuru Yap
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdayDashboard;
