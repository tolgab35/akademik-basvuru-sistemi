import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  ad: String,
  soyad: String,
  tc: { type: String, unique: true },
  dogumTarihi: String,
  email: String,
  sifre: String,
  rol: {
    type: String,
    enum: ["aday", "admin", "yonetici", "juri"],
    default: "aday",
  },
});

export default mongoose.model("User", userSchema);
