const User = require("../db/models/User.js");

const GetUser = async (req, res) => {
    try {
        const id = req.user.userId; // Assuming userId is set by authentication middleware
        const user = await User.findById(id).select('-password'); // Exclude password field
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User found successfully", // Fixed typo
            user: user
        });

    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({
            message: "Internal server error" // Generalized message for client
        });
    }
};

module.exports = GetUser;
