const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing
const  encryptToken  = require('../jwtUtils/encriptToken.js'); // Assuming you have encryptToken function
const User = require('../db/models/User.js'); // Assuming you have a User model
require('dotenv').config();

// Function to log in and generate tokens
const login = async (req, res) => {
  const { email, password } = req.body;

  // Find the user in the database
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Compare the entered password with the stored hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password); // Compare the plain password with the hashed password in DB

  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Generate Access Token
  const accessToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '10s' }
  );

  // Generate Refresh Token
  const refreshToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET_reflesh,
    { expiresIn: '90d' }
  );

  // Encrypt the Access Token
  const { encrypted: encryptedAccessToken, iv: accessTokenIv } = encryptToken(accessToken);
  
  // Encrypt the Refresh Token
  const { encrypted: encryptedRefreshToken, iv: refreshTokenIv } = encryptToken(refreshToken);

  // Store the refresh token (encrypted) in the database, along with its IV


  // Send the encrypted tokens and ivs back to the client
  res.status(200).json({
    accessToken: encryptedAccessToken, // Encrypted Access Token
    accessTokenIv, // IV for Access Token
    refreshToken: encryptedRefreshToken, // Encrypted Refresh Token
    refreshTokenIv // IV for Refresh Token
  });
};

module.exports = login;
