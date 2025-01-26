const cors = require('cors');

// Load client URL from environment variables
const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000'; // Default to localhost if not provided

// CORS options
const corsOptions = {
  origin: clientUrl, // Allow requests from the client URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow cookies and credentials
};

// CORS middleware
const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;