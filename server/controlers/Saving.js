const Historique = require("../db/models/Historique.js");

const Saving = async (req, res) => {
  const { userID, Text, Option, Correction } = req.body;

  // Validate input fields
  if (!userID || !Text || !Option || !Correction) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    // Create and save the new Historique entry
    const response = await Historique.create({
      user_id: userID,
      original_text: Text,
      option_text: Option,
      corrected_text: Correction,
    });

    // Send success response
    return res.status(200).json({ message: "Historique saved successfully", data: response });

  } catch (err) {
    // Log the error and send error response
    console.error("Error saving historique:", err);
    return res.status(500).json({ message: "Failed to save historique", error: err.message });
  }
};

module.exports = Saving;
