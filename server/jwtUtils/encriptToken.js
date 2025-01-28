const crypto = require('crypto');
require('dotenv').config();

const encryptToken = (token) => {
  const algorithm = 'aes-256-cbc';
  const key = crypto.createHash('sha256').update(process.env.JWT_SECRET).digest();
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(token, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return { encrypted, iv: iv.toString('hex') };
};

module.exports = encryptToken;

