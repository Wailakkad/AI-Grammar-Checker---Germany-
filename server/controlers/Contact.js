const Contact = require("../db/models/Contact.js");

const ContactLogic = async (req, res) => {
    const { Fullname, email, message } = req.body;

    // Check if all required fields are present
    if (!Fullname || !email || !message) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    try {
        // Create a new contact entry
        const newContact = new Contact({
            Fullname,
            email,
            message
        });

        // Save the contact to the database
        await newContact.save();

        return res.status(201).json({ message: "Contact created successfully" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = ContactLogic;
