import React from "react";

const Step8OnayVeGonder = ({ formData }) => {
  return (
    <div className="p-4 border border-green-500 rounded bg-green-50">
      <h3 className="text-lg font-bold text-green-800 mb-2">Başvuru Onayı</h3>
      <p className="mb-2">
        Lütfen bilgilerinizi son kez kontrol edin ve başvurunuzu tamamlayın.
      </p>
      <ul className="text-sm text-gray-700">
        <li>
          <strong>Ad Soyad:</strong> {formData.adSoyad}
        </li>
        <li>
          <strong>TC Kimlik No:</strong> {formData.tcKimlikNo}
        </li>
        <li>
          <strong>Email:</strong> {formData.email}
        </li>
        <li>
          <strong>Telefon:</strong> {formData.telefon}
        </li>
        <li>
          <strong>Doğum Tarihi:</strong> {formData.dogumTarihi}
        </li>
      </ul>
    </div>
  );
};

export default Step8OnayVeGonder;
