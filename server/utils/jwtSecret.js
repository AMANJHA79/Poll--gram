// Import JSON Web Token library for token generation and verification
const jwt = require('jsonwebtoken');

// Function to generate a JWT token and set it as a secure HTTP-only cookie
const generateTokenAndSetCookie = (res, userId) => {
    // Verify JWT secret is configured
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    let token;
    try {
        // Generate JWT token with 7-day expiration
        token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
    } catch (error) {
        console.error('Error signing token:', error);
        throw new Error('Token generation failed');
    }

    // Set secure HTTP-only cookie with the token
    res.cookie('token', token, {
        httpOnly: true, // Prevents JavaScript access to the cookie
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
        sameSite: 'strict', // Protects against CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000 // Cookie expires in 7 days
    });
}

module.exports = generateTokenAndSetCookie;

