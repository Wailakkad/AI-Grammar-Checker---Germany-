const mongoose = require('mongoose');

const savedCorrectionSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  original_text: { type: String, required: true },
  option_text: { type: String, required: true },
  corrected_text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});
const Historique = mongoose.model('SavedCorrection', savedCorrectionSchema);
module.exports = Historique;
