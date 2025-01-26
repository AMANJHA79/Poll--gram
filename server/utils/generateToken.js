const crypto = require('crypto');

const generateToken = () => {
    // Generate a 32-byte random token and convert it to hexadecimal
    const token = crypto.randomBytes(32).toString('hex');
    return token;
};

module.exports = generateToken;