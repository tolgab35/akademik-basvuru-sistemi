const degerlendirmeSchema = new mongoose.Schema({
  juriId: mongoose.Schema.Types.ObjectId,
  basvuruId: mongoose.Schema.Types.ObjectId,
  kriterPuanlari: Object,
  toplamPuan: Number,
  tarih: String,
});

export default mongoose.model("Degerlendirme", degerlendirmeSchema);
