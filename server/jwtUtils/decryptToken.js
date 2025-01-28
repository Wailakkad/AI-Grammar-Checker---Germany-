const crypto = require('crypto');
require('dotenv').config();

const decryptToken = (encryptedToken, ivHex) => {
  const algorithm = 'aes-256-cbc';
  const key = crypto.createHash('sha256').update(process.env.JWT_SECRET).digest();
  const iv = Buffer.from(ivHex, 'hex');

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedToken, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

module.exports = decryptToken;
