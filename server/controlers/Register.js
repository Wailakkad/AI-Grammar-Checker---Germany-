const bcrypt = require('bcryptjs');
const User = require('../db/models/User.js'); // Import your User model

const registerUser = async (req, res) => {
  const { email, password, name, role , phone , address } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
   
    // Create a new user in the database
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      role,
      phone , 
      address
   
    });

    // Save the user to the database
    await newUser.save();

    res.status(200).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

module.exports = registerUser;
