# Akademik Personel Başvuru Sistemi

Bu proje, üniversitelerin akademik kadro ilanlarını yönetebileceği ve adayların bu ilanlara başvuru yapabileceği **tam özellikli** bir web tabanlı sistemdir.

## 🔧 Kullanılan Teknolojiler

- **Frontend:** React.js + React Router + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Veritabanı:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Token)
- **Dosya Yönetimi:** Multer (PDF yükleme)
- **Rol Bazlı Erişim:** Aday / Yönetici / Admin / Jüri

## 📁 Klasör Yapısı

### `client/` (React Uygulaması)

| Klasör / Dosya       | Açıklama                                     |
| -------------------- | -------------------------------------------- |
| `src/pages/`         | Sayfa bileşenleri (Aday, Admin, Jüri vs.)    |
| `src/components/`    | Ortak bileşenler (Layoutlar, Navbarlar)      |
| `src/routes/`        | Role göre yönlendirme (`ProtectedRoute.jsx`) |
| `src/api/axios.js`   | Axios instance (base URL + token header)     |
| `src/utils/`         | JSON kriter setleri, veri dosyaları          |
| `App.js`             | Route yapılandırması                         |
| `tailwind.config.js` | Tailwind ayarları                            |

### `server/` (Express API)

| Klasör / Dosya | Açıklama                                               |
| -------------- | ------------------------------------------------------ |
| `routes/`      | API uçları (`authRoutes.js`, `basvuruRoutes.js`, vb.)  |
| `controllers/` | İş mantığı (`basvuruController.js`)                    |
| `middlewares/` | JWT doğrulama, dosya yükleme                           |
| `models/`      | Mongoose şemaları (`User.js`, `Basvuru.js`, `Ilan.js`) |
| `uploads/`     | Kullanıcıdan gelen PDF dosyaları                       |
| `.env`         | Çevresel değişkenler (`JWT_SECRET`, `MONGO_URI`)       |

## 🚀 Başlatma

### 1. Backend (Server)

```bash
cd server
npm install
npm run dev
```

`.env` dosyasına aşağıdakileri ekleyin:

```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/akademik
JWT_SECRET=supersecretkey
```

### 2. Frontend (Client)

```bash
cd client
npm install
npm start
```

## 🔐 Roller & Erişim

| Rol      | Panel           | Açıklama                                   |
| -------- | --------------- | ------------------------------------------ |
| aday     | Aday Paneli     | İlanlara başvuru yapar, belgelerini yükler |
| admin    | Admin Paneli    | İlanları oluşturur, yöneticileri atar      |
| yonetici | Yönetici Paneli | Kriter belirler, başvuruları yönetir       |
| juri     | Jüri Paneli     | Aday başvurularını puanlar, PDF indirir    |

## 📄 Özellikler

- 🔐 JWT tabanlı kimlik doğrulama
- 📄 PDF dosya yükleme (Lisans Diploması, Yabancı Dil Belgesi, vb.)
- 📌 Kriter bazlı faaliyet eşleştirme (Tablo 1, Tablo 3)
- 🧩 Role göre panel erişimi (URL güvenliği dahil)
- 📊 Başvuru durumu, jüri puanlamaları, PDF çıktısı

## ✍️ Geliştirici Notları

- `client/src/routes/ProtectedRoute.jsx` ile her sayfaya rol kontrolü eklendi.
- Admin kullanıcıları, diğer kullanıcıların rollerini değiştirebilir (`/admin/rol-atama`).
- MongoDB kayıtlarında dosya adları `Date.now()-filename.pdf` formatında tutulur.
- Bu proje, MERN Stack mimarisi ile geliştirilmiştir ve kurumsal düzeyde role-based bir başvuru sistemine örnek teşkil eder.

## 🧑‍💻 Geliştiren

**Tolga Boz** – [LinkedIn](https://www.linkedin.com/in/tolgaboz) • [GitHub](https://github.com/tolgaboz)
**Tuncay Sekmen** – [LinkedIn](https://www.linkedin.com/in/tuncaysekmen/) • [GitHub](https://github.com/tuncaySekmen)

---

📦 _İsteğe bağlı olarak bu proje, Vercel / Render / MongoDB Atlas gibi servislerle otomatik deploy olacak şekilde genişletilebilir._
