import mongoose from "mongoose";

const ilanSchema = new mongoose.Schema({
  temelAlan: String,
  birim: String,
  unvan: String,
  aciklama: String,
  baslangic: String,
  bitis: String,
  kriterler: Object,
  seciliFaaliyetler: [String],
});

export default mongoose.model("Ilan", ilanSchema);
