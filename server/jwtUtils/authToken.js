const jwt = require('jsonwebtoken');
const decryptToken = require("../jwtUtils/decryptToken.js");
const encryptToken = require("../jwtUtils/encriptToken.js")
require("dotenv").config();

// Middleware to verify the token
const authenticateToken = (req, res, next) => {
  const { token, iv } = req.body; // Get token and iv from request body

  console.log('Token from request body:', token);
  console.log('IV from request body:', iv);

  if (!token || !iv) {
    return res.status(400).json({ message: 'Token or IV missing from request' });
  }

  try {
    // Decrypt the token using the IV
    const decryptedToken = decryptToken(token, iv);
    console.log('Decrypted Token:', decryptedToken);
    
    // Verify the token using JWT_SECRET
    const decoded = jwt.verify(decryptedToken, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);

    req.user = decoded; // Attach the decoded user data to the request object
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.error('Error during token verification:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken, refreshTokenIv } = req.body;

  if (!refreshToken || !refreshTokenIv) {
    return res.status(400).json({ message: 'Refresh token or IV missing' });
  }

  try {
    // Decrypt the refresh token
    const decryptedRefreshToken = decryptToken(refreshToken, refreshTokenIv);

    // Verify the refresh token using the secret for refresh tokens
    jwt.verify(decryptedRefreshToken, process.env.JWT_SECRET_reflesh, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }

      // Generate a new access token
      const newAccessToken = jwt.sign(
        { userId: decoded.userId, role: decoded.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

     
      const { encrypted: encryptedAccessToken, iv: accessTokenIv } = encryptToken(newAccessToken);

      // Send the encrypted new access token to the client
      return res.status(200).json({
        NewaccessToken: encryptedAccessToken, 
        accessTokenIv 
      });
    });
  } catch (error) {
    console.error('Error refreshing token:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};






module.exports = {authenticateToken , refreshToken};
