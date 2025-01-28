const Historique = require('../db/models/Historique.js');

const DeleteSaving = async (req, res) => {
    try {
        const { SavedId } = req.params;

        // Attempt to delete the document by ID
        const deletedCorrection = await Historique.findByIdAndDelete(SavedId);

        // Check if a document was deleted
        if (!deletedCorrection) {
            return res.status(404).json({ message: 'Correction history does not exist.' });
        }

        // Successfully deleted
        return res.status(200).json({ message: 'Correction history successfully deleted.' });
    } catch (err) {
        // Catch any errors and return a 500 response
        return res.status(500).json({ message: 'Error deleting correction history.', error: err.message });
    }
};

module.exports = DeleteSaving;
