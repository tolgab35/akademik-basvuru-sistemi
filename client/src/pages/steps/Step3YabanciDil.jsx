import React from 'react';

const Step3YabanciDil = ({ formData, setFormData }) => {

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-green-700 mb-6">Yabancı Dil Bilgileri</h3>

        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Yabancı Dil Sınavı Türü</label>
            <select
              name="yabanciDilTuru"
              value={formData.yabanciDilTuru}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Seçiniz</option>
              <option value="YDS">YDS</option>
              <option value="TOEFL">TOEFL</option>
              <option value="IELTS">IELTS</option>
              <option value="Diğer">Diğer</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Puan</label>
            <input
              type="number"
              name="yabanciDilPuani"
              value={formData.yabanciDilPuani}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Belge Yükle (PDF)</label>
            <input
              type="file"
              name="yabanciDilBelgesi"
              accept="application/pdf"
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3YabanciDil;
