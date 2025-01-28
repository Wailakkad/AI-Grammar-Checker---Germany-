const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
    {
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
    },
    {
      timestamps: true, 
    }
  );

const Feedback = mongoose.model('Feedback', FeedbackSchema);
module.exports = Feedback;
