import React from 'react';

const Step2EgitimBilgileri = ({ formData, setFormData }) => {
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  return (
    <div className="space-y-8">
      {/* Lisans Bilgileri */}
      <div>
        <h3 className="text-xl font-semibold text-green-700 mb-4">Lisans Mezuniyet Bilgileri</h3>

        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Üniversite</label>
            <input
              type="text"
              name="lisansUniversite"
              value={formData.lisansUniversite}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Fakülte</label>
            <input
              type="text"
              name="lisansFakulte"
              value={formData.lisansFakulte}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Mezuniyet Yılı</label>
            <input
              type="number"
              name="lisansMezuniyetYili"
              value={formData.lisansMezuniyetYili}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Lisans Diploması (PDF)</label>
            <input
              type="file"
              name="lisansDiploma"
              accept="application/pdf"
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>
        </div>
      </div>

      {/* Yüksek Lisans Bilgileri */}
      <div>
        <h3 className="text-xl font-semibold text-green-700 mb-4">Yüksek Lisans Bilgileri (Varsa)</h3>

        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Üniversite</label>
            <input
              type="text"
              name="yuksekLisansUniversite"
              value={formData.yuksekLisansUniversite}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Yüksek Lisans Diploması (PDF)</label>
            <input
              type="file"
              name="yuksekLisansDiploma"
              accept="application/pdf"
              onChange={handleChange}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Doktora Bilgileri */}
      <div>
        <h3 className="text-xl font-semibold text-green-700 mb-4">Doktora Bilgileri</h3>

        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Üniversite</label>
            <input
              type="text"
              name="doktoraUniversite"
              value={formData.doktoraUniversite}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Doktora Diploması (PDF)</label>
            <input
              type="file"
              name="doktoraDiploma"
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

export default Step2EgitimBilgileri;
