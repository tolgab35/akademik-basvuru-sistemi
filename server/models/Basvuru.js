import mongoose from "mongoose";

const basvuruSchema = new mongoose.Schema(
  {
    adayId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ilanId: { type: mongoose.Schema.Types.ObjectId, ref: "Ilan" },
    formData: Object,
    belgeler: [String],
    durum: { type: String, default: "İnceleniyor" },
    toplamPuan: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Basvuru", basvuruSchema);
