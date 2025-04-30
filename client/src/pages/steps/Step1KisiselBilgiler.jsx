import React from 'react';

const Step1KisiselBilgiler = ({ formData, setFormData }) => {
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block font-semibold mb-1">Ad Soyad</label>
        <input
          type="text"
          name="adSoyad"
          value={formData.adSoyad}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">TC Kimlik No</label>
        <input
          type="text"
          name="tcKimlikNo"
          value={formData.tcKimlikNo}
          onChange={handleChange}
          maxLength={11}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Telefon Numarası</label>
        <input
          type="tel"
          name="telefon"
          value={formData.telefon}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">E-posta Adresi</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Doğum Tarihi</label>
        <input
          type="date"
          name="dogumTarihi"
          value={formData.dogumTarihi}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Başvurduğu Akademik Kadro</label>
        <select
          name="akademikKadro"
          value={formData.akademikKadro}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        >
          <option value="">Seçiniz</option>
          <option value="Dr. Öğr. Üyesi">Dr. Öğr. Üyesi</option>
          <option value="Doçent">Doçent</option>
          <option value="Profesör">Profesör</option>
        </select>
      </div>
    </div>
  );
};

export default Step1KisiselBilgiler;
