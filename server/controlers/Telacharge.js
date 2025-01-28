const fs = require('fs');
const path = require('path');
const Historique = require("../db/models/Historique.js");
const User = require("../db/models/User.js");

const downloadCorrection = async (req, res) => {
    const {user_id , correction_id} = req.body;
    try{
        const user = await User.findById(user_id);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        const correction = await Historique.findById(correction_id);
        if(!correction){
            return res.status(404).json({message: "Correction not found"});
        }
        const fileContent = `
--------------------------------------------------------
                      Correction Report
--------------------------------------------------------

User ID: ${correction.user_id}

--------------------------------------------------------
Original Text:
--------------------------------------------------------
${correction.original_text}

--------------------------------------------------------
Suggested Correction:
--------------------------------------------------------
${correction.option_text}

--------------------------------------------------------
Corrected Text:
--------------------------------------------------------
${correction.corrected_text}

--------------------------------------------------------
Timestamp:
--------------------------------------------------------
${correction.timestamp}

--------------------------------------------------------
Explanation:
--------------------------------------------------------
${correction.explanation || 'No explanation provided'}

--------------------------------------------------------
`;

              const correctionsDir = path.join(__dirname, '..', 'corrections');
              if (!fs.existsSync(correctionsDir)) {
                  fs.mkdirSync(correctionsDir, { recursive: true });
              }
      
              const filePath = path.join(correctionsDir, `${correction._id}.txt`);
      
              fs.writeFileSync(filePath, fileContent);
      
              res.download(filePath, `${correction._id}.txt`, (err) => {
                if (err) {
                    return res.status(500).json({ message: "Error downloading the file" });
                }
    
                // Optionally, delete the file after sending it
                fs.unlink(filePath, (err) => {
                    if (err) console.error("Error deleting the file:", err);
                });
            });
        
        
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
    
}

module.exports = downloadCorrection;