const Feedback = require("../db/models/Feedback");
const User = require("../db/models/User");

const AddFeedback = async (req, res) => {
    const id = req.user.userId; // Assuming `req.user` is populated with the authenticated user
    const { rating, comment } = req.body;

    // Validate input
    if (!rating || !comment) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    try {
        // Check if the user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create and save the feedback
        await Feedback.create({
            userId: id,
            rating: rating,
            comment: comment,
        });

        // Send success response
        res.status(201).json({ message: "Feedback added successfully" });
    } catch (err) {
        console.error("Error adding feedback:", err);
        res.status(500).json({ message: "An error occurred while adding feedback" });
    }
};

module.exports = AddFeedback;
